import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Factory,
  FolderUp,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { dbImages } from "@/data/database-images";
import {
  productionSimulatorTechMap,
  productionSimulatorTechSlots,
  productionSimulatorTechs,
  type ProductionSimulatorTechSlot,
} from "@/data/production-simulator-techs";
import type {
  ProductionSimulatorConfig,
  ProductionSimulatorResult,
  SimulatorGlobalField,
  SimulatorPlanetField,
  SimulatorPlanetState,
  SimulatorPlanetStatusField,
  SimulatorScenarioState,
} from "@shared/production-simulator";
import {
  buildEmptyScenario,
  cloneConfig,
  cloneResults,
  cloneScenario,
  loadSavedProductionSimulatorState,
  MAX_PRODUCTION_SIMULATOR_PLANETS,
  normalizeScenario,
  PRODUCTION_SIMULATOR_STORAGE_KEY,
  serializeState,
} from "@/lib/productionSimulator";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function planetLabel(planet: SimulatorPlanetState, index: number): string {
  const raw = String(planet.values.planetName || "").trim();
  if (index === 0 && (raw.toLowerCase() === "brigitte" || raw.toLowerCase() === "birgitte")) {
    return "Planète 1";
  }
  return raw || `Planète ${index + 1}`;
}

function normalizeFirstPlanetName(scenario: SimulatorScenarioState | null): SimulatorScenarioState | null {
  if (!scenario?.planets[0]) return scenario;
  const normalized = String(scenario.planets[0].values.planetName || "").trim().toLowerCase();
  if (normalized !== "brigitte" && normalized !== "birgitte") {
    return scenario;
  }

  const next = cloneScenario(scenario);
  next.planets[0].values.planetName = "Planète 1";
  return next;
}

function isPercentInputField(field: SimulatorGlobalField | SimulatorPlanetField): boolean {
  return field.id === "metalItemBonus" || field.id === "crystalItemBonus" || field.id === "deutItemBonus";
}

function isFieldVisibleForRace(field: SimulatorPlanetField, race: string): boolean {
  if (field.group !== "Bâtiments FDV" && field.group !== "Bâtiments boost tech FDV") {
    return true;
  }

  if (field.id.startsWith("rocta")) return race === "Rocta";
  if (field.id.startsWith("human")) return race === "Humains";
  if (field.id.startsWith("meca")) return race === "Méca";
  if (field.id.startsWith("kaelesh")) return race === "Kaelesh";
  return true;
}

function formatMetricValue(value: number, format: "number" | "percent"): string {
  if (!Number.isFinite(value)) return "0";
  if (format === "percent") return `${(value * 100).toFixed(2)} %`;
  return Math.round(value).toLocaleString("fr-FR");
}

function formatNumber(value: string | number): string {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value.toLocaleString("fr-FR") : "0";
  }
  return String(value || "—");
}

function formatFieldValue(field: SimulatorGlobalField | SimulatorPlanetField, value: string | number): string {
  if (typeof value === "number" && isPercentInputField(field)) {
    return `${(value * 100).toLocaleString("fr-FR")} %`;
  }
  return formatNumber(value);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function parseTechSlot(fieldId: string): ProductionSimulatorTechSlot | null {
  const [, tree, position] = fieldId.split("_");
  if (!tree || !position) return null;
  const slot = `${tree}-${position}` as ProductionSimulatorTechSlot;
  return productionSimulatorTechSlots.includes(slot) ? slot : null;
}

function techSlotPlacement(slot: ProductionSimulatorTechSlot): { col: number; row: number } {
  const [treeValue, positionValue] = slot.split("-").map(Number);
  const col = (treeValue - 1) * 2 + (positionValue % 2 === 1 ? 1 : 2);
  const row = Math.ceil(positionValue / 2);
  return { col, row };
}

export default function OutilsProduction() {
  const [config, setConfig] = useState<ProductionSimulatorConfig | null>(null);
  const [baseState, setBaseState] = useState<SimulatorScenarioState | null>(null);
  const [simulationState, setSimulationState] = useState<SimulatorScenarioState | null>(null);
  const [activeScenario, setActiveScenario] = useState<"base" | "simulation">("base");
  const [selectedPlanet, setSelectedPlanet] = useState(0);
  const [results, setResults] = useState<ProductionSimulatorResult | null>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  async function calculateStates(base: SimulatorScenarioState, simulation: SimulatorScenarioState) {
    setCalculating(true);
    setError("");
    try {
      const res = await fetch("/api/production-simulator/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base, simulation }),
      });
      if (!res.ok) throw new Error("Calcul impossible");
      setResults(await res.json());
    } catch (err) {
      console.error(err);
      setError("Le calcul n'a pas pu être exécuté.");
    } finally {
      setCalculating(false);
    }
  }

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch("/api/production-simulator/config");
        if (!res.ok) throw new Error("Chargement du simulateur impossible");
        const data = cloneConfig(await res.json() as ProductionSimulatorConfig);
        setConfig(data);

        const saved = loadSavedProductionSimulatorState();
        let initialBase = buildEmptyScenario(data);
        let initialSimulation = buildEmptyScenario(data);
        if (saved?.base && saved?.simulation) {
          initialBase = normalizeScenario(saved.base);
          initialSimulation = normalizeScenario(saved.simulation);
        }

        setBaseState(initialBase);
        setSimulationState(initialSimulation);
        await calculateStates(initialBase, initialSimulation);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger le simulateur de production.");
      } finally {
        setLoadingConfig(false);
      }
    }

    void loadConfig();
  }, []);

  const currentState = activeScenario === "base" ? baseState : simulationState;
  const setCurrentState = activeScenario === "base" ? setBaseState : setSimulationState;
  const activePlanetCount = currentState?.planetCount ?? 1;
  const planet = currentState?.planets[selectedPlanet] ?? null;
  const planetNameField = config?.planetFields.find((field) => field.id === "planetName") ?? null;

  const serializedCurrent = baseState && simulationState
    ? serializeState(baseState, simulationState, results)
    : null;
  const serializedDefault = config
    ? serializeState(config.defaultState.base, config.defaultState.simulation, null)
    : null;
  const hasUnsavedChanges = !!serializedCurrent && !!serializedDefault && serializedCurrent !== serializedDefault;

  useEffect(() => {
    if (!serializedCurrent) return;
    localStorage.setItem(PRODUCTION_SIMULATOR_STORAGE_KEY, serializedCurrent);
  }, [serializedCurrent]);

  useEffect(() => {
    if (selectedPlanet < activePlanetCount) return;
    setSelectedPlanet(Math.max(activePlanetCount - 1, 0));
  }, [activePlanetCount, selectedPlanet]);

  useEffect(() => {
    setBaseState((current) => normalizeFirstPlanetName(current));
    setSimulationState((current) => normalizeFirstPlanetName(current));
  }, []);

  const globalGroups = useMemo(() => {
    if (!config) return [];
    return Array.from(new Set(config.globalFields.map((field) => field.group)));
  }, [config]);

  const fieldGroups = useMemo(() => {
    if (!config) return [];
    return Array.from(new Set([
      ...config.planetFields.map((field) => field.group),
      ...config.planetStatusFields.map((field) => field.group),
    ]));
  }, [config]);

  const activePlanetNames = currentState?.planets.slice(0, activePlanetCount).map((item, index) => planetLabel(item, index)) ?? [];
  const technologyFieldsBySlot = useMemo(() => {
    if (!config) return {} as Record<ProductionSimulatorTechSlot, SimulatorPlanetStatusField[]>;

    const entries = productionSimulatorTechSlots.map((slot) => [slot, [] as SimulatorPlanetStatusField[]]);
    const map = Object.fromEntries(entries) as Record<ProductionSimulatorTechSlot, SimulatorPlanetStatusField[]>;

    config.planetStatusFields.forEach((field) => {
      const slot = parseTechSlot(field.id);
      if (slot) {
        map[slot].push(field);
      }
    });

    return map;
  }, [config]);

  function updateGlobalField(field: SimulatorGlobalField, rawValue: string) {
    if (!currentState) return;
    setStatusMessage("");
    const next = cloneScenario(currentState);
    next.globals[field.id] = field.type === "number" ? Number(rawValue || 0) : rawValue;
    setCurrentState(next);
  }

  function updatePlanetField(field: SimulatorPlanetField, rawValue: string) {
    if (!currentState) return;
    setStatusMessage("");
    const next = cloneScenario(currentState);
    next.planets[selectedPlanet].values[field.id] = field.type === "number" ? Number(rawValue || 0) : rawValue;
    setCurrentState(next);
  }

  function updateStatusField(field: SimulatorPlanetStatusField, key: "status" | "level", rawValue: string) {
    if (!currentState) return;
    setStatusMessage("");
    const next = cloneScenario(currentState);
    if (key === "status") {
      next.planets.forEach((item) => {
        item.statuses[field.id] = {
          ...item.statuses[field.id],
          status: rawValue,
        };
      });
    } else {
      next.planets[selectedPlanet].statuses[field.id] = {
        ...next.planets[selectedPlanet].statuses[field.id],
        level: Number(rawValue || 0),
      };
    }
    setCurrentState(next);
  }

  function selectTechnologyForSlot(slot: ProductionSimulatorTechSlot, nextFieldId: string | null) {
    if (!currentState) return;
    setStatusMessage("");

    const slotFields = technologyFieldsBySlot[slot] || [];
    const next = cloneScenario(currentState);
    const activeField = slotFields.find((field) => next.planets[0].statuses[field.id]?.status === "Actif");
    const inheritedLevel = activeField ? next.planets[selectedPlanet].statuses[activeField.id]?.level ?? 0 : 0;

    slotFields.forEach((field) => {
      next.planets.forEach((planetState) => {
        planetState.statuses[field.id] = {
          ...planetState.statuses[field.id],
          status: nextFieldId && field.id === nextFieldId ? "Actif" : "Inactif",
        };
      });
    });

    if (nextFieldId) {
      const target = next.planets[selectedPlanet].statuses[nextFieldId];
      if (target && target.level === 0 && inheritedLevel > 0) {
        next.planets[selectedPlanet].statuses[nextFieldId] = {
          ...target,
          level: inheritedLevel,
        };
      }
    }

    setCurrentState(next);
  }

  function updatePlanetCount(rawValue: string) {
    const nextCount = Math.min(Math.max(Number(rawValue || 1), 1), MAX_PRODUCTION_SIMULATOR_PLANETS);
    setStatusMessage("");
    setBaseState((current) => (current ? { ...cloneScenario(current), planetCount: nextCount } : current));
    setSimulationState((current) => (current ? { ...cloneScenario(current), planetCount: nextCount } : current));
  }

  async function runCalculation() {
    if (!baseState || !simulationState) return;
    await calculateStates(baseState, simulationState);
  }

  function copyBaseToSimulation() {
    if (!baseState) return;
    setSimulationState(cloneScenario(baseState));
    setActiveScenario("simulation");
    setStatusMessage("Base copiée dans Simulation.");
  }

  function copyCurrentPlanetToOtherScenario() {
    if (!baseState || !simulationState) return;
    if (activeScenario === "base") {
      const next = cloneScenario(simulationState);
      next.planets[selectedPlanet] = cloneScenario(baseState).planets[selectedPlanet];
      setSimulationState(next);
      setStatusMessage(`Planète ${selectedPlanet + 1} copiée vers Simulation.`);
      return;
    }

    const next = cloneScenario(baseState);
    next.planets[selectedPlanet] = cloneScenario(simulationState).planets[selectedPlanet];
    setBaseState(next);
    setStatusMessage(`Planète ${selectedPlanet + 1} copiée vers Base.`);
  }

  function resetDefaults() {
    if (!config) return;
    localStorage.removeItem(PRODUCTION_SIMULATOR_STORAGE_KEY);
    setBaseState(buildEmptyScenario(config));
    setSimulationState(buildEmptyScenario(config));
    setResults(null);
    setSelectedPlanet(0);
    setActiveScenario("base");
    setStatusMessage("Simulateur réinitialisé.");
  }

  function exportJson() {
    if (!baseState || !simulationState) return;
    const payload = {
      exportedAt: new Date().toISOString(),
      base: baseState,
      simulation: simulationState,
      results,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "psykoverse-simulateur-production.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatusMessage("Export JSON généré.");
  }

  function exportHtml() {
    if (!config || !baseState || !simulationState || !results) return;

    const metricGroups = Array.from(new Set(config.metrics.map((metric) => metric.group)));
    const scenarioPlanetCount = Math.max(baseState.planetCount, simulationState.planetCount);

    const renderScenarioPlanets = (title: string, scenario: SimulatorScenarioState) => {
        const planets = scenario.planets.slice(0, scenario.planetCount).map((item, index) => {
          const values = config.planetFields
          .filter((field) => field.id !== "planetName")
          .map((field) => `
            <div class="field-row">
              <span>${escapeHtml(field.label)}</span>
              <strong>${escapeHtml(formatFieldValue(field, item.values[field.id] ?? ""))}</strong>
            </div>
          `)
          .join("");

        const statuses = config.planetStatusFields.map((field) => {
          const status = item.statuses[field.id];
          return `
            <div class="status-row">
              <span>${escapeHtml(field.label)}</span>
              <strong>${escapeHtml(`${status?.status ?? "Inactif"}${status?.level ? ` • Niv. ${status.level}` : ""}`)}</strong>
            </div>
          `;
        }).join("");

        return `
          <article class="planet-card">
            <div class="planet-head">
              <div>
                <p class="eyebrow">Planète ${index + 1}</p>
                <h4>${escapeHtml(planetLabel(item, index))}</h4>
              </div>
              <span class="coords">${escapeHtml(String(item.values.coordinates || "—"))}</span>
            </div>
            <div class="planet-grid">
              <section>
                <h5>Configuration</h5>
                ${values}
              </section>
              <section>
                <h5>Technologies actives</h5>
                ${statuses}
              </section>
            </div>
          </article>
        `;
      }).join("");

      const globals = config.globalFields.map((field) => `
        <div class="field-row">
          <span>${escapeHtml(field.label)}</span>
          <strong>${escapeHtml(formatFieldValue(field, scenario.globals[field.id] ?? ""))}</strong>
        </div>
      `).join("");

      return `
        <section class="scenario-card">
          <div class="scenario-head">
            <div>
              <p class="eyebrow">Scénario</p>
              <h3>${escapeHtml(title)}</h3>
            </div>
            <span class="pill">${scenario.planetCount} planète${scenario.planetCount > 1 ? "s" : ""}</span>
          </div>
          <div class="block">
            <h4>Réglages globaux</h4>
            <div class="fields-grid">${globals}</div>
          </div>
          <div class="planets-stack">${planets}</div>
        </section>
      `;
    };

    const metricsHtml = metricGroups.map((group) => {
      const rows = config.metrics
        .filter((metric) => metric.group === group)
        .map((metric) => `
          <div class="metric-row">
            <span>${escapeHtml(metric.label)}</span>
            <strong>${escapeHtml(formatMetricValue(results.metrics[metric.id] ?? 0, metric.format))}</strong>
          </div>
        `)
        .join("");

      return `
        <section class="metrics-card">
          <p class="eyebrow">${escapeHtml(group)}</p>
          ${rows}
        </section>
      `;
    }).join("");

    const totalsHtml = [
      { title: "Base", totals: results.baseTotals },
      { title: "Simulation", totals: results.simulationTotals },
    ].map(({ title, totals }) => `
      <section class="metrics-card">
        <p class="eyebrow">${escapeHtml(title)}</p>
        <div class="metric-row"><span>Métal / h</span><strong>${escapeHtml(formatNumber(totals.hourlyMetal ?? 0))}</strong></div>
        <div class="metric-row"><span>Cristal / h</span><strong>${escapeHtml(formatNumber(totals.hourlyCrystal ?? 0))}</strong></div>
        <div class="metric-row"><span>Deut / h</span><strong>${escapeHtml(formatNumber(totals.hourlyDeut ?? 0))}</strong></div>
        <div class="metric-row"><span>Points / j</span><strong>${escapeHtml(formatNumber(totals.dailyPoints ?? 0))}</strong></div>
        <div class="metric-row"><span>USM / j</span><strong>${escapeHtml(formatNumber(totals.dailyUsm ?? 0))}</strong></div>
      </section>
    `).join("");

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Export Simulateur de Production</title>
  <style>
    :root {
      --bg: #08111f;
      --panel: rgba(13, 22, 40, 0.88);
      --panel-strong: rgba(18, 29, 50, 0.96);
      --line: rgba(136, 173, 255, 0.16);
      --text: #eff6ff;
      --muted: #8ba3c7;
      --cyan: #4fd1ff;
      --green: #43d691;
      --violet: #8b7cff;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Inter, "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(79, 209, 255, 0.16), transparent 28%),
        radial-gradient(circle at top right, rgba(139, 124, 255, 0.14), transparent 24%),
        linear-gradient(160deg, #040814 0%, #0b1222 52%, #08111f 100%);
    }
    .wrap { width: min(1380px, calc(100% - 32px)); margin: 0 auto; padding: 40px 0 64px; }
    .hero, .scenario-card, .metrics-card {
      border: 1px solid var(--line);
      background: var(--panel);
      border-radius: 24px;
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
      backdrop-filter: blur(14px);
    }
    .hero { padding: 28px; margin-bottom: 24px; }
    .hero-grid, .summary-grid, .scenario-grid, .fields-grid, .planet-grid {
      display: grid;
      gap: 16px;
    }
    .hero-grid, .summary-grid, .scenario-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    .fields-grid, .planet-grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
    .title { font-size: clamp(2rem, 4vw, 3.5rem); margin: 0 0 8px; }
    .subtitle, .eyebrow, .field-row span, .metric-row span, .status-row span, .coords { color: var(--muted); }
    .eyebrow { text-transform: uppercase; letter-spacing: 0.12em; font-size: 0.74rem; margin: 0 0 8px; }
    .hero-stat, .block, .planet-card {
      border: 1px solid rgba(143, 184, 255, 0.12);
      background: var(--panel-strong);
      border-radius: 18px;
      padding: 18px;
    }
    .hero-stat strong { display: block; font-size: 1.8rem; margin-top: 6px; }
    .summary-grid, .scenario-grid { align-items: start; }
    .metrics-card, .scenario-card { padding: 22px; }
    .metric-row, .field-row, .status-row, .scenario-head, .planet-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .metric-row, .field-row, .status-row { padding: 10px 0; border-top: 1px solid rgba(255, 255, 255, 0.06); }
    .metric-row:first-of-type, .field-row:first-of-type, .status-row:first-of-type { border-top: 0; padding-top: 0; }
    .pill {
      padding: 8px 12px;
      border-radius: 999px;
      background: rgba(79, 209, 255, 0.12);
      color: var(--cyan);
      border: 1px solid rgba(79, 209, 255, 0.18);
      font-size: 0.85rem;
    }
    .block h4, .planet-card h4, .planet-card h5 { margin: 0 0 12px; }
    .planets-stack { display: grid; gap: 16px; margin-top: 18px; }
    .coords { font-family: "JetBrains Mono", monospace; }
    .accent-green { color: var(--green); }
    .accent-violet { color: var(--violet); }
    @media (max-width: 720px) {
      .wrap { width: min(100% - 20px, 1380px); padding-top: 20px; }
      .hero, .scenario-card, .metrics-card { border-radius: 20px; }
      .metric-row, .field-row, .status-row, .scenario-head, .planet-head { flex-direction: column; align-items: flex-start; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div class="hero-grid">
        <div>
          <p class="eyebrow">PsykoVerse</p>
          <h1 class="title">Export du Simulateur de Production</h1>
          <p class="subtitle">Configuration et résultats exportés le ${escapeHtml(new Date().toLocaleString("fr-FR"))}.</p>
        </div>
        <div class="hero-stat">
          <p class="eyebrow">Parc pris en compte</p>
          <strong>${scenarioPlanetCount} planète${scenarioPlanetCount > 1 ? "s" : ""}</strong>
          <span class="subtitle">Le calcul ignore automatiquement les planètes non sélectionnées.</span>
        </div>
      </div>
    </section>
    <section class="summary-grid">
      ${totalsHtml}
      ${metricsHtml}
    </section>
    <section class="scenario-grid" style="margin-top: 24px;">
      ${renderScenarioPlanets("Base", baseState)}
      ${renderScenarioPlanets("Simulation", simulationState)}
    </section>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "psykoverse-simulateur-production.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setStatusMessage("Export HTML généré.");
  }

  async function importJson(file: File) {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as {
        base?: SimulatorScenarioState;
        simulation?: SimulatorScenarioState;
        results?: ProductionSimulatorResult | null;
      };
      if (!parsed.base || !parsed.simulation) throw new Error("Fichier invalide");
      setBaseState(normalizeScenario(parsed.base));
      setSimulationState(normalizeScenario(parsed.simulation));
      setResults(parsed.results ? cloneResults(parsed.results) : null);
      setStatusMessage("Configuration importée.");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Le fichier importé est invalide.");
    }
  }

  if (loadingConfig) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl text-center text-gray-400">
            Chargement du simulateur de production...
          </div>
        </section>
      </Layout>
    );
  }

  if (!config || !baseState || !simulationState || !planet || !currentState) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl text-center text-red-400">
            {error || "Le simulateur n'est pas disponible."}
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-7xl mx-auto">
            <Link href="/tutoriels">
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <Factory className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Simulateur de Production
              </h1>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Page de saisie du simulateur: paramètres globaux, planètes, bonus FDV et scénarios de comparaison.
              </p>
            </div>

            <div className="mb-8 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-6">
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr] xl:items-center">
                <div>
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
                    Recommandation actuelle
                  </p>
                  <h2 className="mb-3 font-display text-2xl font-bold text-white">
                    Pour la production, le plus solide aujourd&apos;hui reste l&apos;add-on OGame Tracker
                  </h2>
                  <p className="mb-4 max-w-3xl text-gray-300">
                    Le simulateur Psykoverse reste disponible pour comparer rapidement des scénarios, mais si tu veux un suivi
                    plus pratique et plus fiable au quotidien, OGame Tracker est actuellement la meilleure option.
                  </p>
                  <p className="mb-5 text-sm text-gray-400">
                    J&apos;explique comment l&apos;installer et bien s&apos;en servir dans cette vidéo YouTube.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700">
                      <a href="https://www.youtube.com/watch?v=smHMpkM-UhQ" target="_blank" rel="noopener noreferrer">
                        Voir la vidéo YouTube
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="border-amber-500/40 text-amber-300 hover:bg-amber-500/10">
                      <a href="https://chromewebstore.google.com/search/ogame%20tracker" target="_blank" rel="noopener noreferrer">
                        Rechercher OGame Tracker
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/smHMpkM-UhQ"
                      title="Tutoriel OGame Tracker par Psykose"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-gray-300">
                Outil en préparation
              </p>
              <h2 className="mb-3 font-display text-2xl font-bold text-white">
                Le simulateur natif Psykoverse est temporairement masqué
              </h2>
              <p className="max-w-3xl text-gray-400">
                Cette partie du site sera retravaillée plus tard. En attendant, la recommandation affichée plus haut reste
                l&apos;option à suivre pour les visiteurs.
              </p>
            </div>

            <RelatedGuides currentGuide="production" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

const MINES_BUILDING_IMAGE_MAP: Record<string, string> = {
  // Mines & bâtiments
  metalMine:    dbImages.batiments.mineMetal,
  crystalMine:  dbImages.batiments.mineCristal,
  deutMine:     dbImages.batiments.mineDeuterium,
  fusionPlant:  dbImages.batiments.centraleFusion,
  plasmaTech:   dbImages.recherches.plasma,
  crawlerCount: "/attached_assets/ogame_ships/foreuse.png",
  // Bâtiments FDV — Rocta
  roctaMetalBuilding:   "/attached_assets/Database/Batiments FDV/Roctas/FusionMagmatique.png",
  roctaCrystalBuilding: "/attached_assets/Database/Batiments FDV/Roctas/RaffinerieCristaux.png",
  roctaDeutBuilding:    "/attached_assets/Database/Batiments FDV/Roctas/SyntoniseurDeuterium.png",
  // Bâtiments FDV — Humains
  humanMetalBuilding:   "/attached_assets/Database/Batiments FDV/Humains/FusionHauteEnergie.png",
  humanCrystalBuilding: "/attached_assets/Database/Batiments FDV/Humains/ExtractionParFusion.png",
  humanDeutBuilding:    "/attached_assets/Database/Batiments FDV/Humains/ExtractionParFusion.png",
  // Bâtiments FDV — Méca
  mecaDeutBuilding:     "/attached_assets/Database/Batiments FDV/Mécas/SynthetiseurHautRendement.png",
  // Bâtiments boost tech FDV
  humanMetro:           "/attached_assets/Database/Batiments FDV/Humains/Métropolis.png",
  mecaHyperTransformer: "/attached_assets/Database/Batiments FDV/Mécas/TerraformeurHyperPuissant.png",
  mecaChipProd:         "/attached_assets/Database/Batiments FDV/Mécas/ProductionMassePuces.png",
  kaeleshCloneLab:      "/attached_assets/Database/Batiments FDV/Kaeleshs/LaboratoireClonage.png",
};

function MinesBuildingGrid({
  fields,
  values,
  onChange,
}: {
  fields: SimulatorPlanetField[];
  values: Record<string, string | number>;
  onChange: (field: SimulatorPlanetField, value: string) => void;
}) {
  const cardFields = fields.filter((f) => MINES_BUILDING_IMAGE_MAP[f.id]);
  const otherFields = fields.filter((f) => !MINES_BUILDING_IMAGE_MAP[f.id]);

  return (
    <div className="space-y-4 mb-4">
      {/* Cartes style jeu — grille auto-adaptative */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}>
        {cardFields.map((field) => {
          const img = MINES_BUILDING_IMAGE_MAP[field.id];
          const level = Number(values[field.id] ?? 0);
          const min = field.min ?? 0;
          const max = field.max ?? 60;
          const step = field.step ?? 1;
          const shortLabel = field.label.replace(/\s*\((?:Rocta|Humains?|Méca|Kaelesh)\)\s*(?:cristal|deut)?/gi, "").trim();
          const isActive = level > 0;

          return (
            <div
              key={field.id}
              className={`rounded-xl overflow-hidden border bg-[#0B0E14] group shadow-lg flex flex-col transition-colors ${isActive ? "border-cyan-500/40" : "border-[#2E384D]"}`}
            >
              {/* Zone image — entière via object-contain */}
              <div className="relative bg-[#070d17] flex items-center justify-center" style={{ height: "120px" }}>
                <img
                  src={img}
                  alt={shortLabel}
                  className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                />
                {/* Badge niveau dans l'image */}
                {isActive && (
                  <div className="absolute bottom-1.5 right-1.5 rounded-md bg-black/70 border border-cyan-400/30 px-1.5 py-0.5 text-[10px] font-bold text-cyan-200">
                    Niv. {level}
                  </div>
                )}
              </div>

              {/* Nom */}
              <div className="px-2 pt-1.5">
                <p className="text-[11px] text-gray-400 truncate leading-tight" title={field.label}>{shortLabel}</p>
              </div>

              {/* Stepper −/+ */}
              <div className="flex items-center gap-1 px-2 pb-2 pt-1">
                <button
                  type="button"
                  onClick={() => onChange(field, String(Math.max(min, level - step)))}
                  disabled={level <= min}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#151924] border border-[#2E384D] text-gray-300 hover:bg-[#1C2230] hover:border-cyan-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold flex-shrink-0"
                >
                  −
                </button>
                <input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={level}
                  onChange={(e) => onChange(field, e.target.value)}
                  className="flex-1 min-w-0 bg-[#151924] border border-[#2E384D] rounded-lg px-1 py-1 text-white text-xs text-center focus:border-cyan-500/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => onChange(field, String(Math.min(max, level + step)))}
                  disabled={level >= max}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#151924] border border-[#2E384D] text-gray-300 hover:bg-[#1C2230] hover:border-cyan-500/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm font-bold flex-shrink-0"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Champs sans image */}
      {otherFields.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {otherFields.map((field) => (
            <FieldEditor
              key={field.id}
              field={field}
              value={values[field.id]}
              onChange={(value) => onChange(field, value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TechnologyGrid({
  currentState,
  selectedPlanet,
  technologyFieldsBySlot,
  onSelectTechnology,
  onUpdateLevel,
}: {
  currentState: SimulatorScenarioState;
  selectedPlanet: number;
  technologyFieldsBySlot: Record<ProductionSimulatorTechSlot, SimulatorPlanetStatusField[]>;
  onSelectTechnology: (slot: ProductionSimulatorTechSlot, fieldId: string | null) => void;
  onUpdateLevel: (field: SimulatorPlanetStatusField, value: string) => void;
}) {
  const selectedTechnologies = Object.fromEntries(
    productionSimulatorTechSlots.map((slot) => {
      const selectedField = (technologyFieldsBySlot[slot] || []).find(
        (field) => currentState.planets[0].statuses[field.id]?.status === "Actif",
      ) || null;
      return [slot, selectedField];
    }),
  ) as Record<ProductionSimulatorTechSlot, SimulatorPlanetStatusField | null>;

  return (
    <TooltipProvider>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <img src={dbImages.recherches.rri} alt="" className="w-6 h-6 rounded-lg object-cover border border-cyan-500/20 bg-[#0B0E14]" />
          <span className="text-gray-300 font-medium">Technologies FDV actives</span>
          <span className="text-gray-500">— choisissez une techno par slot, puis indiquez le niveau pour la planète active.</span>
        </div>

        {/* Headers Arbre 1 / 2 / 3 */}
        <div className="hidden lg:grid grid-cols-6 gap-2 text-xs uppercase tracking-[0.22em] text-gray-500">
          <div className="text-center col-span-2">Arbre 1</div>
          <div className="text-center col-span-2">Arbre 2</div>
          <div className="text-center col-span-2">Arbre 3</div>
        </div>

        {/* Grille 6 colonnes avec ordre CSS identique à l'original */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {productionSimulatorTechSlots.map((slot) => {
            const options = technologyFieldsBySlot[slot] || [];
            const selectedField = selectedTechnologies[slot];
            const selectedMeta = selectedField ? productionSimulatorTechMap[selectedField.id] : null;
            const selectedStatus = selectedField ? currentState.planets[selectedPlanet].statuses[selectedField.id] : null;
            const imageUrl = selectedMeta?.imageUrl || null;
            const { col, row } = techSlotPlacement(slot);

            return (
              <div
                key={slot}
                className={`rounded-xl border bg-[#0B0E14] p-2.5 space-y-2 transition-colors ${selectedField ? "border-cyan-500/30" : "border-[#2E384D]"}`}
                style={{ order: (row - 1) * 6 + col }}
              >
                {/* Header : miniature + slot tag */}
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-[#111827] flex-shrink-0 cursor-default">
                        {imageUrl ? (
                          <img src={imageUrl} alt={selectedMeta?.title || ""} className="w-full h-full object-cover opacity-90" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 text-[10px]">?</div>
                        )}
                      </div>
                    </TooltipTrigger>
                    {selectedMeta && (
                      <TooltipContent side="top" className="bg-[#1C2230] border border-white/10 text-white p-3 max-w-[200px]">
                        <img src={selectedMeta.imageUrl} alt={selectedMeta.title} className="w-full h-24 object-cover rounded-lg mb-2" />
                        <p className="font-semibold text-sm">{selectedMeta.title}</p>
                        <p className="text-xs text-cyan-300 mt-0.5">{selectedMeta.race}</p>
                        <p className="text-xs text-emerald-300 mt-0.5">{selectedMeta.bonus}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                  <div className="min-w-0">
                    <span className="text-[10px] text-gray-500 block leading-none">Slot {slot}</span>
                    <span className="text-[10px] text-cyan-500/70 block leading-none">Niv. {row}</span>
                  </div>
                </div>

                {/* Select techno */}
                <select
                  value={selectedField?.id || ""}
                  onChange={(e) => onSelectTechnology(slot, e.target.value || null)}
                  className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-2 py-1.5 text-white text-xs"
                >
                  <option value="">— Rien —</option>
                  {options.map((field) => {
                    const meta = productionSimulatorTechMap[field.id];
                    return (
                      <option key={field.id} value={field.id}>
                        {meta ? `${meta.race} · ${meta.title}` : field.label}
                      </option>
                    );
                  })}
                </select>

                {/* Niveau */}
                <input
                  type="number"
                  min={selectedField?.levelMin ?? 0}
                  max={selectedField?.levelMax ?? 30}
                  step={selectedField?.levelStep ?? 1}
                  value={selectedStatus?.level ?? 0}
                  disabled={!selectedField}
                  onChange={(e) => {
                    if (selectedField) onUpdateLevel(selectedField, e.target.value);
                  }}
                  placeholder="Niv."
                  className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-2 py-1.5 text-white text-xs disabled:text-gray-600 disabled:cursor-not-allowed"
                />

                {selectedMeta && (
                  <div className="text-[10px] text-emerald-400 truncate" title={selectedMeta.bonus}>
                    {selectedMeta.bonus}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}

function FieldEditor({
  field,
  value,
  onChange,
}: {
  field: SimulatorGlobalField | SimulatorPlanetField;
  value: string | number;
  onChange: (value: string) => void;
}) {
  const isPercentField = field.type === "number" && isPercentInputField(field);
  const numericValue = typeof value === "number" ? value : Number(value || 0);
  const normalizedPlanetName = String(value || "").trim().toLowerCase();
  const normalizedTextValue = field.id === "planetName" && (normalizedPlanetName === "brigitte" || normalizedPlanetName === "birgitte")
    ? "Planète 1"
    : String(value);
  const displayValue = isPercentField
    ? String(Number.isFinite(numericValue) ? numericValue * 100 : 0)
    : normalizedTextValue;

  return (
    <div>
      <label className="text-sm text-gray-400 block mb-1">
        {field.label}
        {isPercentField ? " (%)" : ""}
      </label>
      {field.type === "select" ? (
        <select
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-lg px-3 py-2 text-white"
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={field.type === "number" ? "number" : "text"}
          min={field.type === "number" ? (isPercentField ? (field.min ?? 0) * 100 : field.min) : undefined}
          max={field.type === "number" ? (isPercentField ? (field.max ?? 0) * 100 : field.max) : undefined}
          step={field.type === "number" ? (isPercentField ? (field.step ?? 1) * 100 : field.step ?? 1) : undefined}
          value={displayValue}
          onChange={(e) => {
            if (!isPercentField) {
              onChange(e.target.value);
              return;
            }

            const raw = e.target.value;
            if (raw === "") {
              onChange("0");
              return;
            }

            const parsed = Number(raw);
            onChange(Number.isFinite(parsed) ? String(parsed / 100) : "0");
          }}
          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-lg px-3 py-2 text-white"
        />
      )}
    </div>
  );
}

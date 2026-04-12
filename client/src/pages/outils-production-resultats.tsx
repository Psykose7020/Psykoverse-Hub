import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Factory, RefreshCw, Rocket } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import { Button } from "@/components/ui/button";
import { dbImages } from "@/data/database-images";
import type {
  ProductionSimulatorConfig,
  ProductionSimulatorResult,
  SimulatorMetric,
  SimulatorScenarioState,
} from "@shared/production-simulator";
import {
  cloneConfig,
  cloneScenario,
  loadSavedProductionSimulatorState,
  normalizeScenario,
  PRODUCTION_SIMULATOR_STORAGE_KEY,
} from "@/lib/productionSimulator";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function formatMetric(value: number, format: SimulatorMetric["format"]): string {
  if (!Number.isFinite(value)) return "0";
  if (format === "percent") return `${(value * 100).toFixed(2)} %`;
  return Math.round(value).toLocaleString("fr-FR");
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("fr-FR");
}

const bonusEntries = [
  { id: "bonusMetalGlobal", label: "Métal" },
  { id: "bonusCrystalGlobal", label: "Cristal" },
  { id: "bonusDeutGlobal", label: "Deut" },
];

export default function OutilsProductionResultats() {
  const [config, setConfig] = useState<ProductionSimulatorConfig | null>(null);
  const [baseState, setBaseState] = useState<SimulatorScenarioState | null>(null);
  const [simulationState, setSimulationState] = useState<SimulatorScenarioState | null>(null);
  const [results, setResults] = useState<ProductionSimulatorResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [error, setError] = useState("");

  const metricGroups = useMemo(() => {
    if (!config) return [];
    return Array.from(new Set(config.metrics.map((metric) => metric.group)));
  }, [config]);

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
      const data = (await res.json()) as ProductionSimulatorResult;
      setResults(data);
      localStorage.setItem(PRODUCTION_SIMULATOR_STORAGE_KEY, JSON.stringify({
        base,
        simulation,
        results: data,
      }));
    } catch (err) {
      console.error(err);
      setError("Impossible de calculer les résultats.");
    } finally {
      setCalculating(false);
    }
  }

  useEffect(() => {
    async function load() {
      try {
        const configRes = await fetch("/api/production-simulator/config");
        if (!configRes.ok) throw new Error("Chargement impossible");
        const configData = cloneConfig(await configRes.json() as ProductionSimulatorConfig);
        setConfig(configData);

        const saved = loadSavedProductionSimulatorState();
        const base = saved?.base ? normalizeScenario(cloneScenario(saved.base)) : normalizeScenario(cloneScenario(configData.defaultState.base));
        const simulation = saved?.simulation ? normalizeScenario(cloneScenario(saved.simulation)) : normalizeScenario(cloneScenario(configData.defaultState.simulation));
        setBaseState(base);
        setSimulationState(simulation);

        await calculateStates(base, simulation);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger la page résultats.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  if (loading) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl text-center text-gray-400">
            Chargement des résultats...
          </div>
        </section>
      </Layout>
    );
  }

  if (!config || !baseState || !simulationState || !results) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl text-center text-red-400">
            {error || "Aucun résultat disponible."}
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
            <div className="flex flex-wrap gap-3 mb-6">
              <Button asChild variant="outline" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                <Link href="/outils/production">← Retour à la saisie</Link>
              </Button>
              <Button onClick={() => void calculateStates(baseState, simulationState)} disabled={calculating} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <RefreshCw className="w-4 h-4 mr-2" />
                {calculating ? "Calcul..." : "Recalculer"}
              </Button>
            </div>

            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Résultats du Simulateur
              </h1>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                Vue dédiée à la synthèse, aux productions horaires et aux productions journalières.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-[#111827] px-4 py-2 text-sm text-gray-200">
                  <img src={dbImages.ressources.metal} alt="" className="w-5 h-5 object-contain" />
                  Métal
                </div>
                <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-[#111827] px-4 py-2 text-sm text-gray-200">
                  <img src={dbImages.ressources.crystal} alt="" className="w-5 h-5 object-contain" />
                  Cristal
                </div>
                <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-[#111827] px-4 py-2 text-sm text-gray-200">
                  <img src={dbImages.ressources.deuterium} alt="" className="w-5 h-5 object-contain" />
                  Deutérium
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-950/30 p-4 text-red-300">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-8">
              <div className="space-y-8">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <img src={dbImages.batiments.mineMetal} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                    <Rocket className="w-5 h-5 text-cyan-400" />
                    <h2 className="font-display text-2xl text-white font-bold">Productions horaires</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <TotalsCard
                      title="Base"
                      totals={results.baseTotals}
                      entries={[
                        { id: "hourlyMetal", label: "Métal / h" },
                        { id: "hourlyCrystal", label: "Cristal / h" },
                        { id: "hourlyDeut", label: "Deut / h" },
                        { id: "hourlyPoints", label: "Points / h" },
                        { id: "hourlyUsm", label: "USM / h" },
                      ]}
                    />
                    <TotalsCard
                      title="Simulation"
                      totals={results.simulationTotals}
                      entries={[
                        { id: "hourlyMetal", label: "Métal / h" },
                        { id: "hourlyCrystal", label: "Cristal / h" },
                        { id: "hourlyDeut", label: "Deut / h" },
                        { id: "hourlyPoints", label: "Points / h" },
                        { id: "hourlyUsm", label: "USM / h" },
                      ]}
                    />
                  </div>
                </div>

                <div className="bg-[#1C2230] border border-[#2E384D] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <img src={dbImages.batiments.centraleFusion} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                    <Factory className="w-5 h-5 text-emerald-400" />
                    <h2 className="font-display text-2xl text-white font-bold">Productions journalières</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <TotalsCard
                      title="Base"
                      totals={results.baseTotals}
                      entries={[
                        { id: "dailyMetal", label: "Métal / j" },
                        { id: "dailyCrystal", label: "Cristal / j" },
                        { id: "dailyDeut", label: "Deut / j" },
                        { id: "dailyPoints", label: "Points / j" },
                        { id: "dailyUsm", label: "USM / j" },
                      ]}
                    />
                    <TotalsCard
                      title="Simulation"
                      totals={results.simulationTotals}
                      entries={[
                        { id: "dailyMetal", label: "Métal / j" },
                        { id: "dailyCrystal", label: "Cristal / j" },
                        { id: "dailyDeut", label: "Deut / j" },
                        { id: "dailyPoints", label: "Points / j" },
                        { id: "dailyUsm", label: "USM / j" },
                      ]}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <img src={dbImages.recherches.rri} alt="" className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  <h2 className="font-display text-2xl text-white font-bold">Synthèse</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-3">Bonus tech FDV totaux</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PercentTotalsCard
                        title="Base"
                        totals={results.baseBonuses}
                        entries={bonusEntries}
                      />
                      <PercentTotalsCard
                        title="Simulation"
                        totals={results.simulationBonuses}
                        entries={bonusEntries}
                      />
                    </div>
                  </div>
                  {metricGroups.map((group) => (
                    <div key={group}>
                      <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-3">{group}</h3>
                      <div className="space-y-2">
                        {config.metrics.filter((metric) => metric.group === group).map((metric) => (
                          <div key={metric.id} className="flex items-center justify-between rounded-lg bg-[#151924] px-4 py-3">
                            <span className="text-sm text-gray-300">{metric.label}</span>
                            <span className="font-mono text-white">
                              {formatMetric(results.metrics[metric.id] ?? 0, metric.format)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <RelatedGuides currentGuide="production" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

function TotalsCard({
  title,
  totals,
  entries,
}: {
  title: string;
  totals: Record<string, number>;
  entries: Array<{ id: string; label: string }>;
}) {
  return (
    <div className="rounded-xl border border-[#2E384D] bg-[#151924] p-4">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{entry.label}</span>
            <span className="font-mono text-white">{formatNumber(totals[entry.id] ?? 0)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PercentTotalsCard({
  title,
  totals,
  entries,
}: {
  title: string;
  totals: Record<string, number>;
  entries: Array<{ id: string; label: string }>;
}) {
  return (
    <div className="rounded-xl border border-[#2E384D] bg-[#151924] p-4">
      <h3 className="text-white font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {entries.map((entry) => (
          <div key={entry.id} className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{entry.label}</span>
            <span className="font-mono text-white">{formatMetric(totals[entry.id] ?? 0, "percent")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import type {
  ProductionSimulatorConfig,
  ProductionSimulatorResult,
  SimulatorScenarioState,
} from "@shared/production-simulator";

export const PRODUCTION_SIMULATOR_STORAGE_KEY = "psykoverse_production_simulator_v1";
export const MAX_PRODUCTION_SIMULATOR_PLANETS = 20;

function isLegacyFirstPlanetName(value: unknown): boolean {
  const normalized = String(value || "").trim().toLowerCase();
  return normalized === "brigitte" || normalized === "birgitte";
}

export function cloneScenario(scenario: SimulatorScenarioState): SimulatorScenarioState {
  return JSON.parse(JSON.stringify(scenario)) as SimulatorScenarioState;
}

export function cloneConfig(config: ProductionSimulatorConfig): ProductionSimulatorConfig {
  return JSON.parse(JSON.stringify(config)) as ProductionSimulatorConfig;
}

export function cloneResults(results: ProductionSimulatorResult): ProductionSimulatorResult {
  return JSON.parse(JSON.stringify(results)) as ProductionSimulatorResult;
}

export function hasCompleteProductionSimulatorResults(
  results: ProductionSimulatorResult | null | undefined,
  config: ProductionSimulatorConfig,
): results is ProductionSimulatorResult {
  if (!results) return false;

  const requiredMetricIds = config.metrics.map((metric) => metric.id);
  const requiredBonusIds = [
    "bonusMetalGlobal",
    "bonusCrystalGlobal",
    "bonusDeutGlobal",
  ];
  const requiredTotalIds = [
    "hourlyMetal",
    "hourlyCrystal",
    "hourlyDeut",
    "hourlyPoints",
    "hourlyUsm",
    "dailyMetal",
    "dailyCrystal",
    "dailyDeut",
    "dailyPoints",
    "dailyUsm",
  ];

  return (
    requiredMetricIds.every((id) => typeof results.metrics?.[id] === "number") &&
    requiredBonusIds.every((id) => typeof results.baseBonuses?.[id] === "number") &&
    requiredBonusIds.every((id) => typeof results.simulationBonuses?.[id] === "number") &&
    requiredTotalIds.every((id) => typeof results.baseTotals?.[id] === "number") &&
    requiredTotalIds.every((id) => typeof results.simulationTotals?.[id] === "number")
  );
}

export function serializeState(
  base: SimulatorScenarioState,
  simulation: SimulatorScenarioState,
  results: ProductionSimulatorResult | null,
) {
  return JSON.stringify({
    base,
    simulation,
    results,
  });
}

function clampPlanetCount(value: unknown, planetsLength: number): number {
  const fallback = Math.min(Math.max(planetsLength || 1, 1), MAX_PRODUCTION_SIMULATOR_PLANETS);
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(Math.max(Math.round(value), 1), MAX_PRODUCTION_SIMULATOR_PLANETS);
}

function detectPlanetCount(planets: SimulatorScenarioState["planets"]): number {
  let highestUsedIndex = 0;

  planets.forEach((planet, index) => {
    const hasValue = Object.values(planet.values).some((value) => {
      if (typeof value === "number") return value !== 0;
      return String(value || "").trim().length > 0;
    });
    const hasStatus = Object.values(planet.statuses).some((status) => {
      return status.level > 0 || status.status === "Actif";
    });

    if (hasValue || hasStatus) {
      highestUsedIndex = index + 1;
    }
  });

  return clampPlanetCount(highestUsedIndex || 1, planets.length);
}

function normalizeScenarioStatuses(next: SimulatorScenarioState): SimulatorScenarioState {
  if (!next.planets.length) return next;

  const lastPlanetIndex = Math.min(Math.max((next.planetCount || 1) - 1, 0), next.planets.length - 1);
  const statusSource = next.planets[lastPlanetIndex] ?? next.planets[0];
  if (!statusSource) return next;

  next.planets.forEach((planet) => {
    Object.keys(planet.statuses).forEach((statusId) => {
      planet.statuses[statusId] = {
        ...planet.statuses[statusId],
        status: statusSource.statuses[statusId]?.status ?? "Inactif",
      };
    });
  });

  return next;
}

export function normalizeScenario(scenario: SimulatorScenarioState): SimulatorScenarioState {
  const next = cloneScenario(scenario);
  next.planetCount = clampPlanetCount(next.planetCount ?? detectPlanetCount(next.planets), next.planets.length);
  if (next.planets[0] && isLegacyFirstPlanetName(next.planets[0].values.planetName)) {
    next.planets[0].values.planetName = "Planète 1";
  }
  return normalizeScenarioStatuses(next);
}

export function buildEmptyScenario(config: ProductionSimulatorConfig): SimulatorScenarioState {
  const globals = Object.fromEntries(
    config.globalFields.map((field) => {
      if (field.type === "select") return [field.id, field.options?.[0]?.value ?? ""];
      if (field.type === "number") return [field.id, field.min ?? 0];
      return [field.id, ""];
    }),
  );

  const emptyPlanet = () => ({
    values: Object.fromEntries(
      config.planetFields.map((field) => {
        if (field.type === "select") return [field.id, field.options?.[0]?.value ?? ""];
        if (field.type === "number") return [field.id, 0];
        return [field.id, ""];
      }),
    ),
    statuses: Object.fromEntries(
      config.planetStatusFields.map((field) => [field.id, { status: "Inactif", level: 0 }]),
    ),
  });

  const planets = Array.from({ length: MAX_PRODUCTION_SIMULATOR_PLANETS }, emptyPlanet);

  return { planetCount: 1, globals, planets };
}

export function loadSavedProductionSimulatorState() {
  const raw = localStorage.getItem(PRODUCTION_SIMULATOR_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as {
      base?: SimulatorScenarioState;
      simulation?: SimulatorScenarioState;
      results?: ProductionSimulatorResult | null;
    };
    return {
      base: parsed.base ? normalizeScenario(parsed.base) : undefined,
      simulation: parsed.simulation ? normalizeScenario(parsed.simulation) : undefined,
      results: parsed.results ?? null,
    };
  } catch {
    return null;
  }
}

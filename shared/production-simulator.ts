export type SimulatorFieldType = "text" | "number" | "select";

export interface SimulatorOption {
  label: string;
  value: string;
}

export interface SimulatorGlobalField {
  id: string;
  label: string;
  type: SimulatorFieldType;
  group: string;
  options?: SimulatorOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface SimulatorPlanetField {
  id: string;
  label: string;
  type: SimulatorFieldType;
  group: string;
  options?: SimulatorOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface SimulatorPlanetStatusField {
  id: string;
  label: string;
  group: string;
  levelMin?: number;
  levelMax?: number;
  levelStep?: number;
}

export interface SimulatorMetric {
  id: string;
  label: string;
  group: string;
  format: "number" | "percent";
  resource?: "metal" | "crystal" | "deut" | "global" | "usm";
}

export interface SimulatorPlanetState {
  values: Record<string, string | number>;
  statuses: Record<string, { status: string; level: number }>;
}

export interface SimulatorScenarioState {
  planetCount: number;
  globals: Record<string, string | number>;
  planets: SimulatorPlanetState[];
}

export interface ProductionSimulatorConfig {
  globalFields: SimulatorGlobalField[];
  planetFields: SimulatorPlanetField[];
  planetStatusFields: SimulatorPlanetStatusField[];
  metrics: SimulatorMetric[];
  defaultState: {
    base: SimulatorScenarioState;
    simulation: SimulatorScenarioState;
  };
}

export interface ProductionSimulatorResult {
  metrics: Record<string, number>;
  baseBonuses: Record<string, number>;
  simulationBonuses: Record<string, number>;
  baseTotals: Record<string, number>;
  simulationTotals: Record<string, number>;
}

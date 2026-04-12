import ExcelJS from "exceljs";
import { HyperFormula, type CellValue } from "hyperformula";
import path from "path";
import fs from "fs";
import type {
  ProductionSimulatorConfig,
  ProductionSimulatorResult,
  SimulatorGlobalField,
  SimulatorMetric,
  SimulatorPlanetField,
  SimulatorPlanetState,
  SimulatorPlanetStatusField,
  SimulatorScenarioState,
} from "@shared/production-simulator";

function resolveWorkbookPath(): string {
  const candidates = [
    path.resolve(process.cwd(), "attached_assets", "Simulateur.xlsx"),
    path.resolve(__dirname, "..", "attached_assets", "Simulateur.xlsx"),
    path.resolve(__dirname, "..", "..", "attached_assets", "Simulateur.xlsx"),
    path.resolve("/var/www/psykoverse", "attached_assets", "Simulateur.xlsx"),
  ];

  const existingPath = candidates.find((candidate) => fs.existsSync(candidate));
  if (existingPath) return existingPath;

  return candidates[0];
}

const WORKBOOK_PATH = resolveWorkbookPath();
const PLANET_START_COL = 5; // E
const PLANET_COUNT = 20;

const yesNoOptions = [
  { label: "Oui", value: "Oui" },
  { label: "Non", value: "Non" },
];

const classOptions = [
  { label: "Collecteur", value: "Collecteur" },
  { label: "Explorateur", value: "Explorateur" },
  { label: "Général", value: "Général" },
];

const raceOptions = [
  { label: "Humains", value: "Humains" },
  { label: "Rocta", value: "Rocta" },
  { label: "Méca", value: "Méca" },
  { label: "Kaelesh", value: "Kaelesh" },
];

const activeOptions = [
  { label: "Actif", value: "Actif" },
  { label: "Inactif", value: "Inactif" },
];

const globalFields: Array<SimulatorGlobalField & { cell: string }> = [
  { id: "universeSpeed", label: "Vitesse de l'univers", type: "number", group: "Réglages généraux", min: 1, max: 20, step: 1, cell: "E2" },
  { id: "classChoice", label: "Classe choisie", type: "select", group: "Réglages généraux", options: classOptions, cell: "E3" },
  { id: "geologistActive", label: "Géologue actif", type: "select", group: "Officiers & alliance", options: yesNoOptions, cell: "I2" },
  { id: "fullOffiActive", label: "Full officiers actif", type: "select", group: "Officiers & alliance", options: yesNoOptions, cell: "I3" },
  { id: "merchantClass", label: "Classe Marchand", type: "select", group: "Officiers & alliance", options: yesNoOptions, cell: "I4" },
];

const planetFields: Array<SimulatorPlanetField & { row: number }> = [
  { id: "planetName", label: "Nom de planète", type: "text", group: "Infos de base", row: 9 },
  { id: "coordinates", label: "Coordonnées", type: "text", group: "Infos de base", row: 10 },
  { id: "maxTemperature", label: "Température max", type: "number", group: "Infos de base", row: 12, min: -200, max: 200, step: 1 },
  { id: "race", label: "Race choisie", type: "select", group: "Infos de base", options: raceOptions, row: 13 },
  { id: "metalMine", label: "Mine de métal", type: "number", group: "Mines & bâtiments", row: 17, min: 0, max: 60, step: 1 },
  { id: "crystalMine", label: "Mine de cristal", type: "number", group: "Mines & bâtiments", row: 18, min: 0, max: 60, step: 1 },
  { id: "deutMine", label: "Mine de deut", type: "number", group: "Mines & bâtiments", row: 19, min: 0, max: 60, step: 1 },
  { id: "fusionPlant", label: "Centrale fusion", type: "number", group: "Mines & bâtiments", row: 20, min: 0, max: 60, step: 1 },
  { id: "roctaMetalBuilding", label: "Fusion magmatique (Rocta)", type: "number", group: "Bâtiments FDV", row: 21, min: 0, max: 30, step: 1 },
  { id: "roctaCrystalBuilding", label: "Raffinerie de cristaux (Rocta)", type: "number", group: "Bâtiments FDV", row: 22, min: 0, max: 30, step: 1 },
  { id: "roctaDeutBuilding", label: "Synto de deut (Rocta)", type: "number", group: "Bâtiments FDV", row: 23, min: 0, max: 30, step: 1 },
  { id: "humanMetalBuilding", label: "Fusion à haute énergie (Humains)", type: "number", group: "Bâtiments FDV", row: 24, min: 0, max: 30, step: 1 },
  { id: "humanCrystalBuilding", label: "Extraction par fusion (Humains) cristal", type: "number", group: "Bâtiments FDV", row: 25, min: 0, max: 30, step: 1 },
  { id: "humanDeutBuilding", label: "Extraction par fusion (Humains) deut", type: "number", group: "Bâtiments FDV", row: 26, min: 0, max: 30, step: 1 },
  { id: "mecaDeutBuilding", label: "Synthétiseur à haut rendement (Méca)", type: "number", group: "Bâtiments FDV", row: 27, min: 0, max: 30, step: 1 },
  { id: "crawlerCount", label: "Nombre de foreuses", type: "number", group: "Mines & bâtiments", row: 28, min: 0, max: 5000, step: 1 },
  { id: "plasmaTech", label: "Tech plasma", type: "number", group: "Mines & bâtiments", row: 29, min: 0, max: 30, step: 1 },
  { id: "metalItemBonus", label: "% bonus objet métal", type: "number", group: "Objets", row: 31, min: 0, max: 5, step: 0.01 },
  { id: "crystalItemBonus", label: "% bonus objet cristal", type: "number", group: "Objets", row: 32, min: 0, max: 5, step: 0.01 },
  { id: "deutItemBonus", label: "% bonus objet deut", type: "number", group: "Objets", row: 33, min: 0, max: 5, step: 0.01 },
  { id: "humanMetro", label: "Métro (Humain)", type: "number", group: "Bâtiments boost tech FDV", row: 35, min: 0, max: 30, step: 1 },
  { id: "mecaHyperTransformer", label: "Transfo hyper (Méca)", type: "number", group: "Bâtiments boost tech FDV", row: 36, min: 0, max: 30, step: 1 },
  { id: "mecaChipProd", label: "Prod de puces (Méca)", type: "number", group: "Bâtiments boost tech FDV", row: 37, min: 0, max: 30, step: 1 },
  { id: "kaeleshCloneLab", label: "Labo de clonage (Kaelesh)", type: "number", group: "Bâtiments boost tech FDV", row: 38, min: 0, max: 30, step: 1 },
];

const planetStatusFields: Array<SimulatorPlanetStatusField & { row: number }> = [
  { id: "human_1_2", label: "1-2 Humain (Trio) (0,06%)", group: "Technologies actives", row: 40, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "human_2_2", label: "2-2 Humain (Trio) (0,06%)", group: "Technologies actives", row: 42, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "meca_1_1", label: "1-1 Méca (Deut) (0,08%)", group: "Technologies actives", row: 44, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "meca_1_6", label: "1-6 Méca (Trio) (0,06%)", group: "Technologies actives", row: 46, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "meca_3_1", label: "3-1 Méca (Trio) (0,06%)", group: "Technologies actives", row: 48, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "rocta_1_2", label: "1-2 Rocta (Cri) (0,08%)", group: "Technologies actives", row: 50, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "rocta_1_3", label: "1-3 Rocta (Deut) (0,08%)", group: "Technologies actives", row: 52, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "rocta_1_5", label: "1-5 Rocta (Trio) (0,06%)", group: "Technologies actives", row: 54, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "rocta_2_1", label: "2-1 Rocta (Mét) (0,08%)", group: "Technologies actives", row: 56, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "rocta_2_4", label: "2-4 Rocta (Mét) (0,08%)", group: "Technologies actives", row: 58, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "rocta_2_5", label: "2-5 Rocta (Cri) (0,08%)", group: "Technologies actives", row: 60, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "rocta_2_6", label: "2-6 Rocta (Deut) (0,08%)", group: "Technologies actives", row: 62, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "rocta_3_6", label: "3-6 Rocta (Collec) (0,02%)", group: "Technologies actives", row: 64, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "kaelesh_1_2", label: "1-2 Kaelesh (Deut) (0,08%)", group: "Technologies actives", row: 66, levelMin: 0, levelMax: 30, levelStep: 1 },
  { id: "kaelesh_2_6", label: "2-6 Kaelesh (Trio) (0,06%)", group: "Technologies actives", row: 68, levelMin: 0, levelMax: 30, levelStep: 1 },
];

const metrics: Array<SimulatorMetric & { cell: string }> = [
  { id: "bonusMetalGlobal", label: "Gain bonus métal global", group: "Delta bonus tech FDV", format: "percent", resource: "metal", cell: "E2" },
  { id: "bonusCrystalGlobal", label: "Gain bonus cristal global", group: "Delta bonus tech FDV", format: "percent", resource: "crystal", cell: "E3" },
  { id: "bonusDeutGlobal", label: "Gain bonus deut global", group: "Delta bonus tech FDV", format: "percent", resource: "deut", cell: "E4" },
  { id: "dailyMetal", label: "Métal / jour", group: "Delta quotidien", format: "number", resource: "metal", cell: "E20" },
  { id: "dailyCrystal", label: "Cristal / jour", group: "Delta quotidien", format: "number", resource: "crystal", cell: "E21" },
  { id: "dailyDeut", label: "Deut / jour", group: "Delta quotidien", format: "number", resource: "deut", cell: "E22" },
  { id: "dailyPoints", label: "Points / jour", group: "Delta quotidien", format: "number", resource: "global", cell: "E23" },
  { id: "dailyUsm", label: "USM / jour", group: "Delta quotidien", format: "number", resource: "usm", cell: "E24" },
  { id: "monthlyMetal", label: "Métal / mois", group: "Delta mensuel", format: "number", resource: "metal", cell: "E26" },
  { id: "monthlyCrystal", label: "Cristal / mois", group: "Delta mensuel", format: "number", resource: "crystal", cell: "E27" },
  { id: "monthlyDeut", label: "Deut / mois", group: "Delta mensuel", format: "number", resource: "deut", cell: "E28" },
  { id: "monthlyPoints", label: "Points / mois", group: "Delta mensuel", format: "number", resource: "global", cell: "E29" },
  { id: "monthlyUsm", label: "USM / mois", group: "Delta mensuel", format: "number", resource: "usm", cell: "E30" },
  { id: "yearlyMetal", label: "Métal / an", group: "Delta annuel", format: "number", resource: "metal", cell: "E32" },
  { id: "yearlyCrystal", label: "Cristal / an", group: "Delta annuel", format: "number", resource: "crystal", cell: "E33" },
  { id: "yearlyDeut", label: "Deut / an", group: "Delta annuel", format: "number", resource: "deut", cell: "E34" },
  { id: "yearlyPoints", label: "Points / an", group: "Delta annuel", format: "number", resource: "global", cell: "E35" },
  { id: "yearlyUsm", label: "USM / an", group: "Delta annuel", format: "number", resource: "usm", cell: "E36" },
];

const totalCells = {
  hourlyMetal: "Y142",
  hourlyCrystal: "Y143",
  hourlyDeut: "Y144",
  hourlyPoints: "Y145",
  hourlyUsm: "Y146",
  dailyMetal: "Y148",
  dailyCrystal: "Y149",
  dailyDeut: "Y150",
  dailyPoints: "Y151",
  dailyUsm: "Y152",
};

const bonusTotalCells = {
  bonusMetalGlobal: "Y71",
  bonusCrystalGlobal: "Y72",
  bonusDeutGlobal: "Y73",
};

const EMPTY_PLANET_STATUS = { status: "Inactif", level: 0 };

type RawCell = string | number | boolean | null | { formula: string };
type RawSheet = RawCell[][];

interface WorkbookCache {
  rawSheets: Record<string, RawSheet>;
  config: ProductionSimulatorConfig;
}

let workbookCachePromise: Promise<WorkbookCache> | null = null;

function valueToRawCell(cell: ExcelJS.Cell): RawCell {
  if (cell.formula) {
    return { formula: cell.formula };
  }

  let value = cell.value as unknown;
  if (value === null || value === undefined) return null;

  if (typeof value === "object") {
    if (Array.isArray(value)) return null;
    if ("richText" in (value as Record<string, unknown>)) {
      return ((value as { richText: Array<{ text: string }> }).richText || [])
        .map((chunk) => chunk.text)
        .join("");
    }
    if ("text" in (value as Record<string, unknown>)) {
      return String((value as { text: string }).text);
    }
    if ("result" in (value as Record<string, unknown>)) {
      const result = (value as { result: unknown }).result;
      if (typeof result === "string" || typeof result === "number" || typeof result === "boolean") {
        return result;
      }
      return null;
    }
    return null;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }

  return null;
}

function rawCellToHyperFormula(cell: RawCell): string | number | boolean | null {
  if (cell === null) return null;
  if (typeof cell === "object" && "formula" in cell) {
    return `=${cell.formula}`;
  }
  if (typeof cell === "string") {
    return `'${cell}`;
  }
  return cell;
}

function normalizeCellValue(value: CellValue): number {
  if (typeof value === "number") return value;
  return 0;
}

function cloneRawSheets(rawSheets: Record<string, RawSheet>): Record<string, RawSheet> {
  return Object.fromEntries(
    Object.entries(rawSheets).map(([sheetName, rows]) => [
      sheetName,
      rows.map((row) => row.map((cell) => {
        if (cell && typeof cell === "object" && "formula" in cell) {
          return { formula: cell.formula };
        }
        return cell;
      })),
    ]),
  );
}

function addressFrom(row: number, planetIndex: number): string {
  const colNumber = PLANET_START_COL + planetIndex;
  return `${numberToColumn(colNumber)}${row}`;
}

function numberToColumn(colNumber: number): string {
  let dividend = colNumber;
  let columnName = "";
  while (dividend > 0) {
    const modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }
  return columnName;
}

function setRawCell(sheet: RawSheet, address: string, value: RawCell): void {
  const { row, col } = parseA1Address(address);
  while (sheet.length <= row) sheet.push([]);
  while ((sheet[row] || []).length <= col) sheet[row].push(null);
  sheet[row][col] = value;
}

function getRawCell(sheet: RawSheet, address: string): RawCell {
  const { row, col } = parseA1Address(address);
  return sheet[row]?.[col] ?? null;
}

function getTextCell(sheet: RawSheet, address: string): string {
  const value = getRawCell(sheet, address);
  return typeof value === "string" ? value : "";
}

function getNumberCell(sheet: RawSheet, address: string): number {
  const value = getRawCell(sheet, address);
  return typeof value === "number" ? value : 0;
}

function parseA1Address(address: string): { row: number; col: number } {
  const match = address.match(/^([A-Z]+)(\d+)$/);
  if (!match) {
    throw new Error(`Invalid address: ${address}`);
  }

  const [, letters, rowDigits] = match;
  let col = 0;
  for (const letter of letters) {
    col = col * 26 + (letter.charCodeAt(0) - 64);
  }

  return {
    row: Number(rowDigits) - 1,
    col: col - 1,
  };
}

function requireSheetId(hf: HyperFormula, sheetName: string): number {
  const sheetId = hf.getSheetId(sheetName);
  if (sheetId === undefined) {
    throw new Error(`Missing sheet: ${sheetName}`);
  }
  return sheetId;
}

function requireAddress(hf: HyperFormula, address: string, sheetId: number) {
  const parsed = hf.simpleCellAddressFromString(address, sheetId);
  if (!parsed) {
    throw new Error(`Invalid sheet address: ${address}`);
  }
  return parsed;
}

function buildScenarioState(sheet: RawSheet): SimulatorScenarioState {
  const globals = Object.fromEntries(
    globalFields.map((field) => {
      const raw = getRawCell(sheet, field.cell);
      return [field.id, typeof raw === "number" || typeof raw === "string" ? raw : ""];
    }),
  );

  const planets: SimulatorPlanetState[] = [];
  for (let planetIndex = 0; planetIndex < PLANET_COUNT; planetIndex++) {
    const values = Object.fromEntries(
      planetFields.map((field) => {
        const address = addressFrom(field.row, planetIndex);
        const raw = getRawCell(sheet, address);
        let value = typeof raw === "number" || typeof raw === "string" ? raw : (field.type === "number" ? 0 : "");
        if (field.id === "planetName" && planetIndex === 0 && String(value).trim().toLowerCase() === "brigitte") {
          value = "Planète 1";
        }
        return [field.id, value];
      }),
    );

    const statuses = Object.fromEntries(
      planetStatusFields.map((field) => {
        const status = getTextCell(sheet, `${numberToColumn(3)}${field.row}`);
        const level = getNumberCell(sheet, addressFrom(field.row, planetIndex));
        return [field.id, { status: status || "Inactif", level }];
      }),
    );

    planets.push({ values, statuses });
  }

  let detectedPlanetCount = 1;
  planets.forEach((planet, index) => {
    const hasValue = Object.values(planet.values).some((value) => {
      if (typeof value === "number") return value !== 0;
      return String(value || "").trim().length > 0;
    });
    const hasStatus = Object.values(planet.statuses).some((status) => {
      return status.level > 0 || status.status === "Actif";
    });
    if (hasValue || hasStatus) {
      detectedPlanetCount = index + 1;
    }
  });

  return { planetCount: Math.min(Math.max(detectedPlanetCount, 1), PLANET_COUNT), globals, planets };
}

function normalizeScenarioStatuses(scenario: SimulatorScenarioState): SimulatorScenarioState {
  const safePlanetCount = Math.min(Math.max(Math.round(Number(scenario.planetCount || PLANET_COUNT)), 1), PLANET_COUNT);
  const lastPlanetIndex = Math.min(Math.max(safePlanetCount - 1, 0), scenario.planets.length - 1);
  const statusSource = scenario.planets[lastPlanetIndex] ?? scenario.planets[0];
  if (!statusSource) return scenario;

  const next = JSON.parse(JSON.stringify(scenario)) as SimulatorScenarioState;
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

function applyScenarioToSheet(sheet: RawSheet, scenario: SimulatorScenarioState): void {
  const safePlanetCount = Math.min(Math.max(Math.round(Number(scenario.planetCount || PLANET_COUNT)), 1), PLANET_COUNT);
  const normalizedScenario = normalizeScenarioStatuses(scenario);
  const scenarioStatuses = normalizedScenario.planets[0]?.statuses ?? {};

  for (const field of globalFields) {
    const value = normalizedScenario.globals[field.id];
    setRawCell(sheet, field.cell, typeof value === "number" ? value : String(value ?? ""));
  }

  for (const field of planetStatusFields) {
    const value = scenarioStatuses[field.id] || EMPTY_PLANET_STATUS;
    setRawCell(sheet, `${numberToColumn(3)}${field.row}`, String(value.status || "Inactif"));
  }

  for (let planetIndex = 0; planetIndex < PLANET_COUNT; planetIndex++) {
    const planet = normalizedScenario.planets[planetIndex];
    const isActivePlanet = planetIndex < safePlanetCount && !!planet;

    for (const field of planetFields) {
      const value = isActivePlanet ? planet.values[field.id] : (field.type === "number" ? 0 : "");
      setRawCell(sheet, addressFrom(field.row, planetIndex), typeof value === "number" ? value : String(value ?? ""));
    }

    for (const field of planetStatusFields) {
      const value = isActivePlanet ? (planet.statuses[field.id] || EMPTY_PLANET_STATUS) : EMPTY_PLANET_STATUS;
      setRawCell(sheet, addressFrom(field.row, planetIndex), Number(value.level || 0));
    }
  }
}

async function loadWorkbookCache(): Promise<WorkbookCache> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(WORKBOOK_PATH);

  const rawSheets: Record<string, RawSheet> = {};
  for (const worksheet of workbook.worksheets) {
    const rows: RawSheet = [];
    for (let row = 1; row <= worksheet.rowCount; row++) {
      const cols: RawCell[] = [];
      for (let col = 1; col <= worksheet.columnCount; col++) {
        cols.push(valueToRawCell(worksheet.getRow(row).getCell(col)));
      }
      rows.push(cols);
    }
    rawSheets[worksheet.name] = rows;
  }

  const config: ProductionSimulatorConfig = {
    globalFields: globalFields.map(({ cell, ...field }) => field),
    planetFields: planetFields.map(({ row, ...field }) => field),
    planetStatusFields: planetStatusFields.map(({ row, ...field }) => field),
    metrics: metrics.map(({ cell, ...metric }) => metric),
    defaultState: {
      base: buildScenarioState(rawSheets["1. Base"]),
      simulation: buildScenarioState(rawSheets["2. Simulation"]),
    },
  };

  return { rawSheets, config };
}

async function getWorkbookCache(): Promise<WorkbookCache> {
  if (!workbookCachePromise) {
    workbookCachePromise = loadWorkbookCache();
  }
  return workbookCachePromise;
}

export async function getProductionSimulatorConfig(): Promise<ProductionSimulatorConfig> {
  const cache = await getWorkbookCache();
  return JSON.parse(JSON.stringify(cache.config)) as ProductionSimulatorConfig;
}

export async function calculateProductionSimulator(
  base: SimulatorScenarioState,
  simulation: SimulatorScenarioState,
): Promise<ProductionSimulatorResult> {
  const cache = await getWorkbookCache();
  const rawSheets = cloneRawSheets(cache.rawSheets);

  applyScenarioToSheet(rawSheets["1. Base"], base);
  applyScenarioToSheet(rawSheets["2. Simulation"], simulation);

  const hfSheets = Object.fromEntries(
    Object.entries(rawSheets).map(([sheetName, rows]) => [
      sheetName,
      rows.map((row) => row.map(rawCellToHyperFormula)),
    ]),
  );

  const hf = HyperFormula.buildFromSheets(hfSheets, {
    licenseKey: "gpl-v3",
  });

  const metricsSheetId = requireSheetId(hf, "4. Synthèse");
  const baseSheetId = requireSheetId(hf, "1. Base");
  const simulationSheetId = requireSheetId(hf, "2. Simulation");

  const metricValues = Object.fromEntries(
    metrics.map((metric) => {
      const address = requireAddress(hf, metric.cell, metricsSheetId);
      return [metric.id, normalizeCellValue(hf.getCellValue(address))];
    }),
  );

  const baseTotals = Object.fromEntries(
    Object.entries(totalCells).map(([id, cell]) => {
      const address = requireAddress(hf, cell, baseSheetId);
      return [id, normalizeCellValue(hf.getCellValue(address))];
    }),
  );

  const simulationTotals = Object.fromEntries(
    Object.entries(totalCells).map(([id, cell]) => {
      const address = requireAddress(hf, cell, simulationSheetId);
      return [id, normalizeCellValue(hf.getCellValue(address))];
    }),
  );

  const baseBonuses = Object.fromEntries(
    Object.entries(bonusTotalCells).map(([id, cell]) => {
      const address = requireAddress(hf, cell, baseSheetId);
      return [id, normalizeCellValue(hf.getCellValue(address))];
    }),
  );

  const simulationBonuses = Object.fromEntries(
    Object.entries(bonusTotalCells).map(([id, cell]) => {
      const address = requireAddress(hf, cell, simulationSheetId);
      return [id, normalizeCellValue(hf.getCellValue(address))];
    }),
  );

  return {
    metrics: metricValues,
    baseBonuses,
    simulationBonuses,
    baseTotals,
    simulationTotals,
  };
}

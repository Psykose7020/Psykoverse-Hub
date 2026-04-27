export type ResourceCost = {
  m: number;
  c: number;
  d: number;
};

export type LevelScaledEntity = {
  name: string;
  baseCost: ResourceCost;
  factor: number;
};

export const BUILDINGS: Record<string, LevelScaledEntity> = {
  metal: { name: "Mine de métal", baseCost: { m: 60, c: 15, d: 0 }, factor: 1.5 },
  crystal: { name: "Mine de cristal", baseCost: { m: 48, c: 24, d: 0 }, factor: 1.6 },
  deut: { name: "Synthétiseur de deutérium", baseCost: { m: 225, c: 75, d: 0 }, factor: 1.5 },
  solar: { name: "Centrale solaire", baseCost: { m: 75, c: 30, d: 0 }, factor: 1.5 },
  fusion: { name: "Centrale de fusion", baseCost: { m: 900, c: 360, d: 180 }, factor: 1.8 },
  robots: { name: "Usine de robots", baseCost: { m: 400, c: 120, d: 200 }, factor: 2 },
  nanite: { name: "Usine de nanites", baseCost: { m: 1_000_000, c: 500_000, d: 100_000 }, factor: 2 },
  shipyard: { name: "Chantier spatial", baseCost: { m: 400, c: 200, d: 100 }, factor: 2 },
  lab: { name: "Laboratoire", baseCost: { m: 200, c: 400, d: 200 }, factor: 2 },
  terraformer: { name: "Terraformeur", baseCost: { m: 0, c: 50_000, d: 100_000 }, factor: 2 },
  silo: { name: "Silo de missiles", baseCost: { m: 20_000, c: 20_000, d: 1_000 }, factor: 2 },
  lunarBase: { name: "Base lunaire", baseCost: { m: 20_000, c: 40_000, d: 20_000 }, factor: 2 },
  phalanx: { name: "Phalange", baseCost: { m: 20_000, c: 40_000, d: 20_000 }, factor: 2 },
  jumpGate: { name: "Porte de saut", baseCost: { m: 2_000_000, c: 4_000_000, d: 2_000_000 }, factor: 2 },
};

export const RESEARCHES: Record<string, LevelScaledEntity> = {
  espionnage: { name: "Tech. espionnage", baseCost: { m: 200, c: 1_000, d: 200 }, factor: 2 },
  ordinateur: { name: "Tech. ordinateur", baseCost: { m: 0, c: 400, d: 600 }, factor: 2 },
  armes: { name: "Tech. armes", baseCost: { m: 800, c: 200, d: 0 }, factor: 2 },
  bouclier: { name: "Tech. bouclier", baseCost: { m: 200, c: 600, d: 0 }, factor: 2 },
  protection: { name: "Tech. protection des vaisseaux spatiaux", baseCost: { m: 1_000, c: 0, d: 0 }, factor: 2 },
  energie: { name: "Tech. énergie", baseCost: { m: 0, c: 800, d: 400 }, factor: 2 },
  hyperespace: { name: "Tech. hyperespace", baseCost: { m: 0, c: 4_000, d: 2_000 }, factor: 2 },
  combustion: { name: "Réacteur à combustion", baseCost: { m: 400, c: 0, d: 600 }, factor: 2 },
  impulsion: { name: "Réacteur à impulsion", baseCost: { m: 2_000, c: 4_000, d: 600 }, factor: 2 },
  propulsion: { name: "Propulseur hyperespace", baseCost: { m: 10_000, c: 20_000, d: 6_000 }, factor: 2 },
  laser: { name: "Tech. laser", baseCost: { m: 200, c: 100, d: 0 }, factor: 2 },
  ions: { name: "Tech. ions", baseCost: { m: 1_000, c: 300, d: 100 }, factor: 2 },
  plasma: { name: "Tech. plasma", baseCost: { m: 2_000, c: 4_000, d: 1_000 }, factor: 2 },
  rri: { name: "RRI", baseCost: { m: 240_000, c: 400_000, d: 160_000 }, factor: 2 },
  astrophysique: { name: "Astrophysique", baseCost: { m: 4_000, c: 8_000, d: 4_000 }, factor: 1.75 },
  graviton: { name: "Graviton", baseCost: { m: 0, c: 0, d: 0 }, factor: 3 },
};

export const SHIPS: Record<string, { name: string; consumption: number; baseSpeed: number }> = {
  pt: { name: "Petit transporteur", consumption: 10, baseSpeed: 5_000 },
  gt: { name: "Grand transporteur", consumption: 50, baseSpeed: 7_500 },
  lf: { name: "Chasseur léger", consumption: 20, baseSpeed: 12_500 },
  hf: { name: "Chasseur lourd", consumption: 75, baseSpeed: 10_000 },
  cruiser: { name: "Croiseur", consumption: 300, baseSpeed: 15_000 },
  bs: { name: "Vaisseau de bataille", consumption: 500, baseSpeed: 10_000 },
  bc: { name: "Traqueur", consumption: 250, baseSpeed: 10_000 },
  bb: { name: "Bombardier", consumption: 700, baseSpeed: 4_000 },
  destroyer: { name: "Destructeur", consumption: 1_000, baseSpeed: 5_000 },
  rip: { name: "Étoile de la mort", consumption: 1, baseSpeed: 100 },
  reaper: { name: "Faucheur", consumption: 1_100, baseSpeed: 7_000 },
  pathfinder: { name: "Éclaireur", consumption: 300, baseSpeed: 12_000 },
  recycler: { name: "Recycleur", consumption: 300, baseSpeed: 2_000 },
  probe: { name: "Sonde d'espionnage", consumption: 1, baseSpeed: 100_000_000 },
  colony: { name: "Vaisseau de colonisation", consumption: 1_000, baseSpeed: 2_500 },
};

export const COLONIZATION_POSITION_DATA: Record<
  number,
  { casesMin: number; casesMax: number; tempMin: number; tempMax: number }
> = {
  1: { casesMin: 96, casesMax: 172, tempMin: 220, tempMax: 260 },
  2: { casesMin: 104, casesMax: 176, tempMin: 170, tempMax: 210 },
  3: { casesMin: 112, casesMax: 182, tempMin: 120, tempMax: 160 },
  4: { casesMin: 118, casesMax: 208, tempMin: 70, tempMax: 110 },
  5: { casesMin: 133, casesMax: 232, tempMin: 60, tempMax: 100 },
  6: { casesMin: 146, casesMax: 242, tempMin: 50, tempMax: 90 },
  7: { casesMin: 152, casesMax: 248, tempMin: 40, tempMax: 80 },
  8: { casesMin: 156, casesMax: 252, tempMin: 30, tempMax: 70 },
  9: { casesMin: 150, casesMax: 246, tempMin: 20, tempMax: 60 },
  10: { casesMin: 142, casesMax: 232, tempMin: 10, tempMax: 50 },
  11: { casesMin: 136, casesMax: 210, tempMin: 0, tempMax: 40 },
  12: { casesMin: 125, casesMax: 186, tempMin: -10, tempMax: 30 },
  13: { casesMin: 114, casesMax: 172, tempMin: -50, tempMax: -10 },
  14: { casesMin: 100, casesMax: 168, tempMin: -90, tempMax: -50 },
  15: { casesMin: 90, casesMax: 164, tempMin: -130, tempMax: -90 },
};

export interface ProductionSimulatorTechMeta {
  id: string;
  slot: `${1 | 2 | 3}-${1 | 2 | 3 | 4 | 5 | 6}`;
  race: "Humains" | "Rocta" | "Méca" | "Kaelesh";
  title: string;
  bonus: string;
  imageUrl: string;
}

const tech = (
  id: string,
  slot: ProductionSimulatorTechMeta["slot"],
  race: ProductionSimulatorTechMeta["race"],
  title: string,
  bonus: string,
  imageUrl: string,
): ProductionSimulatorTechMeta => ({ id, slot, race, title, bonus, imageUrl });

export const productionSimulatorTechs: ProductionSimulatorTechMeta[] = [
  tech("human_1_2", "1-2", "Humains", "Extracteurs haute performance", "Trio +0,06%", "/attached_assets/Database/Recherches  FDV/Humains/1-2ExtracteursHautePerfomance.png"),
  tech("human_2_2", "2-2", "Humains", "Technologies d'extraction améliorées", "Trio +0,06%", "/attached_assets/Database/Recherches  FDV/Humains/2-2TechnologiesExtractionAmeliorees.png"),
  tech("meca_1_1", "1-1", "Méca", "Technique de catalyse", "Deut +0,08%", "/attached_assets/Database/Recherches  FDV/Mécas/1-1TechniqueCatalyse.png"),
  tech("meca_1_6", "1-6", "Méca", "Chaîne de production automatisée", "Trio +0,06%", "/attached_assets/Database/Recherches  FDV/Mécas/1-6ChaineProductionAutomatisée.png"),
  tech("meca_3_1", "3-1", "Méca", "Intelligence artificielle collective", "Trio +0,06%", "/attached_assets/Database/Recherches  FDV/Mécas/3-1IntelligenceArtificielleCollective.png"),
  tech("rocta_1_2", "1-2", "Rocta", "Sondage acoustique", "Cristal +0,08%", "/attached_assets/Database/Recherches  FDV/Roctas/1-2SondageAcoustique.png"),
  tech("rocta_1_3", "1-3", "Rocta", "Système de pompage haute énergie", "Deut +0,08%", "/attached_assets/Database/Recherches  FDV/Roctas/1-3SystemePompageHauteEnergie.png"),
  tech("rocta_1_5", "1-5", "Rocta", "Extraction magmatique", "Trio +0,06%", "/attached_assets/Database/Recherches  FDV/Roctas/1-5ExtractionMagmatique.png"),
  tech("rocta_2_1", "2-1", "Rocta", "Sondage en profondeur", "Métal +0,08%", "/attached_assets/Database/Recherches  FDV/Roctas/2-1SondageProfondeur.png"),
  tech("rocta_2_4", "2-4", "Rocta", "Tête de forage diamant renforcée", "Métal +0,08%", "/attached_assets/Database/Recherches  FDV/Roctas/2-4TeteForageDiamentRenforcée.png"),
  tech("rocta_2_5", "2-5", "Rocta", "Technologie d'extraction sismique", "Cristal +0,08%", "/attached_assets/Database/Recherches  FDV/Roctas/2-5TechnologieExtractionSismique.png"),
  tech("rocta_2_6", "2-6", "Rocta", "Pompe à magma", "Deut +0,08%", "/attached_assets/Database/Recherches  FDV/Roctas/2-6PompeMagma.png"),
  tech("rocta_3_6", "3-6", "Rocta", "Renfort Collecteur", "Collecteur +0,02%", "/attached_assets/Database/Recherches  FDV/Roctas/3-6RenfortCollecteur.png"),
  tech("kaelesh_1_2", "1-2", "Kaelesh", "Traitement du sulfure", "Deut +0,08%", "/attached_assets/Database/Recherches  FDV/Kaeleshs/1-2TraitementSulfure.png"),
  tech("kaelesh_2_6", "2-6", "Kaelesh", "Harmoniseur psychique", "Trio +0,06%", "/attached_assets/Database/Recherches  FDV/Kaeleshs/2-6HarmoniseurPsychique.png"),
];

export const productionSimulatorTechMap = Object.fromEntries(
  productionSimulatorTechs.map((item) => [item.id, item]),
) as Record<string, ProductionSimulatorTechMeta>;

export const productionSimulatorTechSlots = [
  "1-1", "1-2", "2-1", "2-2", "3-1", "3-2",
  "1-3", "1-4", "2-3", "2-4", "3-3", "3-4",
  "1-5", "1-6", "2-5", "2-6", "3-5", "3-6",
] as const;

export type ProductionSimulatorTechSlot = typeof productionSimulatorTechSlots[number];

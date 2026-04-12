import imgPetitTransporteur from "@assets/ogame_ships/petit-transporteur.png";
import imgGrandTransporteur from "@assets/ogame_ships/grand-transporteur.png";
import imgVaisseauColonisation from "@assets/ogame_ships/vaisseau-colonisation.png";
import imgRecycleur from "@assets/ogame_ships/recycleur.png";
import imgSondeEspionnage from "@assets/ogame_ships/sonde-espionnage.png";
import imgSatelliteSolaire from "@assets/ogame_ships/satellite-solaire.png";
import imgChasseurLeger from "@assets/ogame_ships/chasseur-leger.png";
import imgChasseurLourd from "@assets/ogame_ships/chasseur-lourd.png";
import imgCroiseur from "@assets/ogame_ships/croiseur.png";
import imgVaisseauBataille from "@assets/ogame_ships/vaisseau-bataille.png";
import imgBombardier from "@assets/ogame_ships/bombardier.png";
import imgDestructeur from "@assets/ogame_ships/destructeur.png";
import imgTraqueur from "@assets/ogame_ships/traqueur.png";
import imgEtoileMort from "@assets/ogame_ships/etoile-mort.png";
import imgFaucheur from "@assets/ogame_ships/faucheur.png";
import imgEclaireur from "@assets/ogame_ships/eclaireur.png";
import imgLanceurMissiles from "@assets/ogame_ships/lanceur-missiles.png";
import imgLaserLeger from "@assets/ogame_ships/laser-leger.png";
import imgLaserLourd from "@assets/ogame_ships/laser-lourd.png";
import imgCanonGauss from "@assets/ogame_ships/canon-gauss.png";
import imgArtillerieIons from "@assets/ogame_ships/artillerie-ions.png";
import imgLanceurPlasma from "@assets/ogame_ships/lanceur-plasma.png";
import imgPetitBouclier from "@assets/ogame_ships/petit-bouclier.png";
import imgGrandBouclier from "@assets/ogame_ships/grand-bouclier.png";

export type OGameImageCategory = "fleet" | "defense";
export type OGameFleetRole = "civil" | "combat";

export interface OGameImageEntry {
  id: string;
  code: string;
  name: string;
  image: string;
  category: OGameImageCategory;
  role?: OGameFleetRole;
}

export const ogameFleetImageDatabase: OGameImageEntry[] = [
  { id: "pt", code: "PT", name: "Petit Transporteur", image: imgPetitTransporteur, category: "fleet", role: "civil" },
  { id: "gt", code: "GT", name: "Grand Transporteur", image: imgGrandTransporteur, category: "fleet", role: "civil" },
  { id: "vc", code: "VC", name: "Vaisseau de Colonisation", image: imgVaisseauColonisation, category: "fleet", role: "civil" },
  { id: "rec", code: "REC", name: "Recycleur", image: imgRecycleur, category: "fleet", role: "civil" },
  { id: "se", code: "SE", name: "Sonde d'Espionnage", image: imgSondeEspionnage, category: "fleet", role: "civil" },
  { id: "sat", code: "SAT", name: "Satellite Solaire", image: imgSatelliteSolaire, category: "fleet", role: "civil" },
  { id: "cl", code: "CL", name: "Chasseur Léger", image: imgChasseurLeger, category: "fleet", role: "combat" },
  { id: "clo", code: "CLo", name: "Chasseur Lourd", image: imgChasseurLourd, category: "fleet", role: "combat" },
  { id: "cr", code: "CR", name: "Croiseur", image: imgCroiseur, category: "fleet", role: "combat" },
  { id: "vb", code: "VB", name: "Vaisseau de Bataille", image: imgVaisseauBataille, category: "fleet", role: "combat" },
  { id: "bb", code: "BB", name: "Bombardier", image: imgBombardier, category: "fleet", role: "combat" },
  { id: "dest", code: "DEST", name: "Destructeur", image: imgDestructeur, category: "fleet", role: "combat" },
  { id: "traq", code: "TRAQ", name: "Traqueur", image: imgTraqueur, category: "fleet", role: "combat" },
  { id: "edm", code: "EDM", name: "Étoile de la Mort", image: imgEtoileMort, category: "fleet", role: "combat" },
  { id: "fauch", code: "FAUCH", name: "Faucheur", image: imgFaucheur, category: "fleet", role: "combat" },
  { id: "ecl", code: "ECL", name: "Éclaireur", image: imgEclaireur, category: "fleet", role: "combat" },
];

export const ogameDefenseImageDatabase: OGameImageEntry[] = [
  { id: "lm", code: "LM", name: "Lanceur de Missiles", image: imgLanceurMissiles, category: "defense" },
  { id: "ll", code: "LL", name: "Artillerie Laser Légère", image: imgLaserLeger, category: "defense" },
  { id: "llo", code: "LLo", name: "Artillerie Laser Lourde", image: imgLaserLourd, category: "defense" },
  { id: "gauss", code: "Gauss", name: "Canon de Gauss", image: imgCanonGauss, category: "defense" },
  { id: "ion", code: "Ion", name: "Artillerie à Ions", image: imgArtillerieIons, category: "defense" },
  { id: "plasma", code: "Plasma", name: "Lanceur de Plasma", image: imgLanceurPlasma, category: "defense" },
  { id: "pb", code: "PB", name: "Petit Bouclier", image: imgPetitBouclier, category: "defense" },
  { id: "gb", code: "GB", name: "Grand Bouclier", image: imgGrandBouclier, category: "defense" },
];

export const ogameImageDatabase: OGameImageEntry[] = [
  ...ogameFleetImageDatabase,
  ...ogameDefenseImageDatabase,
];

export const ogameImageByCode = Object.fromEntries(
  ogameImageDatabase.map((entry) => [entry.code, entry]),
) as Record<string, OGameImageEntry>;

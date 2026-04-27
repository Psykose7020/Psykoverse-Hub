import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { allGuides } from "@/data/guides";

interface RelatedGuide {
  title: string;
  link: string;
}

interface RelatedGuidesProps {
  currentGuide: string;
}

const guideRelations: Record<string, RelatedGuide[]> = {
  "interface": [
    { title: "Jargon OGame", link: "/guide/jargon" },
    { title: "Paramètres Univers", link: "/guide/univers" },
    { title: "Classes de joueur", link: "/guide/classes" }
  ],
  "jargon": [
    { title: "L'Interface", link: "/guide/interface" },
    { title: "Paramètres Univers", link: "/guide/univers" },
    { title: "Classes de joueur", link: "/guide/classes" }
  ],
  "univers": [
    { title: "L'Interface", link: "/guide/interface" },
    { title: "Jargon OGame", link: "/guide/jargon" },
    { title: "Classes de joueur", link: "/guide/classes" }
  ],
  "classes": [
    { title: "Classes d'Alliance", link: "/guide/alliance-classes" },
    { title: "Production", link: "/guide/production" },
    { title: "Développement", link: "/guide/developpement" }
  ],
  "alliance-classes": [
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "ACS (Combat de groupe)", link: "/guide/acs" },
    { title: "Optimisation RRI", link: "/guide/rri" }
  ],
  "production": [
    { title: "Technos Prioritaires", link: "/guide/technos-prioritaires" },
    { title: "Développement", link: "/guide/developpement" },
    { title: "Formules & Calculateurs", link: "/guide/formules" }
  ],
  "technos-prioritaires": [
    { title: "Production", link: "/guide/production" },
    { title: "Recherches", link: "/guide/recherches" },
    { title: "Chantier spatial", link: "/guide/chantier" }
  ],
  "recherches": [
    { title: "Technos Prioritaires", link: "/guide/technos-prioritaires" },
    { title: "Chantier spatial", link: "/guide/chantier" },
    { title: "Optimisation RRI", link: "/guide/rri" }
  ],
  "chantier": [
    { title: "Coûts Flotte & Défenses", link: "/guide/cout-flotte" },
    { title: "Guide des Défenses", link: "/guide/defenses" },
    { title: "Rapid Fire", link: "/guide/rapid-fire" }
  ],
  "cout-flotte": [
    { title: "Chantier spatial", link: "/guide/chantier" },
    { title: "Formules & Calculateurs", link: "/guide/formules" },
    { title: "Split Flotte", link: "/guide/split" }
  ],
  "formules": [
    { title: "Production", link: "/guide/production" },
    { title: "Coûts Flotte & Défenses", link: "/guide/cout-flotte" },
    { title: "RF : Formules", link: "/guide/rapid-fire-formules" }
  ],
  "developpement": [
    { title: "Production", link: "/guide/production" },
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Colonisation", link: "/guide/colonisation" }
  ],
  "colonisation": [
    { title: "Développement", link: "/guide/developpement" },
    { title: "Vue Galaxie", link: "/guide/galaxie" },
    { title: "Expéditions", link: "/guide/expeditions" }
  ],
  "galaxie": [
    { title: "Colonisation", link: "/guide/colonisation" },
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Recherche de cibles", link: "/guide/recherche-cibles" }
  ],
  "expeditions": [
    { title: "Colonisation", link: "/guide/colonisation" },
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Lune & CDR", link: "/guide/lune" }
  ],
  "volante": [
    { title: "Fleetsave", link: "/guide/fleetsave" },
    { title: "Chantier spatial", link: "/guide/chantier" },
    { title: "Expéditions", link: "/guide/expeditions" }
  ],
  "rri": [
    { title: "Recherches", link: "/guide/recherches" },
    { title: "Colonisation", link: "/guide/colonisation" },
    { title: "Classes d'Alliance", link: "/guide/alliance-classes" }
  ],
  "espionnage": [
    { title: "Activité", link: "/guide/activite" },
    { title: "Recherche de cibles", link: "/guide/recherche-cibles" },
    { title: "Attaque", link: "/guide/attaque" }
  ],
  "activite": [
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Fleetsave", link: "/guide/fleetsave" },
    { title: "Recherche de cibles", link: "/guide/recherche-cibles" }
  ],
  "recherche-cibles": [
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Reco de 3h00", link: "/guide/reco-3h" },
    { title: "Timing & Connexions", link: "/guide/timing-raid" }
  ],
  "reco-3h": [
    { title: "Recherche de cibles", link: "/guide/recherche-cibles" },
    { title: "Décalage à la Sonde", link: "/guide/decalage-sonde" },
    { title: "Tips du Bon Raideur", link: "/guide/raid" }
  ],
  "decalage-sonde": [
    { title: "Reco de 3h00", link: "/guide/reco-3h" },
    { title: "Éviter Interception", link: "/guide/eviter-interception" },
    { title: "Espionnage", link: "/guide/espionnage" }
  ],
  "timing-raid": [
    { title: "Recherche de cibles", link: "/guide/recherche-cibles" },
    { title: "Activité", link: "/guide/activite" },
    { title: "Tips du Bon Raideur", link: "/guide/raid" }
  ],
  "attaque": [
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Tips du Bon Raideur", link: "/guide/raid" },
    { title: "Chantier spatial", link: "/guide/chantier" }
  ],
  "raid": [
    { title: "Attaque", link: "/guide/attaque" },
    { title: "Split Flotte", link: "/guide/split" },
    { title: "Éviter Interception", link: "/guide/eviter-interception" }
  ],
  "split": [
    { title: "Tips du Bon Raideur", link: "/guide/raid" },
    { title: "Rapid Fire", link: "/guide/rapid-fire" },
    { title: "Coûts Flotte & Défenses", link: "/guide/cout-flotte" }
  ],
  "acs": [
    { title: "Attaque", link: "/guide/attaque" },
    { title: "Classes d'Alliance", link: "/guide/alliance-classes" },
    { title: "MoonBreak", link: "/guide/moonbreak" }
  ],
  "rapid-fire": [
    { title: "RF : Formules", link: "/guide/rapid-fire-formules" },
    { title: "Split Flotte", link: "/guide/split" },
    { title: "Chantier spatial", link: "/guide/chantier" }
  ],
  "rapid-fire-formules": [
    { title: "Rapid Fire", link: "/guide/rapid-fire" },
    { title: "Formules & Calculateurs", link: "/guide/formules" },
    { title: "Coûts Flotte & Défenses", link: "/guide/cout-flotte" }
  ],
  "fleetsave": [
    { title: "Guide des Défenses", link: "/guide/defenses" },
    { title: "Lune & CDR", link: "/guide/lune" },
    { title: "Volantes", link: "/guide/volante" }
  ],
  "eviter-interception": [
    { title: "Tips du Bon Raideur", link: "/guide/raid" },
    { title: "Décalage à la Sonde", link: "/guide/decalage-sonde" },
    { title: "Fleetsave", link: "/guide/fleetsave" }
  ],
  "moonbreak": [
    { title: "Lune & CDR", link: "/guide/lune" },
    { title: "ACS", link: "/guide/acs" },
    { title: "Fleetsave", link: "/guide/fleetsave" }
  ],
  "classements": [
    { title: "Attaque", link: "/guide/attaque" },
    { title: "Fleetsave", link: "/guide/fleetsave" },
    { title: "MoonBreak", link: "/guide/moonbreak" }
  ],
  "lune": [
    { title: "MoonBreak", link: "/guide/moonbreak" },
    { title: "Fleetsave", link: "/guide/fleetsave" },
    { title: "Expéditions", link: "/guide/expeditions" }
  ],
  "fdv": [
    { title: "Rock'tal & Mineur", link: "/guide/rocktal" },
    { title: "Réduction Temps FDV", link: "/guide/reduction-fdv" },
    { title: "Classes de joueur", link: "/guide/classes" }
  ],
  "rocktal": [
    { title: "Guide Complet FDV", link: "/guide/fdv" },
    { title: "Production", link: "/guide/production" },
    { title: "Réduction Temps FDV", link: "/guide/reduction-fdv" }
  ],
  "reduction-fdv": [
    { title: "Guide Complet FDV", link: "/guide/fdv" },
    { title: "Rock'tal & Mineur", link: "/guide/rocktal" },
    { title: "Formules & Calculateurs", link: "/guide/formules" }
  ],
  "defenses": [
    { title: "Chantier spatial", link: "/guide/chantier" },
    { title: "Fleetsave", link: "/guide/fleetsave" },
    { title: "Coûts Flotte & Défenses", link: "/guide/cout-flotte" }
  ],
  "batiments": [
    { title: "Ordre de Construction", link: "/guide/ordre-construction" },
    { title: "Production", link: "/guide/production" },
    { title: "Formules & Calculateurs", link: "/guide/formules" }
  ],
  "consommation": [
    { title: "Guide : Temps de Vol", link: "/guide/calc-temps-vol" },
    { title: "Intercepteur de Flotte", link: "/outils/intercepteur" },
    { title: "Tips du Bon Raideur", link: "/guide/raid" }
  ],
  "calc-temps-vol": [
    { title: "Calculateur Temps de Vol", link: "/outils/temps-vol" },
    { title: "Intercepteur de Flotte", link: "/outils/intercepteur" },
    { title: "Calculateur Consommation", link: "/outils/consommation" }
  ],
  "ordre-construction": [
    { title: "Calculateur Bâtiments", link: "/outils/batiments" },
    { title: "Production", link: "/guide/production" },
    { title: "Technos Prioritaires", link: "/guide/technos-prioritaires" }
  ]
};

export default function RelatedGuides({ currentGuide }: RelatedGuidesProps) {
  const guides = (guideRelations[currentGuide] || []).map((guide) => {
    const metadata = allGuides.find((entry) => entry.link === guide.link);
    return metadata ? { ...guide, title: metadata.title } : guide;
  });
  
  if (guides.length === 0) return null;
  
  return (
    <div className="bg-gradient-to-r from-primary/10 to-cyan-900/20 border border-primary/30 rounded-xl p-6 mt-8">
      <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
        <ArrowRight className="w-5 h-5 text-primary" />
        Guides connexes
      </h3>
      <div className="flex flex-wrap gap-3">
        {guides.map((guide, index) => (
          <Link key={index} href={guide.link}>
            <span className="inline-flex items-center gap-2 bg-[#151924] hover:bg-[#1C2230] text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer">
              → {guide.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

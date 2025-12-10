import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface RelatedGuide {
  title: string;
  link: string;
}

interface RelatedGuidesProps {
  currentGuide: string;
}

const guideRelations: Record<string, RelatedGuide[]> = {
  "interface": [
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Production & Énergie", link: "/guide/production" },
    { title: "Vue Galaxie", link: "/guide/galaxie" }
  ],
  "classes": [
    { title: "Classes d'Alliance", link: "/guide/alliance-classes" },
    { title: "Production & Énergie", link: "/guide/production" },
    { title: "Expéditions", link: "/guide/expeditions" }
  ],
  "production": [
    { title: "Colonisation", link: "/guide/colonisation" },
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Développement", link: "/guide/developpement" }
  ],
  "chantier": [
    { title: "Attaque & Combat", link: "/guide/attaque" },
    { title: "Techniques de Raid", link: "/guide/raid" },
    { title: "Fleetsave", link: "/guide/fleetsave" }
  ],
  "galaxie": [
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Colonisation", link: "/guide/colonisation" },
    { title: "Activité", link: "/guide/activite" }
  ],
  "jargon": [
    { title: "L'Interface", link: "/guide/interface" },
    { title: "Vue Galaxie", link: "/guide/galaxie" },
    { title: "Attaque & Combat", link: "/guide/attaque" }
  ],
  "recherches": [
    { title: "Production & Énergie", link: "/guide/production" },
    { title: "Chantier spatial", link: "/guide/chantier" },
    { title: "Développement", link: "/guide/developpement" }
  ],
  "colonisation": [
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Production & Énergie", link: "/guide/production" },
    { title: "Lune & CDR", link: "/guide/lune" }
  ],
  "classements": [
    { title: "Attaque & Combat", link: "/guide/attaque" },
    { title: "Techniques de Raid", link: "/guide/raid" },
    { title: "ACS", link: "/guide/acs" }
  ],
  "fleetsave": [
    { title: "Activité", link: "/guide/activite" },
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Lune & CDR", link: "/guide/lune" }
  ],
  "espionnage": [
    { title: "Attaque & Combat", link: "/guide/attaque" },
    { title: "Techniques de Raid", link: "/guide/raid" },
    { title: "Vue Galaxie", link: "/guide/galaxie" }
  ],
  "expeditions": [
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Chantier spatial", link: "/guide/chantier" },
    { title: "Lune & CDR", link: "/guide/lune" }
  ],
  "lune": [
    { title: "MoonBreak", link: "/guide/moonbreak" },
    { title: "Fleetsave", link: "/guide/fleetsave" },
    { title: "Phalanges", link: "/guide/espionnage" }
  ],
  "attaque": [
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Techniques de Raid", link: "/guide/raid" },
    { title: "ACS", link: "/guide/acs" }
  ],
  "acs": [
    { title: "Attaque & Combat", link: "/guide/attaque" },
    { title: "Classes d'Alliance", link: "/guide/alliance-classes" },
    { title: "MoonBreak", link: "/guide/moonbreak" }
  ],
  "raid": [
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Split Flotte", link: "/guide/split" },
    { title: "Activité", link: "/guide/activite" }
  ],
  "developpement": [
    { title: "Production & Énergie", link: "/guide/production" },
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Colonisation", link: "/guide/colonisation" }
  ],
  "split": [
    { title: "Techniques de Raid", link: "/guide/raid" },
    { title: "Attaque & Combat", link: "/guide/attaque" },
    { title: "Chantier spatial", link: "/guide/chantier" }
  ],
  "moonbreak": [
    { title: "Lune & CDR", link: "/guide/lune" },
    { title: "Chantier spatial", link: "/guide/chantier" },
    { title: "ACS", link: "/guide/acs" }
  ],
  "volante": [
    { title: "Fleetsave", link: "/guide/fleetsave" },
    { title: "Chantier spatial", link: "/guide/chantier" },
    { title: "Attaque & Combat", link: "/guide/attaque" }
  ],
  "fdv": [
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Production & Énergie", link: "/guide/production" },
    { title: "Recherches", link: "/guide/recherches" }
  ],
  "univers": [
    { title: "L'Interface", link: "/guide/interface" },
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "Développement", link: "/guide/developpement" }
  ],
  "activite": [
    { title: "Fleetsave", link: "/guide/fleetsave" },
    { title: "Espionnage", link: "/guide/espionnage" },
    { title: "Vue Galaxie", link: "/guide/galaxie" }
  ],
  "alliance-classes": [
    { title: "Classes de joueur", link: "/guide/classes" },
    { title: "ACS", link: "/guide/acs" },
    { title: "Techniques de Raid", link: "/guide/raid" }
  ]
};

export default function RelatedGuides({ currentGuide }: RelatedGuidesProps) {
  const guides = guideRelations[currentGuide] || [];
  
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

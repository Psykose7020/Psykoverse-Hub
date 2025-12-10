import { useState } from "react";
import { motion } from "framer-motion";
import { BookText, Search, Swords, FlaskConical, Rocket, Shield, Globe2, Moon, Users, Coins, Settings } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const categories = [
  {
    id: "combat",
    title: "Combat",
    icon: Swords,
    color: "from-red-500 to-rose-600",
    termes: [
      { terme: "Att", definition: "Attaque" },
      { terme: "Def", definition: "Défense" },
      { terme: "TR / RF", definition: "Tir Rapide (ou Rapid Fire)" },
      { terme: "Ghost", definition: "Cacher sa flotte" },
      { terme: "RDS", definition: "Retour de stationnement" },
      { terme: "AG", definition: "Attaque groupée" },
      { terme: "DG", definition: "Défense groupée" },
      { terme: "CDR", definition: "Champ de ruines" },
      { terme: "Ninja", definition: "Piège où le défenseur rappelle sa flotte pour surprendre l'attaquant" },
      { terme: "Raid", definition: "Attaque pour voler des ressources" },
      { terme: "Renta", definition: "Rentabilité - Bénéfice d'une attaque vs pertes" },
      { terme: "HoF", definition: "Hall of Fame - Combat avec beaucoup de pertes (top serveur)" },
      { terme: "Farm", definition: "Attaquer régulièrement la même cible inactive" }
    ]
  },
  {
    id: "recherches",
    title: "Recherches",
    icon: FlaskConical,
    color: "from-teal-500 to-cyan-600",
    termes: [
      { terme: "RRI", definition: "Réseau de recherche intergalactique" },
      { terme: "Expé", definition: "Expéditions p16" },
      { terme: "Tech", definition: "Technologie" }
    ]
  },
  {
    id: "flotte",
    title: "Flotte",
    icon: Rocket,
    color: "from-blue-500 to-indigo-600",
    termes: [
      { terme: "PT", definition: "Petit Transporteur" },
      { terme: "GT", definition: "Grand Transporteur" },
      { terme: "Cl / CLé", definition: "Chasseur Léger" },
      { terme: "CL / Clo", definition: "Chasseur Lourd" },
      { terme: "VB / VdB", definition: "Vaisseau de Bataille" },
      { terme: "Cro", definition: "Croiseur" },
      { terme: "REC", definition: "Recycleur" },
      { terme: "VC", definition: "Vaisseau de Colonisation" },
      { terme: "BB", definition: "Bombardier" },
      { terme: "EdlM / RIP", definition: "Étoile de la Mort" },
      { terme: "Sat", definition: "Satellites" },
      { terme: "(re)cyclo", definition: "Recycleurs (CDR sur les p1 à 15)" },
      { terme: "DEST", definition: "Destructeur" },
      { terme: "TRAQ", definition: "Traqueur" },
      { terme: "SE", definition: "Sonde d'Espionnage" },
      { terme: "FS / Fleetsave", definition: "Sauver sa flotte en l'envoyant en mission" }
    ]
  },
  {
    id: "defense",
    title: "Défense",
    icon: Shield,
    color: "from-green-500 to-emerald-600",
    termes: [
      { terme: "LM", definition: "Lanceurs missiles" },
      { terme: "LL", definition: "Laser léger" },
      { terme: "LLo", definition: "Laser lourd" },
      { terme: "Gauss", definition: "Canon de Gauss" },
      { terme: "Ions", definition: "Artillerie à ions" },
      { terme: "Plasma", definition: "Lanceur de plasma" },
      { terme: "PB", definition: "Petit bouclier" },
      { terme: "GB", definition: "Grand bouclier" },
      { terme: "Mip", definition: "Missile interplanétaire" },
      { terme: "Mit", definition: "Missile interception" },
      { terme: "Mippage", definition: "Attaque de missiles interplanétaire" }
    ]
  },
  {
    id: "planete",
    title: "Planète",
    icon: Globe2,
    color: "from-amber-500 to-orange-600",
    termes: [
      { terme: "PM", definition: "Planète Mère" },
      { terme: "PS / colo", definition: "Colonies" },
      { terme: "SS", definition: "Système Solaire" },
      { terme: "G", definition: "Galaxie" },
      { terme: "Vovo", definition: "Colonie Volante" },
      { terme: "DM", definition: "Déménagement" },
      { terme: "(i)", definition: "Joueur inactif (pas connecté depuis 7+ jours)" },
      { terme: "(I)", definition: "Joueur inactif long (pas connecté depuis 28+ jours)" }
    ]
  },
  {
    id: "lune",
    title: "Lune",
    icon: Moon,
    color: "from-gray-500 to-slate-600",
    termes: [
      { terme: "BL", definition: "Base lunaire" },
      { terme: "PDS", definition: "Porte de saut spatial" },
      { terme: "Phal", definition: "Phalange de capteur" },
      { terme: "Tenta lune", definition: "Tentative de création de lune" },
      { terme: "Tenta croisé", definition: "Joueurs s'offrent mutuellement des tentas de lunes" },
      { terme: "MD", definition: "Moon Destruction - Destruction de lune avec EDLM" }
    ]
  },
  {
    id: "diplomatie",
    title: "Diplomatie",
    icon: Users,
    color: "from-purple-500 to-violet-600",
    termes: [
      { terme: "PNA", definition: "Pacte de Non Aggression" },
      { terme: "PC", definition: "Pacte Commercial" },
      { terme: "PD", definition: "Pacte de Défense" },
      { terme: "PT", definition: "Pacte Total" },
      { terme: "Wing", definition: "Alliance sous traitante d'une autre" },
      { terme: "SAB", definition: "Stationner Chez un Allié - Défendre un membre d'alliance" }
    ]
  },
  {
    id: "ressources",
    title: "Ressources",
    icon: Coins,
    color: "from-yellow-500 to-amber-600",
    termes: [
      { terme: "Met / M", definition: "Métal" },
      { terme: "Cri / C", definition: "Cristal" },
      { terme: "Deut / D", definition: "Deutérium" },
      { terme: "CES", definition: "Centrale Électrique Solaire" },
      { terme: "CEF", definition: "Centrale Électrique à Fusion" },
      { terme: "NRJ", definition: "Énergie" },
      { terme: "AM", definition: "Antimatière" },
      { terme: "K", definition: "Kilo (x1000)" },
      { terme: "M", definition: "Million (x1000K)" },
      { terme: "G / Md / B", definition: "Giga / Milliard / Billion (x1000M)" },
      { terme: "T", definition: "Terra (x1000G)" }
    ]
  },
  {
    id: "autres",
    title: "Autres OGame",
    icon: Settings,
    color: "from-indigo-500 to-blue-600",
    termes: [
      { terme: "FDV", definition: "Forme de vie" },
      { terme: "Spy", definition: "Espionner" },
      { terme: "MP", definition: "Message Privé (PM vient de \"private message\")" },
      { terme: "RC", definition: "Rapport de Combat" },
      { terme: "MV", definition: "Mode Vacances" },
      { terme: "MAJ", definition: "Mise à Jour" },
      { terme: "Cases", definition: "Places sur une planète pour les bâtiments" },
      { terme: "Prod", definition: "Production des mines" },
      { terme: "Noob", definition: "Joueur débutant (terme anglais)" },
      { terme: "LB", definition: "Lootbox (pack de ressources €€)" },
      { terme: "Simu", definition: "Simulateur de combat (outil externe)" },
      { terme: "Slot", definition: "Emplacement de flotte disponible" }
    ]
  }
];

const allTermes = categories.flatMap(cat => 
  cat.termes.map(t => ({ ...t, category: cat.title }))
);

export default function GuideJargon() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = activeCategory 
    ? categories.filter(c => c.id === activeCategory)
    : categories;

  const searchResults = searchTerm 
    ? allTermes.filter(
        t => t.terme.toLowerCase().includes(searchTerm.toLowerCase()) ||
             t.definition.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-5xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
                <BookText className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Jargon OGamien
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Les abréviations et termes utilisés par la communauté
              </p>
            </div>

            <div className="mb-8">
              <div className="relative max-w-md mx-auto mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher un terme..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#1C2230] border border-[#2E384D] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                  data-testid="input-search-jargon"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === null 
                      ? 'bg-primary text-white' 
                      : 'bg-[#1C2230] text-gray-400 hover:text-white'
                  }`}
                  data-testid="button-category-all"
                >
                  Tout
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat.id 
                        ? 'bg-primary text-white' 
                        : 'bg-[#1C2230] text-gray-400 hover:text-white'
                    }`}
                    data-testid={`button-category-${cat.id}`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            {searchResults ? (
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-bold text-white mb-4">Résultats pour "{searchTerm}"</h2>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {searchResults.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                        <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded text-sm flex-shrink-0">
                          {item.terme}
                        </span>
                        <div>
                          <span className="text-gray-300 text-sm">{item.definition}</span>
                          <span className="text-gray-500 text-xs block mt-1">{item.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Aucun terme trouvé</p>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredCategories.map(category => {
                  const Icon = category.icon;
                  return (
                    <div key={category.id} className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden">
                      <div className={`bg-gradient-to-r ${category.color} p-4 flex items-center gap-3`}>
                        <Icon className="w-6 h-6 text-white" />
                        <h2 className="font-display text-lg font-bold text-white">{category.title}</h2>
                        <span className="ml-auto bg-white/20 px-2 py-0.5 rounded text-white text-sm">
                          {category.termes.length} termes
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
                        {category.termes.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                            <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded text-sm flex-shrink-0">
                              {item.terme}
                            </span>
                            <span className="text-gray-300 text-sm">{item.definition}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <RelatedGuides currentGuide="jargon" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

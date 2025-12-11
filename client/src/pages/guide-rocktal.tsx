import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mountain, Zap, Factory, Gem, Droplets, Clock, ChevronRight, CheckCircle, AlertTriangle, Target, TrendingUp, Users, Pickaxe, Building, FlaskConical, Layers } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const races = [
  {
    id: "humains",
    name: "Humains",
    color: "blue",
    bonus: [
      { text: "Production cristal et deut", value: "+1,5% / +1% par niveau" },
      { text: "Production métal", value: "+1,5% par niveau" },
      { text: "Amélioration technologies", value: "+0,5% par niveau" }
    ]
  },
  {
    id: "rocktal",
    name: "Rock'tal",
    color: "amber",
    recommended: true,
    bonus: [
      { text: "Production métal", value: "+2% par niveau" },
      { text: "Production cristal", value: "+2% par niveau" },
      { text: "Production deutérium", value: "+2% par niveau" },
      { text: "Production énergie", value: "+1,5% par niveau" },
      { text: "Consommation énergie", value: "-0,5% par niveau" },
      { text: "Coût des mines", value: "-0,5% par niveau" },
      { text: "Temps/coût bâtiments FDV", value: "-1% par niveau" },
      { text: "Récupération CDR planète", value: "+0,6% par niveau" }
    ]
  },
  {
    id: "kalesh",
    name: "Kalesh",
    color: "purple",
    bonus: [
      { text: "Cases planète", value: "+2 par niveau" },
      { text: "Temps construction vaisseaux", value: "-1,5% par niveau" },
      { text: "Chances création lune + taille", value: "+0,5% par niveau" }
    ]
  },
  {
    id: "mechas",
    name: "Mechas",
    color: "cyan",
    bonus: [
      { text: "Temps construction vaisseaux", value: "-2% par niveau" },
      { text: "Production énergie", value: "+1% par niveau" },
      { text: "Amélioration technologies", value: "+0,3% / +0,4% par niveau" },
      { text: "Production deutérium", value: "+2% par niveau" },
      { text: "Épaves après bataille", value: "+1,3% par niveau" }
    ]
  }
];

const paliers = [
  {
    id: 1,
    title: "Premier Palier",
    subtitle: "Déblocage des technologies niveau 1",
    difficulty: "Très facile",
    difficultyColor: "green",
    when: "~1M points",
    cost: { metal: 380000, crystal: 115000, deut: 15000 },
    objective: "Population 1M N1",
    buildings: [
      { name: "Enclave Stoïque", level: 28 },
      { name: "Culture du Cristal", level: 29 },
      { name: "Centre Technologique", level: 1 }
    ],
    tips: "Très rapide à atteindre. Permet de débloquer toutes les technologies de niveau 1."
  },
  {
    id: 2,
    title: "Deuxième Palier",
    subtitle: "Déblocage des technologies niveau 2",
    difficulty: "Facile",
    difficultyColor: "green",
    when: "~5M points",
    cost: { metal: 59000000, crystal: 20000000, deut: 6000000 },
    objective: "Population 11M N2",
    buildings: [
      { name: "Enclave Stoïque", level: 51 },
      { name: "Culture du Cristal", level: 52 },
      { name: "Forge Runique", level: 8, note: "8% conversion N1→N2" }
    ],
    tips: "Temps de construction rapides. La conversion N1→N2 commence à être importante."
  },
  {
    id: 3,
    title: "Troisième Palier",
    subtitle: "Rendement optimisé",
    difficulty: "Intermédiaire",
    difficultyColor: "blue",
    when: "~15-20M points",
    cost: { metal: 671000000, crystal: 265000000, deut: 211000000 },
    cumulative: true,
    objective: "Bonus de production significatifs",
    buildings: [
      { name: "Monument Rocheux", level: 10, note: "-10% coût et durée", priority: true },
      { name: "Centre Techno", level: 20, note: "-40% temps recherche FDV" },
      { name: "Chambre de Disruption", level: 20, note: "+30% énergie, -10% conso" },
      { name: "Fusion Magmatique", level: 15, note: "+30% prod métal" },
      { name: "Raffinerie de Cristaux", level: 10, note: "+20% prod cristal" },
      { name: "Syntoniseur de Deut", level: 10, note: "+20% prod deut" }
    ],
    tips: "Développer en PREMIER le Monument Rocheux pour réduire les coûts des autres bâtiments !"
  },
  {
    id: 4,
    title: "Quatrième Palier",
    subtitle: "Production avancée",
    difficulty: "Avancé",
    difficultyColor: "orange",
    when: "Quand vous êtes prêt à investir",
    cost: { metal: 2240000000, crystal: 1220000000, deut: 656000000 },
    cumulative: true,
    objective: "Maximiser les bonus de production",
    buildings: [
      { name: "Chambre de Disruption", level: 30, note: "+45% énergie, -15% conso" },
      { name: "Fusion Magmatique", level: 20, note: "+40% prod métal" },
      { name: "Raffinerie de Cristaux", level: 15, note: "+30% prod cristal" },
      { name: "Syntoniseur de Deut", level: 15, note: "+30% prod deut" }
    ],
    tips: "Avant un certain niveau de mines, il peut être plus rentable de monter les mines directement."
  },
  {
    id: 5,
    title: "Cinquième Palier",
    subtitle: "Technologies niveau 3.2",
    difficulty: "Avancé",
    difficultyColor: "orange",
    when: "~250-300M points",
    cost: { metal: 2900000000, crystal: 1530000000, deut: 849000000 },
    cumulative: true,
    objective: "Population 26M N3",
    buildings: [
      { name: "Enclave Stoïque", level: 64 },
      { name: "Culture du Cristal", level: 66 },
      { name: "Forge Runique", level: 12 },
      { name: "Orictorium", level: 9 }
    ],
    tips: "Permet de débloquer notamment la technologie pour améliorer les stats des GT."
  },
  {
    id: 6,
    title: "Sixième Palier",
    subtitle: "Technologies niveau 3 complètes",
    difficulty: "Expert",
    difficultyColor: "red",
    when: "700-800M+ points",
    cost: { metal: 8540000000, crystal: 3330000000, deut: 884000000 },
    cumulative: true,
    objective: "Population 448M N3",
    buildings: [
      { name: "Enclave Stoïque", level: 75 },
      { name: "Culture du Cristal", level: 78 },
      { name: "Forge Runique", level: 16 },
      { name: "Orictorium", level: 11 }
    ],
    tips: "Les derniers niveaux prennent presque 1 journée à construire, même avec Nanite 10."
  }
];

const rocktalBuildings = [
  { 
    name: "Enclave Stoïque", 
    icon: Building, 
    description: "Augmente le nombre de logements disponibles pour la population N1.",
    color: "amber"
  },
  { 
    name: "Culture du Cristal", 
    icon: Gem, 
    description: "Augmente la quantité de population rassasiée. Complémentaire avec l'Enclave.",
    color: "blue"
  },
  { 
    name: "Monument Rocheux", 
    icon: Mountain, 
    description: "Réduit les coûts et temps de construction des bâtiments FDV de la race.",
    color: "stone"
  },
  { 
    name: "Centre Technologique", 
    icon: FlaskConical, 
    description: "Réduit le temps de recherche des technologies FDV.",
    color: "purple"
  },
  { 
    name: "Chambre de Disruption", 
    icon: Zap, 
    description: "Augmente la production d'énergie et diminue la consommation.",
    color: "yellow"
  },
  { 
    name: "Fusion Magmatique", 
    icon: Factory, 
    description: "Augmente la production de métal de la planète.",
    color: "gray"
  },
  { 
    name: "Raffinerie de Cristaux", 
    icon: Gem, 
    description: "Augmente la production de cristal de la planète.",
    color: "cyan"
  },
  { 
    name: "Syntoniseur de Deut", 
    icon: Droplets, 
    description: "Augmente la production de deutérium de la planète.",
    color: "teal"
  },
  { 
    name: "Forge Runique", 
    icon: Layers, 
    description: "Convertit un pourcentage de population N1 en N2.",
    color: "orange"
  },
  { 
    name: "Orictorium", 
    icon: Pickaxe, 
    description: "Convertit un pourcentage de population N2 en N3.",
    color: "red"
  }
];

function formatNumber(num: number): string {
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + "G";
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(0) + "k";
  return num.toString();
}

export default function GuideRocktal() {
  const [activeTab, setActiveTab] = useState<"intro" | "races" | "paliers" | "batiments" | "population">("intro");
  const [expandedPalier, setExpandedPalier] = useState<number | null>(1);

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
                <Mountain className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Guide Rock'tal & Mineur
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Développer les Formes de Vie pour maximiser votre production
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide adapté pour Psykoverse • Source : Communauté OGame FR
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: "intro", label: "Introduction", icon: Target },
                { id: "races", label: "Comparatif Races", icon: Users },
                { id: "paliers", label: "6 Paliers", icon: TrendingUp },
                { id: "batiments", label: "Bâtiments", icon: Building },
                { id: "population", label: "Population", icon: Layers }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      activeTab === tab.id
                        ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                        : "bg-[#1C2230] text-gray-400 hover:text-white hover:bg-[#252D3D]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {/* INTRO TAB */}
              {activeTab === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <Mountain className="w-6 h-6 text-amber-400" />
                      Pourquoi les Formes de Vie sont essentielles ?
                    </h2>
                    <p className="text-gray-300 mb-4">
                      Les FDV représentent un investissement majeur mais avec un <strong className="text-white">retour sur investissement énorme</strong>. 
                      À haut niveau, c'est un boost de production de :
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-gray-400">+135%</div>
                        <div className="text-sm text-gray-500">Métal</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-cyan-400">+88%</div>
                        <div className="text-sm text-gray-500">Cristal</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 text-center">
                        <div className="text-3xl font-bold text-teal-400">+122%</div>
                        <div className="text-sm text-gray-500">Deutérium</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4">Quand commencer les FDV ?</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold text-white">Univers existant avec FDV déjà présentes</h3>
                          <p className="text-gray-400 text-sm">Commencez dès que possible, c'est un investissement à long terme.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 p-4 bg-amber-900/20 border border-amber-700/30 rounded-lg">
                        <Clock className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold text-white">Nouvel univers</h3>
                          <p className="text-gray-400 text-sm">
                            Attendez d'avoir <strong className="text-white">~1M à 1,5M points</strong>. 
                            Développez d'abord vos technos, débloquez tout et maximisez vos expéditions avant de toucher aux FDV.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-red-400 mb-4 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6" />
                      Erreur courante
                    </h2>
                    <p className="text-gray-300">
                      La plupart des joueurs qui découvrent les FDV les négligent au début. 
                      <strong className="text-white"> Ils réalisent ensuite que c'est une erreur.</strong> 
                      Ne faites pas cette erreur, investissez progressivement dans les FDV !
                    </p>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4">Points clés à retenir</h2>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Les <strong className="text-white">bonus des technologies</strong> s'appliquent à tout le compte</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Les <strong className="text-white">bonus des bâtiments</strong> s'appliquent uniquement à la planète (pas la lune)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Avec les <strong className="text-white">artéfacts</strong>, vous pouvez choisir des technos d'autres races</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>Le vrai point différenciant pour choisir une race = <strong className="text-white">ses bâtiments</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div className="text-center pt-4">
                    <Button size="lg" onClick={() => setActiveTab("races")}>
                      Comparer les races
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* RACES TAB */}
              {activeTab === "races" && (
                <motion.div
                  key="races"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4">Idée reçue à corriger</h2>
                    <p className="text-gray-300">
                      Même si dans la description de la race il est indiqué qu'elle renforce la classe du joueur, 
                      <strong className="text-red-400"> en vérité ce n'est pas le cas</strong>. 
                      Ses bâtiments et technologies seront orientés dans ce sens, mais la race en elle-même n'apporte aucun avantage à la classe.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {races.map(race => (
                      <div 
                        key={race.id}
                        className={`relative bg-[#1C2230] border rounded-xl p-6 transition-all ${
                          race.recommended 
                            ? "border-amber-500/50 shadow-lg shadow-amber-500/10" 
                            : "border-[#2E384D]"
                        }`}
                      >
                        {race.recommended && (
                          <div className="absolute -top-3 left-4 bg-amber-500 text-black text-xs font-bold uppercase px-3 py-1 rounded">
                            Recommandé Mineur
                          </div>
                        )}
                        <h3 className={`font-display text-xl font-bold mb-4 ${
                          race.color === "amber" ? "text-amber-400" :
                          race.color === "blue" ? "text-blue-400" :
                          race.color === "purple" ? "text-purple-400" :
                          "text-cyan-400"
                        }`}>
                          {race.name}
                        </h3>
                        <div className="space-y-2">
                          {race.bonus.map((b, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                              <span className="text-gray-400">{b.text}</span>
                              <span className={`font-mono ${
                                b.value.includes("+") ? "text-green-400" : "text-cyan-400"
                              }`}>{b.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Pourquoi Rock'tal pour un mineur ?</h2>
                    <p className="text-gray-300 mb-4">
                      Les Rock'tal ont clairement un avantage pour les mineurs avec leurs bonus de production sur les 3 ressources 
                      (+2% par niveau chacune), la réduction des coûts de mines (-0,5% par niveau) et la récupération de CDR (+0,6% par niveau).
                    </p>
                    <p className="text-gray-400 text-sm">
                      Les autres races peuvent convenir à des styles de jeu différents (Kalesh pour les cases, Mechas pour les flottistes).
                    </p>
                  </div>

                  <div className="text-center pt-4">
                    <Button size="lg" onClick={() => setActiveTab("paliers")}>
                      Voir les 6 paliers de développement
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* PALIERS TAB */}
              {activeTab === "paliers" && (
                <motion.div
                  key="paliers"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 mb-6">
                    <p className="text-gray-300">
                      <strong className="text-white">Important :</strong> Ces coûts sont <strong className="text-primary">par planète</strong>. 
                      Multipliez par le nombre de planètes à développer. Les niveaux sont basés sur la race Rock'tal.
                    </p>
                  </div>

                  {paliers.map(palier => (
                    <div 
                      key={palier.id}
                      className={`bg-[#1C2230] border rounded-xl overflow-hidden transition-all ${
                        expandedPalier === palier.id ? "border-primary/50" : "border-[#2E384D]"
                      }`}
                    >
                      <button
                        onClick={() => setExpandedPalier(expandedPalier === palier.id ? null : palier.id)}
                        className="w-full p-6 flex items-center justify-between text-left hover:bg-[#252D3D] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
                            palier.difficultyColor === "green" ? "bg-green-500/20 text-green-400" :
                            palier.difficultyColor === "blue" ? "bg-blue-500/20 text-blue-400" :
                            palier.difficultyColor === "orange" ? "bg-orange-500/20 text-orange-400" :
                            "bg-red-500/20 text-red-400"
                          }`}>
                            {palier.id}
                          </div>
                          <div>
                            <h3 className="font-display text-lg font-bold text-white">{palier.title}</h3>
                            <p className="text-gray-500 text-sm">{palier.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            palier.difficultyColor === "green" ? "bg-green-500/20 text-green-400" :
                            palier.difficultyColor === "blue" ? "bg-blue-500/20 text-blue-400" :
                            palier.difficultyColor === "orange" ? "bg-orange-500/20 text-orange-400" :
                            "bg-red-500/20 text-red-400"
                          }`}>
                            {palier.difficulty}
                          </div>
                          <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${
                            expandedPalier === palier.id ? "rotate-90" : ""
                          }`} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {expandedPalier === palier.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-[#2E384D]"
                          >
                            <div className="p-6 space-y-6">
                              {/* Info row */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-[#151924] rounded-lg p-3">
                                  <div className="text-xs text-gray-500 mb-1">Quand le faire</div>
                                  <div className="font-bold text-white">{palier.when}</div>
                                </div>
                                <div className="bg-[#151924] rounded-lg p-3">
                                  <div className="text-xs text-gray-500 mb-1">Objectif</div>
                                  <div className="font-bold text-primary text-sm">{palier.objective}</div>
                                </div>
                                <div className="bg-[#151924] rounded-lg p-3 col-span-2">
                                  <div className="text-xs text-gray-500 mb-1">
                                    Coût {palier.cumulative ? "cumulé " : ""}par planète
                                  </div>
                                  <div className="flex gap-3 text-sm">
                                    <span className="text-gray-400">{formatNumber(palier.cost.metal)} M</span>
                                    <span className="text-cyan-400">{formatNumber(palier.cost.crystal)} C</span>
                                    <span className="text-teal-400">{formatNumber(palier.cost.deut)} D</span>
                                  </div>
                                </div>
                              </div>

                              {/* Buildings */}
                              <div>
                                <h4 className="font-bold text-white mb-3">Bâtiments à construire</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {palier.buildings.map((b, i) => {
                                    const building = b as { name: string; level: number; note?: string; priority?: boolean };
                                    return (
                                      <div 
                                        key={i} 
                                        className={`flex items-center justify-between p-3 rounded-lg ${
                                          building.priority ? "bg-amber-900/30 border border-amber-700/30" : "bg-[#151924]"
                                        }`}
                                      >
                                        <div className="flex items-center gap-3">
                                          {building.priority && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                                          <span className="text-white">{building.name}</span>
                                        </div>
                                        <div className="text-right">
                                          <span className="font-mono text-primary font-bold">Niv. {building.level}</span>
                                          {building.note && <div className="text-xs text-gray-500">{building.note}</div>}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                              {/* Tips */}
                              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                                <p className="text-sm text-primary">
                                  <strong>Conseil :</strong> {palier.tips}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* BATIMENTS TAB */}
              {activeTab === "batiments" && (
                <motion.div
                  key="batiments"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4">Bâtiments Rock'tal</h2>
                    <p className="text-gray-400 mb-6">
                      Voici tous les bâtiments disponibles pour la race Rock'tal et leur fonction principale.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rocktalBuildings.map((building, i) => {
                        const Icon = building.icon;
                        return (
                          <div key={i} className="flex items-start gap-4 p-4 bg-[#151924] rounded-lg">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              building.color === "amber" ? "bg-amber-500/20" :
                              building.color === "blue" ? "bg-blue-500/20" :
                              building.color === "stone" ? "bg-stone-500/20" :
                              building.color === "purple" ? "bg-purple-500/20" :
                              building.color === "yellow" ? "bg-yellow-500/20" :
                              building.color === "gray" ? "bg-gray-500/20" :
                              building.color === "cyan" ? "bg-cyan-500/20" :
                              building.color === "teal" ? "bg-teal-500/20" :
                              building.color === "orange" ? "bg-orange-500/20" :
                              "bg-red-500/20"
                            }`}>
                              <Icon className={`w-6 h-6 ${
                                building.color === "amber" ? "text-amber-400" :
                                building.color === "blue" ? "text-blue-400" :
                                building.color === "stone" ? "text-stone-400" :
                                building.color === "purple" ? "text-purple-400" :
                                building.color === "yellow" ? "text-yellow-400" :
                                building.color === "gray" ? "text-gray-400" :
                                building.color === "cyan" ? "text-cyan-400" :
                                building.color === "teal" ? "text-teal-400" :
                                building.color === "orange" ? "text-orange-400" :
                                "text-red-400"
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-bold text-white mb-1">{building.name}</h3>
                              <p className="text-gray-400 text-sm">{building.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-amber-400 mb-4 flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6" />
                      Ordre de construction recommandé
                    </h2>
                    <ol className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
                        <span><strong className="text-white">Monument Rocheux</strong> en priorité pour réduire les coûts de tous les autres bâtiments FDV</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500/80 text-black flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
                        <span><strong className="text-white">Centre Technologique</strong> pour accélérer les recherches FDV (très longues)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500/60 text-black flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
                        <span><strong className="text-white">Bâtiments de production</strong> (Fusion, Raffinerie, Syntoniseur) pour les bonus</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500/40 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
                        <span><strong className="text-white">Population</strong> (Enclave + Culture) pour débloquer les niveaux de technos</span>
                      </li>
                    </ol>
                  </div>
                </motion.div>
              )}

              {/* POPULATION TAB */}
              {activeTab === "population" && (
                <motion.div
                  key="population"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4">Comment fonctionne la population ?</h2>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-green-400 mb-2">N1</div>
                          <div className="text-sm text-gray-400">Population de base</div>
                          <div className="text-xs text-gray-500 mt-2">Technos niveau 1</div>
                        </div>
                        <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-blue-400 mb-2">N2</div>
                          <div className="text-sm text-gray-400">% de N1 converti</div>
                          <div className="text-xs text-gray-500 mt-2">Technos niveau 2</div>
                        </div>
                        <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4 text-center">
                          <div className="text-3xl font-bold text-purple-400 mb-2">N3</div>
                          <div className="text-sm text-gray-400">% de N2 converti</div>
                          <div className="text-xs text-gray-500 mt-2">Technos niveau 3</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4">Logements vs Nourriture</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#151924] rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <Building className="w-8 h-8 text-amber-400" />
                          <div>
                            <h3 className="font-bold text-white">Enclave Stoïque</h3>
                            <p className="text-sm text-gray-500">Logements disponibles</p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Détermine le nombre maximum d'habitants que votre planète peut accueillir.
                        </p>
                      </div>
                      <div className="bg-[#151924] rounded-lg p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <Gem className="w-8 h-8 text-cyan-400" />
                          <div>
                            <h3 className="font-bold text-white">Culture du Cristal</h3>
                            <p className="text-sm text-gray-500">Population rassasiée</p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Détermine combien d'habitants peuvent être nourris et donc être actifs.
                        </p>
                      </div>
                    </div>
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                      <p className="text-sm text-primary">
                        <strong>Important :</strong> La population active = le minimum entre logements et nourriture. 
                        Il faut développer les deux en parallèle !
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4">Conversion de population (Rock'tal)</h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-[#151924] rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold">N1</div>
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">N2</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-white">Forge Runique</div>
                          <div className="text-sm text-gray-400">Convertit un % de N1 en N2</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-[#151924] rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">N2</div>
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">N3</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-white">Orictorium</div>
                          <div className="text-sm text-gray-400">Convertit un % de N2 en N3</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-4">
                      Note : Les Rock'tal n'ont pas de bâtiments pour accélérer la croissance naturelle, 
                      contrairement aux autres races. En échange, ils ont plus de bâtiments de production.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12">
              <RelatedGuides currentGuide="rocktal" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

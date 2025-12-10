import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, Shield, Package, Compass, ExternalLink, CheckCircle, 
  Zap, Rocket, Eye, Target, Globe, Factory, Coins
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

import guerrierImg from "@assets/Screenshot_2025-12-10-06-07-55-22_32cba261fc08a501ce70de75bdbe_1765343303471.jpg";
import marchandImg from "@assets/Screenshot_2025-12-10-06-07-30-52_32cba261fc08a501ce70de75bdbe_1765343303497.jpg";
import chercheurImg from "@assets/Screenshot_2025-12-10-06-07-10-84_32cba261fc08a501ce70de75bdbe_1765343303502.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const allianceClasses = [
  {
    id: "guerrier",
    name: "Guerrier",
    description: "Parfois, les guerriers les plus aguerris doivent conclure un pacte pour mieux conquérir la galaxie. Une telle alliance peut utiliser des techniques d'espionnage qui permettent d'accéder plus facilement à des destinations intéressantes lors de leurs conquêtes.",
    icon: Shield,
    color: "from-red-500 to-red-700",
    bgColor: "bg-red-900/20",
    borderColor: "border-red-700/30",
    textColor: "text-red-400",
    prix: "400.000 AM",
    duree: "Permanent",
    image: guerrierImg,
    bonus: [
      { 
        icon: Zap, 
        text: "+10% vitesse des vaisseaux sur les trajets entre membres de l'alliance",
        detail: "Vos flottes se déplacent plus rapidement lorsqu'elles voyagent vers les planètes de vos alliés."
      },
      { 
        icon: Target, 
        text: "+1 niveau de recherche de combat",
        detail: "Bonus permanent aux technologies Armement, Bouclier et Blindage."
      },
      { 
        icon: Eye, 
        text: "+1 niveau de recherche en espionnage",
        detail: "Vos sondes récupèrent plus d'informations et sont plus difficiles à détecter."
      },
      { 
        icon: Globe, 
        text: "Accès au système d'espionnage avancé",
        detail: "Lance le nombre choisi de sondes d'espionnage qui scanneront un système entier. Le joueur peut déterminer le type de corps céleste à scanner, le temps écoulé depuis la dernière attaque d'espionnage ou l'activité qu'il souhaite faire."
      }
    ],
    idealPour: [
      "Alliances orientées combat et raid",
      "Joueurs qui attaquent fréquemment",
      "Stratégies de groupe coordonnées",
      "Défense mutuelle entre membres"
    ],
    synergies: ["Classe Général", "Raids en ACS", "Chasse aux inactifs"]
  },
  {
    id: "marchand",
    name: "Marchand",
    description: "Les pactes dans le secteur commercial profitent à toutes les parties et les alliances de commerçants le savent parfaitement. Les perspectives de conclure des affaires florissantes font voler leurs transporteurs plus vite tandis que les processus de production d'énergie et de matières premières sont optimisés.",
    icon: Package,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-900/20",
    borderColor: "border-amber-700/30",
    textColor: "text-amber-400",
    prix: "400.000 AM",
    duree: "Permanent",
    image: marchandImg,
    bonus: [
      { 
        icon: Rocket, 
        text: "+10% de vitesse pour les transporteurs",
        detail: "Vos PT et GT sont plus rapides, idéal pour le commerce et les transferts de ressources."
      },
      { 
        icon: Factory, 
        text: "+5% de production d'énergie et de matières premières",
        detail: "Bonus de production sur toutes vos mines et sources d'énergie."
      },
      { 
        icon: Coins, 
        text: "+10% en capacité de stockage sur les planètes et les lunes",
        detail: "Plus de ressources peuvent être stockées avant d'atteindre la limite."
      }
    ],
    idealPour: [
      "Alliances économiques et minières",
      "Joueurs de type Collecteur",
      "Échanges fréquents entre membres",
      "Développement pacifique"
    ],
    synergies: ["Classe Collecteur", "Mines optimisées", "Commerce actif"]
  },
  {
    id: "chercheur",
    name: "Chercheur",
    description: "Lorsque plusieurs grands esprits se rencontrent, ils font d'importantes découvertes. Une alliance composée de chercheurs trouvera non seulement des planètes plus grandes à coloniser, mais disposera également de vaisseaux plus rapides pour ses expéditions.",
    icon: Compass,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-700/30",
    textColor: "text-blue-400",
    prix: "400.000 AM",
    duree: "Permanent",
    image: chercheurImg,
    bonus: [
      { 
        icon: Zap, 
        text: "+10% en vitesse vers les destinations",
        detail: "Toutes vos flottes voyagent plus rapidement vers leurs destinations."
      },
      { 
        icon: Globe, 
        text: "+5% de planètes plus grandes à la colonisation",
        detail: "Vos nouvelles colonies ont plus de cases disponibles."
      },
      { 
        icon: Eye, 
        text: "Accès à la phalange du système",
        detail: "Elle peut être utilisée pour scanner les mouvements de flottes de l'ensemble d'un système pour 40.000 Deutérium, à partir du moment où le système est à portée."
      }
    ],
    idealPour: [
      "Alliances d'exploration",
      "Joueurs de type Explorateur",
      "Expéditions fréquentes",
      "Colonisation agressive"
    ],
    synergies: ["Classe Explorateur", "Expéditions", "Grandes colonies"]
  }
];

export default function GuideAllianceClasses() {
  const [activeClass, setActiveClass] = useState("guerrier");

  const selectedClass = allianceClasses.find(c => c.id === activeClass)!;
  const Icon = selectedClass.icon;

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/20">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Classes d'Alliance
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Choisissez la spécialisation de votre alliance pour débloquer des bonus collectifs
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide complet • Coût : 400.000 Antimatière
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Comment ça fonctionne ?
                </h2>
                <p className="text-gray-300 mb-4">
                  Les classes d'alliance sont des bonus <strong className="text-white">permanents</strong> qui s'appliquent à 
                  <strong className="text-white"> tous les membres</strong> de l'alliance. Une fois activée, la classe reste 
                  active indéfiniment. Seul le chef d'alliance peut acheter et activer une classe.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">400.000</div>
                    <div className="text-gray-500">Antimatière</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">Permanent</div>
                    <div className="text-gray-500">Durée</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-amber-400 mb-1">Tous</div>
                    <div className="text-gray-500">Membres bénéficiaires</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap justify-center">
                {allianceClasses.map((cls) => {
                  const ClsIcon = cls.icon;
                  return (
                    <button
                      key={cls.id}
                      onClick={() => setActiveClass(cls.id)}
                      className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                        activeClass === cls.id 
                          ? `bg-gradient-to-r ${cls.color} text-white shadow-lg` 
                          : "bg-[#1C2230] text-gray-400 hover:text-white hover:bg-[#252D3D]"
                      }`}
                      data-testid={`btn-class-${cls.id}`}
                    >
                      <ClsIcon className="w-5 h-5" />
                      {cls.name}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  key={selectedClass.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`${selectedClass.bgColor} ${selectedClass.borderColor} border rounded-xl overflow-hidden`}
                >
                  <img 
                    src={selectedClass.image} 
                    alt={selectedClass.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${selectedClass.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="font-display text-2xl font-bold text-white">
                          {selectedClass.name}
                        </h2>
                        <span className={`text-sm ${selectedClass.textColor}`}>Alliance</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      {selectedClass.description}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div className="bg-[#151924] rounded-lg px-3 py-2">
                        <span className="text-gray-500">Prix : </span>
                        <span className="text-green-400 font-bold">{selectedClass.prix}</span>
                      </div>
                      <div className="bg-[#151924] rounded-lg px-3 py-2">
                        <span className="text-gray-500">Durée : </span>
                        <span className="text-white font-bold">{selectedClass.duree}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  key={`bonus-${selectedClass.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
                >
                  <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle className={`w-5 h-5 ${selectedClass.textColor}`} />
                    Bonus de la classe
                  </h3>
                  <div className="space-y-4">
                    {selectedClass.bonus.map((b, index) => {
                      const BonusIcon = b.icon;
                      return (
                        <div key={index} className="bg-[#151924] rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 ${selectedClass.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                              <BonusIcon className={`w-5 h-5 ${selectedClass.textColor}`} />
                            </div>
                            <div>
                              <p className="text-white font-medium mb-1">{b.text}</p>
                              <p className="text-gray-500 text-sm">{b.detail}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${selectedClass.bgColor} ${selectedClass.borderColor} border rounded-xl p-6`}>
                  <h3 className={`font-display text-lg font-bold ${selectedClass.textColor} mb-4`}>
                    Idéal pour
                  </h3>
                  <ul className="space-y-2">
                    {selectedClass.idealPour.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className={`w-4 h-4 ${selectedClass.textColor}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-display text-lg font-bold text-white mb-4">
                    Synergies recommandées
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedClass.synergies.map((syn, index) => (
                      <span 
                        key={index} 
                        className={`${selectedClass.bgColor} ${selectedClass.textColor} px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {syn}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-4">
                    Les membres avec ces caractéristiques bénéficieront au maximum de cette classe d'alliance.
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h3 className="font-display text-lg font-bold text-amber-400 mb-3">
                  Conseils pour choisir
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-red-400" />
                      <span className="font-bold text-white">Guerrier</span>
                    </div>
                    <p className="text-gray-400">
                      Si votre alliance est active en combat, raids et ACS offensifs. Le scan système est très puissant.
                    </p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-amber-400" />
                      <span className="font-bold text-white">Marchand</span>
                    </div>
                    <p className="text-gray-400">
                      Si vous privilégiez l'économie et le développement. +5% production est énorme sur le long terme.
                    </p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="w-5 h-5 text-blue-400" />
                      <span className="font-bold text-white">Chercheur</span>
                    </div>
                    <p className="text-gray-400">
                      Si vos membres font beaucoup d'expéditions. La phalange système est un outil défensif redoutable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-cyan-900/20 border border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="font-display text-lg font-bold text-white">Guides connexes</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/guide/classes">
                    <span className="inline-flex items-center gap-2 bg-[#151924] hover:bg-[#1C2230] text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
                      → Classes de joueur
                    </span>
                  </Link>
                  <Link href="/guide/acs">
                    <span className="inline-flex items-center gap-2 bg-[#151924] hover:bg-[#1C2230] text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
                      → Attaques ACS
                    </span>
                  </Link>
                  <Link href="/guide/raid">
                    <span className="inline-flex items-center gap-2 bg-[#151924] hover:bg-[#1C2230] text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
                      → Techniques de Raid
                    </span>
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Questions sur les classes d'alliance ?
                </h3>
                <p className="text-gray-400 mb-6">
                  Rejoignez Psykoverse pour discuter de la meilleure stratégie pour votre alliance !
                </p>
                <Button size="lg" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                    Rejoindre le Discord
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

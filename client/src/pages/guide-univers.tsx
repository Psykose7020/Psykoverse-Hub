import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, ExternalLink, Zap, Clock, Hammer, FlaskConical, 
  Fuel, MapPin, Users, ShoppingCart, Shield, Dna, Gem,
  ChevronDown, ChevronUp, Info, Settings, Sparkles, CircleDot,
  Rocket, Target, AlertTriangle
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors"
        data-testid={`toggle-${title.toLowerCase().replace(/\s/g, '-')}`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <h2 className="font-display text-xl font-bold text-white">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-[#2E384D]">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const caracteristiques = [
  {
    id: "vitesse-vol",
    name: "Vitesse de Vol",
    icon: Rocket,
    color: "from-blue-500 to-cyan-600",
    description: "Multiplie la vitesse de déplacement des flottes",
    valeurs: "x1 à x7 généralement",
    details: [
      { label: "Vol pacifique", desc: "Transport, déploiement, colonisation, expédition" },
      { label: "Vol hostile", desc: "Attaque, espionnage, destruction de lune" },
      { label: "Stationnement allié", desc: "Défense groupée chez un allié" },
      { label: "Porte de saut", desc: "Souvent différent des autres vitesses" }
    ]
  },
  {
    id: "vitesse-eco",
    name: "Vitesse Économique",
    icon: Hammer,
    color: "from-amber-500 to-orange-600",
    description: "Accélère la construction et la recherche",
    valeurs: "x1 à x20 pour les constructions, x1 à x20 pour les technos",
    details: [
      { label: "Constructions", desc: "Bâtiments, défenses, vaisseaux" },
      { label: "Recherches", desc: "Technologies (souvent 2x la vitesse des bâtiments)" }
    ]
  },
  {
    id: "cdr",
    name: "Champ de Débris (CDR)",
    icon: Target,
    color: "from-gray-500 to-slate-600",
    description: "Pourcentage des ressources récupérables après un combat",
    valeurs: "30% à 80%",
    details: [
      { label: "CDR flotte", desc: "Ressources des vaisseaux détruits" },
      { label: "CDR défense", desc: "Peut être activé ou non (rare)" }
    ]
  },
  {
    id: "galaxies",
    name: "Taille de l'Univers",
    icon: Globe,
    color: "from-indigo-500 to-purple-600",
    description: "Nombre de galaxies disponibles",
    valeurs: "5 à 9 galaxies",
    details: [
      { label: "Standard", desc: "9 galaxies × 499 systèmes × 15 positions" },
      { label: "Compact", desc: "5-7 galaxies (plus de contacts)" }
    ]
  },
  {
    id: "circulaire",
    name: "Galaxies Circulaires",
    icon: CircleDot,
    color: "from-teal-500 to-cyan-600",
    description: "Les galaxies et systèmes forment une boucle",
    valeurs: "Activé ou Désactivé",
    details: [
      { label: "Circulaire", desc: "G1 et G9 sont voisines (vol court)" },
      { label: "Linéaire", desc: "G1 et G9 sont aux extrémités (vol long)" }
    ]
  },
  {
    id: "deuterium",
    name: "Consommation Deutérium",
    icon: Fuel,
    color: "from-cyan-500 to-blue-600",
    description: "Facteur de consommation de carburant",
    valeurs: "0.5 à 1.0",
    details: [
      { label: "x0.5", desc: "Consommation réduite de 50%" },
      { label: "x1.0", desc: "Consommation normale" }
    ]
  },
  {
    id: "cases",
    name: "Bonus de Cases",
    icon: MapPin,
    color: "from-green-500 to-emerald-600",
    description: "Cases supplémentaires sur les planètes",
    valeurs: "+0 à +30 cases",
    details: [
      { label: "+25/30 cases", desc: "Planètes plus grandes, plus de constructions" },
      { label: "Standard", desc: "Taille normale des planètes" }
    ]
  },
  {
    id: "acs",
    name: "ACS (Combat Groupé)",
    icon: Users,
    color: "from-orange-500 to-red-600",
    description: "Attaques et défenses groupées entre joueurs",
    valeurs: "Activé ou Désactivé",
    details: [
      { label: "Avec ACS", desc: "Plusieurs joueurs peuvent attaquer/défendre ensemble" },
      { label: "Sans ACS", desc: "Combat solo uniquement (rare)" }
    ]
  },
  {
    id: "marche",
    name: "Marché",
    icon: ShoppingCart,
    color: "from-purple-500 to-pink-600",
    description: "Commerce automatique de ressources",
    valeurs: "Activé ou Désactivé",
    details: [
      { label: "Avec marché", desc: "Échange instantané de ressources" },
      { label: "Sans marché", desc: "Commerce uniquement entre joueurs (plus stratégique)" }
    ]
  },
  {
    id: "fdv",
    name: "Formes de Vie",
    icon: Dna,
    color: "from-purple-500 to-violet-600",
    description: "Extension avec les 4 races extraterrestres",
    valeurs: "Activé ou Désactivé",
    details: [
      { label: "Avec FDV", desc: "Accès aux races, bâtiments et technos FDV" },
      { label: "Sans FDV", desc: "Gameplay classique (très rare aujourd'hui)" }
    ]
  },
  {
    id: "antimatiere",
    name: "Antimatière Offerte",
    icon: Gem,
    color: "from-pink-500 to-rose-600",
    description: "Bonus à l'inscription sur l'univers",
    valeurs: "8 000 à 25 000 AM",
    details: [
      { label: "8 000 AM", desc: "Standard" },
      { label: "25 000 AM", desc: "Univers promotionnels" }
    ]
  },
  {
    id: "sondes",
    name: "Sondes avec Fret",
    icon: Sparkles,
    color: "from-yellow-500 to-amber-600",
    description: "Les sondes d'espionnage peuvent transporter des ressources",
    valeurs: "Activé ou Désactivé",
    details: [
      { label: "Avec fret", desc: "Sondes utilisables pour petits transports" },
      { label: "Sans fret", desc: "Sondes uniquement pour espionnage (standard)" }
    ]
  }
];

export default function GuideUnivers() {
  const [selectedCarac, setSelectedCarac] = useState<string | null>(null);

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
              <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                <Settings className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Caractéristiques des Univers
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comprendre les paramètres qui rendent chaque univers unique
              </p>
            </div>

            <div className="space-y-6">
              <CollapsibleSection
                title="Qui décide des caractéristiques ?"
                icon={<Info className="w-6 h-6 text-blue-400" />}
                defaultOpen={true}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    C'est <strong className="text-primary">Gameforge</strong> qui fixe les caractéristiques de chaque univers 
                    lors de sa création. Ces paramètres sont <strong className="text-white">définitifs</strong> et ne changent 
                    généralement pas au cours de la vie de l'univers.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-white mb-2">Décision Gameforge</h3>
                      <p className="text-gray-400 text-sm">
                        Gameforge choisit les paramètres en fonction du type d'univers voulu 
                        (speed, économique, PvP, etc.) et des retours des communautés internationales.
                      </p>
                    </div>
                    <div className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-white mb-2">Avis consultatif</h3>
                      <p className="text-gray-400 text-sm">
                        Il arrive que Gameforge organise des <strong className="text-primary">sondages</strong> pour 
                        demander l'avis de la communauté sur les caractéristiques d'un nouvel univers.
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-300 text-sm">
                          <strong className="text-white">Exception :</strong> Lors des <strong className="text-amber-400">fusions d'univers</strong>, 
                          les caractéristiques peuvent être modifiées pour harmoniser les univers fusionnés. 
                          Un vote communautaire peut alors être organisé.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Les caractéristiques modifiables"
                icon={<Settings className="w-6 h-6 text-purple-400" />}
                defaultOpen={true}
              >
                <div className="space-y-4">
                  <p className="text-gray-300 mb-4">
                    Cliquez sur une caractéristique pour voir les détails :
                  </p>
                  
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {caracteristiques.map((carac) => {
                      const Icon = carac.icon;
                      const isSelected = selectedCarac === carac.id;
                      return (
                        <button
                          key={carac.id}
                          onClick={() => setSelectedCarac(isSelected ? null : carac.id)}
                          className={`p-3 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "bg-primary/10 border-primary/50"
                              : "bg-[#151924] border-[#2E384D] hover:border-primary/30"
                          }`}
                          data-testid={`carac-${carac.id}`}
                        >
                          <div className={`w-10 h-10 bg-gradient-to-br ${carac.color} rounded-lg flex items-center justify-center mb-2`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className={`font-bold text-sm ${isSelected ? "text-primary" : "text-white"}`}>
                            {carac.name}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {selectedCarac && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {caracteristiques.filter(c => c.id === selectedCarac).map((carac) => {
                          const Icon = carac.icon;
                          return (
                            <div key={carac.id} className="bg-primary/10 border border-primary/30 rounded-xl p-4 mt-4">
                              <div className="flex items-center gap-3 mb-3">
                                <div className={`w-12 h-12 bg-gradient-to-br ${carac.color} rounded-xl flex items-center justify-center`}>
                                  <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-bold text-white text-lg">{carac.name}</h3>
                                  <p className="text-gray-400 text-sm">{carac.description}</p>
                                </div>
                              </div>
                              
                              <div className="bg-[#151924] rounded-lg p-3 mb-3">
                                <span className="text-gray-500 text-xs">Valeurs possibles :</span>
                                <p className="text-primary font-bold">{carac.valeurs}</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {carac.details.map((detail, idx) => (
                                  <div key={idx} className="bg-[#151924] rounded-lg p-3">
                                    <div className="font-bold text-white text-sm">{detail.label}</div>
                                    <div className="text-gray-400 text-xs">{detail.desc}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Types d'univers courants"
                icon={<Globe className="w-6 h-6 text-green-400" />}
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-blue-400" />
                        <h3 className="font-bold text-blue-400">Univers Lent</h3>
                      </div>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Vitesse x1-x2</li>
                        <li>• Économie x1-x4</li>
                        <li>• Gameplay stratégique</li>
                        <li>• Temps de jeu réduit</li>
                      </ul>
                    </div>
                    <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-5 h-5 text-amber-400" />
                        <h3 className="font-bold text-amber-400">Univers Équilibré</h3>
                      </div>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Vitesse x3-x5</li>
                        <li>• Économie x5-x10</li>
                        <li>• Bon compromis</li>
                        <li>• Le plus courant</li>
                      </ul>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Rocket className="w-5 h-5 text-red-400" />
                        <h3 className="font-bold text-red-400">Univers Speed</h3>
                      </div>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Vitesse x6-x7</li>
                        <li>• Économie x10-x20</li>
                        <li>• Action intense</li>
                        <li>• Évolution rapide</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-5 h-5 text-purple-400" />
                      <h3 className="font-bold text-purple-400">Univers Spéciaux</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      Certains univers ont des configurations uniques :
                    </p>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• <strong className="text-white">Vitesse hostile différente</strong> - Vol x1 en attaque, x7 en pacifique (ex: Mathilde)</li>
                      <li>• <strong className="text-white">Sans ACS</strong> - Combat solo uniquement (ex: Narvi)</li>
                      <li>• <strong className="text-white">CDR élevé</strong> - 70-80% récupérables (plus de profits)</li>
                      <li>• <strong className="text-white">Défense dans le CDR</strong> - Rare, les défenses détruites donnent aussi des débris</li>
                    </ul>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Comment voir les caractéristiques ?"
                icon={<Info className="w-6 h-6 text-cyan-400" />}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Vous pouvez consulter les caractéristiques d'un univers de plusieurs façons :
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                      <div>
                        <p className="text-gray-300"><strong className="text-white">Dans le jeu</strong></p>
                        <p className="text-gray-500 text-sm">Menu → Paramètres de l'univers (ou icône info en haut)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                      <div>
                        <p className="text-gray-300"><strong className="text-white">Sur le Lobby</strong></p>
                        <p className="text-gray-500 text-sm">Avant de rejoindre, cliquez sur l'univers pour voir ses caractéristiques</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                      <div>
                        <p className="text-gray-300"><strong className="text-white">Sur le forum officiel</strong></p>
                        <p className="text-gray-500 text-sm">Liste complète de tous les univers avec leurs caractéristiques</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Les fusions d'univers"
                icon={<Sparkles className="w-6 h-6 text-amber-400" />}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Quand un univers devient trop peu peuplé, Gameforge peut le <strong className="text-white">fusionner</strong> 
                    avec un autre univers.
                  </p>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Ce qui se passe lors d'une fusion</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>Les comptes sont transférés vers l'univers cible</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>Les planètes sont relocalisées (positions qui n'existent pas = relocalisation)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>Les caractéristiques de l'univers cible s'appliquent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>Un vote peut avoir lieu pour ajuster certains paramètres</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-primary text-sm">
                      <strong>Info :</strong> La communauté française a connu plus de 13 phases de fusions 
                      depuis le début du jeu. Beaucoup d'anciens univers numérotés ont été fusionnés dans 
                      les univers à lettres actuels.
                    </p>
                  </div>
                </div>
              </CollapsibleSection>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-white mb-2">
                      Liste complète des univers
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      Consultez toutes les caractéristiques de chaque univers sur le forum officiel
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://board.fr.ogame.gameforge.com/index.php?thread/756683-les-univers-d-ogame-et-leurs-particularit%C3%A9s/" target="_blank" rel="noopener noreferrer">
                        Voir sur le forum
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Besoin d'aide pour choisir un univers ?
                </h3>
                <p className="text-gray-400 mb-4">Demandez conseil à notre communauté</p>
                <Button size="lg" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                    Rejoindre Discord
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

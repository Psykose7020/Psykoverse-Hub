import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dna, ExternalLink, Users, Sprout, FlaskConical, Search, 
  Gem, RefreshCw, Clock, ChevronDown, ChevronUp, Sparkles,
  AlertTriangle, Check, X, Rocket, Globe
} from "lucide-react";
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
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-900/20",
    borderColor: "border-blue-700/30",
    textColor: "text-blue-400",
    description: "Race de départ, équilibrée et polyvalente",
    bonus: "Bonus variés sur production et commerce",
    croissance: "Moyenne"
  },
  {
    id: "rocktal",
    name: "Rock'tal",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-900/20",
    borderColor: "border-amber-700/30",
    textColor: "text-amber-400",
    description: "Êtres de pierre, résistants et miniers",
    bonus: "Bonus sur extraction de ressources et défense",
    croissance: "Lente"
  },
  {
    id: "mecas",
    name: "Mécas",
    color: "from-gray-400 to-slate-600",
    bgColor: "bg-slate-900/20",
    borderColor: "border-slate-700/30",
    textColor: "text-slate-400",
    description: "Machines intelligentes, efficaces",
    bonus: "Bonus sur construction et technologies",
    croissance: "Rapide"
  },
  {
    id: "kaelesh",
    name: "Kaelesh",
    color: "from-purple-500 to-violet-600",
    bgColor: "bg-purple-900/20",
    borderColor: "border-purple-700/30",
    textColor: "text-purple-400",
    description: "Êtres mystiques, liés à l'espace",
    bonus: "Bonus sur expéditions et découvertes",
    croissance: "Variable"
  }
];

const populationPaliers = [
  { niveau: "N1-1", population: "200 000", techSlot: 1 },
  { niveau: "N1-2", population: "300 000", techSlot: 2 },
  { niveau: "N1-3", population: "400 000", techSlot: 3 },
  { niveau: "N1-4", population: "500 000", techSlot: 4 },
  { niveau: "N1-5", population: "750 000", techSlot: 5 },
  { niveau: "N1-6", population: "1 000 000", techSlot: 6 }
];

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

export default function GuideFDV() {
  const [selectedRace, setSelectedRace] = useState<string | null>(null);

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
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                <Dna className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Les Formes de Vie
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Guide complet pour débutants - Découvrez et maîtrisez les 4 races
              </p>
            </div>

            <div className="space-y-6">
              <CollapsibleSection
                title="C'est quoi les Formes de Vie ?"
                icon={<Sparkles className="w-6 h-6 text-purple-400" />}
                defaultOpen={true}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Les Formes de Vie (FDV) sont une extension majeure d'OGame qui ajoute 
                    <strong className="text-white"> 4 races extraterrestres</strong> avec leurs propres 
                    bâtiments, technologies et bonus uniques.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-white mb-2">Ce qu'il faut savoir</h3>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Chaque race = <strong className="text-white">12 bâtiments + 18 technologies</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Les <strong className="text-white">technologies s'appliquent à tout le compte</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Les bâtiments s'appliquent <strong className="text-white">uniquement à la planète</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span><strong className="text-white">1 seule race active</strong> par planète à la fois</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-white mb-2">Les 2 ressources clés</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-white">Population</div>
                            <div className="text-gray-400 text-xs">Débloque les technologies</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                            <Sprout className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold text-white">Nourriture</div>
                            <div className="text-gray-400 text-xs">Nourrit la population</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Les 4 Races"
                icon={<Users className="w-6 h-6 text-blue-400" />}
              >
                <div className="space-y-4">
                  <p className="text-gray-300 mb-4">
                    Cliquez sur une race pour voir ses caractéristiques :
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {races.map((race) => (
                      <button
                        key={race.id}
                        onClick={() => setSelectedRace(selectedRace === race.id ? null : race.id)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedRace === race.id
                            ? `${race.bgColor} ${race.borderColor}`
                            : "bg-[#151924] border-[#2E384D] hover:border-primary/50"
                        }`}
                        data-testid={`race-${race.id}`}
                      >
                        <div className={`w-12 h-12 bg-gradient-to-br ${race.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                          <Dna className="w-6 h-6 text-white" />
                        </div>
                        <div className={`font-bold ${selectedRace === race.id ? race.textColor : "text-white"}`}>
                          {race.name}
                        </div>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {selectedRace && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {races.filter(r => r.id === selectedRace).map((race) => (
                          <div key={race.id} className={`${race.bgColor} ${race.borderColor} border rounded-xl p-4 mt-4`}>
                            <h3 className={`font-bold ${race.textColor} text-lg mb-2`}>{race.name}</h3>
                            <p className="text-gray-300 mb-3">{race.description}</p>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Spécialité :</span>
                                <p className="text-white">{race.bonus}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Croissance :</span>
                                <p className="text-white">{race.croissance}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                    <p className="text-primary text-sm">
                      <strong>Note :</strong> Vous commencez avec les <strong>Humains</strong>. 
                      Les autres races se découvrent via les missions de recherche.
                    </p>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Comment débuter ?"
                icon={<Rocket className="w-6 h-6 text-green-400" />}
              >
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Étape 1 : Construire les bases</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Pour débloquer le Centre de Recherche FDV, vous devez d'abord :
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[#1C2230] rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-400">Niv. 21</div>
                        <div className="text-gray-400 text-xs">Secteur Résidentiel</div>
                        <div className="text-gray-500 text-xs">(Population)</div>
                      </div>
                      <div className="bg-[#1C2230] rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-400">Niv. 22</div>
                        <div className="text-gray-400 text-xs">Ferme Biosphérique</div>
                        <div className="text-gray-500 text-xs">(Nourriture)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Étape 2 : Atteindre les paliers de population</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Chaque slot de technologie se débloque à un certain seuil de population :
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {populationPaliers.map((palier) => (
                        <div key={palier.niveau} className="bg-[#1C2230] rounded-lg p-3 text-center">
                          <div className="text-xs text-gray-500 mb-1">{palier.niveau}</div>
                          <div className="font-bold text-primary">{palier.population}</div>
                          <div className="text-gray-500 text-xs">habitants</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-500 text-xs mt-3">
                      La population augmente automatiquement selon le taux de croissance de votre race.
                    </p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Étape 3 : Débloquer la technologie "Ambassadeurs"</h3>
                    <p className="text-gray-300 text-sm">
                      Avec 200 000 habitants, vous pouvez rechercher <strong className="text-white">"Ambassadeurs Intergalactiques"</strong>. 
                      Cette technologie débloque les <strong className="text-primary">missions de recherche de formes de vie</strong>.
                    </p>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Missions de Recherche FDV"
                icon={<Search className="w-6 h-6 text-violet-400" />}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Les missions de recherche permettent de <strong className="text-white">découvrir de nouvelles races</strong>, 
                    gagner de l'<strong className="text-white">expérience</strong> et trouver des <strong className="text-white">Artéfacts</strong>.
                  </p>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Comment lancer une mission ?</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                        <p className="text-gray-300">Allez dans la <strong className="text-white">Vue Galaxie</strong></p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                        <p className="text-gray-300">Cherchez les <strong className="text-purple-400">boutons ADN violets</strong> à côté des positions</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                        <p className="text-gray-300">Cliquez pour envoyer un vaisseau de recherche</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-amber-400 mb-2">Coût par mission</h3>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• 5 000 Métal</li>
                        <li>• 1 000 Cristal</li>
                        <li>• 500 Deutérium</li>
                      </ul>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-blue-400 mb-2">Limites</h3>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Max <strong className="text-white">50 missions/jour</strong></li>
                        <li>• <strong className="text-white">7 jours</strong> avant de revisiter une position</li>
                        <li>• Plus c'est loin, plus c'est long</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Bouton ADN grisé ?</h3>
                    <ul className="space-y-1 text-gray-400 text-sm">
                      <li>• <strong className="text-white">Pas de niveau actif</strong> d'Ambassadeurs Intergalactiques</li>
                      <li>• Position déjà visitée il y a <strong className="text-white">moins de 7 jours</strong></li>
                    </ul>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Les Artéfacts"
                icon={<Gem className="w-6 h-6 text-pink-400" />}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Les Artéfacts sont des objets trouvés lors des missions de recherche. 
                    Ils permettent de <strong className="text-white">choisir une technologie spécifique</strong> au lieu du tirage aléatoire.
                  </p>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Coût en Artéfacts par tier</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-400">200</div>
                        <div className="text-gray-400 text-xs">Tier 1 (N1)</div>
                      </div>
                      <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-amber-400">400</div>
                        <div className="text-gray-400 text-xs">Tier 2 (N2)</div>
                      </div>
                      <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-red-400">600</div>
                        <div className="text-gray-400 text-xs">Tier 3 (N3)</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-primary text-sm">
                      <strong>Stockage max :</strong> Vous pouvez stocker jusqu'à <strong>3 600 Artéfacts</strong>. 
                      Au-delà, vous devez en dépenser avant d'en trouver de nouveaux.
                    </p>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Changer de Race"
                icon={<RefreshCw className="w-6 h-6 text-amber-400" />}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Vous pouvez changer la race active sur une planète, mais attention aux conséquences !
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-green-400 mb-2">Ce qui est conservé</h3>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Niveaux des bâtiments de l'ancienne race</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>Niveaux des technologies (globales)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-red-400 mb-2">Ce qui est perdu</h3>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>La <strong className="text-white">population repart à 0</strong></span>
                        </li>
                        <li className="flex items-start gap-2">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>Les bonus de bâtiments sont désactivés</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-amber-400" />
                      <h3 className="font-bold text-amber-400">Délai de changement</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Après avoir changé de race, vous devez attendre <strong className="text-white">2 jours</strong> 
                      avant de pouvoir changer à nouveau sur cette planète.
                    </p>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Technologies : Aléatoire vs Artéfacts"
                icon={<FlaskConical className="w-6 h-6 text-teal-400" />}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Quand vous débloquez un slot de technologie, vous avez 3 options :
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#151924] rounded-lg p-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Dna className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-center mb-2">Race de la planète</h3>
                      <p className="text-gray-400 text-xs text-center">
                        Obtenir une techno de la race active sur cette planète
                      </p>
                    </div>
                    <div className="bg-[#151924] rounded-lg p-4">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <RefreshCw className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-center mb-2">Aléatoire</h3>
                      <p className="text-gray-400 text-xs text-center">
                        Techno au hasard parmi les races découvertes
                      </p>
                    </div>
                    <div className="bg-[#151924] rounded-lg p-4">
                      <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Gem className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-white text-center mb-2">Artéfacts</h3>
                      <p className="text-gray-400 text-xs text-center">
                        Choisir exactement la techno voulue
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Réinitialiser les technologies</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Si vous n'aimez pas une techno obtenue aléatoirement, vous pouvez la reset. 
                      <strong className="text-amber-400"> Attention : les 6 technos du niveau sont réinitialisées !</strong>
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-[#1C2230] rounded-lg p-2 text-center">
                        <div className="font-bold text-white">N1</div>
                        <div className="text-gray-400 text-xs">8h/techno</div>
                        <div className="text-gray-500 text-xs">ou 1k AM</div>
                      </div>
                      <div className="bg-[#1C2230] rounded-lg p-2 text-center">
                        <div className="font-bold text-white">N2</div>
                        <div className="text-gray-400 text-xs">16h/techno</div>
                        <div className="text-gray-500 text-xs">ou 2k AM</div>
                      </div>
                      <div className="bg-[#1C2230] rounded-lg p-2 text-center">
                        <div className="font-bold text-white">N3</div>
                        <div className="text-gray-400 text-xs">24h/techno</div>
                        <div className="text-gray-500 text-xs">ou 3k AM</div>
                      </div>
                    </div>
                    <p className="text-green-400 text-xs mt-3">
                      Astuce : Vous pouvez annuler gratuitement un reset dans l'heure qui suit !
                    </p>
                  </div>
                </div>
              </CollapsibleSection>

              <CollapsibleSection
                title="Voir ses bonus FDV"
                icon={<Globe className="w-6 h-6 text-indigo-400" />}
              >
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Pour voir la somme de tous vos bonus FDV sur votre compte :
                  </p>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                        <p className="text-gray-300">Allez dans les <strong className="text-white">Options de ressources</strong></p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                        <p className="text-gray-300">Cherchez l'option <strong className="text-white">"Bonus forme de vie"</strong></p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                        <p className="text-gray-300">Déployez pour voir le <strong className="text-white">détail par planète</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsibleSection>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-2">Outil de calcul</h3>
                    <p className="text-gray-300 mb-3">
                      Pour planifier vos FDV, utilisez le fichier Excel officiel de Gameforge :
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://ogame.comastuff.com/LFMaster_Global.xlsx" target="_blank" rel="noopener noreferrer">
                        Télécharger LFMaster
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                Guide basé sur le tutoriel de <span className="text-gray-400">Nelliel</span> et <span className="text-gray-400">Mel</span> (board espagnol), 
                traduit par la communauté française
              </div>

              <RelatedGuides currentGuide="fdv" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

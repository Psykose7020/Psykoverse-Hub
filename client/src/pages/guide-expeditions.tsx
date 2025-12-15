import { motion } from "framer-motion";
import { Compass, ExternalLink, AlertTriangle, Sparkles, Ship, Gem, Package, Skull, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

import gtImg from "@assets/ogame_ships/grand-transporteur.png";
import eclaireurImg from "@assets/ogame_ships/eclaireur.png";
import destructeurImg from "@assets/ogame_ships/destructeur.png";
import sondeImg from "@assets/ogame_ships/sonde-espionnage.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const resultats = [
  { type: "Ressources", desc: "Métal, Cristal ou Deutérium", color: "text-green-400", icon: Package, prob: "~35%" },
  { type: "Vaisseaux", desc: "Flottes abandonnées", color: "text-blue-400", icon: Ship, prob: "~14%" },
  { type: "Antimatière", desc: "Antimatière gratuite", color: "text-purple-400", icon: Gem, prob: "~7%" },
  { type: "Items", desc: "Objets bonus", color: "text-amber-400", icon: Sparkles, prob: "~5%" },
  { type: "Pirates", desc: "Combat PNJ", color: "text-red-400", icon: Skull, prob: "~3%" },
  { type: "Aliens", desc: "Combat difficile", color: "text-red-600", icon: Zap, prob: "~2%" },
  { type: "Rien", desc: "Expédition vide", color: "text-gray-500", icon: Compass, prob: "~33%" },
  { type: "Trou noir", desc: "Perte de vaisseaux", color: "text-gray-600", icon: AlertTriangle, prob: "~0.5%" }
];

export default function GuideExpeditions() {
  return (
    <Layout>
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <Link href="/tutoriels">
              <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                  Guide des Expéditions
                </h1>
                <p className="text-gray-400">Explorez l'espace profond et récupérez des ressources</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-white mb-4">Qu'est-ce qu'une expédition ?</h2>
              <p className="text-gray-300 mb-4">
                Les expéditions permettent d'envoyer une flotte explorer l'espace profond (position 16 d'un système). 
                Vous pouvez y trouver des <strong className="text-green-400">ressources</strong>, des <strong className="text-blue-400">vaisseaux abandonnés</strong>, 
                de l'<strong className="text-purple-400">antimatière</strong>, ou rencontrer des dangers comme des pirates ou des aliens.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
                {resultats.map((r, i) => (
                  <div key={i} className="bg-[#151924] rounded-lg p-3 text-center">
                    <r.icon className={`w-6 h-6 mx-auto mb-2 ${r.color}`} />
                    <div className={`font-bold text-sm ${r.color}`}>{r.type}</div>
                    <div className="text-xs text-gray-500">{r.prob}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">Points clés</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Nombre de slots = √Astrophysique (arrondi inf.)</li>
                    <li>• Classe <strong className="text-white">Explorateur</strong> : +2 slots bonus</li>
                    <li>• <strong className="text-white">Commandant Amiral</strong> : +1 slot bonus</li>
                    <li>• Durée recommandée : <strong className="text-white">1 heure</strong></li>
                    <li>• Les gains dépendent des points du Top 1</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-blue-400 mb-2">Bonus Explorateur</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong className="text-white">×1.5</strong> gains de base</li>
                    <li>• <strong className="text-white">×Vitesse Éco</strong> multiplicateur</li>
                    <li>• Éclaireurs : bonus <strong className="text-white">×2</strong> supplémentaire</li>
                    <li>• <strong className="text-white">-50%</strong> chances de pirates/aliens</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mt-4">
                <h3 className="font-bold text-amber-400 mb-2">Items Slot d'Expédition : les PLUS RENTABLES du jeu</h3>
                <p className="text-sm text-gray-300 mb-3">
                  En boutique ou en récompense lors d'événements (artefact, récompenses, events spéciaux), vous pouvez obtenir des items qui ajoutent des slots d'expédition :
                </p>
                <div className="flex flex-wrap gap-3 mb-3">
                  <span className="bg-[#151924] px-3 py-1 rounded text-white font-bold">+1 Slot</span>
                  <span className="bg-[#151924] px-3 py-1 rounded text-white font-bold">+2 Slots</span>
                  <span className="bg-[#151924] px-3 py-1 rounded text-white font-bold">+3 Slots</span>
                </div>
                <p className="text-sm text-gray-300">
                  <strong className="text-amber-400">Ce sont les items les plus rentables du jeu.</strong> Chaque slot supplémentaire multiplie vos gains d'expédition pendant leur durée d'activation. 
                  Priorisez-les lors des événements !
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-white mb-4">Que faut-il envoyer en expédition ?</h2>
              
              <div className="space-y-6">
                <div className="bg-[#151924] rounded-lg p-4">
                  <h3 className="font-bold text-primary mb-3">Composition optimale (Explorateur)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col items-center text-center">
                      <img src={eclaireurImg} alt="Éclaireur" className="w-16 h-16 object-contain mb-2" />
                      <span className="text-white font-bold">1+ Éclaireur</span>
                      <span className="text-xs text-gray-400">Obligatoire pour le ×2</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img src={gtImg} alt="Grand Transporteur" className="w-16 h-16 object-contain mb-2" />
                      <span className="text-white font-bold">Grands Transporteurs</span>
                      <span className="text-xs text-gray-400">Pour le fret</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img src={destructeurImg} alt="Destructeur" className="w-16 h-16 object-contain mb-2" />
                      <span className="text-white font-bold">1 gros combat</span>
                      <span className="text-xs text-gray-400">Hors EdM, influe sur le loot</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <img src={sondeImg} alt="Sonde" className="w-16 h-16 object-contain mb-2" />
                      <span className="text-white font-bold">1 Sonde</span>
                      <span className="text-xs text-gray-400">Voir si SS épuisé</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h4 className="font-bold text-green-400 mb-2">Points d'expédition</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      Chaque vaisseau apporte des points d'expédition. Plus vous en avez, plus les gains sont élevés.
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Le maximum dépend du Top 1 de l'univers</li>
                      <li>• Atteignez le cap sans le dépasser</li>
                      <li>• Grands Transporteurs = bon ratio points/fret</li>
                    </ul>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h4 className="font-bold text-blue-400 mb-2">Capacité de fret</h4>
                    <p className="text-sm text-gray-300 mb-2">
                      Assurez-vous d'avoir assez de capacité pour ramener les ressources trouvées.
                    </p>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Si capacité insuffisante → ressources perdues</li>
                      <li>• Grands Transporteurs : 25.000 de fret</li>
                      <li>• Éclaireurs : 10.000 de fret</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-violet-900/20 border border-violet-700/30 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-violet-400 mb-2">Astuce vitesse : combo PT + VB</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Pour gagner du temps sur le voyage vers la position 16, utilisez un combo <strong className="text-white">Petits Transporteurs + Vaisseaux de Bataille</strong>. 
                    Ces vaisseaux sont rapides et vous évitez le risque de ramener un vaisseau lent qui ralentirait votre retour.
                  </p>
                  <p className="text-sm text-gray-400">
                    L'expédition en <strong className="text-white">full Éclaireurs</strong> est encore plus rapide, mais la consommation en deutérium est très élevée.
                  </p>
                </div>

                <div className="bg-cyan-900/20 border border-cyan-700/30 rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-cyan-400 mb-2">Pourquoi un gros vaisseau de combat ?</h4>
                  <p className="text-sm text-gray-300">
                    Le type de vaisseau le plus puissant dans votre flotte (hors Étoile de la Mort) influence les vaisseaux que vous pouvez trouver en expédition. 
                    Envoyer un <strong className="text-white">Destructeur</strong> ou <strong className="text-white">Faucheur</strong> permet de débloquer tous les types de vaisseaux au loot.
                  </p>
                </div>

                <div className="bg-[#151924] rounded-lg p-4 mt-4">
                  <h4 className="font-bold text-white mb-2">Loot de vaisseaux : quantité vs type</h4>
                  <p className="text-sm text-gray-300 mb-3">
                    Deux facteurs déterminent les vaisseaux que vous pouvez trouver :
                  </p>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• <strong className="text-primary">La quantité</strong> dépend des <strong className="text-white">points de structure</strong> de votre flotte envoyée</li>
                    <li>• <strong className="text-cyan-400">Le type</strong> dépend du <strong className="text-white">plus gros vaisseau de combat</strong> envoyé (hors EdM)</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-[#2E384D]">
                    <p className="text-sm text-gray-400 mb-2">Points de structure :</p>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Chaque vaisseau apporte des points de structure (basés sur sa coque)</li>
                      <li>• Il existe un minimum à atteindre pour débloquer le loot maximum</li>
                      <li>• Sur les univers <strong className="text-white">×1 éco</strong>, ce minimum est plus difficile à atteindre</li>
                      <li>• Sur les univers plus rapides, les 50% de fret dépassent généralement ce minimum</li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    En résumé : envoyez un gros vaisseau de combat pour débloquer tous les types, et assez de points de structure pour maximiser la quantité.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.17 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-white mb-4">Optimisation du fret : la règle des 50%</h2>
              
              <div className="space-y-4">
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <h4 className="font-bold text-primary mb-2">Recommandation : envoyer 50% du fret max</h4>
                  <p className="text-sm text-gray-300">
                    Le seuil de rentabilité optimal est d'environ <strong className="text-white">65%</strong> du fret maximum. 
                    Au-delà, les gains ne couvrent plus les pertes (consommation + risque de trou noir). 
                    <strong className="text-white">50%</strong> est recommandé car plus simple à mémoriser.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h4 className="font-bold text-green-400 mb-2">Pourquoi 50% suffit ?</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Le cristal est capé à 50% du métal max</li>
                      <li>• Le deutérium est capé à 33% du métal max</li>
                      <li>• Seules les trouvailles exceptionnelles de métal (1% de chance) dépassent 50%</li>
                      <li>• Les vaisseaux trouvables ne sont <strong className="text-white">pas affectés</strong> par la réduction de fret</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h4 className="font-bold text-red-400 mb-2">Risques du 100%</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Consommation de deutérium doublée</li>
                      <li>• Risque de trou noir plus élevé que les trouvailles exceptionnelles</li>
                      <li>• Surcoût moyen de +100% par expédition</li>
                      <li>• Rentable uniquement en ultra late-game avec GT + bonus fret FdV</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                  <h4 className="font-bold text-amber-400 mb-2">Exception : les points de structure</h4>
                  <p className="text-sm text-gray-300">
                    Sur les univers <strong className="text-white">×1 économique</strong>, assurez-vous d'atteindre le minimum de points de structure 
                    pour ne pas réduire les gains potentiels. Dès que vous dépassez le ×1, les 50% dépassent largement ce minimum.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.18 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-white mb-4">Épuisement des systèmes solaires</h2>
              
              <div className="space-y-4">
                <div className="bg-[#151924] rounded-lg p-4">
                  <h4 className="font-bold text-primary mb-2">Comment ça fonctionne ?</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Une position vierge dispose d'un <strong className="text-white">score de 80</strong></li>
                    <li>• Ce score diminue de <strong className="text-red-400">1 point par expédition</strong></li>
                    <li>• Il se recharge de <strong className="text-green-400">10 points toutes les 2 heures</strong></li>
                    <li>• Plus le score est bas, plus la probabilité de "rien" augmente</li>
                  </ul>
                </div>

                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                  <h4 className="font-bold text-amber-400 mb-2">À quoi sert la sonde ?</h4>
                  <p className="text-sm text-gray-300">
                    Envoyer une sonde permet de voir si le système solaire est épuisé avant d'y envoyer votre flotte principale. 
                    Si d'autres joueurs lancent leurs expés dans le même système que vous, cela contribue à son épuisement. <strong className="text-white">Partez ailleurs.</strong>
                  </p>
                </div>

                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h4 className="font-bold text-green-400 mb-2">Stratégie recommandée</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Répartissez vos expéditions sur plusieurs lunes pour maintenir le compteur le plus haut possible :
                  </p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong className="text-white">Univers ×1 flotte :</strong> 4/4 (4 expés par lune, 2 lunes)</li>
                    <li>• <strong className="text-white">Autres univers :</strong> 2/2/2/2 (2 expés par lune, 4 lunes)</li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">
                    En réalité, tout dépend de l'épuisement de votre système solaire et donc du nombre d'expéditions que vous réalisez.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-primary/10 border border-primary/30 rounded-xl p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">Calculateur d'expéditions</h3>
                  <p className="text-gray-400 text-sm">
                    Pour calculer précisément vos gains potentiels, utilisez le calculateur en ligne
                  </p>
                </div>
                <a 
                  href="https://logserver.net/expocalc/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                  data-testid="link-expocalc"
                >
                  Ouvrir le calculateur
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.25 }}
              className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-amber-400 mb-2">Durée recommandée : 1h</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong className="text-white">Gardez toujours la durée à 1h !</strong> Les retards sont impactés par le temps passé en expédition.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Si vous voulez que vos expéditions reviennent plus tard, <strong className="text-white">diminuez la vitesse de la flotte</strong> 
                    au lieu d'augmenter la durée.
                  </p>
                </div>
              </div>
            </motion.div>

            <RelatedGuides currentGuide="expeditions" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

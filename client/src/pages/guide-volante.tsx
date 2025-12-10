import { motion } from "framer-motion";
import { Plane, ExternalLink, MapPin, Clock, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideVolante() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                <Plane className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Les Volantes
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                La flotte mobile pour les opérations rapides
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Qu'est-ce qu'une volante ?</h2>
                <p className="text-gray-300 mb-4">
                  Une <strong className="text-primary">volante</strong> est une planète/lune positionnée stratégiquement 
                  loin de votre base principale, utilisée pour des opérations rapides dans d'autres zones de la galaxie.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Principe :</strong> Plutôt que de faire voler votre flotte depuis votre base principale 
                    pendant des heures, vous la déplacez vers une volante proche de la cible.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Les deux utilisations d'une volante</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-purple-400 mb-2">1. Trap & Cacher son activité</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      La volante permet de <strong className="text-white">masquer votre activité principale</strong>. 
                      Vos ennemis ne savent pas d'où vous opérez réellement.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Idéal pour tendre des pièges et brouiller les pistes.
                    </p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">2. Devenir agressif dans une zone</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Positionnez-vous pour <strong className="text-white">dominer une zone spécifique</strong>, 
                      surtout en <strong className="text-primary">intra-système solaire</strong>.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Temps de vol ultra-courts = réactivité maximale.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-red-400 mb-4">⚠️ Règle d'or : JAMAIS de ghost sur volante</h2>
                <p className="text-gray-300 mb-4">
                  Une volante n'est <strong className="text-white">PAS faite pour ghoster</strong>. 
                  Votre flotte doit être ghostée sur vos lunes principales, pas sur une volante exposée.
                </p>
                <div className="bg-[#151924] rounded-lg p-4">
                  <p className="text-gray-400 text-sm">
                    <strong className="text-white">Pourquoi ?</strong> La volante est en territoire ennemi. 
                    Elle peut être surveillée, phalangée, ou piégée. Ghostez toujours depuis un endroit sûr.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Comment utiliser une volante</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <h3 className="font-bold text-white mb-1">Repérez une cible intéressante</h3>
                      <p className="text-gray-400 text-sm">Flotte en retour, inactif juteux, etc.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <h3 className="font-bold text-white mb-1">Déployez votre flotte sur la volante</h3>
                      <p className="text-gray-400 text-sm">Utilisez la Porte de Saut si disponible, sinon déploiement classique</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <h3 className="font-bold text-white mb-1">Attaquez depuis la volante</h3>
                      <p className="text-gray-400 text-sm">Temps de vol court = moins de risque de détection</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <h3 className="font-bold text-white mb-1">Rapatriez le butin</h3>
                      <p className="text-gray-400 text-sm">Ramenez le butin vers votre base principale pour ghoster en sécurité</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Configuration idéale</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">La volante minimale</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Une lune (pour ghost et phalange)</li>
                      <li>• Porte de Saut niveau max</li>
                      <li>• Phalange niveau suffisant</li>
                      <li>• Stockage pour le butin</li>
                    </ul>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Bonus recommandés</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Défense légère (anti-pillage)</li>
                      <li>• Chantier pour réparer sur place</li>
                      <li>• Recycleurs stationnés</li>
                      <li>• Doublon pour ghost alternatif</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Positionnement stratégique</h2>
                <p className="text-gray-300 mb-4">
                  Placez vos volantes en fonction de vos objectifs :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-amber-400 mb-2">Unis circulaires</h3>
                    <p className="text-gray-300 text-sm">
                      Positionnez-vous à égale distance de vos cibles potentielles.
                      En circulaire, <strong className="text-white">G1 et G5 sont proches</strong> !
                    </p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-blue-400 mb-2">Unis non-circulaires</h3>
                    <p className="text-gray-300 text-sm">
                      Placez des volantes aux <strong className="text-white">extrémités et au centre</strong> 
                      pour couvrir toutes les galaxies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Technique avancée : Bloquer un système solaire</h2>
                <p className="text-gray-300 mb-4">
                  Pour empêcher d'autres joueurs de venir en <strong className="text-primary">intra-système</strong> sur votre cible, 
                  vous pouvez <strong className="text-white">surcharger le système solaire de planètes détruites</strong>.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <div className="font-bold text-white">Colonisez toutes les positions libres</div>
                      <p className="text-gray-400 text-sm">Prenez chaque slot disponible dans le système.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <div className="font-bold text-white">Détruisez les planètes</div>
                      <p className="text-gray-400 text-sm">Les positions restent "occupées" pendant un certain temps.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <div className="font-bold text-white">Résultat</div>
                      <p className="text-gray-400 text-sm">Personne d'autre ne peut coloniser et venir en intra-système sur votre cible !</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Conseils avancés</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>La <strong className="text-white">Porte de Saut</strong> permet de déplacer instantanément votre flotte entre vos lunes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Utilisez une volante pour <strong className="text-white">créer des lunes</strong> chez vos alliés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Les volantes sont aussi utiles pour <strong className="text-white">défendre vos alliés</strong> rapidement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>En intra-système, les temps de vol sont <strong className="text-white">extrêmement courts</strong> - idéal pour les raids rapides</span>
                  </li>
                </ul>
              </div>

              <RelatedGuides currentGuide="volante" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

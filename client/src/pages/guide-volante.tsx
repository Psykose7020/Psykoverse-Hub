import { motion } from "framer-motion";
import { Plane, ExternalLink, MapPin, Clock, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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
                <h2 className="font-display text-xl font-bold text-white mb-4">Pourquoi utiliser une volante ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-green-400" />
                      <h3 className="font-bold text-green-400">Temps de vol réduit</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Attaquez en quelques minutes au lieu de plusieurs heures
                    </p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-blue-400" />
                      <h3 className="font-bold text-blue-400">Réactivité</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Saisissez les opportunités avant qu'elles ne disparaissent
                    </p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-purple-400" />
                      <h3 className="font-bold text-purple-400">Couverture</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Couvrez toute la galaxie sans être limité géographiquement
                    </p>
                  </div>
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
                      <h3 className="font-bold text-white mb-1">Rapatriez ou ghostez</h3>
                      <p className="text-gray-400 text-sm">Ramenez le butin ou ghostez depuis la volante</p>
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

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Conseils avancés</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Gardez votre flotte <strong className="text-white">ghostée sur la volante</strong> même quand vous ne l'utilisez pas</span>
                  </li>
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
                </ul>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                Guide basé sur le tutoriel de <span className="text-gray-400">Triling of Borg</span>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Stratégies de volantes sur Discord
                </h3>
                <Button size="lg" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                    Rejoindre Psykoverse
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

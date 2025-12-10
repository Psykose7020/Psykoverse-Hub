import { motion } from "framer-motion";
import { Clock, Target, AlertTriangle, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideTimingRaid() {
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
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Timing & Connexions Tardives
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Exploiter les habitudes de connexion des joueurs
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">Le problème des connexions tardives</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Beaucoup de joueurs se connectent <strong className="text-white">après</strong> le retour de leur flotte, 
                  pas avant. Ils calent leur ghost pour revenir à 8h, puis se connectent à 8h15 pour relancer.
                </p>
                
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary text-sm">
                    <strong>L'opportunité :</strong> Ces 15 minutes (ou plus) où la flotte est au sol mais le joueur 
                    n'est pas connecté sont une fenêtre d'attaque idéale !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h2 className="font-display text-xl font-bold text-white">Attaque Groupée anticipée</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Si vous connaissez l'heure de retour d'un joueur (via phalange ou observation), 
                    vous pouvez préparer une <strong className="text-white">Attaque Groupée (AG/ACS)</strong> qui arrive juste après son retour.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                      <div>
                        <div className="font-bold text-white">Repérer l'heure de retour</div>
                        <p className="text-gray-400 text-sm">Via phalange, observation des activités, ou espionnage régulier.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                      <div>
                        <div className="font-bold text-white">Calculer le timing</div>
                        <p className="text-gray-400 text-sm">Votre flotte doit arriver quelques minutes après son retour, avant qu'il ne se reconnecte.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                      <div>
                        <div className="font-bold text-white">Surveiller l'activité</div>
                        <p className="text-gray-400 text-sm">S'il se connecte avant votre impact, vous pouvez encore annuler.</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Décaler l'AG jusqu'au retour</h3>
                    <p className="text-gray-300 text-sm">
                      L'avantage de l'Attaque Groupée : vous pouvez <strong className="text-white">décaler l'heure d'impact</strong> 
                      (jusqu'à 30% du temps restant) pour faire coïncider votre arrivée avec le retour de la flotte du défenseur.
                    </p>
                    <p className="text-gray-400 text-xs mt-2">
                      Lancez l'AG en avance, puis ajustez l'heure d'impact en ralentissant au fur et à mesure que vous observez le retour de sa flotte.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Identifier les habitudes</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Pour exploiter cette technique, vous devez d'abord <strong className="text-white">étudier les habitudes</strong> de votre cible :
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-white mb-2">Ce qu'il faut noter</h3>
                      <ul className="space-y-1 text-gray-400 text-sm">
                        <li>• Heures de connexion habituelles</li>
                        <li>• Durée moyenne entre retour et relance</li>
                        <li>• Jours où il est moins actif</li>
                        <li>• Ses destinations de ghost</li>
                      </ul>
                    </div>
                    <div className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-white mb-2">Indices à observer</h3>
                      <ul className="space-y-1 text-gray-400 text-sm">
                        <li>• Activité qui apparaît après vos espios</li>
                        <li>• Temps entre les activités</li>
                        <li>• Patterns répétitifs sur plusieurs jours</li>
                        <li>• Retours réguliers aux mêmes heures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Fenêtres d'opportunité</h2>
                <p className="text-gray-300 mb-4">
                  Voici les moments où les joueurs sont le plus vulnérables :
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🌅</div>
                    <h3 className="font-bold text-green-400">6h - 8h</h3>
                    <p className="text-gray-400 text-sm">Retours de nuit, joueurs pas encore réveillés</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🍽️</div>
                    <h3 className="font-bold text-amber-400">12h - 14h</h3>
                    <p className="text-gray-400 text-sm">Pause déjeuner, attention partagée</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4 text-center">
                    <div className="text-2xl mb-2">🌙</div>
                    <h3 className="font-bold text-purple-400">23h - 1h</h3>
                    <p className="text-gray-400 text-sm">Joueurs fatigués, moins réactifs</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Conseils de patience</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <span><strong className="text-white">Observez plusieurs jours</strong> - Un pattern fiable se confirme sur la durée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <span><strong className="text-white">Notez tout</strong> - Heures, durées, destinations, dans un fichier ou sur papier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <span><strong className="text-white">Frappez au bon moment</strong> - Une seule bonne attaque vaut mieux que 10 ratées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">4.</span>
                    <span><strong className="text-white">Gardez le secret</strong> - Ne révélez pas vos techniques à tout le monde</span>
                  </li>
                </ul>
              </div>

              <RelatedGuides currentGuide="raid" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

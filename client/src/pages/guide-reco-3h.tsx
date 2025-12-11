import { motion } from "framer-motion";
import { Clock, Eye, Target, AlertTriangle, CheckCircle, XCircle, Moon, Sun } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideReco3h() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                La Reconnaissance de 3h00
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                L'astuce de base pour confirmer l'absence d'une cible
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Moon className="w-6 h-6 text-indigo-400" />
                  Le principe de base
                </h2>
                <p className="text-gray-300 mb-4">
                  Chaque nuit à <strong className="text-primary text-xl">03h00 du matin</strong> (heure serveur), 
                  tous les comptes OGame sont <strong className="text-white">automatiquement reconnectés à leur Planète Mère (PM)</strong>.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Conséquence :</strong> Un triangle d'activité apparaît systématiquement sur la PM de TOUS les joueurs à 03h00, 
                    qu'ils soient connectés ou non.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Target className="w-6 h-6 text-red-400" />
                  Pourquoi c'est utile pour les raideurs ?
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Cette reconnexion automatique est une <strong className="text-white">mine d'or</strong> pour confirmer l'inactivité d'une cible :
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Cible inactive
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Si à <strong>03h15</strong> la PM de votre cible affiche un triangle "15", 
                        cela signifie que l'activité vient de la reco automatique et <strong className="text-green-400">le joueur n'est PAS connecté</strong>.
                      </p>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Cible active
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Si le triangle montre une activité plus récente (ex: triangle plein à 03h10), 
                        <strong className="text-red-400"> le joueur est réellement connecté</strong> et peut réagir.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-cyan-400" />
                  Comment utiliser cette technique ?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">1</span>
                    <div>
                      <h3 className="font-bold text-white">Identifiez vos cibles potentielles</h3>
                      <p className="text-gray-400 text-sm">Repérez les joueurs avec des ressources intéressantes dans la journée.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2</span>
                    <div>
                      <h3 className="font-bold text-white">Vérifiez à 03h15-03h30</h3>
                      <p className="text-gray-400 text-sm">Connectez-vous et scannez les PM de vos cibles dans la galaxie.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">3</span>
                    <div>
                      <h3 className="font-bold text-white">Analysez le triangle</h3>
                      <p className="text-gray-400 text-sm">
                        <strong className="text-green-400">Triangle "15" ou "30"</strong> = Activité de la reco, joueur absent<br/>
                        <strong className="text-red-400">Triangle plein</strong> = Joueur connecté, danger !
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">4</span>
                    <div>
                      <h3 className="font-bold text-white">Lancez votre raid</h3>
                      <p className="text-gray-400 text-sm">Si la cible est inactive, vous pouvez attaquer en toute confiance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Sun className="w-6 h-6 text-amber-400" />
                  Exemple concret
                </h2>
                <div className="bg-[#0B0E14] rounded-lg p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-gray-500 font-mono text-sm w-16">03:00</div>
                      <div className="flex-1 h-px bg-gradient-to-r from-indigo-500 to-transparent"></div>
                      <div className="text-indigo-400 text-sm">Reco automatique sur toutes les PM</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-gray-500 font-mono text-sm w-16">03:15</div>
                      <div className="flex-1 h-px bg-gradient-to-r from-cyan-500 to-transparent"></div>
                      <div className="text-cyan-400 text-sm">Vous scannez la galaxie</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-gray-500 font-mono text-sm w-16">—</div>
                      <div className="flex-1">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-green-900/20 p-3 rounded">
                            <span className="text-green-400">PM cible A : Triangle "15"</span>
                            <div className="text-gray-500 text-xs mt-1">→ Inactif depuis 03:00</div>
                          </div>
                          <div className="bg-red-900/20 p-3 rounded">
                            <span className="text-red-400">PM cible B : Triangle plein</span>
                            <div className="text-gray-500 text-xs mt-1">→ Connecté après 03:00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-gray-500 font-mono text-sm w-16">03:20</div>
                      <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent"></div>
                      <div className="text-green-400 text-sm">Raid sur cible A en toute sécurité</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6" />
                  Points importants
                </h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>La reco de 03h00 ne génère de l'activité que sur la <strong className="text-white">Planète Mère</strong>, pas sur les colonies ou lunes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Si un joueur a de l'activité sur une <strong className="text-white">colonie ou lune</strong> à 03h15, c'est qu'il est vraiment actif !</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Vérifiez l'heure serveur de votre univers - elle peut différer de votre heure locale.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>Cette technique est <strong className="text-white">connue de tous les raideurs expérimentés</strong> - ne sous-estimez pas vos cibles !</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">En résumé</h2>
                <p className="text-gray-300">
                  La reco de 3h00 est un outil fondamental pour tout raideur. Elle permet de <strong className="text-primary">confirmer l'absence</strong> d'un 
                  joueur en comparant son activité avec l'activité automatique générée par le serveur. C'est la première étape avant tout raid nocturne réussi.
                </p>
              </div>

              <RelatedGuides currentGuide="reco-3h" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

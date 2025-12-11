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
                  les joueurs qui se reconnectent à OGame atterrissent <strong className="text-white">automatiquement sur leur Planète Mère (PM)</strong>.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Conséquence :</strong> Seuls les joueurs qui se reconnectent après 03h00 allument un triangle d'activité sur leur PM. 
                    Ceux qui ne se connectent pas n'ont aucune activité.
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
                    Ce mécanisme de reconnexion sur la PM est une <strong className="text-white">mine d'or</strong> pour confirmer l'inactivité d'une cible :
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Cible inactive
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Si après <strong>03h00</strong> la PM de votre cible n'affiche <strong className="text-green-400">aucune activité</strong>, 
                        le joueur ne s'est pas reconnecté et n'est probablement pas là.
                      </p>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        Cible active
                      </h3>
                      <p className="text-gray-300 text-sm">
                        Si la PM affiche un triangle d'activité après 03h00, 
                        <strong className="text-red-400"> le joueur s'est reconnecté</strong> et peut réagir à une attaque.
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
                      <h3 className="font-bold text-white">Analysez l'activité</h3>
                      <p className="text-gray-400 text-sm">
                        <strong className="text-green-400">Aucune activité</strong> = Joueur ne s'est pas reconnecté, probablement absent<br/>
                        <strong className="text-red-400">Triangle visible</strong> = Joueur s'est reconnecté après 03h00, danger !
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
                      <div className="text-indigo-400 text-sm">Les reconnexions atterrissent sur la PM</div>
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
                            <span className="text-green-400">PM cible A : Aucune activité</span>
                            <div className="text-gray-500 text-xs mt-1">→ Ne s'est pas reconnecté</div>
                          </div>
                          <div className="bg-red-900/20 p-3 rounded">
                            <span className="text-red-400">PM cible B : Triangle visible</span>
                            <div className="text-gray-500 text-xs mt-1">→ S'est reconnecté après 03:00</div>
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
                    <span>Les joueurs qui se reconnectent après 03h00 atterrissent sur leur <strong className="text-white">Planète Mère</strong> uniquement.</span>
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

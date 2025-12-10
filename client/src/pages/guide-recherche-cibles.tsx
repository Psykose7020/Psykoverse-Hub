import { motion } from "framer-motion";
import { Eye, Clock, AlertTriangle, Target } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideRechercheCibles() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/20">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Recherche de Cibles
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comment trouver les meilleures cibles pour vos raids
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">L'astuce du matin</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Connectez-vous <strong className="text-primary">tôt le matin</strong> pour attraper tous les retours de flotte ratés. 
                  En début d'univers, ils sont nombreux !
                </p>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-amber-400 mb-2">Heures de retour standard</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-amber-800/30 px-3 py-1 rounded text-sm text-white">6h - 8h</span>
                    <span className="bg-amber-800/30 px-3 py-1 rounded text-sm text-white">11h - 14h</span>
                    <span className="bg-amber-800/30 px-3 py-1 rounded text-sm text-white">16h - 19h</span>
                  </div>
                  <p className="text-amber-300/70 text-xs">Ce sont les créneaux les plus rentables pour chercher des cibles</p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-blue-400" />
                  <h2 className="font-display text-xl font-bold text-white">Technique du double espionnage</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Une technique très efficace pour trouver des flottes cachées :
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                      <div>
                        <div className="font-bold text-white">Premier passage</div>
                        <p className="text-gray-400 text-sm">Espionnez toutes les planètes et lunes d'une zone. Notez les timers d'activité.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                      <div>
                        <div className="font-bold text-white">Attendre 30-40 minutes</div>
                        <p className="text-gray-400 text-sm">Laissez le temps aux joueurs de se reconnecter ou aux flottes de revenir.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                      <div>
                        <div className="font-bold text-white">Deuxième passage</div>
                        <p className="text-gray-400 text-sm">
                          <strong className="text-primary">Espionnez tous les timers qui ne collent pas avec les vôtres.</strong> 
                          Si une planète montre une activité que vous n'avez pas causée, c'est qu'il s'est passé quelque chose !
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-primary text-sm">
                      <strong>Astuce :</strong> OGame se joue parfois à quelques secondes. Cette technique permet de trouver des flottes 
                      qui viennent de revenir ou des joueurs qui viennent de se connecter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">Surveillance discrète</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Quand vous trouvez une cible potentielle, <strong className="text-red-400">ne harcelez pas le joueur d'espionnages !</strong>
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-red-400 mb-2">À éviter</h3>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Espionner toutes les 5 minutes</li>
                        <li>• Envoyer plusieurs sondes d'affilée</li>
                        <li>• Montrer que vous surveillez</li>
                      </ul>
                    </div>
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-green-400 mb-2">À faire</h3>
                      <ul className="space-y-1 text-gray-300 text-sm">
                        <li>• Observer les activités simplement</li>
                        <li>• Chercher ses habitudes</li>
                        <li>• Attendre le bon moment</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">
                      <strong className="text-white">Pourquoi ?</strong> Si vous espionnez trop, le joueur va se méfier et 
                      se repositionner loin de vous. Patience et discrétion sont les clés du raid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Types de cibles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <h3 className="font-bold text-white mb-2">Full (flotte + ressources)</h3>
                    <p className="text-gray-400 text-sm">La cible idéale : flotte au sol avec ressources. Rare mais très rentable.</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="text-2xl mb-2">🏦</div>
                    <h3 className="font-bold text-white mb-2">Banque (ressources)</h3>
                    <p className="text-gray-400 text-sm">Joueur avec beaucoup de ressources mais peu de flotte. Attention aux pièges !</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="text-2xl mb-2">💤</div>
                    <h3 className="font-bold text-white mb-2">Inactif</h3>
                    <p className="text-gray-400 text-sm">Joueurs avec (i) ou (I). Faciles mais souvent déjà vidés.</p>
                  </div>
                </div>
              </div>

              <RelatedGuides currentGuide="raid" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

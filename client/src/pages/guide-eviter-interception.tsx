import { motion } from "framer-motion";
import { Shield, Clock, Target, AlertTriangle, Check, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideEviterInterception() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Éviter l'Interception
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Techniques pour raider en toute sécurité
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Check className="w-6 h-6 text-green-400" />
                  <h2 className="font-display text-xl font-bold text-white">Vérifications avant raid</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Avant d'envoyer votre flotte, vérifiez toujours ces éléments :
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <div className="font-bold text-white">Astrophysique de la cible</div>
                      <p className="text-gray-400 text-sm">Vérifiez son niveau d'Astro pour connaître son nombre de planètes possibles. Plus de planètes = plus de lunes potentielles pour vous phalanger.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <div className="font-bold text-white">Points militaires</div>
                      <p className="text-gray-400 text-sm">Regardez son total de points militaires dans les classements. Il ne peut pas vous intercepter avec une flotte qu'il n'a pas !</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <div className="font-bold text-white">Préférez les fulls aux banques</div>
                      <p className="text-gray-400 text-sm">Une banque (beaucoup de ressources, peu de flotte) peut être un piège. Un full (flotte + ressources) est plus sûr.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Technique du décalage</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Sur les raids avec activité suspecte, vous pouvez <strong className="text-white">décaler votre flotte</strong> avant l'impact.
                  </p>
                  
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">Erreur fatale à éviter</h3>
                    <p className="text-gray-300 text-sm">
                      <strong className="text-white">Ne décalez jamais de la même durée !</strong> Un ennemi peut noter 
                      "Ce joueur décale toujours de 30 secondes" et caler sa DG 25 secondes après votre impact initial.
                    </p>
                  </div>

                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Bonne pratique</h3>
                    <p className="text-gray-300 text-sm mb-2">Variez vos décalages :</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-green-800/30 px-2 py-1 rounded text-xs text-white">1 min</span>
                      <span className="text-gray-500">→</span>
                      <span className="bg-green-800/30 px-2 py-1 rounded text-xs text-white">2 min</span>
                      <span className="text-gray-500">→</span>
                      <span className="bg-green-800/30 px-2 py-1 rounded text-xs text-white">3 min</span>
                      <span className="text-gray-500">→</span>
                      <span className="bg-green-800/30 px-2 py-1 rounded text-xs text-white">45 sec</span>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-primary text-sm">
                      <strong>Limite :</strong> Le décalage ne peut se faire que s'il est inférieur à 30% de la durée restante du vol.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-green-400" />
                  <h2 className="font-display text-xl font-bold text-white">Technique des waves sur banque</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Pour taper une banque pleine de transporteurs (ex: 700 traqueurs nécessaires pour tout piller), 
                    <strong className="text-white"> ne jamais envoyer toute sa flotte d'un coup !</strong>
                  </p>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Exemple de découpage</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 p-2 bg-green-900/10 border border-green-700/20 rounded">
                        <span className="text-green-400 font-bold">Wave 1:</span>
                        <span className="text-white">100 traqueurs</span>
                        <span className="text-gray-500 text-sm">→ Test + premiers dégâts</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-green-900/10 border border-green-700/20 rounded">
                        <span className="text-green-400 font-bold">Wave 2:</span>
                        <span className="text-white">250 traqueurs</span>
                        <span className="text-gray-500 text-sm">→ Destruction principale</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-green-900/10 border border-green-700/20 rounded">
                        <span className="text-green-400 font-bold">Wave 3:</span>
                        <span className="text-white">350 traqueurs</span>
                        <span className="text-gray-500 text-sm">→ Finition</span>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-blue-900/10 border border-blue-700/20 rounded">
                        <span className="text-blue-400 font-bold">Waves 4-6:</span>
                        <span className="text-white">Petits transporteurs</span>
                        <span className="text-gray-500 text-sm">→ Pillage</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-primary text-sm">
                      <strong>Avantage :</strong> Si vous vous faites intercepter, vous ne perdez qu'une petite partie de votre flotte !
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-purple-400" />
                  <h2 className="font-display text-xl font-bold text-white">Technique du faux retour</h2>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Une technique psychologique pour tromper votre adversaire :
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-white mb-2">Option 1 : Double envoi</h3>
                      <p className="text-gray-400 text-sm">
                        Envoyez 2× votre flotte avec un espionnage calé entre les deux. 
                        Faites retour sur la première flotte pour faire croire que vous annulez... 
                        mais laissez passer la deuxième !
                      </p>
                    </div>
                    <div className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-white mb-2">Option 2 : Espio bluff</h3>
                      <p className="text-gray-400 text-sm">
                        Calez un espionnage 1 seconde après votre impact. L'adversaire pense que vous 
                        allez vérifier et annuler... mais vous laissez passer !
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-amber-400 text-sm">
                      <strong>Note :</strong> Ces techniques marchent mieux contre des joueurs expérimentés 
                      qui surveillent les activités. Les débutants ne les remarqueront pas.
                    </p>
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

import { motion } from "framer-motion";
import { TrendingUp, ExternalLink, MapPin, Factory, FlaskConical, Moon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideDeveloppement() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Développement de Compte
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Stratégies d'implantation et de développement efficace
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-blue-400" />
                  <h2 className="font-display text-xl font-bold text-white">Implantation - Positionnement</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Pour les raideurs</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Deux planètes par galaxie minimum. Rappelez-vous que <strong className="text-primary">170 systèmes = 1 galaxie</strong> en temps de vol.
                    </p>
                    <p className="text-gray-400 text-sm mb-3">
                      Les joueurs inexpérimentés se mettent souvent en fin de galaxie (G4, G5) 
                      ou en début/fin se pensant en "sécurité".
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                        <h4 className="font-bold text-blue-400 text-sm mb-1">Unis circulaires</h4>
                        <p className="text-gray-300 text-xs">Visez positions 1 et 250, ou 125 et 375</p>
                      </div>
                      <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3">
                        <h4 className="font-bold text-purple-400 text-sm mb-1">Unis non-circulaires</h4>
                        <p className="text-gray-300 text-xs">Répartissez-vous au centre de chaque galaxie</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Objectif : Astrophysique 21</h3>
                    <p className="text-gray-300 text-sm">
                      Vous aurez 2 colonies par galaxie + 1 doublon + 1 volante. 
                      C'est l'objectif idéal pour un compte équilibré.
                    </p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Pour les mineurs</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong className="text-white">Ne mettez pas toutes vos planètes dans le même système</strong> - 
                        vous aurez des soucis avec les heures de ghost</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>Faites des doublons dans chaque système et étalez-vous</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>Un système pas complet avec un gros joueur dedans peut vite devenir usant</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Développement Mines</h2>
                </div>
                
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                  <p className="text-primary font-medium">
                    Principe : Mes mines construisent des vaisseaux → La renta up les mines → Plus de vaisseaux chaque jour
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Stratégie de développement</h3>
                    <p className="text-gray-300 text-sm">
                      Montez énormément les mines au départ. Dès que vous avez des vaisseaux et commencez 
                      à raider/expédier, <strong className="text-white">investissez une partie de chaque grosse renta en mines</strong>.
                    </p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Objectif mines</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Fixez-vous un cap qui correspond à votre temps de jeu. Exemple :
                    </p>
                    <div className="flex gap-3">
                      <span className="bg-gray-700 px-3 py-2 rounded text-white font-mono">M34</span>
                      <span className="bg-blue-700 px-3 py-2 rounded text-white font-mono">C31</span>
                      <span className="bg-cyan-700 px-3 py-2 rounded text-white font-mono">D30</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-gray-400 font-bold mb-1">Positions 7/8/9</div>
                      <div className="text-white text-sm">Bonus Métal</div>
                    </div>
                    <div className="bg-blue-800/50 rounded-lg p-3 text-center">
                      <div className="text-blue-400 font-bold mb-1">Positions 1/2/3</div>
                      <div className="text-white text-sm">Bonus Cristal</div>
                    </div>
                    <div className="bg-cyan-800/50 rounded-lg p-3 text-center">
                      <div className="text-cyan-400 font-bold mb-1">Positions 13/14/15</div>
                      <div className="text-white text-sm">Bonus Deutérium</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FlaskConical className="w-6 h-6 text-teal-400" />
                  <h2 className="font-display text-xl font-bold text-white">Développement Technologies</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Réseau de Recherche Intergalactique (RRI)</h3>
                    <p className="text-gray-300 text-sm">
                      Votre RRI doit être <strong className="text-primary">égal ou juste inférieur à votre nombre de planètes</strong>. 
                      Chaque labo accélère toutes vos recherches !
                    </p>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-amber-400 mb-2">L'importance des technos de combat</h3>
                    <p className="text-gray-300 text-sm">
                      "Une techno de combat change presque rien" ? <strong className="text-white">Faux !</strong> 
                      Ce "presque" multiplié par le nombre de combats est énorme. 
                      1/100 de perte économisée par combat × 100 combats = différence énorme !
                    </p>
                  </div>

                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Rush prioritaires</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">•</span>
                        <span><strong className="text-white">Impulsion 17</strong> - Pour les recycleurs (changement de moteur)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">•</span>
                        <span><strong className="text-white">Hyperespace 15</strong> - Après, les recycleurs coûtent une fortune en deut</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">•</span>
                        <span>La combustion reste utile ! Vos chasseurs légers restent un des meilleurs outils de raid</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-sm text-primary">
                      <strong>Secret du classement recherche :</strong> Ayez toujours une recherche en cours !
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Moon className="w-6 h-6 text-gray-400" />
                  <h2 className="font-display text-xl font-bold text-white">Développement Lunes</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Rush prioritaire</h3>
                    <p className="text-gray-300 text-sm">
                      Rush <strong className="text-primary">Usine 8</strong> pour lancer votre Phalange au plus vite, 
                      ensuite montez le reste.
                    </p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Défense lunaire (Lanceurs de missiles)</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Construisez des LM (chantier niveau 2 en continu) sur <strong className="text-white">toutes vos lunes</strong> pour :
                    </p>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Éviter les pillages au transporteurs non accompagnés</li>
                      <li>• Forcer vos ennemis à augmenter le nombre de RIP pour vous MB</li>
                      <li>• Les forcer à vous MIP, ce qui peut les rediriger vers une autre cible</li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-blue-400 mb-2">Bunker lunaire</h3>
                    <p className="text-gray-300 text-sm">
                      Faites un bunker lunaire sur une de vos lunes du doublon. 
                      Tirez vos statios de préférence vers votre bunker. 
                      <strong className="text-white"> Tirez vos expéditions depuis votre bunker</strong> - elles y sont en sécurité !
                    </p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Silos et missiles d'interception</h3>
                    <p className="text-gray-300 text-sm">
                      Pensez à faire des silos avec des missiles d'interception sur vos planètes principales 
                      pour vous protéger des MIP ennemis.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Conseils personnalisés sur Discord
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

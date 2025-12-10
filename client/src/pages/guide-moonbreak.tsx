import { motion } from "framer-motion";
import { Bomb, ExternalLink, AlertTriangle, Target, Shield } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideMoonbreak() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
                <Bomb className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                MoonBreak (MB)
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Destruction de lune - L'arme ultime
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Qu'est-ce que le MoonBreak ?</h2>
                <p className="text-gray-300 mb-4">
                  Le MoonBreak (MB) consiste à envoyer des <strong className="text-primary">Étoiles de la Mort (RIP/EDLM)</strong> 
                  en mission "Destruction" pour détruire une lune ennemie.
                </p>
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <p className="text-sm text-red-300">
                    <strong>Attention :</strong> La mission Destruction est à double tranchant ! 
                    Vos RIP risquent aussi d'être détruites.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Pourquoi détruire une lune ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Raisons offensives</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span>Supprimer sa <strong className="text-white">Phalange</strong> pour ne plus être scanné</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span>Supprimer sa <strong className="text-white">Porte de Saut</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span>Rendre sa flotte <strong className="text-white">phalangeable</strong> au retour</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Résultat du MB</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>Sa flotte qui ghost rentre sur la <strong className="text-white">planète</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>Sa flotte devient <strong className="text-white">visible à la phalange</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>Vous pouvez maintenant <strong className="text-white">timer son retour</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Les probabilités</h2>
                <p className="text-gray-300 mb-4">
                  La destruction dépend de la <strong className="text-white">taille de la lune</strong> et du 
                  <strong className="text-white"> nombre de RIP</strong> envoyées.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Chance de destruction de la lune</h3>
                    <p className="text-gray-300 text-sm">
                      <code className="bg-black/30 px-2 py-1 rounded">(100 - √taille) × √nb_RIP</code>
                    </p>
                    <p className="text-gray-500 text-xs mt-2">Plus de RIP = plus de chances</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">Chance de perte des RIP</h3>
                    <p className="text-gray-300 text-sm">
                      <code className="bg-black/30 px-2 py-1 rounded">√taille / 2</code>
                    </p>
                    <p className="text-gray-500 text-xs mt-2">Dépend uniquement de la taille de la lune</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-2 px-3 text-gray-400">Taille lune</th>
                        <th className="text-left py-2 px-3 text-gray-400">RIP recommandées</th>
                        <th className="text-left py-2 px-3 text-gray-400">% destruction</th>
                        <th className="text-left py-2 px-3 text-gray-400">% perte RIP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-3 text-white">~5 000 km</td>
                        <td className="py-2 px-3 text-gray-300">4-5 RIP</td>
                        <td className="py-2 px-3 text-green-400">~50%</td>
                        <td className="py-2 px-3 text-red-400">~35%</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-3 text-white">~8 000 km</td>
                        <td className="py-2 px-3 text-gray-300">6-8 RIP</td>
                        <td className="py-2 px-3 text-green-400">~45%</td>
                        <td className="py-2 px-3 text-red-400">~45%</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-3 text-white">~8 944 km (max)</td>
                        <td className="py-2 px-3 text-gray-300">10+ RIP</td>
                        <td className="py-2 px-3 text-green-400">~40%</td>
                        <td className="py-2 px-3 text-red-400">~47%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Stratégie de MB</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">1. Timing</h3>
                    <p className="text-gray-300 text-sm">
                      Le MB doit arriver <strong className="text-primary">avant le retour de la flotte ennemie</strong>. 
                      Idéalement pendant la nuit quand l'ennemi ne peut pas réagir.
                    </p>
                  </div>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">2. Double MB</h3>
                    <p className="text-gray-300 text-sm">
                      Envoyez <strong className="text-white">2 vagues de RIP</strong> espacées de quelques minutes. 
                      Si la première échoue, la deuxième a une nouvelle chance.
                    </p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">3. Coordination avec DG</h3>
                    <p className="text-gray-300 text-sm">
                      Préparez une <strong className="text-white">flotte d'attaque</strong> qui arrive juste après le MB, 
                      pour intercepter la flotte ennemie à son retour sur la planète.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h2 className="font-display text-xl font-bold text-white">Se protéger du MB</h2>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-gray-300"><strong className="text-white">Construisez des LM sur vos lunes</strong></p>
                      <p className="text-gray-500 text-sm">Force l'ennemi à envoyer plus de RIP ou à MIP d'abord</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-gray-300"><strong className="text-white">Ghostez depuis un bunker lunaire</strong></p>
                      <p className="text-gray-500 text-sm">Une lune bien défendue est plus risquée à MB</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-gray-300"><strong className="text-white">Ayez plusieurs lunes</strong></p>
                      <p className="text-gray-500 text-sm">Un doublon vous donne une solution de secours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-gray-300"><strong className="text-white">Surveillez l'activité sur vos lunes</strong></p>
                      <p className="text-gray-500 text-sm">Une activité suspecte peut annoncer un MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Technique RDS sécurisée après MB</h2>
                <p className="text-gray-300 mb-4">
                  Si vous êtes MB et qu'une phalange vous surveille, voici une technique pour gagner du temps :
                </p>
                <div className="bg-[#151924] rounded-lg p-4">
                  <p className="text-gray-300 text-sm">
                    Envoyez des <strong className="text-white">missions rapides en grande quantité</strong> jusqu'à ce que 
                    la fenêtre de phalange passe en menu déroulant. L'ennemi devra scroller et chercher 
                    votre vraie flotte parmi toutes les missions.
                  </p>
                  <p className="text-primary text-sm mt-2">
                    Cette technique peut vous donner les secondes cruciales pour échapper à l'interception !
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Besoin d'aide contre un MB ?
                </h3>
                <Button size="lg" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                    Rejoindre le Discord
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

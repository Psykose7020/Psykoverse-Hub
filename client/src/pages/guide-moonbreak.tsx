import { useState } from "react";
import { motion } from "framer-motion";
import { Bomb, ExternalLink, AlertTriangle, Target, Shield, Calculator, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideMoonbreak() {
  const [moonSize, setMoonSize] = useState(8944);
  const [ripCount, setRipCount] = useState(10);
  const [waveCount, setWaveCount] = useState(3);
  
  const destructionChance = Math.max(0, Math.min(100, (100 - Math.sqrt(moonSize)) * Math.sqrt(ripCount)));
  const ripLossChance = Math.sqrt(moonSize) / 2;
  
  const destructionProb = destructionChance / 100;
  const cumulativeChance = (1 - Math.pow(1 - destructionProb, waveCount)) * 100;
  const expectedRipLoss = waveCount * (ripLossChance / 100) * ripCount;
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
                        <td className="py-2 px-3 text-white">~8 944 km (max standard)</td>
                        <td className="py-2 px-3 text-gray-300">10+ RIP</td>
                        <td className="py-2 px-3 text-green-400">~40%</td>
                        <td className="py-2 px-3 text-red-400">~47%</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-3 text-purple-400">~9 400+ km (Kaelesh)</td>
                        <td className="py-2 px-3 text-gray-300">15+ RIP</td>
                        <td className="py-2 px-3 text-green-400">~33%</td>
                        <td className="py-2 px-3 text-red-400">~48%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-bold text-white">Calculateur MoonBreak</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Taille de la lune (km)</label>
                    <input
                      type="number"
                      value={moonSize}
                      onChange={(e) => setMoonSize(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      min="1"
                      max="15000"
                      data-testid="input-moon-size"
                    />
                    <input
                      type="range"
                      value={moonSize}
                      onChange={(e) => setMoonSize(parseInt(e.target.value))}
                      min="1000"
                      max="12000"
                      className="w-full mt-2 accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Nombre de RIP</label>
                    <input
                      type="number"
                      value={ripCount}
                      onChange={(e) => setRipCount(Math.max(1, parseInt(e.target.value) || 0))}
                      className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      min="1"
                      max="1000"
                      data-testid="input-rip-count"
                    />
                    <input
                      type="range"
                      value={ripCount}
                      onChange={(e) => setRipCount(parseInt(e.target.value))}
                      min="1"
                      max="50"
                      className="w-full mt-2 accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Nombre de vagues</label>
                    <input
                      type="number"
                      value={waveCount}
                      onChange={(e) => setWaveCount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary"
                      min="1"
                      max="20"
                      data-testid="input-wave-count"
                    />
                    <input
                      type="range"
                      value={waveCount}
                      onChange={(e) => setWaveCount(parseInt(e.target.value))}
                      min="1"
                      max="10"
                      className="w-full mt-2 accent-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Chance de destruction</p>
                    <p className="text-4xl font-bold text-green-400" data-testid="text-destruction-chance">
                      {destructionChance.toFixed(1)}%
                    </p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Chance de perte des RIP</p>
                    <p className="text-4xl font-bold text-red-400" data-testid="text-rip-loss-chance">
                      {ripLossChance.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-center text-gray-500 text-sm">
                  {destructionChance > ripLossChance ? (
                    <span className="text-green-400">Le MB est favorable (destruction &gt; perte RIP)</span>
                  ) : destructionChance < ripLossChance ? (
                    <span className="text-red-400">Le MB est risqué (perte RIP &gt; destruction)</span>
                  ) : (
                    <span className="text-amber-400">Risque équilibré</span>
                  )}
                </div>

                <div className="mt-6 bg-violet-900/20 border border-violet-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-violet-400 mb-3 text-center">Probabilité cumulée sur {waveCount} vague{waveCount > 1 ? 's' : ''}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-1">Chance de détruire la lune</p>
                      <p className="text-3xl font-bold text-violet-400" data-testid="text-cumulative-chance">
                        {cumulativeChance.toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Formule : 1 - (1 - {(destructionProb * 100).toFixed(1)}%)^{waveCount}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-1">RIP perdues en moyenne</p>
                      <p className="text-3xl font-bold text-red-400" data-testid="text-expected-rip-loss">
                        ~{expectedRipLoss.toFixed(1)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Sur {waveCount * ripCount} RIP envoyées au total
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  <h2 className="font-display text-xl font-bold text-purple-400">Tip : Les Kaelesh et leurs lunes géantes</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Les <strong className="text-purple-400">Kaelesh</strong> (Forme de Vie) possèdent un bâtiment spécial qui 
                  <strong className="text-white"> augmente les chances d'obtenir une lune</strong> et surtout 
                  <strong className="text-white"> la taille de celle-ci</strong>.
                </p>
                <div className="bg-[#151924] rounded-lg p-4 mb-4">
                  <p className="text-gray-300 text-sm">
                    Grâce à ce bonus, il est possible d'avoir des lunes de <strong className="text-purple-400">plus de 9 400 km</strong>, 
                    voire au-delà ! Cela change radicalement les probabilités de MoonBreak :
                  </p>
                  <ul className="text-gray-300 text-sm mt-3 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span>Lune 8 944 km : <strong className="text-red-400">~47%</strong> de perte RIP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span>Lune 9 400 km : <strong className="text-red-400">~48%</strong> de perte RIP, mais destruction <strong className="text-green-400">réduite à ~33%</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-4">
                  <h3 className="font-bold text-amber-400 mb-3">Fatale (100% destruction)</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Pour garantir la destruction à <strong className="text-amber-400">100%</strong>, il faut envoyer suffisamment de RIP :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#151924] rounded-lg p-3 text-center">
                      <p className="text-gray-400 text-xs mb-1">Lune 8 800 km</p>
                      <p className="text-2xl font-bold text-amber-400">261 RIP</p>
                      <p className="text-gray-500 text-xs mt-1">Perte moyenne : ~123 RIP</p>
                    </div>
                    <div className="bg-[#151924] rounded-lg p-3 text-center">
                      <p className="text-gray-400 text-xs mb-1">Lune 9 400 km (Kaelesh)</p>
                      <p className="text-2xl font-bold text-amber-400">1 075 RIP</p>
                      <p className="text-gray-500 text-xs mt-1">Perte moyenne : ~521 RIP</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Formule : RIP = (100 / (100 - √taille))²
                  </p>
                </div>
                <div className="bg-purple-800/20 border border-purple-600/30 rounded-lg p-4">
                  <p className="text-purple-300 text-sm font-bold">
                    C'est un véritable game-changer défensif ! Les joueurs Kaelesh avec des lunes géantes sont 
                    beaucoup plus difficiles à MB, rendant leur fleetsave bien plus sûr.
                  </p>
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

              <RelatedGuides currentGuide="moonbreak" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

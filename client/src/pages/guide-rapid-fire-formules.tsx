import { motion } from "framer-motion";
import { Zap, Calculator, BarChart3, Target, Percent, Info } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideRapidFireFormules() {
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
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full text-sm font-medium">
                  Expert
                </span>
                <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-sm font-medium">
                  Formules
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Rapid Fire : Formules
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Les mathématiques derrière le système de tirs multiples
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-amber-400">Prérequis</h2>
                </div>
                <p className="text-gray-300">
                  Ce guide suppose que vous avez déjà lu le <Link href="/guide/rapid-fire" className="text-primary hover:underline">guide de base sur le Rapid Fire</Link>. 
                  Ici, nous allons approfondir les formules mathématiques pour les joueurs qui veulent comprendre les calculs exacts.
                </p>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-6 h-6 text-green-400" />
                  <h2 className="font-display text-xl font-bold text-white">Formule de probabilité</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Si un vaisseau a un Rapid Fire de <strong className="text-primary">X</strong> contre un type d'unité :</p>
                  
                  <div className="bg-[#151924] rounded-lg p-6 text-center">
                    <p className="text-3xl font-mono text-primary mb-3">
                      P = 1 - (1/X)
                    </p>
                    <p className="text-gray-400">Probabilité de tirer à nouveau après avoir touché une cible avec RF</p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Démonstration :</h3>
                    <div className="space-y-2 text-sm">
                      <p>• Le RF indique le nombre moyen de tirs attendu</p>
                      <p>• Pour obtenir X tirs en moyenne, la probabilité de continuer doit être (X-1)/X</p>
                      <p>• Car : 1 + P + P² + P³ + ... = 1/(1-P) = X quand P = (X-1)/X</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                  <h2 className="font-display text-xl font-bold text-white">Tableau des probabilités</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-3 px-4 text-gray-400">Rapid Fire (X)</th>
                        <th className="text-left py-3 px-4 text-gray-400">Formule</th>
                        <th className="text-left py-3 px-4 text-gray-400">Probabilité de continuer</th>
                        <th className="text-left py-3 px-4 text-gray-400">Probabilité d'arrêt</th>
                        <th className="text-left py-3 px-4 text-gray-400">Tirs moyens</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 2</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/2)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">50%</td>
                        <td className="py-3 px-4 text-red-400">50%</td>
                        <td className="py-3 px-4 text-primary font-bold">2</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 3</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/3)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">66.67%</td>
                        <td className="py-3 px-4 text-red-400">33.33%</td>
                        <td className="py-3 px-4 text-primary font-bold">3</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 4</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/4)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">75%</td>
                        <td className="py-3 px-4 text-red-400">25%</td>
                        <td className="py-3 px-4 text-primary font-bold">4</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 5</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/5)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">80%</td>
                        <td className="py-3 px-4 text-red-400">20%</td>
                        <td className="py-3 px-4 text-primary font-bold">5</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 6</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/6)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">83.33%</td>
                        <td className="py-3 px-4 text-red-400">16.67%</td>
                        <td className="py-3 px-4 text-primary font-bold">6</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 7</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/7)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">85.71%</td>
                        <td className="py-3 px-4 text-red-400">14.29%</td>
                        <td className="py-3 px-4 text-primary font-bold">7</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 10</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/10)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">90%</td>
                        <td className="py-3 px-4 text-red-400">10%</td>
                        <td className="py-3 px-4 text-primary font-bold">10</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 20</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/20)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">95%</td>
                        <td className="py-3 px-4 text-red-400">5%</td>
                        <td className="py-3 px-4 text-primary font-bold">20</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-3 px-4 text-white font-bold">RF 100</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/100)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">99%</td>
                        <td className="py-3 px-4 text-red-400">1%</td>
                        <td className="py-3 px-4 text-primary font-bold">100</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 text-white font-bold">RF 250</td>
                        <td className="py-3 px-4 text-gray-400 font-mono">1 - (1/250)</td>
                        <td className="py-3 px-4 text-green-400 font-bold">99.6%</td>
                        <td className="py-3 px-4 text-red-400">0.4%</td>
                        <td className="py-3 px-4 text-primary font-bold">250</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-orange-400" />
                  <h2 className="font-display text-xl font-bold text-white">Calcul avec flottes mixtes</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Quand l'ennemi a une flotte mixte (certaines cibles avec RF, d'autres sans), le calcul se complique :</p>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Formule du nombre moyen de tirs :</h3>
                    <div className="bg-[#0D1117] rounded p-4 font-mono text-center">
                      <p className="text-primary text-lg">E[tirs] = 1 / (1 - P × R)</p>
                    </div>
                    <div className="mt-3 text-sm space-y-1">
                      <p>• <strong className="text-white">P</strong> = probabilité de continuer (ex: 0.9 pour RF 10)</p>
                      <p>• <strong className="text-white">R</strong> = ratio de cibles avec RF dans la flotte ennemie</p>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Exemple :</h3>
                    <p className="text-sm mb-2">Un Croiseur (RF 10 vs Lance-Missiles) attaque :</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• 80 Lance-Missiles</li>
                      <li>• 20 Lasers Légers (pas de RF)</li>
                    </ul>
                    <div className="mt-3 bg-[#0D1117] rounded p-3">
                      <p className="font-mono text-sm">R = 80/100 = 0.8</p>
                      <p className="font-mono text-sm">P = 0.9 (RF 10)</p>
                      <p className="font-mono text-sm">E[tirs] = 1 / (1 - 0.9 × 0.8) = 1 / 0.28 = <span className="text-primary font-bold">3.57 tirs</span></p>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                      Au lieu de 10 tirs en moyenne contre une défense 100% Lance-Missiles, le Croiseur ne tirera que 3.57 fois en moyenne.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Percent className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">Calcul des explosions cumulées</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Quand une unité tombe sous 70% de sa coque, elle a une probabilité d'exploser à chaque tir reçu :</p>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="bg-[#0D1117] rounded p-4 font-mono text-center mb-3">
                      <p className="text-red-400 text-lg">P(explosion) = 1 - (coque_actuelle / coque_max)</p>
                    </div>
                    <p className="text-sm">Le RF augmente les chances d'explosion car chaque tir supplémentaire est un nouveau jet de dé.</p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Probabilité d'explosion après N tirs :</h3>
                    <div className="bg-[#0D1117] rounded p-4 font-mono text-center">
                      <p className="text-red-400">P(explosion après N tirs) = 1 - (1 - p)^N</p>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">où p = probabilité d'explosion par tir</p>
                  </div>

                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">Exemple :</h3>
                    <p className="text-sm">Un vaisseau à 50% de coque (p = 50% d'explosion par tir)</p>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Après 1 tir : 50% de chance d'exploser</li>
                      <li>• Après 2 tirs : 1 - (0.5)² = <strong className="text-white">75%</strong></li>
                      <li>• Après 3 tirs : 1 - (0.5)³ = <strong className="text-white">87.5%</strong></li>
                      <li>• Après 5 tirs : 1 - (0.5)⁵ = <strong className="text-white">96.9%</strong></li>
                    </ul>
                    <p className="text-gray-400 text-sm mt-2">
                      C'est pourquoi le RF est si dévastateur : il multiplie les jets d'explosion !
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h2 className="font-display text-xl font-bold text-white">Tableau complet des RF</h2>
                </div>
                <p className="text-gray-400 mb-4">Tous les Rapid Fire de chaque vaisseau :</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-2 px-2 text-gray-400">Vaisseau</th>
                        <th className="text-center py-2 px-1 text-gray-400">Sonde</th>
                        <th className="text-center py-2 px-1 text-gray-400">Sat</th>
                        <th className="text-center py-2 px-1 text-gray-400">PT</th>
                        <th className="text-center py-2 px-1 text-gray-400">GT</th>
                        <th className="text-center py-2 px-1 text-gray-400">CLé</th>
                        <th className="text-center py-2 px-1 text-gray-400">CLo</th>
                        <th className="text-center py-2 px-1 text-gray-400">CR</th>
                        <th className="text-center py-2 px-1 text-gray-400">VB</th>
                        <th className="text-center py-2 px-1 text-gray-400">LM</th>
                        <th className="text-center py-2 px-1 text-gray-400">LLé</th>
                        <th className="text-center py-2 px-1 text-gray-400">LLo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-2 text-white font-bold">Croiseur</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center text-primary">6</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center text-green-400 font-bold">10</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-2 text-white font-bold">Bombardier</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center text-green-400 font-bold">20</td>
                        <td className="py-2 px-1 text-center text-green-400 font-bold">20</td>
                        <td className="py-2 px-1 text-center text-primary">10</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-2 text-white font-bold">Destructeur</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center text-primary">10</td>
                        <td className="py-2 px-1 text-center">-</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-2 text-white font-bold">Traqueur</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center text-primary">3</td>
                        <td className="py-2 px-1 text-center text-primary">3</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center text-primary">4</td>
                        <td className="py-2 px-1 text-center text-primary">4</td>
                        <td className="py-2 px-1 text-center text-primary">7</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-2 text-white font-bold">Faucheur</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center text-primary">7</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <td className="py-2 px-2 text-white font-bold">Éclaireur</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center text-primary">5</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center text-primary">3</td>
                        <td className="py-2 px-1 text-center text-primary">2</td>
                        <td className="py-2 px-1 text-center text-primary">3</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                        <td className="py-2 px-1 text-center">-</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 text-yellow-400 font-bold">Étoile Mort</td>
                        <td className="py-2 px-1 text-center text-yellow-400">1250</td>
                        <td className="py-2 px-1 text-center text-yellow-400">1250</td>
                        <td className="py-2 px-1 text-center text-yellow-400">250</td>
                        <td className="py-2 px-1 text-center text-yellow-400">250</td>
                        <td className="py-2 px-1 text-center text-yellow-400">200</td>
                        <td className="py-2 px-1 text-center text-yellow-400">100</td>
                        <td className="py-2 px-1 text-center text-yellow-400">33</td>
                        <td className="py-2 px-1 text-center text-yellow-400">30</td>
                        <td className="py-2 px-1 text-center text-yellow-400">200</td>
                        <td className="py-2 px-1 text-center text-yellow-400">200</td>
                        <td className="py-2 px-1 text-center text-yellow-400">100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-500 text-xs mt-3">
                  PT=Petit Transporteur, GT=Grand Transporteur, CLé=Chasseur Léger, CLo=Chasseur Lourd, CR=Croiseur, VB=Vaisseau Bataille, LM=Lance-Missiles, LLé=Laser Léger, LLo=Laser Lourd
                </p>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-primary mb-4">Points clés</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>RF = X signifie <strong className="text-white">X tirs en moyenne</strong> contre cette cible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Probabilité de continuer : <strong className="text-white">(X-1)/X</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Les flottes mixtes <strong className="text-red-400">réduisent drastiquement</strong> l'efficacité du RF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Le RF multiplie les jets d'explosion, rendant les tirs encore plus mortels</span>
                  </li>
                </ul>
              </div>

              <RelatedGuides currentGuide="rapid-fire-formules" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

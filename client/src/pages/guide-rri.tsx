import { motion } from "framer-motion";
import { Network, Zap, Calculator } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const optimisationData = [
  { rri: 0, planetes: [10, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], cumul: 10, metal: "204 600", cristal: "409 200", deut: "204 600", gain: "-" },
  { rri: 1, planetes: [11, 10, "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"], cumul: 21, metal: "854 000", cristal: "1 628 000", deut: "774 000", gain: "52,38%" },
  { rri: 2, planetes: [12, 11, 10, "-", "-", "-", "-", "-", "-", "-", "-", "-"], cumul: 33, metal: "2 153 000", cristal: "4 066 000", deut: "1 913 000", gain: "36,36%" },
  { rri: 3, planetes: [12, 12, 12, 11, "-", "-", "-", "-", "-", "-", "-", "-"], cumul: 47, metal: "4 546 400", cristal: "8 532 800", deut: "3 986 400", gain: "29,79%" },
  { rri: 4, planetes: [13, 13, 13, 12, 11, "-", "-", "-", "-", "-", "-", "-"], cumul: 62, metal: "9 333 400", cristal: "17 466 800", deut: "8 133 400", gain: "24,19%" },
  { rri: 5, planetes: [14, 14, 13, 13, 13, 13, "-", "-", "-", "-", "-", "-"], cumul: 80, metal: "20 546 000", cristal: "38 612 000", deut: "18 066 000", gain: "22,50%" },
  { rri: 6, planetes: [15, 14, 14, 14, 14, 14, 14, "-", "-", "-", "-", "-"], cumul: 99, metal: "41 333 000", cristal: "76 260 000", deut: "36 293 000", gain: "19,19%" },
  { rri: 7, planetes: [15, 15, 15, 15, 15, 15, 15, 15, "-", "-", "-", "-"], cumul: 120, metal: "82 907 200", cristal: "155 654 400", deut: "72 747 200", gain: "17,50%" },
  { rri: 8, planetes: [16, 16, 16, 16, 16, 16, 15, 15, 15, "-", "-", "-"], cumul: 141, metal: "159 502 200", cristal: "298 604 400", deut: "139 102 200", gain: "14,89%" },
  { rri: 9, planetes: [17, 17, 17, 17, 17, 16, 16, 16, 16, "-", "-", "-"], cumul: 166, metal: "332 353 200", cristal: "623 826 400", deut: "291 473 200", gain: "15,06%" },
  { rri: 10, planetes: [18, 18, 17, 17, 17, 17, 17, 17, 17, 17, "-", "-"], cumul: 192, metal: "664 948 200", cristal: "1 248 056 400", deut: "583 108 200", gain: "14,54%" },
  { rri: 11, planetes: [19, 19, 18, 18, 18, 18, 18, 18, 18, 18, 18, "-"], cumul: 220, metal: "1 330 138 400", cristal: "2 496 516 800", deut: "1 166 378 400", gain: "12,73%" },
];

export default function GuideRRI() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                <Network className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Réseau de Recherche Intergalactique
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Optimisez vos laboratoires pour accélérer vos recherches
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Principe du RRI</h2>
                <p className="text-gray-300 mb-4">
                  Le <strong className="text-primary">Réseau de Recherche Intergalactique (RRI)</strong> permet de combiner 
                  les niveaux de laboratoire de plusieurs planètes pour accélérer vos recherches.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Comment ça marche ?</h3>
                    <p className="text-gray-400 text-sm">
                      Chaque niveau de RRI ajoute un laboratoire supplémentaire au calcul. 
                      RRI 5 = votre labo principal + 5 autres labos les plus hauts.
                    </p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Gain de temps</h3>
                    <p className="text-gray-400 text-sm">
                      Plus vous avez de labos connectés, plus vos recherches sont rapides. 
                      C'est un investissement rentable sur le long terme.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-bold text-white">Tableau d'optimisation</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Ce tableau montre le niveau optimal de laboratoire par planète en fonction de votre niveau de RRI.
                  <strong className="text-primary"> Les niveaux indiqués sont les niveaux minimum recommandés</strong> pour chaque planète.
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-3 px-2 text-purple-400 font-bold">RRI</th>
                        <th className="text-center py-3 px-1 text-gray-400" colSpan={12}>Niveau Labo par planète</th>
                        <th className="text-center py-3 px-2 text-gray-400">Cumul</th>
                        <th className="text-center py-3 px-2 text-green-400">Gain temps</th>
                      </tr>
                      <tr className="border-b border-[#2E384D]/50">
                        <th className="py-2 px-2"></th>
                        {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => (
                          <th key={n} className="text-center py-2 px-1 text-gray-500 text-xs">{n}</th>
                        ))}
                        <th className="py-2 px-2"></th>
                        <th className="py-2 px-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {optimisationData.map((row, idx) => (
                        <tr key={idx} className={`border-b border-[#2E384D]/30 ${idx % 2 === 0 ? 'bg-[#151924]/50' : ''}`}>
                          <td className="py-2 px-2 text-purple-400 font-bold">{row.rri}</td>
                          {row.planetes.map((p, i) => (
                            <td key={i} className={`text-center py-2 px-1 ${p === "-" ? 'text-gray-600' : 'text-white'}`}>
                              {p}
                            </td>
                          ))}
                          <td className="text-center py-2 px-2 text-amber-400 font-bold">{row.cumul}</td>
                          <td className="text-center py-2 px-2 text-green-400 font-bold">{row.gain}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary text-sm">
                    <strong>Lecture du tableau :</strong> À RRI 5, vous devez avoir un labo niveau 14 sur votre planète principale, 
                    un autre à 14, puis quatre à 13. Le cumul total est de 80 niveaux de labo, pour un gain de temps de 22,50%.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Coût total (Labo + RRI)</h2>
                <p className="text-gray-300 mb-4">
                  Voici les coûts cumulés en ressources pour atteindre chaque niveau de RRI de manière optimale :
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-3 px-3 text-purple-400">RRI</th>
                        <th className="text-right py-3 px-3 text-gray-400">Métal</th>
                        <th className="text-right py-3 px-3 text-cyan-400">Cristal</th>
                        <th className="text-right py-3 px-3 text-green-400">Deutérium</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optimisationData.slice(0, 8).map((row, idx) => (
                        <tr key={idx} className={`border-b border-[#2E384D]/30 ${idx % 2 === 0 ? 'bg-[#151924]/50' : ''}`}>
                          <td className="py-2 px-3 text-purple-400 font-bold">{row.rri}</td>
                          <td className="text-right py-2 px-3 text-gray-300">{row.metal}</td>
                          <td className="text-right py-2 px-3 text-cyan-300">{row.cristal}</td>
                          <td className="text-right py-2 px-3 text-green-300">{row.deut}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <Link href="/guide/reduction-fdv">
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-6 hover:bg-purple-900/30 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="w-6 h-6 text-purple-400" />
                      <div>
                        <h2 className="font-display text-xl font-bold text-purple-400">Réduction de Temps FDV</h2>
                        <p className="text-gray-400 text-sm">Cap des -99%, labo FDV vs technologies FDV</p>
                      </div>
                    </div>
                    <span className="text-purple-400 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-amber-400">Conseils d'optimisation</h2>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <span><strong className="text-white">Montez le RRI progressivement</strong> - Chaque niveau de RRI demande d'avoir plus de planètes avec des labos élevés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <span><strong className="text-white">Priorisez RRI 5-7</strong> - C'est le meilleur rapport coût/gain de temps pour la plupart des joueurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <span><strong className="text-white">Équilibrez vos labos</strong> - Pas besoin d'avoir un labo 20 sur une planète si les autres sont à 10</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">4.</span>
                    <span><strong className="text-white">Les gains diminuent</strong> - Au-delà de RRI 8, le gain de temps marginal devient faible</span>
                  </li>
                </ul>
              </div>

              <RelatedGuides currentGuide="recherches" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

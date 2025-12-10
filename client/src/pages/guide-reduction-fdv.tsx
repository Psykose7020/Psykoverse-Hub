import { motion } from "framer-motion";
import { Zap, Clock, FlaskConical, AlertTriangle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideReductionFDV() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Réduction de Temps FDV
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comprendre les mécaniques de réduction de temps avec les Formes de Vie
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FlaskConical className="w-6 h-6 text-purple-400" />
                  <h2 className="font-display text-xl font-bold text-white">Le Cap des -99%</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Une mécanique essentielle mais non documentée officiellement :
                </p>
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                  <p className="text-purple-400 font-bold text-lg mb-2">
                    La réduction de temps sur les recherches FDV est limitée à -99%
                  </p>
                  <p className="text-gray-300">
                    Comme pour les recherches classiques, on ne peut jamais descendre en dessous de 
                    <strong className="text-white"> 1% du temps de base</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Distinction importante</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">Labo FDV</h3>
                    <p className="text-gray-300 text-sm">
                      Le bonus du <strong className="text-white">Laboratoire FDV</strong> ne s'applique 
                      <strong className="text-red-400"> qu'aux recherches FDV</strong>, pas aux technologies classiques.
                    </p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Technologies FDV</h3>
                    <p className="text-gray-300 text-sm">
                      Une fois recherchées, les <strong className="text-white">technologies FDV</strong> peuvent 
                      s'appliquer aux <strong className="text-green-400">recherches classiques</strong>.
                    </p>
                  </div>
                </div>
                <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary">
                    <strong>Conclusion :</strong> C'est pourquoi atteindre le cap de -99% sur les techs FDV est intéressant : 
                    ces bonus aident ensuite vos recherches normales !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-cyan-400" />
                  <h2 className="font-display text-xl font-bold text-white">Comment se calcule la réduction ?</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Le calcul se fait en <strong className="text-white">additionnant</strong> les différentes sources de réduction :
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-[#151924] rounded-lg p-3">
                    <span className="text-purple-400 font-bold text-xl">+</span>
                    <span className="text-gray-300">% de réduction apporté par le <strong className="text-purple-400">Laboratoire FDV</strong></span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#151924] rounded-lg p-3">
                    <span className="text-purple-400 font-bold text-xl">+</span>
                    <span className="text-gray-300">% de réduction apporté par les <strong className="text-purple-400">Technologies Labo FDV</strong></span>
                  </div>
                  <div className="flex items-center gap-3 bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                    <span className="text-red-400 font-bold text-xl">=</span>
                    <span className="text-gray-300">Maximum <strong className="text-red-400">-99%</strong> (cap)</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Exemple concret</h2>
                <div className="bg-[#151924] rounded-lg p-4 mb-4">
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      <span className="text-purple-400">Mes technos labo FDV :</span> 
                      <strong className="text-white"> -60%</strong>
                    </p>
                    <p className="text-gray-300">
                      <span className="text-purple-400">Mon labo FDV :</span> 
                      <strong className="text-white"> -50%</strong>
                    </p>
                    <div className="border-t border-[#2E384D] pt-2 mt-2">
                      <p className="text-gray-300">
                        <span className="text-amber-400">Total théorique :</span> 
                        <strong className="text-white"> -110%</strong>
                      </p>
                      <p className="text-gray-300">
                        <span className="text-green-400">Total réel (cap) :</span> 
                        <strong className="text-green-400"> -99%</strong>
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Dans cet exemple, le labo FDV au-delà de <strong className="text-white">39%</strong> ne sert à rien 
                  puisque le cap est déjà atteint avec les technos (-60%) + labo (-39%) = -99%.
                </p>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-red-400 mb-4">À retenir</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong className="text-white">Inutile d'over-up le labo FDV</strong> si vos technos vous approchent déjà du cap de -99%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong className="text-white">Calculez votre total</strong> avant d'investir dans le labo FDV</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-400 font-bold">•</span>
                    <span><strong className="text-white">Priorité aux techs FDV</strong> car elles bénéficient aussi aux recherches classiques</span>
                  </li>
                </ul>
              </div>

              <RelatedGuides currentGuide="fdv" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

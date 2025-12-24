import { useState } from "react";
import { motion } from "framer-motion";
import { Factory, Zap, Rocket, Clock, ArrowDown } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const taux2_1_5_1 = [
  { step: "Robot 1", type: "robot" },
  { step: "Robot 2", type: "robot" },
  { step: "Robot 3", type: "robot" },
  { step: "Robot 4", type: "robot" },
  { step: "Robot 5", type: "robot" },
  { step: "Robot 6", type: "robot" },
  { step: "Robot 7", type: "robot" },
  { step: "Robot 8", type: "robot" },
  { step: "Robot 9", type: "robot" },
  { step: "Robot 10", type: "robot" },
  { step: "Robot 11", type: "robot" },
  { step: "Nanite 1", type: "nanite" },
  { step: "Robot 12", type: "robot" },
  { step: "Nanite 2", type: "nanite" },
  { step: "Robot 13", type: "robot" },
  { step: "Nanite 3", type: "nanite" },
  { step: "Robot 14", type: "robot" },
  { step: "Nanite 4", type: "nanite" },
  { step: "Nanite 5", type: "nanite" },
  { step: "Robot 16", type: "robot" },
  { step: "Nanite 6", type: "nanite" },
  { step: "Robot 17", type: "robot" },
  { step: "Nanite 7", type: "nanite" },
  { step: "Nanite 8", type: "nanite" },
  { step: "Robot 18", type: "robot" },
  { step: "Nanite 9", type: "nanite" },
  { step: "Robot 19", type: "robot" },
  { step: "Nanite 10", type: "nanite" },
  { step: "Robot 20", type: "robot" },
  { step: "Nanite 11", type: "nanite" },
  { step: "Robot 21", type: "robot" },
  { step: "Nanite 12", type: "nanite" },
  { step: "Robot 22", type: "robot" },
  { step: "Nanite 13", type: "nanite" },
  { step: "Nanite 14", type: "nanite" },
  { step: "Robot 23", type: "robot" },
  { step: "Robot 24", type: "robot" },
  { step: "Nanite 15", type: "nanite" },
  { step: "Robot 25", type: "robot" },
  { step: "Nanite 16", type: "nanite" },
  { step: "Robot 26", type: "robot" },
];

const taux3_2_1 = [
  { step: "Robot 1", type: "robot" },
  { step: "Robot 2", type: "robot" },
  { step: "Robot 3", type: "robot" },
  { step: "Robot 4", type: "robot" },
  { step: "Robot 5", type: "robot" },
  { step: "Robot 6", type: "robot" },
  { step: "Robot 7", type: "robot" },
  { step: "Robot 8", type: "robot" },
  { step: "Robot 9", type: "robot" },
  { step: "Robot 10", type: "robot" },
  { step: "Nanite 1", type: "nanite" },
  { step: "Robot 11", type: "robot" },
  { step: "Nanite 2", type: "nanite" },
  { step: "Robot 12", type: "robot" },
  { step: "Nanite 3", type: "nanite" },
  { step: "Robot 13", type: "robot" },
  { step: "Nanite 4", type: "nanite" },
  { step: "Nanite 5", type: "nanite" },
  { step: "Nanite 6", type: "nanite" },
  { step: "Nanite 7", type: "nanite" },
  { step: "Robot 16", type: "robot" },
  { step: "Nanite 8", type: "nanite" },
  { step: "Robot 17", type: "robot" },
  { step: "Nanite 9", type: "nanite" },
  { step: "Robot 18", type: "robot" },
  { step: "Nanite 10", type: "nanite" },
  { step: "Robot 19", type: "robot" },
  { step: "Robot 20", type: "robot" },
  { step: "Nanite 11", type: "nanite" },
  { step: "Robot 21", type: "robot" },
  { step: "Nanite 12", type: "nanite" },
  { step: "Robot 22", type: "robot" },
  { step: "Nanite 13", type: "nanite" },
  { step: "Nanite 14", type: "nanite" },
  { step: "Robot 23", type: "robot" },
  { step: "Nanite 15", type: "nanite" },
  { step: "Robot 24", type: "robot" },
  { step: "Robot 25", type: "robot" },
  { step: "Nanite 16", type: "nanite" },
  { step: "Robot 26", type: "robot" },
];

const getStepColor = (type: string) => {
  switch (type) {
    case "robot":
      return "bg-orange-500/20 text-orange-300 border-orange-500/40";
    case "nanite":
      return "bg-green-500/20 text-green-300 border-green-500/40";
    default:
      return "bg-gray-500/20 text-gray-300 border-gray-500/40";
  }
};

const splitIntoColumns = (arr: typeof taux2_1_5_1, cols: number) => {
  const perColumn = Math.ceil(arr.length / cols);
  const result = [];
  for (let i = 0; i < cols; i++) {
    result.push(arr.slice(i * perColumn, (i + 1) * perColumn));
  }
  return result;
};

export default function GuideOrdreConstruction() {
  const [selectedRate, setSelectedRate] = useState<"2/1.5/1" | "3/2/1">("2/1.5/1");
  
  const data = selectedRate === "2/1.5/1" ? taux2_1_5_1 : taux3_2_1;
  const columns = splitIntoColumns(data, 2);

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
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                <Factory className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ordre de Construction Optimal
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Usine de Robots et Nanites : l'ordre idéal pour optimiser vos temps de construction
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Principe de base</h2>
                </div>
                
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                  <p className="text-primary font-medium">
                    L'objectif est de minimiser le temps total passé à construire l'Usine de Robots et l'Usine de Nanites, 
                    tout en maximisant leur effet sur la réduction des temps de construction.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4 text-center">
                    <Factory className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <h3 className="font-bold text-orange-300 mb-1">Usine de Robots</h3>
                    <p className="text-gray-400 text-sm">Réduction linéaire des temps</p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 text-center">
                    <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h3 className="font-bold text-green-300 mb-1">Usine de Nanites</h3>
                    <p className="text-gray-400 text-sm">Division par 2 par niveau</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    <h2 className="font-display text-xl font-bold text-white">Développement idéal</h2>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedRate("2/1.5/1")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedRate === "2/1.5/1"
                          ? "bg-primary text-white"
                          : "bg-[#151924] text-gray-400 hover:text-white"
                      }`}
                    >
                      Taux 2/1.5/1
                    </button>
                    <button
                      onClick={() => setSelectedRate("3/2/1")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedRate === "3/2/1"
                          ? "bg-primary text-white"
                          : "bg-[#151924] text-gray-400 hover:text-white"
                      }`}
                    >
                      Taux 3/2/1
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">
                  Suivez cet ordre pour un développement optimal selon le taux de votre univers. 
                  Lisez de haut en bas dans chaque colonne.
                </p>

                <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                  <ArrowDown className="w-4 h-4" />
                  <span>Colonne gauche d'abord, puis colonne droite</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {columns.map((col, colIndex) => (
                    <div key={colIndex} className="space-y-1">
                      {col.map((item, index) => (
                        <div 
                          key={`col-${colIndex}-${index}`}
                          className={`px-3 py-2 rounded border text-sm font-medium ${getStepColor(item.type)}`}
                        >
                          {item.step}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-orange-500/40 border border-orange-500/60"></div>
                    <span className="text-gray-400 text-sm">Usine de Robots</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-500/40 border border-green-500/60"></div>
                    <span className="text-gray-400 text-sm">Usine de Nanites</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h3 className="font-bold text-amber-300 mb-3">Points importants</h3>
                <ul className="text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>La Nanite niveau 1 requiert l'Usine de Robots niveau 10 et la Technologie Informatique niveau 10</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Chaque niveau de Nanite divise par 2 le temps de construction (effet exponentiel)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>L'Usine de Robots a un effet linéaire : chaque niveau réduit le temps d'un pourcentage fixe</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Ces ordres sont optimaux pour minimiser le temps total de développement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-white">Taux 2/1.5/1</strong> : Univers avec économie standard</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span><strong className="text-white">Taux 3/2/1</strong> : Univers avec économie accélérée</span>
                  </li>
                </ul>
              </div>
            </div>

            <RelatedGuides currentGuide="ordre-construction" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

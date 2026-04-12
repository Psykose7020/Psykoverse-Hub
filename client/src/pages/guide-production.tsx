import { motion } from "framer-motion";
import { Factory, Zap, Package, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";
import { dbImages } from "@/data/database-images";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const positionBonus = [
  { pos: "1", bonus: "+40% Cristal" },
  { pos: "2", bonus: "+30% Cristal" },
  { pos: "3", bonus: "+20% Cristal" },
  { pos: "6 et 10", bonus: "+17% Métal" },
  { pos: "7 et 9", bonus: "+23% Métal" },
  { pos: "8", bonus: "+35% Métal" }
];

export default function GuideProduction() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <Factory className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Production & Énergie
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comprendre vos mines, le stockage et la gestion de l'énergie
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide pour débutants • Source : Communauté OGame
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Factory className="w-6 h-6 text-green-400" />
                  Les Mines
                </h2>
                <p className="text-gray-300 mb-4">
                  Votre principal revenu vient de vos mines. Chaque planète possède 3 types : 
                  <span className="text-gray-400 font-bold"> Métal</span>, 
                  <span className="text-blue-400 font-bold"> Cristal</span> et 
                  <span className="text-cyan-400 font-bold"> Deutérium</span>.
                </p>
                <p className="text-gray-300 mb-6">
                  Plus une mine est haute, plus elle produit, mais plus elle coûte cher et consomme d'énergie.
                </p>
                <div className="bg-[#0B0E14] rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#111827]">
                      <img src={dbImages.batiments.mineMetal} alt="Mine de métal" className="w-full h-44 object-cover" />
                      <div className="p-3 text-center text-sm text-gray-300">Mine de métal</div>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#111827]">
                      <img src={dbImages.batiments.mineCristal} alt="Mine de cristal" className="w-full h-44 object-cover" />
                      <div className="p-3 text-center text-sm text-gray-300">Mine de cristal</div>
                    </div>
                    <div className="rounded-xl overflow-hidden border border-gray-800 bg-[#111827]">
                      <img src={dbImages.batiments.mineDeuterium} alt="Synthétiseur de deutérium" className="w-full h-44 object-cover" />
                      <div className="p-3 text-center text-sm text-gray-300">Synthétiseur de deutérium</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Coût et consommation</h2>
                <p className="text-gray-300 mb-4">
                  Pour voir le coût d'une mine et sa consommation en énergie, cliquez sur le bâtiment. 
                  Survolez une ressource pour voir le montant exact.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0B0E14] rounded-lg p-3">
                    <img src={dbImages.batiments.laboratoireRecherche} alt="Recherche et coût" className="rounded w-full h-48 object-cover" />
                    <p className="text-xs text-gray-500 mt-2 text-center">Laboratoire de recherche et progression</p>
                  </div>
                  <div className="bg-[#0B0E14] rounded-lg p-3">
                    <img src={dbImages.batiments.chantierSpatial} alt="Infrastructure" className="rounded w-full h-48 object-cover" />
                    <p className="text-xs text-gray-500 mt-2 text-center">Infrastructure et montée en puissance</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Bonus de position</h2>
                <p className="text-gray-300 mb-4">
                  La production dépend de la position de votre planète dans le système solaire !
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {positionBonus.map((p, index) => (
                    <div key={index} className="bg-[#151924] rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-white mb-1">Position {p.pos}</div>
                      <div className={`text-sm font-bold ${p.bonus.includes('Cristal') ? 'text-blue-400' : 'text-gray-400'}`}>
                        {p.bonus}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-cyan-900/20 border border-cyan-700/30 rounded-lg">
                  <p className="text-sm text-cyan-300">
                    <strong>Deutérium :</strong> La production est plus élevée sur les planètes éloignées du soleil (positions 13-15).
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  L'Énergie
                </h2>
                <p className="text-gray-300 mb-4">
                  Chaque mine consomme de l'énergie. Si votre énergie est <span className="text-red-400 font-bold">négative</span>, 
                  votre production sera réduite proportionnellement.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <img src={dbImages.batiments.centraleSolaire} alt="Centrale solaire" className="w-full h-28 object-cover rounded-lg mb-3" />
                    <h3 className="font-bold text-white mb-2">Centrale solaire</h3>
                    <p className="text-gray-400 text-sm">Source principale d'énergie. Facile à construire mais prend de la place.</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <img src={dbImages.batiments.centraleFusion} alt="Centrale de fusion" className="w-full h-28 object-cover rounded-lg mb-3" />
                    <h3 className="font-bold text-white mb-2">Centrale de fusion</h3>
                    <p className="text-gray-400 text-sm">Consomme du deutérium mais produit plus d'énergie par niveau.</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <img src={dbImages.ressources.deuterium} alt="Ressource énergétique" className="w-full h-28 object-contain rounded-lg mb-3 bg-[#0B0E14]" />
                    <h3 className="font-bold text-white mb-2">Satellites solaires</h3>
                    <p className="text-gray-400 text-sm">Produisent de l'énergie sans cases, mais vulnérables aux attaques.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Package className="w-6 h-6 text-amber-400" />
                  Le Stockage
                </h2>
                <p className="text-gray-300 mb-4">
                  Vos hangars ont une capacité limitée. Si vos ressources dépassent cette limite, 
                  la production s'arrête (overflow).
                </p>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <img src={dbImages.batiments.hangarMetal} alt="Hangar métal" className="w-full h-28 object-cover rounded-lg" />
                    <img src={dbImages.batiments.hangarCristal} alt="Hangar cristal" className="w-full h-28 object-cover rounded-lg" />
                    <img src={dbImages.batiments.hangarDeuterium} alt="Réservoir de deutérium" className="w-full h-28 object-cover rounded-lg" />
                  </div>
                  <p className="text-sm text-amber-300">
                    <strong>Conseil :</strong> Montez vos hangars régulièrement, surtout avant une longue absence. 
                    Vous ne voulez pas perdre de production !
                  </p>
                </div>
              </div>

              <RelatedGuides currentGuide="production" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

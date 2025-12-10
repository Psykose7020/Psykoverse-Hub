import { motion } from "framer-motion";
import { Moon, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideLune() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-gray-500 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-gray-500/20">
                <Moon className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Champs de Ruine & Lune
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comprendre les CDR et obtenir une lune
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le Champ de Ruine (CDR)</h2>
                <p className="text-gray-300 mb-4">
                  Après un combat, une partie des vaisseaux détruits laisse des débris sous forme de 
                  Champ de Ruine (CDR). Ces ressources peuvent être recyclées avec des Recycleurs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Taux de CDR</h3>
                    <p className="text-gray-400 text-sm">Varie selon les univers (30% à 80% des vaisseaux détruits)</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Recyclage</h3>
                    <p className="text-gray-400 text-sm">Envoyez des Recycleurs en mission Recycler</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Création d'une Lune</h2>
                <p className="text-gray-300 mb-4">
                  Une lune peut apparaître après un combat si le CDR est suffisamment important. 
                  La probabilité dépend de la taille du champ de débris.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-primary">
                    <strong>Formule :</strong> 1% de chance par tranche de 100 000 unités de débris (max 20%)
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-white">100k</div>
                    <div className="text-primary text-sm">1%</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-white">1M</div>
                    <div className="text-primary text-sm">10%</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-xl font-bold text-white">2M+</div>
                    <div className="text-primary text-sm">20% max</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Avantages d'une Lune</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Phalange</h3>
                    <p className="text-gray-300 text-sm">Scanne les mouvements de flotte depuis/vers les planètes ennemies</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-blue-400 mb-2">Porte de Saut</h3>
                    <p className="text-gray-300 text-sm">Téléporte instantanément votre flotte entre vos lunes</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-purple-400 mb-2">Fleetsave sécurisé</h3>
                    <p className="text-gray-300 text-sm">Les départs depuis une lune sont invisibles à la phalange</p>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-amber-400 mb-2">Stockage</h3>
                    <p className="text-gray-300 text-sm">Base séparée pour vos ressources et flotte</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Destruction de Lune (MD)</h2>
                <p className="text-gray-300 mb-4">
                  Une lune peut être détruite en envoyant des Étoiles de la Mort (EDLM) en mission "Destruction".
                </p>
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <p className="text-sm text-red-300">
                    <strong>Attention :</strong> La flotte attaquante risque aussi d'être détruite ! 
                    La probabilité dépend de la taille de la lune et du nombre d'EDLM.
                  </p>
                </div>
              </div>

              <RelatedGuides currentGuide="lune" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

import { motion } from "framer-motion";
import { Compass, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const resultats = [
  { type: "Ressources", desc: "Métal, Cristal ou Deutérium", color: "text-green-400" },
  { type: "Vaisseaux", desc: "Flottes abandonnées récupérables", color: "text-blue-400" },
  { type: "Matière Noire", desc: "Antimatière gratuite", color: "text-purple-400" },
  { type: "Items", desc: "Objets bonus à activer", color: "text-amber-400" },
  { type: "Pirates", desc: "Combat contre des PNJ", color: "text-red-400" },
  { type: "Aliens", desc: "Combat difficile", color: "text-red-600" },
  { type: "Trou noir", desc: "Perte de vaisseaux (rare)", color: "text-gray-400" },
  { type: "Rien", desc: "Expédition sans résultat", color: "text-gray-600" }
];

export default function GuideExpeditions() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                <Compass className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Les Expéditions
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Explorez l'inconnu et récupérez des ressources
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Principe</h2>
                <p className="text-gray-300 mb-4">
                  Les expéditions permettent d'envoyer une flotte explorer l'espace profond (position 16 d'un système). 
                  Vous pouvez y trouver des ressources, des vaisseaux, de l'antimatière, ou rencontrer des dangers.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Nombre de slots :</strong> Dépend de votre niveau d'Astrophysique. 
                    Classe Explorateur : +2 slots bonus.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Résultats possibles</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {resultats.map((r, i) => (
                    <div key={i} className="bg-[#151924] rounded-lg p-3">
                      <div className={`font-bold text-sm ${r.color}`}>{r.type}</div>
                      <div className="text-xs text-gray-500">{r.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Optimiser ses expéditions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Composition recommandée</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Éclaireurs (classe Explorateur)</li>
                      <li>• Grand Transporteurs pour le fret</li>
                      <li>• Vaisseaux de combat contre pirates</li>
                                          </ul>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-blue-400 mb-2">Bonus Explorateur</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Gains × vitesse de l'univers</li>
                      <li>• -50% chances pirates/aliens</li>
                      <li>• CDR visibles en galaxie</li>
                      <li>• Éclaireurs × 2 les gains</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Durée des expéditions</h2>
                <p className="text-gray-300 mb-4">
                  <strong className="text-primary">Gardez toujours la durée à 1h !</strong> Augmenter la durée n'est pas recommandé 
                  car les <strong className="text-white">retards sont impactés par le temps passé en expédition</strong>. 
                  Vous ne voulez pas vous retrouver bloqué à cause d'un retard.
                </p>
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4 mb-4">
                  <h3 className="font-bold text-green-400 mb-2">Durée recommandée : 1h</h3>
                  <p className="text-gray-300 text-sm">
                    C'est la durée optimale. Elle minimise les risques de retard tout en maximisant le nombre d'expéditions par jour.
                  </p>
                </div>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-amber-400 mb-2">Besoin de ralentir ?</h3>
                  <p className="text-gray-300 text-sm">
                    Si vous voulez que vos expéditions reviennent plus tard, <strong className="text-white">diminuez la vitesse de la flotte</strong> 
                    au lieu d'augmenter la durée. Cela n'impacte pas les retards potentiels.
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Conseils</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Lancez toutes vos expéditions en même temps pour les gérer facilement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Utilisez des Grands Transporteurs pour maximiser le fret récupérable</span>
                  </li>
                                  </ul>
              </div>

              <RelatedGuides currentGuide="expeditions" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

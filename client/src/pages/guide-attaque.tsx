import { motion } from "framer-motion";
import { Crosshair, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideAttaque() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
                <Crosshair className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Attaque & Missilage
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Les bases du combat offensif dans OGame
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">L'Attaque</h2>
                <p className="text-gray-300 mb-4">
                  Attaquer consiste à envoyer votre flotte vers une planète ou lune ennemie pour 
                  détruire sa flotte/défense et piller ses ressources.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">1. Espionner</h3>
                    <p className="text-gray-400 text-sm">Vérifiez les ressources, flotte et défenses</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">2. Simuler</h3>
                    <p className="text-gray-400 text-sm">Utilisez un simulateur pour prévoir le combat</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">3. Attaquer</h3>
                    <p className="text-gray-400 text-sm">Envoyez votre flotte avec assez de fret</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le Pillage</h2>
                <p className="text-gray-300 mb-4">
                  Après une victoire, vous pillez une partie des ressources de la cible. 
                  Le pourcentage dépend du statut d'honneur du défenseur.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-white">50%</div>
                    <div className="text-xs text-gray-400">Joueur normal</div>
                  </div>
                  <div className="bg-yellow-900/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">75%</div>
                    <div className="text-xs text-gray-400">Joueur honorable</div>
                  </div>
                  <div className="bg-red-900/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-red-400">100%</div>
                    <div className="text-xs text-gray-400">Bandit</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le Missilage (MIP)</h2>
                <p className="text-gray-300 mb-4">
                  Les Missiles Interplanétaires (MIP) permettent de détruire les défenses ennemies 
                  à distance, sans envoyer de flotte.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Avantages</h3>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Détruit les défenses sans risque</li>
                      <li>• Prépare le terrain pour l'attaque</li>
                      <li>• Portée basée sur la techno impulsion</li>
                    </ul>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Contre-mesure</h3>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Missiles d'Interception (ABM)</li>
                      <li>• 1 ABM détruit 1 MIP</li>
                      <li>• Stockés dans le Silo de Missiles</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Rentabilité (Renta)</h2>
                <p className="text-gray-300 mb-4">
                  Une attaque est "rentable" si les ressources pillées dépassent le coût des vaisseaux perdus.
                </p>
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <p className="text-sm text-green-300">
                    <strong>Formule simple :</strong> Ressources pillées - Coût des pertes = Rentabilité
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Conseils</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Toujours espionner avant d'attaquer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Utilisez un simulateur de combat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Envoyez suffisamment de fret pour tout piller</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400">•</span>
                    <span>Surveillez les retours de flotte possibles (phalange)</span>
                  </li>
                </ul>
              </div>

              <RelatedGuides currentGuide="attaque" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

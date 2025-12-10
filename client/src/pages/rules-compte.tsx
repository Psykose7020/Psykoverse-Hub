import { motion } from "framer-motion";
import { Users, ExternalLink, AlertTriangle, Shield, Check, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function RulesCompte() {
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
            <Link href="/regles">
              <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                ← Retour aux règles
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Comptes & Multicomptes
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Règles de propriété, VPN et gestion des comptes
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Propriété du compte</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Le propriétaire d'un compte est toujours le propriétaire de l'adresse mail associée au <strong className="text-white">compte lobby</strong> lié au compte jeu.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Un compte ne peut changer de propriétaire que tous les <strong className="text-primary">15 jours minimum</strong>.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Un compte <strong className="text-white">ne peut jamais être joué</strong> par plus d'une personne, la seule exception étant le « sitting » de compte.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <X className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">Interdit</h2>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Il est <strong className="text-white">formellement interdit</strong> de partager son compte lobby avec une autre personne.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Il est interdit de communiquer ses identifiants de connexion à un tiers (utilisez le sitting officiel).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">VPN et Proxy</h2>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-300 mb-2">
                        Si vous utilisez un proxy ou un VPN, <strong className="text-white">il est nécessaire d'en justifier l'utilisation</strong> auprès de l'opérateur via le Support OGame.fr.
                      </p>
                      <p className="text-gray-400 text-sm">
                        Si celui-ci ne se justifie pas, son utilisation pourra être proscrite.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Multicomptes</h2>
                <div className="space-y-4">
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-primary font-bold mb-2">Règle fondamentale</p>
                    <p className="text-gray-300">
                      Chaque joueur n'a le droit de posséder qu'<strong className="text-white">un seul compte par univers</strong>.
                    </p>
                  </div>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Même IP (école, cyber-café, famille...)</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Si deux comptes ou plus sont joués depuis le même accès internet :
                    </p>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">1.</span>
                        <span>Il est <strong className="text-white">obligatoire de prévenir les opérateurs</strong> via le Support OGame.fr</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">2.</span>
                        <span><strong className="text-white">Toutes les interactions</strong> entre comptes sous même IP sont interdites</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">3.</span>
                        <span>Vous pouvez être dans la même alliance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">4.</span>
                        <span>Après avoir partagé une IP, il faut attendre <strong className="text-primary">7 jours</strong> pour pouvoir interagir de nouveau</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Interactions interdites sous même IP</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <span className="text-gray-300 text-sm">Attaquer</span>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <span className="text-gray-300 text-sm">Commercer</span>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <span className="text-gray-300 text-sm">Recycler</span>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <span className="text-gray-300 text-sm">ACS ensemble</span>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <span className="text-gray-300 text-sm">Stationner</span>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <span className="text-gray-300 text-sm">Défendre</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Besoin de déclarer une IP partagée ?
                </h3>
                <p className="text-gray-400 mb-4">Contactez le support officiel</p>
                <Button size="lg" asChild>
                  <a href="https://ogame.support.gameforge.com/index.php?fld=fr" target="_blank" rel="noopener noreferrer">
                    Support OGame.fr
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

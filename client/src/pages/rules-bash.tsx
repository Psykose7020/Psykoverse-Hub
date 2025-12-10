import { motion } from "framer-motion";
import { Swords, ExternalLink, AlertTriangle, Check, X, Clock, Target } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function RulesBash() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
                <Swords className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                La Règle du Bash
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Limitation des attaques répétées sur un même joueur
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Définition du Bash</h2>
                <p className="text-gray-300 text-lg">
                  Le bash désigne le fait d'<strong className="text-white">attaquer un même joueur de manière répétée</strong> 
                  dans un court laps de temps. Cette règle protège les joueurs contre le harcèlement.
                </p>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">La limite</h2>
                </div>
                <div className="bg-[#151924] rounded-lg p-6 text-center">
                  <div className="text-5xl font-bold text-primary mb-2">6</div>
                  <p className="text-gray-300">attaques maximum par joueur</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <span className="text-gray-400">sur une période de <strong className="text-white">24 heures</strong></span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Qu'est-ce qui compte comme une attaque ?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">Compte dans le bash</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Mission <strong className="text-white">Attaquer</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Mission <strong className="text-white">Attaque Groupée (ACS)</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Mission <strong className="text-white">Destruction</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>Lignage impactant (avec pertes)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Ne compte pas</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Mission <strong className="text-white">Espionner</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Lignage rappelé avant impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Lignage sans perte pour l'attaquant</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>1 sonde d'espionnage crashée (autorisé)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le Lignage</h2>
                <p className="text-gray-300 mb-4">
                  Le lignage consiste à envoyer des vaisseaux à <strong className="text-white">faible vitesse</strong> en mission hostile 
                  (espionnage, attaque, destruction de lune) pour créer le <strong className="text-red-400">triangle rouge</strong> dans la vue événement de l'ennemi.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                  <p className="text-primary text-sm">
                    <strong>Règle générale :</strong> Le lignage est autorisé à condition que l'envoi soit rappelé avant impact, 
                    peu importe si le ligneur est plus ou moins fort que l'adversaire.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-300">
                        <strong className="text-white">Autorisé :</strong> Si l'envoi est rappelé avant impact
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-300">
                        <strong className="text-white">Autorisé :</strong> Laisser crasher <strong className="text-primary">1 seule et unique sonde d'espionnage</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-300">
                        <strong className="text-white">Autorisé :</strong> Lignage qui impacte mais n'entraîne aucune perte pour l'attaquant
                      </p>
                      <p className="text-gray-500 text-xs mt-1">(sera comptabilisé pour le calcul du bash)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-300">
                        <strong className="text-white">Interdit :</strong> Lignage de <strong>plus d'une</strong> sonde qui se crash
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-gray-300">
                        <strong className="text-white">Interdit :</strong> Lignage avec des vaisseaux qui impactent ET sont détruits
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Exemples de Lignage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Autorisé
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>1 sonde d'espionnage qui se crash</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>1 recycleur qui impacte sans être détruit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Flotte rappelée avant impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Vaisseaux qui impactent mais survivent</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                      <X className="w-4 h-4" />
                      Interdit
                    </h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span>2+ sondes d'espionnage qui se crashent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span>1 recycleur qui impacte ET est détruit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span>Tout vaisseau envoyé qui est détruit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">✗</span>
                        <span>Flotte non rappelée avec pertes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Calcul des 24 heures</h2>
                <p className="text-gray-300 mb-4">
                  Le compteur de 24 heures commence à la <strong className="text-white">première attaque</strong> et se réinitialise 
                  après 24 heures.
                </p>
                <div className="bg-[#151924] rounded-lg p-4">
                  <h3 className="font-bold text-white mb-3">Exemple</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3 p-2 bg-[#1C2230] rounded">
                      <span className="text-gray-500">14:00</span>
                      <span className="text-gray-300">1ère attaque → compteur démarre</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-[#1C2230] rounded">
                      <span className="text-gray-500">15:30</span>
                      <span className="text-gray-300">2ème attaque</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-[#1C2230] rounded">
                      <span className="text-gray-500">20:00</span>
                      <span className="text-gray-300">3ème, 4ème, 5ème, 6ème attaques</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-red-900/30 rounded">
                      <span className="text-gray-500">21:00</span>
                      <span className="text-red-400">7ème attaque = BASH ! (sanctionné)</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-green-900/30 rounded">
                      <span className="text-gray-500">14:01 (+1j)</span>
                      <span className="text-green-400">Compteur reset → vous pouvez réattaquer</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-2">Sanctions</h3>
                    <p className="text-gray-300 mb-2">
                      Le non-respect de la règle du bash entraîne des sanctions progressives :
                    </p>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• 1ère infraction : Avertissement</li>
                      <li>• Récidive : Bannissement temporaire</li>
                      <li>• Récidives multiples : Bannissement permanent</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Exceptions possibles</h2>
                <p className="text-gray-300 mb-4">
                  Certains univers peuvent avoir des règles bash différentes ou désactivées. 
                  Vérifiez toujours les <strong className="text-white">paramètres de l'univers</strong> avant de jouer.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary text-sm">
                    <strong>Conseil :</strong> En cas de doute sur une situation, contactez l'opérateur 
                    <strong> avant</strong> d'attaquer pour éviter une sanction.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Question sur le bash ?
                </h3>
                <p className="text-gray-400 mb-4">Demandez conseil à la communauté</p>
                <Button size="lg" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                    Rejoindre Discord
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

import { motion } from "framer-motion";
import { TrendingUp, ExternalLink, AlertTriangle, Check, X, ArrowUp, ArrowDown, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function RulesPush() {
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
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux règles
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Push, Pull & Mercenariat
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Commerce, partage de butin et services entre joueurs
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ArrowUp className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">Le Push (interdit)</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Aucun compte n'est autorisé à faire des <strong className="text-white">profits injustes</strong> au détriment 
                  de joueurs ayant moins de points.
                </p>
                <div className="space-y-2">
                  <p className="text-gray-400 text-sm">Le « profit injuste » inclut :</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Livraison de ressources sans contrepartie au plus fort</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Manipulation de taux via le marchand/triangulaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Recyclage volontaire de flotte fantôme sur position effacée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-1" />
                      <span>Transactions après avoir converti flotte/défense en ressources non dépensées</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-[#151924] rounded-lg p-4 mt-4">
                  <p className="text-amber-300 text-sm">
                    <strong>Si vous recevez des ressources d'un joueur moins classé sans les avoir demandées :</strong> 
                    vous devez les renvoyer ou les transférer à l'opérateur sous <strong className="text-white">72h</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ArrowDown className="w-6 h-6 text-blue-400" />
                  <h2 className="font-display text-xl font-bold text-white">Le Pull</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Le pull est l'inverse du push : livraison de ressources d'un joueur <strong className="text-white">plus fort</strong> 
                  vers un joueur <strong className="text-white">plus faible</strong> sans contrepartie.
                </p>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-4">
                  <p className="text-amber-300 text-sm">
                    <strong>Règle :</strong> Les ressources envoyées ne doivent pas permettre au receveur de dépasser le donneur.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Restrictions sur les nouveaux univers</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>Ouverture → 3ème lundi : Pull <strong className="text-white">totalement interdit</strong></span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400">•</span>
                        <span>4ème semaine → 365 jours : Max <strong className="text-primary">500M ressources/semaine</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Commerce</h2>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                  <p className="text-primary text-sm">
                    Les transactions commerciales doivent être effectuées dans un délai maximum de <strong>72 heures</strong>.
                  </p>
                </div>
                <div className="bg-[#151924] rounded-lg p-4 mb-4">
                  <h3 className="font-bold text-white mb-3">Taux de change officiels</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Métal</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">1.3 à 2.1 Métal</span>
                          <span className="text-white">= 1 Cristal</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">2 à 3 Métal</span>
                          <span className="text-white">= 1 Deutérium</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-2">Cristal</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">1.2 à 2 Cristal</span>
                        <span className="text-white">= 1 Deutérium</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <p className="text-red-300 text-sm">
                    <strong>Interdit :</strong> Le commerce de Nourriture contre Métal/Cristal/Deutérium. 
                    Le don de Nourriture est cependant autorisé sans limite.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                  <h2 className="font-display text-xl font-bold text-white">Partage AG/DG</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Le partage de rentabilité lors d'une Attaque Groupée ou Défense Groupée est encadré :
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      <strong className="text-white">Libre entre participants</strong> à partir du moment où chacun est remboursé de ses pertes
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="text-amber-400 font-bold">20%</span>
                    <p className="text-gray-300">
                      Maximum pour participants faibles sans flotte significative (phalange, surveillance passive, sondage...)
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="text-amber-400 font-bold">50%</span>
                    <p className="text-gray-300">
                      Maximum pour autres participants faibles (flotte significative, destruction de lune, mippage...)
                    </p>
                  </div>
                </div>

                <div className="bg-[#151924] rounded-lg p-4 mt-4">
                  <h3 className="font-bold text-white mb-3">Flottes significatives (éligibles aux 50%)</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Le combat principal</li>
                    <li>• Les pillages significatifs (pas 1M sur plusieurs milliards)</li>
                    <li>• Double AG pour dissuader une DG</li>
                    <li>• Recyclage significatif</li>
                    <li>• Destruction de lune</li>
                  </ul>
                </div>

                <div className="bg-[#151924] rounded-lg p-4 mt-4">
                  <h3 className="font-bold text-white mb-3">Exclus des 20% (participation passive)</h3>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• Phalange</li>
                    <li>• Surveillance passive de cible</li>
                    <li>• Sondage avant impact</li>
                    <li>• Décalage d'une AG</li>
                    <li>• Cible trouvée lors d'un sondage</li>
                  </ul>
                </div>

                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mt-4">
                  <h3 className="font-bold text-white mb-3">Exemple concret</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Rentabilité de <strong className="text-primary">1.000.000 métal</strong> avec :
                  </p>
                  <ul className="space-y-1 text-gray-300 text-sm mb-3">
                    <li>• 5 joueurs dans le combat (flotte significative) après destruction de lune</li>
                    <li>• 1 joueur (6ème) à l'origine de la destruction de lune</li>
                  </ul>
                  <div className="bg-red-900/30 border border-red-700/30 rounded p-3">
                    <p className="text-red-300 text-sm">
                      <strong>Interdit :</strong> Donner 500.000 métal (50%) au 6ème joueur.
                      Cela laisserait seulement 100.000 à chaque combattant principal, 
                      donc <strong>moins</strong> que le 6ème joueur.
                    </p>
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    Les participants principaux doivent toujours avoir une part supérieure aux participants éligibles aux 20% ou 50%.
                  </p>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-4">
                  <p className="text-primary text-sm">
                    <strong>Obligatoire :</strong> Le partage doit faire l'objet d'un ticket au support pour validation. 
                    Incluez les clés API du combat, des combats annexes (pillages, recyclages) et une explication du rôle de chacun.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Mercenariat</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Un contrat ne peut s'établir qu'avec les <strong className="text-white">propriétaires des comptes</strong> (pas en sitting)
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Les contrats doivent être <strong className="text-white">validés par l'Opérateur</strong> avant transaction
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      La prime doit être <strong className="text-white">en lien avec le service rendu</strong>
                    </p>
                  </div>
                </div>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mt-4">
                  <p className="text-amber-300 text-sm">
                    <strong>Attention :</strong> Tout service d'un joueur faible pour le compte d'un joueur fort 
                    (lunage, mippage, moonbreak) engendrera le remboursement complet du service.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Crash de flotte</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-amber-900/20 border border-amber-700/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Doit <strong className="text-white">obligatoirement faire l'objet d'un ticket</strong> au Support OGame.fr
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Le(s) joueur(s) plus fort(s) pourra(ont) se rembourser de ses pertes
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Aucun <strong className="text-white">profit/bénéfice</strong> ne pourra être accepté
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Besoin de valider un commerce ou un partage ?
                </h3>
                <p className="text-gray-400 mb-4">Contactez le support avant la transaction</p>
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

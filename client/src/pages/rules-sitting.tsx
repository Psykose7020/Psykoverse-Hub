import { motion } from "framer-motion";
import { ArrowLeftRight, ExternalLink, AlertTriangle, Check, X, Clock, Gift } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function RulesSitting() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <ArrowLeftRight className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Sitting & Échanges
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Surveillance de compte et transferts légaux
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-green-400" />
                  <h2 className="font-display text-xl font-bold text-white">Qu'est-ce que le Sitting ?</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Le sitting permet à un joueur de <strong className="text-white">surveiller temporairement le compte d'un autre</strong> 
                  pendant son absence (vacances, travail...).
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary text-sm">
                    <strong>Important :</strong> Le sitting doit <strong>obligatoirement</strong> passer par l'outil du Lobby. 
                    Ne communiquez jamais vos identifiants directement !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Conditions du Sitting</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Durée maximum : <strong className="text-primary">48 heures</strong> (le code expire automatiquement)
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Le sitting est terminé dès que le propriétaire se reconnecte
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Un compte ne peut être sitté que s'il ne l'a pas été depuis <strong className="text-primary">7 jours</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Il ne doit pas y avoir d'attaque en cours (mode aller) à la connexion du sitteur
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <X className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">Actions interdites pendant le Sitting</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-red-900/30 rounded-lg">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Mission <strong className="text-white">Attaquer</strong> (y compris groupée)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-900/30 rounded-lg">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Mission <strong className="text-white">Destruction</strong></span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-900/30 rounded-lg">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Mission <strong className="text-white">Stationner</strong> chez un allié</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-900/30 rounded-lg">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Mission <strong className="text-white">Recycler</strong> (sauf ghost)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-900/30 rounded-lg">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Modifier les <strong className="text-white">infos personnelles</strong></span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-red-900/30 rounded-lg">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Retirer le <strong className="text-white">mode vacances</strong></span>
                  </div>
                </div>
                <div className="bg-[#151924] rounded-lg p-4 mt-4">
                  <p className="text-gray-400 text-sm">
                    <strong className="text-white">Note :</strong> Le sitteur ne doit tirer aucun bénéfice du compte sitté. 
                    Il ne peut pas recycler les CDR en position 16 créés par le sitté. 
                    Cette limitation s'applique aussi aux comptes liés (alliés du sitteur).
                  </p>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Check className="w-6 h-6 text-green-400" />
                  <h2 className="font-display text-xl font-bold text-white">Autorisé pendant le Sitting</h2>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Fleetsave / Ghost de la flotte</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Construction de bâtiments, recherches, vaisseaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Recycler vers un CDR (sauf position 16) uniquement pour un ghost</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Expéditions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">•</span>
                    <span>Transports de ressources entre ses propres planètes/lunes</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-6 h-6 text-purple-400" />
                  <h2 className="font-display text-xl font-bold text-white">Échanges de compte</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Il est autorisé d'<strong className="text-white">échanger ou de donner</strong> son compte OGame.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      L'échange doit se faire via le <strong className="text-white">système interne du Lobby</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      L'échange ne se fait qu'avec un autre compte au sein de la <strong className="text-white">même communauté</strong>
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300">
                      Pour plus de sécurité, passez par le <strong className="text-white">Support OGame.fr</strong>
                    </p>
                  </div>
                </div>
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mt-4">
                  <p className="text-red-300 text-sm">
                    <strong>Interdit :</strong> Toute vente ou tentative de vente de compte est strictement interdite !
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-white mb-2">Sanctions</h3>
                    <p className="text-gray-300">
                      En cas d'infraction aux règles du sitting, le <strong className="text-white">sitté</strong>, 
                      le <strong className="text-white">sitteur</strong> et les <strong className="text-white">comptes liés</strong> 
                      seront sanctionnés.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Besoin d'un sitting ou d'un échange ?
                </h3>
                <p className="text-gray-400 mb-4">Passez toujours par le Lobby officiel</p>
                <Button size="lg" asChild>
                  <a href="https://lobby.ogame.gameforge.com/" target="_blank" rel="noopener noreferrer">
                    Lobby OGame
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

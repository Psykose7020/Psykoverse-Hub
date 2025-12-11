import { motion } from "framer-motion";
import { Target, Zap, Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideRaid() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Tips du Bon Raideur
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Les bases pour réussir vos raids
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le cycle du raid efficace</h2>
                <p className="text-gray-300 mb-4">
                  Un bon raid n'est pas un coup de chance. C'est une <strong className="text-primary">séquence précise</strong> d'actions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                  <div className="bg-[#151924] rounded-lg p-3 text-center border-l-2 border-violet-500">
                    <div className="text-violet-400 font-bold text-sm">1. Repérage</div>
                    <div className="text-xs text-gray-500 mt-1">Scanner la galaxie</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center border-l-2 border-blue-500">
                    <div className="text-blue-400 font-bold text-sm">2. Espionnage</div>
                    <div className="text-xs text-gray-500 mt-1">Évaluer le butin</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center border-l-2 border-amber-500">
                    <div className="text-amber-400 font-bold text-sm">3. Analyse</div>
                    <div className="text-xs text-gray-500 mt-1">Calculer rentabilité</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center border-l-2 border-red-500">
                    <div className="text-red-400 font-bold text-sm">4. Frappe</div>
                    <div className="text-xs text-gray-500 mt-1">Envoyer la flotte</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center border-l-2 border-green-500">
                    <div className="text-green-400 font-bold text-sm">5. Extraction</div>
                    <div className="text-xs text-gray-500 mt-1">Récupérer le CDR</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Calculer la rentabilité d'un raid</h2>
                </div>
                
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-4">
                  <h3 className="font-bold text-amber-400 mb-2">Butin ≠ Rentabilité</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    Le <strong className="text-white">butin</strong> c'est ce que vous récupérez. La <strong className="text-white">rentabilité</strong> c'est butin - pertes - consommation deut.
                  </p>
                  <div className="bg-[#151924] rounded-lg p-3 text-sm">
                    <p className="text-gray-400 mb-2">Exemple :</p>
                    <div className="space-y-1 text-gray-300">
                      <p>Butin pillé : <span className="text-green-400">2.000.000</span></p>
                      <p>Pertes flotte : <span className="text-red-400">-800.000</span></p>
                      <p>Consommation deut : <span className="text-red-400">-150.000</span></p>
                      <p className="border-t border-gray-700 pt-1 mt-2">
                        Rentabilité réelle : <span className="text-primary font-bold">1.050.000</span>
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">
                  Avant de lancer une attaque, posez-vous ces questions :
                </p>
                
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">1. Ratio butin/pertes</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Simulez le combat. Si vos pertes dépassent <strong className="text-red-400">30%</strong> du butin potentiel, 
                      c'est probablement un mauvais raid.
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1 text-green-400"><CheckCircle className="w-4 h-4" /> Butin 5M, pertes 500k</span>
                      <span className="flex items-center gap-1 text-red-400"><XCircle className="w-4 h-4" /> Butin 1M, pertes 1.3M</span>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">2. Coût en deutérium</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Le deut de vol compte ! Un raid de 2h avec des Traqueurs peut coûter <strong className="text-primary">100k+ deut</strong>.
                    </p>
                    <p className="text-gray-500 text-xs">
                      Formule : Consommation = (35000 × distance × nb_vaisseaux) / (35000 + 20000)
                    </p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">3. Risque d'interception</h3>
                    <p className="text-gray-300 text-sm">
                      <strong className="text-amber-400">Plus le vol est long, plus le risque est élevé.</strong> 
                      Privilégiez les raids courts (&lt;30 min) sur des cibles inactives, 
                      ou les raids nocturnes sur des cibles actives.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <h2 className="font-display text-xl font-bold text-white">Les 3 fenêtres d'opportunité</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Le matin (6h-9h)</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Les ressources de nuit se sont accumulées. Les joueurs n'ont pas encore ghost.
                    </p>
                    <p className="text-green-300 text-xs font-bold">
                      Meilleur moment pour les inactifs et les planètes banques.
                    </p>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-amber-400 mb-2">Midi (12h-14h)</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Pause déjeuner. Beaucoup de joueurs sont AFK sans avoir ghost.
                    </p>
                    <p className="text-amber-300 text-xs font-bold">
                      Bon pour les joueurs actifs qui travaillent.
                    </p>
                  </div>

                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-blue-400 mb-2">La nuit (23h-7h)</h3>
                    <p className="text-gray-300 text-sm mb-2">
                      Raids longs sans surveillance. La cible dort.
                    </p>
                    <p className="text-blue-300 text-xs font-bold">
                      Idéal pour les MB et raids sur flottes en ghost court.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">Composition de flotte par type de cible</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">Inactif sans défense</h3>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Facile</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      <strong className="text-primary">Petits Transporteurs uniquement</strong> - maximisez la capacité de pillage.
                    </p>
                    <p className="text-gray-500 text-xs">Pas besoin de combat, juste du fret.</p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">Inactif avec défense légère</h3>
                      <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">Moyen</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      <strong className="text-primary">Croiseurs + Transporteurs</strong> - Les croiseurs ont un bon RF contre les défenses légères.
                    </p>
                    <p className="text-gray-500 text-xs">Alternative : Bombardiers si beaucoup de LM/Art.</p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">Bunker</h3>
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Avancé</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      <strong className="text-primary">Flotte lourde BB/DD/GT</strong> - Puissance de feu et grande capacité de fret.
                    </p>
                    <p className="text-gray-500 text-xs">Envoyez en waves pour éviter les DG.</p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-white">Flotte en Ghost / Opé (interception)</h3>
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Expert</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">
                      <strong className="text-primary">Flotte de combat adaptée</strong> - Simulez et envoyez pile ce qu'il faut.
                    </p>
                    <p className="text-gray-500 text-xs">Utilisez le Split pour optimiser l'ordre d'attaque.</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-red-400">Erreurs fatales du raideur</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Ne pas recycler le CDR</p>
                      <p className="text-gray-400 text-xs">Vous perdez 30% des ressources du combat !</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Envoyer toute sa flotte d'un coup</p>
                      <p className="text-gray-400 text-xs">Une DG = tout perdu. Utilisez les waves.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Ignorer l'activité</p>
                      <p className="text-gray-400 text-xs">Une activité * = risque d'interception.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Raider sans simuler</p>
                      <p className="text-gray-400 text-xs">La simulation prend 10 sec, une erreur coûte des millions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Oublier de sonder avant impact</p>
                      <p className="text-gray-400 text-xs">Une flotte peut arriver entre-temps.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white font-bold text-sm">Décaler toujours pareil</p>
                      <p className="text-gray-400 text-xs">L'ennemi apprend vos habitudes.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-green-400 mb-4">Checklist avant chaque raid</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Rapport d'espionnage récent (&lt;15 min)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Simulation de combat faite</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Recycleurs envoyés pour le CDR</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Assez de transporteurs pour tout piller</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Pas d'activité suspecte sur la cible</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>Ratio butin/pertes acceptable</span>
                  </div>
                </div>
              </div>

              <RelatedGuides currentGuide="raid" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

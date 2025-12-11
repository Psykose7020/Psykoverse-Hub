import { motion } from "framer-motion";
import { Layers, ExternalLink, Shield, Swords, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideSplit() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                <Layers className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Split de Flotte
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                L'art de positionner ses vaisseaux au combat
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Pourquoi splitter sa flotte ?</h2>
                <p className="text-gray-300 mb-4">
                  Le split détermine <strong className="text-primary">comment vos vaisseaux se présentent au combat</strong>. 
                  Vos premiers vaisseaux envoyés seront en première ligne et subiront les premiers tirs.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Règle d'or :</strong> Quand vous simulez votre flotte complète sans splits, 
                    vous aurez <strong>TOUJOURS</strong> un résultat meilleur en splittant correctement !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Comment fonctionne le split ?</h2>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    OGame positionne vos vaisseaux dans l'ordre où vous les envoyez :
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="bg-[#151924] rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">1er envoi</div>
                      <div className="text-white font-bold">Première ligne</div>
                      <div className="text-red-400 text-xs mt-1">Prend les tirs en premier</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                    <div className="bg-[#151924] rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">2ème envoi</div>
                      <div className="text-white font-bold">Deuxième ligne</div>
                      <div className="text-amber-400 text-xs mt-1">Protégée par la 1ère</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                    <div className="bg-[#151924] rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">3ème envoi</div>
                      <div className="text-white font-bold">Arrière</div>
                      <div className="text-green-400 text-xs mt-1">La plus protégée</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Swords className="w-6 h-6 text-green-400" />
                  <h2 className="font-display text-xl font-bold text-white">Cas 1 : Victoire assurée (large avantage)</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Quand vous êtes sûr de gagner largement, optimisez pour <strong className="text-white">minimiser vos pertes</strong>.
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                    <div>
                      <div className="font-bold text-white">Chasseurs Légers, Chasseurs Lourds, Destroyers, Faucheurs, Battleships</div>
                      <div className="text-gray-400 text-sm">Gros boucliers et structure - tiennent les 6 rounds</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                    <div>
                      <div className="font-bold text-white">Croiseurs, Vaisseaux de Bataille</div>
                      <div className="text-gray-400 text-sm">Bonne puissance de feu protégée</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
                    <div>
                      <div className="font-bold text-white">Traqueurs, Éclaireurs</div>
                      <div className="text-gray-400 text-sm">Vaisseaux précieux à l'arrière</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151924] rounded-lg p-4">
                  <p className="text-gray-400 text-sm">
                    <strong className="text-white">Pourquoi ?</strong> Les BB, Destroyers et Faucheurs ont assez de structure 
                    et de bouclier pour encaisser pendant les 6 rounds de combat. Ils protègent vos vaisseaux 
                    précieux à l'arrière.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-white">Cas 2 : Combat serré - Optimiser les dégâts</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Quand le combat est serré, l'objectif est de <strong className="text-white">maximiser vos dégâts à la coque</strong>.
                  Un tir endommage la coque uniquement s'il dépasse <strong className="text-primary">1% de la valeur du bouclier</strong> de la cible.
                </p>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-primary">
                    <strong>Principe clé :</strong> Les vaisseaux avec la plus <strong>grosse valeur d'attaque</strong> doivent tirer en premier 
                    pour percer les boucliers et infliger des dégâts à la coque. Les petits vaisseaux tirent après.
                  </p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                    <div>
                      <div className="font-bold text-white">Étoile de la Mort, Faucheurs, Destructeurs</div>
                      <div className="text-gray-400 text-sm">Valeurs d'attaque max (200k / 14k / 11k) - Percent les boucliers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                    <div>
                      <div className="font-bold text-white">Traqueurs, Bombardiers, Croiseurs de Bataille</div>
                      <div className="text-gray-400 text-sm">Attaque élevée (7k / 1k / 700) - Continuent les dégâts</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
                    <div>
                      <div className="font-bold text-white">Destroyers, Vaisseaux de Bataille, Croiseurs</div>
                      <div className="text-gray-400 text-sm">Attaque moyenne (2k / 1k / 400)</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
                    <div>
                      <div className="font-bold text-white">Chasseurs Lourds, Chasseurs Légers</div>
                      <div className="text-gray-400 text-sm">Faible attaque (150 / 50) - Finissent le travail</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#151924] rounded-lg p-4">
                  <p className="text-gray-400 text-sm">
                    <strong className="text-white">Pourquoi ?</strong> Pour endommager la coque, le tir doit dépasser 1% du bouclier adverse. 
                    Un Chasseur Léger (50 d'attaque) ne peut pas endommager un vaisseau avec 5 000+ de bouclier. 
                    En envoyant les gros d'abord, ils percent les boucliers et les petits peuvent ensuite infliger des dégâts.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Exemple concret</h2>
                <p className="text-gray-300 mb-4">
                  Voici un exemple réel où deux joueurs en ACS ont eu des résultats différents 
                  selon leur split :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Joueur A - Bon split</h3>
                    <p className="text-gray-300 text-sm mb-2">BB/Destro en premier, Traqueurs en dernier</p>
                    <div className="text-2xl font-bold text-green-400">-2.3% pertes</div>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">Joueur B - Mauvais split</h3>
                    <p className="text-gray-300 text-sm mb-2">Envoi dans l'ordre inverse</p>
                    <div className="text-2xl font-bold text-red-400">-8.7% pertes</div>
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-4">
                  Même combat, même victoire, mais le joueur B a perdu 4× plus à cause d'un mauvais split.
                </p>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Conseils pratiques</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">1.</span>
                    <span><strong className="text-white">Utilisez le simulateur</strong> - Testez différents splits avant d'attaquer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">2.</span>
                    <span><strong className="text-white">Créez des templates</strong> - Pré-enregistrez vos splits pour gagner du temps</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">3.</span>
                    <span><strong className="text-white">Adaptez au contexte</strong> - Contre beaucoup de défense légère vs. grosse flotte, le split change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">4.</span>
                    <span><strong className="text-white">Le split protège aussi du fleetsave</strong> - Mieux vaut perdre la première wave que toute sa flotte</span>
                  </li>
                </ul>
              </div>

              <RelatedGuides currentGuide="split" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

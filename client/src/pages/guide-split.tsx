import { motion } from "framer-motion";
import { Layers, Shield, Swords, Target, Zap, AlertTriangle } from "lucide-react";
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
                Optimiser l'ordre d'attaque de vos vaisseaux pour maximiser les dégâts
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-red-400">Concept clé à comprendre</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong className="text-white">Le split détermine UNIQUEMENT l'ordre dans lequel VOS vaisseaux tirent.</strong>
                  </p>
                  <p>
                    L'ennemi, lui, tire de façon <strong className="text-red-400">ALÉATOIRE</strong> sur vos vaisseaux. 
                    Peu importe l'ordre d'envoi de votre flotte, chaque tir ennemi cible un vaisseau au hasard parmi tous les vôtres.
                  </p>
                  <div className="bg-[#151924] rounded-lg p-4 mt-4">
                    <p className="text-sm">
                      <strong className="text-primary">En résumé :</strong> Le split n'affecte pas QUI prend les tirs (c'est aléatoire), 
                      mais il affecte QUI tire en premier de votre côté.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-bold text-white">Comment fonctionne le combat OGame ?</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    À chaque round de combat :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#151924] rounded-lg p-4 border-l-4 border-primary">
                      <h3 className="font-bold text-white mb-2">Votre côté</h3>
                      <p className="text-sm">
                        Vos vaisseaux tirent dans l'ordre où vous les avez envoyés (1er envoi tire en premier).
                      </p>
                    </div>
                    <div className="bg-[#151924] rounded-lg p-4 border-l-4 border-red-500">
                      <h3 className="font-bold text-white mb-2">Côté ennemi</h3>
                      <p className="text-sm">
                        Chaque tir ennemi cible un de vos vaisseaux de façon <strong className="text-red-400">totalement aléatoire</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <h2 className="font-display text-xl font-bold text-white">La règle du 1% de bouclier</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Pour qu'un tir endommage la coque d'un vaisseau, il doit dépasser <strong className="text-primary">1% de la valeur du bouclier</strong> de la cible.
                  </p>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Exemple concret :</h3>
                    <div className="space-y-2 text-sm">
                      <p>Un <strong className="text-white">Croiseur de Bataille</strong> a <strong className="text-cyan-400">400 de bouclier</strong>.</p>
                      <p>→ Pour l'endommager, il faut un tir d'au moins <strong className="text-primary">4 d'attaque</strong> (1% de 400).</p>
                      <p className="mt-3">Un <strong className="text-white">Destroyer</strong> a <strong className="text-cyan-400">500 de bouclier</strong>.</p>
                      <p>→ Pour l'endommager, il faut un tir d'au moins <strong className="text-primary">5 d'attaque</strong> (1% de 500).</p>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-sm text-amber-300">
                      <strong>Important :</strong> Si votre tir fait moins de 1% du bouclier ennemi, le tir est <strong>complètement absorbé</strong> et ne fait aucun dégât à la coque !
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Swords className="w-6 h-6 text-orange-400" />
                  <h2 className="font-display text-xl font-bold text-white">Pourquoi l'ordre d'attaque est crucial</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    <strong className="text-white">Le split optimise l'ordre dans lequel VOS vaisseaux tirent</strong> pour maximiser les dégâts à la coque ennemie.
                  </p>
                  
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-sm text-primary">
                      <strong>Objectif du split :</strong> Faire tirer les vaisseaux avec la plus <strong>forte valeur d'attaque</strong> en premier 
                      pour qu'ils percent les boucliers ennemis. Les petits vaisseaux peuvent ensuite infliger des dégâts à la coque exposée.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h2 className="font-display text-xl font-bold text-white">Exemple : Pourquoi les chasseurs doivent tirer en dernier</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Imaginons que vous attaquez une flotte avec des <strong className="text-white">Croiseurs de Bataille</strong> (400 bouclier).</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-red-400 mb-3">❌ Mauvais split</h3>
                      <p className="text-sm mb-3">Chasseurs Légers tirent en premier</p>
                      <div className="space-y-2 text-sm">
                        <p>1. <strong className="text-white">Chasseur Léger</strong> (50 attaque) tire sur CB (400 bouclier)</p>
                        <p className="text-red-400">→ 50 &gt; 4 (1% de 400) donc passe, mais ne fait que 50 - bouclier = dégâts limités</p>
                        <p>2. Le bouclier se régénère entre les rounds</p>
                        <p className="text-red-400">→ Vos chasseurs "gaspillent" leurs tirs sur des boucliers pleins</p>
                      </div>
                    </div>
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                      <h3 className="font-bold text-green-400 mb-3">✓ Bon split</h3>
                      <p className="text-sm mb-3">Gros vaisseaux tirent en premier</p>
                      <div className="space-y-2 text-sm">
                        <p>1. <strong className="text-white">Faucheur</strong> (14 000 attaque) tire sur CB</p>
                        <p className="text-green-400">→ Détruit le bouclier ET fait d'énormes dégâts à la coque</p>
                        <p>2. <strong className="text-white">Chasseur Léger</strong> tire ensuite</p>
                        <p className="text-green-400">→ Le CB a moins de bouclier, le chasseur peut maintenant faire des dégâts efficaces</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Ordre de split recommandé (par valeur d'attaque)</h2>
                <p className="text-gray-400 mb-4">
                  Envoyez vos vaisseaux dans cet ordre pour qu'ils tirent du plus fort au plus faible :
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-900/30 to-transparent border border-orange-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Étoile de la Mort</div>
                      <div className="text-orange-400 text-sm">200 000 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-900/30 to-transparent border border-red-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Faucheur</div>
                      <div className="text-red-400 text-sm">14 000 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/30 to-transparent border border-purple-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Destructeur</div>
                      <div className="text-purple-400 text-sm">11 000 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-900/30 to-transparent border border-cyan-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold">4</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Traqueur</div>
                      <div className="text-cyan-400 text-sm">7 000 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-900/30 to-transparent border border-blue-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">5</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Destroyer</div>
                      <div className="text-blue-400 text-sm">2 000 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-900/30 to-transparent border border-indigo-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold">6</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Bombardier</div>
                      <div className="text-indigo-400 text-sm">1 000 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-900/30 to-transparent border border-green-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">7</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Vaisseau de Bataille</div>
                      <div className="text-green-400 text-sm">1 000 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-900/30 to-transparent border border-teal-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">8</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Croiseur de Bataille</div>
                      <div className="text-teal-400 text-sm">700 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-lime-900/30 to-transparent border border-lime-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-lime-600 rounded-full flex items-center justify-center text-white text-sm font-bold">9</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Éclaireur</div>
                      <div className="text-lime-400 text-sm">400 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-900/30 to-transparent border border-amber-700/30 rounded-lg">
                    <span className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold">10</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Croiseur</div>
                      <div className="text-amber-400 text-sm">400 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-slate-700/30 to-transparent border border-slate-600/30 rounded-lg">
                    <span className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white text-sm font-bold">11</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Chasseur Lourd</div>
                      <div className="text-slate-400 text-sm">150 d'attaque</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-700/30 to-transparent border border-gray-600/30 rounded-lg">
                    <span className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-bold">12</span>
                    <div className="flex-1">
                      <div className="font-bold text-white">Chasseur Léger</div>
                      <div className="text-gray-400 text-sm">50 d'attaque</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Exemple de combat complet</h2>
                <p className="text-gray-300 mb-4">
                  Vous attaquez avec 100 Faucheurs et 1000 Chasseurs Légers contre 50 Croiseurs de Bataille ennemis.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-3">❌ Mauvais split : Chasseurs en premier</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong className="text-white">Round 1 :</strong></p>
                      <p>• 1000 Chasseurs tirent (50 attaque chacun)</p>
                      <p>• Chaque CB a 400 bouclier + 7000 coque</p>
                      <p>• Les tirs passent le seuil de 1% (4) mais font peu de dégâts car le bouclier absorbe beaucoup</p>
                      <p>• Ensuite les Faucheurs tirent mais les CB restants ont déjà tiré sur vous</p>
                      <p className="text-red-400 font-bold mt-3">Résultat : Plus de pertes de votre côté</p>
                    </div>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-3">✓ Bon split : Faucheurs en premier</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <p><strong className="text-white">Round 1 :</strong></p>
                      <p>• 100 Faucheurs tirent en premier (14 000 attaque chacun)</p>
                      <p>• Ils détruisent ou endommagent gravement les CB</p>
                      <p>• Moins de CB survivent pour riposter</p>
                      <p>• Les 1000 Chasseurs tirent ensuite sur les CB affaiblis</p>
                      <p className="text-green-400 font-bold mt-3">Résultat : Moins de tirs ennemis = moins de pertes</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-primary mb-4">Résumé</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Le split détermine l'<strong className="text-white">ordre d'attaque de VOS vaisseaux</strong>, pas qui prend les tirs ennemis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>L'ennemi tire de façon <strong className="text-red-400">aléatoire</strong> sur tous vos vaisseaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Envoyez les vaisseaux avec la plus <strong className="text-white">forte valeur d'attaque en premier</strong> pour maximiser les dégâts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Plus vous détruisez vite, moins l'ennemi a l'occasion de vous tirer dessus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Utilisez le <strong className="text-white">simulateur</strong> pour tester vos splits avant d'attaquer</span>
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

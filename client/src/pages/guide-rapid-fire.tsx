import { motion } from "framer-motion";
import { Zap, Target, Percent, Calculator, Shield, Swords, AlertTriangle, Info } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideRapidFire() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/20">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Le Rapid Fire (Feu Rapide)
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                La mécanique qui permet à un vaisseau de tirer plusieurs fois par round
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-xl font-bold text-primary">Définition</h2>
                </div>
                <p className="text-gray-300">
                  Le <strong className="text-white">Rapid Fire (RF)</strong> est une capacité qui permet à un vaisseau de 
                  <strong className="text-primary"> tirer plusieurs fois dans le même round</strong> de combat lorsqu'il cible 
                  certains types d'unités spécifiques. C'est l'une des mécaniques les plus importantes d'OGame.
                </p>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-cyan-400" />
                  <h2 className="font-display text-xl font-bold text-white">Comment ça fonctionne ?</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>À chaque round de combat, voici ce qui se passe :</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                      <div>
                        <p className="font-bold text-white">Tir normal</p>
                        <p className="text-sm">Chaque vaisseau tire UNE fois sur une cible choisie au hasard</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                      <div>
                        <p className="font-bold text-white">Vérification du RF</p>
                        <p className="text-sm">Si le vaisseau a du Rapid Fire contre la cible touchée, un jet de probabilité est effectué</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                      <div>
                        <p className="font-bold text-white">Tir supplémentaire</p>
                        <p className="text-sm">Si le jet réussit, le vaisseau tire à nouveau sur une nouvelle cible aléatoire</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                      <div>
                        <p className="font-bold text-white">Répétition ou arrêt</p>
                        <p className="text-sm">Le processus se répète jusqu'à ce que le vaisseau rate son jet OU touche une cible sans RF</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 border border-green-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-green-400" />
                  <h2 className="font-display text-xl font-bold text-green-400">L'essentiel à retenir</h2>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong className="text-white">Plus le RF est élevé, plus le vaisseau tire de fois.</strong>
                  </p>
                  <p>
                    En moyenne, un vaisseau avec <strong className="text-primary">RF 10</strong> tirera <strong className="text-white">10 fois</strong> sur 
                    les cibles concernées. C'est pour ça qu'un seul Bombardier peut détruire 20 Lance-Missiles en un round !
                  </p>
                  <p className="text-sm text-gray-400">
                    Pour les formules détaillées, consultez le <Link href="/guide/formules" className="text-primary hover:underline">guide des formules</Link>.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Percent className="w-6 h-6 text-yellow-400" />
                  <h2 className="font-display text-xl font-bold text-white">Exemple concret</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>Imaginons un <strong className="text-white">Croiseur</strong> qui attaque une planète défendue par :</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>2 Lance-Missiles (RF 10 du Croiseur)</li>
                    <li>1 Laser Léger (pas de RF)</li>
                  </ul>

                  <div className="bg-[#151924] rounded-lg p-4 space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-bold text-white">Tir 1 : Le Croiseur cible un Lance-Missile</p>
                      <p className="text-sm">→ RF 10 applicable ! Jet de probabilité : 90% de chance de tirer à nouveau</p>
                      <p className="text-sm text-green-400">→ Jet réussi ! Le Croiseur peut tirer encore.</p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <p className="font-bold text-white">Tir 2 : Le Croiseur cible l'autre Lance-Missile</p>
                      <p className="text-sm">→ RF 10 applicable ! Jet de probabilité : 90% de chance de tirer à nouveau</p>
                      <p className="text-sm text-green-400">→ Jet réussi ! Le Croiseur peut tirer encore.</p>
                    </div>
                    
                    <div className="border-l-4 border-red-500 pl-4">
                      <p className="font-bold text-white">Tir 3 : Le Croiseur cible le Laser Léger</p>
                      <p className="text-sm">→ Pas de RF contre les Lasers Légers !</p>
                      <p className="text-sm text-red-400">→ Le tour du Croiseur s'arrête.</p>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm italic">
                    Dans cet exemple, le Croiseur a tiré 3 fois en un seul round grâce au Rapid Fire !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Swords className="w-6 h-6 text-orange-400" />
                  <h2 className="font-display text-xl font-bold text-white">Tableau des Rapid Fire par vaisseau</h2>
                </div>
                <p className="text-gray-400 mb-4">Voici les principaux RF des vaisseaux de combat :</p>

                <div className="space-y-6">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-cyan-400 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-cyan-500/20 flex items-center justify-center text-xs">CR</span>
                      Croiseur
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Chasseur Léger</span>
                        <span className="text-primary font-bold">RF 6</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Lance-Missiles</span>
                        <span className="text-primary font-bold">RF 10</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Sonde</span>
                        <span className="text-primary font-bold">RF 5</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-red-500/20 flex items-center justify-center text-xs">BB</span>
                      Bombardier
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Lance-Missiles</span>
                        <span className="text-primary font-bold">RF 20</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Laser Léger</span>
                        <span className="text-primary font-bold">RF 20</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Laser Lourd</span>
                        <span className="text-primary font-bold">RF 10</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Canon à Ions</span>
                        <span className="text-primary font-bold">RF 10</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Canon de Gauss</span>
                        <span className="text-primary font-bold">RF 5</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Lanceur Plasma</span>
                        <span className="text-primary font-bold">RF 5</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-purple-500/20 flex items-center justify-center text-xs">D</span>
                      Destructeur
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Éclaireur</span>
                        <span className="text-primary font-bold">RF 5</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Traqueur</span>
                        <span className="text-primary font-bold">RF 2</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Laser Léger</span>
                        <span className="text-primary font-bold">RF 10</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-blue-500/20 flex items-center justify-center text-xs">TR</span>
                      Traqueur
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Petit Transport</span>
                        <span className="text-primary font-bold">RF 3</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Grand Transport</span>
                        <span className="text-primary font-bold">RF 3</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Chasseur Lourd</span>
                        <span className="text-primary font-bold">RF 4</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Croiseur</span>
                        <span className="text-primary font-bold">RF 4</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Vaisseau Bataille</span>
                        <span className="text-primary font-bold">RF 7</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-orange-500/20 flex items-center justify-center text-xs">FA</span>
                      Faucheur
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Vaisseau Bataille</span>
                        <span className="text-primary font-bold">RF 7</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Bombardier</span>
                        <span className="text-primary font-bold">RF 4</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Destructeur</span>
                        <span className="text-primary font-bold">RF 3</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center text-xs">EC</span>
                      Éclaireur
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Chasseur Léger</span>
                        <span className="text-primary font-bold">RF 3</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Chasseur Lourd</span>
                        <span className="text-primary font-bold">RF 2</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Croiseur</span>
                        <span className="text-primary font-bold">RF 3</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-yellow-500/20 flex items-center justify-center text-xs">RIP</span>
                      Étoile de la Mort (RIP)
                    </h3>
                    <p className="text-sm text-gray-400 mb-3">L'Étoile de la Mort a du RF contre TOUS les vaisseaux et défenses :</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Sonde</span>
                        <span className="text-yellow-400 font-bold">RF 1250</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Satellite</span>
                        <span className="text-yellow-400 font-bold">RF 1250</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Transports</span>
                        <span className="text-yellow-400 font-bold">RF 250</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Chasseur Léger</span>
                        <span className="text-yellow-400 font-bold">RF 200</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Chasseur Lourd</span>
                        <span className="text-yellow-400 font-bold">RF 100</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Croiseur</span>
                        <span className="text-yellow-400 font-bold">RF 33</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">VB</span>
                        <span className="text-yellow-400 font-bold">RF 30</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Bombardier</span>
                        <span className="text-yellow-400 font-bold">RF 25</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Traqueur</span>
                        <span className="text-yellow-400 font-bold">RF 15</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Faucheur</span>
                        <span className="text-yellow-400 font-bold">RF 10</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Destructeur</span>
                        <span className="text-yellow-400 font-bold">RF 5</span>
                      </div>
                      <div className="flex justify-between p-2 bg-[#1C2230] rounded">
                        <span className="text-gray-400">Lance-Missiles</span>
                        <span className="text-yellow-400 font-bold">RF 200</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Points stratégiques importants</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-3">Avantages du RF</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">+</span>
                        <span>Multiplie drastiquement les dégâts contre les cibles vulnérables</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">+</span>
                        <span>Un seul Bombardier peut détruire 20 Lance-Missiles en moyenne</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">+</span>
                        <span>Chaque tir supplémentaire augmente les chances d'explosion de la cible</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-3">Limitations du RF</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">-</span>
                        <span>Les cibles détruites restent dans le pool jusqu'à la fin du round (tirs "gaspillés")</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">-</span>
                        <span>Si la flotte ennemie est mixte, le RF s'arrête souvent</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-400">-</span>
                        <span>Les défenses n'ont PAS de Rapid Fire (sauf Canon à Ions vs Faucheur)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h2 className="font-display text-xl font-bold text-white">Contre-mesure : Le Tampon</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Pour <strong className="text-white">briser la chaîne de Rapid Fire</strong> de l'ennemi, 
                    vous pouvez utiliser une technique appelée <strong className="text-primary">"tampon"</strong>.
                  </p>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-3">Principe du tampon</h3>
                    <p className="text-sm mb-3">
                      Mélanger des unités <strong className="text-white">sans RF</strong> dans votre flotte force l'ennemi 
                      à perdre son bonus RF lorsqu'il touche ces unités "neutres".
                    </p>
                    
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3">
                      <p className="text-sm text-blue-300">
                        <strong>Exemple :</strong> L'ennemi attaque avec des Croiseurs (RF 6 vs Chasseurs Légers). 
                        Si votre flotte contient aussi des Vaisseaux de Bataille, chaque fois qu'un Croiseur touche un VB, 
                        son tour de RF s'arrête car il n'a pas de RF contre les VB.
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-sm text-amber-300">
                      <strong>Conseil :</strong> Utilisez toujours le simulateur pour tester l'impact du RF avant un combat. 
                      La composition de votre flotte peut drastiquement changer le résultat !
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-primary mb-4">Résumé</h2>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Le RF permet à un vaisseau de <strong className="text-white">tirer plusieurs fois par round</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Probabilité de continuer = <strong className="text-white">(RF - 1) / RF</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>En moyenne, un vaisseau tire <strong className="text-white">X fois</strong> si RF = X</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Le RF s'arrête si la cible n'a pas de RF ou si le jet de probabilité échoue</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Utilisez des <strong className="text-white">tampons</strong> (unités mixtes) pour briser le RF ennemi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>L'Étoile de la Mort a du RF contre <strong className="text-white">tous</strong> les vaisseaux et défenses</span>
                  </li>
                </ul>
              </div>

              <RelatedGuides currentGuide="rapid-fire" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

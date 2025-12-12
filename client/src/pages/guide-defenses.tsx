import { motion } from "framer-motion";
import { Shield, Target, AlertTriangle, CheckCircle, XCircle, Skull, Info, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const defenseTypes = [
  {
    name: "Lance-missiles",
    abbr: "LM",
    cost: { metal: 2000, crystal: 0, deut: 0 },
    attack: 80,
    shield: 20,
    hull: 2000,
    rapidFireBy: ["Croiseur (10)", "Bombardier (20)"],
    verdict: "useful",
    description: "Défense la moins chère, uniquement en métal. Utile en tampon contre les sondes et flottes légères."
  },
  {
    name: "Laser léger",
    abbr: "LL",
    cost: { metal: 1500, crystal: 500, deut: 0 },
    attack: 100,
    shield: 25,
    hull: 2000,
    rapidFireBy: ["Bombardier (20)", "Destructeur (10)"],
    verdict: "useful",
    description: "Bon rapport qualité/prix. Consomme métal ET cristal, permet de vider les deux stocks."
  },
  {
    name: "Laser lourd",
    abbr: "LLo",
    cost: { metal: 6000, crystal: 2000, deut: 0 },
    attack: 250,
    shield: 100,
    hull: 8000,
    rapidFireBy: [],
    verdict: "essential",
    description: "60% de chance de détruire un Chasseur Léger en 1 tir. Essentiel contre les flottes de CL."
  },
  {
    name: "Artillerie à ions",
    abbr: "AI",
    cost: { metal: 5000, crystal: 3000, deut: 0 },
    attack: 150,
    shield: 500,
    hull: 8000,
    rapidFireBy: ["Bombardier (10)", "EdM (100)"],
    rapidFireAgainst: ["Faucheur (2)"],
    verdict: "useful",
    description: "Seule défense du jeu à posséder un Rapid Fire positif sur un vaisseau : RF 2 contre le Faucheur."
  },
  {
    name: "Canon de Gauss",
    abbr: "Gauss",
    cost: { metal: 20000, crystal: 15000, deut: 2000 },
    attack: 1100,
    shield: 200,
    hull: 35000,
    rapidFireBy: [],
    verdict: "useful",
    description: "Stoppe le rapid fire des Bombardiers. Détruit un Chasseur Lourd en 1 tir."
  },
  {
    name: "Lance-plasma",
    abbr: "Plasma",
    cost: { metal: 50000, crystal: 50000, deut: 30000 },
    attack: 3000,
    shield: 300,
    hull: 100000,
    rapidFireBy: [],
    verdict: "essential",
    description: "Détruit un Croiseur en 1 tir. 46.7% de chance de détruire un VdB au premier tir."
  }
];

export default function GuideDefenses() {
  return (
    <Layout>
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <Link href="/tutoriels">
              <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                  Guide des Défenses
                </h1>
                <p className="text-gray-400">Construire une défense efficace pour mineur confirmé</p>
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-4 mb-8">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-amber-400 mb-1">Philosophie de la défense</h3>
                  <p className="text-gray-300 text-sm">
                    Votre défense <strong className="text-white">se fera passer</strong>. L'objectif n'est pas de gagner, 
                    mais de <strong className="text-white">faire un maximum de dégâts en 1 tour</strong>, 
                    pas en 6 tours. Chaque round supplémentaire où vous survivez sans tuer est du gâchis.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-red-400" />
                <h2 className="font-display text-xl font-bold text-white">Analyse des défenses</h2>
              </div>

              <div className="space-y-4">
                {defenseTypes.map((def) => (
                  <div 
                    key={def.name}
                    className={`bg-[#151924] rounded-lg p-4 border-l-4 ${
                      def.verdict === "essential" ? "border-green-500" :
                      def.verdict === "useful" ? "border-blue-500" : "border-red-500"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold text-white">{def.name}</h3>
                        <span className="text-xs text-gray-500">({def.abbr})</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        def.verdict === "essential" ? "bg-green-500/20 text-green-400" :
                        def.verdict === "useful" ? "bg-blue-500/20 text-blue-400" : "bg-red-500/20 text-red-400"
                      }`}>
                        {def.verdict === "essential" ? "Essentiel" :
                         def.verdict === "useful" ? "Utile" : "Inutile"}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{def.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-2">
                      <div className="bg-[#1C2230] rounded p-2">
                        <span className="text-gray-500">Attaque:</span>
                        <span className="text-red-400 ml-1 font-bold">{def.attack.toLocaleString()}</span>
                      </div>
                      <div className="bg-[#1C2230] rounded p-2">
                        <span className="text-gray-500">Bouclier:</span>
                        <span className="text-cyan-400 ml-1 font-bold">{def.shield.toLocaleString()}</span>
                      </div>
                      <div className="bg-[#1C2230] rounded p-2">
                        <span className="text-gray-500">Coque:</span>
                        <span className="text-gray-300 ml-1 font-bold">{def.hull.toLocaleString()}</span>
                      </div>
                      <div className="bg-[#1C2230] rounded p-2">
                        <span className="text-gray-500">Coût:</span>
                        <span className="text-primary ml-1 font-bold">
                          {((def.cost.metal + def.cost.crystal + def.cost.deut) / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>

                    {def.rapidFireBy.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-red-400">
                        <Skull className="w-3 h-3" />
                        <span>Subit RF de: {def.rapidFireBy.join(", ")}</span>
                      </div>
                    )}
                    {def.rapidFireAgainst && def.rapidFireAgainst.length > 0 && (
                      <div className="flex items-center gap-2 text-xs text-green-400">
                        <Zap className="w-3 h-3" />
                        <span>RF sur: {def.rapidFireAgainst.join(", ")}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h2 className="font-display text-xl font-bold text-white">Questions fréquentes</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-[#151924] rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    "La défense ça sert à rien, la meilleure défense c'est les GT !"
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Si tu peux jouer 24h/24h, dans l'absolu, tu as raison. 
                    Mais si tu joues <strong className="text-white">10 minutes par jour</strong>, 
                    comment va survivre ta production pendant les 23h50 restantes ?
                  </p>
                </div>

                <div className="bg-[#151924] rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    "Les Lasers Légers sont meilleurs que les Lasers Lourds !"
                  </h3>
                  <p className="text-gray-300 text-sm mb-2">
                    En rapport qualité/prix contre une flotte équivalente, oui. Mais <strong className="text-white">aucun raider ne t'attaquera 
                    s'il perd la bataille</strong>. Ta défense sera TOUJOURS confrontée à des flottes bien plus puissantes.
                  </p>
                  <p className="text-gray-400 text-xs">
                    Simule 4000 LL vs 100 000 CL, puis 1000 LLo vs 100 000 CL. Les LLo font bien plus de dégâts en 1 tour.
                  </p>
                </div>

                <div className="bg-[#151924] rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    "L'Artillerie à ions est-elle utile ?"
                  </h3>
                  <p className="text-gray-300 text-sm">
                    L'Artillerie à ions est la <strong className="text-white">seule défense avec un Rapid Fire positif</strong> sur un vaisseau : 
                    RF 2 contre le Faucheur. Si vous affrontez des flottes de Faucheurs, elle devient intéressante.
                  </p>
                </div>

                <div className="bg-[#151924] rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    "Et les technologies Arme/Bouclier/Coque ?"
                  </h3>
                  <p className="text-gray-300 text-sm">
                    À haut niveau, les technos sont sensiblement identiques entre joueurs. 
                    Efforcez-vous d'être au niveau des meilleurs raiders de votre univers.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-700/30 rounded-xl p-6"
            >
              <h3 className="font-bold text-white mb-3">Formes de Vie : Intensification du bouclier à l'obsidienne</h3>
              <p className="text-gray-300 text-sm mb-4">
                La technologie <strong className="text-amber-400">Intensification du bouclier à l'obsidienne</strong> (FdV Roctas) 
                augmente les statistiques de toutes vos défenses : coque, bouclier ET armes. 
                En late game, les joueurs atteignent facilement <strong className="text-white">+200%</strong> de bonus, 
                ce qui triple l'efficacité de chaque unité défensive !
              </p>
              <div className="bg-[#151924] rounded-lg p-4">
                <p className="text-amber-300 text-sm font-medium mb-2">Fun fact :</p>
                <p className="text-gray-400 text-sm">
                  Beaucoup de raiders ne simulent pas quand ils veulent "juste piller derrière une défense". 
                  Résultat : ils sous-estiment énormément la puissance réelle des défenses car ils ne prennent pas 
                  en compte le <strong className="text-white">boost FdV</strong>... et <strong className="text-red-400">s'embrochent</strong> régulièrement !
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/30 rounded-xl p-6"
            >
              <h3 className="font-bold text-white mb-3">Conclusion : À vous de simuler !</h3>
              <p className="text-gray-300 text-sm mb-4">
                <strong className="text-white">Chaque défense a son utilité</strong> selon votre style de jeu, 
                les flottes adverses de votre univers, et vos ressources disponibles. 
                Il n'y a pas de formule magique : <strong className="text-cyan-400">utilisez un simulateur</strong> pour 
                tester différentes compositions et trouver celle qui vous convient le mieux !
              </p>
              <div className="bg-[#151924] rounded-lg p-4 text-center">
                <p className="text-gray-400 text-sm">
                  Testez vos défenses sur <strong className="text-white">OGotcha</strong>, <strong className="text-white">TrashSim</strong> ou tout autre simulateur de votre choix.
                </p>
              </div>
            </motion.div>

            <RelatedGuides currentGuide="defenses" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

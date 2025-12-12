import { motion } from "framer-motion";
import { Shield, Target, Zap, AlertTriangle, CheckCircle, XCircle, Skull, Info, Calculator } from "lucide-react";
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
    rapidFireBy: [],
    verdict: "useless",
    description: "Totalement inutile. Remplacez chaque ion par 4 lasers légers, c'est toujours mieux."
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

const fleetEvolution = [
  { phase: "Début", composition: "CL + VdB", description: "Flottes légères de raid" },
  { phase: "Milieu", composition: "CL + VdB + Bombardiers", description: "Ajout des bombardiers anti-défense" },
  { phase: "Avancé", composition: "CL + VdB + Bombardiers + Destructeurs", description: "Flottes équilibrées" },
  { phase: "Expert", composition: "CL + Destructeurs", description: "Flottes optimisées" },
  { phase: "Endgame", composition: "Destructeurs + EdM", description: "Flottes lourdes dominantes" }
];

const quotas = [
  {
    name: "Défense \"Parfaite\" (théorique)",
    description: "Pour 1 EdM à quai",
    composition: [
      { defense: "Lasers Lourds", count: 1650, reason: "Pour détruire 990 CL (60% chance/tir)" },
      { defense: "Plasmas", count: 141, reason: "Pour détruire 66 VdB (46.7% chance/tir)" },
      { defense: "EdM à quai", count: "X", reason: "Rapid fire contre tous les vaisseaux" }
    ]
  },
  {
    name: "Défense Équilibrée (recommandée)",
    description: "Quota pratique et facile à retenir",
    composition: [
      { defense: "Lasers Lourds", count: 1500, reason: "Anti-CL principal" },
      { defense: "Gauss", count: 250, reason: "Anti-CLo et stop RF des Bombardiers" },
      { defense: "Plasmas", count: 150, reason: "Anti-VdB et Croiseurs" },
      { defense: "EdM à quai", count: "X", reason: "Soutien puissance de feu" }
    ]
  },
  {
    name: "Défense Colonies (sans EdM)",
    description: "Pour colonies moins protégées",
    composition: [
      { defense: "LM ou LL", count: 1100, reason: "Tampon anti-sondes" },
      { defense: "Lasers Lourds", count: 1500, reason: "Anti-CL" },
      { defense: "Gauss", count: 250, reason: "Anti-CLo" },
      { defense: "Plasmas", count: 150, reason: "Anti-VdB/Croiseurs" }
    ]
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
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-amber-400" />
                <h2 className="font-display text-xl font-bold text-white">Évolution des flottes adverses</h2>
              </div>
              
              <p className="text-gray-300 text-sm mb-4">
                Les flottes évoluent au fil du temps. Les <strong className="text-white">Destructeurs</strong> deviennent dominants 
                car ils ne se perdent presque jamais lors des recyclages, ce qui permet d'augmenter leur nombre progressivement.
              </p>

              <div className="space-y-2">
                {fleetEvolution.map((phase, index) => (
                  <div key={phase.phase} className="flex items-center gap-4 bg-[#151924] rounded-lg p-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{phase.phase}</span>
                        <span className="text-primary text-sm">→ {phase.composition}</span>
                      </div>
                      <p className="text-gray-500 text-xs">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-green-400" />
                <h2 className="font-display text-xl font-bold text-white">Quotas de défense recommandés</h2>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="text-gray-300 mb-2">
                      <strong className="text-white">Pourquoi une EdM à quai ?</strong>
                    </p>
                    <p className="text-gray-400">
                      Contre les flottes de 200k+ CL, vos défenses légères deviennent inutiles (1-2 CL touchés plusieurs fois sur 200k). 
                      L'EdM avec son rapid fire contre tous les vaisseaux compense ce problème. 
                      Mais attention : une EdM à quai = ressources dans le CDR qui viennent de VOUS !
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {quotas.map((quota, index) => (
                  <div key={quota.name} className="bg-[#151924] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-white">{quota.name}</h3>
                      {index === 1 && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Recommandé</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{quota.description}</p>
                    
                    <div className="space-y-2">
                      {quota.composition.map((item) => (
                        <div key={item.defense} className="flex items-center justify-between bg-[#1C2230] rounded p-2">
                          <div className="flex items-center gap-2">
                            <span className="text-primary font-bold">{item.count}×</span>
                            <span className="text-white">{item.defense}</span>
                          </div>
                          <span className="text-gray-500 text-xs">{item.reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                <p className="text-amber-300 text-sm">
                  <strong>Ratio simplifié à retenir :</strong> 22 LM/LL + 30 LLo + 5 Gauss + 3 Plasmas (× multiplicateur)
                </p>
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
                    <XCircle className="w-4 h-4 text-red-400" />
                    "L'Artillerie à ions a un gros bouclier, elle permet le match nul !"
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Remplace chaque ion par <strong className="text-white">4 Lasers Légers</strong> et simule. 
                    Les LL sont toujours meilleurs. Et comme on l'a vu, les LLo sont encore mieux contre les grosses flottes.
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
              className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/30 rounded-xl p-6"
            >
              <h3 className="font-bold text-white mb-3">Résumé : La défense "parfaite"</h3>
              <p className="text-gray-300 text-sm mb-4">
                La défense parfaite n'existe pas, mais on essaye de s'en rapprocher. L'objectif est de maximiser les dégâts 
                infligés au <strong className="text-white">premier round</strong> de combat.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#151924] rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-green-400">LLo</div>
                  <div className="text-xs text-gray-500">Anti-CL</div>
                </div>
                <div className="bg-[#151924] rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-blue-400">Gauss</div>
                  <div className="text-xs text-gray-500">Anti-CLo</div>
                </div>
                <div className="bg-[#151924] rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-purple-400">Plasma</div>
                  <div className="text-xs text-gray-500">Anti-VdB/Cr</div>
                </div>
                <div className="bg-[#151924] rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold text-red-400">EdM</div>
                  <div className="text-xs text-gray-500">RF universel</div>
                </div>
              </div>
            </motion.div>

            <RelatedGuides currentGuide="defenses" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

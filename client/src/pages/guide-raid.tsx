import { motion } from "framer-motion";
import { Target, Eye, Shield, Layers, Clock, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const raidGuides = [
  {
    title: "Recherche de Cibles",
    description: "L'astuce du matin, double espionnage, surveillance discrète, types de cibles",
    icon: Eye,
    color: "from-violet-500 to-purple-600",
    link: "/guide/recherche-cibles"
  },
  {
    title: "Éviter l'Interception",
    description: "Vérifications avant raid, technique du décalage, waves sur banque, faux retour",
    icon: Shield,
    color: "from-blue-500 to-cyan-600",
    link: "/guide/eviter-interception"
  },
  {
    title: "Split de Flotte",
    description: "Positionnement des vaisseaux, victoire assurée vs combat serré",
    icon: Layers,
    color: "from-purple-500 to-violet-600",
    link: "/guide/split"
  },
  {
    title: "Timing & Connexions Tardives",
    description: "Exploiter les habitudes de connexion, AG anticipée, fenêtres d'opportunité",
    icon: Clock,
    color: "from-amber-500 to-orange-600",
    link: "/guide/timing-raid"
  }
];

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
                Techniques de Raid Avancées
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Guide complet pour maîtriser l'art du raid - 4 guides spécialisés
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le raid en bref</h2>
                <p className="text-gray-300 mb-4">
                  Le raid est l'art de <strong className="text-primary">piller les ressources et flottes</strong> des autres joueurs. 
                  C'est la méthode la plus efficace pour progresser rapidement dans OGame, mais elle demande 
                  patience, observation et stratégie.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🎯</div>
                    <div className="text-xs text-gray-400">Trouver</div>
                    <div className="text-sm text-white font-bold">les cibles</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🔍</div>
                    <div className="text-xs text-gray-400">Observer</div>
                    <div className="text-sm text-white font-bold">les habitudes</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">⚔️</div>
                    <div className="text-xs text-gray-400">Frapper</div>
                    <div className="text-sm text-white font-bold">au bon moment</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <div className="text-2xl mb-1">🛡️</div>
                    <div className="text-xs text-gray-400">Éviter</div>
                    <div className="text-sm text-white font-bold">l'interception</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {raidGuides.map((guide, index) => (
                  <Link key={index} href={guide.link}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-5 cursor-pointer hover:border-primary/50 transition-all group h-full"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${guide.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                          <guide.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-display text-lg font-bold text-white group-hover:text-primary transition-colors">
                              {guide.title}
                            </h3>
                            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="text-gray-400 text-sm">
                            {guide.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <h2 className="font-display text-lg font-bold text-primary mb-3">Conseil du pro</h2>
                <p className="text-gray-300">
                  Le meilleur raideur n'est pas celui qui attaque le plus, mais celui qui <strong className="text-white">observe le mieux</strong>. 
                  Prenez le temps d'étudier vos cibles, notez leurs habitudes, et frappez quand ils s'y attendent le moins. 
                  Une seule attaque bien préparée vaut mieux que 10 raids ratés.
                </p>
              </div>

              <RelatedGuides currentGuide="raid" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

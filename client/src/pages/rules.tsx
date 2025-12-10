import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Scale, BookOpen, Users, ArrowLeftRight, TrendingUp, 
  Swords, AlertTriangle, ExternalLink, Shield, FileText
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const rules = [
  {
    title: "VPN, IP et Multi-comptes",
    description: "Règles de propriété, VPN, et multi-comptes",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
    link: "/regles/compte"
  },
  {
    title: "Sitting & Échanges",
    description: "Surveillance de compte et dons/échanges",
    icon: ArrowLeftRight,
    color: "from-green-500 to-emerald-600",
    link: "/regles/sitting"
  },
  {
    title: "Push, Pull & Mercenariat",
    description: "Commerce, crash de flotte, partage AG/DG",
    icon: TrendingUp,
    color: "from-amber-500 to-orange-600",
    link: "/regles/push"
  },
  {
    title: "Bash",
    description: "Limitation des attaques répétées",
    icon: Swords,
    color: "from-red-500 to-rose-600",
    link: "/regles/bash"
  }
];

export default function Rules() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <Link href="/tutoriels">
            <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
              ← Retour aux tutoriels
            </Button>
          </Link>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Scale className="w-4 h-4" />
              Règlement officiel
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Les Règles du Jeu
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
              Tout ce qu'il faut savoir pour jouer dans les règles sur OGame.fr
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6 mb-10 max-w-3xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-white mb-2">Important</h3>
                <p className="text-gray-300 text-sm">
                  Les règles sont communes à toutes les communautés et disponibles en jeu. 
                  Toutefois, chaque communauté possède des exceptions propres. 
                  Cette section détaille les règles spécifiques à <strong className="text-white">OGame.fr</strong>.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Mise à jour : 25/11/2025
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {rules.map((rule, index) => {
              const Icon = rule.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={rule.link}>
                    <div className="group h-full bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${rule.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
                            {rule.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {rule.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <h2 className="font-display text-xl font-bold text-white">Sanctions</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Les infractions aux règles sont sanctionnées par les opérateurs. Selon la gravité :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">Avertissement</div>
                <p className="text-gray-400 text-xs">1ère infraction légère</p>
              </div>
              <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-orange-400 mb-1">Bannissement</div>
                <p className="text-gray-400 text-xs">Temporaire ou permanent</p>
              </div>
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">Suppression</div>
                <p className="text-gray-400 text-xs">Du compte</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-r from-blue-900/20 to-blue-950/20 border border-blue-800/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    Règles officielles
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Forum officiel OGame.fr
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://board.fr.ogame.gameforge.com/index.php?thread/734400-les-r%C3%A8gles-du-jeu/" target="_blank" rel="noopener noreferrer">
                      Voir sur le forum
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-[#5865F2]/20 to-[#5865F2]/5 border border-[#5865F2]/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#5865F2] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-white mb-1">
                    Questions sur les règles ?
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">
                    Demandez sur Discord
                  </p>
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4]" size="sm" asChild>
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                      Rejoindre
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

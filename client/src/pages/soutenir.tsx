import { motion } from "framer-motion";
import { Heart, Beer, Star, Rocket, Users, Code, Clock, Target, Sparkles } from "lucide-react";
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
    transition: { staggerChildren: 0.1 }
  }
};

const stats = [
  { icon: Code, value: "40+", label: "Pages développées" },
  { icon: Clock, value: "60+", label: "Heures de travail" },
  { icon: Users, value: "100%", label: "Gratuit" },
  { icon: Heart, value: "∞", label: "Passion" },
];

const reasons = [
  {
    icon: Rocket,
    title: "Un projet ambitieux",
    description: "Ce site vise à devenir LA référence pour tous les joueurs OGame francophones, avec des guides complets, des outils et une communauté soudée."
  },
  {
    icon: Clock,
    title: "100% indépendant",
    description: "Aucun soutien de Gameforge, aucune publicité. Ce projet est entièrement autofinancé et développé sur mon temps libre, par passion pour le jeu."
  },
  {
    icon: Target,
    title: "Toujours plus loin",
    description: "Nouveaux guides, intégration d'outils comme OGame Infinity, PTRE, OGlight... Les projets ne manquent pas pour enrichir la plateforme."
  },
  {
    icon: Users,
    title: "Pour la communauté",
    description: "Ce projet est fait par un passionné, pour des passionnés. Chaque soutien permet de continuer cette aventure ensemble."
  },
];

export default function Soutenir() {
  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Projet 100% bénévole
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Soutenir le <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Projet</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-400 mb-8 leading-relaxed"
            >
              Psykoverse est un projet créé avec passion pour la communauté OGame francophone.
              Si vous appréciez ce travail, vous pouvez m'encourager à continuer !
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Button 
                size="lg"
                className="group relative bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-display font-bold uppercase tracking-widest h-16 px-12 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all hover:scale-105 text-lg"
                asChild
              >
                <a href="https://buymeacoffee.com/psykose" target="_blank" rel="noopener noreferrer">
                  <Beer className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                  M'offrir une bière
                </a>
              </Button>
              <p className="text-gray-500 text-sm mt-4">
                Aucune obligation, votre présence est déjà un soutien précieux !
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-y border-[#2E384D]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-[#1C2230] rounded-lg border border-[#2E384D]"
                >
                  <Icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <div className="font-display text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Pourquoi soutenir ce projet ?
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Découvrez ce qui rend Psykoverse unique et comment votre soutien fait la différence.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-[#1C2230] to-[#151922] p-8 rounded-xl border border-[#2E384D] hover:border-amber-500/30 transition-all"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/10 flex items-center justify-center mb-5 border border-amber-500/20">
                      <Icon className="w-7 h-7 text-amber-500" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-white mb-3">{reason.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{reason.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-[#1C2230] to-[#0B0E14] p-10 rounded-2xl border border-amber-500/20 shadow-[0_0_60px_rgba(245,158,11,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-500"></div>
              
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                <Beer className="w-10 h-10 text-black" />
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Une petite bière pour la route ?
              </h3>

              <p className="text-gray-400 mb-8 leading-relaxed">
                Chaque contribution, aussi petite soit-elle, me motive à continuer ce projet.
                Merci du fond du cœur pour votre soutien !
              </p>

              <Button 
                size="lg"
                className="group bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-display font-bold uppercase tracking-widest h-14 px-10 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all hover:scale-105"
                asChild
              >
                <a href="https://buymeacoffee.com/psykose" target="_blank" rel="noopener noreferrer">
                  <Beer className="mr-3 w-5 h-5 group-hover:animate-bounce" />
                  M'offrir une bière
                </a>
              </Button>

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  Sécurisé
                </span>
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  Apprécié
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 border-t border-[#2E384D]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            Psykoverse est un projet indépendant, non affilié à Gameforge.
            Toutes les contributions sont utilisées pour maintenir et améliorer le site.
          </p>
        </div>
      </section>
    </Layout>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft, Youtube, MessageSquare, Rocket, Users, Heart, Star, Calendar, Target, Sparkles } from "lucide-react";
import { Link } from "wouter";
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
    transition: { staggerChildren: 0.15 }
  }
};

const timeline = [
  {
    period: "Il y a plusieurs mois",
    title: "Une idée germe",
    description: "Tout commence par une simple envie : partager ma passion pour OGame. Des heures passées à jouer, à apprendre, à comprendre les mécaniques du jeu... et l'envie de transmettre tout ça à d'autres joueurs.",
    icon: Sparkles,
    color: "from-purple-500 to-indigo-500"
  },
  {
    period: "Les premiers pas",
    title: "Les vidéos tutoriels",
    description: "Je lance ma chaîne YouTube avec des tutoriels pour aider les joueurs, débutants comme confirmés. Expliquer les bases, partager des astuces, décortiquer les stratégies... Chaque vidéo est une pierre posée pour la communauté.",
    icon: Youtube,
    color: "from-red-500 to-rose-500"
  },
  {
    period: "La communauté grandit",
    title: "Le Discord communautaire",
    description: "Les vidéos attirent des joueurs, les discussions s'animent. Un serveur Discord voit le jour pour rassembler tout le monde. Les échanges, l'entraide, les parties ensemble... La communauté Psykoverse prend vie.",
    icon: MessageSquare,
    color: "from-indigo-500 to-blue-500"
  },
  {
    period: "Août 2025",
    title: "L'ambition d'une alliance",
    description: "Une nouvelle étape : créer une vraie alliance sur les serveurs de saison OGame. L'idée ? Rassembler des joueurs motivés, jouer ensemble, progresser ensemble. Pas juste une alliance, mais un collectif soudé.",
    icon: Rocket,
    color: "from-orange-500 to-amber-500"
  },
  {
    period: "Aujourd'hui",
    title: "Psykoverse Alliance",
    description: "Ce site, cette communauté, cette alliance... Tout ça représente des mois de travail, de passion et d'investissement. Un projet 100% bénévole, fait pour les joueurs, par un joueur.",
    icon: Heart,
    color: "from-pink-500 to-rose-500"
  }
];

const values = [
  {
    icon: Users,
    title: "Collectif fiable",
    description: "Une équipe sur laquelle on peut compter, des joueurs actifs et engagés."
  },
  {
    icon: Heart,
    title: "Passer de bons moments",
    description: "OGame c'est avant tout un jeu. On est là pour s'amuser ensemble."
  },
  {
    icon: Star,
    title: "Transmettre l'expérience",
    description: "Partager nos connaissances, aider les nouveaux, progresser tous ensemble."
  },
  {
    icon: Target,
    title: "Faire découvrir le jeu",
    description: "Rendre OGame accessible à tous, démystifier les mécaniques complexes."
  }
];

export default function NotreHistoire() {
  return (
    <Layout>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/">
            <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                L'aventure Psykoverse
              </div>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Histoire</span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-400 leading-relaxed"
            >
              De l'idée d'un passionné à une communauté grandissante. 
              Découvrez comment Psykoverse est né et ce qui nous anime.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/50 hidden md:block" style={{ transform: 'translateX(-50%)' }}></div>
            
            {timeline.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`hidden md:block w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${item.color} text-white mb-3`}>
                      {item.period}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <div className="w-full md:hidden">
                    <div className={`flex items-start gap-4`}>
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r ${item.color} text-white mb-2`}>
                          {item.period}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-transparent via-[#1C2230]/50 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Nos valeurs
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Ce qui nous guide au quotidien et fait de Psykoverse une communauté unique.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group text-center p-8 bg-[#1C2230] rounded-xl border border-[#2E384D] hover:border-primary/30 transition-all"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#1C2230] to-[#0B0E14] p-10 md:p-14 rounded-2xl border border-primary/20 shadow-[0_0_60px_rgba(0,191,255,0.1)] relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-cyan-400"></div>
              <div className="absolute top-10 right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-24 h-24 bg-secondary/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                  Et ce n'est que le début...
                </h3>

                <p className="text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
                  L'aventure Psykoverse continue de grandir. Nouveaux guides, nouvelles fonctionnalités, 
                  nouvelles conquêtes sur les serveurs saison... Rejoignez-nous pour écrire la suite ensemble !
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold uppercase tracking-widest"
                    asChild
                  >
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 w-5 h-5" />
                      Rejoindre le Discord
                    </a>
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-primary/50 text-primary hover:bg-primary/10 font-display font-bold uppercase tracking-widest"
                    asChild
                  >
                    <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                      <Youtube className="mr-2 w-5 h-5" />
                      Voir les vidéos
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 border-t border-[#2E384D]">
        <div className="container mx-auto px-4 text-center">
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

import { motion } from "framer-motion";
import { ArrowLeft, Youtube, MessageSquare, Rocket, Users, Heart, Star, Calendar, BookOpen, AlertTriangle, Sparkles, Archive } from "lucide-react";
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
    period: "Décembre 2025",
    title: "La chute",
    description: "Un bannissement. Puis un autre. La seconde chance accordée, puis retirée. L'aventure OGame s'arrête brutalement. Mais l'histoire ne s'arrête pas là...",
    icon: AlertTriangle,
    color: "from-red-600 to-rose-600"
  },
  {
    period: "Aujourd'hui",
    title: "Un nouveau chapitre",
    description: "Le jeu s'arrête, mais le projet continue. Psykoverse devient un héritage : des tutoriels, des outils, une communauté. Moins de lives, moins de vidéos, mais toujours la même passion de partager.",
    icon: Heart,
    color: "from-primary to-cyan-500"
  }
];

const whatChanges = [
  {
    icon: AlertTriangle,
    title: "Fin des lives OGame",
    description: "Les streams Twitch sur OGame s'arrêtent définitivement.",
    status: "ended"
  },
  {
    icon: Youtube,
    title: "Chaîne YouTube en archive",
    description: "Plus de nouveaux contenus OGame, mais les tutoriels restent accessibles.",
    status: "archive"
  },
  {
    icon: Star,
    title: "Site en maintenance",
    description: "Mises à jour mensuelles, correctifs, nouveaux tutoriels occasionnels.",
    status: "active"
  },
  {
    icon: Users,
    title: "Discord toujours actif",
    description: "La communauté reste, les échanges continuent, l'entraide perdure.",
    status: "active"
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
            <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white" data-testid="btn-back-home">
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
              De l'apogée à la chute. Et de la chute... à la suite.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-red-500/50 to-primary/50 hidden md:block" style={{ transform: 'translateX(-50%)' }}></div>
            
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
              Ce qui change
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              La fin d'une ère ne signifie pas la fin du projet. Voici ce qui évolue.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {whatChanges.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group text-center p-8 rounded-xl border transition-all ${
                    item.status === 'ended' 
                      ? 'bg-red-900/20 border-red-500/30' 
                      : item.status === 'archive'
                      ? 'bg-yellow-900/20 border-yellow-500/30'
                      : 'bg-green-900/20 border-green-500/30'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center border group-hover:scale-110 transition-transform ${
                    item.status === 'ended'
                      ? 'bg-red-500/10 border-red-500/30'
                      : item.status === 'archive'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-green-500/10 border-green-500/30'
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      item.status === 'ended' ? 'text-red-400' : item.status === 'archive' ? 'text-yellow-400' : 'text-green-400'
                    }`} />
                  </div>
                  <div className="mb-2">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                      item.status === 'ended' 
                        ? 'bg-red-500/20 text-red-400' 
                        : item.status === 'archive'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {item.status === 'ended' ? 'TERMINÉ' : item.status === 'archive' ? 'ARCHIVÉ' : 'ACTIF'}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Link href="/journal-banni">
              <div className="group bg-gradient-to-br from-red-900/30 via-[#1C2230] to-orange-900/20 border-2 border-red-500/40 rounded-2xl p-6 md:p-8 hover:border-red-500/60 transition-all cursor-pointer">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-7 h-7 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mt-1">Journal d'un banni</h3>
                    <p className="text-gray-500 text-sm">Décembre 2025</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  L'histoire complète du bannissement. Un récit personnel, sans filtre, 
                  qui raconte la chute, la seconde chance, et la fin définitive.
                </p>
                <div className="flex items-center text-primary font-semibold group-hover:gap-3 transition-all gap-2">
                  <span>Lire le journal complet</span>
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </div>
              </div>
            </Link>
          </motion.div>
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
                <Archive className="w-12 h-12 text-primary mx-auto mb-6" />
                
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                  L'héritage continue
                </h3>

                <p className="text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
                  Les tutoriels restent. Les outils restent. La communauté reste.
                  Psykoverse n'est plus une alliance active, mais un projet vivant
                  au service de tous les joueurs OGame francophones.
                </p>

                <div className="bg-[#0B0E14] border border-[#2E384D] rounded-xl p-6 mb-8">
                  <p className="text-primary font-semibold mb-2">Prochaines mises à jour</p>
                  <p className="text-gray-400 text-sm">
                    Maintenance mensuelle • Correctifs • Nouveaux tutoriels occasionnels
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold uppercase tracking-widest"
                    asChild
                  >
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord">
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
                    <Link href="/journal-banni" data-testid="btn-journal">
                      <BookOpen className="mr-2 w-5 h-5" />
                      Lire le journal
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 border-t border-[#2E384D]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 italic mb-4">
            "Sans regret d'avoir essayé."
          </p>
          <Link href="/">
            <Button variant="ghost" className="text-gray-400 hover:text-white" data-testid="btn-back-home-footer">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

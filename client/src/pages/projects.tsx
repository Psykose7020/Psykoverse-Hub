import { motion } from "framer-motion";
import { Rocket, Calendar, Clock, Target, Wrench, Zap, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

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

const currentProjects = [
  {
    status: "in-progress",
    date: "19 Décembre 2025",
    title: "Serveur Saison",
    description: "Lancement sur le nouveau serveur saison. Rejoignez-nous pour cette nouvelle aventure !",
    icon: Rocket,
    color: "from-orange-500 to-amber-500",
    highlight: true
  },
  {
    status: "planned",
    date: "Fin Décembre 2025",
    title: "Version 2.1 - Outils OGame",
    description: "Intégration des outils communautaires : OGame Infinity, OGlight, PTRE, OGame Tracker et autres extensions.",
    icon: Wrench,
    color: "from-purple-500 to-indigo-500"
  }
];

const continuousProjects = [
  {
    icon: Target,
    title: "Présence sur les Saisons",
    description: "Participation à chaque nouveau serveur saison OGame."
  },
  {
    icon: Calendar,
    title: "Mise à jour des guides",
    description: "Amélioration régulière des tutoriels selon les évolutions du jeu."
  },
  {
    icon: Zap,
    title: "Nouvelles fonctionnalités",
    description: "Améliorations continues du site selon vos retours."
  }
];

const upcomingEvents = [
  {
    date: "19 Déc",
    title: "Lancement Serveur Saison",
    type: "event"
  },
  {
    date: "Fin Déc",
    title: "Version 2.1 du site",
    type: "update"
  },
  {
    date: "2026",
    title: "Nouvelles intégrations",
    type: "future"
  }
];

export default function Projects() {
  return (
    <Layout>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-secondary" />
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
                Projets & Roadmap
              </h1>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Ce qui nous occupe actuellement et ce qui arrive bientôt !
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                En cours & À venir
              </h2>
              
              {currentProjects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-[#1C2230] rounded-xl overflow-hidden border ${
                      project.highlight 
                        ? "border-secondary/50 shadow-[0_0_30px_rgba(255,150,0,0.15)]" 
                        : "border-[#2E384D]"
                    }`}
                  >
                    {project.highlight && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary to-orange-500"></div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-display text-lg font-bold text-white">{project.title}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                              project.status === "in-progress" 
                                ? "bg-secondary/20 text-secondary" 
                                : "bg-primary/20 text-primary"
                            }`}>
                              {project.status === "in-progress" ? "En cours" : "Prévu"}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{project.description}</p>
                          <span className="text-xs font-mono text-gray-500">{project.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              <div className="mt-8">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  En continu
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {continuousProjects.map((project, index) => {
                    const Icon = project.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-5 text-center"
                      >
                        <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h3 className="font-display text-sm font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-500 text-xs">{project.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Calendrier
                </h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold ${
                        event.type === "event" 
                          ? "bg-secondary/20 text-secondary" 
                          : event.type === "update"
                          ? "bg-primary/20 text-primary"
                          : "bg-gray-800 text-gray-400"
                      }`}>
                        {event.date}
                      </div>
                      <span className="text-gray-300 text-sm">{event.title}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-[#2E384D]">
                  <Link href="/notre-histoire">
                    <Button variant="ghost" className="w-full text-gray-400 hover:text-white justify-between">
                      Voir notre histoire
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

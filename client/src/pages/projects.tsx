import { motion } from "framer-motion";
import { Rocket, Calendar, CheckCircle, Clock, Target, Users, Tv, Globe } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/EditableText";
import { useYoutubeStats } from "@/hooks/useYoutubeStats";

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

function getRoadmapItems(youtubeSubscribers: number | null) {
  return [
    {
      status: "completed",
      date: "2024",
      title: "Lancement du site web",
      description: "Création du site communautaire avec 35 guides et ressources pour tous les joueurs OGame francophones.",
      icon: Globe
    },
    {
      status: "completed",
      date: "2024",
      title: "Chaîne YouTube",
      description: `${youtubeSubscribers ?? "..."} abonnés sur la chaîne YouTube avec des tutoriels vidéo pour la communauté.`,
      icon: Tv
    },
    {
      status: "in-progress",
      date: "19 Décembre 2025",
      title: "Serveur Saison",
      description: "Lancement sur le nouveau serveur saison. Rejoignez-nous pour cette nouvelle aventure !",
      icon: Rocket
    },
    {
      status: "planned",
      date: "En continu",
      title: "Présence sur les Saisons",
      description: "Participation à chaque nouveau serveur saison OGame pour vivre l'expérience avec la communauté.",
      icon: Target
    },
    {
      status: "planned",
      date: "En continu",
      title: "Mise à jour des guides",
      description: "Amélioration et actualisation régulière des tutoriels selon les évolutions du jeu.",
      icon: Calendar
    },
    {
      status: "planned",
      date: "Occasionnel",
      title: "Vidéos tutoriels",
      description: "Nouvelles vidéos explicatives sur YouTube quand le temps le permet.",
      icon: Tv
    }
  ];
}

const upcomingEvents = [
  {
    date: "19 Déc",
    title: "Lancement Serveur Saison",
    type: "event",
    description: "Rendez-vous sur Discord pour coordonner le départ !"
  },
  {
    date: "En continu",
    title: "Maintenance du site",
    type: "content",
    description: "Ajout de nouveaux guides et corrections selon vos retours."
  },
  {
    date: "En continu",
    title: "Recrutement ouvert",
    type: "recruitment",
    description: "Nous accueillons tous les joueurs motivés, débutants ou confirmés."
  }
];

export default function Projects() {
  const youtubeSubscribers = useYoutubeStats();
  
  return (
    <Layout>
      <section className="py-16 md:py-24 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-primary" />
              <EditableText
                id="projects-hero-title"
                defaultValue="Projets à venir"
                as="h1"
                className="font-display text-3xl md:text-5xl font-bold text-white"
              />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              <EditableText
                id="projects-hero-description"
                defaultValue="Découvrez notre feuille de route et les événements à ne pas manquer !"
                as="span"
                multiline
              />
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary" />
                Roadmap 2025
              </h2>

              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#2E384D]"></div>
                
                <div className="space-y-8">
                  {getRoadmapItems(youtubeSubscribers).map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-16"
                      >
                        <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                          item.status === "completed" 
                            ? "bg-green-900/50 border-green-500" 
                            : item.status === "in-progress"
                            ? "bg-secondary/20 border-secondary animate-pulse"
                            : "bg-[#1C2230] border-[#2E384D]"
                        }`}>
                          {item.status === "completed" ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : item.status === "in-progress" ? (
                            <Clock className="w-5 h-5 text-secondary" />
                          ) : (
                            <Icon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        
                        <div className={`bg-[#1C2230] border rounded-lg p-5 ${
                          item.status === "in-progress" 
                            ? "border-secondary/50 shadow-[0_0_15px_rgba(255,150,0,0.1)]" 
                            : "border-[#2E384D]"
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-mono uppercase tracking-wider ${
                              item.status === "completed" ? "text-green-400" :
                              item.status === "in-progress" ? "text-secondary" : "text-gray-500"
                            }`}>
                              {item.date}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                              item.status === "completed" ? "bg-green-900/50 text-green-400" :
                              item.status === "in-progress" ? "bg-secondary/20 text-secondary" :
                              "bg-gray-800 text-gray-400"
                            }`}>
                              {item.status === "completed" ? "Terminé" :
                               item.status === "in-progress" ? "En cours" : "Planifié"}
                            </span>
                          </div>
                          <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Clock className="w-6 h-6 text-secondary" />
                À ne pas manquer
              </h2>

              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-4 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/20 text-primary font-bold text-xs px-3 py-2 rounded text-center min-w-[60px]">
                        {event.date}
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{event.title}</h4>
                        <p className="text-gray-400 text-sm">{event.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg">
                <h3 className="font-bold text-white mb-3">Participez au projet !</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Vous avez des idées ? Rejoignez-nous sur Discord pour proposer vos suggestions.
                </p>
                <Button className="w-full" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                    Rejoindre le Discord
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Radio, 
  Calendar, 
  Users, 
  Clock, 
  Gamepad2, 
  TrendingUp, 
  MessageSquare, 
  ExternalLink,
  Play,
  Bell
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const TWITCH_CHANNEL = "psykoseogame";
const TWITCH_URL = `https://www.twitch.tv/${TWITCH_CHANNEL}`;

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

const liveSchedule = [
  { day: "Hebdomadaire", time: "Variable", description: "Évolution du compte Veritate en live" }
];

const streamFeatures = [
  {
    icon: Gamepad2,
    title: "Gameplay Live",
    description: "Suivez l'évolution du compte Veritate en temps réel"
  },
  {
    icon: MessageSquare,
    title: "Interaction Chat",
    description: "Posez vos questions et échangez avec la communauté"
  },
  {
    icon: TrendingUp,
    title: "Stratégies en Direct",
    description: "Apprenez les techniques avancées en situation réelle"
  },
  {
    icon: Users,
    title: "Communauté Active",
    description: "Rejoignez une communauté de passionnés francophones"
  }
];

export default function Twitch() {
  const [showEmbed, setShowEmbed] = useState(false);
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname);
      setShowEmbed(true);
    }
  }, []);

  return (
    <Layout>
      <section className="py-8 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div 
              variants={fadeInUp} 
              className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-500/30"
            >
              <Radio className="w-4 h-4" />
              Chaîne Twitch Officielle
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp} 
              className="font-display text-4xl md:text-6xl font-bold text-white mb-4"
            >
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Lives OGame
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
              Suivez l'évolution du compte Veritate en direct ! Chaque semaine (quand possible), 
              je stream ma progression sur le serveur saison pour partager mes stratégies avec vous.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 shadow-lg shadow-purple-500/30"
                asChild
              >
                <a href={TWITCH_URL} target="_blank" rel="noopener noreferrer" data-testid="btn-twitch-follow">
                  <Bell className="w-5 h-5 mr-2" />
                  Suivre sur Twitch
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" data-testid="btn-youtube-replays">
                  <Play className="w-5 h-5 mr-2" />
                  Voir les replays YouTube
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="relative bg-gradient-to-br from-purple-900/30 via-[#1C2230] to-[#151924] border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
              
              <div className="p-4 border-b border-purple-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Radio className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">psykoseogame</h3>
                    <p className="text-xs text-gray-500">OGame - Serveur Saison Veritate</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 hidden sm:inline">Cliquez pour voir le stream</span>
                  <a 
                    href={TWITCH_URL} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    data-testid="btn-open-twitch"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Ouvrir Twitch
                  </a>
                </div>
              </div>
              
              <div className="aspect-video bg-[#0e0e10] relative">
                {showEmbed && hostname ? (
                  <iframe
                    src={`https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${hostname}&muted=true`}
                    height="100%"
                    width="100%"
                    allowFullScreen
                    className="absolute inset-0"
                    data-testid="twitch-embed"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Radio className="w-10 h-10 text-purple-500" />
                      </div>
                      <p className="text-gray-500">Chargement du stream...</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 border-t border-purple-500/20 bg-[#0e0e10]/50">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="text-gray-400">
                    <span className="text-purple-400 font-bold">Contenu :</span> OGame Veritate (Saison)
                  </span>
                  <span className="text-gray-400">
                    <span className="text-purple-400 font-bold">Langue :</span> Français
                  </span>
                  <span className="text-gray-400">
                    <span className="text-purple-400 font-bold">Fréquence :</span> ~1x/semaine
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Pourquoi suivre les lives ?
              </h2>
              <p className="text-gray-400">
                Des streams réguliers pour apprendre et progresser ensemble
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {streamFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-gradient-to-br from-[#1C2230] to-[#151924] border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-all"
                  >
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-gradient-to-br from-purple-900/20 via-[#1C2230] to-[#151924] border border-purple-500/30 rounded-2xl p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                  <Gamepad2 className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                    À propos de la chaîne
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      <span className="text-purple-400 font-bold">psykoseogame</span> est ma chaîne Twitch dédiée à OGame. 
                      J'y stream principalement ma progression sur le serveur saison <span className="text-white font-semibold">Veritate</span>, 
                      lancé le 19 décembre 2024.
                    </p>
                    <p>
                      L'objectif ? Vous montrer en temps réel les stratégies, les décisions et les erreurs d'un joueur 
                      expérimenté sur un univers compétitif. C'est l'occasion parfaite pour poser vos questions et 
                      apprendre en situation réelle !
                    </p>
                    <p>
                      Les streams ont lieu environ <span className="text-white font-semibold">une fois par semaine</span> (quand mon emploi du temps le permet). 
                      Suivez la chaîne pour être notifié dès que je passe en live !
                    </p>
                  </div>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                      OGame
                    </span>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                      Stratégie
                    </span>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                      Français
                    </span>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                      Serveur Saison
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-16"
          >
            <div className="bg-gradient-to-br from-[#1C2230] to-[#151924] border border-[#2E384D] rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                Horaires des Lives
              </h2>
              <p className="text-gray-400 mb-6">
                Les streams ont lieu environ une fois par semaine, principalement en soirée. 
                Les horaires exacts sont annoncés sur Discord et Twitch.
              </p>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-3 text-purple-300">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Prochains lives annoncés sur Discord</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button className="bg-purple-600 hover:bg-purple-500" asChild>
                  <a href={TWITCH_URL} target="_blank" rel="noopener noreferrer" data-testid="btn-twitch-notifications">
                    <Bell className="w-4 h-4 mr-2" />
                    Activer les notifications
                  </a>
                </Button>
                <Button variant="outline" className="border-[#5865F2]/50 text-[#5865F2] hover:bg-[#5865F2]/10" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord-twitch">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Rejoindre Discord
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-red-900/20 via-[#1C2230] to-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/30">
                  <Play className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-2">
                    Vous avez raté un live ?
                  </h2>
                  <p className="text-gray-400 mb-4">
                    Les meilleurs moments sont souvent uploadés sur YouTube ! 
                    Abonnez-vous pour ne rien manquer.
                  </p>
                  <Button className="bg-red-600 hover:bg-red-500" asChild>
                    <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" data-testid="btn-youtube-channel">
                      <Play className="w-4 h-4 mr-2" />
                      Voir la chaîne YouTube
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

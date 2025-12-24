import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  Youtube, 
  MessageSquare, 
  BookOpen,
  Globe,
  Shield,
  ExternalLink,
  Star,
  Sparkles,
  Gamepad2,
  Eye,
  BookMarked,
  ChevronRight,
  Heart,
  Archive
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SpaceGame from "@/components/SpaceGame";
import { useYoutubeStats } from "@/hooks/useYoutubeStats";
import { useDiscordStats } from "@/hooks/useDiscordStats";

import heroBg from "@assets/generated_videos/specific_ogame_destroyer_fleet_formation.mp4";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";

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

export default function Home() {
  const youtubeSubscribers = useYoutubeStats();
  const discordMembers = useDiscordStats();
  
  const { data: visitData } = useQuery<{ total: number }>({
    queryKey: ['/api/visits/total'],
    queryFn: async () => {
      const res = await fetch('/api/visits/total');
      if (!res.ok) return { total: 0 };
      return res.json();
    },
    staleTime: 60000,
  });
  const totalVisits = visitData?.total || 0;
  
  return (
    <Layout>
      <header className="relative py-20 md:py-28 overflow-hidden flex items-center border-b border-[#2E384D]">
        <div className="absolute inset-0 z-0">
          <video 
            src={heroBg} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="container relative z-20 px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex justify-center mb-6">
              <img src={allianceLogo} alt="Psykoverse" className="w-20 h-20 md:w-24 md:h-24 drop-shadow-[0_0_30px_rgba(0,191,255,0.4)]" />
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Psykoverse
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-primary font-medium mb-6">
              Communauté OGame Francophone
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              49 guides complets, des ressources pour tous les joueurs, et une communauté active sur Discord.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord-hero">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Discord
                  <span className="ml-2 text-xs opacity-80 bg-white/10 px-2 py-0.5 rounded">{discordMembers ?? "..."}</span>
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                <Link href="/tutoriels" data-testid="btn-tutorials-hero">
                  <BookOpen className="w-5 h-5 mr-2" />
                  49 Guides
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </header>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Link href="/journal-banni" data-testid="link-journal-home">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group h-full bg-gradient-to-br from-red-900/40 via-[#1C2230] to-orange-900/30 border-2 border-red-500/50 rounded-2xl p-6 md:p-8 hover:border-red-500/70 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform flex-shrink-0">
                    <BookMarked className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Récit
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-red-300 transition-colors">
                      Journal d'un banni
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  L'histoire complète d'un commandant spatial banni. Un récit personnel, sans filtre, 
                  qui raconte la chute, la seconde chance, et la fin définitive.
                </p>
                <div className="flex items-center gap-2 text-red-400 font-semibold group-hover:gap-3 transition-all">
                  Lire le journal
                  <ChevronRight className="w-5 h-5" />
                </div>
              </motion.div>
            </Link>

            <Link href="/journal-banni#lettre-ouverte" data-testid="link-lettre-home">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group h-full bg-gradient-to-br from-primary/20 via-[#1C2230] to-purple-900/20 border-2 border-primary/40 rounded-2xl p-6 md:p-8 hover:border-primary/60 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform flex-shrink-0">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        Message
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      Lettre ouverte
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400 mb-4">
                  Communication importante à la communauté. Ce que cette aventure représente, 
                  ce qui change pour le Psykoverse, et les remerciements sincères.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Lire la lettre
                  <ChevronRight className="w-5 h-5" />
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-6 bg-gradient-to-r from-amber-900/20 via-[#1C2230] to-amber-900/20 border-y border-amber-700/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="flex items-center gap-3">
              <Archive className="w-5 h-5 text-amber-400" />
              <p className="text-amber-200 text-sm md:text-base">
                <span className="font-bold text-amber-100">Projet en maintenance</span> — 
                Mises à jour mensuelles, tutoriels préservés.
              </p>
            </div>
            <Link href="/notre-histoire" className="text-amber-400 hover:text-amber-300 font-medium text-sm flex items-center gap-1">
              En savoir plus <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              Ressources disponibles
            </h2>
            <p className="text-gray-500">Tout ce dont vous avez besoin pour progresser sur OGame</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/tutoriels" data-testid="link-tutoriels">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-[#1C2230] border border-[#2E384D] hover:border-primary/50 rounded-xl p-6 transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  49 Guides
                </h3>
                <p className="text-gray-500 text-sm">
                  Du débutant à l'expert, tout pour progresser.
                </p>
              </motion.div>
            </Link>

            <Link href="/alliance" data-testid="link-alliance">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group bg-[#1C2230] border border-[#2E384D] hover:border-green-500/50 rounded-xl p-6 transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  Univers
                </h3>
                <p className="text-gray-500 text-sm">
                  Informations sur les univers de jeu.
                </p>
              </motion.div>
            </Link>

            <Link href="/support" data-testid="link-support">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group bg-[#1C2230] border border-[#2E384D] hover:border-purple-500/50 rounded-xl p-6 transition-all cursor-pointer hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  Support
                </h3>
                <p className="text-gray-500 text-sm">
                  Besoin d'aide ? Ouvrez un ticket Discord.
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#5865F2] rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Discord</h3>
                    <p className="text-gray-500 text-sm">{discordMembers ?? "..."} membres</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Rejoignez la communauté pour échanger, poser des questions et participer aux discussions.
                </p>
                <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4]" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord-section">
                    Rejoindre <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">YouTube</h3>
                    <p className="text-gray-500 text-sm">{youtubeSubscribers ?? "..."} abonnés</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Tutoriels vidéo et guides complets. La chaîne reste accessible en archive.
                </p>
                <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10" asChild>
                  <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" data-testid="btn-youtube-section">
                    Voir la chaîne <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl mb-5 border border-primary/30">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            
            <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
              Merci à la communauté
            </h2>
            
            <p className="text-gray-400 mb-6">
              Votre soutien et vos visites nous motivent. Une suggestion ou une erreur à signaler ?
            </p>
            
            <button
              onClick={() => window.dispatchEvent(new Event("openFeedbackModal"))}
              className="inline-flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-5 py-2.5 rounded-xl font-medium transition-all border border-primary/30 cursor-pointer"
              data-testid="btn-feedback-home"
            >
              <MessageSquare className="w-4 h-4" />
              Donner mon feedback
            </button>
            
            {totalVisits > 0 && (
              <div className="mt-6 inline-flex items-center gap-2 text-gray-500 text-sm">
                <Eye className="w-4 h-4" />
                {totalVisits.toLocaleString()} visites
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section id="space-game" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium mb-2">
              <Gamepad2 className="w-4 h-4" />
              Mini-jeu
            </div>
            <h2 className="font-display text-xl font-bold text-white">
              Un petit jeu pour patienter
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <SpaceGame />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

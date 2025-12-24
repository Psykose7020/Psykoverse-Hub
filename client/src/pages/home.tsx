import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Users, 
  Youtube, 
  MessageSquare, 
  ChevronDown,
  BookOpen,
  Globe,
  Rocket,
  Shield,
  ExternalLink,
  Play,
  Star,
  Zap,
  Clock,
  Trophy,
  Target,
  Sparkles,
  Gamepad2,
  Eye,
  Radio,
  Bell,
  BookMarked,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SpaceGame from "@/components/SpaceGame";
import { EditableText } from "@/components/EditableText";
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

const sections = [
  {
    href: "/tutoriels",
    icon: BookOpen,
    title: "48 Guides",
    description: "Du débutant à l'expert, tout pour progresser sur OGame.",
    color: "from-primary to-blue-600",
    stats: "48 guides",
    featured: true
  },
  {
    href: "/alliance",
    icon: Globe,
    title: "3 Univers",
    description: "Veritate (Saison), Scorpius et Hercules.",
    color: "from-green-500 to-emerald-600",
    stats: "Actifs"
  },
  {
    href: "/support",
    icon: Shield,
    title: "Support",
    description: "Besoin d'aide ? Ouvrez un ticket sur Discord.",
    color: "from-purple-500 to-purple-600",
    stats: "24/7"
  }
];

const features = [
  {
    icon: Star,
    title: "Guides Complets",
    description: "48 tutoriels couvrant tous les aspects du jeu, des bases aux stratégies avancées."
  },
  {
    icon: Users,
    title: "Ouvert à Tous",
    description: "Ressources accessibles à tous les joueurs francophones, quelle que soit votre alliance."
  },
  {
    icon: Trophy,
    title: "Sources Multiples",
    description: "Des guides rassemblés de toutes les sources de la communauté OGame."
  },
  {
    icon: Zap,
    title: "Contenu Régulier",
    description: "Nouveaux guides et mises à jour pour suivre les évolutions d'OGame."
  }
];

const universes = [
  { name: "Veritate", status: "Nouveau", players: "Serveur Saison", isNew: true },
  { name: "Scorpius", status: "Actif", players: "Univers principal" },
  { name: "Hercules", status: "Actif", players: "Alliance présente" }
];

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
      <header className="relative py-24 md:py-36 lg:py-44 overflow-hidden flex items-center border-b border-[#2E384D]">
        <div className="absolute inset-0 z-0">
          <video 
            src={heroBg} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        </div>

        <div className="container relative z-20 px-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="max-w-2xl"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                <img src={allianceLogo} alt="" className="w-20 h-20 md:w-24 md:h-24 logo-float drop-shadow-[0_0_30px_rgba(0,191,255,0.4)]" />
                <div>
                  <EditableText 
                    id="home-title-1" 
                    defaultValue="Guides OGame" 
                    as="h1" 
                    className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none"
                  />
                  <EditableText 
                    id="home-title-2" 
                    defaultValue="Francophones" 
                    as="span" 
                    className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-none text-glow"
                  />
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                <EditableText 
                  id="home-description" 
                  defaultValue="La ressource complète pour tous les joueurs OGame francophones. 48 guides complets, des bases aux stratégies avancées, accessibles à tous !" 
                  as="p"
                  className="text-lg md:text-xl text-gray-300 leading-relaxed"
                  multiline
                />
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold uppercase tracking-wide shadow-lg shadow-[#5865F2]/20 hover:shadow-[#5865F2]/40 transition-all" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord-hero">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Rejoindre Discord
                    <span className="ml-2 text-xs opacity-80 bg-white/10 px-2 py-0.5 rounded">{discordMembers ?? "..."}</span>
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary" asChild>
                  <Link href="/tutoriels" data-testid="btn-tutorials-hero">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Voir les guides
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400" 
                  onClick={() => document.getElementById('space-game')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="btn-game-hero"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Mini-jeu
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="hidden lg:flex flex-col gap-4 flex-shrink-0"
            >
              <div className="rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-md border border-white/10 shadow-xl p-4">
                <iframe 
                  src="https://discordapp.com/widget?id=1240631649327386624&theme=dark" 
                  width="320" 
                  height="420" 
                  frameBorder="0" 
                  sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                  title="Widget Discord Psykoverse"
                  className="rounded-xl"
                  style={{ background: 'transparent' }}
                />
              </div>
              <a 
                href="https://www.youtube.com/@7020Psykose" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-red-500/40 rounded-2xl p-4 transition-all hover:bg-red-900/30 shadow-xl"
              >
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold text-white text-sm">@7020Psykose</p>
                  <p className="text-gray-400 text-xs">{youtubeSubscribers ?? "..."} abonnés</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-red-400 transition-colors" />
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </header>

      <Link href="/journal-banni">
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-4 md:py-5 bg-gradient-to-r from-red-900/40 via-orange-900/30 to-red-900/40 border-b-2 border-red-500/50 cursor-pointer hover:from-red-900/50 hover:via-orange-900/40 hover:to-red-900/50 transition-all group"
          data-testid="banner-journal-banni"
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:scale-110 transition-transform">
                  <BookMarked className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                      Nouveau
                    </span>
                    <span className="text-red-300 text-xs">Récit exclusif</span>
                  </div>
                  <h3 className="font-display text-lg md:text-xl font-bold text-white group-hover:text-red-300 transition-colors">
                    🪐 Journal d'un banni
                  </h3>
                </div>
              </div>
              <p className="text-gray-300 text-sm md:text-base max-w-md hidden md:block">
                Récit intime d'un commandant spatial enfermé sans murs, sans barreaux...
              </p>
              <div className="flex items-center gap-2 text-red-300 font-semibold group-hover:gap-3 transition-all">
                Lire l'histoire
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </motion.section>
      </Link>

      <section className="py-4 bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-amber-900/30 border-b border-amber-700/40">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 text-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <p className="text-amber-200 text-sm md:text-base">
                <span className="font-bold text-amber-100">Site en développement</span> jusqu'à janvier 2026.
                Mises à jour régulières. N'hésitez pas à signaler toute incohérence !
              </p>
            </div>
            <button
              onClick={() => window.dispatchEvent(new Event("openFeedbackModal"))}
              className="inline-flex items-center gap-2 bg-amber-600/30 hover:bg-amber-600/50 text-amber-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border border-amber-600/50"
            >
              <MessageSquare className="w-4 h-4" />
              Envoyer un feedback
            </button>
          </motion.div>
        </div>
      </section>

      <section className="py-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { value: "48", label: "Guides complets", icon: BookOpen },
              { value: discordMembers ? `${discordMembers}+` : "...", label: "Membres Discord", icon: Users },
              { value: "3", label: "Univers actifs", icon: Globe },
              { value: youtubeSubscribers ? String(youtubeSubscribers) : "...", label: "Abonnés YouTube", icon: Youtube }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3 justify-center">
                <stat.icon className="w-6 h-6 text-primary/60" />
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="relative bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/30 rounded-2xl p-6 md:p-10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-purple-500 rounded-2xl mb-5 shadow-lg shadow-primary/30">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                
                <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-3">
                  Merci à toute la communauté !
                </h2>
                
                <p className="text-gray-300 mb-5 max-w-lg mx-auto">
                  Votre soutien et vos visites nous motivent à améliorer ce site. 
                  Ensemble, construisons la meilleure ressource OGame francophone !
                </p>
                
                <div className="bg-[#1C2230]/80 border border-[#2E384D] rounded-xl p-5 mb-4">
                  <p className="text-gray-400 text-sm mb-3">
                    Une suggestion ou une erreur à signaler ?
                    <span className="text-white font-medium"> Vos retours améliorent nos tutoriels !</span>
                  </p>
                  <button
                    onClick={() => window.dispatchEvent(new Event("openFeedbackModal"))}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 cursor-pointer text-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Donner mon feedback
                  </button>
                </div>
                
                {totalVisits > 0 && (
                  <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
                    <Eye className="w-4 h-4 text-primary" />
                    <span className="text-white font-semibold">{totalVisits.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm">visites depuis la création</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <EditableText id="home-sections-badge" defaultValue="Votre aventure commence ici" as="span" className="" />
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              <EditableText id="home-sections-title" defaultValue="Découvrez nos sections" as="span" className="font-display text-3xl md:text-4xl font-bold text-white" />
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-xl mx-auto">
              <EditableText id="home-sections-desc" defaultValue="Guides, communauté et ressources pour dominer l'univers" as="span" className="text-gray-400" />
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              const isFeatured = 'featured' in section && section.featured;
              return (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={isFeatured ? "md:col-span-2 lg:col-span-1" : ""}
                >
                  <Link href={section.href}>
                    <div className={`group h-full bg-[#1C2230] border rounded-xl p-6 transition-all cursor-pointer hover:-translate-y-1 relative ${
                      isFeatured 
                        ? "border-primary/50 shadow-lg shadow-primary/20 ring-2 ring-primary/30 hover:shadow-xl hover:shadow-primary/30" 
                        : "border-[#2E384D] hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                    }`}>
                      {isFeatured && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Populaire
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg ${isFeatured ? "ring-2 ring-white/20" : ""}`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          isFeatured 
                            ? "text-white bg-gradient-to-r from-primary to-blue-500" 
                            : "text-primary bg-primary/10"
                        }`}>
                          {section.stats}
                        </span>
                      </div>
                      <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{section.description}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              <EditableText id="home-why-title" defaultValue="Pourquoi ce site ?" as="span" className="font-display text-3xl md:text-4xl font-bold text-white" />
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Globe className="w-4 h-4" />
                Nos univers
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                <EditableText id="home-universes-title" defaultValue="Où nous trouver ?" as="span" className="font-display text-3xl md:text-4xl font-bold text-white" />
              </h2>
              <p className="text-gray-400 mb-8">
                <EditableText id="home-universes-desc" defaultValue="Psykoverse est présent sur plusieurs univers OGame.fr. Rejoignez-nous sur Veritate (Saison) ou sur nos univers classiques !" as="span" className="text-gray-400" multiline />
              </p>
              <Button asChild>
                <Link href="/alliance" data-testid="btn-alliance">
                  En savoir plus
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {universes.map((uni, index) => (
                <div 
                  key={index}
                  className={`bg-[#1C2230] border rounded-xl p-5 flex items-center justify-between ${
                    'isNew' in uni && uni.isNew 
                      ? "border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.15)]" 
                      : "border-[#2E384D]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      'isNew' in uni && uni.isNew
                        ? "bg-green-500/30 text-green-400"
                        : uni.status === "Actif" 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-amber-500/20 text-amber-400"
                    }`}>
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">{uni.name}</h3>
                      <p className="text-gray-500 text-sm">{uni.players}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    'isNew' in uni && uni.isNew
                      ? "bg-green-500/20 text-green-400 animate-pulse"
                      : uni.status === "Actif"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}>
                    {uni.status}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-[#2E384D] bg-gradient-to-b from-transparent via-[#5865F2]/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#5865F2]/30">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoignez la communauté
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              {discordMembers ?? "..."} membres actifs vous attendent sur Discord. Entraide, discussions stratégiques, 
              annonces d'événements et bien plus encore !
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] shadow-lg shadow-[#5865F2]/20" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord-cta">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Rejoindre le Discord
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/support" data-testid="btn-support">
                  <Shield className="w-5 h-5 mr-2" />
                  Obtenir de l'aide
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-[#1C2230] to-[#151924] border border-[#2E384D] rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
                    <Youtube className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Chaîne YouTube</h3>
                    <p className="text-gray-400 text-sm">@7020Psykose</p>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-4">
                  {youtubeSubscribers ?? "..."} abonnés • Tutoriels complets et guides vidéo pour tous niveaux.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs border border-red-500/30">
                    48 Guides
                  </span>
                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs border border-red-500/30">
                    Français
                  </span>
                </div>
                
                <Button className="w-full bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20" asChild>
                  <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" data-testid="btn-youtube">
                    <Youtube className="w-4 h-4 mr-2" />
                    S'abonner
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="space-game" className="py-16 md:py-24 border-t border-[#2E384D]">
        <div className="container mx-auto px-4">
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

import { motion } from "framer-motion";
import { Link } from "wouter";
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
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

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
    title: "35 Guides",
    description: "Du débutant à l'expert, tout pour progresser sur OGame.",
    color: "from-primary to-blue-600",
    stats: "35 guides"
  },
  {
    href: "/alliance",
    icon: Globe,
    title: "3 Univers",
    description: "Hercules, Scorpius et le serveur Saison du 19 décembre.",
    color: "from-green-500 to-emerald-600",
    stats: "Actifs"
  },
  {
    href: "/projets",
    icon: Rocket,
    title: "Projets",
    description: "Notre roadmap et les événements à venir.",
    color: "from-secondary to-orange-600",
    stats: "2025"
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
    description: "35 tutoriels couvrant tous les aspects du jeu, des bases aux stratégies avancées."
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
  { name: "Hercules", status: "Actif", players: "Alliance présente" },
  { name: "Scorpius", status: "Actif", players: "Alliance présente" },
  { name: "Saison", status: "19 Déc", players: "Nouveau serveur" }
];

export default function Home() {
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
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container relative z-20 px-4">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <img src={allianceLogo} alt="" className="w-20 h-20 md:w-24 md:h-24 logo-float drop-shadow-[0_0_30px_rgba(0,191,255,0.4)]" />
              <div>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-none">
                  Guides OGame
                </h1>
                <span className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-none text-glow">
                  Francophones
                </span>
              </div>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              La ressource complète pour tous les joueurs OGame francophones. 
              <span className="text-primary font-medium"> 35 guides complets</span>, des bases aux stratégies avancées, 
              accessibles à <span className="text-primary font-medium">tous</span> !
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold uppercase tracking-wide shadow-lg shadow-[#5865F2]/20 hover:shadow-[#5865F2]/40 transition-all" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord-hero">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Rejoindre Discord
                  <span className="ml-2 text-xs opacity-80 bg-white/10 px-2 py-0.5 rounded">180</span>
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary" asChild>
                <Link href="/tutoriels" data-testid="btn-tutorials-hero">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Voir les guides
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </header>

      <section className="py-6 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              { value: "35", label: "Guides complets", icon: BookOpen },
              { value: "180+", label: "Membres Discord", icon: Users },
              { value: "3", label: "Univers actifs", icon: Globe },
              { value: "340", label: "Abonnés YouTube", icon: Youtube }
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
              Votre aventure commence ici
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Découvrez nos sections
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-xl mx-auto">
              Guides, communauté et ressources pour dominer l'univers
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.href}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={section.href}>
                    <div className="group h-full bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full font-medium">
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
              Pourquoi ce site ?
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
                Où nous trouver ?
              </h2>
              <p className="text-gray-400 mb-8">
                Psykoverse est présent sur plusieurs univers OGame.fr. Rejoignez-nous sur l'un d'entre eux 
                ou attendez le nouveau serveur Saison du 19 décembre !
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
                  className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      uni.status === "Actif" 
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
                    uni.status === "Actif"
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
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-[#5865F2] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#5865F2]/30">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Rejoignez la communauté
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              180 membres actifs vous attendent sur Discord. Entraide, discussions stratégiques, 
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

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <Play className="w-8 h-8 text-red-500" />
                Chaîne YouTube
              </h2>
              <Button variant="ghost" className="text-primary" asChild>
                <Link href="/tutoriels" data-testid="btn-tutorials-footer">
                  Voir tous les tutoriels
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="bg-gradient-to-br from-[#1C2230] to-[#151924] border border-[#2E384D] rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
                <Youtube className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">@7020Psykose</h3>
              <p className="text-gray-400 mb-6">340 abonnés • Tutoriels OGame en français</p>
              <Button className="bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20" size="lg" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" data-testid="btn-youtube">
                  <Youtube className="w-5 h-5 mr-2" />
                  S'abonner à la chaîne
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

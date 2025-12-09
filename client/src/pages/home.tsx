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
  Play
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
    title: "Tutoriels",
    description: "Guides vidéo et fiches thématiques pour maîtriser OGame.",
    color: "from-red-500 to-red-600"
  },
  {
    href: "/alliance",
    icon: Globe,
    title: "Où nous trouver",
    description: "Hercules, Scorpius et le serveur Saison du 19 décembre.",
    color: "from-primary to-blue-600"
  },
  {
    href: "/projets",
    icon: Rocket,
    title: "Projets à venir",
    description: "Notre roadmap et les événements à ne pas manquer.",
    color: "from-secondary to-orange-600"
  },
  {
    href: "/support",
    icon: Shield,
    title: "Support",
    description: "Besoin d'aide ? Ouvrez un ticket sur Discord.",
    color: "from-purple-500 to-purple-600"
  }
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <header className="relative py-20 md:py-32 lg:py-40 overflow-hidden flex items-center border-b border-[#2E384D]">
        <div className="absolute inset-0 z-0">
          <video 
            src={heroBg} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent" />
        </div>

        <div className="container relative z-20 px-4">
          <motion.div 
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <img src={allianceLogo} alt="" className="w-16 h-16 md:w-20 md:h-20" />
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Bienvenue sur <br/>
                <span className="text-primary">Psykoverse</span>
              </h1>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Le point de rencontre de la communauté OGame francophone. 
              Tutoriels, entraide et aventures spatiales sur plusieurs univers !
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold uppercase tracking-wide" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Rejoindre Discord
                  <span className="ml-2 text-xs opacity-80">180 membres</span>
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-5 h-5 mr-2" />
                  YouTube
                  <span className="ml-2 text-xs opacity-80">340 abonnés</span>
                </a>
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

      {/* Quick Navigation */}
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
              Explorez Psykoverse
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-xl mx-auto">
              Découvrez tout ce que notre communauté a à offrir
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
                    <div className="group h-full bg-[#1C2230] border border-[#2E384D] rounded-lg p-6 hover:border-primary/50 transition-all cursor-pointer">
                      <div className={`w-14 h-14 bg-gradient-to-br ${section.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
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

      {/* Discord CTA */}
      <section className="py-16 md:py-24 border-b border-[#2E384D] bg-gradient-to-b from-transparent via-[#5865F2]/5 to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-[#5865F2] rounded-full flex items-center justify-center mx-auto mb-6">
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
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4]" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Rejoindre le Discord
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/support">
                  <Shield className="w-5 h-5 mr-2" />
                  Obtenir de l'aide
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* YouTube Preview */}
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
                Derniers tutoriels
              </h2>
              <Button variant="ghost" className="text-primary" asChild>
                <Link href="/tutoriels">
                  Voir tous les tutoriels
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-8 text-center">
              <Youtube className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">@7020Psykose</h3>
              <p className="text-gray-400 mb-6">340 abonnés • Tutoriels OGame en français</p>
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
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

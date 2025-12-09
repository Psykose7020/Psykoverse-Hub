import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Users, 
  Youtube, 
  MessageSquare, 
  ChevronDown,
  Shield, 
  Star,
  Globe,
  Monitor,
  Menu,
  X,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Assets
import heroBg from "@assets/generated_videos/specific_ogame_destroyer_fleet_formation.mp4";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";
import thumb1 from "@assets/generated_images/sci-fi_hud_tutorial_thumbnail.png";
import thumb2 from "@assets/generated_images/spaceship_fleet_tactical_view_thumbnail.png";
import thumb3 from "@assets/generated_images/space_battle_tactical_analysis_hud.png";

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

function FAQItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg overflow-hidden transition-all duration-300 hover:border-primary/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between gap-4"
        data-testid={`faq-toggle-${question.slice(0, 20)}`}
      >
        <h3 className="font-display text-lg font-bold text-white">{question}</h3>
        <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <div className="px-6 text-gray-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground overflow-x-hidden bg-background relative scroll-smooth">
      {/* Dynamic Background */}
      <div className="fixed inset-0 space-bg opacity-20 pointer-events-none z-0"></div>
      
      {/* Subtle Background Logo */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.02] pointer-events-none z-0">
        <img src={allianceLogo} alt="" className="w-full h-full object-contain animate-[spin_180s_linear_infinite]" />
      </div>

      {/* Top Status Bar */}
      <div className="h-8 bg-[#0B0E14] border-b border-white/5 flex items-center justify-between px-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 z-50 relative">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            En ligne
          </span>
          <span className="hidden sm:inline">340 Abonnés YouTube</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-600">V1.0</span>
          <Link href="/support" className="hover:text-primary transition-colors flex items-center gap-2">
            <Shield className="w-3 h-3" />
            <span className="hidden sm:inline">Support</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-40 border-b border-[#2E384D] bg-[#1C2230]/95 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img src={allianceLogo} alt="Psykoverse Logo" className="h-10 w-10 md:h-14 md:w-14 relative z-10 drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg md:text-xl leading-none tracking-wide text-white group-hover:text-primary transition-colors">
                PSYKOVERSE
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary font-bold">Alliance OGame</span>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => scrollToSection('about')} className="px-4 py-2 hover:bg-white/5 rounded transition-colors text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">
              À Propos
            </button>
            <button onClick={() => scrollToSection('discord')} className="px-4 py-2 hover:bg-white/5 rounded transition-colors text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">
              Discord
            </button>
            <button onClick={() => scrollToSection('youtube')} className="px-4 py-2 hover:bg-white/5 rounded transition-colors text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">
              Tutos
            </button>
            <button onClick={() => scrollToSection('faq')} className="px-4 py-2 hover:bg-white/5 rounded transition-colors text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">
              FAQ
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button className="bg-secondary hover:bg-secondary/90 text-black font-bold uppercase text-xs tracking-widest px-6 shadow-[0_0_15px_rgba(255,150,0,0.3)] hover:shadow-[0_0_25px_rgba(255,150,0,0.5)] transition-all" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Rejoindre
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80' : 'max-h-0'}`}>
          <div className="px-4 pb-4 space-y-2 border-t border-[#2E384D]">
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-3 hover:bg-white/5 rounded text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">
              À Propos
            </button>
            <button onClick={() => scrollToSection('discord')} className="block w-full text-left px-4 py-3 hover:bg-white/5 rounded text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">
              Discord
            </button>
            <button onClick={() => scrollToSection('youtube')} className="block w-full text-left px-4 py-3 hover:bg-white/5 rounded text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">
              Tutos
            </button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left px-4 py-3 hover:bg-white/5 rounded text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">
              FAQ
            </button>
            <a 
              href="https://discord.gg/3PWk4HmfNn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-secondary hover:bg-secondary/90 text-black font-bold uppercase text-sm tracking-widest rounded mt-2"
            >
              Rejoindre le Discord
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-16 md:py-24 lg:py-32 overflow-hidden flex items-center border-b border-[#2E384D]">
        <div className="absolute inset-0 z-0">
          <video 
            src={heroBg} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/50 to-transparent" />
        </div>

        <div className="container relative z-20 px-4">
          <motion.div 
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
              <img src={allianceLogo} alt="" className="w-14 h-14 md:w-16 md:h-16" />
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Bienvenue sur <br/>
                <span className="text-primary">Psykoverse</span>
              </h1>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
              Le point de rencontre de la communauté OGame francophone. 
              Retrouvez nos tutoriels vidéo, rejoignez notre Discord et participez à l'aventure sur les serveurs Hercules, Scorpius et bientôt le serveur Saison !
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold uppercase tracking-widest h-12 md:h-14 px-6 md:px-8 rounded shadow-lg" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 w-5 h-5" />
                  Rejoindre le Discord
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-[#2A3241] bg-[#13171F]/50 hover:bg-[#1C2230] text-white font-bold uppercase tracking-widest h-12 md:h-14 px-6 md:px-8 rounded" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 w-5 h-5 text-red-500" />
                  Chaîne YouTube
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-[#151924] border-b border-[#2E384D] relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { icon: Globe, color: "bg-secondary", title: "Pour les Curieux", desc: "Vous découvrez OGame ? Nous vous guidons pour comprendre les mécaniques de cet univers." },
              { icon: Users, color: "bg-primary", title: "Joueurs Occasionnels", desc: "Pas besoin d'être connecté 24/7. Échangez vos expériences dans une ambiance détendue." },
              { icon: Star, color: "bg-red-500", title: "Vétérans Passionnés", desc: "Débattez de la méta, optimisez vos comptes et partagez vos plus beaux combats." }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-[#1C2230] border border-[#2E384D] p-6 md:p-8 relative overflow-hidden group hover:border-primary/50 transition-all duration-300 rounded-lg"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <item.icon className="w-20 h-20" />
                </div>
                <div className={`w-1 h-8 ${item.color} rounded-full mb-4`}></div>
                <h3 className="font-display text-lg md:text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Discord Section */}
      <section id="discord" className="py-16 md:py-24 relative bg-[#111620] border-b border-[#2E384D] z-10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp}>
              <Monitor className="w-12 h-12 md:w-16 md:h-16 text-primary mx-auto mb-6 opacity-80" />
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Rejoignez le <span className="text-primary">Discord</span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-400 mb-8 max-w-xl mx-auto">
              On y parle d'OGame, on échange nos expériences, on partage des astuces et on prend plaisir à discuter du jeu dans une ambiance détendue.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold uppercase tracking-widest text-sm md:text-base h-14 md:h-16 px-8 md:px-12 rounded shadow-lg transition-transform hover:scale-105" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-3 w-5 h-5 md:w-6 md:h-6" />
                  Rejoindre la Communauté
                  <ExternalLink className="ml-2 w-4 h-4 opacity-60" />
                </a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm text-gray-500 font-mono uppercase">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> 180 Membres
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div> Actif
              </span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary"></div> Recrutement Ouvert
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className="py-16 md:py-20 bg-[#151924] relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row md:items-center justify-between mb-8 md:mb-12 gap-4">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Aperçu des Tutoriels</h2>
                <p className="text-gray-500 text-sm md:text-base">Apprenez les stratégies avec @7020Psykose</p>
              </div>
              <Button variant="outline" className="border-[#2E384D] hover:bg-white/5 text-primary w-fit" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                  Voir la chaîne
                  <ExternalLink className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              {[
                { href: "https://www.youtube.com/watch?v=uyxCLrgZ8mA", thumb: thumb1, tag: "Tutoriel", title: "Prise en retour d'attaque", desc: "Calculez le retour de flotte ennemi à la seconde près." },
                { href: "https://www.youtube.com/watch?v=aJt84QvLz8Y", thumb: thumb2, tag: "Stratégie", title: "Guide LifeForms", desc: "Optimisez vos bonus raciaux et boostez votre économie." },
                { href: "https://www.youtube.com/watch?v=nyhSBnkyG7A", thumb: thumb3, tag: "Combat", title: "Mécaniques de Combat", desc: "RapidFire, ordre de tir et composition de flotte." }
              ].map((video, i) => (
                <motion.a
                  key={i}
                  variants={fadeInUp}
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  data-testid={`video-card-${i}`}
                >
                  <div className="relative aspect-video bg-black border border-[#2E384D] overflow-hidden mb-3 rounded-lg shadow-xl group-hover:border-primary/50 transition-all duration-300">
                    <img src={video.thumb} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{video.tag}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg">
                        <Youtube className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-display text-base md:text-lg font-bold text-gray-200 group-hover:text-primary transition-colors mb-1">{video.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500">{video.desc}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Servers Section */}
      <section className="py-12 md:py-16 bg-[#111620] border-t border-[#2E384D] z-10 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">Alliance Active Sur</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {["HERCULES", "SCORPIUS"].map((server) => (
              <div key={server} className="px-6 md:px-8 py-3 md:py-4 bg-[#1C2230] border border-[#2E384D] rounded-lg hover:border-primary/50 transition-colors">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Univers</span>
                <span className="font-display text-xl md:text-2xl font-bold text-white">{server}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season Server Announcement */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-[#151924] to-[#1C2230] border-t border-[#2E384D] z-10">
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-8 md:mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1 rounded-full bg-red-600/20 border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
              Arrivée Imminente • 19 Décembre
            </motion.div>
            <motion.h2 variants={fadeInUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Nouveau Serveur de Saison
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-400 max-w-xl mx-auto">
              L'alliance Psykoverse sera présente. Une occasion idéale pour débuter ou reprendre l'aventure ensemble.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 max-w-4xl mx-auto mb-8 md:mb-12">
            {[
              { label: "Économie", value: "x8" },
              { label: "Flotte Hostile", value: "x6" },
              { label: "Recherche", value: "x16" },
              { label: "CDR", value: "80%" },
              { label: "Défense CDR", value: "50%" },
              { label: "Cases Bonus", value: "+25" },
              { label: "Galaxies", value: "6" },
              { label: "Conso Deut", value: "0.5" },
              { label: "Catégorie", value: "AGRESSIF" },
              { label: "AG/DG", value: "OUI" }
            ].map((stat, i) => (
              <div key={i} className="bg-[#151924]/80 border border-[#2E384D] p-3 md:p-4 text-center rounded-lg hover:border-primary/50 transition-colors">
                <div className="text-gray-500 text-[10px] md:text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="font-display text-lg md:text-xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-xs md:text-sm text-gray-500 mb-6 font-mono">AM: 10.000 • Deut dans CDR: OUI • Fret Sonde: NON</p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest px-6 md:px-8 shadow-[0_0_20px_rgba(220,38,38,0.4)]" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Rejoindre le Projet
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-20 bg-[#151924] border-t border-[#2E384D] z-10 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="font-display text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Questions Fréquentes
            </motion.h2>
            
            <motion.div variants={fadeInUp} className="max-w-2xl mx-auto space-y-3">
              <FAQItem question="Comment rejoindre la communauté ?">
                <p className="mb-3">Rejoignez notre serveur Discord pour échanger avec les autres membres, poser vos questions et participer aux événements.</p>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono text-sm inline-flex items-center gap-2">
                  discord.gg/3PWk4HmfNn <ExternalLink className="w-3 h-3" />
                </a>
              </FAQItem>

              <FAQItem question="Où trouver les tutoriels vidéo ?">
                <p className="mb-3">Tous les tutoriels sont disponibles sur la chaîne YouTube @7020Psykose. Abonnez-vous pour ne rien manquer !</p>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-mono text-sm inline-flex items-center gap-2">
                  youtube.com/@7020Psykose <ExternalLink className="w-3 h-3" />
                </a>
              </FAQItem>

              <FAQItem question="L'alliance recrute-t-elle ?">
                <p>Oui ! Psykoverse est ouverte à tous les joueurs, débutants comme confirmés. Rejoignez le Discord et présentez-vous, nous serons ravis de vous accueillir.</p>
              </FAQItem>

              <FAQItem question="Comment obtenir de l'aide ?">
                <p>Sur le Discord, rendez-vous dans le salon de support <span className="text-primary font-medium">❓┆𝐃𝐞𝐦𝐚𝐧𝐝𝐞𝐬</span> pour poser vos questions. Un membre de la communauté vous répondra rapidement.</p>
              </FAQItem>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 bg-[#0B0E14] border-t border-[#2E384D] text-center relative z-10">
        <div className="container mx-auto px-4">
          <img src={allianceLogo} alt="Logo" className="h-10 w-10 mx-auto mb-4 opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-300" />
          <p className="text-gray-600 text-xs md:text-sm mb-4">© 2025 Psykoverse Community. Fan project non affilié à Gameforge.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions Légales
            </Link>
            <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord</a>
            <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

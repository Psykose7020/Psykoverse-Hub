import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Users, 
  Youtube, 
  MessageSquare, 
  ChevronRight, 
  Shield, 
  Target, 
  Zap,
  Star,
  Globe,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Assets
import heroBg from "@assets/generated_videos/cinematic_ogame_fleet_travel.mp4";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";
import thumb1 from "@assets/generated_images/sci-fi_hud_tutorial_thumbnail.png";
import thumb2 from "@assets/generated_images/spaceship_fleet_tactical_view_thumbnail.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground overflow-x-hidden bg-background relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 space-bg opacity-30 pointer-events-none z-0"></div>
      
      {/* Massive Background Logo Blend */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none z-0">
         <img src={allianceLogo} alt="" className="w-full h-full object-contain animate-[spin_120s_linear_infinite]" />
      </div>

      {/* OGame-style Top Bar */}
      <div className="h-10 bg-[#151924] border-b border-[#2E384D] flex items-center justify-between px-4 text-xs font-mono uppercase tracking-wider text-muted-foreground z-50 relative">
        <div className="flex items-center gap-4">
          <span className="text-primary">Univers: Psykoverse</span>
          <span>Abonnés YouTube: 340</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/support">
            <a className="hover:text-white cursor-pointer transition-colors">Support</a>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 w-full z-40 border-b border-[#2E384D] bg-[#1C2230]/90 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img src={allianceLogo} alt="Psykoverse Logo" className="h-14 w-14 relative z-10 logo-float drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl leading-none tracking-wide text-white group-hover:text-primary transition-colors">
                PSYKOVERSE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Alliance Officielle</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-1">
            <a href="#about" className="px-4 py-2 hover:bg-white/5 rounded-sm transition-colors text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">À Propos</a>
            <a href="#youtube" className="px-4 py-2 hover:bg-white/5 rounded-sm transition-colors text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">Tutos</a>
            <a href="#discord" className="px-4 py-2 hover:bg-white/5 rounded-sm transition-colors text-sm font-bold uppercase tracking-wide text-gray-300 hover:text-white">Communauté</a>
          </div>

          <Button className="bg-secondary hover:bg-secondary/90 text-black font-bold uppercase text-xs tracking-widest px-6 shadow-[0_0_15px_rgba(255,150,0,0.3)] hover:shadow-[0_0_25px_rgba(255,150,0,0.5)] transition-all" asChild>
            <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
              Rejoindre
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section - Classic OGame "Galaxy View" feel */}
      <header className="relative py-24 lg:py-32 overflow-hidden flex items-center border-b border-[#2E384D]">
        <div className="absolute inset-0 z-0">
          <video 
            src={heroBg} 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-30 saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          {/* Scanlines effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none" />
        </div>

        <div className="container relative z-20 px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={allianceLogo} alt="" className="w-16 h-16 opacity-80 animate-pulse" />
                <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight">
                  LE PORTAIL DE <br/>
                  <span className="text-primary text-glow">LA COMMUNAUTÉ</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-gray-400 mb-8 border-l-4 border-primary pl-6 py-2 bg-gradient-to-r from-primary/10 to-transparent">
                Bienvenue sur la page web officielle de la communauté Psykoverse. Ici, vous retrouverez toutes les dernières vidéos, les actualités de l'alliance et les informations mises à jour en temps réel.
                <br/><br/>
                Notre Discord est le point de rencontre de la communauté de la chaîne YouTube. On y parle d’OGame, on échange nos expériences et on partage des astuces dans une ambiance détendue.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-black font-display font-bold uppercase tracking-widest h-14 px-8 rounded-sm shadow-[0_0_15px_rgba(0,191,255,0.3)]" asChild>
                  <a href="#discord">
                    <MessageSquare className="mr-2 w-5 h-5" />
                    Rejoindre le Discord
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-[#2A3241] bg-[#13171F]/50 hover:bg-[#13171F] text-white font-display font-bold uppercase tracking-widest h-14 px-8 rounded-sm backdrop-blur-sm" asChild>
                  <a href="#youtube">
                    <Youtube className="mr-2 w-5 h-5 text-red-500" />
                    Chaîne YouTube
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Welcome Section - "Tech Panel" Style */}
      <section id="about" className="py-20 bg-[#151924] border-b border-[#2E384D] relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#1C2230] border border-[#2E384D] p-8 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe className="w-24 h-24" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-secondary block"></span>
                POUR LES CURIEUX
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Ici, tout le monde est le bienvenu. Vous découvrez OGame ? Nous vous guidons pas à pas pour comprendre les mécaniques complexes de cet univers impitoyable.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1C2230] border border-[#2E384D] p-8 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-24 h-24" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary block"></span>
                JOUEURS OCCASIONNELS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Pas besoin d'être connecté 24/7. Échangez vos expériences et trouvez des stratégies adaptées à votre temps de jeu dans une ambiance détendue.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1C2230] border border-[#2E384D] p-8 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-lg">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Star className="w-24 h-24" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-red-500 block"></span>
                PASSIONNÉS VÉTÉRANS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Pour les experts de longue date, c'est le lieu idéal pour débattre de la méta, optimiser vos comptes et partager vos plus beaux combats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section - "Data Logs" Style */}
      <section id="youtube" className="py-20 bg-[#111620] relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-white mb-2">ARCHIVES VIDÉO</h2>
              <p className="text-gray-500">Derniers rapports de transmission @7020Psykose</p>
            </div>
            <Button variant="outline" className="hidden md:flex border-[#2E384D] hover:bg-white/5 text-primary" asChild>
              <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                ACCÉDER À LA CHAÎNE
              </a>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a href="https://www.youtube.com/watch?v=uyxCLrgZ8mA" target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
              <div className="relative aspect-video bg-black border border-[#2E384D] overflow-hidden mb-4 shadow-xl">
                <img src={thumb1} alt="Tuto 1" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-2 inline-block">Tutoriel</div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <Youtube className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-200 group-hover:text-primary transition-colors">Prise en retour d'attaque</h3>
              <p className="text-sm text-gray-500 mt-2">
                Maîtrisez l'art de l'interception. Apprenez à calculer le retour de flotte ennemi à la seconde près pour transformer une attaque adverse en champ de débris.
              </p>
            </a>

            <a href="https://www.youtube.com/watch?v=aJt84QvLz8Y" target="_blank" rel="noopener noreferrer" className="group cursor-pointer block">
              <div className="relative aspect-video bg-black border border-[#2E384D] overflow-hidden mb-4 shadow-xl">
                <img src={thumb2} alt="Tuto 2" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider mb-2 inline-block">Stratégie</div>
                </div>
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                    <Youtube className="w-8 h-8 text-white fill-current" />
                  </div>
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-200 group-hover:text-primary transition-colors">Guide LifeForms</h3>
              <p className="text-sm text-gray-500 mt-2">
                Les formes de vie changent tout. Découvrez comment optimiser vos bonus raciaux et booster votre économie grâce à la mise à jour Lifeforms.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Discord CTA - "Join the Fleet" Style */}
      <section id="discord" className="py-24 relative bg-[#151924] border-t border-[#2E384D] z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#1C2230] to-[#151924] border border-[#2E384D] p-12 rounded-lg relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50"></div>
            
            <Monitor className="w-16 h-16 text-primary mx-auto mb-6 opacity-80" />
            
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              REJOIGNEZ LE <span className="text-primary">DISCORD</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              "On y parle d’OGame, on échange nos expériences, on partage des astuces et on prend plaisir à discuter du jeu dans une ambiance détendue."
            </p>
            
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-display font-bold uppercase tracking-widest text-lg h-16 px-12 rounded shadow-lg transition-all transform hover:scale-105" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-3 w-6 h-6" />
                Rejoindre la Communauté
              </a>
            </Button>

            <div className="mt-8 flex justify-center gap-8 text-sm text-gray-500 font-mono uppercase">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> 180 Membres</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary"></div> Actif</span>
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div> Recrutement Ouvert</span>
            </div>
          </div>
        </div>
      </section>

      {/* Alliance Servers Info - Moved above New Server Teaser */}
      <section className="py-16 bg-[#151924] border-t border-[#2E384D] z-10 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-8 flex items-center justify-center gap-3">
            <span className="w-8 h-[2px] bg-primary"></span>
            ALLIANCE ACTIVE SUR
            <span className="w-8 h-[2px] bg-primary"></span>
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="px-8 py-4 bg-[#1C2230] border border-[#2E384D] rounded hover:border-primary/50 transition-colors shadow-lg">
              <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Univers</span>
              <span className="font-display text-2xl font-bold text-white">HERCULES</span>
            </div>
            <div className="px-8 py-4 bg-[#1C2230] border border-[#2E384D] rounded hover:border-primary/50 transition-colors shadow-lg">
              <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Univers</span>
              <span className="font-display text-2xl font-bold text-white">SCORPIUS</span>
            </div>
          </div>
        </div>
      </section>

      {/* New Server Teaser */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#151924] to-[#1C2230] border-t border-[#2E384D] z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full bg-red-600/20 border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-widest mb-4 animate-pulse">
              Arrivée Imminente • 19 Décembre
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              NOUVEAU SERVEUR DE SAISON
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              L'alliance Psykoverse sera présente sur ce nouveau serveur. Une occasion idéale pour débuter ou reprendre l'aventure ensemble.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
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
              <div key={i} className="bg-[#151924]/80 border border-[#2E384D] p-4 text-center rounded hover:border-primary/50 transition-colors shadow-md">
                <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="font-display text-xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
             <p className="text-sm text-gray-500 mb-6 font-mono">AM à l'activation: 10.000 • Deut dans CDR: OUI • Fret Sonde: NON</p>
             <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-display font-bold uppercase tracking-widest px-8 shadow-[0_0_20px_rgba(220,38,38,0.4)]" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Rejoindre le Projet
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - "Game Credits" Style */}
      <footer className="py-12 bg-[#111620] border-t border-[#2E384D] text-center relative z-10">
        <div className="container mx-auto px-4">
          <img src={allianceLogo} alt="Logo" className="h-12 w-12 mx-auto mb-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
          <p className="text-gray-500 text-sm mb-4">© 2025 Psykoverse Community. Fan project non affilié à Gameforge.</p>
          <div className="flex justify-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-wider">
            <a href="#" className="hover:text-primary transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-primary transition-colors">Règlement</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

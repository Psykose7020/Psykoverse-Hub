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
  Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Assets
import heroBg from "@assets/generated_images/epic_space_battle_scene_with_nebula_background.png";
import allianceLogo from "@assets/generated_images/psykoverse_alliance_futuristic_emblem_logo.png";
import thumb1 from "@assets/generated_images/sci-fi_hud_tutorial_thumbnail.png";
import thumb2 from "@assets/generated_images/spaceship_fleet_tactical_view_thumbnail.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={allianceLogo} alt="Psykoverse Logo" className="h-8 w-8 animate-pulse" />
            <span className="font-display font-bold text-xl tracking-wider text-primary text-glow">
              PSYKOVERSE
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-muted-foreground">
            <a href="#alliance" className="hover:text-primary transition-colors">Alliance</a>
            <a href="#youtube" className="hover:text-primary transition-colors">Tutoriels</a>
            <a href="#discord" className="hover:text-primary transition-colors">Communauté</a>
          </div>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/20 font-display tracking-widest uppercase text-xs" asChild>
            <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="w-4 h-4 mr-2" />
              Rejoindre
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Space Battle" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              <Zap className="w-3 h-3" />
              Domination Galactique
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              PSYKOVERSE
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light">
              Rejoignez l'élite stratégique. Conquérez l'univers, maîtrisez l'économie, et écrasez vos rivaux avec l'alliance la plus redoutable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-display uppercase tracking-widest text-lg h-14 px-8 shadow-[0_0_20px_rgba(147,51,234,0.5)] border border-primary/50" asChild>
                <a href="#discord">
                  Rejoindre le Discord <ChevronRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 hover:bg-white/10 text-foreground font-display uppercase tracking-widest text-lg h-14 px-8 backdrop-blur-sm" asChild>
                <a href="#youtube">
                  <Youtube className="mr-2 w-5 h-5" />
                  Voir les Tutos
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Alliance Stats / Features */}
      <section id="alliance" className="py-24 relative bg-background border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-2xl rounded-full" />
              <img 
                src={allianceLogo} 
                alt="Psykoverse Emblem" 
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
              />
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-glow">
                L'ALLIANCE <span className="text-primary">SUPRÊME</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Psykoverse n'est pas juste une alliance, c'est une force de frappe coordonnée. Nous dominons les classements grâce à une stratégie militaire implacable et une économie optimisée.
              </p>
              
              <div className="grid gap-6">
                {[
                  { icon: Shield, title: "Défense Collective", desc: "Système de phalange et d'interception partagé." },
                  { icon: Target, title: "Raids Coordonnés", desc: "Attaques synchronisées à la seconde près." },
                  { icon: Rocket, title: "Expansion Rapide", desc: "Aide au développement pour les nouveaux membres." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section id="youtube" className="py-24 bg-card/30 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              ACADÉMIE <span className="text-secondary">SPATIALE</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Apprenez les secrets du jeu avec @7020Psykose. Des tutoriels avancés pour maîtriser chaque aspect de votre empire.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-black/40 border-primary/20 overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={thumb1} 
                  alt="Tuto 1" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Youtube className="w-16 h-16 text-red-500 fill-current" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Optimisation des Ressources & Mines
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Découvrez comment maximiser votre production horaire et rentabiliser vos mines de cristal plus rapidement que vos voisins.
                </p>
                <Button variant="link" className="p-0 text-secondary h-auto font-bold uppercase tracking-wider text-xs" asChild>
                  <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                    Regarder sur YouTube <ChevronRight className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-primary/20 overflow-hidden group hover:border-primary/50 transition-colors">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={thumb2} 
                  alt="Tuto 2" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Youtube className="w-16 h-16 text-red-500 fill-current" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Stratégies de Flotte Avancées
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Comment composer la flotte parfaite ? Analyse des ratios Chasseurs Légers / Croiseurs pour écraser n'importe quelle défense.
                </p>
                <Button variant="link" className="p-0 text-secondary h-auto font-bold uppercase tracking-wider text-xs" asChild>
                  <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                    Regarder sur YouTube <ChevronRight className="w-3 h-3 ml-1" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-display uppercase tracking-widest px-8" asChild>
              <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                <Youtube className="mr-2 w-5 h-5" />
                S'abonner à la chaîne
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Discord CTA */}
      <section id="discord" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30" />
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-black/50 backdrop-blur-xl border border-primary/30 p-12 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.2)]">
            <Users className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              REJOIGNEZ LE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">QG PSYKOVERSE</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Notre Discord est le cœur de l'alliance. Stratégies en temps réel, alertes d'attaques, et entraide communautaire. Ne jouez plus seul.
            </p>
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-display uppercase tracking-widest text-lg h-16 px-10 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-3 w-6 h-6" />
                Rejoindre le Discord
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/80 border-t border-white/10 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p className="mb-2">© 2025 Psykoverse Alliance. Tous droits réservés.</p>
          <p className="flex items-center justify-center gap-4">
            <a href="https://www.youtube.com/@7020Psykose" className="hover:text-white transition-colors">YouTube</a>
            <span>•</span>
            <a href="https://discord.gg/3PWk4HmfNn" className="hover:text-white transition-colors">Discord</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

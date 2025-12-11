import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Shield, Menu, X, BookOpen, Globe, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";
import { useYoutubeStats } from "@/hooks/useYoutubeStats";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/tutoriels", label: "Tutoriels", icon: BookOpen },
  { href: "/alliance", label: "Où nous trouver", icon: Globe },
  { href: "/projets", label: "Projets", icon: Rocket },
  { href: "/support", label: "Support", icon: Shield, highlight: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const youtubeSubscribers = useYoutubeStats();

  return (
    <>
      <div className="h-8 bg-[#0B0E14] border-b border-white/5 flex items-center justify-between px-4 text-[10px] font-mono uppercase tracking-widest text-gray-500 z-50 relative">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 text-gray-400">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
            En ligne
          </span>
          <span className="hidden sm:inline">{youtubeSubscribers ?? "..."} Abonnés YouTube</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-gray-600">V2.0</span>
        </div>
      </div>

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
          
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded transition-colors text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : link.highlight
                      ? "text-primary hover:bg-primary/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:block">
            <Button className="bg-secondary hover:bg-secondary/90 text-black font-bold uppercase text-xs tracking-widest px-6 shadow-[0_0_15px_rgba(255,150,0,0.3)] hover:shadow-[0_0_25px_rgba(255,150,0,0.5)] transition-all" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Rejoindre
              </a>
            </Button>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            data-testid="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="px-4 pb-4 space-y-2 border-t border-[#2E384D]">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 w-full px-4 py-3 rounded text-sm font-bold uppercase tracking-wide ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : link.highlight
                      ? "text-primary hover:bg-primary/10"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {link.label}
                </Link>
              );
            })}
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
    </>
  );
}

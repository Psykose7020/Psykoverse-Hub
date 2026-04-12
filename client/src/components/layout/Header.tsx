import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Beer, Wrench, BookOpen, House, Shield, History, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";
import { useYoutubeStats } from "@/hooks/useYoutubeStats";
import { toolGuideCount, totalGuideCount } from "@/data/guides";

const navLinks = [
  { href: "/", label: "Accueil", icon: House },
  { href: "/tutoriels", label: "Tutoriels", icon: BookOpen },
  { href: "/tutoriels#outils", label: "Outils", icon: Wrench },
  { href: "/alliance", label: "Univers", icon: Orbit },
  { href: "/notre-histoire", label: "Notre Histoire", icon: History },
  { href: "/support", label: "Support", icon: Shield, highlight: true },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const youtubeSubscribers = useYoutubeStats();

  const handleToolsNavigation = () => {
    if (location === "/tutoriels") {
      window.history.replaceState({}, "", "/tutoriels#outils");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      setMobileMenuOpen(false);
      return;
    }

    navigate("/tutoriels#outils");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="relative z-50 border-b border-cyan-400/10 bg-[linear-gradient(180deg,#060910,#0b0e14)]">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent" />
        <div className="h-9 flex items-center justify-between px-4 text-[10px] font-mono uppercase tracking-[0.26em] text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
              Noyau actif
            </span>
            <span className="hidden sm:inline text-gray-500">Canal YT: {youtubeSubscribers ?? "..."}</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-gray-500">Base: {totalGuideCount}</span>
            <span className="hidden md:inline text-gray-700">|</span>
            <span className="hidden md:inline text-gray-500">Outils: {toolGuideCount}</span>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 w-full z-40 border-b border-cyan-400/10 bg-[linear-gradient(180deg,rgba(18,23,34,0.96),rgba(10,14,22,0.96))] backdrop-blur-md shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent" />
        <div className="container mx-auto px-4 py-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] xl:grid-cols-[260px_minmax(0,1fr)_auto] items-center gap-3">
            <Link href="/" className="group relative flex items-center gap-3 overflow-hidden rounded-[1.35rem] border border-cyan-400/12 bg-[linear-gradient(135deg,rgba(12,17,26,0.96),rgba(20,28,41,0.96))] px-4 py-3">
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-cyan-200/40 to-transparent" />
              <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-cyan-300/10 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="absolute -inset-2 rounded-full border border-cyan-300/12" />
                <div className="absolute -inset-3 rounded-full border border-cyan-300/8 animate-pulse" />
                <img src={allianceLogo} alt="Psykoverse Logo" className="h-10 w-auto md:h-12 relative z-10 object-contain drop-shadow-[0_0_14px_rgba(0,191,255,0.45)]" />
              </div>
              <div className="relative flex flex-col min-w-0">
                <span className="font-display font-bold text-lg md:text-xl leading-none tracking-[0.16em] text-white group-hover:text-cyan-200 transition-colors">
                  PSYKOVERSE
                </span>
              </div>
            </Link>
          
            <div className="hidden xl:grid grid-cols-6 gap-2 rounded-[1.6rem] border border-cyan-400/10 bg-[linear-gradient(180deg,rgba(10,14,22,0.96),rgba(16,23,34,0.96))] p-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isToolsLink = link.href === "/tutoriels#outils";
                const isActive = isToolsLink ? location === "/tutoriels" : location === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={isToolsLink ? handleToolsNavigation : () => navigate(link.href)}
                    className={`group relative overflow-hidden rounded-[1rem] border px-3 py-2.5 text-left transition-all ${
                      isActive
                        ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[inset_0_0_18px_rgba(103,232,249,0.08)]"
                        : link.highlight
                        ? "border-cyan-400/12 text-cyan-300 hover:border-cyan-300/22 hover:bg-cyan-300/6"
                        : "border-white/6 text-gray-300 hover:border-cyan-300/16 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-[0.18em] font-bold truncate">{link.label}</div>
                        <div className="text-[9px] uppercase tracking-[0.16em] text-gray-500 group-hover:text-gray-400">
                          {link.label === "Accueil" ? "Hub central" : link.label === "Tutoriels" ? "Base savoir" : link.label === "Outils" ? "Accès direct" : link.label === "Univers" ? "Secteurs" : link.label === "Notre Histoire" ? "Archives" : "Assistance"}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="hidden xl:flex items-center justify-end gap-2">
              <Link 
                href="/soutenir"
                className="group relative flex items-center gap-2 rounded-[1.15rem] border border-amber-300/25 bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-3 text-black font-bold text-xs uppercase tracking-[0.16em] shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(245,158,11,0.55)]"
              >
                <Beer className="w-4 h-4 group-hover:animate-bounce" />
                Soutenir
              </Link>
              <Button className="h-auto rounded-[1.15rem] bg-secondary hover:bg-secondary/90 text-black font-bold uppercase text-xs tracking-[0.16em] px-5 py-3 shadow-[0_0_15px_rgba(255,150,0,0.3)] hover:shadow-[0_0_25px_rgba(255,150,0,0.5)] transition-all" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  Rejoindre
                </a>
              </Button>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden justify-self-end rounded-xl border border-cyan-400/10 bg-[#121925] p-2.5 text-gray-300 hover:text-white transition-colors"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className={`xl:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="px-4 pb-4 space-y-2 border-t border-cyan-400/10 bg-[linear-gradient(180deg,rgba(12,17,26,0.98),rgba(10,14,22,0.98))]">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isToolsLink = link.href === "/tutoriels#outils";
              const isActive = isToolsLink ? location === "/tutoriels" : location === link.href;
              return (
                <button
                  key={link.href}
                  onClick={isToolsLink ? handleToolsNavigation : () => { navigate(link.href); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wide ${
                    isActive
                      ? "bg-primary/20 text-primary border border-primary/20"
                      : link.highlight
                      ? "text-primary hover:bg-primary/10 border border-transparent"
                      : "text-gray-300 hover:text-white hover:bg-white/5 border border-white/6"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </button>
              );
            })}
            <Link 
              href="/soutenir"
              className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold uppercase text-sm tracking-widest rounded-xl mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Beer className="w-5 h-5" />
              Soutenir le projet
            </Link>
            <a 
              href="https://discord.gg/3PWk4HmfNn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-secondary hover:bg-secondary/90 text-black font-bold uppercase text-sm tracking-widest rounded-xl mt-2"
            >
              Rejoindre le Discord
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

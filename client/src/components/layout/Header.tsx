import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Wrench, BookOpen, House, Shield, History, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";
import { toolGuideCount, totalGuideCount } from "@/data/guides";

const navLinks = [
  { href: "/", label: "Accueil", icon: House },
  { href: "/tutoriels", label: "Tutoriels", icon: BookOpen },
  { href: "/tutoriels#outils", label: "Outils", icon: Wrench },
  { href: "/alliance", label: "Univers", icon: Orbit },
  { href: "/notre-histoire", label: "Histoire", icon: History },
  { href: "/support", label: "Support", icon: Shield },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  const handleToolsNavigation = () => {
    if (location === "/tutoriels") {
      window.history.replaceState({}, "", "/tutoriels#outils");
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else {
      navigate("/tutoriels#outils");
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="border-b border-white/6 bg-black/20">
        <div className="container mx-auto flex h-9 items-center justify-between px-4 text-[11px] text-gray-500">
          <span>Bibliothèque OGame francophone</span>
          <div className="flex items-center gap-4">
            <span>{totalGuideCount} guides</span>
            <span>{toolGuideCount} outils</span>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(10,14,22,0.88)] backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-18 items-center justify-between gap-4 py-3">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <img src={allianceLogo} alt="Psykoverse Logo" className="h-11 w-11 rounded-xl border border-white/8 bg-white/5 p-1.5 object-contain" />
              <div className="min-w-0">
                <div className="font-display text-lg font-semibold tracking-[0.14em] text-white">
                  PSYKOVERSE
                </div>
                <div className="text-xs text-gray-500">
                  Guides, outils et archives OGame
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] p-1 lg:flex">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isToolsLink = link.href === "/tutoriels#outils";
                const isActive = isToolsLink ? location === "/tutoriels" : location === link.href;

                return (
                  <button
                    key={link.href}
                    onClick={isToolsLink ? handleToolsNavigation : () => navigate(link.href)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-white text-black"
                        : "text-gray-300 hover:bg-white/6 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/soutenir"
                className="rounded-full border border-amber-400/30 px-4 py-2 text-sm text-amber-300 transition-colors hover:bg-amber-400/10"
              >
                Soutenir
              </Link>
              <Button className="rounded-full bg-primary px-5 text-black hover:bg-primary/90" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  Discord
                </a>
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-gray-300 transition-colors hover:text-white lg:hidden"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className={`overflow-hidden border-t border-white/6 bg-[rgba(10,14,22,0.96)] transition-all duration-300 lg:hidden ${mobileMenuOpen ? "max-h-[420px]" : "max-h-0 border-t-transparent"}`}>
          <div className="container mx-auto space-y-2 px-4 py-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isToolsLink = link.href === "/tutoriels#outils";
              const isActive = isToolsLink ? location === "/tutoriels" : location === link.href;

              return (
                <button
                  key={link.href}
                  onClick={isToolsLink ? handleToolsNavigation : () => {
                    navigate(link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm ${
                    isActive ? "bg-white text-black" : "text-gray-300 hover:bg-white/6 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </button>
              );
            })}

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href="/soutenir"
                className="rounded-xl border border-amber-400/30 px-4 py-3 text-center text-sm text-amber-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Soutenir
              </Link>
              <a
                href="https://discord.gg/3PWk4HmfNn"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-primary px-4 py-3 text-center text-sm font-medium text-black"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

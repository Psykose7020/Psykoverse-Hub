import { Link } from "wouter";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";
import { featuredGuideCount, toolGuideCount, totalGuideCount } from "@/data/guides";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/8 bg-[rgba(8,12,19,0.9)] py-10 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/8 bg-white/[0.03] px-6 py-8 text-center">
          <img src={allianceLogo} alt="Logo" className="mx-auto mb-4 h-10 w-10 rounded-xl border border-white/8 bg-white/5 p-1 opacity-70" />
          <p className="mb-4 text-sm text-gray-500">© {currentYear} Psykoverse Community. Fan project non affilié à Gameforge.</p>
          <div className="mb-5 flex flex-wrap justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gray-400">
            <span className="rounded-full border border-white/8 bg-black/20 px-3 py-1">{totalGuideCount} guides</span>
            <span className="rounded-full border border-white/8 bg-black/20 px-3 py-1">{toolGuideCount} outils</span>
            <span className="rounded-full border border-white/8 bg-black/20 px-3 py-1">{featuredGuideCount} recommandations</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="/notre-histoire" className="transition-colors hover:text-white">Notre Histoire</Link>
            <Link href="/mentions-legales" className="transition-colors hover:text-white">
              Mentions légales
            </Link>
            <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Discord</a>
            <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">YouTube</a>
            <Link href="/soutenir" className="transition-colors hover:text-amber-300">Soutenir</Link>
          </div>
          <div className="mt-6 border-t border-white/6 pt-4">
            <Link
              href="/admin"
              className="text-[10px] text-gray-600 transition-colors hover:text-gray-400"
              data-testid="link-admin"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

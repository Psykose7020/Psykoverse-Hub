import { Link } from "wouter";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";

export default function Footer() {
  return (
    <footer className="py-10 md:py-12 bg-[#0B0E14] border-t border-[#2E384D] text-center relative z-10">
      <div className="container mx-auto px-4">
        <img src={allianceLogo} alt="Logo" className="h-10 w-10 mx-auto mb-4 opacity-40 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-300" />
        <p className="text-gray-600 text-xs md:text-sm mb-4">© 2025 Psykoverse Community. Fan project non affilié à Gameforge.</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider">
          <Link href="/notre-histoire" className="hover:text-primary transition-colors">Notre Histoire</Link>
          <Link href="/mentions-legales" className="hover:text-primary transition-colors">
            Mentions Légales
          </Link>
          <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord</a>
          <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube</a>
          <Link href="/soutenir" className="hover:text-yellow-500 transition-colors">🍺 Soutenir</Link>
        </div>
        <div className="mt-8 pt-4 border-t border-[#2E384D]/30">
          <Link 
            href="/admin" 
            className="text-[10px] text-gray-600 hover:text-gray-400 transition-colors"
            data-testid="link-admin"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

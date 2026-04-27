import { Link } from "wouter";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";
import { featuredGuideCount, toolGuideCount, totalGuideCount } from "@/data/guides";

const footerLinkClass = "text-sm text-gray-400 transition-colors hover:text-white";
const footerExternalLinkClass = "text-sm text-gray-400 transition-colors hover:text-primary";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerStats = [
    `${totalGuideCount} guides`,
    `${toolGuideCount} outils`,
    `${featuredGuideCount} recommandations`,
  ];

  return (
    <footer className="relative z-10 border-t border-white/8 bg-[rgba(8,12,19,0.9)] py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.5fr_1fr_1fr] md:items-start">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src={allianceLogo} alt="Psykoverse" className="h-11 w-11 rounded-xl border border-white/8 bg-white/5 p-1.5 opacity-80" />
              <div>
                <p className="font-display text-lg font-semibold text-white">Psykoverse</p>
                <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Projet communautaire OGame</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-gray-500">
              © {currentYear} Psykoverse Community. Fan project indépendant, non affilié à Gameforge.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
              {footerStats.map((item, index) => (
                <span key={item} className="flex items-center gap-2">
                  {index > 0 && <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />}
                  {item}
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="Liens du site">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-600">Site</p>
            <div className="flex flex-col gap-2">
              <Link href="/notre-histoire" className={footerLinkClass}>
                Notre histoire
              </Link>
              <Link href="/soutenir" className={footerLinkClass}>
                Soutenir
              </Link>
              <Link href="/mentions-legales" className={footerLinkClass}>
                Mentions légales
              </Link>
            </div>
          </nav>

          <nav aria-label="Liens communautaires">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-gray-600">Communauté</p>
            <div className="flex flex-col gap-2">
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" className={footerExternalLinkClass}>
                Discord
              </a>
              <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" className={footerExternalLinkClass}>
                YouTube
              </a>
            </div>
          </nav>
        </div>

        <div className="mx-auto mt-8 max-w-5xl border-t border-white/6 pt-4 text-right">
          <Link
            href="/admin"
            className="text-[10px] text-gray-600 transition-colors hover:text-gray-400"
            data-testid="link-admin"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

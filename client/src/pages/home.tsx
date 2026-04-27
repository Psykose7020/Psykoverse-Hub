import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  Youtube,
  MessageSquare,
  BookOpen,
  ExternalLink,
  Gamepad2,
  Eye,
  ChevronRight,
  Heart,
  Archive,
  Wrench,
  Scale,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import SpaceGame from "@/components/SpaceGame";
import { useYoutubeStats } from "@/hooks/useYoutubeStats";
import { useDiscordStats } from "@/hooks/useDiscordStats";
import {
  beginnerGuideCount,
  featuredGuideCount,
  guidesBySlug,
  rulesGuideCount,
  toolGuideCount,
  totalGuideCount,
} from "@/data/guides";
import allianceLogo from "@assets/Design_sans_titre_(2)_1765292527261.png";
import heroBg from "@assets/generated_videos/specific_ogame_destroyer_fleet_formation.mp4";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const youtubeSubscribers = useYoutubeStats();
  const discordMembers = useDiscordStats();

  const { data: visitData } = useQuery<{ total: number }>({
    queryKey: ["/api/visits/total"],
    queryFn: async () => {
      const res = await fetch("/api/visits/total");
      if (!res.ok) return { total: 0 };
      return res.json();
    },
    staleTime: 60000,
  });
  const totalVisits = visitData?.total || 0;

  const { data: popularGuidesData } = useQuery<{ slug: string; views: number }[]>({
    queryKey: ["/api/guides/popular"],
    queryFn: async () => {
      const res = await fetch("/api/guides/popular");
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 60000,
  });

  const spotlightGuides = (popularGuidesData || [])
    .map((item) => guidesBySlug[item.slug])
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Layout>
      <section className="border-b border-white/8 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mx-auto max-w-5xl"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(18,24,35,0.92),rgba(12,16,24,0.86))]">
              <div className="absolute inset-0">
                <video
                  src={heroBg}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover opacity-45"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,18,0.32),rgba(7,11,18,0.78))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,199,255,0.18),transparent_38%)]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b1018] to-transparent" />
              </div>

              <div className="relative p-8 md:p-12">
                <div className="mb-8 flex justify-center">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3 backdrop-blur-sm">
                    <img src={allianceLogo} alt="Psykoverse" className="h-16 w-16 object-contain md:h-20 md:w-20" />
                  </div>
                </div>

                <div className="mx-auto max-w-3xl text-center">
                  <p className="mb-4 text-sm uppercase tracking-[0.28em] text-primary/90">
                    Communauté OGame francophone
                  </p>
                  <h1 className="font-display text-4xl font-bold text-white md:text-6xl">
                    Une base propre pour apprendre, retrouver et transmettre
                  </h1>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300 md:text-lg">
                    Psykoverse rassemble guides, outils et archives utiles sans surcharge. L’idée reste simple :
                    retrouver vite la bonne ressource et aller droit au concret.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button size="lg" className="rounded-full bg-primary px-6 text-black shadow-[0_10px_30px_rgba(82,199,255,0.22)] hover:bg-primary/90" asChild>
                    <Link href="/tutoriels" data-testid="btn-tutorials-hero">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Explorer les tutoriels
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full border-white/14 bg-black/20 px-6 text-white backdrop-blur-sm hover:bg-white/10" asChild>
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord-hero">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Rejoindre le Discord
                    </a>
                  </Button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    `${totalGuideCount} guides`,
                    `${toolGuideCount} outils`,
                    `${featuredGuideCount} recommandations`,
                    totalVisits > 0 ? `${totalVisits.toLocaleString()} visites` : `${beginnerGuideCount} guides débutant`,
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-center text-sm text-gray-200 backdrop-blur-sm">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/8 py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.05] px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 text-sm text-amber-100">
              <Archive className="h-4 w-4 text-amber-300" />
              <span>
                Projet en maintenance, contenu préservé, améliorations progressives.
              </span>
            </div>
            <Link href="/notre-histoire" className="inline-flex items-center gap-2 text-sm text-amber-300 transition-colors hover:text-amber-200">
              Lire le contexte <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">Entrées principales</p>
                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Les accès les plus utiles du site
                </h2>
              </div>
              <Link href="/tutoriels" className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
                Voir toute la bibliothèque <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Link href="/journal-banni" data-testid="link-journal-home">
                <div className="group h-full rounded-3xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-red-400/35 hover:bg-white/[0.05]">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="rounded-2xl bg-red-500/12 p-3 text-red-300">
                      <BookMarked className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-red-300/80">Récit</p>
                      <h3 className="font-display text-2xl font-semibold text-white">Journal d&apos;un banni</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-gray-400">
                    Le récit complet, personnel et sans filtre autour du bannissement, de la suite du projet
                    et de ce qu&apos;il reste à transmettre.
                  </p>
                </div>
              </Link>

              <Link href="/journal-banni#lettre-ouverte" data-testid="link-lettre-home">
                <div className="group h-full rounded-3xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:border-primary/35 hover:bg-white/[0.05]">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="rounded-2xl bg-primary/12 p-3 text-primary">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-primary/80">Message</p>
                      <h3 className="font-display text-2xl font-semibold text-white">Lettre ouverte</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-gray-400">
                    Le message adressé à la communauté pour expliquer la situation, la direction du site
                    et l&apos;état actuel du Psykoverse.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8">
              <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">Base du site</p>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                Une navigation plus directe
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  href: "/tutoriels",
                  title: `${totalGuideCount} guides`,
                  description: `${beginnerGuideCount} pour démarrer et ${featuredGuideCount} à prioriser.`,
                  icon: BookOpen,
                  accent: "text-primary bg-primary/12",
                },
                {
                  href: "/tutoriels#outils",
                  title: `${toolGuideCount} outils`,
                  description: "Les calculateurs et raccourcis utiles sans passer par dix pages.",
                  icon: Wrench,
                  accent: "text-emerald-300 bg-emerald-400/12",
                },
                {
                  href: "/regles",
                  title: `${rulesGuideCount} règles`,
                  description: "Les rappels à connaître pour éviter les erreurs évitables.",
                  icon: Scale,
                  accent: "text-amber-300 bg-amber-400/12",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div className="h-full rounded-3xl border border-white/8 bg-white/[0.03] p-6 transition-colors hover:bg-white/[0.05]">
                      <div className={`mb-4 inline-flex rounded-2xl p-3 ${item.accent}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 font-display text-xl font-semibold text-white">{item.title}</h3>
                      <p className="text-sm leading-6 text-gray-400">{item.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.2em] text-gray-500">À lire maintenant</p>
                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Les guides les plus consultés
                </h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {spotlightGuides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Link key={guide.link} href={guide.link}>
                    <div className="group h-full rounded-3xl border border-white/8 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.05]">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div className={`rounded-2xl bg-gradient-to-br p-3 ${guide.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                          {guide.categoryTitle}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">{guide.title}</h3>
                      <p className="text-sm leading-6 text-gray-400">{guide.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-2xl bg-[#5865F2]/15 p-3 text-[#8ea1ff]">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">Discord</h3>
                  <p className="text-sm text-gray-500">{discordMembers ?? "..."} membres</p>
                </div>
              </div>
              <p className="mb-5 text-sm leading-6 text-gray-400">
                Le meilleur point d&apos;entrée si tu veux poser une question, échanger rapidement ou suivre les annonces.
              </p>
              <Button className="w-full rounded-full bg-[#5865F2] hover:bg-[#4752C4]" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="btn-discord-section">
                  Rejoindre le Discord <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-6">
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-2xl bg-red-500/12 p-3 text-red-400">
                  <Youtube className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">YouTube</h3>
                  <p className="text-sm text-gray-500">{youtubeSubscribers ?? "..."} abonnés</p>
                </div>
              </div>
              <p className="mb-5 text-sm leading-6 text-gray-400">
                Les vidéos restent accessibles en archive pour les joueurs qui préfèrent un format guidé.
              </p>
              <Button variant="outline" className="w-full rounded-full border-red-500/25 text-red-300 hover:bg-red-500/10" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" data-testid="btn-youtube-section">
                  Voir la chaîne <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/8 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-3xl border border-white/8 bg-white/[0.03] p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
              Un retour à une interface plus calme
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
              L&apos;objectif est de remettre le contenu au centre. Si tu vois encore des zones trop denses,
              tu peux me dire quelles pages doivent passer en priorité.
            </p>
            <button
              onClick={() => window.dispatchEvent(new Event("openFeedbackModal"))}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/16"
              data-testid="btn-feedback-home"
            >
              <MessageSquare className="h-4 w-4" />
              Donner mon feedback
            </button>
            {totalVisits > 0 && (
              <div className="mt-5 inline-flex items-center gap-2 text-sm text-gray-500">
                <Eye className="h-4 w-4" />
                {totalVisits.toLocaleString()} visites
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="space-game" className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <div className="mb-2 inline-flex items-center gap-2 text-sm text-cyan-300">
                <Gamepad2 className="h-4 w-4" />
                Mini-jeu
              </div>
              <h2 className="font-display text-2xl font-bold text-white">
                Une pause légère
              </h2>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-4 md:p-6">
              <SpaceGame />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

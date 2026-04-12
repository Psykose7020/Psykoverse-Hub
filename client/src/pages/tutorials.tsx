import { type ReactNode, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Compass,
  ExternalLink,
  Filter,
  GraduationCap,
  MessageSquare,
  Play,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/EditableText";
import { useDiscordStats } from "@/hooks/useDiscordStats";
import { useFavorites } from "@/hooks/useFavorites";
import { guideCategories, totalGuideCount } from "@/data/guides";
import { dbImages } from "@/data/database-images";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const categories = guideCategories;

const allGuides = categories.flatMap((category) =>
  category.guides.map((guide) => ({
    ...guide,
    categoryId: category.id,
    category: category.title,
    categoryDescription: category.description,
    level: category.level,
  })),
);

type GuideItem = (typeof allGuides)[number];

const guidesBySlug = Object.fromEntries(
  allGuides.map((guide) => [
    guide.link.replace("/guide/", "").replace("/regles/", "").replace("/outils/", ""),
    guide,
  ]),
) as Record<string, GuideItem>;

const guidesByLink = Object.fromEntries(
  allGuides.map((guide) => [guide.link, guide]),
) as Record<string, GuideItem>;

const levelColors: Record<string, string> = {
  Débutant: "bg-green-500/15 text-green-300 border-green-500/30",
  Intermédiaire: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  Avancé: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  Expert: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  Important: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "Tous niveaux": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

const levelOrder = ["Débutant", "Intermédiaire", "Avancé", "Expert", "Important", "Tous niveaux"];
const starField = [
  { left: "6%", top: "12%", size: 2, delay: 0 },
  { left: "18%", top: "28%", size: 3, delay: 0.8 },
  { left: "34%", top: "18%", size: 2, delay: 1.3 },
  { left: "52%", top: "10%", size: 2, delay: 0.4 },
  { left: "68%", top: "24%", size: 3, delay: 1.7 },
  { left: "82%", top: "16%", size: 2, delay: 0.9 },
  { left: "91%", top: "32%", size: 2, delay: 1.2 },
  { left: "11%", top: "72%", size: 2, delay: 1.5 },
  { left: "27%", top: "86%", size: 3, delay: 0.7 },
  { left: "49%", top: "78%", size: 2, delay: 1.8 },
  { left: "71%", top: "88%", size: 2, delay: 0.5 },
  { left: "88%", top: "74%", size: 3, delay: 1.1 },
];
const nebulaClouds = [
  { className: "left-[-6%] top-[4%] h-56 w-56 bg-cyan-400/14", duration: 18, x: 40, y: -10 },
  { className: "right-[2%] top-[10%] h-48 w-48 bg-blue-500/14", duration: 16, x: -30, y: 16 },
  { className: "left-[42%] top-[58%] h-44 w-44 bg-violet-500/10", duration: 20, x: 18, y: -22 },
];

function pickGuides(links: string[]) {
  return links.map((link) => guidesByLink[link]).filter(Boolean);
}

const learningPaths: Array<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  categoryId?: string;
  links: string[];
}> = [
  {
    id: "start",
    title: "Démarrer proprement",
    description: "Le chemin le plus rapide pour comprendre l'interface, choisir sa classe et poser une base solide.",
    icon: GraduationCap,
    accent: "from-emerald-500/20 via-cyan-500/10 to-transparent",
    categoryId: "bases",
    links: ["/guide/interface", "/guide/classes", "/guide/production"],
  },
  {
    id: "eco",
    title: "Booster son économie",
    description: "Optimise tes priorités, réduis tes temps morts et transforme tes ressources en progression.",
    icon: TrendingUp,
    accent: "from-blue-500/20 via-indigo-500/10 to-transparent",
    categoryId: "economie",
    links: ["/guide/production", "/guide/technos-prioritaires", "/guide/ordre-construction"],
  },
  {
    id: "raid",
    title: "Raider sans te faire punir",
    description: "Une sélection pensée pour les joueurs qui veulent cibler, frapper et rentrer sans se faire intercepter.",
    icon: Shield,
    accent: "from-orange-500/20 via-red-500/10 to-transparent",
    categoryId: "offensive",
    links: ["/guide/espionnage", "/guide/recherche-cibles", "/guide/eviter-interception"],
  },
  {
    id: "tools",
    title: "Jouer avec les bons outils",
    description: "Les calculateurs qui évitent les erreurs coûteuses et accélèrent vraiment la prise de décision.",
    icon: Rocket,
    accent: "from-teal-500/20 via-cyan-500/10 to-transparent",
    categoryId: "outils",
    links: ["/outils/production", "/outils/temps-vol", "/outils/intercepteur"],
  },
];

function FilterChip({
  active,
  children,
  onClick,
  icon: Icon,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
  icon?: LucideIcon;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all",
        active
          ? "border-primary/60 bg-primary text-black shadow-[0_12px_40px_rgba(34,211,238,0.2)]"
          : "border-[#2E384D] bg-[#141A24]/80 text-gray-300 hover:border-primary/30 hover:text-white",
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}

function getGuideTypeLabel(guide: GuideItem) {
  if (guide.link.startsWith("/outils/")) return "Calculateur";
  if (guide.link.startsWith("/regles/")) return "Règle";
  return "Guide";
}

function getGuideTags(guide: GuideItem, searchQuery: string) {
  const rawKeywords = guide.keywords
    ?.split(/\s+/)
    .map((keyword) => keyword.trim())
    .filter(Boolean) ?? [];

  const uniqueKeywords = Array.from(new Set(rawKeywords));
  const queryTerms = searchQuery
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);

  const matchingKeywords = uniqueKeywords.filter((keyword) =>
    queryTerms.some((term) => keyword.toLowerCase().includes(term)),
  );

  const fallbackKeywords = uniqueKeywords.slice(0, 3);
  return (matchingKeywords.length > 0 ? matchingKeywords : fallbackKeywords).slice(0, 3);
}

function SpaceBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(96,165,250,0.2),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(34,211,238,0.18),transparent_24%),radial-gradient(circle_at_50%_82%,rgba(168,85,247,0.13),transparent_18%),linear-gradient(180deg,rgba(8,12,21,0.18),rgba(5,8,16,0.38))]" />

      {nebulaClouds.map((cloud) => (
        <motion.div
          key={cloud.className}
          className={cn("absolute rounded-full blur-3xl", cloud.className)}
          animate={{ x: [0, cloud.x, 0], y: [0, cloud.y, 0], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: cloud.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {starField.map((star, index) => (
        <motion.span
          key={`${star.left}-${star.top}-${index}`}
          className="absolute rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.35)]"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={{ opacity: [0.2, 1, 0.25], scale: [1, 1.6, 1] }}
          transition={{ duration: 3.5 + star.delay, delay: star.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <motion.div
        className="absolute -left-16 top-12 h-40 w-40 rounded-full border border-cyan-300/10 bg-cyan-400/10 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -10, 0], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[12%] top-[18%] h-24 w-24 rounded-full border border-blue-200/10 bg-blue-400/10 blur-2xl"
        animate={{ y: [0, 18, 0], x: [0, -12, 0], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[58%] top-[22%] h-px w-28 -rotate-[28deg] bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent"
        animate={{ x: [-20, 120], y: [-10, 50], opacity: [0, 0.9, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, repeatDelay: 5, ease: "easeOut" }}
      />
      <motion.div
        className="absolute right-[18%] top-[64%] h-px w-20 rotate-[18deg] bg-gradient-to-r from-transparent via-violet-200/70 to-transparent"
        animate={{ x: [0, -90], y: [0, -30], opacity: [0, 0.85, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, repeatDelay: 7, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-[14%] top-[34%] h-px w-36 -rotate-[18deg] bg-gradient-to-r from-transparent via-sky-100/90 to-transparent"
        animate={{ x: [0, 150], y: [0, 48], opacity: [0, 1, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, repeatDelay: 8, ease: "easeOut" }}
      />
      <motion.div
        className="absolute left-[74%] top-[8%] h-28 w-28 rounded-full border border-primary/15"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
      </motion.div>
      <motion.div
        className="absolute left-[8%] bottom-[10%] h-40 w-40 rounded-full border border-white/6"
        animate={{ rotate: -360, scale: [1, 1.04, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-200 shadow-[0_0_14px_rgba(191,219,254,0.7)]" />
      </motion.div>
    </div>
  );
}

function GuideCard({
  guide,
  isFavorite,
  toggleFavorite,
  activeCategory,
  activeLevel,
  searchQuery,
}: {
  guide: GuideItem;
  isFavorite: boolean;
  toggleFavorite: (link: string) => void;
  activeCategory: string | null;
  activeLevel: string | null;
  searchQuery: string;
}) {
  const Icon = guide.icon;
  const typeLabel = getGuideTypeLabel(guide);
  const tags = getGuideTags(guide, searchQuery);
  const showCategory = !activeCategory;
  const showLevel = !activeLevel;

  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative h-full">
      <Link href={guide.link}>
        <div className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.6rem] border border-[#273247] bg-[linear-gradient(180deg,rgba(20,26,36,0.96),rgba(11,16,24,0.98))] p-4 shadow-[0_14px_40px_rgba(5,9,15,0.34)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_rgba(34,211,238,0.1)]">
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.div
              className="absolute right-0 top-0 h-24 w-24 rounded-full bg-cyan-300/10 blur-2xl"
              animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-4 top-5 h-px w-12 bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent"
              animate={{ x: [-8, 24, -8], opacity: [0.2, 0.95, 0.2] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute bottom-6 right-6 h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            <motion.div
              className="absolute -right-5 bottom-8 h-16 w-16 rounded-full border border-primary/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary" />
            </motion.div>
          </div>
          <div className="mb-4 flex items-start justify-between gap-3 pr-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className={cn("flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", guide.color)}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] uppercase tracking-[0.14em] text-primary">
                    {typeLabel}
                  </span>
                  {showCategory ? (
                    <p className="truncate text-[11px] uppercase tracking-[0.18em] text-cyan-200/65">{guide.category}</p>
                  ) : null}
                </div>
                {showLevel ? (
                  <span className={cn("mt-1 inline-flex rounded-full border px-2 py-0.5 text-[11px]", levelColors[guide.level])}>
                    {guide.level}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mb-4 flex-1">
            <h3 className="mb-2 text-base font-bold leading-tight text-white transition-colors group-hover:text-primary">
              {guide.title}
            </h3>
            <p className="text-sm leading-5 text-gray-400">{guide.description}</p>
            {tags.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={`${guide.link}-${tag}`}
                    className="rounded-full border border-white/8 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t border-white/8 pt-3 text-sm">
            <span className="line-clamp-1 text-xs text-gray-500">
              {guide.featured
                ? `${typeLabel} recommandé`
                : guide.link.startsWith("/outils/")
                  ? "Accès direct à l'outil"
                  : guide.link.startsWith("/regles/")
                    ? "Lecture utile avant de jouer"
                    : "Lecture ciblée"}
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-primary">
              Ouvrir
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleFavorite(guide.link);
        }}
        className={cn(
          "absolute right-4 top-4 z-10 rounded-full border p-2 backdrop-blur transition-all",
          isFavorite
            ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
            : "border-white/10 bg-black/30 text-gray-500 hover:border-amber-400/30 hover:text-amber-300",
        )}
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Star className={cn("h-4 w-4", isFavorite && "fill-amber-300")} />
      </button>
    </motion.div>
  );
}

export default function Tutorials() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [clearConfirm, setClearConfirm] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const discordMembers = useDiscordStats();
  const { favorites, toggleFavorite, clearFavorites, isFavorite, storageAvailable } = useFavorites();

  const { data: popularGuidesData } = useQuery<{ slug: string; views: number }[]>({
    queryKey: ["/api/guides/popular"],
    queryFn: async () => {
      const res = await fetch("/api/guides/popular");
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 60000,
  });

  useEffect(() => {
    const syncHashCategory = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const category = categories.find((item) => item.id === hash);
      if (category) {
        setLibraryOpen(true);
        setActiveCategory(category.id);
        requestAnimationFrame(() => {
          document.getElementById("guide-library")?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };

    syncHashCategory();
    window.addEventListener("hashchange", syncHashCategory);
    return () => window.removeEventListener("hashchange", syncHashCategory);
  }, []);

  const featuredGuides = useMemo(
    () => allGuides.filter((guide) => guide.featured),
    [],
  );

  const favoriteGuides = favorites
    .map((link) => guidesByLink[link])
    .filter(Boolean);

  const popularGuides = useMemo(
    () =>
      (popularGuidesData || [])
        .map((item) => guidesBySlug[item.slug])
        .filter(Boolean)
        .slice(0, 4),
    [popularGuidesData],
  );

  const displayPopularGuides = popularGuides.length > 0 ? popularGuides : featuredGuides.slice(0, 4);

  const filteredGuides = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return [...allGuides]
      .filter((guide) => {
        const categoryMatch = !activeCategory || guide.categoryId === activeCategory;
        const levelMatch = !activeLevel || guide.level === activeLevel;
        const textMatch =
          !query ||
          guide.title.toLowerCase().includes(query) ||
          guide.description.toLowerCase().includes(query) ||
          (guide.keywords && guide.keywords.toLowerCase().includes(query)) ||
          guide.category.toLowerCase().includes(query);

        return categoryMatch && levelMatch && textMatch;
      })
      .sort((left, right) => {
        const leftFav = favorites.includes(left.link) ? 1 : 0;
        const rightFav = favorites.includes(right.link) ? 1 : 0;
        const leftFeatured = left.featured ? 1 : 0;
        const rightFeatured = right.featured ? 1 : 0;

        if (rightFav !== leftFav) return rightFav - leftFav;
        if (rightFeatured !== leftFeatured) return rightFeatured - leftFeatured;
        return left.title.localeCompare(right.title, "fr");
      });
  }, [activeCategory, activeLevel, favorites, searchQuery]);

  const visibleCategories = useMemo(
    () =>
      categories
        .map((category) => ({
          ...category,
          count: filteredGuides.filter((guide) => guide.categoryId === category.id).length,
        }))
        .filter((category) => category.count > 0 || !searchQuery),
    [filteredGuides, searchQuery],
  );

  const activeCategoryTitle = categories.find((category) => category.id === activeCategory)?.title;

  const resultHeading = searchQuery
    ? `Résultats pour “${searchQuery}”`
    : activeCategoryTitle
      ? activeCategoryTitle
      : activeLevel
        ? activeLevel
        : "Bibliothèque complète";

  const pathCards = learningPaths.map((path) => ({
    ...path,
    guides: pickGuides(path.links),
  }));

  const shouldShowLibrary = libraryOpen || Boolean(activeCategory || activeLevel || searchQuery);

  const handleClearFavorites = () => {
    if (clearConfirm) {
      clearFavorites();
      setClearConfirm(false);
      return;
    }

    setClearConfirm(true);
    window.setTimeout(() => setClearConfirm(false), 3000);
  };

  const resetFilters = () => {
    setActiveCategory(null);
    setActiveLevel(null);
    setSearchQuery("");
    setLibraryOpen(false);
  };

  return (
    <Layout>
      <section className="relative overflow-hidden py-8 md:py-10">
        <SpaceBackdrop />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_32%),linear-gradient(180deg,#0b1018_0%,#101722_45%,#0b1018_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

        <div className="container relative mx-auto px-4">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              {totalGuideCount} guides, outils et raccourcis d'apprentissage
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_420px] lg:items-start">
              <motion.div variants={fadeInUp}>
                <div className="relative max-w-3xl">
                  <motion.div
                    className="absolute -left-10 top-6 hidden h-24 w-24 rounded-full border border-cyan-300/10 lg:block"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_12px_rgba(165,243,252,0.8)]" />
                  </motion.div>
                  <motion.div
                    className="absolute right-10 top-16 hidden h-14 w-14 rounded-full bg-violet-400/10 blur-2xl lg:block"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.5, 0.25] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-black/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-cyan-200/70 backdrop-blur-sm"
                    animate={{ boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 28px rgba(34,211,238,0.12)", "0 0 0 rgba(34,211,238,0)"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Rocket className="h-3.5 w-3.5" />
                    Cartographie galactique des guides
                  </motion.div>
                  <EditableText
                    id="tutorials-hero-title"
                    defaultValue="Apprendre OGame sans se perdre"
                    as="h1"
                    className="font-display text-3xl font-bold leading-tight text-white md:text-5xl"
                  />
                  <div className="mt-3 max-w-2xl text-base leading-7 text-gray-300">
                    <EditableText
                      id="tutorials-hero-description"
                      defaultValue="Explore les guides par objectif, niveau ou besoin immédiat. L'idée est simple : moins chercher, mieux apprendre, plus vite appliquer."
                      as="span"
                      multiline
                    />
                  </div>
                </div>

                <div className="mt-5 max-w-2xl">
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Ex: économies, ghost, intercepteur, lune..."
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      className="h-14 w-full rounded-[1.4rem] border border-[#2E384D] bg-[#121925]/95 pl-14 pr-14 text-base text-white shadow-[0_20px_50px_rgba(0,0,0,0.24)] outline-none transition-colors placeholder:text-gray-500 focus:border-primary/50"
                      data-testid="search-guides"
                    />
                    {searchQuery ? (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-2 text-gray-400 transition-colors hover:text-white"
                        aria-label="Effacer la recherche"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    ) : null}
                  </motion.div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <FilterChip active={!activeCategory} onClick={() => setActiveCategory(null)} icon={Filter}>
                    Tout explorer
                  </FilterChip>
                  {categories.slice(0, 5).map((category) => {
                    const Icon = category.icon;
                    return (
                      <FilterChip
                        key={category.id}
                        active={activeCategory === category.id}
                        onClick={() => {
                          setLibraryOpen(true);
                          setActiveCategory((current) => (current === category.id ? null : category.id));
                        }}
                        icon={Icon}
                      >
                        {category.title}
                      </FilterChip>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid gap-3 sm:grid-cols-4 lg:grid-cols-1">
                <div className="relative overflow-hidden rounded-[1.6rem] border border-cyan-400/15 bg-[linear-gradient(180deg,rgba(18,25,37,0.92),rgba(13,18,27,0.98))] p-4 shadow-[0_20px_60px_rgba(7,12,18,0.34)] sm:col-span-3 lg:col-span-1">
                  <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_70%_80%,rgba(96,165,250,0.08),transparent_22%)]"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute -right-6 top-3 h-20 w-20 rounded-full border border-cyan-300/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(103,232,249,0.7)]" />
                  </motion.div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/60">Accès rapide</p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="rounded-xl border border-white/6 bg-white/4 p-3">
                      <p className="text-2xl font-bold text-white">{totalGuideCount}</p>
                      <p className="mt-1 text-xs text-gray-400">guides</p>
                    </div>
                    <div className="rounded-xl border border-white/6 bg-white/4 p-3">
                      <p className="text-2xl font-bold text-white">{featuredGuides.length}</p>
                      <p className="mt-1 text-xs text-gray-400">recommandés</p>
                    </div>
                    <div className="rounded-xl border border-white/6 bg-white/4 p-3">
                      <p className="text-2xl font-bold text-white">{favoriteGuides.length}</p>
                      <p className="mt-1 text-xs text-gray-400">favoris</p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {pathCards.map((path) => (
                      <button
                        key={path.id}
                        onClick={() => {
                          setLibraryOpen(true);
                          setActiveCategory(path.categoryId ?? null);
                        }}
                        className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1.5 text-xs text-primary transition-colors hover:bg-primary/15"
                      >
                        {path.title}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-[#273247] bg-[#121925]/90 p-4 sm:col-span-1">
                  <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Discord</p>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {discordMembers ?? "..."} membres disponibles.
                  </p>
                  <Button className="mt-3 w-full bg-[#5865F2] hover:bg-[#4752C4]" asChild>
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="link-discord-hero">
                      Rejoindre
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="rounded-[1.6rem] border border-[#243043] bg-[#0f1621]/92 p-4 md:p-5">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-wrap gap-2">
                <FilterChip active={!activeLevel} onClick={() => setActiveLevel(null)}>
                  Tous niveaux
                </FilterChip>
                {levelOrder.map((level) => (
                  <FilterChip
                    key={level}
                    active={activeLevel === level}
                    onClick={() => {
                      setLibraryOpen(true);
                      setActiveLevel((current) => (current === level ? null : level));
                    }}
                  >
                    {level}
                  </FilterChip>
                ))}
              </div>
            </div>

            {(activeCategory || activeLevel || searchQuery) && (
              <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm">
                <span className="text-gray-400">Filtres actifs :</span>
                {activeCategory ? <span className="rounded-full border border-primary/20 px-3 py-1 text-primary">{activeCategoryTitle}</span> : null}
                {activeLevel ? <span className="rounded-full border border-primary/20 px-3 py-1 text-primary">{activeLevel}</span> : null}
                {searchQuery ? <span className="rounded-full border border-primary/20 px-3 py-1 text-primary">“{searchQuery}”</span> : null}
                <button onClick={resetFilters} className="ml-auto text-primary transition-colors hover:text-cyan-200">
                  Réinitialiser
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {!storageAvailable && (
        <section className="pb-2">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
              Les favoris ne peuvent pas être sauvegardés dans ce mode de navigation.
            </div>
          </div>
        </section>
      )}

      <section id="guide-library" className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="relative overflow-hidden rounded-[1.7rem] border border-[#243043] bg-[#0d121b]/96 p-5 md:p-6">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent" />
              <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/55">Bibliothèque intelligente</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">{resultHeading}</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-400">
                    {filteredGuides.length} résultat{filteredGuides.length > 1 ? "s" : ""} avec priorité aux favoris et guides clés.
                  </p>
                </div>
                <Link href="/regles">
                  <div className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-4 py-2 text-sm text-amber-300 transition-colors hover:bg-amber-500/15">
                    Règles officielles
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {visibleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setLibraryOpen(true);
                      setActiveCategory((current) => (current === category.id ? null : category.id));
                    }}
                    className={cn(
                      "rounded-full border px-3 py-2 text-sm transition-colors",
                      activeCategory === category.id
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-[#2E384D] bg-[#141A24]/80 text-gray-300 hover:border-primary/30 hover:text-white",
                    )}
                  >
                    {category.title} ({category.count})
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {!shouldShowLibrary ? (
                  <motion.div
                    key="explorer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid gap-4 lg:grid-cols-3">
                      {[
                        {
                          title: "Je débute",
                          description: "Trouver vite les bases, les mécaniques essentielles et les premiers réflexes utiles.",
                          action: "Activer parcours débutant",
                          onClick: () => {
                            setLibraryOpen(true);
                            setActiveLevel("Débutant");
                          },
                        },
                        {
                          title: "Je veux optimiser",
                          description: "Passer directement vers l'économie, les technos, les temps et les bons calculateurs.",
                          action: "Ouvrir l'optimisation",
                          onClick: () => {
                            setLibraryOpen(true);
                            setActiveCategory("economie");
                          },
                        },
                        {
                          title: "Je cherche un outil",
                          description: "Accéder sans détour aux calculateurs et outils les plus pratiques du site.",
                          action: "Afficher les outils",
                          onClick: () => {
                            setLibraryOpen(true);
                            setActiveCategory("outils");
                          },
                        },
                      ].map((entry) => (
                        <button
                          key={entry.title}
                          onClick={entry.onClick}
                          className="group rounded-[1.4rem] border border-[#273247] bg-[linear-gradient(180deg,rgba(20,26,36,0.88),rgba(10,14,22,0.96))] p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/35"
                        >
                          <p className="text-[11px] uppercase tracking-[0.22em] text-cyan-200/55">Mission</p>
                          <h3 className="mt-3 text-lg font-bold text-white group-hover:text-primary">{entry.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-gray-400">{entry.description}</p>
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                            {entry.action}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="mb-4 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Hubs</p>
                          <h3 className="mt-1 text-xl font-bold text-white">Choisis un secteur avant d’ouvrir la bibliothèque</h3>
                        </div>
                        <button
                          onClick={() => setLibraryOpen(true)}
                          className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/15"
                        >
                          Voir toute la bibliothèque
                        </button>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        {visibleCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <button
                              key={category.id}
                              onClick={() => {
                                setLibraryOpen(true);
                                setActiveCategory(category.id);
                              }}
                              className="group rounded-[1.4rem] border border-[#273247] bg-[#121925]/85 p-5 text-left transition-all hover:-translate-y-1 hover:border-primary/30"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                  <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", category.color)}>
                                    <Icon className="h-5 w-5 text-white" />
                                  </div>
                                  <div>
                                    <h4 className="text-base font-bold text-white group-hover:text-primary">{category.title}</h4>
                                    <p className="mt-1 text-sm leading-6 text-gray-400">{category.description}</p>
                                  </div>
                                </div>
                                <span className={cn("rounded-full border px-2 py-1 text-xs", levelColors[category.level])}>{category.level}</span>
                              </div>
                              <div className="mt-4 flex items-center justify-between text-sm">
                                <span className="text-gray-500">{category.count} guide{category.count > 1 ? "s" : ""}</span>
                                <span className="inline-flex items-center gap-2 text-primary">
                                  Entrer
                                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : filteredGuides.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="rounded-[1.5rem] border border-dashed border-[#2E384D] bg-[#121925]/60 px-6 py-14 text-center"
                  >
                    <Search className="mx-auto h-14 w-14 text-gray-600" />
                    <h3 className="mt-4 text-xl font-bold text-white">Aucun guide trouvé</h3>
                    <p className="mt-2 text-gray-500">Essaie un autre mot-clé ou retire un filtre.</p>
                    <button onClick={resetFilters} className="mt-5 text-primary transition-colors hover:text-cyan-200">
                      Réinitialiser les filtres
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    layout
                    className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
                  >
                    {filteredGuides.map((guide) => (
                      <GuideCard
                        key={guide.link}
                        guide={guide}
                        isFavorite={isFavorite(guide.link)}
                        toggleFavorite={toggleFavorite}
                        activeCategory={activeCategory}
                        activeLevel={activeLevel}
                        searchQuery={searchQuery}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              {!activeCategory && !activeLevel && !searchQuery && (
                <div className="rounded-[1.6rem] border border-[#273247] bg-[#0f1621]/94 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/55">Parcours rapides</p>
                  <div className="mt-3 space-y-2">
                    {pathCards.map((path) => {
                      const Icon = path.icon;
                      return (
                        <button
                          key={path.id}
                          onClick={() => {
                            setLibraryOpen(true);
                            setActiveCategory(path.categoryId ?? null);
                          }}
                          className={cn("flex w-full items-center gap-3 rounded-xl border border-white/8 bg-gradient-to-r px-3 py-3 text-left transition-colors hover:border-primary/25", path.accent)}
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                            <Icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white">{path.title}</p>
                            <p className="line-clamp-1 text-xs text-gray-400">{path.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="rounded-[1.6rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(30,26,16,0.94),rgba(15,20,28,0.98))] p-4">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500/15">
                    <Star className="h-5 w-5 text-yellow-300 fill-yellow-300" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-yellow-200/55">À la une</p>
                    <h2 className="text-xl font-bold text-white">Guides populaires</h2>
                  </div>
                </div>

                <div className="space-y-3">
                  {displayPopularGuides.map((guide) => (
                    <div key={guide.link} className="relative">
                      <Link href={guide.link}>
                        <div className="group cursor-pointer rounded-2xl border border-white/8 bg-black/20 px-4 py-4 transition-colors hover:border-yellow-500/25 hover:bg-white/5">
                          <div className="pr-10">
                            <p className="text-sm font-semibold text-white group-hover:text-yellow-300">{guide.title}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-400">{guide.description}</p>
                            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-yellow-200/45">{guide.category}</p>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          toggleFavorite(guide.link);
                        }}
                        className={cn(
                          "absolute right-3 top-3 rounded-full border p-2 transition-colors",
                          isFavorite(guide.link)
                            ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
                            : "border-white/10 bg-black/30 text-gray-500 hover:text-amber-300",
                        )}
                      >
                        <Star className={cn("h-4 w-4", isFavorite(guide.link) && "fill-amber-300")} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {favoriteGuides.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-[1.6rem] border border-amber-500/20 bg-[linear-gradient(180deg,rgba(27,22,13,0.94),rgba(15,20,28,0.98))] p-4"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15">
                          <Star className="h-5 w-5 text-amber-300 fill-amber-300" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-amber-200/55">Personnel</p>
                          <h2 className="text-xl font-bold text-white">Tes favoris</h2>
                        </div>
                      </div>

                      <button
                        onClick={handleClearFavorites}
                        className={cn(
                          "rounded-full border px-3 py-2 text-xs transition-colors",
                          clearConfirm
                            ? "border-red-500/30 bg-red-500/15 text-red-300"
                            : "border-white/10 bg-white/5 text-gray-400 hover:text-white",
                        )}
                      >
                        {clearConfirm ? "Confirmer ?" : "Vider"}
                      </button>
                    </div>

                    <div className="space-y-3">
                      {favoriteGuides.slice(0, 4).map((guide) => (
                        <Link key={guide.link} href={guide.link}>
                          <div className="group cursor-pointer rounded-2xl border border-white/8 bg-black/20 px-4 py-4 transition-colors hover:border-amber-500/25 hover:bg-white/5">
                            <p className="text-sm font-semibold text-white group-hover:text-amber-300">{guide.title}</p>
                            <p className="mt-1 text-xs leading-5 text-gray-400">{guide.description}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(16,24,36,0.98),rgba(9,15,24,0.98))] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary/60">Contribuer</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Améliorer la bibliothèque du Psykoverse</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                  Ces guides rassemblent des années de ressources et d’expérience communautaire. Si tu veux corriger, compléter ou proposer un nouveau sujet, on le centralise ici.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/suggestion-tutoriel">
                  <span className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/15">
                    <MessageSquare className="h-4 w-4" />
                    Proposer un guide
                  </span>
                </Link>
                <a
                  href="https://discord.gg/3PWk4HmfNn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#5865F2]/20 bg-[#5865F2]/10 px-4 py-3 text-sm font-medium text-[#7f8cff] transition-colors hover:bg-[#5865F2]/15"
                >
                  <Users className="h-4 w-4" />
                  Échanger sur Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-[#243043] bg-[#0d1117] p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Vidéo</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Compléter les guides avec la chaîne</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Quelques portes d’entrée vidéo pour les sujets où la démonstration visuelle aide vraiment.
                </p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" data-testid="link-youtube">
                  Voir la chaîne
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  title: "Prise en retour d'attaque",
                  description: "Calcule un retour de flotte ennemi à la seconde près sans perdre de temps.",
                  image: dbImages.alliance.guerrier,
                  tag: "Tutoriel",
                },
                {
                  title: "Guide LifeForms",
                  description: "Comprends les bonus raciaux et leur impact réel sur l’économie.",
                  image: dbImages.races.kaelesh,
                  tag: "Stratégie",
                },
                {
                  title: "Mécaniques de combat",
                  description: "Rapid Fire, ordre de tir, lecture des rapports et décisions de compo.",
                  image: dbImages.recherches.armes,
                  tag: "Combat",
                },
              ].map((video) => (
                <a
                  key={video.title}
                  href="https://www.youtube.com/@7020Psykose"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="overflow-hidden rounded-[1.75rem] border border-[#273247] bg-[#131a25]">
                    <div className="relative overflow-hidden">
                      <img src={video.image} alt={video.title} className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white">
                        {video.tag}
                      </span>
                      <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/40">
                        <Play className="ml-0.5 h-5 w-5" />
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white transition-colors group-hover:text-red-400">{video.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-400">{video.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 pt-6">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-orange-500/20 bg-[linear-gradient(135deg,rgba(55,23,7,0.24),rgba(12,16,24,0.98))] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white">Sondage communautaire</h3>
                <p className="mt-1 text-sm text-gray-400">Partage ta composition de flotte ou de défense idéale pour enrichir les repères de la communauté.</p>
              </div>
              <Link href="/sondage-compositions">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700" data-testid="btn-survey-cta">
                  <Compass className="mr-2 h-4 w-4" />
                  Participer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

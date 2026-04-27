import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Filter,
  MessageSquare,
  Play,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { guideCategories, totalGuideCount } from "@/data/guides";
import { dbImages } from "@/data/database-images";
import { cn } from "@/lib/utils";

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
  Débutant: "bg-green-500/12 text-green-300 border-green-500/25",
  Intermédiaire: "bg-blue-500/12 text-blue-300 border-blue-500/25",
  Avancé: "bg-orange-500/12 text-orange-300 border-orange-500/25",
  Expert: "bg-purple-500/12 text-purple-300 border-purple-500/25",
  Important: "bg-amber-500/12 text-amber-300 border-amber-500/25",
  "Tous niveaux": "bg-emerald-500/12 text-emerald-300 border-emerald-500/25",
};

const levelOrder = ["Débutant", "Intermédiaire", "Avancé", "Expert", "Important", "Tous niveaux"];

const learningPaths: Array<{
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  categoryId?: string;
  links: string[];
}> = [
  {
    id: "start",
    title: "Démarrer proprement",
    description: "Les bases à comprendre avant de t’éparpiller.",
    icon: BookOpen,
    categoryId: "bases",
    links: ["/guide/interface", "/guide/classes", "/guide/production"],
  },
  {
    id: "eco",
    title: "Booster ton économie",
    description: "Priorités utiles, production et rythme de progression.",
    icon: TrendingUp,
    categoryId: "economie",
    links: ["/guide/production", "/guide/technos-prioritaires", "/guide/ordre-construction"],
  },
  {
    id: "raid",
    title: "Raider sans te faire punir",
    description: "Espionner, cibler, frapper et rentrer proprement.",
    icon: Shield,
    categoryId: "offensive",
    links: ["/guide/espionnage", "/guide/recherche-cibles", "/guide/eviter-interception"],
  },
  {
    id: "tools",
    title: "Prendre les bons outils",
    description: "Accéder vite aux calculateurs les plus utiles.",
    icon: Wrench,
    categoryId: "outils",
    links: ["/outils/convertisseur-combat", "/outils/repartiteur-butin", "/outils/production"],
  },
];

function isExternalLink(link: string) {
  return /^https?:\/\//.test(link);
}

function getGuideTypeLabel(guide: GuideItem) {
  if (guide.link.startsWith("http")) return "Référence";
  if (guide.link.startsWith("/outils/")) return "Outil";
  if (guide.link.startsWith("/regles/")) return "Règle";
  return "Guide";
}

function getGuideTags(guide: GuideItem) {
  return Array.from(
    new Set(
      (guide.keywords ?? "")
        .split(/\s+/)
        .map((keyword) => keyword.trim())
        .filter(Boolean),
    ),
  ).slice(0, 3);
}

function pickGuides(links: string[]) {
  return links.map((link) => guidesByLink[link]).filter(Boolean);
}

function GuideLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (isExternalLink(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return <Link href={href}>{children}</Link>;
}

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
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-primary/40 bg-primary/12 text-primary"
          : "border-white/8 bg-white/[0.03] text-gray-300 hover:border-white/16 hover:text-white",
      )}
    >
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}

function GuideRow({
  guide,
  isFavorite,
  toggleFavorite,
}: {
  guide: GuideItem;
  isFavorite: boolean;
  toggleFavorite: (link: string) => void;
}) {
  const Icon = guide.icon;
  const tags = getGuideTags(guide);
  const external = isExternalLink(guide.link);

  return (
    <div className="relative">
      <GuideLink href={guide.link}>
        <div className="group rounded-3xl border border-white/8 bg-white/[0.03] p-4 pr-14 transition-colors hover:bg-white/[0.05] md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 gap-4">
              <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg", guide.color)}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] text-primary">
                    {getGuideTypeLabel(guide)}
                  </span>
                  <span className={cn("rounded-full border px-2.5 py-1 text-[11px]", levelColors[guide.level])}>
                    {guide.level}
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-gray-500">
                    {guide.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white transition-colors group-hover:text-primary md:text-lg">
                  {guide.title}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
                  {guide.description}
                </p>
                {tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={`${guide.link}-${tag}`}
                        className="rounded-full border border-white/8 bg-black/20 px-2.5 py-1 text-[11px] text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 text-sm text-primary md:pl-4">
              <span>{external ? "Voir le site" : "Ouvrir"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </GuideLink>

      <button
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleFavorite(guide.link);
        }}
        className={cn(
          "absolute right-4 top-4 rounded-full border p-2 transition-colors",
          isFavorite
            ? "border-amber-400/40 bg-amber-400/15 text-amber-300"
            : "border-white/10 bg-black/30 text-gray-500 hover:text-amber-300",
        )}
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Star className={cn("h-4 w-4", isFavorite && "fill-amber-300")} />
      </button>
    </div>
  );
}

function CategorySection({
  category,
  guides,
  expanded,
  onToggle,
  isFavorite,
  toggleFavorite,
}: {
  category: (typeof categories)[number];
  guides: GuideItem[];
  expanded: boolean;
  onToggle: (categoryId: string) => void;
  isFavorite: (link: string) => boolean;
  toggleFavorite: (link: string) => void;
}) {
  const Icon = category.icon;

  return (
    <div className="overflow-hidden rounded-[1.7rem] border border-white/8 bg-[#0f1621]/92">
      <button
        onClick={() => onToggle(category.id)}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] md:px-6"
      >
        <div className="flex items-start gap-4">
          <div className={cn("mt-0.5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg", category.color)}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-white md:text-xl">{category.title}</h3>
              <span className={cn("rounded-full border px-2.5 py-1 text-[11px]", levelColors[category.level])}>
                {category.level}
              </span>
              <span className="rounded-full border border-white/8 bg-black/20 px-2.5 py-1 text-[11px] text-gray-400">
                {guides.length} guide{guides.length > 1 ? "s" : ""}
              </span>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-gray-400">
              {category.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 pl-2">
          <span className="hidden text-sm text-primary md:inline">{expanded ? "Réduire" : "Déplier"}</span>
          <div className="rounded-full border border-white/10 bg-white/[0.04] p-2">
            <ChevronDown className={cn("h-4 w-4 text-white transition-transform", expanded && "rotate-180")} />
          </div>
        </div>
      </button>

      {expanded ? (
        <div className="border-t border-white/8 px-5 py-5 md:px-6">
          <div className="space-y-3">
            {guides.map((guide) => (
              <GuideRow
                key={guide.link}
                guide={guide}
                isFavorite={isFavorite(guide.link)}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Tutorials() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [clearConfirm, setClearConfirm] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(categories[0]?.id ?? null);
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

  const activeCategoryTitle = categories.find((category) => category.id === activeCategory)?.title;
  const hasActiveFilters = Boolean(activeCategory || activeLevel || searchQuery);

  const groupedCategories = categories.map((category) => ({
    ...category,
    guides: allGuides.filter((guide) => guide.categoryId === category.id),
  }));

  const pathCards = learningPaths.map((path) => ({
    ...path,
    guides: pickGuides(path.links),
  }));

  const resultHeading = searchQuery
    ? `Résultats pour “${searchQuery}”`
    : activeCategoryTitle
      ? activeCategoryTitle
      : activeLevel
        ? activeLevel
        : "Bibliothèque des guides";

  const resetFilters = () => {
    setActiveCategory(null);
    setActiveLevel(null);
    setSearchQuery("");
  };

  const handleClearFavorites = () => {
    if (clearConfirm) {
      clearFavorites();
      setClearConfirm(false);
      return;
    }

    setClearConfirm(true);
    window.setTimeout(() => setClearConfirm(false), 3000);
  };

  return (
    <Layout>
      <section className="border-b border-white/8 py-14 md:py-18">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(16,22,33,0.94),rgba(11,16,24,0.94))] p-6 md:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              {totalGuideCount} guides, outils et raccourcis
            </div>

            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.24em] text-gray-500">
                  Bibliothèque Psykoverse
                </p>
                <h1 className="font-display text-3xl font-bold text-white md:text-5xl">
                  Trouver le bon guide doit être simple
                </h1>
                <p className="mt-4 max-w-3xl text-base leading-7 text-gray-400">
                  Cette page a été repensée pour aller plus vite. Tu peux chercher un sujet, filtrer par niveau
                  ou entrer par besoin concret plutôt que parcourir une grille de cartes.
                </p>

                <div className="relative mt-6 max-w-3xl">
                  <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Ex: économie, lune, interception, expéditions..."
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="h-14 w-full rounded-[1.2rem] border border-white/10 bg-[#121925] pl-14 pr-14 text-base text-white outline-none transition-colors placeholder:text-gray-500 focus:border-primary/40"
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
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <FilterChip active={!activeCategory} onClick={() => setActiveCategory(null)} icon={Filter}>
                    Toutes les catégories
                  </FilterChip>
                  {categories.slice(0, 6).map((category) => {
                    const Icon = category.icon;
                    return (
                      <FilterChip
                        key={category.id}
                        active={activeCategory === category.id}
                        onClick={() => setActiveCategory((current) => (current === category.id ? null : category.id))}
                        icon={Icon}
                      >
                        {category.title}
                      </FilterChip>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-white/8 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Accès rapide</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                    <p className="text-2xl font-semibold text-white">{totalGuideCount}</p>
                    <p className="mt-1 text-xs text-gray-500">guides</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                    <p className="text-2xl font-semibold text-white">{displayPopularGuides.length}</p>
                    <p className="mt-1 text-xs text-gray-500">populaires</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/20 p-3">
                    <p className="text-2xl font-semibold text-white">{favoriteGuides.length}</p>
                    <p className="mt-1 text-xs text-gray-500">favoris</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {levelOrder.map((level) => (
                    <FilterChip
                      key={level}
                      active={activeLevel === level}
                      onClick={() => setActiveLevel((current) => (current === level ? null : level))}
                    >
                      {level}
                    </FilterChip>
                  ))}
                </div>

                {hasActiveFilters ? (
                  <div className="mt-4 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm">
                    <p className="text-gray-400">Filtres actifs</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {activeCategory ? <span className="rounded-full border border-primary/20 px-3 py-1 text-primary">{activeCategoryTitle}</span> : null}
                      {activeLevel ? <span className="rounded-full border border-primary/20 px-3 py-1 text-primary">{activeLevel}</span> : null}
                      {searchQuery ? <span className="rounded-full border border-primary/20 px-3 py-1 text-primary">“{searchQuery}”</span> : null}
                    </div>
                    <button onClick={resetFilters} className="mt-3 text-primary transition-colors hover:text-cyan-200">
                      Réinitialiser
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {!storageAvailable && (
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
              Les favoris ne peuvent pas être sauvegardés dans ce mode de navigation.
            </div>
          </div>
        </section>
      )}

      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Entrées rapides</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Commencer par un besoin clair</h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {pathCards.map((path) => {
                const Icon = path.icon;
                return (
                  <button
                  key={path.id}
                  onClick={() => {
                    setActiveCategory(path.categoryId ?? null);
                    document.getElementById("guide-library")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-4 text-left transition-colors hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-xl font-semibold text-white">{path.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-gray-400">{path.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {path.guides.map((guide) => (
                          <span
                            key={`${path.id}-${guide.link}`}
                            className="rounded-full border border-white/8 bg-black/20 px-3 py-1 text-xs text-gray-300"
                          >
                            {guide.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="guide-library" className="py-4">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-[#0d121b]/96 p-5 md:p-6">
            <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Bibliothèque</p>
                <h2 className="mt-2 text-2xl font-bold text-white">{resultHeading}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {filteredGuides.length} résultat{filteredGuides.length > 1 ? "s" : ""}, triés avec priorité aux favoris et contenus mis en avant.
                </p>
              </div>
              <Link href="/regles">
                <div className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300 transition-colors hover:bg-amber-500/15">
                  Voir les règles officielles
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            </div>

            {hasActiveFilters ? (
              filteredGuides.length === 0 ? (
                <div className="rounded-[1.6rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
                  <Search className="mx-auto h-12 w-12 text-gray-600" />
                  <h3 className="mt-4 text-xl font-semibold text-white">Aucun guide trouvé</h3>
                  <p className="mt-2 text-sm text-gray-500">Essaie un autre mot-clé ou retire un filtre.</p>
                  <button onClick={resetFilters} className="mt-5 text-primary transition-colors hover:text-cyan-200">
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredGuides.map((guide) => (
                    <GuideRow
                      key={guide.link}
                      guide={guide}
                      isFavorite={isFavorite(guide.link)}
                      toggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )
            ) : (
                <div className="space-y-4">
                  <div className="rounded-[1.6rem] border border-yellow-500/20 bg-[linear-gradient(180deg,rgba(30,26,16,0.94),rgba(15,20,28,0.98))] p-5">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-500/15">
                      <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-yellow-200/55">À lire en priorité</p>
                      <h3 className="text-xl font-semibold text-white">Guides populaires</h3>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {displayPopularGuides.map((guide) => (
                      <GuideRow
                        key={guide.link}
                        guide={guide}
                        isFavorite={isFavorite(guide.link)}
                        toggleFavorite={toggleFavorite}
                      />
                    ))}
                  </div>
                </div>

                {favoriteGuides.length > 0 ? (
                  <div className="rounded-[1.6rem] border border-amber-500/20 bg-[linear-gradient(180deg,rgba(27,22,13,0.94),rgba(15,20,28,0.98))] p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/15">
                          <Star className="h-5 w-5 fill-amber-300 text-amber-300" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.22em] text-amber-200/55">Personnel</p>
                          <h3 className="text-xl font-semibold text-white">Tes favoris</h3>
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
                        <GuideRow
                          key={guide.link}
                          guide={guide}
                          isFavorite={isFavorite(guide.link)}
                          toggleFavorite={toggleFavorite}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}

                {groupedCategories.map((category) => (
                  <CategorySection
                    key={category.id}
                    category={category}
                    guides={category.guides}
                    expanded={expandedCategory === category.id}
                    onToggle={(categoryId) => setExpandedCategory((current) => current === categoryId ? null : categoryId)}
                    isFavorite={isFavorite}
                    toggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(16,24,36,0.98),rgba(9,15,24,0.98))] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary/60">Contribuer</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Améliorer la bibliothèque du Psykoverse</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
                  Si tu veux corriger, compléter ou proposer un nouveau sujet, on centralise tout ici.
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
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/8 bg-[#0d1117] p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Vidéo</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Compléter les guides avec la chaîne</h2>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Quand une démonstration visuelle aide plus qu’un pavé de texte.
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
                  description: "Calculer un retour de flotte ennemi sans perdre de temps.",
                  image: dbImages.alliance.guerrier,
                  tag: "Tutoriel",
                },
                {
                  title: "Guide LifeForms",
                  description: "Comprendre les bonus raciaux et leur impact réel.",
                  image: dbImages.races.kaelesh,
                  tag: "Stratégie",
                },
                {
                  title: "Mécaniques de combat",
                  description: "Rapid Fire, ordre de tir et lecture des rapports.",
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
                  <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#131a25]">
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
                      <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-red-400">{video.title}</h3>
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
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-orange-500/20 bg-[linear-gradient(135deg,rgba(55,23,7,0.24),rgba(12,16,24,0.98))] p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-600">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">Sondage communautaire</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Partage ta composition de flotte ou de défense idéale pour enrichir les repères de la communauté.
                </p>
              </div>
              <Link href="/sondage-compositions">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700" data-testid="btn-survey-cta">
                  <Rocket className="mr-2 h-4 w-4" />
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

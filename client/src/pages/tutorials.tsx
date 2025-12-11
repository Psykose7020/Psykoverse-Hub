import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  Play, BookOpen, Monitor, Users, Factory, FlaskConical, 
  Rocket, Globe, BookText, AlertTriangle, ExternalLink,
  GraduationCap, Compass, Trophy, Shield, Eye, Crosshair, Moon, Globe2,
  Target, TrendingUp, Ghost, Layers, Bomb, Plane, Sparkles, Scale,
  ArrowLeftRight, Swords, Dna, Settings, Search, Filter, ChevronRight,
  Star, Clock, Zap, MessageSquare, ChevronDown, Network
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/EditableText";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const categories = [
  {
    id: "regles",
    title: "Règles du Jeu",
    description: "Les règles officielles d'OGame.fr",
    icon: Scale,
    color: "from-amber-500 to-orange-600",
    level: "Important",
    guides: [
      { title: "VPN, IP et Multi-comptes", description: "Règles sur les comptes", icon: Users, color: "from-blue-500 to-cyan-600", link: "/regles/compte" },
      { title: "Sitting & Échanges", description: "Surveillance de compte", icon: ArrowLeftRight, color: "from-green-500 to-emerald-600", link: "/regles/sitting" },
      { title: "Push & Pull", description: "Commerce et mercenariat", icon: TrendingUp, color: "from-amber-500 to-orange-600", link: "/regles/push" },
      { title: "Bash", description: "Limite d'attaques", icon: Swords, color: "from-red-500 to-rose-600", link: "/regles/bash" }
    ]
  },
  {
    id: "debutant",
    title: "Les Bases du Jeu",
    description: "Tout ce qu'il faut savoir pour bien démarrer",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-600",
    level: "Débutant",
    guides: [
      { title: "L'Interface", description: "Vue d'ensemble du jeu", icon: Monitor, color: "from-blue-500 to-cyan-600", link: "/guide/interface", featured: true },
      { title: "Les Classes", description: "Collecteur, Général, Explorateur", icon: Users, color: "from-purple-500 to-pink-600", link: "/guide/classes", featured: true },
      { title: "Classes Alliance", description: "Guerrier, Marchand, Chercheur", icon: Users, color: "from-violet-500 to-purple-600", link: "/guide/alliance-classes", featured: true },
      { title: "Production", description: "Mines et gestion de l'énergie", icon: Factory, color: "from-green-500 to-emerald-600", link: "/guide/production" },
      { title: "Recherches", description: "Arbre des technologies", icon: FlaskConical, color: "from-teal-500 to-cyan-600", link: "/guide/recherches" },
      { title: "Technos Prioritaires", description: "Les 10 étapes clés", icon: FlaskConical, color: "from-teal-500 to-emerald-600", link: "/guide/technos-prioritaires", featured: true },
      { title: "Chantier spatial et défense", description: "Vaisseaux et défenses", icon: Rocket, color: "from-slate-500 to-slate-700", link: "/guide/chantier" },
      { title: "Galaxie", description: "Navigation et exploration", icon: Globe, color: "from-indigo-500 to-purple-600", link: "/guide/galaxie" },
      { title: "Jargon", description: "Vocabulaire de la communauté", icon: BookText, color: "from-amber-500 to-orange-600", link: "/guide/jargon" },
      { title: "Univers", description: "Caractéristiques et paramètres", icon: Settings, color: "from-indigo-500 to-purple-600", link: "/guide/univers" }
    ]
  },
  {
    id: "expansion",
    title: "Expansion & Développement",
    description: "Développez votre empire galactique",
    icon: Globe2,
    color: "from-teal-500 to-cyan-600",
    level: "Intermédiaire",
    guides: [
      { title: "Colonisation", description: "Étendre son empire", icon: Globe2, color: "from-green-500 to-teal-600", link: "/guide/colonisation" },
      { title: "Expéditions", description: "Explorer l'espace profond", icon: Compass, color: "from-indigo-500 to-blue-600", link: "/guide/expeditions" },
      { title: "Lune & CDR", description: "Champs de débris et lunes", icon: Moon, color: "from-gray-500 to-slate-700", link: "/guide/lune" },
      { title: "Développement", description: "Stratégie de compte", icon: TrendingUp, color: "from-emerald-500 to-green-600", link: "/guide/developpement" },
      { title: "Volantes", description: "Flotte mobile défensive", icon: Plane, color: "from-cyan-500 to-blue-600", link: "/guide/volante" },
      { title: "Optimisation RRI", description: "Réseau de Recherche Intergalactique", icon: Network, color: "from-purple-500 to-indigo-600", link: "/guide/rri" }
    ]
  },
  {
    id: "combat",
    title: "Combat & Stratégie",
    description: "Maîtrisez l'art de la guerre spatiale",
    icon: Crosshair,
    color: "from-red-500 to-rose-600",
    level: "Avancé",
    guides: [
      { title: "Espionnage", description: "Renseignement et infiltration", icon: Eye, color: "from-violet-500 to-purple-600", link: "/guide/espionnage" },
      { title: "Attaque", description: "Bases du combat", icon: Crosshair, color: "from-red-500 to-rose-600", link: "/guide/attaque" },
      { title: "Raid Avancé", description: "Techniques de pro", icon: Target, color: "from-orange-500 to-red-600", link: "/guide/raid", featured: true },
      { title: "Recherche Cibles", description: "Trouver les meilleures proies", icon: Eye, color: "from-violet-500 to-purple-600", link: "/guide/recherche-cibles" },
      { title: "Éviter Interception", description: "Raider en sécurité", icon: Shield, color: "from-blue-500 to-cyan-600", link: "/guide/eviter-interception" },
      { title: "Timing & Connexions", description: "Exploiter les habitudes", icon: Clock, color: "from-amber-500 to-orange-600", link: "/guide/timing-raid" },
      { title: "Décalage à la Sonde", description: "Détecter les DG", icon: Eye, color: "from-cyan-500 to-blue-600", link: "/guide/decalage-sonde" },
      { title: "Split Flotte", description: "Optimisation des raids", icon: Layers, color: "from-purple-500 to-violet-600", link: "/guide/split" },
      { title: "ACS", description: "Combat en groupe", icon: Users, color: "from-orange-500 to-amber-600", link: "/guide/acs" },
      { title: "MoonBreak", description: "Destruction de lune", icon: Bomb, color: "from-red-600 to-red-800", link: "/guide/moonbreak" },
      { title: "Classements", description: "Points d'honneur", icon: Trophy, color: "from-yellow-500 to-amber-600", link: "/guide/classements" }
    ]
  },
  {
    id: "defense",
    title: "Défense & Sécurité",
    description: "Protégez votre flotte et vos ressources",
    icon: Shield,
    color: "from-blue-600 to-indigo-700",
    level: "Avancé",
    guides: [
      { title: "Ghost (Fleetsave)", description: "12 techniques de protection", icon: Ghost, color: "from-blue-600 to-indigo-700", link: "/guide/fleetsave", featured: true },
      { title: "Activité", description: "Triangle d'activité", icon: AlertTriangle, color: "from-red-500 to-red-700", link: "/guide/activite" }
    ]
  },
  {
    id: "fdv",
    title: "Formes de Vie",
    description: "Les 4 races extraterrestres et leurs bonus",
    icon: Dna,
    color: "from-purple-500 to-pink-600",
    level: "Expert",
    guides: [
      { title: "Guide Complet FDV", description: "Races, recherches, artéfacts", icon: Dna, color: "from-purple-500 to-pink-600", link: "/guide/fdv", featured: true },
      { title: "Réduction Temps FDV", description: "Cap -99% et optimisation", icon: Clock, color: "from-purple-500 to-pink-600", link: "/guide/reduction-fdv" }
    ]
  }
];

const levelColors: Record<string, string> = {
  "Débutant": "bg-green-500/20 text-green-400 border-green-500/30",
  "Intermédiaire": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Avancé": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Expert": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "Important": "bg-amber-500/20 text-amber-400 border-amber-500/30"
};

const allGuides = categories.flatMap(cat => 
  cat.guides.map(g => ({ ...g, category: cat.title }))
);

const guidesBySlug: Record<string, typeof allGuides[0]> = {};
allGuides.forEach(g => {
  const slug = g.link.replace('/guide/', '').replace('/regles/', '');
  guidesBySlug[slug] = g;
});

export default function Tutorials() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(["regles"]));

  const { data: popularGuidesData } = useQuery<{ slug: string; views: number }[]>({
    queryKey: ['/api/guides/popular'],
    queryFn: async () => {
      const res = await fetch('/api/guides/popular');
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 60000,
  });

  const popularGuides = (popularGuidesData || [])
    .map(p => guidesBySlug[p.slug])
    .filter(Boolean)
    .slice(0, 4);
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedCategories(new Set(categories.map(c => c.id)));
  };

  const collapseAll = () => {
    setExpandedCategories(new Set());
  };
  
  const totalGuides = categories.reduce((acc, cat) => acc + cat.guides.length, 0);
  
  const filteredCategories = categories
    .filter(cat => !activeFilter || cat.id === activeFilter)
    .map(cat => ({
      ...cat,
      guides: cat.guides.filter(guide => 
        !searchQuery || 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(cat => cat.guides.length > 0);

  const featuredGuides = categories.flatMap(cat => 
    cat.guides.filter(g => g.featured).map(g => ({ ...g, category: cat.title }))
  );
  
  const displayPopularGuides = popularGuides.length > 0 ? popularGuides : featuredGuides.slice(0, 4);
  
  return (
    <Layout>
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-10"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {totalGuides} guides disponibles
            </motion.div>
            <motion.div variants={fadeInUp} className="mb-4">
              <EditableText
                id="tutorials-hero-title"
                defaultValue="Guides & Tutoriels"
                as="h1"
                className="font-display text-4xl md:text-5xl font-bold text-white"
              />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
              <EditableText
                id="tutorials-hero-description"
                defaultValue="Apprenez à maîtriser OGame avec nos guides complets rédigés par la communauté"
                as="span"
                multiline
              />
            </motion.p>

            <motion.div variants={fadeInUp} className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher un guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1C2230] border border-[#2E384D] rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                  data-testid="search-guides"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
                  !activeFilter 
                    ? "bg-primary text-black shadow-lg shadow-primary/30" 
                    : "bg-[#1C2230] text-gray-400 hover:text-white border border-[#2E384D] hover:border-primary/30"
                }`}
                data-testid="filter-all"
              >
                <Filter className="w-4 h-4" />
                Tous ({totalGuides})
              </button>
              {categories.map(cat => {
                const Icon = cat.icon;
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(isActive ? null : cat.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      isActive 
                        ? "bg-primary text-black shadow-lg shadow-primary/30" 
                        : "bg-[#1C2230] text-gray-400 hover:text-white border border-[#2E384D] hover:border-primary/30"
                    }`}
                    data-testid={`filter-${cat.id}`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{cat.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded flex-shrink-0 ${isActive ? 'bg-black/20' : 'bg-white/10'}`}>
                      {cat.guides.length}
                    </span>
                  </button>
                );
              })}
            </motion.div>
            
            <motion.div variants={fadeInUp} className="flex justify-center gap-3 mb-4">
              <button
                onClick={expandAll}
                className="text-xs text-gray-500 hover:text-primary transition-colors"
                data-testid="btn-expand-all"
              >
                Tout déplier
              </button>
              <span className="text-gray-700">|</span>
              <button
                onClick={collapseAll}
                className="text-xs text-gray-500 hover:text-primary transition-colors"
                data-testid="btn-collapse-all"
              >
                Tout replier
              </button>
            </motion.div>
          </motion.div>

          {!activeFilter && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  </div>
                  <h2 className="font-display text-lg font-bold text-white">Guides populaires</h2>
                  <span className="text-xs text-yellow-400/70 bg-yellow-500/10 px-2 py-0.5 rounded-full">
                    {popularGuides.length > 0 ? 'Les plus consultés' : 'Recommandés'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {displayPopularGuides.map((guide, index) => {
                    const Icon = guide.icon;
                    return (
                      <Link key={index} href={guide.link}>
                        <div className="group bg-[#1C2230]/80 border-2 border-yellow-500/20 rounded-xl p-4 hover:border-yellow-500/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1">
                          <div className="flex items-start gap-3">
                            <div className={`w-11 h-11 bg-gradient-to-br ${guide.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform flex-shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-white text-sm mb-0.5 group-hover:text-yellow-400 transition-colors leading-tight">
                                {guide.title}
                              </h3>
                              <p className="text-gray-500 text-xs leading-tight">{guide.description}</p>
                              <span className="text-[10px] text-primary/60 mt-1 block">{guide.category}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {filteredCategories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Aucun guide trouvé</h3>
                <p className="text-gray-500">Essayez avec d'autres termes de recherche</p>
              </motion.div>
            ) : (
              filteredCategories.map((category) => {
                const CategoryIcon = category.icon;
                const isExpanded = expandedCategories.has(category.id);
                
                if (category.id === "regles") {
                  return (
                    <motion.div
                      key={category.id}
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                      className="mb-6"
                      layout
                    >
                      <Link href="/regles">
                        <motion.div
                          variants={fadeInUp}
                          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-900/30 via-orange-900/20 to-[#1C2230] border-2 border-amber-500/40 rounded-xl hover:border-amber-400/60 transition-all cursor-pointer group shadow-lg shadow-amber-500/10"
                          data-testid={`link-category-${category.id}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center shadow-lg ring-2 ring-amber-400/30`}>
                              <CategoryIcon className="w-5 h-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2">
                                <h2 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{category.title}</h2>
                                <span className={`text-xs px-2 py-0.5 rounded-full border ${levelColors[category.level]}`}>
                                  {category.level}
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm">{category.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-amber-400/80 text-sm font-medium">{category.guides.length} règles</span>
                            <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                              <ChevronRight className="w-5 h-5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                }
                
                return (
                  <motion.div
                    key={category.id}
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="mb-6"
                    layout
                  >
                    <motion.button
                      variants={fadeInUp}
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between p-4 bg-[#1C2230] border border-[#2E384D] rounded-xl hover:border-primary/30 transition-all cursor-pointer group"
                      data-testid={`toggle-category-${category.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center shadow-lg`}>
                          <CategoryIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <h2 className="font-display text-lg font-bold text-white group-hover:text-primary transition-colors">{category.title}</h2>
                            <span className={`text-xs px-2 py-0.5 rounded-full border ${levelColors[category.level]}`}>
                              {category.level}
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm">{category.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 text-sm">{category.guides.length} guides</span>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </motion.button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3 pt-4">
                            {category.guides.map((guide, index) => {
                              const Icon = guide.icon;
                              return (
                                <motion.div 
                                  key={index} 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: index * 0.03 }}
                                >
                                  <Link href={guide.link}>
                                    <div className="group h-full bg-[#1C2230] border border-[#2E384D] rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 text-center relative">
                                      {guide.featured && (
                                        <div className="absolute -top-1.5 -right-1.5">
                                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        </div>
                                      )}
                                      <div className={`w-12 h-12 bg-gradient-to-br ${guide.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6 text-white" />
                                      </div>
                                      <h3 className="font-bold text-white text-sm mb-1 group-hover:text-primary transition-colors leading-tight">
                                        {guide.title}
                                      </h3>
                                      <p className="text-gray-500 text-xs leading-tight">
                                        {guide.description}
                                      </p>
                                    </div>
                                  </Link>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-primary/10 to-cyan-900/20 border border-primary/30 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <h3 className="font-display text-lg font-bold text-white">Contribuez aux tutoriels !</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Ces guides ont été rassemblés de toutes les sources possibles et inimaginables afin de vous offrir 
              un endroit unique où retrouver tous les tutoriels OGame. Vous souhaitez participer ?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/suggestion-tutoriel">
                <span className="inline-flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer">
                  <MessageSquare className="w-4 h-4" />
                  Proposer via suggestions
                </span>
              </Link>
              <a 
                href="https://discord.gg/3PWk4HmfNn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 text-[#5865F2] px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Users className="w-4 h-4" />
                Partager sur Discord
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0D1117] border border-[#2E384D] rounded-2xl p-8 mt-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Aperçu des Tutoriels
                </h2>
                <p className="text-gray-400">
                  Apprenez les stratégies avec <span className="text-primary">@7020Psykose</span>
                </p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700 mt-4 md:mt-0" asChild>
                <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer" data-testid="link-youtube">
                  Voir la chaîne
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a 
                href="https://www.youtube.com/@7020Psykose" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=225&fit=crop" 
                    alt="Tutoriel"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                    TUTORIEL
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-white group-hover:text-red-400 transition-colors mb-1">
                  Prise en retour d'attaque
                </h3>
                <p className="text-gray-500 text-sm">
                  Calculez le retour de flotte ennemi à la seconde près.
                </p>
              </a>

              <a 
                href="https://www.youtube.com/@7020Psykose" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=225&fit=crop" 
                    alt="Stratégie"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded">
                    STRATÉGIE
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-white group-hover:text-red-400 transition-colors mb-1">
                  Guide LifeForms
                </h3>
                <p className="text-gray-500 text-sm">
                  Optimisez vos bonus raciaux et boostez votre économie.
                </p>
              </a>

              <a 
                href="https://www.youtube.com/@7020Psykose" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group cursor-pointer"
              >
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=400&h=225&fit=crop" 
                    alt="Combat"
                    className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">
                    COMBAT
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-white group-hover:text-red-400 transition-colors mb-1">
                  Mécaniques de Combat
                </h3>
                <p className="text-gray-500 text-sm">
                  RapidFire, ordre de tir et composition de flotte.
                </p>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-[#5865F2]/20 to-[#5865F2]/5 border border-[#5865F2]/30 rounded-xl p-6 mt-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#5865F2] rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="font-display text-lg font-bold text-white mb-1">
                  Aide personnalisée
                </h2>
                <p className="text-gray-400 text-sm mb-3">
                  180 membres prêts à vous aider sur Discord
                </p>
              </div>
              <Button className="bg-[#5865F2] hover:bg-[#4752C4]" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer" data-testid="link-discord">
                  Rejoindre Discord
                  <ExternalLink className="w-3 h-3 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

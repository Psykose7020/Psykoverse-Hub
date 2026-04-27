import {
  Users, Factory, FlaskConical,
  Rocket, Globe, BookText, AlertTriangle,
  GraduationCap, Compass, Trophy, Shield, Eye, Crosshair, Moon, Globe2,
  Target, TrendingUp, Ghost, Layers, Bomb, Plane,
  ArrowLeftRight, Swords, Dna, Settings, Search,
  Star, Clock, Zap, Network, Mountain, Calculator, Fuel, Monitor, Scale
} from "lucide-react";

export const guideCategories = [
  {
    id: "regles",
    title: "Règles du Jeu",
    description: "Les règles officielles d'OGame.fr",
    icon: Scale,
    color: "from-amber-500 to-orange-600",
    level: "Important",
    guides: [
      { title: "VPN, IP et Multi-comptes", description: "Règles sur les comptes", icon: Users, color: "from-blue-500 to-cyan-600", link: "/regles/compte", keywords: "vpn ip multi compte ban sanction règles" },
      { title: "Sitting & Échanges", description: "Surveillance de compte", icon: ArrowLeftRight, color: "from-green-500 to-emerald-600", link: "/regles/sitting", keywords: "sitting échange surveillance compte absence vacances" },
      { title: "Push & Pull", description: "Commerce et mercenariat", icon: TrendingUp, color: "from-amber-500 to-orange-600", link: "/regles/push", keywords: "push pull mercenaire commerce échange ressources" },
      { title: "Bash", description: "Limite d'attaques", icon: Swords, color: "from-red-500 to-rose-600", link: "/regles/bash", keywords: "bash limite attaque 6 fois 24h règle" }
    ]
  },
  {
    id: "bases",
    title: "Les bases du jeu",
    description: "Comprendre l'univers OGame et ses mécaniques fondamentales",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-600",
    level: "Débutant",
    guides: [
      { title: "L'Interface", description: "Vue d'ensemble du jeu", icon: Monitor, color: "from-blue-500 to-cyan-600", link: "/guide/interface", featured: true, keywords: "interface menu ressources métal cristal deutérium antimatière énergie" },
      { title: "Jargon", description: "Vocabulaire de la communauté", icon: BookText, color: "from-amber-500 to-orange-600", link: "/guide/jargon", keywords: "jargon vocabulaire ghost opé fs fleetsave raid mb dg acs rip edlm pt gt vb bb bc" },
      { title: "Univers", description: "Caractéristiques et paramètres", icon: Settings, color: "from-indigo-500 to-purple-600", link: "/guide/univers", keywords: "univers vitesse économie flotte debris galaxies systèmes" },
      { title: "Les Classes", description: "Collecteur, Général, Explorateur", icon: Users, color: "from-purple-500 to-pink-600", link: "/guide/classes", featured: true, keywords: "classe collecteur général explorateur bonus production combat expédition" },
      { title: "Classes Alliance", description: "Guerrier, Marchand, Chercheur", icon: Users, color: "from-violet-500 to-purple-600", link: "/guide/alliance-classes", keywords: "alliance classe guerrier marchand chercheur bonus" },
      { title: "Lune & CDR", description: "Champs de débris et lunes", icon: Moon, color: "from-gray-500 to-slate-700", link: "/guide/lune", keywords: "lune cdr champs débris recyclage taille probabilité" }
    ]
  },
  {
    id: "economie",
    title: "Économie & Infrastructure",
    description: "Construire une base économique solide",
    icon: Factory,
    color: "from-emerald-500 to-teal-600",
    level: "Débutant",
    guides: [
      { title: "Production", description: "Mines et gestion de l'énergie", icon: Factory, color: "from-green-500 to-emerald-600", link: "/guide/production", featured: true, keywords: "mine métal cristal deutérium synthétiseur énergie solaire fusion plasma rentabilité" },
      { title: "Technos Prioritaires", description: "Les 10 étapes clés", icon: FlaskConical, color: "from-teal-500 to-emerald-600", link: "/guide/technos-prioritaires", featured: true, keywords: "technologie recherche priorité réacteur combustion impulsion hyperespace" },
      { title: "Recherches", description: "Arbre des technologies", icon: FlaskConical, color: "from-teal-500 to-cyan-600", link: "/guide/recherches", keywords: "recherche technologie arbre laboratoire espionnage armement bouclier" },
      { title: "Chantier spatial et défense", description: "Vaisseaux et défenses", icon: Rocket, color: "from-slate-500 to-slate-700", link: "/guide/chantier", keywords: "chantier spatial vaisseau défense construction" },
      { title: "Coûts Flotte & Défenses", description: "Calculateur de ressources", icon: Rocket, color: "from-orange-500 to-red-600", link: "/guide/cout-flotte", featured: true, keywords: "coût flotte défense calculateur ressources métal cristal deutérium" },
      { title: "Formules & Calculateurs", description: "Outils de calcul interactifs", icon: Calculator, color: "from-emerald-500 to-teal-600", link: "/guide/formules", keywords: "formule calculateur temps vol vitesse consommation distance production" },
      { title: "Développement", description: "Stratégie de compte", icon: TrendingUp, color: "from-emerald-500 to-green-600", link: "/guide/developpement", keywords: "développement stratégie compte évolution progression" },
      { title: "Ordre de Construction", description: "Robot, Nanite, Chantier optimal", icon: Factory, color: "from-cyan-500 to-blue-600", link: "/guide/ordre-construction", featured: true, keywords: "ordre construction robot nanite chantier spatial optimisation temps réduction" }
    ]
  },
  {
    id: "expansion",
    title: "Expansion Galactique",
    description: "Étendre et consolider son empire",
    icon: Globe2,
    color: "from-teal-500 to-cyan-600",
    level: "Intermédiaire",
    guides: [
      { title: "Colonisation", description: "Étendre son empire", icon: Globe2, color: "from-green-500 to-teal-600", link: "/guide/colonisation", featured: true, keywords: "colonisation colonie vaisseau colonisation planète cases emplacement" },
      { title: "Galaxie", description: "Navigation et exploration", icon: Globe, color: "from-indigo-500 to-purple-600", link: "/guide/galaxie", keywords: "galaxie système navigation exploration position" },
      { title: "Expéditions", description: "Explorer l'espace profond", icon: Compass, color: "from-indigo-500 to-blue-600", link: "/guide/expeditions", keywords: "expédition explorateur antimatière ressources flotte pirate alien slot item objet épuisement système cargo pathfinder" },
      { title: "Volantes", description: "Flotte mobile défensive", icon: Plane, color: "from-cyan-500 to-blue-600", link: "/guide/volante", keywords: "volante défense mobile flotte stationnement bunker" },
      { title: "Optimisation RRI", description: "Réseau de Recherche Intergalactique", icon: Network, color: "from-purple-500 to-indigo-600", link: "/guide/rri", keywords: "rri réseau recherche intergalactique laboratoire bonus niveau" }
    ]
  },
  {
    id: "renseignement",
    title: "Renseignement & Préparation",
    description: "Préparer ses raids avec précision",
    icon: Eye,
    color: "from-violet-500 to-purple-600",
    level: "Intermédiaire",
    guides: [
      { title: "Espionnage", description: "Renseignement et infiltration", icon: Eye, color: "from-violet-500 to-purple-600", link: "/guide/espionnage", featured: true, keywords: "espionnage sonde rapport technologie niveau flotte défense ressources" },
      { title: "Activité", description: "Triangle d'activité", icon: AlertTriangle, color: "from-red-500 to-red-700", link: "/guide/activite", keywords: "activité triangle 15 minutes astérisque étoile inactif" },
      { title: "Recherche Cibles", description: "Trouver les meilleures proies", icon: Search, color: "from-violet-500 to-purple-600", link: "/guide/recherche-cibles", featured: true, keywords: "cible proie inactif ressources rentabilité scan" },
      { title: "Reco de 3h00", description: "Confirmer l'absence d'une cible", icon: Clock, color: "from-indigo-500 to-purple-600", link: "/guide/reco-3h", keywords: "reco reconnaissance 3h nuit absence connexion" },
      { title: "Décalage à la Sonde", description: "Détecter les DG", icon: Eye, color: "from-cyan-500 to-blue-600", link: "/guide/decalage-sonde", keywords: "décalage sonde détection dg contre-attaque piège" },
      { title: "Timing & Connexions", description: "Exploiter les habitudes", icon: Clock, color: "from-amber-500 to-orange-600", link: "/guide/timing-raid", keywords: "timing connexion habitude heure raid nuit absence" }
    ]
  },
  {
    id: "offensive",
    title: "Offensive & Coordination",
    description: "Maîtriser l'art de l'attaque",
    icon: Crosshair,
    color: "from-red-500 to-rose-600",
    level: "Avancé",
    guides: [
      { title: "Attaque", description: "Bases du combat", icon: Crosshair, color: "from-red-500 to-rose-600", link: "/guide/attaque", keywords: "attaque combat mission ressources pillage butin" },
      { title: "Tips du Bon Raideur", description: "Les bases pour réussir", icon: Target, color: "from-orange-500 to-red-600", link: "/guide/raid", featured: true, keywords: "raid raideur pillage ressources profit rentabilité inactif" },
      { title: "Split Flotte (Dégroupage)", description: "Optimiser l'ordre d'attaque", icon: Layers, color: "from-purple-500 to-violet-600", link: "/guide/split", keywords: "split dégroupage flotte ordre attaque vagues temps vol" },
      { title: "ACS", description: "Combat en groupe", icon: Users, color: "from-orange-500 to-amber-600", link: "/guide/acs", keywords: "acs combat groupe alliance coordination attaque défense" },
      { title: "Rapid Fire", description: "Tirs multiples en combat", icon: Zap, color: "from-yellow-500 to-orange-600", link: "/guide/rapid-fire", featured: true, keywords: "rapid fire rf tir multiple combat vaisseau contre" }
    ]
  },
  {
    id: "protection",
    title: "Protection & Contre-mesures",
    description: "Protéger sa flotte et contrer les attaques",
    icon: Shield,
    color: "from-blue-600 to-indigo-700",
    level: "Avancé",
    guides: [
      { title: "Ghost (Fleetsave)", description: "12 techniques de protection", icon: Ghost, color: "from-blue-600 to-indigo-700", link: "/guide/fleetsave", featured: true, keywords: "ghost fleetsave fs opé protection flotte nuit absence mission transport déploiement expédition" },
      { title: "Guide des Défenses", description: "Construire une défense efficace", icon: Shield, color: "from-blue-500 to-indigo-600", link: "/guide/defenses", featured: true, keywords: "défense lm llo lg gauss ion plasma bouclier dôme bunker protection" },
      { title: "Éviter Interception", description: "Raider en sécurité", icon: Shield, color: "from-blue-500 to-cyan-600", link: "/guide/eviter-interception", keywords: "interception contre-attaque dg phalange sécurité retour" },
      { title: "MoonBreak", description: "Destruction de lune", icon: Bomb, color: "from-red-600 to-red-800", link: "/guide/moonbreak", keywords: "moonbreak mb destruction lune rip edlm étoile mort probabilité vague fatale" },
      { title: "Classements", description: "Points d'honneur et gestion PH", icon: Trophy, color: "from-yellow-500 to-amber-600", link: "/guide/classements", keywords: "classement points honneur ph rang top militaire économie recherche" }
    ]
  },
  {
    id: "expert",
    title: "Spécialisations Expert",
    description: "Mécaniques avancées et formes de vie",
    icon: Dna,
    color: "from-purple-500 to-pink-600",
    level: "Expert",
    guides: [
      { title: "Rapid Fire (Expert)", description: "Formules et calculs détaillés du RF", icon: Calculator, color: "from-purple-500 to-pink-600", link: "/guide/rapid-fire-formules", keywords: "rapid fire rf formule calcul probabilité dégâts combat" },
      { title: "Guide Complet FDV", description: "Races, recherches, artéfacts", icon: Dna, color: "from-purple-500 to-pink-600", link: "/guide/fdv", featured: true, keywords: "fdv forme vie race humain rocktal mecha kaelesh artéfact recherche bonus" },
      { title: "Rock'tal & Mineur", description: "Développer les FDV pour mineurs", icon: Mountain, color: "from-amber-500 to-orange-600", link: "/guide/rocktal", keywords: "rocktal mineur fdv forme vie production bonus mine" },
      { title: "Réduction Temps FDV", description: "Cap -99% et optimisation", icon: Clock, color: "from-purple-500 to-pink-600", link: "/guide/reduction-fdv", keywords: "réduction temps fdv forme vie cap 99 optimisation construction recherche" }
    ]
  },
  {
    id: "outils",
    title: "Outils & Références",
    description: "Les outils publics utiles de Psykoverse et les références externes recommandées",
    icon: Calculator,
    color: "from-emerald-500 to-teal-600",
    level: "Tous niveaux",
    guides: [
      { title: "Convertisseur de combat", description: "Référence externe OGameDB pour convertir un RC proprement", icon: Swords, color: "from-red-500 to-orange-600", link: "https://ogamedb.com/en/tools/combat-converter", featured: true, keywords: "convertisseur combat rc rapport combat ogamedb référence externe" },
      { title: "Répartiteur de butin", description: "Référence externe OGameDB pour le partage ACS du profit", icon: ArrowLeftRight, color: "from-amber-500 to-yellow-500", link: "https://ogamedb.com/en/tools/profit-splitter", featured: true, keywords: "répartiteur butin profit splitter ogamedb référence externe" },
      { title: "Serveurs OGame", description: "Référence externe OGameDB pour parcourir les univers et leurs réglages", icon: Globe, color: "from-cyan-500 to-blue-600", link: "https://ogamedb.com/en/tools/servers?q=server%3Afr", featured: true, keywords: "serveurs ogame univers ogamedb référence externe" },
      { title: "Simulation de production", description: "Comparez base et scénario de progression", icon: Factory, color: "from-green-500 to-emerald-600", link: "/outils/production", featured: true, keywords: "simulation production mine métal cristal deutérium fdv foreuse scenario" },
      { title: "Simulateur de combat", description: "Référence externe OGame Tools pour les réglages et simulations de combat", icon: Crosshair, color: "from-violet-500 to-fuchsia-600", link: "https://simulator.ogame-tools.com/fr", featured: true, keywords: "simulateur combat ogame tools référence externe" },
      { title: "Intercepteur de flotte", description: "Retrouvez une heure de retour à partir des horodatages connus", icon: Crosshair, color: "from-red-500 to-orange-600", link: "/outils/intercepteur", featured: true, keywords: "intercepteur flotte retour ennemi phalange rappel arrivée départ calcul rapide" },
      { title: "Calculateur MoonBreak", description: "Probabilités de destruction de lune", icon: Bomb, color: "from-red-600 to-red-800", link: "/outils/moonbreak", keywords: "calculateur moonbreak mb destruction lune rip probabilité vague fatale" }
    ]
  }
];

export const allGuides = guideCategories.flatMap((category) =>
  category.guides.map((guide) => ({
    ...guide,
    categoryId: category.id,
    categoryTitle: category.title,
    categoryDescription: category.description,
    level: category.level,
  })),
);

export const totalGuideCount = guideCategories.reduce((acc, cat) => acc + cat.guides.length, 0);
export const featuredGuideCount = allGuides.filter((guide) => guide.featured).length;
export const toolGuideCount = guideCategories.find((category) => category.id === "outils")?.guides.length ?? 0;
export const rulesGuideCount = guideCategories.find((category) => category.id === "regles")?.guides.length ?? 0;
export const beginnerGuideCount = guideCategories
  .filter((category) => category.level === "Débutant")
  .reduce((acc, category) => acc + category.guides.length, 0);

export const guideCategorySummaries = guideCategories.map((category) => ({
  id: category.id,
  title: category.title,
  description: category.description,
  icon: category.icon,
  color: category.color,
  level: category.level,
  count: category.guides.length,
}));

export const guidesBySlug = Object.fromEntries(
  allGuides.map((guide) => [
    guide.link.replace("/guide/", "").replace("/regles/", "").replace("/outils/", ""),
    guide,
  ]),
);

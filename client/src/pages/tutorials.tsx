import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Play, BookOpen, Monitor, Users, Factory, FlaskConical, 
  Rocket, Globe, BookText, AlertTriangle, ExternalLink,
  GraduationCap, Compass, Trophy, Shield, Eye, Crosshair, Moon, Globe2,
  Target, TrendingUp, Ghost, Layers, Bomb, Plane, Sparkles, Scale,
  ArrowLeftRight, Swords, Dna, Settings
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

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
    id: "debutant",
    title: "Les Bases du Jeu",
    description: "Tout ce qu'il faut savoir pour bien démarrer",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-600",
    guides: [
      { title: "L'Interface", description: "Vue d'ensemble", icon: Monitor, color: "from-blue-500 to-cyan-600", link: "/guide/interface" },
      { title: "Les Classes", description: "Choisir son style", icon: Users, color: "from-purple-500 to-pink-600", link: "/guide/classes" },
      { title: "Production", description: "Mines et énergie", icon: Factory, color: "from-green-500 to-emerald-600", link: "/guide/production" },
      { title: "Recherches", description: "Technologies", icon: FlaskConical, color: "from-teal-500 to-cyan-600", link: "/guide/recherches" },
      { title: "Chantier", description: "Vaisseaux", icon: Rocket, color: "from-slate-500 to-slate-700", link: "/guide/chantier" },
      { title: "Galaxie", description: "Navigation", icon: Globe, color: "from-indigo-500 to-purple-600", link: "/guide/galaxie" },
      { title: "Jargon", description: "Vocabulaire", icon: BookText, color: "from-amber-500 to-orange-600", link: "/guide/jargon" },
      { title: "Univers", description: "Caractéristiques", icon: Settings, color: "from-indigo-500 to-purple-600", link: "/guide/univers" }
    ]
  },
  {
    id: "expansion",
    title: "Expansion & Développement",
    description: "Développez votre empire galactique",
    icon: Globe2,
    color: "from-teal-500 to-cyan-600",
    guides: [
      { title: "Colonisation", description: "S'étendre", icon: Globe2, color: "from-green-500 to-teal-600", link: "/guide/colonisation" },
      { title: "Expéditions", description: "Explorer", icon: Compass, color: "from-indigo-500 to-blue-600", link: "/guide/expeditions" },
      { title: "Lune & CDR", description: "Débris et lunes", icon: Moon, color: "from-gray-500 to-slate-700", link: "/guide/lune" },
      { title: "Développement", description: "Stratégie compte", icon: TrendingUp, color: "from-emerald-500 to-green-600", link: "/guide/developpement" },
      { title: "Volantes", description: "Flotte mobile", icon: Plane, color: "from-cyan-500 to-blue-600", link: "/guide/volante" }
    ]
  },
  {
    id: "combat",
    title: "Combat & Stratégie",
    description: "Maîtrisez l'art de la guerre spatiale",
    icon: Crosshair,
    color: "from-red-500 to-rose-600",
    guides: [
      { title: "Espionnage", description: "Renseignement", icon: Eye, color: "from-violet-500 to-purple-600", link: "/guide/espionnage" },
      { title: "Attaque", description: "Bases du combat", icon: Crosshair, color: "from-red-500 to-rose-600", link: "/guide/attaque" },
      { title: "Raid Avancé", description: "Techniques pro", icon: Target, color: "from-orange-500 to-red-600", link: "/guide/raid" },
      { title: "Split Flotte", description: "Optimisation", icon: Layers, color: "from-purple-500 to-violet-600", link: "/guide/split" },
      { title: "ACS", description: "Combat groupé", icon: Users, color: "from-orange-500 to-amber-600", link: "/guide/acs" },
      { title: "MoonBreak", description: "Destruction lune", icon: Bomb, color: "from-red-600 to-red-800", link: "/guide/moonbreak" },
      { title: "Classements", description: "Points d'honneur", icon: Trophy, color: "from-yellow-500 to-amber-600", link: "/guide/classements" }
    ]
  },
  {
    id: "defense",
    title: "Défense & Sécurité",
    description: "Protégez votre flotte et vos ressources",
    icon: Shield,
    color: "from-blue-600 to-indigo-700",
    guides: [
      { title: "Ghost", description: "12 techniques", icon: Ghost, color: "from-blue-600 to-indigo-700", link: "/guide/fleetsave" },
      { title: "Activité", description: "Triangle d'activité", icon: AlertTriangle, color: "from-red-500 to-red-700", link: "/guide/activite" }
    ]
  },
  {
    id: "fdv",
    title: "Formes de Vie",
    description: "Les 4 races extraterrestres et leurs bonus",
    icon: Dna,
    color: "from-purple-500 to-pink-600",
    guides: [
      { title: "Guide FDV", description: "Complet & interactif", icon: Dna, color: "from-purple-500 to-pink-600", link: "/guide/fdv" }
    ]
  },
  {
    id: "regles",
    title: "Règles du Jeu",
    description: "Les règles officielles d'OGame.fr",
    icon: Scale,
    color: "from-amber-500 to-orange-600",
    guides: [
      { title: "Comptes", description: "Multicomptes & IP", icon: Users, color: "from-blue-500 to-cyan-600", link: "/regles/compte" },
      { title: "Sitting", description: "Surveillance & échanges", icon: ArrowLeftRight, color: "from-green-500 to-emerald-600", link: "/regles/sitting" },
      { title: "Push & Pull", description: "Commerce & mercenariat", icon: TrendingUp, color: "from-amber-500 to-orange-600", link: "/regles/push" },
      { title: "Bash", description: "Limite d'attaques", icon: Swords, color: "from-red-500 to-rose-600", link: "/regles/bash" }
    ]
  }
];

export default function Tutorials() {
  const totalGuides = categories.reduce((acc, cat) => acc + cat.guides.length, 0);
  
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {totalGuides} guides disponibles
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Guides & Tutoriels
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
              Apprenez à maîtriser OGame avec nos guides complets rédigés par la communauté
            </motion.p>
          </motion.div>

          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="mb-10"
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <CategoryIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">{category.title}</h2>
                    <p className="text-gray-500 text-sm">{category.description}</p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {category.guides.map((guide, index) => {
                    const Icon = guide.icon;
                    return (
                      <motion.div key={index} variants={fadeInUp}>
                        <Link href={guide.link}>
                          <div className="group h-full bg-[#1C2230] border border-[#2E384D] rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 text-center">
                            <div className={`w-10 h-10 bg-gradient-to-br ${guide.color} rounded-lg flex items-center justify-center mx-auto mb-2 shadow-lg group-hover:scale-110 transition-transform`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="font-bold text-white text-sm mb-0.5 group-hover:text-primary transition-colors">
                              {guide.title}
                            </h3>
                            <p className="text-gray-500 text-xs">
                              {guide.description}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-700/30 rounded-xl p-6 mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-amber-400" />
              <h3 className="font-display text-lg font-bold text-white">Guides par Triling of Borg</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Les guides Raid Avancé, Split Flotte, MoonBreak, Volantes et Développement sont basés sur le tutoriel 
              complet de Triling of Borg, raideur expérimenté de la communauté OGame.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-red-900/20 to-red-950/20 border border-red-800/30 rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Play className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-lg font-bold text-white mb-1">
                    Tutoriels Vidéo
                  </h2>
                  <p className="text-gray-400 text-sm mb-3">
                    Apprenez visuellement sur YouTube
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700" size="sm" asChild>
                    <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                      <Play className="w-4 h-4 mr-2" />
                      Voir la chaîne
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-[#5865F2]/20 to-[#5865F2]/5 border border-[#5865F2]/30 rounded-xl p-6"
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
                    180 membres prêts à vous aider
                  </p>
                  <Button className="bg-[#5865F2] hover:bg-[#4752C4]" size="sm" asChild>
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                      Rejoindre Discord
                      <ExternalLink className="w-3 h-3 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

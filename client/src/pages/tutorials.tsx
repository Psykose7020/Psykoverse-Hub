import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Play, BookOpen, Monitor, Users, Factory, FlaskConical, 
  Rocket, Globe, BookText, AlertTriangle, ExternalLink, ArrowRight,
  TrendingUp, Sword, Shield, GraduationCap
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
    transition: { staggerChildren: 0.08 }
  }
};

const categories = [
  {
    id: "debutant",
    title: "Débuter sur OGame",
    description: "Les bases essentielles pour bien commencer votre aventure spatiale",
    icon: GraduationCap,
    color: "from-green-500 to-emerald-600",
    guides: [
      { title: "L'Interface du Jeu", description: "Vue d'ensemble et navigation", icon: Monitor, color: "from-blue-500 to-cyan-600", link: "/guide/interface" },
      { title: "Les Classes", description: "Collecteur, Général, Explorateur", icon: Users, color: "from-purple-500 to-pink-600", link: "/guide/classes" },
      { title: "Production & Énergie", description: "Mines, hangars et énergie", icon: Factory, color: "from-green-500 to-emerald-600", link: "/guide/production" },
      { title: "Installations & Recherches", description: "Bâtiments et technologies", icon: FlaskConical, color: "from-teal-500 to-cyan-600", link: "/guide/recherches" },
      { title: "Chantier Spatial", description: "Vaisseaux et défenses", icon: Rocket, color: "from-slate-500 to-slate-700", link: "/guide/chantier" },
      { title: "Galaxie & Alliance", description: "Exploration et coopération", icon: Globe, color: "from-indigo-500 to-purple-600", link: "/guide/galaxie" },
      { title: "Jargon OGamien", description: "Termes et abréviations", icon: BookText, color: "from-amber-500 to-orange-600", link: "/guide/jargon" },
      { title: "Triangle d'Activité", description: "Indicateur et sécurité", icon: AlertTriangle, color: "from-red-500 to-red-700", link: "/guide/activite" }
    ]
  },
  {
    id: "economie",
    title: "Économie & Production",
    description: "Maximisez vos ressources et votre croissance",
    icon: TrendingUp,
    color: "from-yellow-500 to-amber-600",
    guides: []
  },
  {
    id: "combat",
    title: "Combat & Stratégie",
    description: "Maîtrisez l'art de la guerre spatiale",
    icon: Sword,
    color: "from-red-500 to-rose-600",
    guides: []
  },
  {
    id: "defense",
    title: "Défense & Sécurité",
    description: "Protégez vos planètes et votre flotte",
    icon: Shield,
    color: "from-blue-600 to-indigo-700",
    guides: []
  }
];

export default function Tutorials() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Centre d'apprentissage
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Guides & Tutoriels
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
              Des guides complets rédigés par la communauté pour vous accompagner dans votre conquête spatiale
            </motion.p>
          </motion.div>

          {categories.map((category, catIndex) => {
            const CategoryIcon = category.icon;
            if (category.guides.length === 0) return null;
            
            return (
              <motion.div
                key={category.id}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="mb-12"
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <CategoryIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">{category.title}</h2>
                    <p className="text-gray-400 text-sm">{category.description}</p>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.guides.map((guide, index) => {
                    const Icon = guide.icon;
                    return (
                      <motion.div key={index} variants={fadeInUp}>
                        <Link href={guide.link}>
                          <div className="group h-full bg-[#1C2230] border border-[#2E384D] rounded-xl p-5 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                            <div className={`w-12 h-12 bg-gradient-to-br ${guide.color} rounded-lg flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="font-bold text-white mb-1 group-hover:text-primary transition-colors">
                              {guide.title}
                            </h3>
                            <p className="text-gray-500 text-sm mb-3">
                              {guide.description}
                            </p>
                            <div className="flex items-center text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              Lire
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}

          {categories.filter(c => c.guides.length === 0).length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="font-display text-xl font-bold text-white mb-4">Prochainement</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.filter(c => c.guides.length === 0).map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <div key={category.id} className="bg-[#151924] border border-[#2E384D] rounded-xl p-5 opacity-60">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center opacity-50`}>
                          <CategoryIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-400">{category.title}</h3>
                          <p className="text-gray-600 text-xs">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-red-900/20 to-red-950/20 border border-red-800/30 rounded-2xl p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Play className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-display text-xl font-bold text-white mb-2">
                  Tutoriels Vidéo
                </h2>
                <p className="text-gray-400 text-sm mb-4">
                  Découvrez nos tutoriels vidéo sur YouTube
                </p>
                <Button className="bg-red-600 hover:bg-red-700" asChild>
                  <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4 mr-2" />
                    Chaîne YouTube
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-[#5865F2]/20 to-[#5865F2]/5 border border-[#5865F2]/30 rounded-2xl p-8 text-center"
          >
            <h2 className="font-display text-xl font-bold text-white mb-2">
              Besoin d'aide ?
            </h2>
            <p className="text-gray-400 mb-4 text-sm">
              Rejoignez notre Discord pour poser vos questions
            </p>
            <Button className="bg-[#5865F2] hover:bg-[#4752C4]" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Rejoindre le Discord
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

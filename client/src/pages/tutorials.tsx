import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Play, BookOpen, Monitor, Users, Factory, FlaskConical, 
  Rocket, Globe, BookText, AlertTriangle, ExternalLink, ArrowRight
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

const guides = [
  {
    title: "L'Interface du Jeu",
    description: "Comprendre la vue d'ensemble et naviguer efficacement dans OGame",
    icon: Monitor,
    color: "from-blue-500 to-cyan-600",
    link: "/guide/interface"
  },
  {
    title: "Les Classes",
    description: "Collecteur, Général ou Explorateur : choisissez votre style de jeu",
    icon: Users,
    color: "from-purple-500 to-pink-600",
    link: "/guide/classes"
  },
  {
    title: "Production & Énergie",
    description: "Maîtrisez vos mines, hangars et sources d'énergie",
    icon: Factory,
    color: "from-green-500 to-emerald-600",
    link: "/guide/production"
  },
  {
    title: "Installations & Recherches",
    description: "Développez vos bâtiments et technologies",
    icon: FlaskConical,
    color: "from-teal-500 to-cyan-600",
    link: "/guide/recherches"
  },
  {
    title: "Chantier Spatial",
    description: "Construisez vos vaisseaux et défenses",
    icon: Rocket,
    color: "from-slate-500 to-slate-700",
    link: "/guide/chantier"
  },
  {
    title: "Galaxie & Alliance",
    description: "Explorez l'univers et rejoignez une alliance",
    icon: Globe,
    color: "from-indigo-500 to-purple-600",
    link: "/guide/galaxie"
  },
  {
    title: "Jargon OGamien",
    description: "Dictionnaire des termes et abréviations de la communauté",
    icon: BookText,
    color: "from-amber-500 to-orange-600",
    link: "/guide/jargon"
  },
  {
    title: "Triangle d'Activité",
    description: "Comprendre l'indicateur d'activité et protéger vos planètes",
    icon: AlertTriangle,
    color: "from-red-500 to-red-700",
    link: "/guide/activite"
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
              Guides pour débutants
            </motion.div>
            <motion.h1 variants={fadeInUp} className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Apprenez à maîtriser OGame
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
              Des guides complets rédigés par la communauté pour vous accompagner dans votre conquête spatiale
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          >
            {guides.map((guide, index) => {
              const Icon = guide.icon;
              return (
                <motion.div key={index} variants={fadeInUp}>
                  <Link href={guide.link}>
                    <div className="group h-full bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                      <div className={`w-14 h-14 bg-gradient-to-br ${guide.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {guide.description}
                      </p>
                      <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Lire le guide
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-red-900/20 to-red-950/20 border border-red-800/30 rounded-2xl p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Play className="w-10 h-10 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-display text-2xl font-bold text-white mb-2">
                  Tutoriels Vidéo
                </h2>
                <p className="text-gray-400 mb-4">
                  Découvrez nos tutoriels vidéo sur YouTube pour apprendre visuellement les mécaniques du jeu
                </p>
                <Button className="bg-red-600 hover:bg-red-700" asChild>
                  <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4 mr-2" />
                    Voir la chaîne YouTube
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
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Besoin d'aide personnalisée ?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto">
              Rejoignez notre communauté Discord de 180 membres pour poser vos questions et obtenir des conseils de joueurs expérimentés
            </p>
            <Button className="bg-[#5865F2] hover:bg-[#4752C4]" size="lg" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Rejoindre le Discord Psykoverse
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

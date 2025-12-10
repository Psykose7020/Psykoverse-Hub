import { motion } from "framer-motion";
import { Link } from "wouter";
import { Play, BookOpen, Sword, Shield, Rocket, TrendingUp, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

import thumb1 from "@assets/generated_images/sci-fi_hud_tutorial_thumbnail.png";
import thumb2 from "@assets/generated_images/spaceship_fleet_tactical_view_thumbnail.png";
import thumb3 from "@assets/generated_images/space_battle_tactical_analysis_hud.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const videoTutorials = [
  {
    title: "Optimisation de la production",
    description: "Apprenez à maximiser vos mines et votre économie dès le début de partie.",
    thumbnail: thumb1,
    duration: "12:34",
    category: "Économie"
  },
  {
    title: "Composition de flotte",
    description: "Les meilleures compositions de flotte pour attaquer efficacement.",
    thumbnail: thumb2,
    duration: "18:22",
    category: "Combat"
  },
  {
    title: "Analyse de rapport de combat",
    description: "Comment lire et analyser un RC pour améliorer vos stratégies.",
    thumbnail: thumb3,
    duration: "15:45",
    category: "Combat"
  }
];

const guideCategories = [
  {
    icon: Rocket,
    title: "Débuter sur OGame",
    description: "Les bases essentielles pour bien commencer votre aventure spatiale.",
    guides: [
      { name: "L'Interface du Jeu", link: "/guide/interface", highlight: true },
      { name: "Les Classes de Joueurs", link: "/guide/classes", highlight: true },
      { name: "Production & Énergie", link: "/guide/production", highlight: true },
      { name: "Installations & Recherches", link: "/guide/recherches", highlight: true },
      { name: "Chantier & Dock Spatial", link: "/guide/chantier", highlight: true },
      { name: "Galaxie & Alliance", link: "/guide/galaxie", highlight: true },
      { name: "Jargon OGamien", link: "/guide/jargon", highlight: true },
      { name: "Le Triangle d'Activité", link: "/guide/activite", highlight: true }
    ]
  },
  {
    icon: TrendingUp,
    title: "Économie & Production",
    description: "Maximisez vos ressources et votre croissance.",
    guides: [
      { name: "Ratio mines optimal", link: null, highlight: false },
      { name: "Expéditions rentables", link: null, highlight: false },
      { name: "Commerce inter-joueurs", link: null, highlight: false }
    ]
  },
  {
    icon: Sword,
    title: "Combat & Stratégie",
    description: "Maîtrisez l'art de la guerre spatiale.",
    guides: [
      { name: "Calcul de rentabilité", link: null, highlight: false },
      { name: "Ninja et contre-attaque", link: null, highlight: false },
      { name: "Recyclage efficace", link: null, highlight: false }
    ]
  },
  {
    icon: Shield,
    title: "Défense & Sécurité",
    description: "Protégez vos planètes et votre flotte.",
    guides: [
      { name: "Fleetsave avancé", link: null, highlight: false },
      { name: "Défense optimale", link: null, highlight: false },
      { name: "Moon destruction", link: null, highlight: false }
    ]
  }
];

export default function Tutorials() {
  return (
    <Layout>
      <section className="py-16 md:py-24 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white">
                Tutoriels
              </h1>
            </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              Apprenez à maîtriser OGame grâce à nos guides vidéo et nos fiches thématiques rédigées par des joueurs expérimentés.
            </motion.p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <Play className="w-6 h-6 text-red-500" />
            Tutoriels Vidéo
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {videoTutorials.map((video, index) => (
              <motion.a
                key={index}
                href="https://www.youtube.com/@7020Psykose"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#1C2230] border border-[#2E384D] rounded-lg overflow-hidden hover:border-primary/50 transition-all"
                data-testid={`video-card-${index}`}
              >
                <div className="relative aspect-video">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                  <span className="absolute top-2 left-2 bg-primary/80 text-white text-xs px-2 py-1 rounded">
                    {video.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-400">{video.description}</p>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="text-center mb-16">
            <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
              <a href="https://www.youtube.com/@7020Psykose" target="_blank" rel="noopener noreferrer">
                <Play className="w-5 h-5 mr-2" />
                Voir tous les tutoriels sur YouTube
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-display text-2xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <BookOpen className="w-6 h-6 text-primary" />
            Guides Thématiques
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guideCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6 hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-white text-lg mb-2">{category.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                      <ul className="space-y-2">
                        {category.guides.map((guide, gIndex) => (
                          <li key={gIndex} className="text-sm flex items-center gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${guide.highlight ? 'bg-green-400' : 'bg-primary'}`}></span>
                            {guide.link ? (
                              <Link href={guide.link} className={`hover:underline ${guide.highlight ? 'text-green-400 font-medium' : 'text-gray-300 hover:text-primary'}`}>
                                {guide.name}
                                {guide.highlight && <span className="ml-2 text-[10px] bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded uppercase">Disponible</span>}
                              </Link>
                            ) : (
                              <span className="text-gray-500">{guide.name}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-12 p-6 bg-[#151924] border border-[#2E384D] rounded-lg text-center">
            <p className="text-gray-400 mb-4">
              Besoin d'aide personnalisée ? Rejoignez notre Discord et posez vos questions dans le salon support !
            </p>
            <Button asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Obtenir de l'aide sur Discord
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

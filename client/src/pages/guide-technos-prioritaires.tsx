import { motion } from "framer-motion";
import { FlaskConical, Rocket, Globe2, Cpu, Zap, Compass, Atom } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const etapes = [
  {
    numero: 1,
    titre: "Astrophysique",
    description: "Débloquer la colonisation",
    icon: Globe2,
    color: "from-green-500 to-teal-600",
    details: "Priorité absolue pour pouvoir coloniser et développer votre empire.",
    link: "/guide/colonisation"
  },
  {
    numero: 2,
    titre: "Combustion 6",
    description: "Débloquer les Grands Transporteurs",
    icon: Rocket,
    color: "from-orange-500 to-red-600",
    details: "Les GT sont essentiels pour le transport de ressources et les expéditions.",
    link: "/guide/chantier"
  },
  {
    numero: 3,
    titre: "Ordinateur 10+",
    description: "Débloquer la Nanite",
    icon: Cpu,
    color: "from-blue-500 to-cyan-600",
    details: "La nanite accélère drastiquement la construction de vaisseaux et défenses.",
    link: null
  },
  {
    numero: 4,
    titre: "RRI niveau 1",
    description: "Monter un 2ème labo 10+ sur une colo",
    icon: FlaskConical,
    color: "from-purple-500 to-indigo-600",
    details: "Premier pas vers l'accélération de vos recherches.",
    link: "/guide/rri"
  },
  {
    numero: 5,
    titre: "Hyperespace 8",
    description: "Augmenter la soute des GT",
    icon: Zap,
    color: "from-cyan-500 to-blue-600",
    details: "Plus de capacité de fret = plus de ressources par voyage.",
    link: null
  },
  {
    numero: 6,
    titre: "Astrophysique 9",
    description: "Gagner un slot expédition",
    icon: Compass,
    color: "from-indigo-500 to-purple-600",
    details: "Plus d'expéditions = plus de ressources gratuites.",
    link: "/guide/expeditions"
  },
  {
    numero: 7,
    titre: "RRI niveau 4",
    description: "Labo 12 sur 5 planètes",
    icon: FlaskConical,
    color: "from-purple-500 to-pink-600",
    details: "Accélération significative des recherches.",
    link: "/guide/rri"
  },
  {
    numero: 8,
    titre: "Astrophysique 16",
    description: "Gagner un slot expédition",
    icon: Compass,
    color: "from-indigo-500 to-blue-600",
    details: "Encore plus d'expéditions pour accélérer votre croissance.",
    link: "/guide/expeditions"
  },
  {
    numero: 9,
    titre: "Graviton",
    description: "Débloquer l'Étoile de la Mort",
    icon: Atom,
    color: "from-red-500 to-rose-700",
    details: "La technologie ultime pour construire l'EDLM.",
    link: "/guide/moonbreak"
  },
  {
    numero: 10,
    titre: "Hyperespace 14",
    description: "Augmenter encore la soute des GT",
    icon: Zap,
    color: "from-cyan-500 to-teal-600",
    details: "Optimisation maximale de vos transports.",
    link: null
  }
];

export default function GuideTechnosPrioritaires() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20">
                <FlaskConical className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Technologies Prioritaires
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Les 10 étapes clés pour développer efficacement vos recherches
              </p>
            </div>

            <div className="space-y-4">
              {etapes.map((etape, idx) => {
                const Icon = etape.icon;
                const content = (
                  <div className={`bg-[#1C2230] border border-[#2E384D] rounded-xl p-5 ${etape.link ? 'hover:bg-[#232938] transition-colors cursor-pointer group' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${etape.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">
                            Étape {etape.numero}
                          </span>
                          <h3 className="font-display text-lg font-bold text-white">{etape.titre}</h3>
                          {etape.link && (
                            <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto">→</span>
                          )}
                        </div>
                        <p className="text-primary font-medium text-sm mb-1">{etape.description}</p>
                        <p className="text-gray-400 text-sm">{etape.details}</p>
                      </div>
                    </div>
                  </div>
                );

                return etape.link ? (
                  <Link key={idx} href={etape.link}>
                    {content}
                  </Link>
                ) : (
                  <div key={idx}>{content}</div>
                );
              })}
            </div>

            <div className="mt-8 bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Note importante</h2>
              <p className="text-gray-300">
                Ce plan est un guide général. Les autres technologies (armes, boucliers, blindage, etc.) 
                sont évidemment utiles à monter, mais leur priorité dépend de votre style de jeu. 
                <strong className="text-white"> Adaptez ce plan selon vos objectifs !</strong>
              </p>
            </div>

            <RelatedGuides currentGuide="recherches" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

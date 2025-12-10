import { motion } from "framer-motion";
import { Eye, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideEspionnage() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-5xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-violet-500/20">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                L'Espionnage
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Collectez des informations sur vos cibles avant d'attaquer
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Principe de l'espionnage</h2>
                <p className="text-gray-300 mb-4">
                  L'espionnage permet d'obtenir des informations sur une planète ou lune ennemie : 
                  ressources, flotte, défenses, bâtiments et recherches.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Pré-requis :</strong> Construire des sondes d'espionnage et développer la technologie Espionnage.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Technologie Espionnage</h2>
                <p className="text-gray-300 mb-4">
                  Plus votre niveau de technologie Espionnage est élevé par rapport à la cible, 
                  plus vous obtiendrez d'informations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Niveau supérieur à la cible</h3>
                    <p className="text-gray-400 text-sm">Vous voyez tout : ressources, flotte, défenses, bâtiments, recherches</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Niveau inférieur à la cible</h3>
                    <p className="text-gray-400 text-sm">Informations partielles, risque de contre-espionnage</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Nombre de sondes</h2>
                <p className="text-gray-300 mb-4">
                  Envoyer plus de sondes augmente vos chances d'obtenir des informations complètes, 
                  mais aussi le risque que vos sondes soient détruites.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">1-2</div>
                    <div className="text-xs text-gray-500">Discret mais limité</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">5-10</div>
                    <div className="text-xs text-gray-500">Bon compromis</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-amber-400 mb-1">20+</div>
                    <div className="text-xs text-gray-500">Maximum d'infos</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le rapport d'espionnage</h2>
                <p className="text-gray-300 mb-4">
                  Le rapport d'espionnage (RE) affiche les informations collectées. Plus votre niveau 
                  d'espionnage est élevé, plus vous voyez de détails.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">Ressources sur la planète</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                    <span className="text-gray-300">Flotte stationnée</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                    <span className="text-gray-300">Défenses en place</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
                    <span className="text-gray-300">Bâtiments (si niveau suffisant)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                    <span className="text-gray-300">Recherches (si niveau suffisant)</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-amber-400 mb-4">Contre-espionnage</h2>
                <p className="text-gray-300 mb-4">
                  Si la cible a un niveau d'espionnage supérieur ou une flotte en défense, 
                  vos sondes peuvent être détruites avant d'envoyer leur rapport.
                </p>
                <p className="text-sm text-amber-300">
                  <strong>Conseil :</strong> Montez votre technologie Espionnage et envoyez plusieurs sondes pour être sûr.
                </p>
              </div>

              <RelatedGuides currentGuide="espionnage" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

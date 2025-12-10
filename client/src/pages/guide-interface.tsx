import { motion } from "framer-motion";
import { Monitor, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const zones = [
  { color: "bg-white", label: "Blanc", description: "Pseudo, classement, notes, amis, recherche, options, support et déconnexion. Heure et date du serveur à droite." },
  { color: "bg-pink-500", label: "Rose", description: "Vos ressources : Métal, Cristal, Deutérium (actualisées en temps réel), Antimatière et Énergie." },
  { color: "bg-yellow-500", label: "Jaune", description: "Sélection de classe (Collecteur, Général ou Explorateur)." },
  { color: "bg-blue-500", label: "Bleu", description: "Les officiers (options payantes apportant des bonus)." },
  { color: "bg-gray-500", label: "Gris", description: "Accès au tutoriel et aux récompenses des 7 premiers jours." },
  { color: "bg-red-500", label: "Rouge", description: "Vue événements : tous les mouvements de flotte en cours. Messagerie à côté." },
  { color: "bg-green-500", label: "Vert", description: "Menu principal avec tous les onglets du jeu." },
  { color: "bg-orange-500", label: "Orange", description: "Caractéristiques de votre planète et accès aux items planétaires." },
  { color: "bg-purple-500", label: "Violet", description: "Vue de toutes vos planètes et lunes." },
  { color: "bg-amber-700", label: "Marron", description: "Constructions et recherches en cours sur la planète." }
];

export default function GuideInterface() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                <Monitor className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                L'Interface du Jeu
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comprendre la vue d'ensemble et naviguer efficacement
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide pour débutants • Source : Communauté OGame
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Vue d'ensemble</h2>
                <p className="text-gray-300 mb-6">
                  La vue d'ensemble est l'interface principale du jeu. Elle donne accès à toutes les fonctionnalités : 
                  options, paramètres du compte, ressources, et navigation.
                </p>
                <div className="bg-[#0B0E14] rounded-lg p-4 mb-6">
                  <img 
                    src="https://img.tedomum.net/data/FaQ%201-8e2ee4.png" 
                    alt="Vue d'ensemble OGame"
                    className="rounded w-full"
                  />
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Détail de l'interface</h2>
                <div className="bg-[#0B0E14] rounded-lg p-4 mb-6">
                  <img 
                    src="https://img.tedomum.net/data/Tuto%202-12afb5.png" 
                    alt="Interface détaillée"
                    className="rounded w-full"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {zones.map((zone, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                      <div className={`w-4 h-4 ${zone.color} rounded flex-shrink-0 mt-1`}></div>
                      <div>
                        <span className="font-bold text-white text-sm">{zone.label}</span>
                        <p className="text-gray-400 text-xs mt-1">{zone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Comprendre les pré-requis</h2>
                <p className="text-gray-300 mb-4">
                  Dans OGame, certains bâtiments, recherches, défenses ou vaisseaux nécessitent des pré-requis. 
                  Pour les voir, cliquez sur le <span className="text-primary font-bold">?</span> en bas à gauche de chaque élément.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#0B0E14] rounded-lg p-3">
                    <img 
                      src="https://img.tedomum.net/data/FaQ%203-6571db.png" 
                      alt="Bouton pré-requis"
                      className="rounded w-full"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">1. Cliquez sur le ?</p>
                  </div>
                  <div className="bg-[#0B0E14] rounded-lg p-3">
                    <img 
                      src="https://img.tedomum.net/data/FaQ%204-5f846d.png" 
                      alt="Fiche technique"
                      className="rounded w-full"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">2. Fiche technique</p>
                  </div>
                  <div className="bg-[#0B0E14] rounded-lg p-3">
                    <img 
                      src="https://img.tedomum.net/data/FaQ%205-85117c.png" 
                      alt="Liste des pré-requis"
                      className="rounded w-full"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">3. Tous les pré-requis</p>
                  </div>
                </div>
              </div>

              <RelatedGuides currentGuide="interface" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

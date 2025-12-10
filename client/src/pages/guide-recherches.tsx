import { motion } from "framer-motion";
import { FlaskConical, Building, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const batiments = [
  { nom: "Mine de métal", desc: "Production de métal" },
  { nom: "Mine de cristal", desc: "Production de cristal" },
  { nom: "Synthétiseur de deutérium", desc: "Production de deutérium" },
  { nom: "Centrale solaire", desc: "Production d'énergie" },
  { nom: "Centrale de fusion", desc: "Énergie (consomme deut)" },
  { nom: "Usine de robots", desc: "Accélère les constructions" },
  { nom: "Usine de nanites", desc: "Accélère énormément" },
  { nom: "Chantier spatial", desc: "Construction de vaisseaux" },
  { nom: "Hangar de métal", desc: "Stockage métal" },
  { nom: "Hangar de cristal", desc: "Stockage cristal" },
  { nom: "Réservoir de deutérium", desc: "Stockage deutérium" },
  { nom: "Laboratoire", desc: "Recherches" },
  { nom: "Dépôt de ravitaillement", desc: "Réduction pillage" },
  { nom: "Silo de missiles", desc: "Stocke missiles" },
  { nom: "Terraformeur", desc: "Ajoute des cases" },
  { nom: "Dock spatial", desc: "Récupère vaisseaux (Général)" }
];

const recherches = [
  { cat: "Propulsion", items: ["Réacteur à combustion", "Réacteur à impulsion", "Propulsion hyperespace"] },
  { cat: "Combat", items: ["Technologie Armes", "Technologie Bouclier", "Technologie Protection"] },
  { cat: "Avancées", items: ["Technologie Hyperespace", "Astrophysique", "Réseau de Recherche Intergalactique"] },
  { cat: "Énergie", items: ["Technologie Énergie", "Technologie Laser", "Technologie Ions", "Technologie Plasma"] }
];

export default function GuideRecherches() {
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
              <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20">
                <FlaskConical className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Installations & Recherches
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Développez votre empire avec les bâtiments et technologies
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide pour débutants • Source : Communauté OGame
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Building className="w-6 h-6 text-teal-400" />
                  Les Installations
                </h2>
                <p className="text-gray-300 mb-6">
                  Les installations sont les bâtiments que vous construisez sur vos planètes. 
                  Chaque bâtiment a un rôle spécifique et peut être amélioré.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {batiments.map((bat, index) => (
                    <div key={index} className="bg-[#151924] rounded-lg p-3">
                      <div className="font-medium text-white text-sm mb-1">{bat.nom}</div>
                      <div className="text-xs text-gray-500">{bat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <FlaskConical className="w-6 h-6 text-purple-400" />
                  Le Laboratoire de Recherche
                </h2>
                <p className="text-gray-300 mb-4">
                  Le laboratoire permet de développer des technologies. Plus son niveau est élevé, 
                  plus vous débloquez de recherches et plus elles sont rapides.
                </p>
                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4 mb-6">
                  <p className="text-sm text-purple-300">
                    <strong>RRI (Réseau de Recherche Intergalactique) :</strong> Permet de combiner les niveaux 
                    de laboratoire de plusieurs planètes pour accélérer les recherches !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Les Recherches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recherches.map((cat, index) => (
                    <div key={index} className="bg-[#151924] rounded-lg p-4">
                      <h3 className="font-bold text-primary mb-3">{cat.cat}</h3>
                      <ul className="space-y-1">
                        {cat.items.map((item, i) => (
                          <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Recherches prioritaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Début de partie</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Technologie Énergie</li>
                      <li>• Réacteur à combustion</li>
                      <li>• Technologie Espionnage</li>
                    </ul>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-blue-400 mb-2">Mi-partie</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Réacteur à impulsion</li>
                      <li>• Astrophysique</li>
                      <li>• Technologie Combat</li>
                    </ul>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-purple-400 mb-2">Fin de partie</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Propulsion Hyperespace</li>
                      <li>• Technologie Plasma</li>
                      <li>• RRI avancé</li>
                    </ul>
                  </div>
                </div>
              </div>

              <RelatedGuides currentGuide="recherches" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

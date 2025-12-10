import { useState } from "react";
import { motion } from "framer-motion";
import { BookText, Search, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const jargon = [
  { terme: "ACS", definition: "Attack Combat System - Attaque groupée avec plusieurs joueurs" },
  { terme: "AM", definition: "Antimatière - Monnaie premium du jeu" },
  { terme: "BB", definition: "Bombardier" },
  { terme: "CDR", definition: "Champ de Débris - Ressources récupérables après un combat" },
  { terme: "CL", definition: "Chasseur Léger" },
  { terme: "CLo", definition: "Chasseur Lourd" },
  { terme: "CR/RC", definition: "Combat Report / Rapport de Combat" },
  { terme: "DEST", definition: "Destructeur" },
  { terme: "EDLM/RIP", definition: "Étoile de la Mort (Rest In Peace)" },
  { terme: "Expo/Expé", definition: "Expédition" },
  { terme: "Farm", definition: "Attaquer régulièrement la même cible inactive" },
  { terme: "FS/Fleetsave", definition: "Sauver sa flotte en l'envoyant en mission pendant son absence" },
  { terme: "GT", definition: "Grand Transporteur" },
  { terme: "HoF", definition: "Hall of Fame - Combat avec beaucoup de pertes (top serveur)" },
  { terme: "(i)", definition: "Joueur inactif (pas connecté depuis 7+ jours)" },
  { terme: "(I)", definition: "Joueur inactif long (pas connecté depuis 28+ jours)" },
  { terme: "Lune/Moon", definition: "Satellite créé après un combat (20% CDR = 20% chance)" },
  { terme: "MD", definition: "Moon Destruction - Destruction de lune avec EDLM" },
  { terme: "Ninja", definition: "Piège où le défenseur rappelle sa flotte pour surprendre l'attaquant" },
  { terme: "PM", definition: "Planète Mère - Votre première planète" },
  { terme: "PT", definition: "Petit Transporteur" },
  { terme: "Raid", definition: "Attaque pour voler des ressources" },
  { terme: "REC", definition: "Recycleur" },
  { terme: "Renta", definition: "Rentabilité - Bénéfice d'une attaque vs pertes" },
  { terme: "RF", definition: "Rapidfire - Bonus d'attaque contre certains vaisseaux" },
  { terme: "SAB", definition: "Stationner Chez un Allié - Défendre un membre d'alliance" },
  { terme: "SE", definition: "Sonde d'Espionnage" },
  { terme: "Simu", definition: "Simulateur de combat (outil externe)" },
  { terme: "Slot", definition: "Emplacement de flotte disponible" },
  { terme: "Spiou", definition: "Espionnage" },
  { terme: "TRAQ", definition: "Traqueur" },
  { terme: "VC", definition: "Vaisseau de Colonisation" },
  { terme: "VB", definition: "Vaisseau de Bataille" }
];

export default function GuideJargon() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJargon = jargon.filter(
    j => j.terme.toLowerCase().includes(searchTerm.toLowerCase()) ||
         j.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
                <BookText className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Jargon OGamien
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Les abréviations et termes utilisés par la communauté
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide pour débutants • Source : Communauté OGame
              </p>
            </div>

            <div className="mb-8">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Rechercher un terme..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#1C2230] border border-[#2E384D] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {filteredJargon.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 border-b border-[#2E384D] md:border-r md:last:border-r-0 ${
                      index % 2 === 0 ? 'md:border-r' : 'md:border-r-0'
                    } last:border-b-0 hover:bg-white/5 transition-colors`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-mono font-bold text-primary bg-primary/10 px-2 py-1 rounded text-sm flex-shrink-0">
                        {item.terme}
                      </span>
                      <span className="text-gray-300 text-sm">{item.definition}</span>
                    </div>
                  </div>
                ))}
              </div>
              {filteredJargon.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  Aucun terme trouvé pour "{searchTerm}"
                </div>
              )}
            </div>

            <RelatedGuides currentGuide="jargon" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

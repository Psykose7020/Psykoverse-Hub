import { motion } from "framer-motion";
import { Globe2, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const positionData = [
  { pos: "1", cases: "96-168", temp: "220°C à 260°C", bonus: "+40% Cristal" },
  { pos: "2", cases: "96-168", temp: "170°C à 210°C", bonus: "+30% Cristal" },
  { pos: "3", cases: "96-168", temp: "120°C à 160°C", bonus: "+20% Cristal" },
  { pos: "4", cases: "138-210", temp: "70°C à 110°C", bonus: "-" },
  { pos: "5", cases: "148-220", temp: "60°C à 100°C", bonus: "-" },
  { pos: "6", cases: "148-226", temp: "50°C à 90°C", bonus: "+17% Métal" },
  { pos: "7", cases: "156-232", temp: "40°C à 80°C", bonus: "+23% Métal" },
  { pos: "8", cases: "163-239", temp: "30°C à 70°C", bonus: "+35% Métal" },
  { pos: "9", cases: "155-231", temp: "20°C à 60°C", bonus: "+23% Métal" },
  { pos: "10", cases: "147-223", temp: "10°C à 50°C", bonus: "+17% Métal" },
  { pos: "11", cases: "147-221", temp: "0°C à 40°C", bonus: "-" },
  { pos: "12", cases: "136-208", temp: "-10°C à 30°C", bonus: "-" },
  { pos: "13", cases: "109-181", temp: "-50°C à -10°C", bonus: "Deut++" },
  { pos: "14", cases: "81-153", temp: "-90°C à -50°C", bonus: "Deut++" },
  { pos: "15", cases: "53-125", temp: "-130°C à -90°C", bonus: "Deut++" }
];

export default function GuideColonisation() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <Globe2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Colonisation & Décolonisation
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Étendez votre empire à travers la galaxie
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">La Colonisation</h2>
                <p className="text-gray-300 mb-4">
                  La colonisation est une étape obligatoire pour développer votre empire. Cela consiste à s'étendre 
                  dans le système solaire ou la galaxie, selon vos choix. Cette étape essentielle demande du temps et de l'investissement.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Pré-requis :</strong> Construire un vaisseau de colonisation et avoir un niveau d'Astrophysique suffisant.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Comment coloniser</h2>
                <p className="text-gray-300 mb-4">
                  Construisez un vaisseau de colonisation et envoyez-le vers une position libre dans la galaxie.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-[#0B0E14] rounded-lg p-4">
                    <img 
                      src="https://img.tedomum.net/data/colo3-4008fb.png" 
                      alt="Mission colonisation"
                      className="rounded w-full"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">Sélectionner la mission Coloniser</p>
                  </div>
                  <div className="bg-[#0B0E14] rounded-lg p-4">
                    <img 
                      src="https://img.tedomum.net/data/vue%20galaxie-396f06.png" 
                      alt="Vue galaxie positions libres"
                      className="rounded w-full"
                    />
                    <p className="text-xs text-gray-500 mt-2 text-center">Positions libres dans la galaxie</p>
                  </div>
                </div>
                <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                  <p className="text-sm text-amber-300">
                    <strong>Attention :</strong> La position n'est pas réservée ! C'est le premier arrivé qui établit la colonie.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Tailles & Températures par position</h2>
                <div className="bg-[#0B0E14] rounded-lg p-4 mb-4">
                  <img 
                    src="https://img.tedomum.net/data/tableau%20pla-6248d8.png" 
                    alt="Tableau des positions"
                    className="rounded w-full"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-2 px-3 text-gray-400">Pos</th>
                        <th className="text-left py-2 px-3 text-gray-400">Cases</th>
                        <th className="text-left py-2 px-3 text-gray-400">Température</th>
                        <th className="text-left py-2 px-3 text-gray-400">Bonus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {positionData.map((row, i) => (
                        <tr key={i} className="border-b border-[#2E384D]/50">
                          <td className="py-2 px-3 text-white font-bold">{row.pos}</td>
                          <td className="py-2 px-3 text-gray-300">{row.cases}</td>
                          <td className="py-2 px-3 text-gray-300">{row.temp}</td>
                          <td className={`py-2 px-3 font-medium ${row.bonus.includes('Cristal') ? 'text-blue-400' : row.bonus.includes('Métal') ? 'text-gray-400' : row.bonus.includes('Deut') ? 'text-cyan-400' : 'text-gray-500'}`}>
                            {row.bonus}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  * Classe Explorateur : +10% de cases. Les bonus d'alliance peuvent aussi augmenter la taille.
                </p>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Décolonisation</h2>
                <p className="text-gray-300 mb-4">
                  La décolonisation permet de supprimer une de vos colonies. Impossible si une flotte est en vol vers/depuis cette planète.
                </p>
                <div className="bg-[#0B0E14] rounded-lg p-4 mb-4">
                  <img 
                    src="https://img.tedomum.net/data/d%C3%A9colo%20bouton-a1ba6b.png" 
                    alt="Bouton décolonisation"
                    className="rounded max-w-md mx-auto"
                  />
                </div>
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <p className="text-sm text-red-300">
                    <strong>Attention :</strong> Tous les bâtiments, défenses, flottes, ressources ET la lune attachée seront détruits !
                    L'emplacement redevient libre après 24h.
                  </p>
                </div>
              </div>

              <RelatedGuides currentGuide="colonisation" />

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Besoin de conseils pour votre expansion ?
                </h3>
                <p className="text-gray-400 mb-6">
                  Rejoignez notre Discord pour discuter stratégie !
                </p>
                <Button size="lg" asChild>
                  <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                    Rejoindre le Discord
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

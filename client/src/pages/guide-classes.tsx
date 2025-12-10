import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Pickaxe, Sword, Compass, ExternalLink, CheckCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const classes = [
  {
    id: "collecteur",
    name: "Collecteur",
    icon: Pickaxe,
    color: "from-yellow-500 to-amber-600",
    vaisseau: "Foreuse",
    bonus: [
      "+25% Production des mines",
      "+100% vitesse des transporteurs",
      "+25% fret des transporteurs",
      "+2 offres supplémentaires au Marché",
      "Taxe Marché réduite à 5%",
      "+10% bonus énergie",
      "Possibilité de surcharger les foreuses à 150%"
    ]
  },
  {
    id: "general",
    name: "Général",
    icon: Sword,
    color: "from-red-500 to-red-700",
    vaisseau: "Faucheur",
    bonus: [
      "+100% vitesse vaisseaux de combat",
      "+100% vitesse recycleurs",
      "-25% consommation tous vaisseaux",
      "+2 slots de flotte",
      "+2 niveaux recherches combat",
      "Dock offensif disponible",
      "Réglage vitesse par tranche de 5%",
      "+5 cases sur lune"
    ]
  },
  {
    id: "explorateur",
    name: "Explorateur",
    icon: Compass,
    color: "from-blue-500 to-indigo-600",
    vaisseau: "Éclaireur",
    bonus: [
      "-25% temps de recherche",
      "+10% cases planètes colonisées",
      "CDR expéditions visible en galaxie",
      "+2 slots d'expédition",
      "+20% portée phalanges",
      "+75% pillage sur inactifs",
      "Gains expé × vitesse univers",
      "-50% chances pirates/aliens"
    ]
  }
];

const vaisseaux = [
  {
    classe: "Collecteur",
    nom: "Foreuse",
    description: "Augmente la production de métal, cristal et deutérium. Immobile comme le satellite.",
    prix: "2.000 M / 2.000 C / 1.000 D",
    special: "Chaque foreuse = +0.03% production (max 50%)"
  },
  {
    classe: "Général",
    nom: "Faucheur",
    description: "Recycle automatiquement une partie du CDR après combat (max 25%).",
    prix: "85.000 M / 55.000 C / 20.000 D",
    special: "Chaque faucheur récupère 10.000 unités"
  },
  {
    classe: "Explorateur",
    nom: "Éclaireur",
    description: "Découvre et collecte les débris des expéditions. Multiplie les gains par 2.",
    prix: "8.000 M / 15.000 C / 8.000 D",
    special: "Gains expédition ×2"
  }
];

export default function GuideClasses() {
  const [activeClass, setActiveClass] = useState("collecteur");

  const selectedClass = classes.find(c => c.id === activeClass)!;
  const Icon = selectedClass.icon;

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
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Les Classes de Joueurs
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Choisissez votre style de jeu et débloquez des bonus uniques
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide pour débutants • Source : Communauté OGame
              </p>
            </div>

            <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-white mb-4">Choix de classe</h2>
              <p className="text-gray-300 mb-4">
                À la première connexion, vous pouvez choisir une classe gratuitement. 
                Ce choix peut être reporté en cliquant sur "Jouer sans classe". 
                Tout changement ultérieur coûte de l'antimatière.
              </p>
              <div className="bg-[#0B0E14] rounded-lg p-4">
                <img 
                  src="https://img.tedomum.net/data/tuto%203-9f26d1.png" 
                  alt="Choix de classe"
                  className="rounded w-full max-w-2xl mx-auto"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {classes.map((c) => {
                const ClassIcon = c.icon;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveClass(c.id)}
                    className={`px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                      activeClass === c.id
                        ? `bg-gradient-to-r ${c.color} text-white shadow-lg`
                        : "bg-[#1C2230] text-gray-400 hover:text-white"
                    }`}
                  >
                    <ClassIcon className="w-4 h-4" />
                    {c.name}
                  </button>
                );
              })}
            </div>

            <motion.div
              key={activeClass}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${selectedClass.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">{selectedClass.name}</h2>
                  <p className="text-gray-400">Vaisseau exclusif : <span className="text-primary">{selectedClass.vaisseau}</span></p>
                </div>
              </div>

              <h3 className="font-bold text-white mb-4">Bonus de classe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedClass.bonus.map((bonus, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-[#151924] rounded">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{bonus}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-white mb-6">Les vaisseaux de classe</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vaisseaux.map((v, index) => (
                  <div key={index} className="bg-[#151924] rounded-lg p-4">
                    <div className="text-xs text-primary uppercase tracking-wider mb-1">{v.classe}</div>
                    <h3 className="font-bold text-white text-lg mb-2">{v.nom}</h3>
                    <p className="text-gray-400 text-sm mb-3">{v.description}</p>
                    <div className="text-xs text-gray-500 mb-2">Prix : {v.prix}</div>
                    <div className="bg-green-900/20 border border-green-700/30 rounded p-2">
                      <p className="text-xs text-green-400">{v.special}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-white mb-4">Tutoriel & Récompenses 7 jours</h2>
              <p className="text-gray-300 mb-4">
                Un tutoriel avec récompenses est disponible pendant les 7 premiers jours. 
                Accédez-y via les icônes en haut de l'écran.
              </p>
              <div className="bg-[#0B0E14] rounded-lg p-4">
                <img 
                  src="https://img.tedomum.net/data/tuto%204-da68a2.png" 
                  alt="Tutoriel et récompenses"
                  className="rounded max-w-md mx-auto"
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Besoin de conseils sur votre choix de classe ?
              </h3>
              <p className="text-gray-400 mb-6">
                Discutez avec des joueurs expérimentés sur Discord !
              </p>
              <Button size="lg" asChild>
                <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                  Rejoindre le Discord
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

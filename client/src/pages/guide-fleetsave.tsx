import { motion } from "framer-motion";
import { Ghost, ExternalLink, AlertTriangle, Check, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const techniques = [
  {
    id: 1,
    title: "Ghost sur CDR invisible depuis une lune",
    description: "Créez un CDR invisible avec une sonde en mode attaque, puis envoyez votre flotte en mode exploiter.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Vitesse variable (10% à 100%)",
      "Souvent moins coûteux en deutérium"
    ],
    inconvenients: [
      "CDR peut être rendu visible par un ennemi",
      "Prévisible si fait régulièrement aux mêmes coordonnées",
      "Heure de retour visible en cas de moonbreak"
    ]
  },
  {
    id: 2,
    title: "Ghost sur CDR invisible leurré",
    description: "Recyclage multiple avant et après votre flotte principale pour créer des leurres.",
    avantages: [
      "Flotte invisible aux phalanges",
      "En cas d'interception, vous perdez probablement que les recycleurs leurres"
    ],
    inconvenients: [
      "Un joueur peut se caler si fait régulièrement",
      "Heure de retour visible en cas de moonbreak"
    ]
  },
  {
    id: 3,
    title: "Ghost en exploiter vers CDR sans planète",
    description: "Un ami colonise puis décolonise après que vous ayez créé un CDR invisible. Le CDR devient impossible à rendre visible.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Adversaire ne peut pas rendre le CDR visible"
    ],
    inconvenients: [
      "Nécessite l'aide d'un ami",
      "En cas de moonbreak, flotte phalangeable au retour"
    ]
  },
  {
    id: 4,
    title: "Ghost en stationner de planète à planète",
    description: "Envoyez en stationner puis rappelez pour que le retour soit invisible.",
    avantages: [
      "Retour invisible aux phalanges",
      "Difficile de calculer l'heure exacte de retour"
    ],
    inconvenients: [
      "Aller visible aux phalanges !",
      "Surveillance peut révéler le moment du rappel"
    ]
  },
  {
    id: 5,
    title: "Ghost en stationner de lune à lune",
    description: "Faites voyager votre flotte en mode stationner vers une autre lune. Récupérez 50% du deutérium si pas de retour.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Possibilité de rappeler",
      "50% deutérium récupéré si pas de retour"
    ],
    inconvenients: [
      "Moonbreak de destination = flotte phalangeable",
      "Flotte séparée = plus vulnérable"
    ]
  },
  {
    id: 6,
    title: "Ghost en stationner planète vers lune",
    description: "Envoyez depuis une planète vers votre lune en mode stationner.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Possibilité de rappeler",
      "50% deutérium récupéré si pas de retour"
    ],
    inconvenients: [
      "Moonbreak = flotte phalangeable au retour"
    ]
  },
  {
    id: 7,
    title: "Ghost vers expédition depuis une lune",
    description: "Envoyez toute votre flotte en mode Expédition vers une position X.X.16.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Impossible d'intercepter à l'aller",
      "Souvent peu coûteux en deutérium"
    ],
    inconvenients: [
      "Moonbreak = très peu de chance de s'en sortir",
      "Risque pirates/aliens",
      "Risque de trou noir (perte totale)",
      "Heure de retour incertaine"
    ]
  },
  {
    id: 8,
    title: "Ghost en coloniser depuis une lune",
    description: "Envoyez votre flotte avec un vdc vers une coordonnée non colonisée.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Impossible d'intercepter (colonie n'existe pas encore)",
      "Peut coûter très peu de deutérium"
    ],
    inconvenients: [
      "Moonbreak = très peu de chance de s'en sortir",
      "Nécessite un vaisseau de colonisation"
    ]
  },
  {
    id: 9,
    title: "Ghost en attaquer lune vers lune",
    description: "Attaquez une lune (de préférence un inactif) depuis votre lune.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Interception à l'aller quasi impossible",
      "Peu de consommation si cible proche"
    ],
    inconvenients: [
      "Moonbreak = très peu de chance de s'en sortir",
      "Un allié peut stationner chez la cible"
    ]
  },
  {
    id: 10,
    title: "Ghost en transporter lune vers lune",
    description: "Envoyez en mode transporter vers la lune d'un ami.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Peu de consommation si ami proche"
    ],
    inconvenients: [
      "Moonbreak = peu de chance de s'en sortir",
      "Impossible de transporter des ressources",
      "Confiance totale envers l'ami requise"
    ]
  },
  {
    id: 11,
    title: "Ghost en espionner lune vers lune",
    description: "Envoyez en mode espionner vers la lune d'un ami.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Peu de consommation si ami proche",
      "Ressources conservées (non livrées)"
    ],
    inconvenients: [
      "Moonbreak = peu de chance de s'en sortir",
      "Nécessite au moins 1 sonde",
      "Confiance totale envers l'ami requise",
      "Risque si l'ami a une grosse flotte à quai"
    ]
  },
  {
    id: 12,
    title: "Ghost en stationner allié lune vers lune",
    description: "Stationner chez un allié (0h de stationnement) depuis votre lune vers sa lune.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Peu de consommation si ami proche",
      "Ressources conservées (non livrées)"
    ],
    inconvenients: [
      "Moonbreak = peu de chance de s'en sortir",
      "Doit être ami ou dans la même alliance",
      "Confiance totale envers l'ami requise"
    ]
  }
];

export default function GuideFleetsave() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                <Ghost className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Ghost de Flotte
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Rendre sa flotte invisible - Le guide complet
              </p>
            </div>

            <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6 mb-8 flex items-start gap-4">
              <img src="https://img.tedomum.net/data/warning-bfe202.png" alt="Warning" className="w-10 h-10 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-400 mb-2">Attention</h3>
                <p className="text-gray-300">
                  Toutes les techniques ont une faille. Ce n'est pas parce que vous l'utilisez qu'un bon joueur 
                  ne vous aura pas avec de l'observation.
                </p>
              </div>
            </div>

            <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 mb-8">
              <h2 className="font-display text-xl font-bold text-white mb-4">Qu'est-ce que le Ghost ?</h2>
              <p className="text-gray-300 mb-4">
                Dans le jargon OGame, "ghost" signifie fantôme en anglais. <strong className="text-white">Ghoster une flotte</strong> 
                signifie donc rendre une flotte invisible aux phalanges ennemies.
              </p>
              <p className="text-gray-400 text-sm">
                Le principe de base : une flotte en vol depuis ou vers une <span className="text-primary">lune</span> ne peut 
                pas être scannée par la phalange.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-white mb-4">Les 12 Techniques de Ghost</h2>
              
              {techniques.map((tech) => (
                <div key={tech.id} className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-[#2E384D] bg-[#151924]">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {tech.id}
                      </span>
                      <h3 className="font-bold text-white">{tech.title}</h3>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300 mb-4">{tech.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-900/10 border border-green-800/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
                          <Check className="w-4 h-4" />
                          Avantages
                        </div>
                        <ul className="space-y-1">
                          {tech.avantages.map((a, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-green-500 mt-1">•</span>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-900/10 border border-red-800/30 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-red-400 font-medium mb-2">
                          <X className="w-4 h-4" />
                          Inconvénients
                        </div>
                        <ul className="space-y-1">
                          {tech.inconvenients.map((i, idx) => (
                            <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                              <span className="text-red-500 mt-1">•</span>
                              {i}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
              <h2 className="font-display text-xl font-bold text-white mb-4">Règles d'or du Ghost</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                  <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                  <p className="text-gray-300"><strong className="text-white">Partez d'une lune</strong> - La phalange ne peut pas scanner les départs depuis une lune</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                  <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                  <p className="text-gray-300"><strong className="text-white">Arrivez sur une lune</strong> - Évite d'être scanné à l'arrivée</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                  <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                  <p className="text-gray-300"><strong className="text-white">Variez vos habitudes</strong> - Ne faites pas toujours la même chose aux mêmes heures</p>
                </div>
                <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                  <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                  <p className="text-gray-300"><strong className="text-white">Emportez vos ressources</strong> - Ne laissez rien sur vos planètes</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              Merci à <span className="text-gray-400">Samurai_Shogun</span> pour le tutoriel d'origine
            </div>

            <div className="mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Besoin d'aide pour votre fleetsave ?
              </h3>
              <p className="text-gray-400 mb-6">
                Notre alliance peut vous protéger avec le SAB !
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

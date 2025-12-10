import { motion } from "framer-motion";
import { Ghost, ExternalLink, AlertTriangle, Check, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const techniques = [
  {
    id: 1,
    title: "Ghost sur CDR invisible depuis une lune",
    description: "Votre flotte étant sur votre lune, créez un CDR invisible avec une seule sonde en mode attaque. À partir du moment où une sonde en mode attaque atteint une cible, détruite ou non, elle laisse un CDR sur la position. Si le CDR apparaît car la sonde a été détruite lors de l'attaque, vous pouvez recycler le CDR, il ne restera donc plus de CDR visible sur la vue galaxie, mais vous pourrez tout de même envoyer des missions 'exploiter' (nécessite un recycleur dans la flotte). Une fois le CDR invisible formé, vous pourrez prendre la totalité de votre flotte et l'envoyer sur le CDR en question en mode exploiter. Choisissez la vitesse qui vous convient le mieux.",
    details: "Recommandé pour les petits ghosts entre des vagues d'expédition. Autre cas pratique : si quelqu'un vous espionne, lancez votre flotte sur le CDR afin d'esquiver la sonde sans être phalangé (utile si vous lancez sur votre planète). L'avantage c'est que ça coûte rien en deut, vous pouvez ghost toute votre flotte pendant 1 ou 2h pour 5k de deut.",
    astuce: "Les CDR sont tous reset le lundi à 03H00 du matin. Vous pouvez cependant les sauvegarder en envoyant une mission 'exploiter' sur le CDR avant le reset, en faisant en sorte que la mission arrive après le reset. Ainsi le CDR invisible sera sauvegardé pour la semaine qui suit !",
    variante: "Variante leurrée : Envoyez plusieurs recycleurs avant et après votre flotte principale pour créer des leurres. En cas d'interception, vous perdrez probablement uniquement les recycleurs leurres.",
    avantages: [
      "Flotte invisible aux phalanges",
      "Vitesse variable (10% à 100%)",
      "Souvent moins coûteux en deutérium",
      "Ghost pour 5k de deut pendant 1-2h"
    ],
    inconvenients: [
      "CDR peut être rendu visible par un joueur cherchant votre flotte",
      "Prévisible si fait régulièrement aux mêmes coordonnées à la même vitesse",
      "Heure de retour visible en cas de moonbreak",
      "Pour les ghosts longs, préférez statio lune à lune"
    ]
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
    title: "Ghost en stationner entre ses propres lunes",
    description: "La meilleure technique ! Envoyez votre flotte en stationner vers votre propre lune. Surveillez l'aller pour ne pas vous faire moonbreak durant ce laps de temps, puis cliquez retour. À ce moment-là, la flotte est 100% safe.",
    details: "Attention : un statio en direction d'une lune d'un AUTRE joueur est phalangeable au retour. Pour être totalement safe, utilisez uniquement VOS propres lunes.",
    recommended: true,
    avantages: [
      "Flotte 100% safe après le retour",
      "Invisible aux phalanges",
      "Possibilité de rappeler à tout moment",
      "50% deutérium récupéré si pas de retour"
    ],
    inconvenients: [
      "Nécessite 2 lunes à vous",
      "Surveiller l'aller pour éviter le moonbreak"
    ]
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
              <h2 className="font-display text-2xl font-bold text-white mb-4">Les 11 Techniques de Ghost</h2>
              
              {techniques.map((tech) => (
                <div key={tech.id} className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-[#2E384D] bg-[#151924]">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 ${tech.recommended ? 'bg-green-500' : 'bg-primary'} rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {tech.id}
                      </span>
                      <h3 className="font-bold text-white">{tech.title}</h3>
                      {tech.recommended && (
                        <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-500/30">Recommandé</span>
                      )}
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-300 mb-4">{tech.description}</p>
                    {tech.details && (
                      <p className="text-gray-400 text-sm mb-4 bg-[#151924] p-3 rounded-lg border-l-2 border-primary/50">{tech.details}</p>
                    )}
                    {tech.astuce && (
                      <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3 mb-4">
                        <span className="text-amber-400 font-medium text-sm">Astuce : </span>
                        <span className="text-gray-300 text-sm">{tech.astuce}</span>
                      </div>
                    )}
                    {tech.variante && (
                      <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 mb-4">
                        <span className="text-purple-400 font-medium text-sm">{tech.variante}</span>
                      </div>
                    )}
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
              <br />
              et à <span className="text-gray-400">Mr White / Galio</span> pour le détail du Ghost CDR invisible
            </div>

            <RelatedGuides currentGuide="fleetsave" />
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

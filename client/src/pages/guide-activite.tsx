import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, AlertTriangle, Eye, Shield, Clock, Rocket, Package, Users, Crosshair, Search, Recycle, Compass, RefreshCw, Monitor, MapPin, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface AccordionItemProps {
  id: string;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ id, icon: Icon, title, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg overflow-hidden mb-4">
      <button
        onClick={onToggle}
        className="w-full p-4 md:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
        data-testid={`accordion-${id}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="font-display text-lg font-bold text-white">{title}</h3>
        </div>
        <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <div className="px-4 md:px-6 pb-6 text-gray-300 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}

function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
        <h4 className="text-green-400 font-bold mb-2 text-sm uppercase tracking-wider">Avantages</h4>
        <ul className="space-y-2">
          {pros.map((pro, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
        <h4 className="text-red-400 font-bold mb-2 text-sm uppercase tracking-wider">Inconvénients</h4>
        <ul className="space-y-2">
          {cons.map((con, i) => (
            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const methods = [
  {
    id: "connexion",
    icon: Monitor,
    title: "La connexion au compte",
    content: "Action la plus basique possible : il suffit de vous connecter à votre compte.",
    pros: ["Si vous êtes connecté, vous êtes à l'affût en cas d'attaque pour sauver votre flotte ou vos ressources."],
    cons: ["Le triangle n'apparaît que sur la planète d'arrivée (PM ou plus ancienne colonie).", "Impossible de changer la planète d'atterrissage."]
  },
  {
    id: "refresh",
    icon: RefreshCw,
    title: "Le rafraîchissement de page (F5)",
    content: "Appuyez sur le bouton 'Actualiser' ou la touche F5 pour rafraîchir la page.",
    pros: ["Vous êtes présent et pouvez intervenir rapidement en cas d'attaque."],
    cons: ["Le triangle n'apparaît que sur la planète/lune où vous effectuez l'action."]
  },
  {
    id: "navigation",
    icon: Compass,
    title: "La navigation entre planètes/lunes",
    content: "Cliquez simplement sur vos différentes planètes ou lunes pour y accéder.",
    pros: ["Vous êtes présent sur le jeu.", "Un seul clic fait apparaître le triangle.", "Plus vous naviguez, plus vous montrez votre présence."],
    cons: ["Aucun inconvénient majeur - c'est la tactique la plus recommandée !"]
  },
  {
    id: "porte",
    icon: Rocket,
    title: "Utiliser la Porte de Saut Spatial",
    content: "Faites sauter un vaisseau d'une lune à une autre via la Porte de Saut Spatial.",
    pros: ["Joignez l'utile à l'agréable : déplacement instantané sans deutérium.", "Vous êtes présent sur le jeu."],
    cons: ["Nécessite 2 lunes avec Porte de Saut Spatial.", "Bloque les portes pendant un certain temps.", "Pas de transport de ressources possible."]
  },
  {
    id: "construction",
    icon: Shield,
    title: "Construction de Bâtiments/Vaisseaux/Défenses",
    content: "La fin d'une construction fait apparaître le triangle, à condition que la page du jeu soit ouverte.",
    pros: ["Ne dépend que de vous, pas d'aide extérieure nécessaire.", "La construction de défenses dissuade les attaquants.", "Vous pouvez planifier l'activité (ex: 15 GT = 15 min d'activité)."],
    cons: ["La page du jeu DOIT être ouverte.", "Si déconnecté pendant la construction, pas de triangle.", "Risque d'attirer les raideurs si vous n'êtes pas actif."]
  },
  {
    id: "transport",
    icon: Package,
    title: 'La mission "Transporter"',
    content: "Envoyez un vaisseau avec la mission 'Transporter' vers la planète cible. Le triangle apparaît à l'arrivée.",
    pros: ["Fait apparaître le triangle à l'arrivée.", "Peut transporter des ressources en même temps."],
    cons: ["Consomme du deutérium.", "Le triangle n'apparaît qu'à l'arrivée, pas au départ."]
  },
  {
    id: "stationner",
    icon: MapPin,
    title: 'La mission "Stationner"',
    content: "Stationnez une flotte sur une de vos planètes/lunes.",
    pros: ["Fait apparaître le triangle à l'arrivée.", "Flotte en sécurité sur votre propre position."],
    cons: ["Consomme du deutérium.", "Le triangle n'apparaît qu'à l'arrivée."]
  },
  {
    id: "allie",
    icon: Users,
    title: 'La mission "Stationner chez un allié"',
    content: "Stationnez votre flotte chez un membre de votre alliance (SAB).",
    pros: ["Fait apparaître le triangle chez l'allié.", "Protège la planète de l'allié."],
    cons: ["Nécessite un allié avec le niveau SAB requis.", "Votre flotte est exposée sur une position étrangère."]
  },
  {
    id: "expedition",
    icon: Search,
    title: 'La mission "Expédition"',
    content: "Le retour d'une expédition fait apparaître le triangle sur la planète/lune de retour.",
    pros: ["Gains potentiels (ressources, vaisseaux, items).", "Triangle automatique au retour."],
    cons: ["Durée variable et imprévisible.", "Risques de pertes en expédition."]
  },
  {
    id: "coloniser",
    icon: Rocket,
    title: 'La mission "Coloniser"',
    content: "L'arrivée d'un vaisseau de colonisation fait apparaître le triangle.",
    pros: ["Utile si vous colonisez une nouvelle planète."],
    cons: ["Usage très limité.", "Perte du vaisseau de colonisation."]
  },
  {
    id: "recycler",
    icon: Recycle,
    title: 'La mission "Recycler le CDR"',
    content: "Le retour de recycleurs fait apparaître le triangle.",
    pros: ["Récupération de ressources du champ de débris.", "Triangle automatique au retour."],
    cons: ["Nécessite un CDR disponible.", "Temps de trajet variable."]
  },
  {
    id: "espionner",
    icon: Eye,
    title: 'La mission "Espionner"',
    content: "Être espionné fait apparaître le triangle sur la planète ciblée.",
    pros: ["Vous avertit d'une menace potentielle."],
    cons: ["Vous ne contrôlez pas cette action.", "Signe d'intérêt d'un raideur !"]
  },
  {
    id: "attaquer",
    icon: Crosshair,
    title: 'La mission "Attaquer"',
    content: "L'impact d'une attaque ennemie fait apparaître le triangle.",
    pros: ["Vous êtes alerté de l'attaque."],
    cons: ["C'est déjà trop tard si vous n'avez pas fleetsave !", "Vous subissez l'attaque."]
  }
];

export default function GuideActivite() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [openMethods, setOpenMethods] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMethod = (id: string) => {
    setOpenMethods(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout>
      <section className="py-12 md:py-20 border-b border-[#2E384D]">
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

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-red-500/30">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  Le Triangle d'Activité
                </h1>
                <p className="text-gray-400">
                  Comprendre et maîtriser l'indicateur d'activité dans OGame
                </p>
              </div>
            </div>

            <div className="bg-[#151924] border border-[#2E384D] rounded-lg p-4 mb-8 flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <p className="text-sm text-gray-400">
                <span className="text-white font-medium">Guide original par la communauté OGame</span> • Adapté pour Psykoverse
              </p>
            </div>

            <AccordionItem
              id="definition"
              icon={AlertTriangle}
              title="1. Qu'est-ce que le triangle d'activité ?"
              isOpen={openSections["definition"] ?? true}
              onToggle={() => toggleSection("definition")}
            >
              <p className="mb-4">
                Le triangle rouge d'activité est visible dans le menu <strong className="text-white">Galaxie</strong>. 
                Il apparaît sur la planète ou lune depuis laquelle vous avez effectué une action.
              </p>
              
              <div className="bg-[#0B0E14] rounded-lg p-4 mb-4">
                <img 
                  src="https://lh4.googleusercontent.com/DgvT0GXEr0Kd2gfxbNu7cuDexXA9kLozKq8lPDKO912OikBDkQ7LajEMSGzgcSnwStuvPhcMi0NvLbHHchcy_T_S1bwIYLiGtJcRzCQBKJSiUk0HRbD4ZuQnVjNySBdYIJQ6eTLmHMVngppuiwlHkYY" 
                  alt="Triangle d'activité dans la galaxie"
                  className="rounded max-w-full mx-auto"
                />
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 mb-4">
                <p className="text-sm">
                  <strong className="text-secondary">Important :</strong> Si vous ne cliquez pas sur vos lunes, 
                  le triangle n'y apparaîtra pas. Il faut naviguer activement sur chaque position.
                </p>
              </div>

              <div className="bg-[#0B0E14] rounded-lg p-4 mb-4">
                <img 
                  src="https://lh6.googleusercontent.com/vl7_eaaawl2WxxIlHb45ERgm2uU_ROlmg3rqPGhVNYMs1tlwJLhlMvoi_AtJnEkWfhTODjZYp0b6HIO2SSPiPY_7cOJc6GIZbnqJ6SS3r5aQh_pP_hagWl7cycSbTEBawBMej0dNOBjUPh9W2kgf1Ek" 
                  alt="Triangle sur planète et lune"
                  className="rounded max-w-full mx-auto"
                />
              </div>

              <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Durée du triangle
              </h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <strong className="text-white">0-15 min :</strong> Triangle rouge plein (activité récente)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <strong className="text-white">15-60 min :</strong> Timer affiché (15, 30, 45...)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                  <strong className="text-white">+60 min :</strong> Aucun indicateur
                </li>
              </ul>

              <div className="bg-[#0B0E14] rounded-lg p-4 mb-4">
                <img 
                  src="https://lh5.googleusercontent.com/UjYGTrnRBDFuX7KHW5N_YiYYpP2YsvVIqheMkqhtTZgJQmNMlDb2_vADvIXwvKS-7EGwdKKxWi55MrFemDnKof4wRhieARDKKYSM3isYJQjHEZQ_V_9Y9e4jyz4s5DGzN17aI_owF59Tva_QPml_bnU" 
                  alt="Timer d'activité"
                  className="rounded max-w-full mx-auto"
                />
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-sm">
                  <strong className="text-primary">Astuce :</strong> Pour voir les timers détaillés, allez dans 
                  <span className="font-mono bg-black/30 px-2 py-1 rounded mx-1">Options → Affichage → Galaxie</span> 
                  et cochez "Affichage d'activité détaillé".
                </p>
                <img 
                  src="https://zupimages.net/up/23/38/04rl.png" 
                  alt="Option d'affichage détaillé"
                  className="rounded max-w-full mx-auto mt-3"
                />
              </div>
            </AccordionItem>

            <AccordionItem
              id="signification"
              icon={Eye}
              title="2. Que signifie ce triangle ?"
              isOpen={openSections["signification"] ?? false}
              onToggle={() => toggleSection("signification")}
            >
              <p>
                Le triangle indique qu'il y a eu une <strong className="text-white">activité quelconque</strong> sur 
                la planète en question. Cela peut aller de :
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Simple connexion au compte
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Transport de ressources
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Construction de vaisseaux/défenses
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Attaque ennemie impactée
                </li>
              </ul>
            </AccordionItem>

            <AccordionItem
              id="importance"
              icon={Shield}
              title="3. Pourquoi c'est important ?"
              isOpen={openSections["importance"] ?? false}
              onToggle={() => toggleSection("importance")}
            >
              <p className="mb-4">
                Ce triangle est <strong className="text-white">crucial pour les raideurs</strong> : il leur permet 
                de savoir si une cible est potentiellement active ou non.
              </p>
              
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                <p className="text-sm">
                  <strong className="text-red-400">Conseil de survie :</strong> Un bon raideur sera vigilant 
                  au triangle rouge. Montrer de l'activité peut faire hésiter un attaquant et vous éviter 
                  un raid douloureux !
                </p>
              </div>
            </AccordionItem>

            <AccordionItem
              id="permanent"
              icon={Clock}
              title="4. Peut-on avoir le triangle en permanence ?"
              isOpen={openSections["permanent"] ?? false}
              onToggle={() => toggleSection("permanent")}
            >
              <p className="mb-4">
                <strong className="text-white">24h/24 sans se connecter ?</strong> Quasiment impossible 
                (sauf si vous êtes espionné toutes les 15 minutes...).
              </p>
              <p>
                <strong className="text-primary">Par contre</strong>, vous pouvez maintenir le triangle 
                pendant vos heures de travail ou entre deux connexions en utilisant les méthodes détaillées ci-dessous.
              </p>
            </AccordionItem>

            <div className="mt-8 mb-6">
              <h2 className="font-display text-2xl font-bold text-white flex items-center gap-3">
                <Rocket className="w-6 h-6 text-secondary" />
                5. Les moyens de faire apparaître le triangle
              </h2>
              <p className="text-gray-400 mt-2">
                Cliquez sur chaque méthode pour voir les détails, avantages et inconvénients.
              </p>
            </div>

            <div className="space-y-3">
              {methods.map((method) => (
                <div key={method.id} className="bg-[#1C2230] border border-[#2E384D] rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleMethod(method.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <method.icon className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium text-white">{method.title}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${openMethods[method.id] ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openMethods[method.id] ? 'max-h-[600px]' : 'max-h-0'}`}>
                    <div className="px-4 pb-4">
                      <p className="text-gray-300 text-sm mb-3">{method.content}</p>
                      <ProsCons pros={method.pros} cons={method.cons} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-lg p-6 text-center">
              <h3 className="font-display text-xl font-bold text-white mb-3">
                Des questions sur ce guide ?
              </h3>
              <p className="text-gray-400 mb-4">
                Rejoignez notre Discord pour discuter avec des joueurs expérimentés !
              </p>
              <Button asChild>
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

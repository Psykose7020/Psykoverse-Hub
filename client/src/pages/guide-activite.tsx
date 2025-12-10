import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Eye, Shield, Clock, Rocket, Package, Users, Crosshair, Search, Recycle, Compass, RefreshCw, Monitor, MapPin, ExternalLink, CheckCircle, XCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const methods = [
  {
    id: "connexion",
    icon: Monitor,
    title: "Connexion au compte",
    description: "Se connecter fait apparaître le triangle sur votre planète mère.",
    pros: ["Vous êtes présent pour réagir"],
    cons: ["Triangle uniquement sur la PM"]
  },
  {
    id: "refresh",
    icon: RefreshCw,
    title: "Rafraîchir (F5)",
    description: "Actualiser la page génère de l'activité sur la position actuelle.",
    pros: ["Rapide et simple"],
    cons: ["Une seule position"]
  },
  {
    id: "navigation",
    icon: Compass,
    title: "Navigation planètes/lunes",
    description: "Cliquer sur vos positions active le triangle partout où vous passez.",
    pros: ["Couvre toutes vos positions", "Méthode recommandée"],
    cons: []
  },
  {
    id: "porte",
    icon: Rocket,
    title: "Porte de Saut Spatial",
    description: "Téléporter des vaisseaux entre lunes génère de l'activité.",
    pros: ["Instantané", "Sans deutérium"],
    cons: ["Nécessite 2 portes", "Bloque les portes"]
  },
  {
    id: "construction",
    icon: Shield,
    title: "Constructions",
    description: "La fin d'une construction génère le triangle (page ouverte obligatoire).",
    pros: ["Planifiable", "Utile pour la défense"],
    cons: ["Page doit rester ouverte"]
  },
  {
    id: "transport",
    icon: Package,
    title: "Mission Transport",
    description: "L'arrivée d'un transport génère l'activité sur la destination.",
    pros: ["Transporte des ressources"],
    cons: ["Consomme du deutérium"]
  },
  {
    id: "stationner",
    icon: MapPin,
    title: "Mission Stationner",
    description: "Stationner une flotte fait apparaître le triangle à l'arrivée.",
    pros: ["Flotte en sécurité"],
    cons: ["Consomme du deutérium"]
  },
  {
    id: "allie",
    icon: Users,
    title: "Stationner chez un allié",
    description: "Le SAB génère de l'activité chez votre allié.",
    pros: ["Protège l'allié"],
    cons: ["Flotte exposée"]
  },
  {
    id: "expedition",
    icon: Search,
    title: "Retour d'expédition",
    description: "Le retour d'expé fait apparaître le triangle automatiquement.",
    pros: ["Gains potentiels"],
    cons: ["Durée imprévisible"]
  },
  {
    id: "recycler",
    icon: Recycle,
    title: "Recyclage CDR",
    description: "Le retour des recycleurs génère l'activité.",
    pros: ["Récupère des ressources"],
    cons: ["Nécessite un CDR"]
  },
  {
    id: "espionner",
    icon: Eye,
    title: "Être espionné",
    description: "Un espionnage ennemi fait apparaître votre triangle.",
    pros: ["Vous alerte du danger"],
    cons: ["Hors de votre contrôle"]
  },
  {
    id: "attaquer",
    icon: Crosshair,
    title: "Subir une attaque",
    description: "L'impact d'une attaque génère l'activité.",
    pros: ["Vous êtes alerté"],
    cons: ["Déjà trop tard !"]
  }
];

export default function GuideActivite() {
  const [activeTab, setActiveTab] = useState<"intro" | "methods">("intro");

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

            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
                <AlertTriangle className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Le Triangle d'Activité
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                L'indicateur qui peut vous sauver d'un raid
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide adapté pour Psykoverse • Source : Communauté OGame
              </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-12">
              <button
                onClick={() => setActiveTab("intro")}
                className={`px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                  activeTab === "intro"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-[#1C2230] text-gray-400 hover:text-white"
                }`}
              >
                Comprendre
              </button>
              <button
                onClick={() => setActiveTab("methods")}
                className={`px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                  activeTab === "methods"
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-[#1C2230] text-gray-400 hover:text-white"
                }`}
              >
                12 Méthodes
              </button>
            </div>

            {activeTab === "intro" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* What is it */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold">1</span>
                      C'est quoi ?
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Le triangle rouge apparaît dans le menu <span className="text-primary font-bold">Galaxie</span> sur 
                      vos planètes et lunes lorsqu'il y a eu une activité récente.
                    </p>
                    <div className="bg-[#0B0E14] rounded-lg p-3">
                      <img 
                        src="https://lh4.googleusercontent.com/DgvT0GXEr0Kd2gfxbNu7cuDexXA9kLozKq8lPDKO912OikBDkQ7LajEMSGzgcSnwStuvPhcMi0NvLbHHchcy_T_S1bwIYLiGtJcRzCQBKJSiUk0HRbD4ZuQnVjNySBdYIJQ6eTLmHMVngppuiwlHkYY" 
                        alt="Triangle d'activité"
                        className="rounded w-full"
                      />
                    </div>
                  </div>

                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                    <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold">2</span>
                      Combien de temps ?
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-white">0 - 15 minutes</div>
                          <div className="text-sm text-gray-400">Triangle plein (activité très récente)</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                        <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white">
                          35
                        </div>
                        <div>
                          <div className="font-bold text-white">15 - 60 minutes</div>
                          <div className="text-sm text-gray-400">Timer affiché (15, 30, 45...)</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-3 bg-gray-800 border border-gray-700 rounded-lg">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-500">—</span>
                        </div>
                        <div>
                          <div className="font-bold text-white">+60 minutes</div>
                          <div className="text-sm text-gray-400">Aucun indicateur visible</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why important */}
                <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-xl p-6">
                  <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-red-400" />
                    Pourquoi c'est important ?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-white mb-2">Pour les raideurs</h3>
                      <p className="text-gray-300 text-sm">
                        Le triangle indique si une cible est potentiellement active. 
                        Un bon raideur hésitera à attaquer une cible montrant de l'activité.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-2">Pour vous protéger</h3>
                      <p className="text-gray-300 text-sm">
                        Montrer de l'activité peut dissuader un attaquant et vous éviter 
                        un raid douloureux. C'est une protection passive simple mais efficace !
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tip */}
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Astuce</h3>
                    <p className="text-gray-300 text-sm">
                      Pour voir les timers détaillés, allez dans <span className="font-mono bg-black/30 px-2 py-0.5 rounded">Options → Affichage → Galaxie</span> et 
                      cochez "Affichage d'activité détaillé".
                    </p>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button size="lg" onClick={() => setActiveTab("methods")}>
                    Voir les 12 méthodes
                    <Rocket className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === "methods" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {methods.map((method, index) => {
                    const Icon = method.icon;
                    const isRecommended = method.id === "navigation";
                    const isDanger = method.id === "espionner" || method.id === "attaquer";
                    
                    return (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative bg-[#1C2230] border rounded-xl p-5 transition-all hover:scale-[1.02] ${
                          isRecommended 
                            ? "border-green-500/50 shadow-lg shadow-green-500/10" 
                            : isDanger
                            ? "border-red-500/30"
                            : "border-[#2E384D] hover:border-primary/30"
                        }`}
                      >
                        {isRecommended && (
                          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded">
                            Recommandé
                          </div>
                        )}
                        
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                          isRecommended 
                            ? "bg-green-500/20" 
                            : isDanger
                            ? "bg-red-500/20"
                            : "bg-primary/20"
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            isRecommended ? "text-green-400" : isDanger ? "text-red-400" : "text-primary"
                          }`} />
                        </div>
                        
                        <h3 className="font-bold text-white mb-2">{method.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                        
                        <div className="space-y-2">
                          {method.pros.map((pro, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                              <span className="text-green-300">{pro}</span>
                            </div>
                          ))}
                          {method.cons.map((con, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs">
                              <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                              <span className="text-red-300">{con}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    Des questions sur ce guide ?
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Rejoignez notre Discord pour discuter avec des joueurs expérimentés !
                  </p>
                  <Button size="lg" asChild>
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                      Rejoindre le Discord
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

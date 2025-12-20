import { motion } from "framer-motion";
import { Globe, Star, Calendar, Users, Zap, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/EditableText";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const universes = [
  {
    name: "Veritate",
    status: "new",
    type: "Serveur Saison",
    players: "Lancé le 19 Décembre",
    description: "Notre nouveau serveur saison ! Compétition intense et nouveau départ pour tous.",
    features: ["CDR 80%", "Vitesse x6", "Catégorie Agressif"],
    joinable: true,
    allianceLink: "https://s277-fr.ogame.gameforge.com/game/allianceInfo.php?allianceId=500043"
  },
  {
    name: "Scorpius",
    status: "active",
    type: "Univers Principal",
    players: "Alliance établie",
    description: "Notre univers principal avec une communauté active et des joueurs expérimentés. Rejoignez-nous !",
    features: ["Joueurs actifs", "Entraide quotidienne", "Progression ensemble"],
    joinable: true
  },
  {
    name: "Hercules",
    status: "active",
    type: "Nouvelle Alliance",
    players: "Recrutement ouvert",
    description: "Nous venons d'ouvrir l'alliance sur cet univers. Rejoignez-nous pour construire ensemble !",
    features: ["Nouvelle alliance", "Recrutement actif", "Nouvelles opportunités"],
    joinable: true
  }
];

const serverStats = [
  { label: "CDR", value: "80%" },
  { label: "Défense CDR", value: "50%" },
  { label: "Cases Bonus", value: "+25" },
  { label: "Galaxies", value: "6" },
  { label: "Conso Deut", value: "0.5" },
  { label: "Catégorie", value: "AGRESSIF" },
  { label: "AG/DG", value: "OUI" }
];

export default function Alliance() {
  return (
    <Layout>
      <section className="py-16 md:py-24 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-primary" />
              <EditableText
                id="alliance-hero-title"
                defaultValue="Où nous trouver"
                as="h1"
                className="font-display text-3xl md:text-5xl font-bold text-white"
              />
            </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto">
              <EditableText
                id="alliance-hero-description"
                defaultValue="La Psykoverse est présente sur plusieurs univers OGame. Rejoignez-nous là où vous jouez !"
                as="span"
                multiline
              />
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {universes.map((universe, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className={`relative bg-[#1C2230] border rounded-lg overflow-hidden ${
                  universe.status === "new" 
                    ? "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]" 
                    : "border-[#2E384D] hover:border-primary/50"
                } transition-all`}
              >
                {universe.status === "new" && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold uppercase tracking-wider py-2 text-center">
                    <Zap className="w-4 h-4 inline mr-2" />
                    Nouveau Serveur Saison
                  </div>
                )}
                
                <div className={`p-6 ${universe.status === "new" ? "pt-12" : ""}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-2xl font-bold text-white">{universe.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      universe.status === "new"
                        ? "bg-green-500/20 text-green-400 animate-pulse"
                        : universe.status === "active" 
                        ? "bg-green-900/50 text-green-400" 
                        : "bg-orange-900/50 text-orange-400"
                    }`}>
                      {universe.status === "new" ? "Nouveau" : universe.status === "active" ? "Actif" : "Bientôt"}
                    </span>
                  </div>
                  
                  <p className="text-primary text-sm font-mono mb-2">{universe.type}</p>
                  <p className="text-gray-400 mb-4">{universe.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {universe.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-2 text-sm text-gray-300">
                        <Star className="w-4 h-4 text-secondary" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    {universe.joinable && (
                      <Button 
                        className={`w-full ${
                          universe.status === "new" 
                            ? "bg-green-500 hover:bg-green-600 text-white" 
                            : ""
                        }`} 
                        asChild
                      >
                        <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                          <Users className="w-4 h-4 mr-2" />
                          Rejoindre sur Discord
                        </a>
                      </Button>
                    )}
                    {'allianceLink' in universe && universe.allianceLink && (
                      <Button 
                        variant="outline"
                        className="w-full border-primary/50 text-primary hover:bg-primary/10" 
                        asChild
                      >
                        <a href={universe.allianceLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Page Alliance OGame
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#151924] border border-[#2E384D] rounded-lg p-8"
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
              <Zap className="w-6 h-6 text-secondary" />
              Paramètres Serveur Saison
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
              {serverStats.map((stat, index) => (
                <div key={index} className="bg-[#1C2230] border border-[#2E384D] p-4 text-center rounded-lg">
                  <div className="text-gray-500 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="font-display text-xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
            
            <p className="text-center text-gray-500 text-sm font-mono">
              AM: 10.000 • Deut dans CDR: OUI • Fret Sonde: NON
            </p>
          </motion.div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">
              Vous jouez sur un autre univers ? Contactez-nous sur Discord pour discuter d'une expansion !
            </p>
            <Button size="lg" variant="outline" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Nous contacter
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

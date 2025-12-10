import { motion } from "framer-motion";
import { Rocket, Ship, Shield, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const vaisseaux = [
  { nom: "Petit Transporteur", abbr: "PT", role: "Transport léger", vitesse: "Rapide" },
  { nom: "Grand Transporteur", abbr: "GT", role: "Transport lourd", vitesse: "Lente" },
  { nom: "Chasseur Léger", abbr: "CL", role: "Combat basique", vitesse: "Rapide" },
  { nom: "Chasseur Lourd", abbr: "CLo", role: "Combat amélioré", vitesse: "Moyenne" },
  { nom: "Croiseur", abbr: "CR", role: "Anti-chasseurs", vitesse: "Rapide" },
  { nom: "Vaisseau de Bataille", abbr: "VB", role: "Combat principal", vitesse: "Moyenne" },
  { nom: "Bombardier", abbr: "BB", role: "Anti-défenses", vitesse: "Lente" },
  { nom: "Destructeur", abbr: "DEST", role: "Combat lourd", vitesse: "Moyenne" },
  { nom: "Étoile de la Mort", abbr: "EDLM/RIP", role: "Destruction massive", vitesse: "Très lente" },
  { nom: "Traqueur", abbr: "TRAQ", role: "Combat polyvalent", vitesse: "Rapide" },
  { nom: "Recycleur", abbr: "REC", role: "Recyclage CDR", vitesse: "Lente" },
  { nom: "Sonde d'espionnage", abbr: "SE", role: "Espionnage", vitesse: "Très rapide" },
  { nom: "Vaisseau de colonisation", abbr: "VC", role: "Colonisation", vitesse: "Lente" }
];

export default function GuideChantier() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-slate-500 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-slate-500/20">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Chantier & Dock Spatial
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Construisez votre flotte et vos défenses
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide pour débutants • Source : Communauté OGame
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Ship className="w-6 h-6 text-primary" />
                  Le Chantier Spatial
                </h2>
                <p className="text-gray-300 mb-4">
                  Le chantier spatial permet de construire tous les vaisseaux. Plus son niveau est élevé, 
                  plus vous débloquez de vaisseaux et plus la construction est rapide.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Astuce :</strong> L'usine de nanites accélère drastiquement la construction. 
                    Un niveau de nanites divise le temps par 2 !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Les vaisseaux</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {vaisseaux.map((v, index) => (
                    <div key={index} className="bg-[#151924] rounded-lg p-3 flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold text-xs">{v.abbr}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-white text-sm truncate">{v.nom}</div>
                        <div className="text-xs text-gray-500">{v.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-red-400" />
                  Les Défenses
                </h2>
                <p className="text-gray-300 mb-4">
                  Les défenses protègent vos planètes. Contrairement aux vaisseaux, elles ne peuvent pas se déplacer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Défenses légères</h3>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Lanceur de missiles</li>
                      <li>• Artillerie laser légère</li>
                      <li>• Artillerie laser lourde</li>
                      <li>• Canon de Gauss</li>
                    </ul>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Défenses lourdes</h3>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Artillerie à ions</li>
                      <li>• Lanceur de plasma</li>
                      <li>• Petit bouclier</li>
                      <li>• Grand bouclier</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <p className="text-sm text-red-300">
                    <strong>Attention :</strong> Les défenses génèrent un champ de débris (CDR) lorsqu'elles sont détruites. 
                    Elles peuvent aussi être partiellement reconstruites après un combat !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le Dock Spatial</h2>
                <p className="text-gray-300 mb-4">
                  Le Dock Spatial (pour la classe Général) permet de récupérer une partie de vos pertes 
                  après une attaque offensive réussie.
                </p>
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <p className="text-sm text-green-300">
                    Plus le niveau du Dock est élevé, plus vous récupérez de vaisseaux après vos raids !
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Questions sur la composition de flotte ?
                </h3>
                <p className="text-gray-400 mb-6">
                  Nos experts combat peuvent vous conseiller sur Discord !
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

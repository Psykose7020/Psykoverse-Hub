import { motion } from "framer-motion";
import { Globe, Users, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideGalaxie() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Galaxie & Alliance
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Naviguez dans l'univers et rejoignez une alliance
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide pour débutants • Source : Communauté OGame
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Globe className="w-6 h-6 text-indigo-400" />
                  La Vue Galaxie
                </h2>
                <p className="text-gray-300 mb-4">
                  La vue Galaxie vous permet de voir tous les joueurs, planètes et lunes d'un système solaire. 
                  C'est l'outil principal pour trouver des cibles, des alliés ou des voisins.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Ce que vous voyez</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• <span className="text-white">Planètes</span> : Position et nom</li>
                      <li>• <span className="text-white">Lunes</span> : Icône à côté de la planète</li>
                      <li>• <span className="text-white">Joueur</span> : Nom, alliance et statut</li>
                      <li>• <span className="text-white">CDR</span> : Champs de débris disponibles</li>
                      <li>• <span className="text-red-400">Triangle</span> : Activité récente</li>
                    </ul>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Actions possibles</h3>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li>• Espionner une planète</li>
                      <li>• Envoyer un message au joueur</li>
                      <li>• Ajouter en ami ou ignorer</li>
                      <li>• Recycler un CDR</li>
                      <li>• Lancer une attaque ou un transport</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Coordonnées</h2>
                <p className="text-gray-300 mb-4">
                  Chaque position dans l'univers est définie par 3 coordonnées : 
                  <span className="text-primary font-mono"> [Galaxie:Système:Position]</span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">1-9</div>
                    <div className="text-white font-medium">Galaxie</div>
                    <div className="text-xs text-gray-500">Macro-région de l'univers</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">1-499</div>
                    <div className="text-white font-medium">Système</div>
                    <div className="text-xs text-gray-500">Système solaire</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">1-15</div>
                    <div className="text-white font-medium">Position</div>
                    <div className="text-xs text-gray-500">Place dans le système</div>
                  </div>
                </div>
                <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Exemple :</strong> [1:42:8] = Galaxie 1, Système 42, Position 8
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Users className="w-6 h-6 text-green-400" />
                  Les Alliances
                </h2>
                <p className="text-gray-300 mb-4">
                  Une alliance est un groupe de joueurs qui s'entraident. Rejoindre une alliance est 
                  <span className="text-green-400 font-bold"> fortement recommandé</span> pour progresser et se protéger.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Avantages</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Protection contre les raids</li>
                      <li>• Partage de connaissances</li>
                      <li>• SAB (Stationner Chez un Allié)</li>
                      <li>• Attaques groupées (ACS)</li>
                      <li>• Commerce interne</li>
                    </ul>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Comment rejoindre</h3>
                    <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                      <li>Trouvez une alliance dans la galaxie</li>
                      <li>Consultez leur page d'alliance</li>
                      <li>Postulez via le formulaire</li>
                      <li>Attendez la réponse du dirigeant</li>
                    </ol>
                  </div>
                </div>
              </div>

              <RelatedGuides currentGuide="galaxie" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

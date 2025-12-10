import { motion } from "framer-motion";
import { Users, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideACS() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Attaque & Défense Groupée
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Combattez ensemble avec le système ACS
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le système ACS</h2>
                <p className="text-gray-300 mb-4">
                  ACS (Alliance Combat System) permet à plusieurs joueurs de combattre ensemble, 
                  que ce soit en attaque ou en défense.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Limite :</strong> Maximum 5 flottes peuvent participer à une même ACS.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Attaque groupée (ACS Attack)</h2>
                <p className="text-gray-300 mb-4">
                  Plusieurs joueurs attaquent ensemble la même cible au même moment.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                    <p className="text-gray-300">Le premier joueur lance l'attaque et partage le lien ACS</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                    <p className="text-gray-300">Les alliés rejoignent via le lien ou l'événement flotte</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                    <p className="text-gray-300">Toutes les flottes arrivent ensemble au moment de l'impact</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Défense groupée (ACS Defend / SAB)</h2>
                <p className="text-gray-300 mb-4">
                  Vous pouvez stationner votre flotte chez un allié pour le défendre. 
                  C'est le SAB (Stationner Chez un Allié).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Avantages</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Protège un allié vulnérable</li>
                      <li>• Combine les forces défensives</li>
                      <li>• Effet dissuasif</li>
                    </ul>
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-amber-400 mb-2">Attention</h3>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Votre flotte est visible à l'espionnage</li>
                      <li>• Consomme du deutérium</li>
                      <li>• Ne génère PAS d'activité</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Partage du butin</h2>
                <p className="text-gray-300 mb-4">
                  En cas de victoire d'une ACS, les ressources pillées sont partagées 
                  proportionnellement à la capacité de fret de chaque participant.
                </p>
                <div className="bg-[#151924] rounded-lg p-4">
                  <p className="text-sm text-gray-400">
                    <strong>Exemple :</strong> Si vous apportez 50% du fret total, vous récupérez 50% du butin.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#5865F2]/20 to-[#5865F2]/5 border border-[#5865F2]/30 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#5865F2] rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold text-white">Rejoignez Psykoverse</h2>
                    <p className="text-gray-400 text-sm">180 membres prêts à vous défendre</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Notre alliance organise régulièrement des ACS et offre une protection SAB à ses membres.
                </p>
                <Button className="bg-[#5865F2] hover:bg-[#4752C4]" asChild>
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

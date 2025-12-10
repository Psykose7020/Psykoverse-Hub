import { motion } from "framer-motion";
import { Shield, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Fuite de Flotte (Fleetsave)
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Protégez votre flotte pendant votre absence
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Fuite automatique (Débutants)</h2>
                <p className="text-gray-300 mb-4">
                  Tant que vous êtes débutant, votre flotte peut être protégée par un repli automatique 
                  si le ratio de force est dépassé et que le combat n'est pas honorable.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Ratio standard</h3>
                    <p className="text-3xl font-bold text-primary">5:1</p>
                    <p className="text-gray-500 text-sm">Sans officier</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Avec Amiral</h3>
                    <p className="text-3xl font-bold text-green-400">3:1</p>
                    <p className="text-gray-500 text-sm">Ratio amélioré</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le Fleetsave manuel</h2>
                <p className="text-gray-300 mb-4">
                  Le fleetsave (FS) consiste à envoyer votre flotte en mission pour qu'elle soit en vol 
                  pendant votre absence. Une flotte en vol ne peut pas être attaquée !
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Stationner</h3>
                    <p className="text-gray-300 text-sm">Mission vers une lune alliée</p>
                    <p className="text-xs text-gray-500 mt-2">Le plus sûr si vous avez confiance</p>
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-blue-400 mb-2">Expédition</h3>
                    <p className="text-gray-300 text-sm">Envoi en expédition longue</p>
                    <p className="text-xs text-gray-500 mt-2">Rapporte des ressources</p>
                  </div>
                  <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-purple-400 mb-2">Déploiement</h3>
                    <p className="text-gray-300 text-sm">Vers votre propre lune</p>
                    <p className="text-xs text-gray-500 mt-2">Annulable à tout moment</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Règles d'or du Fleetsave</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                    <p className="text-gray-300"><strong className="text-white">Toujours partir d'une lune</strong> - La phalange ne peut pas scanner les départs depuis une lune</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                    <p className="text-gray-300"><strong className="text-white">Arriver sur une lune</strong> - Évite d'être scanné à l'arrivée</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                    <p className="text-gray-300"><strong className="text-white">Calculez bien le temps</strong> - La flotte doit revenir après votre retour</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                    <p className="text-gray-300"><strong className="text-white">Emportez vos ressources</strong> - Ne laissez rien sur vos planètes</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-red-400 mb-4">Dangers à éviter</h2>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Ne jamais FS depuis une planète (phalange possible)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Attention aux heures de retour prévisibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Éviter les missions "Attaquer" qui ne peuvent pas être rappelées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    <span>Ne pas oublier de fleetsave vos lunes aussi</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Besoin d'aide pour votre fleetsave ?
                </h3>
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

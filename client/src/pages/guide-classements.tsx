import { motion } from "framer-motion";
import { Trophy, ExternalLink } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const statuts = [
  { icon: "https://img.tedomum.net/data/honneur%204-7a7de8.png", nom: "Grand Impérator", condition: "15 000+ PH, Top 10" },
  { icon: "https://img.tedomum.net/data/honneur%205-c93855.png", nom: "Impérator", condition: "2 500+ PH, Top 100" },
  { icon: "https://img.tedomum.net/data/honneur%206-efd761.png", nom: "Seigneur galactique", condition: "500+ PH, Top 250" },
  { icon: "https://img.tedomum.net/data/honneur%207-8aa9e1.png", nom: "Bandit", condition: "-500 PH, 250 derniers" },
  { icon: "https://img.tedomum.net/data/honneur%208-49146d.png", nom: "Seigneur des bandits", condition: "-2 500 PH, 100 derniers" },
  { icon: "https://img.tedomum.net/data/honneur%209-bfb6a2.png", nom: "Roi des bandits", condition: "-15 000 PH, 10 derniers" }
];

export default function GuideClassements() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/20">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Classements & Points d'Honneur
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comprendre les différents classements et le système d'honneur
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Accéder aux classements</h2>
                <p className="text-gray-300 mb-4">
                  Vous pouvez accéder aux classements via le menu ou en cliquant sur votre nombre de points.
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://img.tedomum.net/data/classement%201-1a6b71.png" alt="Menu classement" className="h-8" />
                  <span className="text-gray-400">ou</span>
                  <img src="https://img.tedomum.net/data/classement%202-e48676.png" alt="Points classement" className="h-8" />
                </div>
                <p className="text-sm text-gray-500">1 point = 1000 ressources dépensées</p>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Types de classements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Points généraux</h3>
                    <p className="text-gray-400 text-sm">Classement principal regroupant tous vos points</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Économie</h3>
                    <p className="text-gray-400 text-sm">Bâtiments et vaisseaux civils</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Recherche</h3>
                    <p className="text-gray-400 text-sm">Points technologiques</p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Militaire</h3>
                    <p className="text-gray-400 text-sm">Flottes offensives et défenses</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Classement Militaire détaillé</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <img src="https://img.tedomum.net/data/classement%207-c20fab.png" alt="Construit" className="h-6 mx-auto mb-2" />
                    <div className="text-white text-sm font-medium">Construit</div>
                    <div className="text-gray-500 text-xs">Ressources investies</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <img src="https://img.tedomum.net/data/classement%208-f4f09d.png" alt="Détruit" className="h-6 mx-auto mb-2" />
                    <div className="text-white text-sm font-medium">Détruit</div>
                    <div className="text-gray-500 text-xs">Dégâts infligés</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <img src="https://img.tedomum.net/data/classement%209-7616ad.png" alt="Perdu" className="h-6 mx-auto mb-2" />
                    <div className="text-white text-sm font-medium">Perdu</div>
                    <div className="text-gray-500 text-xs">Dégâts subis</div>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-3 text-center">
                    <img src="https://img.tedomum.net/data/classement%2010-8fdf09.png" alt="Honneur" className="h-6 mx-auto mb-2" />
                    <div className="text-white text-sm font-medium">Honneur</div>
                    <div className="text-gray-500 text-xs">Points d'honneur</div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Les 3 situations de combat</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="https://img.tedomum.net/data/honneur%201-2e5cc0.png" alt="Honorable" className="h-5" />
                      <span className="font-bold text-yellow-400">Honorable</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">Vous gagnez des PH en détruisant</p>
                    <p className="text-xs text-yellow-400">Pillage : 75%</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="https://img.tedomum.net/data/honneur%202-2b79d1.png" alt="Normal" className="h-5" />
                      <span className="font-bold text-gray-300">Normal</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">Vous perdez des PH en détruisant</p>
                    <p className="text-xs text-gray-400">Pillage : 50%</p>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src="https://img.tedomum.net/data/honneur%203-f993cf.png" alt="Bandit" className="h-5" />
                      <span className="font-bold text-red-400">Bandit</span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">Vous gagnez des PH en détruisant</p>
                    <p className="text-xs text-red-400">Pillage : 100%</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Les Statuts d'Honneur</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {statuts.map((s, i) => (
                    <div key={i} className="bg-[#151924] rounded-lg p-3 flex items-center gap-3">
                      <img src={s.icon} alt={s.nom} className="h-8 w-8" />
                      <div>
                        <div className="font-medium text-white text-sm">{s.nom}</div>
                        <div className="text-xs text-gray-500">{s.condition}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                  <p className="text-sm text-red-300">
                    <strong>Inconvénients Bandit :</strong> Fuite désactivée, pillage 100% sur vous, combats toujours honorables contre vous.
                  </p>
                </div>
              </div>

              <RelatedGuides currentGuide="classements" />

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Questions sur les classements ?
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

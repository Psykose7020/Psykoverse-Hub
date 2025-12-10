import { motion } from "framer-motion";
import { Crosshair, ExternalLink, Eye, Shield, Layers, Clock, Target } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideRaid() {
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
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/20">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Techniques de Raid Avancées
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Guide complet du raideur par Triling of Borg
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-violet-400" />
                  <h2 className="font-display text-xl font-bold text-white">Recherche de cibles</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Astuce du matin</h3>
                    <p className="text-gray-300 text-sm">
                      Connectez-vous tôt le matin pour attraper tous les retours de flotte ratés. 
                      En début d'univers, ils sont nombreux !
                    </p>
                  </div>
                  
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Technique du double espionnage</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Espionnez toutes les planètes et lunes d'une zone. Après 30-40 minutes, 
                      repassez derrière vos espions et <strong className="text-primary">espionnez tous les timers qui ne 
                      collent pas avec les vôtres</strong>.
                    </p>
                    <p className="text-gray-400 text-xs">
                      Cette astuce permet de trouver plus de flottes. OGame se joue parfois à quelques secondes.
                    </p>
                  </div>

                  <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-amber-400 mb-2">Heures de retour standard</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-amber-800/30 px-3 py-1 rounded text-sm text-white">6h - 8h</span>
                      <span className="bg-amber-800/30 px-3 py-1 rounded text-sm text-white">11h - 14h</span>
                      <span className="bg-amber-800/30 px-3 py-1 rounded text-sm text-white">16h - 19h</span>
                    </div>
                    <p className="text-amber-300/70 text-xs mt-2">Ce sont les créneaux les plus rentables pour chercher des cibles</p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Surveillance discrète</h3>
                    <p className="text-gray-300 text-sm">
                      Quand vous trouvez une flotte, <strong className="text-red-400">ne harcelez pas le joueur d'espionnages</strong>. 
                      Surveillez les activités simplement et cherchez ses failles. Si vous espionnez trop, 
                      il va se méfier et se repositionner loin de vous.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <h2 className="font-display text-xl font-bold text-white">Éviter de se faire intercepter</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Vérifications avant raid</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">1.</span>
                        <span>Vérifiez l'<strong className="text-white">Astrophysique</strong> de la cible (nombre de planètes possibles)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">2.</span>
                        <span>Vérifiez son <strong className="text-white">total de points militaires</strong> sur les classements (il ne peut pas auto-inter avec ce qu'il n'a pas)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">3.</span>
                        <span>Privilégiez les <strong className="text-white">fulls plutôt que les banques</strong> pour éviter les mauvaises surprises</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Technique du décalage</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Sur les raids avec activité, décalez avant l'impact. Mais attention : 
                      <strong className="text-red-400"> ne décalez jamais de la même durée !</strong>
                    </p>
                    <p className="text-gray-400 text-sm">
                      Un ennemi peut noter "Triling décale de 30s pile" et caler sa DG 25s après votre impact initial.
                      Variez : 1 min, puis 2 min, puis 3 min...
                    </p>
                    <div className="mt-3 bg-primary/10 border border-primary/30 rounded p-2 text-xs text-primary">
                      Le décalage ne peut se faire que s'il est inférieur à 10% de la durée restante
                    </div>
                  </div>

                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Technique des waves sur banque</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Pour taper une banque full transporteurs (exemple : 700 traqueurs nécessaires) :
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-green-800/30 px-2 py-1 rounded text-xs text-white">Wave 1: 100 traq</span>
                      <span className="bg-green-800/30 px-2 py-1 rounded text-xs text-white">Wave 2: 250 traq</span>
                      <span className="bg-green-800/30 px-2 py-1 rounded text-xs text-white">Wave 3: 350 traq</span>
                      <span className="bg-green-800/30 px-2 py-1 rounded text-xs text-white">+ 3 waves pillage</span>
                    </div>
                    <p className="text-gray-400 text-xs">
                      Si vous vous faites inter, ce sera qu'une perte dérisoire !
                    </p>
                  </div>

                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Technique du faux retour</h3>
                    <p className="text-gray-300 text-sm">
                      Envoyez 2× votre flotte et calez un espionnage. Faites retour sur la première... 
                      ou calez un espio 1s après l'impact pour faire croire que vous allez annuler, 
                      mais laissez passer ! 😏
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-6 h-6 text-purple-400" />
                  <h2 className="font-display text-xl font-bold text-white">Split de flotte</h2>
                </div>
                
                <p className="text-gray-300 mb-4">
                  Le split détermine comment vos vaisseaux se présentent au combat. 
                  Vos premiers vaisseaux envoyés seront en première ligne.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Attaque large (victoire assurée)</h3>
                    <p className="text-gray-300 text-sm mb-2">Ordre d'envoi :</p>
                    <ol className="text-sm text-gray-300 space-y-1">
                      <li><span className="text-green-400">1.</span> Chasseurs légers, lourds, Destroyers, Faucheurs, BB</li>
                      <li><span className="text-green-400">2.</span> Croiseurs, VB</li>
                      <li><span className="text-green-400">3.</span> Traqueurs, Éclaireurs</li>
                    </ol>
                    <p className="text-gray-500 text-xs mt-2">BB/Destro/Faucheurs en première ligne car leur structure tient les 6 rounds</p>
                  </div>

                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">Combat serré</h3>
                    <p className="text-gray-300 text-sm mb-2">Ordre d'envoi :</p>
                    <ol className="text-sm text-gray-300 space-y-1">
                      <li><span className="text-red-400">1.</span> BB, Destroyers, Faucheurs</li>
                      <li><span className="text-red-400">2.</span> Traqueurs, VB, Croiseurs</li>
                      <li><span className="text-red-400">3.</span> Chasseurs légers, lourds</li>
                    </ol>
                    <p className="text-gray-500 text-xs mt-2">Protégez vos gros vaisseaux, les petits absorbent les dégâts</p>
                  </div>
                </div>

                <div className="mt-4 bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-sm text-primary">
                    <strong>Important :</strong> Quand vous simulez votre flotte complète sans splits, 
                    vous aurez toujours un résultat meilleur en splittant votre flotte !
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Technique contre les connexions tardives</h2>
                </div>
                
                <p className="text-gray-300 mb-4">
                  Beaucoup de joueurs se connectent <strong className="text-white">après</strong> le retour de leur flotte. 
                  Voici comment les exploiter :
                </p>

                <div className="bg-[#151924] rounded-lg p-4">
                  <h3 className="font-bold text-white mb-2">Technique de la DG anticipée sur recyclage</h3>
                  <p className="text-gray-300 text-sm">
                    Si vous connaissez l'heure de retour d'un joueur (via phalange ou observation), 
                    vous pouvez préparer une DG qui arrive juste après son retour, avant qu'il ait 
                    le temps de relancer son ghost.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center text-sm text-gray-500">
                Guide basé sur le tutoriel de <span className="text-gray-400">Triling of Borg</span>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/30 rounded-xl p-8 text-center">
                <h3 className="font-display text-xl font-bold text-white mb-3">
                  Rejoignez les raideurs de Psykoverse
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

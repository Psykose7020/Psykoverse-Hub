import { motion } from "framer-motion";
import { Radio, AlertTriangle, Clock, Shield, Eye } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function GuideDecalageSonde() {
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
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                <Radio className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Décalage à la Sonde
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Technique avancée pour détecter les défenses groupées
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4">Le principe</h2>
                <p className="text-gray-300 mb-4">
                  Le décalage à la sonde consiste à <strong className="text-primary">décaler votre attaque</strong> juste avant l'impact, 
                  afin d'envoyer une sonde d'espionnage à l'heure d'impact initiale et vérifier si une 
                  <strong className="text-white"> Défense Groupée (DG)</strong> était organisée contre vous.
                </p>
                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <p className="text-primary text-sm">
                    <strong>Pourquoi "à la sonde" ?</strong> Parce qu'on fait cela en bout de course, juste avant l'impact, 
                    quand il ne reste plus beaucoup de temps pour décaler. Seule une sonde (très rapide) peut arriver à temps.
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-white">Comment ça marche</h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <div className="font-bold text-white">Votre attaque approche</div>
                      <p className="text-gray-400 text-sm">Vous êtes à quelques minutes de l'impact prévu.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <div className="font-bold text-white">Vous décalez votre flotte</div>
                      <p className="text-gray-400 text-sm">Utilisez la fonction de décalage pour repousser l'impact de quelques secondes/minutes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <div className="font-bold text-white">Envoyez une sonde à l'heure initiale</div>
                      <p className="text-gray-400 text-sm">Votre sonde arrive au moment où votre flotte aurait dû impacter.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#151924] rounded-lg">
                    <span className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <div className="font-bold text-white">Analysez le rapport</div>
                      <p className="text-gray-400 text-sm">
                        Si vous voyez une grosse flotte en SAB (Stationner Chez un Allié), 
                        <strong className="text-red-400"> une DG vous attendait !</strong> Annulez votre attaque.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  <h2 className="font-display text-xl font-bold text-red-400">Attention : La DG ne peut pas décaler !</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Contrairement à votre attaque, une <strong className="text-white">Défense Groupée (DG) ne peut pas être décalée</strong>. 
                  C'est ce qui rend cette technique efficace : si une DG était prévue pour vous intercepter, 
                  elle arrivera à l'heure prévue... mais vous n'y serez plus !
                </p>
                <div className="bg-[#151924] rounded-lg p-4">
                  <p className="text-gray-400 text-sm">
                    <strong className="text-white">Pourquoi ?</strong> La DG est une mission de défense, pas une attaque. 
                    Seules les missions d'attaque peuvent être décalées en cours de vol.
                  </p>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-amber-400" />
                  <h2 className="font-display text-xl font-bold text-amber-400">Le contre : DG post-décalage</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Les joueurs expérimentés connaissent cette technique. Pour la contrer, ils peuvent poser une 
                  <strong className="text-white"> DG volontairement après l'heure d'impact initiale</strong>, 
                  en anticipant votre décalage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Leur raisonnement</h3>
                    <p className="text-gray-400 text-sm">
                      "Il va décaler de 30 secondes, je pose ma DG 35 secondes après son impact initial"
                    </p>
                  </div>
                  <div className="bg-[#151924] rounded-lg p-4">
                    <h3 className="font-bold text-white mb-2">Votre parade</h3>
                    <p className="text-gray-400 text-sm">
                      Variez vos décalages ! Ne soyez pas prévisible. Parfois 20s, parfois 1min, parfois 0.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-violet-400" />
                  <h2 className="font-display text-xl font-bold text-white">Quand utiliser cette technique ?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">Utilisez-la quand...</h3>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• La cible est dans une alliance active</li>
                      <li>• Vous voyez de l'activité suspecte</li>
                      <li>• Le butin vaut le risque d'une DG</li>
                      <li>• Vous suspectez un piège</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4">
                    <h3 className="font-bold text-red-400 mb-2">Inutile si...</h3>
                    <ul className="space-y-1 text-gray-300 text-sm">
                      <li>• La cible est inactive (i) ou (I)</li>
                      <li>• La cible n'a pas d'alliance</li>
                      <li>• Aucune activité visible</li>
                      <li>• Petit raid peu risqué</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-xl p-6">
                <h2 className="font-display text-lg font-bold text-primary mb-3">Résumé</h2>
                <p className="text-gray-300">
                  Le décalage à la sonde est une technique de <strong className="text-white">prudence</strong> : 
                  vous sacrifiez quelques secondes de décalage pour vérifier si le terrain est sûr. 
                  C'est particulièrement utile contre des alliances organisées qui pourraient vous tendre un piège.
                </p>
              </div>

              <RelatedGuides currentGuide="raid" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

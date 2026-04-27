import { motion } from "framer-motion";
import { Globe, Star, Users, Zap, ExternalLink, Shield } from "lucide-react";
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

export default function Alliance() {
  return (
    <Layout>
      <section className="py-16 md:py-24 border-b border-[#2E384D]">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center mb-16"
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
            <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-lg">
              <EditableText
                id="alliance-hero-description"
                defaultValue="La Psykoverse est présente sur deux univers OGame. Rejoignez-nous là où vous jouez !"
                as="span"
                multiline
              />
            </motion.p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Scorpius — Serveur Principal */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative h-full bg-gradient-to-br from-[#1C2230] to-[#151924] border border-primary/60 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)]"
            >
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-indigo-500 text-white text-xs font-bold uppercase tracking-widest py-2 text-center">
                <Zap className="w-4 h-4 inline mr-2" />
                Serveur Principal
              </div>

              <div className="flex h-full flex-col p-8 pt-14">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <h2 className="font-display text-4xl font-bold text-white">Scorpius</h2>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-primary/20 text-primary animate-pulse">
                      Actif
                    </span>
                  </div>
                  <p className="text-primary text-sm font-mono mb-3">Univers Principal</p>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    Notre univers de référence. Une communauté soudée, des joueurs expérimentés et une alliance bien établie. C'est ici que se passe l'essentiel de notre activité !
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {["Joueurs actifs", "Entraide quotidienne", "Progression ensemble"].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-[#0F1520] px-3 py-1.5 rounded-full border border-[#2E384D]">
                        <Star className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div className="bg-[#0F1520] border border-[#2E384D] rounded-xl p-5 text-center sm:text-left">
                    <Shield className="w-9 h-9 text-primary mx-auto mb-3 sm:mx-0" />
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Alliance</p>
                    <p className="text-white font-display font-bold text-xl">Psykoverse</p>
                    <p className="text-gray-500 text-xs mt-2">Alliance établie</p>
                  </div>
                  <Button size="lg" asChild>
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                      <Users className="w-5 h-5 mr-2" />
                      Discord
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Yi-Swan — Dernier univers */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="relative h-full bg-[#1C2230] border border-[#2E384D] hover:border-primary/40 rounded-2xl overflow-hidden transition-all"
            >
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-emerald-500/80 to-cyan-500/80 text-white text-xs font-bold uppercase tracking-widest py-2 text-center">
                <Star className="w-4 h-4 inline mr-2" />
                Dernier univers
              </div>

              <div className="flex h-full flex-col p-8 pt-14">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <h2 className="font-display text-4xl font-bold text-white">Yi-Swan</h2>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-900/50 text-emerald-300">
                      Nouveau
                    </span>
                  </div>
                  <p className="text-primary text-sm font-mono mb-3">Dernier univers</p>
                  <p className="text-gray-400 text-base leading-relaxed mb-6">
                    Notre implantation la plus récente. Yi-Swan accueille les joueurs qui veulent rejoindre une dynamique neuve, participer au recrutement et construire une base solide dès le départ.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {["Recrutement ouvert", "Départ collectif", "Communauté Psykoverse"].map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-300 bg-[#0F1520] px-3 py-1.5 rounded-full border border-[#2E384D]">
                        <Star className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-2 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div className="bg-[#0F1520] border border-[#2E384D] rounded-xl p-5 text-center sm:text-left">
                    <Shield className="w-9 h-9 text-emerald-300 mx-auto mb-3 sm:mx-0" />
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Alliance</p>
                    <p className="text-white font-display font-bold text-xl">BROUTE</p>
                    <p className="text-gray-500 text-xs mt-2">Recrutement en cours</p>
                  </div>
                  <Button variant="outline" size="lg" asChild>
                    <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                      <Users className="w-5 h-5 mr-2" />
                      Discord
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-500 mb-6 text-sm">
              Vous jouez sur un autre univers ? Contactez-nous sur Discord pour discuter d'une expansion !
            </p>
            <Button size="lg" variant="outline" asChild>
              <a href="https://discord.gg/3PWk4HmfNn" target="_blank" rel="noopener noreferrer">
                Nous contacter
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

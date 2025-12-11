import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Shield, Send, CheckCircle, Info, ChevronDown, ChevronUp, BarChart3 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function SurveyCompositionsPage() {
  return (
    <Layout>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary text-sm mb-6">
              <BarChart3 className="w-4 h-4" />
              <span>Sondage Communautaire</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quelle est votre composition idéale ?
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Participez anonymement à notre sondage pour nous aider à comprendre les tendances de la communauté OGame francophone.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-700/30 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-cyan-300 mb-2">Pourquoi ce sondage ?</h3>
                <p className="text-cyan-200/80 text-sm">
                  Les résultats collectés permettront de réaliser un compte rendu détaillé et de créer des guides sur les tendances de la communauté. 
                  Vos réponses sont <strong>100% anonymes</strong> - aucune information personnelle n'est collectée.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-8">
            <FleetSurveyCard />
            <DefenseSurveyCard />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FleetSurveyCard() {
  const [composition, setComposition] = useState("");
  const [strategy, setStrategy] = useState("");
  const [universe, setUniverse] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { composition: string; strategy: string; universe: string }) => {
      const res = await fetch("/api/surveys/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erreur lors de l'envoi");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setComposition("");
      setStrategy("");
      setUniverse("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (composition.length < 10) return;
    mutation.mutate({ composition, strategy, universe });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-[#252D3D] transition-colors"
        data-testid="toggle-fleet-survey"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-white">Composition de Flotte Idéale</h2>
            <p className="text-gray-400 text-sm">Pour ceux qui font de la flotte</p>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          {submitted ? (
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-green-300 mb-2">Merci pour votre participation !</h3>
              <p className="text-green-200/80 text-sm">Votre composition de flotte a été enregistrée.</p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="mt-4"
                data-testid="button-submit-another-fleet"
              >
                Soumettre une autre composition
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Décrivez votre composition de flotte idéale *
                </label>
                <textarea
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                  placeholder="Ex: 100k GT, 50k VB, 20k Croiseurs, 5k Destroyers... ou décrivez vos ratios préférés"
                  className="w-full h-32 bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white placeholder-gray-500 resize-none focus:border-primary focus:outline-none"
                  required
                  minLength={10}
                  data-testid="input-fleet-composition"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 10 caractères</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stratégie ou explications (optionnel)
                </label>
                <textarea
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  placeholder="Expliquez pourquoi vous préférez cette composition, pour quel type d'attaque, etc."
                  className="w-full h-24 bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white placeholder-gray-500 resize-none focus:border-primary focus:outline-none"
                  data-testid="input-fleet-strategy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type d'univers (optionnel)
                </label>
                <select
                  value={universe}
                  onChange={(e) => setUniverse(e.target.value)}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                  data-testid="select-fleet-universe"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="x1">Univers x1</option>
                  <option value="x2-x4">Univers x2-x4</option>
                  <option value="x5-x7">Univers x5-x7</option>
                  <option value="x8+">Univers x8+</option>
                  <option value="speed">Univers Speed/War</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending || composition.length < 10}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                data-testid="button-submit-fleet"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Envoyer ma réponse
                  </span>
                )}
              </Button>

              {mutation.isError && (
                <p className="text-red-400 text-sm text-center">{mutation.error.message}</p>
              )}
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
}

function DefenseSurveyCard() {
  const [composition, setComposition] = useState("");
  const [strategy, setStrategy] = useState("");
  const [universe, setUniverse] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { composition: string; strategy: string; universe: string }) => {
      const res = await fetch("/api/surveys/defense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erreur lors de l'envoi");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setComposition("");
      setStrategy("");
      setUniverse("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (composition.length < 10) return;
    mutation.mutate({ composition, strategy, universe });
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-[#252D3D] transition-colors"
        data-testid="toggle-defense-survey"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-white">Composition de Défense Idéale</h2>
            <p className="text-gray-400 text-sm">Pour ceux qui font de la défense</p>
          </div>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          {submitted ? (
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-green-300 mb-2">Merci pour votre participation !</h3>
              <p className="text-green-200/80 text-sm">Votre composition de défense a été enregistrée.</p>
              <Button
                onClick={() => setSubmitted(false)}
                variant="outline"
                className="mt-4"
                data-testid="button-submit-another-defense"
              >
                Soumettre une autre composition
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Décrivez votre composition de défense idéale *
                </label>
                <textarea
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                  placeholder="Ex: 10k LM, 5k LL, 2k GL, 500 Gauss, 200 Ions, 100 Plasma... ou décrivez vos ratios préférés"
                  className="w-full h-32 bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white placeholder-gray-500 resize-none focus:border-primary focus:outline-none"
                  required
                  minLength={10}
                  data-testid="input-defense-composition"
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 10 caractères</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stratégie ou explications (optionnel)
                </label>
                <textarea
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  placeholder="Expliquez pourquoi vous préférez cette composition, pour quel type de protection, etc."
                  className="w-full h-24 bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white placeholder-gray-500 resize-none focus:border-primary focus:outline-none"
                  data-testid="input-defense-strategy"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type d'univers (optionnel)
                </label>
                <select
                  value={universe}
                  onChange={(e) => setUniverse(e.target.value)}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                  data-testid="select-defense-universe"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="x1">Univers x1</option>
                  <option value="x2-x4">Univers x2-x4</option>
                  <option value="x5-x7">Univers x5-x7</option>
                  <option value="x8+">Univers x8+</option>
                  <option value="speed">Univers Speed/War</option>
                </select>
              </div>

              <Button
                type="submit"
                disabled={mutation.isPending || composition.length < 10}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                data-testid="button-submit-defense"
              >
                {mutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Envoi en cours...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Envoyer ma réponse
                  </span>
                )}
              </Button>

              {mutation.isError && (
                <p className="text-red-400 text-sm text-center">{mutation.error.message}</p>
              )}
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
}

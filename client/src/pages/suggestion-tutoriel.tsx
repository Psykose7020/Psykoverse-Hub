import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, CheckCircle, AlertCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const MAX_CHARACTERS = 30000;

export default function SuggestionTutoriel() {
  const [content, setContent] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const remainingChars = MAX_CHARACTERS - content.length;
  const isOverLimit = remainingChars < 0;

  const submitMutation = useMutation({
    mutationFn: async (data: { pseudo: string; content: string }) => {
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erreur lors de l'envoi");
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isOverLimit) {
      submitMutation.mutate({ pseudo: pseudo.trim() || "Anonyme", content: content.trim() });
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Merci pour votre suggestion !
              </h1>
              <p className="text-gray-400 mb-8">
                Votre contribution a bien été envoyée. Elle sera examinée par l'équipe.
              </p>
              <Link href="/tutoriels">
                <Button>Retour aux tutoriels</Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Proposer un tutoriel
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto">
                Partagez vos connaissances OGame ! Proposez un nouveau guide, une correction, 
                ou une amélioration pour les tutoriels existants.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <label className="block text-white font-medium mb-2">
                  Votre pseudo (optionnel)
                </label>
                <input
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  placeholder="Ex: Psykose, Samurai_Shogun..."
                  className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-pseudo"
                />
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-white font-medium">
                    Votre suggestion *
                  </label>
                  <span className={`text-sm ${isOverLimit ? 'text-red-400' : remainingChars < 1000 ? 'text-amber-400' : 'text-gray-500'}`}>
                    {remainingChars.toLocaleString()} caractères restants
                  </span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Décrivez votre suggestion de tutoriel, correction ou amélioration...

Exemples :
- Nouveau guide sur [sujet]
- Correction dans le guide [nom] : [détails]
- Ajout de technique : [description]"
                  rows={15}
                  className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors resize-y min-h-[200px]"
                  data-testid="input-suggestion"
                />
                {isOverLimit && (
                  <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Vous avez dépassé la limite de {MAX_CHARACTERS.toLocaleString()} caractères</span>
                  </div>
                )}
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-primary text-sm">
                  <strong>Note :</strong> Votre suggestion sera examinée par l'équipe. 
                  Les contributions pertinentes seront intégrées aux guides avec crédit à l'auteur si souhaité.
                </p>
              </div>

              <Button
                type="submit"
                disabled={!content.trim() || isOverLimit || submitMutation.isPending}
                className="w-full py-4 text-lg"
                data-testid="btn-submit-suggestion"
              >
                {submitMutation.isPending ? (
                  "Envoi en cours..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer ma suggestion
                  </>
                )}
              </Button>

              {submitMutation.isError && (
                <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 text-center">
                  <p className="text-red-400 text-sm">
                    Une erreur s'est produite. Veuillez réessayer ou contacter l'équipe sur Discord.
                  </p>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

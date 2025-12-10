import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim().length < 5) {
      setError("Le message doit contenir au moins 5 caractères");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), page: location }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de l'envoi");
      }

      setIsSuccess(true);
      setMessage("");
      setTimeout(() => {
        setIsOpen(false);
        setIsSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (location === "/") {
    return null;
  }

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        data-testid="feedback-button"
      >
        <MessageCircle className="w-6 h-6 text-black" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-md"
            >
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 flex items-center justify-between border-b border-[#2E384D]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Votre avis compte !</h3>
                      <p className="text-xs text-gray-400">Message anonyme</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg bg-[#0B0E14] flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    data-testid="feedback-close"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                <div className="p-4">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h4 className="font-bold text-white text-lg mb-1">Merci !</h4>
                      <p className="text-gray-400 text-sm">Votre feedback a été envoyé</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Partagez vos idées, suggestions ou signaler un problème..."
                          className="w-full h-32 bg-[#0B0E14] border border-[#2E384D] rounded-xl p-4 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:border-primary/50 transition-colors"
                          data-testid="feedback-textarea"
                          maxLength={1000}
                        />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">{message.length}/1000</span>
                          {error && <span className="text-xs text-red-400">{error}</span>}
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting || message.trim().length < 5}
                        className="w-full"
                        data-testid="feedback-submit"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                            Envoi...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Envoyer
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

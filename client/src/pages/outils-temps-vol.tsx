import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, AlertTriangle, Lock, Wrench } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function OutilsTempsVol() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, navigate] = useLocation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/dev-access/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (data.valid) {
        sessionStorage.setItem("dev_access_granted", "true");
        navigate("/outils/temps-vol-dev");
      } else {
        setError("Code incorrect.");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

            {/* Titre */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Calculateur de Temps de Vol
                </h1>
              </div>
            </div>

            {/* Bandeau warning */}
            <div className="flex items-start gap-3 bg-amber-950/60 border border-amber-600/50 rounded-xl px-5 py-4 mb-8">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-200 text-sm leading-relaxed">
                <span className="font-bold">Avertissement :</span> Cet outil est basé sur les formules OGame et peut contenir des approximations. Vérifiez toujours vos calculs en jeu avant d'engager une flotte.
              </p>
            </div>

            {/* Message en cours de développement */}
            <div className="bg-[#1C2230] border border-[#2E384D] rounded-2xl p-10 text-center mb-16">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-indigo-500/20 border border-primary/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <h2 className="font-display text-xl font-bold text-white mb-3">
                Cet outil est en cours de développement.
              </h2>
              <p className="text-gray-400 leading-relaxed max-w-md mx-auto">
                Nous travaillons à vous offrir un outil de qualité professionnelle.
                Revenez bientôt !
              </p>
            </div>

            {/* Accès dev — discret, en bas de page */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 justify-center opacity-30 hover:opacity-60 transition-opacity">
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={code}
                  onChange={e => { setCode(e.target.value); setError(""); }}
                  placeholder="Code d'accès"
                  className="bg-[#1C2230] border border-[#2E384D] text-gray-400 text-xs rounded-lg pl-8 pr-3 py-2 w-36 focus:outline-none focus:border-gray-500"
                />
              </div>
              <Button type="submit" size="sm" variant="outline" disabled={loading} className="text-xs border-[#2E384D] text-gray-500 hover:text-white">
                {loading ? "..." : "Accéder"}
              </Button>
              {error && <span className="text-red-400 text-xs">{error}</span>}
            </form>

          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

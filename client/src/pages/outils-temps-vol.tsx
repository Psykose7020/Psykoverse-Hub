import { useState } from "react";
import { AlertTriangle, Clock3, Lock, Rocket, Wrench } from "lucide-react";
import { useLocation } from "wouter";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import RelatedGuides from "@/components/RelatedGuides";
import {
  PageBackLink,
  PageContainer,
  PageHero,
  ResultStat,
  SectionCard,
} from "@/components/content/page-shell";

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
      <PageContainer maxWidth="max-w-4xl">
        <PageBackLink />

        <PageHero
          icon={Rocket}
          title="Calculateur de Temps de Vol"
          description="La version publique reste en préparation. Cette page explique clairement l’état actuel de l’outil et redirige vers le guide d’utilisation disponible."
          gradient="bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20"
          action={
            <Button asChild className="bg-amber-500 font-bold text-black hover:bg-amber-400">
              <a href="/guide/calc-temps-vol">Lire le guide dédié</a>
            </Button>
          }
        />

        <div className="space-y-8">
          <SectionCard title="État actuel" tone="warning" icon={AlertTriangle}>
            <p className="text-sm leading-relaxed text-amber-100">
              L’outil public n’est pas encore jugé assez fiable pour une mise en avant complète. Les calculs détaillés de vol et
              d’interception sont donc volontairement laissés derrière un accès de développement tant que la validation n’est pas terminée.
            </p>
          </SectionCard>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <ResultStat label="Statut" value="En développement" valueClassName="text-amber-300" />
            <ResultStat label="Version publique" value="Masquée" valueClassName="text-gray-200" />
            <ResultStat label="Documentation" value="Disponible" valueClassName="text-green-300" />
          </div>

          <SectionCard title="Ce qui est déjà disponible" icon={Clock3}>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Le guide explique le fonctionnement visé du calculateur, ses scénarios et ses limites actuelles.</li>
              <li>La page garde un accès dev discret sans le mélanger à la navigation principale.</li>
              <li>Le message d’attente est maintenant explicite pour éviter l’impression d’outil cassé ou abandonné.</li>
            </ul>
          </SectionCard>

          <SectionCard title="Accès développement" description="Conservé tel quel, mais isolé visuellement pour ne pas polluer l’expérience publique." icon={Wrench}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError("");
                  }}
                  placeholder="Code d'accès développement"
                  className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] py-3 pl-10 pr-3 text-sm text-white"
                />
              </div>

              <Button type="submit" variant="outline" disabled={loading} className="border-[#2E384D] text-gray-300 hover:text-white">
                {loading ? "Vérification..." : "Accéder"}
              </Button>
            </form>

            {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          </SectionCard>

          <RelatedGuides currentGuide="calc-temps-vol" />
        </div>
      </PageContainer>
    </Layout>
  );
}

import { useMemo, useState } from "react";
import { AlertTriangle, Bomb, Calculator, Info, Target } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import { clampNumber } from "@/lib/formatters";
import {
  FormulaNotice,
  PageBackLink,
  PageContainer,
  PageHero,
  ResultStat,
  SectionCard,
} from "@/components/content/page-shell";

function ripsFor100Percent(size: number) {
  const sqrtSize = Math.sqrt(size);
  if (sqrtSize >= 100) return Infinity;
  return Math.ceil(Math.pow(100 / (100 - sqrtSize), 2));
}

export default function OutilsMoonbreak() {
  const [moonSize, setMoonSize] = useState(8944);
  const [ripCount, setRipCount] = useState(10);
  const [waveCount, setWaveCount] = useState(3);

  const results = useMemo(() => {
    const destructionChance = Math.max(0, Math.min(100, (100 - Math.sqrt(moonSize)) * Math.sqrt(ripCount)));
    const ripLossChance = Math.sqrt(moonSize) / 2;
    const destructionProb = destructionChance / 100;
    const cumulativeChance = (1 - Math.pow(1 - destructionProb, waveCount)) * 100;
    const expectedRipLoss = waveCount * (ripLossChance / 100) * ripCount;

    return {
      destructionChance,
      ripLossChance,
      cumulativeChance,
      expectedRipLoss,
      isFavorable: destructionChance > ripLossChance,
    };
  }, [moonSize, ripCount, waveCount]);

  return (
    <Layout>
      <PageContainer>
        <PageBackLink />

        <PageHero
          icon={Bomb}
          title="Calculateur MoonBreak"
          description="Estime la destruction de lune, le risque de perte des RIP et la probabilité cumulée sur plusieurs vagues."
          gradient="bg-gradient-to-br from-red-600 to-red-800 shadow-red-500/20"
        />

        <div className="space-y-8">
          <FormulaNotice
            title="Formules affichées explicitement"
            lines={[
              <p key="1">Destruction : <code className="rounded bg-black/30 px-1">(100 - √taille lune) × √RIP</code></p>,
              <p key="2">Perte RIP : <code className="rounded bg-black/30 px-1">√taille lune / 2</code></p>,
              <p key="3" className="text-xs text-gray-400">Ces calculs reprennent les hypothèses déjà présentes dans le projet. Ils doivent rester vérifiés en jeu avant une opération réelle.</p>,
            ]}
            tone="warning"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
            <SectionCard title="Paramètres" description="Les curseurs et les champs restent synchronisés." icon={Calculator}>
              <div className="space-y-5">
                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Taille de lune</span>
                  <input
                    type="number"
                    min="1000"
                    max="15000"
                    value={moonSize}
                    onChange={(e) => setMoonSize(clampNumber(Number(e.target.value), 1000, 15000))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#151924] px-4 py-3 text-white"
                    data-testid="input-moon-size"
                  />
                  <input
                    type="range"
                    min="1000"
                    max="12000"
                    value={moonSize}
                    onChange={(e) => setMoonSize(clampNumber(Number(e.target.value), 1000, 12000))}
                    className="w-full accent-primary"
                  />
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Nombre de RIP</span>
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={ripCount}
                    onChange={(e) => setRipCount(clampNumber(Number(e.target.value), 1, 5000))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#151924] px-4 py-3 text-white"
                    data-testid="input-rip-count"
                  />
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={ripCount}
                    onChange={(e) => setRipCount(clampNumber(Number(e.target.value), 1, 50))}
                    className="w-full accent-primary"
                  />
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Nombre de vagues</span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={waveCount}
                    onChange={(e) => setWaveCount(clampNumber(Number(e.target.value), 1, 20))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#151924] px-4 py-3 text-white"
                    data-testid="input-wave-count"
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={waveCount}
                    onChange={(e) => setWaveCount(clampNumber(Number(e.target.value), 1, 10))}
                    className="w-full accent-primary"
                  />
                </label>
              </div>
            </SectionCard>

            <SectionCard title="Synthèse du scénario" description="Lecture utile avant de préparer vos vagues." icon={Info}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultStat
                  label="Chance de destruction"
                  value={`${results.destructionChance.toFixed(1)}%`}
                  valueClassName="text-green-300"
                />
                <ResultStat
                  label="Chance de perte des RIP"
                  value={`${results.ripLossChance.toFixed(1)}%`}
                  valueClassName="text-red-300"
                />
                <ResultStat
                  label={`Chance cumulée sur ${waveCount} vague${waveCount > 1 ? "s" : ""}`}
                  value={`${results.cumulativeChance.toFixed(1)}%`}
                  valueClassName="text-violet-300"
                />
                <ResultStat
                  label="RIP perdues en moyenne"
                  value={`~${results.expectedRipLoss.toFixed(1)}`}
                  hint={`Sur ${waveCount * ripCount} RIP envoyées au total`}
                />
              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4 text-sm">
                {results.isFavorable ? (
                  <p className="text-green-300">Le scénario est favorable selon cette lecture: la destruction dépasse le risque de perte unitaire des RIP.</p>
                ) : (
                  <p className="text-red-300">Le scénario est risqué selon cette lecture: le risque de perte des RIP dépasse la chance de destruction.</p>
                )}
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Références de fatale" description="Repères rapides pour dimensionner une frappe garantie." icon={Target}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ResultStat label="Lune 8 800 km" value="261 RIP" hint="Perte moyenne ~123 RIP" valueClassName="text-amber-300" />
              <ResultStat
                label="Lune 8 944 km"
                value={`${ripsFor100Percent(8944)} RIP`}
                hint={`Perte moyenne ~${Math.round(ripsFor100Percent(8944) * 0.47)} RIP`}
                valueClassName="text-amber-300"
              />
              <ResultStat label="Lune 9 400 km" value="1 075 RIP" hint="Perte moyenne ~521 RIP" valueClassName="text-amber-300" />
            </div>
          </SectionCard>

          <SectionCard title="Avertissement" tone="warning" icon={AlertTriangle}>
            <ul className="space-y-2 text-sm text-amber-100">
              <li>Le calculateur montre la logique actuellement assumée dans le projet, pas une garantie de résultat en jeu.</li>
              <li>Les valeurs extrêmes et les cas particuliers d’univers doivent être validés manuellement avant une opération réelle.</li>
              <li>Le mode multi-vagues affiche une probabilité cumulée utile pour la lecture, mais ne remplace pas une préparation opérationnelle complète.</li>
            </ul>
          </SectionCard>

          <RelatedGuides currentGuide="moonbreak" />
        </div>
      </PageContainer>
    </Layout>
  );
}

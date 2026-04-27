import { useMemo, useState } from "react";
import { Clock, FlaskConical, Info, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import { RESEARCHES } from "@/data/ogame-calculators";
import { clampNumber, formatCompactNumber, formatDuration } from "@/lib/formatters";
import { getCumulativeCost, getLevelCost } from "@/lib/ogame-calculators";
import {
  FormulaNotice,
  PageBackLink,
  PageContainer,
  PageHero,
  ResultStat,
  SectionCard,
} from "@/components/content/page-shell";

export default function OutilsRecherches() {
  const [researchType, setResearchType] = useState("combustion");
  const [level, setLevel] = useState(15);
  const [labLevel, setLabLevel] = useState(10);
  const [rriLevel, setRriLevel] = useState(0);
  const [ecoSpeed, setEcoSpeed] = useState(1);

  const selected = RESEARCHES[researchType];
  const currentCost = useMemo(() => getLevelCost(selected, level), [selected, level]);
  const totalCost = useMemo(() => getCumulativeCost(selected, level), [selected, level]);
  const effectiveLab = useMemo(() => labLevel * (1 + rriLevel), [labLevel, rriLevel]);
  const researchTime = useMemo(() => {
    return Math.round(((currentCost.metal + currentCost.crystal) / (1000 * (1 + effectiveLab) * ecoSpeed)) * 3600);
  }, [currentCost, ecoSpeed, effectiveLab]);

  return (
    <Layout>
      <PageContainer>
        <PageBackLink />

        <PageHero
          icon={FlaskConical}
          title="Calculateur Recherches"
          description="Estime les coûts de recherche, le total cumulé et le temps associé selon laboratoire, RRI et vitesse économique."
          gradient="bg-gradient-to-br from-teal-500 to-cyan-600 shadow-teal-500/20"
        />

        <div className="space-y-8">
          <FormulaNotice
            title="Formules utilisées"
            lines={[
              <p key="1">Coût niveau <code className="rounded bg-black/30 px-1">n</code> : <code className="rounded bg-black/30 px-1">coût initial × facteur^(n-1)</code></p>,
              <p key="2">Temps : <code className="rounded bg-black/30 px-1">(métal + cristal) / (1000 × (1 + labo effectif) × vitesse)</code></p>,
              <p key="3">Labo effectif : <code className="rounded bg-black/30 px-1">niveau labo × (1 + RRI)</code></p>,
            ]}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <SectionCard title="Paramètres" description="Les champs restent bornés pour éviter les valeurs incohérentes." icon={Info}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="block text-sm text-gray-400">Recherche</span>
                  <select
                    value={researchType}
                    onChange={(e) => setResearchType(e.target.value)}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                    data-testid="select-research"
                  >
                    {Object.entries(RESEARCHES).map(([key, research]) => (
                      <option key={key} value={key}>
                        {research.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="block text-sm text-gray-400">Niveau cible</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="30"
                      value={level}
                      onChange={(e) => setLevel(clampNumber(Number(e.target.value), 1, 30))}
                      className="flex-1 accent-primary"
                    />
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={level}
                      onChange={(e) => setLevel(clampNumber(Number(e.target.value), 1, 30))}
                      className="w-20 rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-center text-white"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Laboratoire</span>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={labLevel}
                    onChange={(e) => setLabLevel(clampNumber(Number(e.target.value), 1, 30))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                  />
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">RRI</span>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={rriLevel}
                    onChange={(e) => setRriLevel(clampNumber(Number(e.target.value), 0, 20))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="block text-sm text-gray-400">Vitesse économique</span>
                  <select
                    value={ecoSpeed}
                    onChange={(e) => setEcoSpeed(clampNumber(Number(e.target.value), 1, 10))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((speed) => (
                      <option key={speed} value={speed}>
                        x{speed}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </SectionCard>

            <SectionCard title={`Synthèse ${selected.name}`} description="Lecture immédiate du niveau visé et du labo effectif." icon={Sparkles}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultStat label={`Métal niveau ${level}`} value={formatCompactNumber(currentCost.metal)} />
                <ResultStat label={`Cristal niveau ${level}`} value={formatCompactNumber(currentCost.crystal)} valueClassName="text-cyan-300" />
                <ResultStat label={`Deutérium niveau ${level}`} value={formatCompactNumber(currentCost.deuterium)} valueClassName="text-teal-300" />
                <ResultStat
                  label="Temps de recherche"
                  value={formatDuration(researchTime)}
                  valueClassName="text-teal-300"
                  hint={`Labo effectif ${effectiveLab} • Univers x${ecoSpeed}`}
                />
              </div>
            </SectionCard>
          </div>

          <SectionCard title={`Coût cumulé du niveau 1 au niveau ${level}`} description="Pour visualiser l’investissement total avant de lancer une montée longue.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ResultStat label="Métal total" value={formatCompactNumber(totalCost.metal)} />
              <ResultStat label="Cristal total" value={formatCompactNumber(totalCost.crystal)} valueClassName="text-cyan-300" />
              <ResultStat label="Deutérium total" value={formatCompactNumber(totalCost.deuterium)} valueClassName="text-teal-300" />
            </div>
          </SectionCard>

          <SectionCard title="Limites de lecture" tone="accent" icon={Clock}>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Le calcul du temps suit le modèle déjà utilisé sur le site et n’intègre pas d’éventuels bonus supplémentaires non saisis.</li>
              <li>Le niveau de laboratoire effectif affiché est une simplification explicite basée sur la formule déjà présente dans le projet.</li>
              <li>Pour une décision critique, gardez une vérification finale directement en jeu.</li>
            </ul>
          </SectionCard>

          <RelatedGuides currentGuide="recherches" />
        </div>
      </PageContainer>
    </Layout>
  );
}

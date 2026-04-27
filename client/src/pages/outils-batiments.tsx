import { useMemo, useState } from "react";
import { Clock, Info, Sparkles, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import { BUILDINGS } from "@/data/ogame-calculators";
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

export default function OutilsBatiments() {
  const [buildingType, setBuildingType] = useState("metal");
  const [level, setLevel] = useState(25);
  const [robotsLevel, setRobotsLevel] = useState(10);
  const [nanitesLevel, setNanitesLevel] = useState(0);
  const [ecoSpeed, setEcoSpeed] = useState(1);

  const selected = BUILDINGS[buildingType];

  const currentCost = useMemo(() => getLevelCost(selected, level), [selected, level]);
  const totalCost = useMemo(() => getCumulativeCost(selected, level), [selected, level]);
  const buildTime = useMemo(() => {
    return Math.round(
      ((currentCost.metal + currentCost.crystal) / (2500 * (1 + robotsLevel) * Math.pow(2, nanitesLevel) * ecoSpeed)) *
        3600,
    );
  }, [currentCost, ecoSpeed, nanitesLevel, robotsLevel]);

  return (
    <Layout>
      <PageContainer>
        <PageBackLink />

        <PageHero
          icon={Zap}
          title="Calculateur Bâtiments"
          description="Estime le coût d’un niveau, le total cumulé et le temps de construction avec usine de robots, nanites et vitesse économique."
          gradient="bg-gradient-to-br from-blue-500 to-cyan-600 shadow-blue-500/20"
          badge={<p className="text-sm text-gray-500">Outil basé sur les formules de progression actuellement implémentées dans Psykoverse.</p>}
        />

        <div className="space-y-8">
          <FormulaNotice
            title="Formules utilisées"
            lines={[
              <p key="1">Coût niveau <code className="rounded bg-black/30 px-1">n</code> : <code className="rounded bg-black/30 px-1">coût initial × facteur^(n-1)</code></p>,
              <p key="2">Temps : <code className="rounded bg-black/30 px-1">(métal + cristal) / (2500 × (1 + robots) × 2^nanites × vitesse)</code></p>,
            ]}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <SectionCard title="Paramètres" description="Les champs sont bornés pour éviter les valeurs absurdes." icon={Info}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Bâtiment</span>
                  <select
                    value={buildingType}
                    onChange={(e) => setBuildingType(e.target.value)}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                    data-testid="select-building"
                  >
                    {Object.entries(BUILDINGS).map(([key, building]) => (
                      <option key={key} value={key}>
                        {building.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Niveau cible</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="55"
                      value={level}
                      onChange={(e) => setLevel(clampNumber(Number(e.target.value), 1, 55))}
                      className="flex-1 accent-primary"
                    />
                    <input
                      type="number"
                      min="1"
                      max="55"
                      value={level}
                      onChange={(e) => setLevel(clampNumber(Number(e.target.value), 1, 55))}
                      className="w-20 rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-center text-white"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Usine de robots</span>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={robotsLevel}
                    onChange={(e) => setRobotsLevel(clampNumber(Number(e.target.value), 0, 40))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                  />
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Usine de nanites</span>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={nanitesLevel}
                    onChange={(e) => setNanitesLevel(clampNumber(Number(e.target.value), 0, 20))}
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

            <SectionCard title={`Synthèse ${selected.name}`} description="Lecture directe du niveau visé." icon={Sparkles}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultStat label={`Métal niveau ${level}`} value={formatCompactNumber(currentCost.metal)} />
                <ResultStat label={`Cristal niveau ${level}`} value={formatCompactNumber(currentCost.crystal)} valueClassName="text-cyan-300" />
                <ResultStat label={`Deutérium niveau ${level}`} value={formatCompactNumber(currentCost.deuterium)} valueClassName="text-teal-300" />
                <ResultStat
                  label="Temps de construction"
                  value={formatDuration(buildTime)}
                  valueClassName="text-blue-300"
                  hint={`Robots ${robotsLevel} • Nanites ${nanitesLevel} • Univers x${ecoSpeed}`}
                />
              </div>
            </SectionCard>
          </div>

          <SectionCard title={`Coût cumulé du niveau 1 au niveau ${level}`} description="Utile pour planifier un palier complet plutôt qu’un seul clic.">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <ResultStat label="Métal total" value={formatCompactNumber(totalCost.metal)} />
              <ResultStat label="Cristal total" value={formatCompactNumber(totalCost.crystal)} valueClassName="text-cyan-300" />
              <ResultStat label="Deutérium total" value={formatCompactNumber(totalCost.deuterium)} valueClassName="text-teal-300" />
            </div>
          </SectionCard>

          <SectionCard title="Lecture rapide" tone="accent">
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Le temps affiché est celui du niveau cible uniquement, pas de toute la progression.</li>
              <li>Le total cumulé additionne chaque niveau jusqu’au palier demandé.</li>
              <li>Si vous avez des bonus externes non modélisés ici, gardez une marge de vérification en jeu.</li>
            </ul>
          </SectionCard>

          <RelatedGuides currentGuide="batiments" />
        </div>
      </PageContainer>
    </Layout>
  );
}

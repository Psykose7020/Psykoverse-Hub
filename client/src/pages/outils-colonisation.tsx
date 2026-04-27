import { useMemo, useState } from "react";
import { Globe2, Grid3X3, Info, Thermometer } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import { COLONIZATION_POSITION_DATA } from "@/data/ogame-calculators";
import { clampNumber, formatInteger } from "@/lib/formatters";
import {
  FormulaNotice,
  PageBackLink,
  PageContainer,
  PageHero,
  ResultStat,
  SectionCard,
} from "@/components/content/page-shell";

export default function OutilsColonisation() {
  const [position, setPosition] = useState(8);
  const [playerClass, setPlayerClass] = useState("none");
  const [allianceClass, setAllianceClass] = useState("none");
  const [universeBonus, setUniverseBonus] = useState(0);
  const [explorerBonusPercent, setExplorerBonusPercent] = useState(0);

  const data = COLONIZATION_POSITION_DATA[position];
  const explorerBaseBonus = playerClass === "explorer" ? 0.10 : 0;
  const explorerClassBonus = playerClass === "explorer" ? (explorerBonusPercent / 100) * 0.10 : 0;
  const totalExplorerBonus = explorerBaseBonus + explorerClassBonus;
  const allianceBonus = allianceClass === "researcher" ? 0.05 : 0;
  const totalDiameterBonus = 1 + totalExplorerBonus + allianceBonus;

  const results = useMemo(() => {
    const baseDiamMin = Math.ceil(Math.sqrt(data.casesMin) * 1000);
    const baseDiamMax = Math.ceil(Math.sqrt(data.casesMax) * 1000);
    const diamMinWithBonus = Math.ceil(baseDiamMin * totalDiameterBonus);
    const diamMaxWithBonus = Math.ceil(baseDiamMax * totalDiameterBonus);
    const casesMin = Math.floor(Math.pow(diamMinWithBonus / 1000, 2)) + universeBonus;
    const casesMax = Math.floor(Math.pow(diamMaxWithBonus / 1000, 2)) + universeBonus;

    return {
      diamMinWithBonus,
      diamMaxWithBonus,
      casesMin,
      casesMax,
    };
  }, [data, totalDiameterBonus, universeBonus]);

  const bonusPercentDisplay = ((totalDiameterBonus - 1) * 100).toFixed(1);

  return (
    <Layout>
      <PageContainer>
        <PageBackLink />

        <PageHero
          icon={Globe2}
          title="Calculateur de Colonisation"
          description="Visualise diamètre, cases et température par position avec les bonus explicitement pris en compte par l’outil."
          gradient="bg-gradient-to-br from-green-500 to-teal-600 shadow-green-500/20"
        />

        <div className="space-y-8">
          <FormulaNotice
            title="Hypothèses actuellement modélisées"
            lines={[
              <p key="1">Diamètre : <code className="rounded bg-black/30 px-1">√(cases) × 1000 × bonus</code></p>,
              <p key="2">Cases : <code className="rounded bg-black/30 px-1">(diamètre / 1000)² + bonus univers</code></p>,
              <p key="3" className="text-xs text-gray-400">Les bonus Explorateur, Chercheur et bonus additionnel Explorateur sont laissés explicites. Si votre univers applique d’autres règles, vérifiez-les en jeu.</p>,
            ]}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <SectionCard title="Paramètres" description="Saisie simplifiée et bornée." icon={Info}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="block text-sm text-gray-400">Position dans le système</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={position}
                      onChange={(e) => setPosition(clampNumber(Number(e.target.value), 1, 15))}
                      className="flex-1 accent-primary"
                    />
                    <input
                      type="number"
                      min="1"
                      max="15"
                      value={position}
                      onChange={(e) => setPosition(clampNumber(Number(e.target.value), 1, 15))}
                      className="w-20 rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-center text-white"
                    />
                  </div>
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Classe du joueur</span>
                  <select
                    value={playerClass}
                    onChange={(e) => setPlayerClass(e.target.value)}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                    data-testid="select-player-class"
                  >
                    <option value="none">Collecteur / Général</option>
                    <option value="explorer">Explorateur</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Classe d’alliance</span>
                  <select
                    value={allianceClass}
                    onChange={(e) => setAllianceClass(e.target.value)}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                    data-testid="select-alliance-class"
                  >
                    <option value="none">Aucune / Guerrier / Marchand</option>
                    <option value="researcher">Chercheur (+5%)</option>
                  </select>
                </label>

                {playerClass === "explorer" ? (
                  <label className="space-y-2">
                    <span className="block text-sm text-gray-400">Bonus additionnel Explorateur (%)</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={explorerBonusPercent}
                      onChange={(e) => setExplorerBonusPercent(clampNumber(Number(e.target.value), 0, 100))}
                      className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                      data-testid="input-explorer-bonus"
                    />
                  </label>
                ) : null}

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Bonus de cases d’univers</span>
                  <select
                    value={universeBonus}
                    onChange={(e) => setUniverseBonus(clampNumber(Number(e.target.value), 0, 30))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                    data-testid="select-universe-bonus"
                  >
                    <option value={0}>+0 case</option>
                    <option value={10}>+10 cases</option>
                    <option value={25}>+25 cases</option>
                    <option value={30}>+30 cases</option>
                  </select>
                </label>
              </div>
            </SectionCard>

            <SectionCard title="Synthèse de position" description={`Position ${position} • bonus diamètre ${bonusPercentDisplay}%`}>
              <div className="grid grid-cols-1 gap-4">
                <ResultStat
                  label="Diamètre estimé"
                  value={`${formatInteger(results.diamMinWithBonus)} à ${formatInteger(results.diamMaxWithBonus)} km`}
                  valueClassName="text-blue-300"
                />
                <ResultStat
                  label="Cases estimées"
                  value={`${results.casesMin} à ${results.casesMax}`}
                  valueClassName="text-green-300"
                />
                <ResultStat
                  label="Température"
                  value={`${data.tempMin}°C à ${data.tempMax}°C`}
                  valueClassName="text-orange-300"
                />
              </div>
            </SectionCard>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <SectionCard title="Diamètre" icon={Globe2}>
              <ResultStat label="Minimum" value={`${formatInteger(results.diamMinWithBonus)} km`} valueClassName="text-blue-300" />
              <div className="mt-4">
                <ResultStat label="Maximum" value={`${formatInteger(results.diamMaxWithBonus)} km`} valueClassName="text-blue-300" />
              </div>
            </SectionCard>

            <SectionCard title="Cases" icon={Grid3X3}>
              <ResultStat label="Minimum" value={results.casesMin} valueClassName="text-green-300" />
              <div className="mt-4">
                <ResultStat label="Maximum" value={results.casesMax} valueClassName="text-green-300" />
              </div>
            </SectionCard>

            <SectionCard title="Température" icon={Thermometer}>
              <ResultStat label="Minimum" value={`${data.tempMin}°C`} valueClassName="text-orange-300" />
              <div className="mt-4">
                <ResultStat label="Maximum" value={`${data.tempMax}°C`} valueClassName="text-orange-300" />
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Tableau de référence sans bonus" description="Base utilisée pour les calculs ci-dessus.">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2E384D]">
                    <th className="px-3 py-2 text-left text-gray-400">Pos.</th>
                    <th className="px-3 py-2 text-left text-gray-400">Cases</th>
                    <th className="px-3 py-2 text-left text-gray-400">Température</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(COLONIZATION_POSITION_DATA).map(([pos, values]) => (
                    <tr key={pos} className="border-b border-[#2E384D]/50">
                      <td className="px-3 py-2 text-white">{pos}</td>
                      <td className="px-3 py-2 text-gray-300">
                        {values.casesMin} à {values.casesMax}
                      </td>
                      <td className="px-3 py-2 text-gray-300">
                        {values.tempMin}°C à {values.tempMax}°C
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <RelatedGuides currentGuide="colonisation" />
        </div>
      </PageContainer>
    </Layout>
  );
}

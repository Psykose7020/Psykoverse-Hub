import { useMemo, useState } from "react";
import { Fuel, Info, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import RelatedGuides from "@/components/RelatedGuides";
import { SHIPS } from "@/data/ogame-calculators";
import { clampNumber, formatCompactNumber } from "@/lib/formatters";
import {
  FormulaNotice,
  PageBackLink,
  PageContainer,
  PageHero,
  ResultStat,
  SectionCard,
} from "@/components/content/page-shell";

export default function OutilsConsommation() {
  const [shipType, setShipType] = useState("cruiser");
  const [shipCount, setShipCount] = useState(100);
  const [distance, setDistance] = useState(5000);
  const [speedPercent, setSpeedPercent] = useState(100);

  const ship = SHIPS[shipType];
  const consumption = useMemo(() => {
    return Math.round(shipCount * ship.consumption * (distance / 35000) * Math.pow(speedPercent / 100 + 1, 2));
  }, [distance, ship, shipCount, speedPercent]);
  const consumptionPerShip = Math.max(1, Math.round(consumption / shipCount));
  const returnTrip = consumption * 2;
  const speedFactor = Math.pow(speedPercent / 100 + 1, 2);
  const savingsVs100 = Math.round(((4 - speedFactor) / 4) * 100);

  return (
    <Layout>
      <PageContainer>
        <PageBackLink />

        <PageHero
          icon={Fuel}
          title="Calculateur Consommation"
          description="Estime le deutérium nécessaire pour un trajet, par vaisseau et en aller-retour, avec une lecture plus claire des compromis de vitesse."
          gradient="bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/20"
        />

        <div className="space-y-8">
          <FormulaNotice
            title="Formule utilisée"
            lines={[
              <p key="1"><code className="rounded bg-black/30 px-1">nb vaisseaux × consommation de base × distance / 35000 × (vitesse + 1)²</code></p>,
              <p key="2" className="text-xs text-gray-400">Cette formule reprend l’implémentation actuellement présente dans Psykoverse. Si votre cas dépend d’autres bonus non saisis, gardez une marge de contrôle.</p>,
            ]}
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
            <SectionCard title="Paramètres" description="Entrées resserrées et validées pour éviter les cas incohérents." icon={Info}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label className="space-y-2 md:col-span-2">
                  <span className="block text-sm text-gray-400">Vaisseau</span>
                  <select
                    value={shipType}
                    onChange={(e) => setShipType(e.target.value)}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                    data-testid="select-ship"
                  >
                    {Object.entries(SHIPS).map(([key, currentShip]) => (
                      <option key={key} value={key}>
                        {currentShip.name} • conso {currentShip.consumption}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Nombre de vaisseaux</span>
                  <input
                    type="number"
                    min="1"
                    max="1000000"
                    value={shipCount}
                    onChange={(e) => setShipCount(clampNumber(Number(e.target.value), 1, 1_000_000))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                    data-testid="input-ship-count"
                  />
                </label>

                <label className="space-y-2">
                  <span className="block text-sm text-gray-400">Distance</span>
                  <input
                    type="number"
                    min="1"
                    max="200000"
                    value={distance}
                    onChange={(e) => setDistance(clampNumber(Number(e.target.value), 1, 200_000))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                    data-testid="input-distance"
                  />
                </label>

                <label className="space-y-2 md:col-span-2">
                  <span className="block text-sm text-gray-400">Vitesse de flotte</span>
                  <select
                    value={speedPercent}
                    onChange={(e) => setSpeedPercent(clampNumber(Number(e.target.value), 10, 100))}
                    className="w-full rounded-lg border border-[#2E384D] bg-[#0B0E14] px-3 py-2 text-white"
                  >
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((speed) => (
                      <option key={speed} value={speed}>
                        {speed}%
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </SectionCard>

            <SectionCard title={`Synthèse ${ship.name}`} description="Les indicateurs essentiels sans devoir interpréter la table." icon={Sparkles}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResultStat label="Consommation aller" value={formatCompactNumber(consumption)} valueClassName="text-cyan-300" />
                <ResultStat label="Consommation aller-retour" value={formatCompactNumber(returnTrip)} />
                <ResultStat label="Par vaisseau" value={formatCompactNumber(consumptionPerShip)} />
                <ResultStat label="Économie vs 100%" value={`${Math.max(0, savingsVs100)} %`} hint={`Multiplicateur actuel ×${speedFactor.toFixed(2)}`} />
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Lecture vitesse / consommation" description="Même formule, mais présentée de façon plus exploitable pour la décision." icon={Fuel}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2E384D]">
                    <th className="px-3 py-2 text-left text-gray-400">Vitesse</th>
                    <th className="px-3 py-2 text-left text-gray-400">Multiplicateur</th>
                    <th className="px-3 py-2 text-left text-gray-400">Consommation estimée</th>
                    <th className="px-3 py-2 text-left text-gray-400">Économie vs 100%</th>
                  </tr>
                </thead>
                <tbody>
                  {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10].map((speed) => {
                    const factor = Math.pow(speed / 100 + 1, 2);
                    const currentConsumption = Math.round(shipCount * ship.consumption * (distance / 35000) * factor);
                    const savings = Math.round(((4 - factor) / 4) * 100);

                    return (
                      <tr key={speed} className="border-b border-[#2E384D]/50">
                        <td className="px-3 py-2 text-white">{speed}%</td>
                        <td className="px-3 py-2 text-cyan-300">×{factor.toFixed(2)}</td>
                        <td className="px-3 py-2 text-gray-300">{formatCompactNumber(currentConsumption)}</td>
                        <td className="px-3 py-2 text-green-400">{Math.max(0, savings)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </SectionCard>

          <RelatedGuides currentGuide="consommation" />
        </div>
      </PageContainer>
    </Layout>
  );
}

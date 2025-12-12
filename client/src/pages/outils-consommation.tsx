import { useState } from "react";
import { motion } from "framer-motion";
import { Fuel, Info } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function formatNumber(num: number): string {
  if (isNaN(num) || !isFinite(num)) return "0";
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + " G";
  if (num >= 1000000) return (num / 1000000).toFixed(2) + " M";
  if (num >= 1000) return (num / 1000).toFixed(2) + " k";
  return Math.round(num).toLocaleString("fr-FR");
}

const ships: Record<string, { name: string; consumption: number; baseSpeed: number }> = {
  pt: { name: "Petit Transporteur", consumption: 10, baseSpeed: 5000 },
  gt: { name: "Grand Transporteur", consumption: 50, baseSpeed: 7500 },
  lf: { name: "Chasseur Léger", consumption: 20, baseSpeed: 12500 },
  hf: { name: "Chasseur Lourd", consumption: 75, baseSpeed: 10000 },
  cruiser: { name: "Croiseur", consumption: 300, baseSpeed: 15000 },
  bs: { name: "Vaisseau de Bataille", consumption: 500, baseSpeed: 10000 },
  bc: { name: "Traqueur", consumption: 250, baseSpeed: 10000 },
  bb: { name: "Bombardier", consumption: 700, baseSpeed: 4000 },
  destroyer: { name: "Destructeur", consumption: 1000, baseSpeed: 5000 },
  rip: { name: "Étoile de la Mort", consumption: 1, baseSpeed: 100 },
  reaper: { name: "Faucheur", consumption: 1100, baseSpeed: 7000 },
  pathfinder: { name: "Éclaireur", consumption: 300, baseSpeed: 12000 },
  recycler: { name: "Recycleur", consumption: 300, baseSpeed: 2000 },
  probe: { name: "Sonde", consumption: 1, baseSpeed: 100000000 },
  colony: { name: "Vaisseau de Colonisation", consumption: 1000, baseSpeed: 2500 },
};

export default function OutilsConsommation() {
  const [shipType, setShipType] = useState("cruiser");
  const [shipCount, setShipCount] = useState(100);
  const [distance, setDistance] = useState(5000);
  const [speedPercent, setSpeedPercent] = useState(100);

  const ship = ships[shipType];
  
  const consumption = Math.round(
    shipCount * ship.consumption * distance / 35000 * Math.pow(speedPercent / 100 + 1, 2)
  );

  const consumptionPerShip = Math.round(consumption / shipCount);

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-5xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-500/20">
                <Fuel className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur Consommation
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Calculez le deutérium nécessaire pour vos missions
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-bold text-white">Formule de consommation</span>
                </div>
                <p className="text-sm text-gray-400">
                  <code className="bg-black/30 px-1 rounded">nb_vaisseaux × conso_base × distance / 35000 × (vitesse% + 1)²</code>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4">Paramètres</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Vaisseau</label>
                      <select 
                        value={shipType} 
                        onChange={(e) => setShipType(e.target.value)}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                        data-testid="select-ship"
                      >
                        {Object.entries(ships).map(([key, s]) => (
                          <option key={key} value={key}>{s.name} (conso: {s.consumption})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Nombre de vaisseaux</label>
                      <input 
                        type="number" 
                        value={shipCount} 
                        onChange={(e) => setShipCount(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                        min="1"
                        data-testid="input-ship-count"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Distance (unités)</label>
                      <input 
                        type="number" 
                        value={distance} 
                        onChange={(e) => setDistance(Math.max(1, Number(e.target.value)))}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                        min="1"
                        data-testid="input-distance"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Vitesse de la flotte</label>
                      <select 
                        value={speedPercent} 
                        onChange={(e) => setSpeedPercent(Number(e.target.value))}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                      >
                        {[10,20,30,40,50,60,70,80,90,100].map(s => <option key={s} value={s}>{s}%</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4">Résultat</h3>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-lg p-6 text-center">
                      <p className="text-gray-400 text-sm mb-2">Consommation totale (aller)</p>
                      <p className="text-4xl font-bold text-cyan-400" data-testid="text-consumption">
                        {formatNumber(consumption)}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">deutérium</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#151924] rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-xs mb-1">Par vaisseau</p>
                        <p className="font-mono text-lg text-white">{formatNumber(consumptionPerShip)}</p>
                      </div>
                      <div className="bg-[#151924] rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-xs mb-1">Aller-retour</p>
                        <p className="font-mono text-lg text-white">{formatNumber(consumption * 2)}</p>
                      </div>
                    </div>

                    <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                      <p className="text-amber-400 text-xs">
                        Conseil : Réduire la vitesse de 100% à 50% divise la consommation par ~2.25
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">Impact de la vitesse sur la consommation</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-2 px-3 text-gray-400">Vitesse</th>
                        <th className="text-left py-2 px-3 text-gray-400">Multiplicateur</th>
                        <th className="text-left py-2 px-3 text-gray-400">Économie vs 100%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10].map(speed => {
                        const mult = Math.pow(speed / 100 + 1, 2);
                        const savings = ((4 - mult) / 4 * 100).toFixed(0);
                        return (
                          <tr key={speed} className="border-b border-[#2E384D]/50">
                            <td className="py-2 px-3 text-white">{speed}%</td>
                            <td className="py-2 px-3 text-cyan-400">×{mult.toFixed(2)}</td>
                            <td className="py-2 px-3 text-green-400">{savings}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <RelatedGuides currentGuide="consommation" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

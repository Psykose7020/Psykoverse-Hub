import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Info, Rocket } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const ships: Record<string, { name: string; baseSpeed: number; engine: string }> = {
  pt: { name: "Petit Transporteur", baseSpeed: 5000, engine: "Combustion" },
  gt: { name: "Grand Transporteur", baseSpeed: 7500, engine: "Combustion" },
  lf: { name: "Chasseur Léger", baseSpeed: 12500, engine: "Combustion" },
  hf: { name: "Chasseur Lourd", baseSpeed: 10000, engine: "Impulsion" },
  cruiser: { name: "Croiseur", baseSpeed: 15000, engine: "Impulsion" },
  bs: { name: "Vaisseau de Bataille", baseSpeed: 10000, engine: "Hyperespace" },
  bc: { name: "Traqueur", baseSpeed: 10000, engine: "Hyperespace" },
  bb: { name: "Bombardier", baseSpeed: 4000, engine: "Impulsion" },
  destroyer: { name: "Destructeur", baseSpeed: 5000, engine: "Hyperespace" },
  rip: { name: "Étoile de la Mort", baseSpeed: 100, engine: "Hyperespace" },
  reaper: { name: "Faucheur", baseSpeed: 7000, engine: "Hyperespace" },
  pathfinder: { name: "Éclaireur", baseSpeed: 12000, engine: "Hyperespace" },
  recycler: { name: "Recycleur", baseSpeed: 2000, engine: "Combustion" },
  probe: { name: "Sonde", baseSpeed: 100000000, engine: "Combustion" },
  colony: { name: "Vaisseau de Colonisation", baseSpeed: 2500, engine: "Impulsion" },
};

function formatTime(seconds: number): string {
  if (seconds < 0 || !isFinite(seconds)) return "0s";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (d > 0) return `${d}j ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function OutilsTempsVol() {
  const [shipType, setShipType] = useState("cruiser");
  const [combustionLevel, setCombustionLevel] = useState(10);
  const [impulsionLevel, setImpulsionLevel] = useState(8);
  const [hyperLevel, setHyperLevel] = useState(6);
  const [fleetSpeed, setFleetSpeed] = useState(1);
  const [distance, setDistance] = useState(5000);

  const ship = ships[shipType];
  
  const getEngineBonus = () => {
    if (ship.engine === "Combustion") return 1 + combustionLevel * 0.1;
    if (ship.engine === "Impulsion") return 1 + impulsionLevel * 0.2;
    return 1 + hyperLevel * 0.3;
  };
  
  const actualSpeed = Math.round(ship.baseSpeed * getEngineBonus());

  const calculateTimeForSpeed = (speedPercent: number) => {
    return Math.round(
      (10 + 35000 / (speedPercent / 100) * Math.sqrt(distance * 10000000 / actualSpeed)) / fleetSpeed
    );
  };

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
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/20">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur Temps de Vol
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comparez les temps de vol selon la vitesse choisie
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-bold text-white">Formule du temps de vol</span>
                </div>
                <p className="text-sm text-gray-400">
                  <code className="bg-black/30 px-1 rounded">(10 + 35000 / vitesse% × √(distance × 10M / vitesse_vaisseau)) / vitesse_univers</code>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4">Paramètres</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Vaisseau le plus lent</label>
                      <select 
                        value={shipType} 
                        onChange={(e) => setShipType(e.target.value)}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                        data-testid="select-ship"
                      >
                        {Object.entries(ships).map(([key, s]) => (
                          <option key={key} value={key}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Distance</label>
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
                      <label className="text-gray-400 text-sm mb-2 block">Vitesse univers</label>
                      <select 
                        value={fleetSpeed} 
                        onChange={(e) => setFleetSpeed(Number(e.target.value))}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(s => <option key={s} value={s}>x{s}</option>)}
                      </select>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block">Combustion</label>
                        <input 
                          type="number" 
                          value={combustionLevel} 
                          onChange={(e) => setCombustionLevel(Number(e.target.value))}
                          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-center"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block">Impulsion</label>
                        <input 
                          type="number" 
                          value={impulsionLevel} 
                          onChange={(e) => setImpulsionLevel(Number(e.target.value))}
                          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-center"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block">Hyperespace</label>
                        <input 
                          type="number" 
                          value={hyperLevel} 
                          onChange={(e) => setHyperLevel(Number(e.target.value))}
                          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-center"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4">Infos vaisseau</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-gray-400">Vitesse de base</span>
                      <span className="font-mono text-white">{ship.baseSpeed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-gray-400">Moteur</span>
                      <span className="text-primary">{ship.engine}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-gray-400">Vitesse effective</span>
                      <span className="font-mono text-white">{actualSpeed.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-gray-400">Bonus moteur</span>
                      <span className="font-mono text-green-400">+{((getEngineBonus() - 1) * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-6 h-6 text-indigo-400" />
                  <h3 className="font-bold text-white">Temps de vol par vitesse</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#2E384D]">
                        <th className="text-left py-2 px-3 text-gray-400">Vitesse</th>
                        <th className="text-left py-2 px-3 text-gray-400">Temps aller</th>
                        <th className="text-left py-2 px-3 text-gray-400">Temps aller-retour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[100, 90, 80, 70, 60, 50, 40, 30, 20, 10].map(speed => {
                        const time = calculateTimeForSpeed(speed);
                        return (
                          <tr key={speed} className="border-b border-[#2E384D]/50">
                            <td className="py-2 px-3 text-white font-medium">{speed}%</td>
                            <td className="py-2 px-3 text-indigo-400 font-mono">{formatTime(time)}</td>
                            <td className="py-2 px-3 text-gray-400 font-mono">{formatTime(time * 2)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <RelatedGuides currentGuide="temps-vol" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

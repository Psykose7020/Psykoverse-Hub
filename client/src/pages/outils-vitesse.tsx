import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Info, Clock } from "lucide-react";
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
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function OutilsVitesse() {
  const [shipType, setShipType] = useState("cruiser");
  const [combustionLevel, setCombustionLevel] = useState(10);
  const [impulsionLevel, setImpulsionLevel] = useState(8);
  const [hyperLevel, setHyperLevel] = useState(6);
  const [fleetSpeed, setFleetSpeed] = useState(1);
  const [speedPercent, setSpeedPercent] = useState(100);
  
  const [startGalaxy, setStartGalaxy] = useState(1);
  const [startSystem, setStartSystem] = useState(100);
  const [startPosition, setStartPosition] = useState(8);
  const [endGalaxy, setEndGalaxy] = useState(1);
  const [endSystem, setEndSystem] = useState(150);
  const [endPosition, setEndPosition] = useState(8);

  const ship = ships[shipType];
  
  const getEngineBonus = () => {
    if (ship.engine === "Combustion") return 1 + combustionLevel * 0.1;
    if (ship.engine === "Impulsion") return 1 + impulsionLevel * 0.2;
    return 1 + hyperLevel * 0.3;
  };
  
  const actualSpeed = Math.round(ship.baseSpeed * getEngineBonus());

  const calculateDistance = () => {
    if (startGalaxy !== endGalaxy) {
      return Math.abs(startGalaxy - endGalaxy) * 20000;
    }
    if (startSystem !== endSystem) {
      return Math.abs(startSystem - endSystem) * 5 * 19 + 2700;
    }
    if (startPosition !== endPosition) {
      return Math.abs(startPosition - endPosition) * 5 + 1000;
    }
    return 5;
  };

  const distance = calculateDistance();
  
  const flightTime = Math.round(
    (10 + 35000 / (speedPercent / 100) * Math.sqrt(distance * 10000000 / actualSpeed)) / fleetSpeed
  );

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
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur de Vitesse
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Calculez le temps de vol entre deux coordonnées
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-bold text-white">Formule du temps de vol</span>
                </div>
                <p className="text-sm text-gray-400">
                  <code className="bg-black/30 px-1 rounded">(10 + 35000 / vitesse% × √(distance × 10M / vitesse)) / vitesse_univers</code>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4">Vaisseau & Technologies</h3>
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
                          <option key={key} value={key}>{s.name} ({s.baseSpeed})</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Vitesse flotte</label>
                        <select 
                          value={speedPercent} 
                          onChange={(e) => setSpeedPercent(Number(e.target.value))}
                          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                        >
                          {[10,20,30,40,50,60,70,80,90,100].map(s => <option key={s} value={s}>{s}%</option>)}
                        </select>
                      </div>
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
                    <div className="bg-[#0B0E14] rounded-lg p-3">
                      <p className="text-xs text-gray-500">Moteur utilisé : <span className="text-primary">{ship.engine}</span></p>
                      <p className="text-xs text-gray-500">Vitesse effective : <span className="font-mono text-white">{actualSpeed.toLocaleString()}</span></p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4">Coordonnées</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Départ</label>
                      <div className="grid grid-cols-3 gap-2">
                        <input 
                          type="number" 
                          value={startGalaxy} 
                          onChange={(e) => setStartGalaxy(Number(e.target.value))}
                          className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-2 text-white text-center"
                          placeholder="G"
                          min="1"
                          max="9"
                        />
                        <input 
                          type="number" 
                          value={startSystem} 
                          onChange={(e) => setStartSystem(Number(e.target.value))}
                          className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-2 text-white text-center"
                          placeholder="S"
                          min="1"
                          max="499"
                        />
                        <input 
                          type="number" 
                          value={startPosition} 
                          onChange={(e) => setStartPosition(Number(e.target.value))}
                          className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-2 text-white text-center"
                          placeholder="P"
                          min="1"
                          max="15"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Arrivée</label>
                      <div className="grid grid-cols-3 gap-2">
                        <input 
                          type="number" 
                          value={endGalaxy} 
                          onChange={(e) => setEndGalaxy(Number(e.target.value))}
                          className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-2 text-white text-center"
                          placeholder="G"
                          min="1"
                          max="9"
                        />
                        <input 
                          type="number" 
                          value={endSystem} 
                          onChange={(e) => setEndSystem(Number(e.target.value))}
                          className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-2 text-white text-center"
                          placeholder="S"
                          min="1"
                          max="499"
                        />
                        <input 
                          type="number" 
                          value={endPosition} 
                          onChange={(e) => setEndPosition(Number(e.target.value))}
                          className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-2 text-white text-center"
                          placeholder="P"
                          min="1"
                          max="15"
                        />
                      </div>
                    </div>
                    <div className="bg-[#0B0E14] rounded-lg p-3">
                      <p className="text-xs text-gray-500">Distance calculée</p>
                      <p className="font-mono text-white text-lg">{distance.toLocaleString()} unités</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-xl p-8 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Clock className="w-8 h-8 text-orange-400" />
                  <h3 className="font-bold text-white text-xl">Temps de vol</h3>
                </div>
                <p className="text-5xl font-bold text-orange-400 mb-2" data-testid="text-flight-time">
                  {formatTime(flightTime)}
                </p>
                <p className="text-gray-400 text-sm">
                  Aller simple • Aller-retour : {formatTime(flightTime * 2)}
                </p>
              </div>

              <RelatedGuides currentGuide="vitesse" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

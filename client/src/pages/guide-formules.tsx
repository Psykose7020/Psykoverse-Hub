import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Factory, Rocket, Shield, FlaskConical, Zap, Clock, Fuel, ChevronRight, Info, RefreshCw } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

type TabId = "production" | "batiments" | "recherches" | "vitesse" | "consommation" | "temps";

const tabs: { id: TabId; label: string; icon: typeof Calculator }[] = [
  { id: "production", label: "Production", icon: Factory },
  { id: "batiments", label: "Bâtiments", icon: Zap },
  { id: "recherches", label: "Recherches", icon: FlaskConical },
  { id: "vitesse", label: "Vitesse", icon: Rocket },
  { id: "consommation", label: "Consommation", icon: Fuel },
  { id: "temps", label: "Temps", icon: Clock }
];

function formatNumber(num: number): string {
  if (isNaN(num) || !isFinite(num)) return "0";
  if (num >= 1000000000) return (num / 1000000000).toFixed(2) + " G";
  if (num >= 1000000) return (num / 1000000).toFixed(2) + " M";
  if (num >= 1000) return (num / 1000).toFixed(2) + " k";
  return Math.round(num).toLocaleString("fr-FR");
}

function ProductionCalculator() {
  const [metalLevel, setMetalLevel] = useState(20);
  const [crystalLevel, setCrystalLevel] = useState(18);
  const [deutLevel, setDeutLevel] = useState(15);
  const [solarLevel, setSolarLevel] = useState(20);
  const [fusionLevel, setFusionLevel] = useState(0);
  const [ecoSpeed, setEcoSpeed] = useState(1);
  const [tempMax, setTempMax] = useState(40);

  const metalProd = Math.round(30 * metalLevel * Math.pow(1.1, metalLevel) * ecoSpeed);
  const crystalProd = Math.round(20 * crystalLevel * Math.pow(1.1, crystalLevel) * ecoSpeed);
  const tempFactor = 1.36 - 0.004 * tempMax;
  const deutProd = Math.round(10 * deutLevel * Math.pow(1.1, deutLevel) * tempFactor * ecoSpeed);
  
  const metalConso = Math.round(10 * metalLevel * Math.pow(1.1, metalLevel));
  const crystalConso = Math.round(10 * crystalLevel * Math.pow(1.1, crystalLevel));
  const deutConso = Math.round(10 * deutLevel * Math.pow(1.1, deutLevel));
  
  const solarProd = Math.round(20 * solarLevel * Math.pow(1.1, solarLevel));
  const fusionProd = fusionLevel > 0 ? Math.round(30 * fusionLevel * Math.pow(1.05 + 0.01 * 12, fusionLevel)) : 0;
  const fusionConso = fusionLevel > 0 ? Math.round(10 * fusionLevel * Math.pow(1.1, fusionLevel)) : 0;
  
  const totalEnergy = solarProd + fusionProd;
  const totalConso = metalConso + crystalConso + deutConso;
  const energyBalance = totalEnergy - totalConso;

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-bold text-white">Formules de production</span>
        </div>
        <div className="text-sm text-gray-400 space-y-1">
          <p>Métal : <code className="bg-black/30 px-1 rounded">30 × niveau × 1.1^niveau</code></p>
          <p>Cristal : <code className="bg-black/30 px-1 rounded">20 × niveau × 1.1^niveau</code></p>
          <p>Deut : <code className="bg-black/30 px-1 rounded">10 × niveau × 1.1^niveau × (1.36 - 0.004 × tempMax)</code></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Paramètres</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Vitesse économique</label>
              <select 
                value={ecoSpeed} 
                onChange={(e) => setEcoSpeed(Number(e.target.value))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-1 text-white"
              >
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>x{s}</option>)}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Température max</label>
              <input 
                type="number" 
                value={tempMax} 
                onChange={(e) => setTempMax(Number(e.target.value))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-1 text-white w-20 text-right"
              />
            </div>
            <hr className="border-[#2E384D]" />
            {[
              { label: "Mine de Métal", value: metalLevel, setter: setMetalLevel, color: "text-gray-400" },
              { label: "Mine de Cristal", value: crystalLevel, setter: setCrystalLevel, color: "text-cyan-400" },
              { label: "Synthétiseur Deut", value: deutLevel, setter: setDeutLevel, color: "text-teal-400" },
              { label: "Centrale Solaire", value: solarLevel, setter: setSolarLevel, color: "text-yellow-400" },
              { label: "Centrale Fusion", value: fusionLevel, setter: setFusionLevel, color: "text-orange-400" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <label className={item.color}>{item.label}</label>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => item.setter(Math.max(0, item.value - 1))}
                    className="w-8 h-8 bg-[#0B0E14] border border-[#2E384D] rounded text-white hover:bg-[#2E384D]"
                  >-</button>
                  <input 
                    type="number" 
                    value={item.value} 
                    onChange={(e) => item.setter(Math.max(0, Number(e.target.value)))}
                    className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-16 text-center"
                  />
                  <button 
                    onClick={() => item.setter(item.value + 1)}
                    className="w-8 h-8 bg-[#0B0E14] border border-[#2E384D] rounded text-white hover:bg-[#2E384D]"
                  >+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Production / heure</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-gray-400">Métal</span>
              <span className="font-mono text-xl text-gray-300">{formatNumber(metalProd)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-cyan-400">Cristal</span>
              <span className="font-mono text-xl text-cyan-300">{formatNumber(crystalProd)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-teal-400">Deutérium</span>
              <span className="font-mono text-xl text-teal-300">{formatNumber(deutProd - fusionConso)}</span>
            </div>
            <hr className="border-[#2E384D]" />
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-yellow-400">Énergie produite</span>
              <span className="font-mono text-yellow-300">{formatNumber(totalEnergy)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-orange-400">Énergie consommée</span>
              <span className="font-mono text-orange-300">{formatNumber(totalConso)}</span>
            </div>
            <div className={`flex justify-between items-center p-3 rounded-lg ${energyBalance >= 0 ? "bg-green-900/20 border border-green-700/30" : "bg-red-900/20 border border-red-700/30"}`}>
              <span className={energyBalance >= 0 ? "text-green-400" : "text-red-400"}>Balance</span>
              <span className={`font-mono text-xl ${energyBalance >= 0 ? "text-green-300" : "text-red-300"}`}>
                {energyBalance >= 0 ? "+" : ""}{formatNumber(energyBalance)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildingCostCalculator() {
  const [buildingType, setBuildingType] = useState("metal");
  const [level, setLevel] = useState(25);

  const buildings: Record<string, { name: string; baseCost: { m: number; c: number; d: number }; factor: number }> = {
    metal: { name: "Mine de Métal", baseCost: { m: 60, c: 15, d: 0 }, factor: 1.5 },
    crystal: { name: "Mine de Cristal", baseCost: { m: 48, c: 24, d: 0 }, factor: 1.6 },
    deut: { name: "Synthétiseur Deut", baseCost: { m: 225, c: 75, d: 0 }, factor: 1.5 },
    solar: { name: "Centrale Solaire", baseCost: { m: 75, c: 30, d: 0 }, factor: 1.5 },
    fusion: { name: "Centrale Fusion", baseCost: { m: 900, c: 360, d: 180 }, factor: 1.8 },
    robots: { name: "Usine de Robots", baseCost: { m: 400, c: 120, d: 200 }, factor: 2 },
    nanite: { name: "Usine de Nanites", baseCost: { m: 1000000, c: 500000, d: 100000 }, factor: 2 },
    shipyard: { name: "Chantier Spatial", baseCost: { m: 400, c: 200, d: 100 }, factor: 2 },
    lab: { name: "Laboratoire", baseCost: { m: 200, c: 400, d: 200 }, factor: 2 },
    terraformer: { name: "Terraformeur", baseCost: { m: 0, c: 50000, d: 100000 }, factor: 2 },
    silo: { name: "Silo de Missiles", baseCost: { m: 20000, c: 20000, d: 1000 }, factor: 2 },
    lunarBase: { name: "Base Lunaire", baseCost: { m: 20000, c: 40000, d: 20000 }, factor: 2 },
    phalanx: { name: "Phalange", baseCost: { m: 20000, c: 40000, d: 20000 }, factor: 2 },
    jumpGate: { name: "Porte de Saut", baseCost: { m: 2000000, c: 4000000, d: 2000000 }, factor: 2 },
  };

  const selected = buildings[buildingType];
  const metalCost = Math.round(selected.baseCost.m * Math.pow(selected.factor, level - 1));
  const crystalCost = Math.round(selected.baseCost.c * Math.pow(selected.factor, level - 1));
  const deutCost = Math.round(selected.baseCost.d * Math.pow(selected.factor, level - 1));

  let totalMetal = 0, totalCrystal = 0, totalDeut = 0;
  for (let i = 1; i <= level; i++) {
    totalMetal += Math.round(selected.baseCost.m * Math.pow(selected.factor, i - 1));
    totalCrystal += Math.round(selected.baseCost.c * Math.pow(selected.factor, i - 1));
    totalDeut += Math.round(selected.baseCost.d * Math.pow(selected.factor, i - 1));
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-bold text-white">Formule des coûts</span>
        </div>
        <p className="text-sm text-gray-400">
          Coût niveau n = <code className="bg-black/30 px-1 rounded">coût niveau 1 × facteur^(n-1)</code>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Facteur : Mines M/D/Solaire = 1.5 | Cristal = 1.6 | Fusion = 1.8 | Autres = 2
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Sélection</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Bâtiment</label>
              <select 
                value={buildingType} 
                onChange={(e) => setBuildingType(e.target.value)}
                className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
              >
                {Object.entries(buildings).map(([key, b]) => (
                  <option key={key} value={key}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Niveau cible</label>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={level} 
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="flex-1"
                />
                <input 
                  type="number" 
                  value={level} 
                  onChange={(e) => setLevel(Math.max(1, Number(e.target.value)))}
                  className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-16 text-center"
                />
              </div>
            </div>
            <div className="bg-[#0B0E14] rounded-lg p-3">
              <p className="text-xs text-gray-500">Facteur de croissance</p>
              <p className="font-mono text-primary text-lg">×{selected.factor}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Coût niveau {level}</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-gray-400">Métal</span>
              <span className="font-mono text-gray-300">{formatNumber(metalCost)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-cyan-400">Cristal</span>
              <span className="font-mono text-cyan-300">{formatNumber(crystalCost)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-teal-400">Deutérium</span>
              <span className="font-mono text-teal-300">{formatNumber(deutCost)}</span>
            </div>
          </div>

          <h4 className="font-bold text-white mb-3 text-sm">Coût total (1 → {level})</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Métal</span>
              <span className="font-mono text-gray-400">{formatNumber(totalMetal)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Cristal</span>
              <span className="font-mono text-gray-400">{formatNumber(totalCrystal)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Deutérium</span>
              <span className="font-mono text-gray-400">{formatNumber(totalDeut)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchCostCalculator() {
  const [researchType, setResearchType] = useState("weapons");
  const [level, setLevel] = useState(15);

  const researches: Record<string, { name: string; baseCost: { m: number; c: number; d: number }; factor: number }> = {
    spy: { name: "Espionnage", baseCost: { m: 200, c: 1000, d: 200 }, factor: 2 },
    computer: { name: "Ordinateur", baseCost: { m: 0, c: 400, d: 600 }, factor: 2 },
    energy: { name: "Énergie", baseCost: { m: 0, c: 800, d: 400 }, factor: 2 },
    rri: { name: "RRI", baseCost: { m: 240000, c: 400000, d: 160000 }, factor: 2 },
    weapons: { name: "Armes", baseCost: { m: 800, c: 200, d: 0 }, factor: 2 },
    shield: { name: "Bouclier", baseCost: { m: 200, c: 600, d: 0 }, factor: 2 },
    armor: { name: "Protection Vaisseaux", baseCost: { m: 1000, c: 0, d: 0 }, factor: 2 },
    hyperspace: { name: "Hyperespace", baseCost: { m: 0, c: 4000, d: 2000 }, factor: 2 },
    combustion: { name: "Réacteur Combustion", baseCost: { m: 400, c: 0, d: 600 }, factor: 2 },
    impulse: { name: "Réacteur Impulsion", baseCost: { m: 2000, c: 4000, d: 600 }, factor: 2 },
    hyperspaceDrive: { name: "Propulsion Hyperespace", baseCost: { m: 10000, c: 20000, d: 6000 }, factor: 2 },
    laser: { name: "Laser", baseCost: { m: 200, c: 100, d: 0 }, factor: 2 },
    ion: { name: "Ions", baseCost: { m: 1000, c: 300, d: 100 }, factor: 2 },
    plasma: { name: "Plasma", baseCost: { m: 2000, c: 4000, d: 1000 }, factor: 2 },
    astro: { name: "Astrophysique", baseCost: { m: 4000, c: 8000, d: 4000 }, factor: 1.75 },
    graviton: { name: "Graviton", baseCost: { m: 0, c: 0, d: 0 }, factor: 3 },
  };

  const selected = researches[researchType];
  const metalCost = Math.round(selected.baseCost.m * Math.pow(selected.factor, level - 1));
  const crystalCost = Math.round(selected.baseCost.c * Math.pow(selected.factor, level - 1));
  const deutCost = Math.round(selected.baseCost.d * Math.pow(selected.factor, level - 1));

  let totalMetal = 0, totalCrystal = 0, totalDeut = 0;
  for (let i = 1; i <= level; i++) {
    totalMetal += Math.round(selected.baseCost.m * Math.pow(selected.factor, i - 1));
    totalCrystal += Math.round(selected.baseCost.c * Math.pow(selected.factor, i - 1));
    totalDeut += Math.round(selected.baseCost.d * Math.pow(selected.factor, i - 1));
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-bold text-white">Formule des recherches</span>
        </div>
        <p className="text-sm text-gray-400">
          Coût niveau n = <code className="bg-black/30 px-1 rounded">coût niveau 1 × facteur^(n-1)</code>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Facteur standard = 2 | Astrophysique = 1.75 | Graviton = 3
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Sélection</h3>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Recherche</label>
              <select 
                value={researchType} 
                onChange={(e) => setResearchType(e.target.value)}
                className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
              >
                {Object.entries(researches).map(([key, r]) => (
                  <option key={key} value={key}>{r.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Niveau cible</label>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="1" 
                  max="30" 
                  value={level} 
                  onChange={(e) => setLevel(Number(e.target.value))}
                  className="flex-1"
                />
                <input 
                  type="number" 
                  value={level} 
                  onChange={(e) => setLevel(Math.max(1, Number(e.target.value)))}
                  className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-16 text-center"
                />
              </div>
            </div>
            <div className="bg-[#0B0E14] rounded-lg p-3">
              <p className="text-xs text-gray-500">Facteur de croissance</p>
              <p className="font-mono text-primary text-lg">×{selected.factor}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Coût niveau {level}</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-gray-400">Métal</span>
              <span className="font-mono text-gray-300">{formatNumber(metalCost)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-cyan-400">Cristal</span>
              <span className="font-mono text-cyan-300">{formatNumber(crystalCost)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
              <span className="text-teal-400">Deutérium</span>
              <span className="font-mono text-teal-300">{formatNumber(deutCost)}</span>
            </div>
          </div>

          <h4 className="font-bold text-white mb-3 text-sm">Coût total (1 → {level})</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Métal</span>
              <span className="font-mono text-gray-400">{formatNumber(totalMetal)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Cristal</span>
              <span className="font-mono text-gray-400">{formatNumber(totalCrystal)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">Deutérium</span>
              <span className="font-mono text-gray-400">{formatNumber(totalDeut)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeedCalculator() {
  const [shipType, setShipType] = useState("gt");
  const [combustion, setCombustion] = useState(10);
  const [impulse, setImpulse] = useState(8);
  const [hyperspace, setHyperspace] = useState(6);
  const [fleetSpeed, setFleetSpeed] = useState(1);

  const ships: Record<string, { name: string; baseSpeed: number; engine: "combustion" | "impulse" | "hyperspace"; upgradeEngine?: { tech: "impulse" | "hyperspace"; level: number } }> = {
    pt: { name: "Petit Transporteur", baseSpeed: 5000, engine: "combustion", upgradeEngine: { tech: "impulse", level: 5 } },
    gt: { name: "Grand Transporteur", baseSpeed: 7500, engine: "combustion", upgradeEngine: { tech: "hyperspace", level: 15 } },
    cl: { name: "Chasseur Léger", baseSpeed: 12500, engine: "combustion" },
    ch: { name: "Chasseur Lourd", baseSpeed: 10000, engine: "impulse" },
    croiseur: { name: "Croiseur", baseSpeed: 15000, engine: "impulse" },
    vb: { name: "Vaisseau de Bataille", baseSpeed: 10000, engine: "hyperspace" },
    colo: { name: "Vaisseau Colonisation", baseSpeed: 2500, engine: "impulse" },
    recycleur: { name: "Recycleur", baseSpeed: 2000, engine: "combustion", upgradeEngine: { tech: "impulse", level: 17 } },
    sonde: { name: "Sonde Espionnage", baseSpeed: 100000000, engine: "combustion" },
    bombardier: { name: "Bombardier", baseSpeed: 4000, engine: "impulse", upgradeEngine: { tech: "hyperspace", level: 8 } },
    destructeur: { name: "Destructeur", baseSpeed: 5000, engine: "hyperspace" },
    traqueur: { name: "Traqueur", baseSpeed: 10000, engine: "hyperspace" },
    edlm: { name: "Étoile de la Mort", baseSpeed: 100, engine: "hyperspace" },
    eclaireur: { name: "Éclaireur", baseSpeed: 12000, engine: "hyperspace" },
    faucheur: { name: "Faucheur", baseSpeed: 7000, engine: "hyperspace" },
  };

  const selected = ships[shipType];
  
  const engineBonus: Record<string, number> = {
    combustion: 0.1,
    impulse: 0.2,
    hyperspace: 0.3
  };

  let usedEngine = selected.engine;
  let techLevel = usedEngine === "combustion" ? combustion : usedEngine === "impulse" ? impulse : hyperspace;
  
  if (selected.upgradeEngine) {
    const upgradeTechLevel = selected.upgradeEngine.tech === "impulse" ? impulse : hyperspace;
    if (upgradeTechLevel >= selected.upgradeEngine.level) {
      usedEngine = selected.upgradeEngine.tech;
      techLevel = upgradeTechLevel;
    }
  }
  
  const bonus = engineBonus[usedEngine];
  const speed = Math.round(selected.baseSpeed * (1 + bonus * techLevel) * fleetSpeed);

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-bold text-white">Formule de vitesse</span>
        </div>
        <p className="text-sm text-gray-400">
          Vitesse = <code className="bg-black/30 px-1 rounded">vitesse base × (1 + bonus × niveau techno) × vitesse flotte</code>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Bonus : Combustion +10%/niv | Impulsion +20%/niv | Hyperespace +30%/niv
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
              >
                {Object.entries(ships).map(([key, s]) => (
                  <option key={key} value={key}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Vitesse flotte univers</label>
              <select 
                value={fleetSpeed} 
                onChange={(e) => setFleetSpeed(Number(e.target.value))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-1 text-white"
              >
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>x{s}</option>)}
              </select>
            </div>
            <hr className="border-[#2E384D]" />
            {[
              { label: "Réacteur Combustion", value: combustion, setter: setCombustion },
              { label: "Réacteur Impulsion", value: impulse, setter: setImpulse },
              { label: "Propulsion Hyperespace", value: hyperspace, setter: setHyperspace },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <label className="text-gray-400 text-sm">{item.label}</label>
                <input 
                  type="number" 
                  value={item.value} 
                  onChange={(e) => item.setter(Math.max(0, Number(e.target.value)))}
                  className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-16 text-center"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">{selected.name}</h3>
          <div className="space-y-4">
            <div className="bg-[#151924] rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Vitesse de base</p>
              <p className="font-mono text-xl text-gray-400">{formatNumber(selected.baseSpeed)}</p>
            </div>
            <div className="bg-[#151924] rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Moteur utilisé</p>
              <p className="font-mono text-lg text-primary capitalize">{usedEngine} (niv. {techLevel})</p>
            </div>
            <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
              <p className="text-xs text-green-400 mb-1">Vitesse finale</p>
              <p className="font-mono text-2xl text-green-300">{formatNumber(speed)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsumptionCalculator() {
  const [shipType, setShipType] = useState("gt");
  const [quantity, setQuantity] = useState(100);
  const [distance, setDistance] = useState(1000);
  const [speedPercent, setSpeedPercent] = useState(100);

  const ships: Record<string, { name: string; baseConso: number }> = {
    pt: { name: "Petit Transporteur", baseConso: 10 },
    gt: { name: "Grand Transporteur", baseConso: 50 },
    cl: { name: "Chasseur Léger", baseConso: 20 },
    ch: { name: "Chasseur Lourd", baseConso: 75 },
    croiseur: { name: "Croiseur", baseConso: 300 },
    vb: { name: "Vaisseau de Bataille", baseConso: 500 },
    colo: { name: "Vaisseau Colonisation", baseConso: 1000 },
    recycleur: { name: "Recycleur", baseConso: 300 },
    sonde: { name: "Sonde Espionnage", baseConso: 1 },
    bombardier: { name: "Bombardier", baseConso: 700 },
    destructeur: { name: "Destructeur", baseConso: 1000 },
    traqueur: { name: "Traqueur", baseConso: 250 },
    edlm: { name: "Étoile de la Mort", baseConso: 1 },
    eclaireur: { name: "Éclaireur", baseConso: 300 },
    faucheur: { name: "Faucheur", baseConso: 1100 },
  };

  const selected = ships[shipType];
  const speedFactor = speedPercent / 100;
  const consumption = Math.round(selected.baseConso * quantity * distance / 35000 * Math.pow(speedFactor + 1, 2));

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-bold text-white">Formule de consommation</span>
        </div>
        <p className="text-sm text-gray-400">
          Conso = <code className="bg-black/30 px-1 rounded">conso base × quantité × distance / 35000 × (vitesse% + 1)²</code>
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
              >
                {Object.entries(ships).map(([key, s]) => (
                  <option key={key} value={key}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Quantité</label>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-24 text-right"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Distance</label>
              <input 
                type="number" 
                value={distance} 
                onChange={(e) => setDistance(Math.max(1, Number(e.target.value)))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-24 text-right"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Vitesse de vol</label>
              <div className="flex items-center gap-2">
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="10"
                  value={speedPercent} 
                  onChange={(e) => setSpeedPercent(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-primary font-mono w-12 text-right">{speedPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Résultat</h3>
          <div className="space-y-4">
            <div className="bg-[#151924] rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Consommation unitaire</p>
              <p className="font-mono text-lg text-gray-400">{selected.baseConso} deut/unité</p>
            </div>
            <div className="bg-teal-900/20 border border-teal-700/30 rounded-lg p-4">
              <p className="text-xs text-teal-400 mb-1">Consommation totale</p>
              <p className="font-mono text-2xl text-teal-300">{formatNumber(consumption)} deut</p>
            </div>
            <div className="bg-[#151924] rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Par vaisseau</p>
              <p className="font-mono text-lg text-gray-400">{formatNumber(consumption / quantity)} deut</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConstructionTimeCalculator() {
  const [metalCost, setMetalCost] = useState(1000000);
  const [crystalCost, setCrystalCost] = useState(500000);
  const [robotsLevel, setRobotsLevel] = useState(10);
  const [naniteLevel, setNaniteLevel] = useState(5);
  const [ecoSpeed, setEcoSpeed] = useState(1);

  const timeInHours = (metalCost + crystalCost) / (2500 * (1 + robotsLevel) * Math.pow(2, naniteLevel) * ecoSpeed);
  const timeInSeconds = timeInHours * 3600;
  
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return (
    <div className="space-y-6">
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-primary" />
          <span className="font-bold text-white">Formule de temps de construction</span>
        </div>
        <p className="text-sm text-gray-400">
          Temps (h) = <code className="bg-black/30 px-1 rounded">(métal + cristal) / (2500 × (1 + robots) × 2^nanite × vitesse éco)</code>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Paramètres</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Vitesse économique</label>
              <select 
                value={ecoSpeed} 
                onChange={(e) => setEcoSpeed(Number(e.target.value))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-1 text-white"
              >
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>x{s}</option>)}
              </select>
            </div>
            <hr className="border-[#2E384D]" />
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Coût Métal</label>
              <input 
                type="number" 
                value={metalCost} 
                onChange={(e) => setMetalCost(Math.max(0, Number(e.target.value)))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-28 text-right"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-cyan-400">Coût Cristal</label>
              <input 
                type="number" 
                value={crystalCost} 
                onChange={(e) => setCrystalCost(Math.max(0, Number(e.target.value)))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-28 text-right"
              />
            </div>
            <hr className="border-[#2E384D]" />
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Usine de Robots</label>
              <input 
                type="number" 
                value={robotsLevel} 
                onChange={(e) => setRobotsLevel(Math.max(0, Number(e.target.value)))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-16 text-center"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-400">Usine de Nanites</label>
              <input 
                type="number" 
                value={naniteLevel} 
                onChange={(e) => setNaniteLevel(Math.max(0, Number(e.target.value)))}
                className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white w-16 text-center"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
          <h3 className="font-bold text-white mb-4">Temps de construction</h3>
          <div className="space-y-4">
            <div className="bg-[#151924] rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Coût total</p>
              <p className="font-mono text-lg text-gray-400">{formatNumber(metalCost + crystalCost)}</p>
            </div>
            <div className="bg-[#151924] rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">Réduction nanites</p>
              <p className="font-mono text-lg text-green-400">÷{Math.pow(2, naniteLevel)}</p>
            </div>
            <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
              <p className="text-xs text-amber-400 mb-1">Durée</p>
              <p className="font-mono text-2xl text-amber-300">
                {hours > 0 && `${hours}h `}{minutes > 0 && `${minutes}m `}{seconds}s
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuideFormules() {
  const [activeTab, setActiveTab] = useState<TabId>("production");

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
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Formules & Calculateurs
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Toutes les formules OGame avec des outils de calcul interactifs
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide adapté pour Psykoverse • Source : Communauté OGame FR
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                      activeTab === tab.id
                        ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                        : "bg-[#1C2230] text-gray-400 hover:text-white hover:bg-[#252D3D]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {activeTab === "production" && <ProductionCalculator />}
                {activeTab === "batiments" && <BuildingCostCalculator />}
                {activeTab === "recherches" && <ResearchCostCalculator />}
                {activeTab === "vitesse" && <SpeedCalculator />}
                {activeTab === "consommation" && <ConsumptionCalculator />}
                {activeTab === "temps" && <ConstructionTimeCalculator />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-12">
              <RelatedGuides currentGuide="formules" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

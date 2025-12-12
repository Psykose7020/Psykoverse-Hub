import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Info, Clock } from "lucide-react";
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

export default function OutilsBatiments() {
  const [buildingType, setBuildingType] = useState("metal");
  const [level, setLevel] = useState(25);
  const [robotsLevel, setRobotsLevel] = useState(10);
  const [nanitesLevel, setNanitesLevel] = useState(0);
  const [ecoSpeed, setEcoSpeed] = useState(1);

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

  const buildTime = Math.round(((metalCost + crystalCost) / (2500 * (1 + robotsLevel) * Math.pow(2, nanitesLevel) * ecoSpeed)) * 3600);

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
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur Bâtiments
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Calculez les coûts et temps de construction
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-bold text-white">Formules</span>
                </div>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Coût niveau n : <code className="bg-black/30 px-1 rounded">coût niveau 1 × facteur^(n-1)</code></p>
                  <p>Temps : <code className="bg-black/30 px-1 rounded">(M + C) / (2500 × (1 + robots) × 2^nanites × vitesse)</code></p>
                </div>
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
                        data-testid="select-building"
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
                          max="55" 
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
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block">Robots</label>
                        <input 
                          type="number" 
                          value={robotsLevel} 
                          onChange={(e) => setRobotsLevel(Number(e.target.value))}
                          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-center"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block">Nanites</label>
                        <input 
                          type="number" 
                          value={nanitesLevel} 
                          onChange={(e) => setNanitesLevel(Number(e.target.value))}
                          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-center"
                          min="0"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block">Vitesse</label>
                        <select 
                          value={ecoSpeed} 
                          onChange={(e) => setEcoSpeed(Number(e.target.value))}
                          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-center"
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(s => <option key={s} value={s}>x{s}</option>)}
                        </select>
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
                  <div className="space-y-3">
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

                  <div className="mt-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-5 h-5 text-blue-400" />
                      <span className="text-gray-400 text-sm">Temps de construction</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400" data-testid="text-build-time">{formatTime(buildTime)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">Coût total (niveau 1 → {level})</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-[#151924] rounded-lg">
                    <p className="text-gray-400 text-sm mb-1">Métal</p>
                    <p className="font-mono text-xl text-gray-300">{formatNumber(totalMetal)}</p>
                  </div>
                  <div className="text-center p-4 bg-[#151924] rounded-lg">
                    <p className="text-cyan-400 text-sm mb-1">Cristal</p>
                    <p className="font-mono text-xl text-cyan-300">{formatNumber(totalCrystal)}</p>
                  </div>
                  <div className="text-center p-4 bg-[#151924] rounded-lg">
                    <p className="text-teal-400 text-sm mb-1">Deutérium</p>
                    <p className="font-mono text-xl text-teal-300">{formatNumber(totalDeut)}</p>
                  </div>
                </div>
              </div>

              <RelatedGuides currentGuide="batiments" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { FlaskConical, Info, Clock } from "lucide-react";
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

const researches: Record<string, { name: string; baseCost: { m: number; c: number; d: number }; factor: number }> = {
  espionnage: { name: "Tech. Espionnage", baseCost: { m: 200, c: 1000, d: 200 }, factor: 2 },
  ordinateur: { name: "Tech. Ordinateur", baseCost: { m: 0, c: 400, d: 600 }, factor: 2 },
  armes: { name: "Tech. Armes", baseCost: { m: 800, c: 200, d: 0 }, factor: 2 },
  bouclier: { name: "Tech. Bouclier", baseCost: { m: 200, c: 600, d: 0 }, factor: 2 },
  protection: { name: "Tech. Protection", baseCost: { m: 1000, c: 0, d: 0 }, factor: 2 },
  energie: { name: "Tech. Énergie", baseCost: { m: 0, c: 800, d: 400 }, factor: 2 },
  hyperespace: { name: "Tech. Hyperespace", baseCost: { m: 0, c: 4000, d: 2000 }, factor: 2 },
  combustion: { name: "Réacteur Combustion", baseCost: { m: 400, c: 0, d: 600 }, factor: 2 },
  impulsion: { name: "Réacteur Impulsion", baseCost: { m: 2000, c: 4000, d: 600 }, factor: 2 },
  propulsion: { name: "Propulsion Hyperespace", baseCost: { m: 10000, c: 20000, d: 6000 }, factor: 2 },
  laser: { name: "Tech. Laser", baseCost: { m: 200, c: 100, d: 0 }, factor: 2 },
  ions: { name: "Tech. Ions", baseCost: { m: 1000, c: 300, d: 100 }, factor: 2 },
  plasma: { name: "Tech. Plasma", baseCost: { m: 2000, c: 4000, d: 1000 }, factor: 2 },
  rri: { name: "RRI", baseCost: { m: 240000, c: 400000, d: 160000 }, factor: 2 },
  astrophysique: { name: "Astrophysique", baseCost: { m: 4000, c: 8000, d: 4000 }, factor: 1.75 },
  graviton: { name: "Graviton", baseCost: { m: 0, c: 0, d: 0 }, factor: 3 },
};

export default function OutilsRecherches() {
  const [researchType, setResearchType] = useState("combustion");
  const [level, setLevel] = useState(15);
  const [labLevel, setLabLevel] = useState(10);
  const [rriLevel, setRriLevel] = useState(0);
  const [ecoSpeed, setEcoSpeed] = useState(1);

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

  const effectiveLab = labLevel * (1 + rriLevel);
  const researchTime = Math.round(((metalCost + crystalCost) / (1000 * (1 + effectiveLab) * ecoSpeed)) * 3600);

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
              <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20">
                <FlaskConical className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur Recherches
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Calculez les coûts et temps de recherche
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
                  <p>Temps : <code className="bg-black/30 px-1 rounded">(M + C) / (1000 × (1 + labo_effectif) × vitesse)</code></p>
                  <p>Labo effectif avec RRI : <code className="bg-black/30 px-1 rounded">labo × (1 + RRI)</code></p>
                </div>
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
                        data-testid="select-research"
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
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block">Laboratoire</label>
                        <input 
                          type="number" 
                          value={labLevel} 
                          onChange={(e) => setLabLevel(Number(e.target.value))}
                          className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-center"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-xs mb-1 block">RRI</label>
                        <input 
                          type="number" 
                          value={rriLevel} 
                          onChange={(e) => setRriLevel(Number(e.target.value))}
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
                      <p className="text-xs text-gray-500">Facteur : <span className="text-primary">×{selected.factor}</span></p>
                      <p className="text-xs text-gray-500">Labo effectif : <span className="text-white">{effectiveLab}</span></p>
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

                  <div className="mt-4 bg-gradient-to-r from-teal-900/30 to-cyan-900/30 border border-teal-500/30 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Clock className="w-5 h-5 text-teal-400" />
                      <span className="text-gray-400 text-sm">Temps de recherche</span>
                    </div>
                    <p className="text-2xl font-bold text-teal-400" data-testid="text-research-time">{formatTime(researchTime)}</p>
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

              <RelatedGuides currentGuide="recherches" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

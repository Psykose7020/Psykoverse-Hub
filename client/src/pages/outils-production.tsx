import { useState } from "react";
import { motion } from "framer-motion";
import { Factory, Info, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
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

export default function OutilsProduction() {
  const [metalLevel, setMetalLevel] = useState(20);
  const [crystalLevel, setCrystalLevel] = useState(18);
  const [deutLevel, setDeutLevel] = useState(15);
  const [ecoSpeed, setEcoSpeed] = useState(1);
  const [tempMax, setTempMax] = useState(40);
  const [showBonuses, setShowBonuses] = useState(false);
  const [playerClass, setPlayerClass] = useState("none");
  const [allianceClass, setAllianceClass] = useState("none");
  const [lifeformBonusMetal, setLifeformBonusMetal] = useState(0);
  const [lifeformBonusCrystal, setLifeformBonusCrystal] = useState(0);
  const [lifeformBonusDeut, setLifeformBonusDeut] = useState(0);

  const playerClassBonus = playerClass === "collector" ? 0.25 : 0;
  const allianceClassBonus = allianceClass === "trader" ? 0.05 : 0;
  const totalBonusMetal = 1 + playerClassBonus + allianceClassBonus + (lifeformBonusMetal / 100);
  const totalBonusCrystal = 1 + playerClassBonus + allianceClassBonus + (lifeformBonusCrystal / 100);
  const totalBonusDeut = 1 + playerClassBonus + allianceClassBonus + (lifeformBonusDeut / 100);

  const metalProd = Math.round(30 * metalLevel * Math.pow(1.1, metalLevel) * ecoSpeed * totalBonusMetal);
  const crystalProd = Math.round(20 * crystalLevel * Math.pow(1.1, crystalLevel) * ecoSpeed * totalBonusCrystal);
  const tempFactor = 1.36 - 0.004 * tempMax;
  const deutProd = Math.round(10 * deutLevel * Math.pow(1.1, deutLevel) * tempFactor * ecoSpeed * totalBonusDeut);

  const dailyMetal = metalProd * 24;
  const dailyCrystal = crystalProd * 24;
  const dailyDeut = deutProd * 24;

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
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <Factory className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur de Production
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Calculez votre production de ressources par heure et par jour
              </p>
            </div>

            <div className="space-y-8">
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

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">Paramètres</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-gray-400">Vitesse économique</label>
                      <select 
                        value={ecoSpeed} 
                        onChange={(e) => setEcoSpeed(Number(e.target.value))}
                        className="bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-1 text-white"
                        data-testid="select-eco-speed"
                      >
                        {[1,2,3,4,5,6,7,8,9,10].map(s => <option key={s} value={s}>x{s}</option>)}
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-gray-400">Température max</label>
                      <input 
                        type="number" 
                        value={tempMax} 
                        onChange={(e) => setTempMax(Number(e.target.value))}
                        className="bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-1 text-white w-20 text-right"
                        data-testid="input-temp-max"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Mine de Métal", value: metalLevel, setter: setMetalLevel, color: "text-gray-400" },
                      { label: "Mine de Cristal", value: crystalLevel, setter: setCrystalLevel, color: "text-cyan-400" },
                      { label: "Synthétiseur Deut", value: deutLevel, setter: setDeutLevel, color: "text-teal-400" },
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

                <button
                  onClick={() => setShowBonuses(!showBonuses)}
                  className="w-full mt-4 flex items-center justify-between p-3 bg-purple-900/20 border border-purple-700/30 rounded-lg hover:bg-purple-900/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-purple-300 font-medium">Bonus (Classes & FdV)</span>
                    {(totalBonusMetal > 1 || totalBonusCrystal > 1 || totalBonusDeut > 1) && (
                      <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                        Actif
                      </span>
                    )}
                  </div>
                  {showBonuses ? <ChevronUp className="w-4 h-4 text-purple-400" /> : <ChevronDown className="w-4 h-4 text-purple-400" />}
                </button>
                
                {showBonuses && (
                  <div className="mt-4 space-y-3 p-4 bg-purple-900/10 border border-purple-700/20 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <label className="text-purple-300 text-sm">Classe Joueur</label>
                        <select 
                          value={playerClass} 
                          onChange={(e) => setPlayerClass(e.target.value)}
                          className="bg-[#0B0E14] border border-purple-700/30 rounded px-3 py-1 text-white text-sm"
                        >
                          <option value="none">Aucune</option>
                          <option value="collector">Collecteur (+25%)</option>
                          <option value="general">Général (0%)</option>
                          <option value="explorer">Explorateur (0%)</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-purple-300 text-sm">Classe Alliance</label>
                        <select 
                          value={allianceClass} 
                          onChange={(e) => setAllianceClass(e.target.value)}
                          className="bg-[#0B0E14] border border-purple-700/30 rounded px-3 py-1 text-white text-sm"
                        >
                          <option value="none">Aucune</option>
                          <option value="trader">Marchand (+5%)</option>
                          <option value="warrior">Guerrier (0%)</option>
                          <option value="researcher">Chercheur (0%)</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-purple-300 text-sm block">Bonus Formes de Vie (%)</label>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <span className="text-gray-400 text-xs block mb-1">Métal</span>
                          <input 
                            type="number" 
                            value={lifeformBonusMetal} 
                            onChange={(e) => setLifeformBonusMetal(Math.max(0, Math.min(100, Number(e.target.value))))}
                            className="bg-[#0B0E14] border border-gray-600/50 rounded px-2 py-1 text-gray-300 w-full text-center text-sm"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div className="text-center">
                          <span className="text-cyan-400 text-xs block mb-1">Cristal</span>
                          <input 
                            type="number" 
                            value={lifeformBonusCrystal} 
                            onChange={(e) => setLifeformBonusCrystal(Math.max(0, Math.min(100, Number(e.target.value))))}
                            className="bg-[#0B0E14] border border-cyan-600/50 rounded px-2 py-1 text-cyan-300 w-full text-center text-sm"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div className="text-center">
                          <span className="text-teal-400 text-xs block mb-1">Deut</span>
                          <input 
                            type="number" 
                            value={lifeformBonusDeut} 
                            onChange={(e) => setLifeformBonusDeut(Math.max(0, Math.min(100, Number(e.target.value))))}
                            className="bg-[#0B0E14] border border-teal-600/50 rounded px-2 py-1 text-teal-300 w-full text-center text-sm"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4">Production / heure</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-gray-400">Métal</span>
                      <span className="font-mono text-xl text-gray-300" data-testid="text-metal-hour">{formatNumber(metalProd)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-cyan-400">Cristal</span>
                      <span className="font-mono text-xl text-cyan-300" data-testid="text-crystal-hour">{formatNumber(crystalProd)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-teal-400">Deutérium</span>
                      <span className="font-mono text-xl text-teal-300" data-testid="text-deut-hour">{formatNumber(deutProd)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h3 className="font-bold text-white mb-4">Production / jour</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-gray-400">Métal</span>
                      <span className="font-mono text-xl text-gray-300">{formatNumber(dailyMetal)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-cyan-400">Cristal</span>
                      <span className="font-mono text-xl text-cyan-300">{formatNumber(dailyCrystal)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-teal-400">Deutérium</span>
                      <span className="font-mono text-xl text-teal-300">{formatNumber(dailyDeut)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <RelatedGuides currentGuide="production" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

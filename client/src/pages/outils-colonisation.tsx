import { useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Info, Thermometer, Grid3X3 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const positionData: Record<number, { diamMin: number; diamMax: number; tempMin: number; tempMax: number }> = {
  1: { diamMin: 7238, diamMax: 9203, tempMin: 220, tempMax: 260 },
  2: { diamMin: 9500, diamMax: 11924, tempMin: 170, tempMax: 210 },
  3: { diamMin: 9500, diamMax: 11924, tempMin: 120, tempMax: 160 },
  4: { diamMin: 12187, diamMax: 15213, tempMin: 70, tempMax: 110 },
  5: { diamMin: 12187, diamMax: 15213, tempMin: 60, tempMax: 100 },
  6: { diamMin: 13871, diamMax: 17351, tempMin: 50, tempMax: 90 },
  7: { diamMin: 13871, diamMax: 17351, tempMin: 40, tempMax: 80 },
  8: { diamMin: 12490, diamMax: 15875, tempMin: 30, tempMax: 70 },
  9: { diamMin: 12490, diamMax: 15875, tempMin: 20, tempMax: 60 },
  10: { diamMin: 11108, diamMax: 13861, tempMin: 10, tempMax: 50 },
  11: { diamMin: 11108, diamMax: 13861, tempMin: 0, tempMax: 40 },
  12: { diamMin: 9726, diamMax: 12178, tempMin: -10, tempMax: 30 },
  13: { diamMin: 9044, diamMax: 11286, tempMin: -50, tempMax: -10 },
  14: { diamMin: 8010, diamMax: 10069, tempMin: -90, tempMax: -50 },
  15: { diamMin: 7238, diamMax: 9203, tempMin: -130, tempMax: -90 }
};

export default function OutilsColonisation() {
  const [position, setPosition] = useState(8);
  const [playerClass, setPlayerClass] = useState("none");
  const [allianceClass, setAllianceClass] = useState("none");
  const [universeBonus, setUniverseBonus] = useState(0);
  const [explorerBonusPercent, setExplorerBonusPercent] = useState(0);

  const data = positionData[position];
  
  const explorerBaseBonus = playerClass === "explorer" ? 0.10 : 0;
  const explorerClassBonus = playerClass === "explorer" ? (explorerBonusPercent / 100) * 0.10 : 0;
  const totalExplorerBonus = explorerBaseBonus + explorerClassBonus;
  
  const allianceBonus = allianceClass === "researcher" ? 0.05 : 0;
  
  const totalDiameterBonus = 1 + totalExplorerBonus + allianceBonus;
  
  const diamMinWithBonus = Math.ceil(data.diamMin * totalDiameterBonus);
  const diamMaxWithBonus = Math.ceil(data.diamMax * totalDiameterBonus);
  
  const casesMin = Math.floor(Math.pow(diamMinWithBonus / 1000, 2)) + universeBonus;
  const casesMax = Math.floor(Math.pow(diamMaxWithBonus / 1000, 2)) + universeBonus;

  const bonusPercentDisplay = ((totalDiameterBonus - 1) * 100).toFixed(1);
  const casesBonusPercent = (((casesMax / Math.floor(Math.pow(data.diamMax / 1000, 2))) - 1) * 100).toFixed(1);

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
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
                <Globe2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur de Colonisation
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Calculez le diamètre, les cases et la température selon la position
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-4 h-4 text-primary" />
                  <span className="font-bold text-white">Formules de calcul</span>
                </div>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>Diamètre : <code className="bg-black/30 px-1 rounded">√(cases) × 1000 × bonus_classe</code></p>
                  <p>Cases : <code className="bg-black/30 px-1 rounded">(diamètre / 1000)² + bonus_univers</code></p>
                  <p className="text-xs text-gray-500 mt-2">
                    Explorateur : +10% diamètre | Alliance Chercheur : +5% diamètre | Bonus de personnage : multiplicatif
                  </p>
                </div>
              </div>

              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">Paramètres</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Position dans le système (1-15)</label>
                      <div className="flex items-center gap-3">
                        <input 
                          type="range" 
                          min="1" 
                          max="15" 
                          value={position} 
                          onChange={(e) => setPosition(Number(e.target.value))}
                          className="flex-1 accent-primary"
                        />
                        <span className="text-2xl font-bold text-primary w-8 text-center">{position}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Classe du joueur</label>
                      <select 
                        value={playerClass} 
                        onChange={(e) => setPlayerClass(e.target.value)}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                        data-testid="select-player-class"
                      >
                        <option value="none">Collecteur / Général</option>
                        <option value="explorer">Explorateur (+10% diamètre)</option>
                      </select>
                    </div>
                    {playerClass === "explorer" && (
                      <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                        <label className="text-purple-300 text-sm mb-2 block">
                          Bonus de classe de personnage (%)
                        </label>
                        <input 
                          type="number" 
                          value={explorerBonusPercent} 
                          onChange={(e) => setExplorerBonusPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                          className="w-full bg-[#0B0E14] border border-purple-700/30 rounded px-3 py-2 text-white"
                          min="0"
                          max="100"
                          placeholder="Ex: 56 pour 56%"
                          data-testid="input-explorer-bonus"
                        />
                        <p className="text-xs text-purple-400 mt-2">
                          Ce bonus s'applique de manière multiplicative sur le +10% de l'explorateur.
                          <br />
                          Ex: 56% → 10% + (56% de 10%) = <span className="font-bold">+{(10 + 56 * 0.1).toFixed(1)}%</span>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Classe d'alliance</label>
                      <select 
                        value={allianceClass} 
                        onChange={(e) => setAllianceClass(e.target.value)}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                        data-testid="select-alliance-class"
                      >
                        <option value="none">Aucune / Guerrier / Marchand</option>
                        <option value="researcher">Chercheur (+5% diamètre)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Bonus de cases de l'univers</label>
                      <select 
                        value={universeBonus} 
                        onChange={(e) => setUniverseBonus(Number(e.target.value))}
                        className="w-full bg-[#0B0E14] border border-[#2E384D] rounded px-3 py-2 text-white"
                        data-testid="select-universe-bonus"
                      >
                        <option value={0}>+0 cases</option>
                        <option value={10}>+10 cases</option>
                        <option value={25}>+25 cases</option>
                        <option value={30}>+30 cases</option>
                      </select>
                    </div>
                    {(totalDiameterBonus > 1 || universeBonus > 0) && (
                      <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3">
                        <p className="text-green-400 text-sm font-medium">Bonus actifs :</p>
                        <ul className="text-xs text-green-300 mt-1 space-y-1">
                          {totalDiameterBonus > 1 && (
                            <li>• Diamètre : +{bonusPercentDisplay}%</li>
                          )}
                          {universeBonus > 0 && (
                            <li>• Cases univers : +{universeBonus}</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-3">Diamètre</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Min</span>
                      <span className="font-mono text-blue-400" data-testid="text-diam-min">{diamMinWithBonus.toLocaleString()} km</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Max</span>
                      <span className="font-mono text-blue-400" data-testid="text-diam-max">{diamMaxWithBonus.toLocaleString()} km</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Grid3X3 className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="font-bold text-white mb-3">Cases</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Min</span>
                      <span className="font-mono text-green-400" data-testid="text-cases-min">{casesMin}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Max</span>
                      <span className="font-mono text-green-400 text-xl font-bold" data-testid="text-cases-max">{casesMax}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Thermometer className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="font-bold text-white mb-3">Température</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Min</span>
                      <span className="font-mono text-orange-400" data-testid="text-temp-min">{data.tempMin}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Max</span>
                      <span className="font-mono text-orange-400" data-testid="text-temp-max">{data.tempMax}°C</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6">
                <h3 className="font-bold text-amber-400 mb-4">Tableau de référence (sans bonus)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-amber-700/30">
                        <th className="text-left py-2 px-2 text-gray-400">Pos</th>
                        <th className="text-left py-2 px-2 text-gray-400">Diamètre</th>
                        <th className="text-left py-2 px-2 text-gray-400">Cases</th>
                        <th className="text-left py-2 px-2 text-gray-400">Température</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(positionData).map(([pos, d]) => {
                        const baseCasesMin = Math.floor(Math.pow(d.diamMin / 1000, 2));
                        const baseCasesMax = Math.floor(Math.pow(d.diamMax / 1000, 2));
                        const isSelected = Number(pos) === position;
                        return (
                          <tr 
                            key={pos} 
                            className={`border-b border-amber-700/20 ${isSelected ? 'bg-amber-500/20' : ''}`}
                          >
                            <td className={`py-1 px-2 ${isSelected ? 'text-amber-400 font-bold' : 'text-white'}`}>
                              {pos}
                            </td>
                            <td className="py-1 px-2 text-gray-300 font-mono text-xs">
                              {d.diamMin.toLocaleString()} - {d.diamMax.toLocaleString()} km
                            </td>
                            <td className="py-1 px-2 text-green-400 font-mono text-xs">
                              {baseCasesMin} - {baseCasesMax}
                            </td>
                            <td className="py-1 px-2 text-orange-400 font-mono text-xs">
                              {d.tempMin}°C à {d.tempMax}°C
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <RelatedGuides currentGuide="colonisation" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

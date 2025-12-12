import { motion } from "framer-motion";
import { Compass, Calculator, AlertTriangle, Sparkles, Ship, Gem, Package, Skull, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";
import { useState, useMemo } from "react";

import ptImg from "@assets/ogame_ships/petit-transporteur.png";
import gtImg from "@assets/ogame_ships/grand-transporteur.png";
import clImg from "@assets/ogame_ships/chasseur-leger.png";
import cloImg from "@assets/ogame_ships/chasseur-lourd.png";
import eclaireurImg from "@assets/ogame_ships/eclaireur.png";
import croiseurImg from "@assets/ogame_ships/croiseur.png";
import vdbImg from "@assets/ogame_ships/vaisseau-bataille.png";
import traqueurImg from "@assets/ogame_ships/traqueur.png";
import coloImg from "@assets/ogame_ships/vaisseau-colonisation.png";
import recycleurImg from "@assets/ogame_ships/recycleur.png";
import sondeImg from "@assets/ogame_ships/sonde-espionnage.png";
import bombardierImg from "@assets/ogame_ships/bombardier.png";
import destructeurImg from "@assets/ogame_ships/destructeur.png";
import edmImg from "@assets/ogame_ships/etoile-mort.png";
import faucheurImg from "@assets/ogame_ships/faucheur.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const topPlayerRanges = [
  { label: "< 10.000", maxPoints: 2000 },
  { label: "< 100.000", maxPoints: 4000 },
  { label: "< 1.000.000", maxPoints: 6000 },
  { label: "< 5.000.000", maxPoints: 9000 },
  { label: "< 25.000.000", maxPoints: 12000 },
  { label: "< 50.000.000", maxPoints: 15000 },
  { label: "< 75.000.000", maxPoints: 18000 },
  { label: "< 100.000.000", maxPoints: 21000 },
  { label: "> 100.000.000", maxPoints: 24000 }
];

const ships = [
  { id: "pt", name: "Petit Transporteur", shortName: "PT", capacity: 5000, expoPoints: 20, img: ptImg },
  { id: "gt", name: "Grand Transporteur", shortName: "GT", capacity: 25000, expoPoints: 60, img: gtImg },
  { id: "cl", name: "Chasseur Léger", shortName: "CL", capacity: 50, expoPoints: 20, img: clImg },
  { id: "clo", name: "Chasseur Lourd", shortName: "CLo", capacity: 100, expoPoints: 50, img: cloImg },
  { id: "eclaireur", name: "Éclaireur", shortName: "Écl", capacity: 10000, expoPoints: 115, img: eclaireurImg },
  { id: "croiseur", name: "Croiseur", shortName: "Cr", capacity: 800, expoPoints: 135, img: croiseurImg },
  { id: "vdb", name: "Vaisseau de Bataille", shortName: "VdB", capacity: 1500, expoPoints: 300, img: vdbImg },
  { id: "traqueur", name: "Traqueur", shortName: "Traq", capacity: 10000, expoPoints: 350, img: traqueurImg },
  { id: "colo", name: "Vaisseau de Colonisation", shortName: "Colo", capacity: 7500, expoPoints: 150, img: coloImg },
  { id: "recycleur", name: "Recycleur", shortName: "Rec", capacity: 20000, expoPoints: 80, img: recycleurImg },
  { id: "sonde", name: "Sonde d'espionnage", shortName: "Sonde", capacity: 0, expoPoints: 5, img: sondeImg },
  { id: "bombardier", name: "Bombardier", shortName: "Bomb", capacity: 500, expoPoints: 375, img: bombardierImg },
  { id: "destructeur", name: "Destructeur", shortName: "Dest", capacity: 2000, expoPoints: 550, img: destructeurImg },
  { id: "edm", name: "Étoile de la Mort", shortName: "EdM", capacity: 1000000, expoPoints: 4500, img: edmImg },
  { id: "faucheur", name: "Faucheur", shortName: "Fauch", capacity: 10000, expoPoints: 700, img: faucheurImg }
];

const resultats = [
  { type: "Ressources", desc: "Métal, Cristal ou Deutérium", color: "text-green-400", icon: Package, prob: "68%" },
  { type: "Vaisseaux", desc: "Flottes abandonnées", color: "text-blue-400", icon: Ship, prob: "14%" },
  { type: "Matière Noire", desc: "Antimatière gratuite", color: "text-purple-400", icon: Gem, prob: "7%" },
  { type: "Items", desc: "Objets bonus", color: "text-amber-400", icon: Sparkles, prob: "5%" },
  { type: "Pirates", desc: "Combat PNJ", color: "text-red-400", icon: Skull, prob: "3%" },
  { type: "Aliens", desc: "Combat difficile", color: "text-red-600", icon: Zap, prob: "2%" }
];

export default function GuideExpeditions() {
  const [topPlayerIndex, setTopPlayerIndex] = useState(4);
  const [playerClass, setPlayerClass] = useState<"explorateur" | "collecteur" | "general">("explorateur");
  const [ecoSpeed, setEcoSpeed] = useState(6);
  const [hyperspace, setHyperspace] = useState(8);
  const [bonusResources, setBonusResources] = useState(0);
  const [bonusShips, setBonusShips] = useState(0);
  const [fleetCounts, setFleetCounts] = useState<Record<string, number>>({});

  const updateFleetCount = (shipId: string, count: number) => {
    setFleetCounts(prev => ({ ...prev, [shipId]: count }));
  };

  const calculations = useMemo(() => {
    let totalExpoPoints = 0;
    let totalCapacity = 0;
    const hasPathfinder = (fleetCounts["eclaireur"] || 0) > 0;

    ships.forEach(ship => {
      const count = fleetCounts[ship.id] || 0;
      totalExpoPoints += count * ship.expoPoints;
      totalCapacity += count * ship.capacity;
    });

    const maxPoints = topPlayerRanges[topPlayerIndex].maxPoints;
    const cappedPoints = Math.min(totalExpoPoints, maxPoints);

    const classMultiplier = playerClass === "explorateur" ? 1.5 : 1;
    const pathfinderMultiplier = (playerClass === "explorateur" && hasPathfinder) ? 2 : 1;
    const ecoSpeedMultiplier = playerClass === "explorateur" ? ecoSpeed : 1;
    const resourceBonusMultiplier = 1 + (bonusResources / 100);

    const avgFactor = 50;
    const maxFactor = 200;

    const baseCalc = cappedPoints * classMultiplier * pathfinderMultiplier * ecoSpeedMultiplier * resourceBonusMultiplier;

    const avgMetal = Math.floor(avgFactor * baseCalc * 1);
    const avgCrystal = Math.floor(avgFactor * baseCalc * 0.5);
    const avgDeut = Math.floor(avgFactor * baseCalc * 0.33);

    const maxMetal = Math.floor(maxFactor * baseCalc * 1);
    const maxCrystal = Math.floor(maxFactor * baseCalc * 0.5);
    const maxDeut = Math.floor(maxFactor * baseCalc * 0.33);

    const cappedMaxMetal = Math.min(maxMetal, totalCapacity);
    const cappedMaxCrystal = Math.min(maxCrystal, totalCapacity);
    const cappedMaxDeut = Math.min(maxDeut, totalCapacity);

    const baseDM = 1000 + (topPlayerIndex * 400);
    const dmMultiplier = (playerClass === "explorateur" ? 2 : 1) * (hasPathfinder && playerClass === "explorateur" ? 2 : 1);
    const maxDarkMatter = Math.floor(baseDM * dmMultiplier);

    const shipBonusMultiplier = 1 + (bonusShips / 100);
    const hyperBonus = 1 + (hyperspace * 0.05);
    
    const findableShips: Record<string, { avg: number; max: number }> = {};
    ships.forEach(ship => {
      if (ship.id === "edm") {
        findableShips[ship.id] = { avg: 0, max: 0 };
      } else {
        const baseFind = (cappedPoints / ship.expoPoints) * 0.3 * hyperBonus * shipBonusMultiplier * classMultiplier * pathfinderMultiplier;
        findableShips[ship.id] = {
          avg: Math.floor(baseFind * 0.3),
          max: Math.floor(baseFind)
        };
      }
    });

    return {
      totalExpoPoints,
      cappedPoints,
      maxPoints,
      totalCapacity,
      avgMetal,
      avgCrystal,
      avgDeut,
      maxMetal: cappedMaxMetal,
      maxCrystal: cappedMaxCrystal,
      maxDeut: cappedMaxDeut,
      maxDarkMatter,
      findableShips,
      classMultiplier,
      pathfinderMultiplier,
      ecoSpeedMultiplier,
      totalMultiplier: classMultiplier * pathfinderMultiplier * ecoSpeedMultiplier * resourceBonusMultiplier
    };
  }, [fleetCounts, topPlayerIndex, playerClass, ecoSpeed, hyperspace, bonusResources, bonusShips]);

  return (
    <Layout>
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-8"
          >
            <Link href="/tutoriels">
              <Button variant="ghost" className="mb-4 text-gray-400 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center">
                <Compass className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
                  Guide des Expéditions
                </h1>
                <p className="text-gray-400">Calculateur de gains et optimisation</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <h2 className="font-display text-xl font-bold text-white mb-4">Qu'est-ce qu'une expédition ?</h2>
              <p className="text-gray-300 mb-4">
                Les expéditions permettent d'envoyer une flotte explorer l'espace profond (position 16 d'un système). 
                Vous pouvez y trouver des <strong className="text-green-400">ressources</strong>, des <strong className="text-blue-400">vaisseaux abandonnés</strong>, 
                de la <strong className="text-purple-400">matière noire</strong>, ou rencontrer des dangers comme des pirates ou des aliens.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {resultats.map((r, i) => (
                  <div key={i} className="bg-[#151924] rounded-lg p-3 text-center">
                    <r.icon className={`w-6 h-6 mx-auto mb-2 ${r.color}`} />
                    <div className={`font-bold text-sm ${r.color}`}>{r.type}</div>
                    <div className="text-xs text-gray-500">{r.prob}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-2">Points clés</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Nombre de slots = Astrophysique ÷ 2 (arrondi)</li>
                    <li>• Classe <strong className="text-white">Explorateur</strong> : +2 slots bonus</li>
                    <li>• Durée recommandée : <strong className="text-white">1 heure</strong></li>
                    <li>• Les gains dépendent des points du Top 1</li>
                  </ul>
                </div>
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-blue-400 mb-2">Bonus Explorateur</h3>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• <strong className="text-white">×1.5</strong> gains de base</li>
                    <li>• <strong className="text-white">×Vitesse Éco</strong> multiplicateur</li>
                    <li>• Éclaireurs : bonus <strong className="text-white">×2</strong> supplémentaire</li>
                    <li>• <strong className="text-white">-50%</strong> chances de pirates/aliens</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-primary" />
                <h2 className="font-display text-xl font-bold text-white">Calculateur d'Expéditions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Top 1 joueur (points)</label>
                  <select
                    value={topPlayerIndex}
                    onChange={(e) => setTopPlayerIndex(Number(e.target.value))}
                    className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-3 py-2 text-white"
                    data-testid="select-top-player"
                  >
                    {topPlayerRanges.map((range, i) => (
                      <option key={i} value={i}>{range.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Classe</label>
                  <select
                    value={playerClass}
                    onChange={(e) => setPlayerClass(e.target.value as any)}
                    className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-3 py-2 text-white"
                    data-testid="select-class"
                  >
                    <option value="explorateur">Explorateur</option>
                    <option value="collecteur">Collecteur</option>
                    <option value="general">Général</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Vitesse économie</label>
                  <select
                    value={ecoSpeed}
                    onChange={(e) => setEcoSpeed(Number(e.target.value))}
                    className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-3 py-2 text-white"
                    data-testid="select-speed"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(s => (
                      <option key={s} value={s}>×{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Technologie Hyperespace</label>
                  <select
                    value={hyperspace}
                    onChange={(e) => setHyperspace(Number(e.target.value))}
                    className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-3 py-2 text-white"
                    data-testid="select-hyperspace"
                  >
                    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(h => (
                      <option key={h} value={h}>Niveau {h}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Bonus ressources (%)</label>
                  <input
                    type="number"
                    value={bonusResources}
                    onChange={(e) => setBonusResources(Number(e.target.value))}
                    className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-3 py-2 text-white"
                    min="0"
                    max="200"
                    data-testid="input-bonus-resources"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Bonus vaisseaux (%)</label>
                  <input
                    type="number"
                    value={bonusShips}
                    onChange={(e) => setBonusShips(Number(e.target.value))}
                    className="w-full bg-[#151924] border border-[#2E384D] rounded-lg px-3 py-2 text-white"
                    min="0"
                    max="200"
                    data-testid="input-bonus-ships"
                  />
                </div>
              </div>

              <div className="bg-[#151924] rounded-lg p-4 mb-6">
                <h3 className="font-bold text-white mb-3">Composition de la flotte</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                  {ships.map(ship => (
                    <div 
                      key={ship.id} 
                      className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-2 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex flex-col items-center">
                        <img 
                          src={ship.img} 
                          alt={ship.name}
                          className="w-12 h-12 object-contain mb-1"
                          title={ship.name}
                        />
                        <span className="text-xs text-gray-400 mb-1">{ship.shortName}</span>
                        <input
                          type="number"
                          value={fleetCounts[ship.id] || ""}
                          onChange={(e) => updateFleetCount(ship.id, Number(e.target.value) || 0)}
                          placeholder="0"
                          className="w-full bg-[#151924] border border-[#2E384D] rounded px-1 py-1 text-white text-center text-sm"
                          min="0"
                          data-testid={`input-ship-${ship.id}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-violet-900/20 border border-violet-700/30 rounded-lg p-3 mb-6">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Points Expédition : </span>
                    <span className={`font-bold ${calculations.totalExpoPoints > calculations.maxPoints ? "text-red-400" : "text-white"}`}>
                      {calculations.totalExpoPoints.toLocaleString()} 
                      {calculations.totalExpoPoints > calculations.maxPoints && ` → ${calculations.cappedPoints.toLocaleString()}`}
                    </span>
                    <span className="text-gray-500"> / {calculations.maxPoints.toLocaleString()} max</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Multiplicateur : </span>
                    <span className="font-bold text-primary">×{calculations.totalMultiplier.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Capacité : </span>
                    <span className="font-bold text-white">{calculations.totalCapacity.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-green-400 mb-3">Ressources trouvables (max)</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Métal :</span>
                      <span className="text-green-400 font-bold text-lg">{calculations.maxMetal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Cristal :</span>
                      <span className="text-cyan-400 font-bold text-lg">{calculations.maxCrystal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Deutérium :</span>
                      <span className="text-blue-400 font-bold text-lg">{calculations.maxDeut.toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs mt-3">
                    Basé sur un facteur max de 200 (trouvaille X-Large, 1% de chance)
                  </p>
                </div>

                <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-4">
                  <h3 className="font-bold text-purple-400 mb-3">Matière Noire (max)</h3>
                  <div className="text-3xl font-bold text-purple-400">
                    {calculations.maxDarkMatter.toLocaleString()}
                  </div>
                  <p className="text-gray-500 text-xs mt-3">
                    Explorateur + Éclaireur = ×4 bonus
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                <h3 className="font-bold text-blue-400 mb-3">Vaisseaux trouvables (max)</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                  {ships.filter(s => s.id !== "edm").map(ship => (
                    <div key={ship.id} className="flex items-center gap-2 bg-[#151924] rounded px-2 py-1">
                      <img src={ship.img} alt={ship.shortName} className="w-6 h-6 object-contain" />
                      <span className={`font-bold text-sm ${calculations.findableShips[ship.id]?.max > 0 ? "text-blue-400" : "text-gray-600"}`}>
                        {calculations.findableShips[ship.id]?.max || 0}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  Note : Les Étoiles de la Mort ne peuvent pas être trouvées en expédition
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-amber-400 mb-2">Durée recommandée : 1h</h3>
                  <p className="text-gray-300 text-sm mb-2">
                    <strong className="text-white">Gardez toujours la durée à 1h !</strong> Les retards sont impactés par le temps passé en expédition.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Si vous voulez que vos expéditions reviennent plus tard, <strong className="text-white">diminuez la vitesse de la flotte</strong> 
                    au lieu d'augmenter la durée.
                  </p>
                </div>
              </div>
            </motion.div>

            <RelatedGuides currentGuide="expeditions" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

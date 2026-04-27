import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Shield, Calculator, RotateCcw } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import RelatedGuides from "@/components/RelatedGuides";

import imgPetitTransporteur from "@assets/ogame_ships/petit-transporteur.png";
import imgGrandTransporteur from "@assets/ogame_ships/grand-transporteur.png";
import imgRecycleur from "@assets/ogame_ships/recycleur.png";
import imgChasseurLeger from "@assets/ogame_ships/chasseur-leger.png";
import imgChasseurLourd from "@assets/ogame_ships/chasseur-lourd.png";
import imgCroiseur from "@assets/ogame_ships/croiseur.png";
import imgVaisseauBataille from "@assets/ogame_ships/vaisseau-bataille.png";
import imgVaisseauColonisation from "@assets/ogame_ships/vaisseau-colonisation.png";
import imgBombardier from "@assets/ogame_ships/bombardier.png";
import imgDestructeur from "@assets/ogame_ships/destructeur.png";
import imgTraqueur from "@assets/ogame_ships/traqueur.png";
import imgEtoileMort from "@assets/ogame_ships/etoile-mort.png";
import imgFaucheur from "@assets/ogame_ships/faucheur.png";
import imgEclaireur from "@assets/ogame_ships/eclaireur.png";
import imgSondeEspionnage from "@assets/ogame_ships/sonde-espionnage.png";
import imgForeuse from "@assets/ogame_ships/foreuse.png";
import imgSatelliteSolaire from "@assets/ogame_ships/satellite-solaire.png";
import imgLanceurMissiles from "@assets/ogame_ships/lanceur-missiles.png";
import imgLaserLeger from "@assets/ogame_ships/laser-leger.png";
import imgLaserLourd from "@assets/ogame_ships/laser-lourd.png";
import imgCanonGauss from "@assets/ogame_ships/canon-gauss.png";
import imgArtillerieIons from "@assets/ogame_ships/artillerie-ions.png";
import imgLanceurPlasma from "@assets/ogame_ships/lanceur-plasma.png";
import imgPetitBouclier from "@assets/ogame_ships/petit-bouclier.png";
import imgGrandBouclier from "@assets/ogame_ships/grand-bouclier.png";
import imgMissileInterception from "@assets/ogame_ships/missile-interception.png";
import imgMissileInterplanetaire from "@assets/ogame_ships/missile-interplanetaire.png";

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

type ShipData = {
  id: string;
  name: string;
  abbrev: string;
  image: string;
  metal: number;
  crystal: number;
  deut: number;
  category: "combat" | "civil";
};

type DefenseData = {
  id: string;
  name: string;
  abbrev: string;
  image: string;
  metal: number;
  crystal: number;
  deut: number;
};

const ships: ShipData[] = [
  { id: "cl", name: "Chasseur Léger", abbrev: "CL", image: imgChasseurLeger, metal: 3000, crystal: 1000, deut: 0, category: "combat" },
  { id: "ch", name: "Chasseur Lourd", abbrev: "CLo", image: imgChasseurLourd, metal: 6000, crystal: 4000, deut: 0, category: "combat" },
  { id: "croiseur", name: "Croiseur", abbrev: "CR", image: imgCroiseur, metal: 20000, crystal: 7000, deut: 2000, category: "combat" },
  { id: "vb", name: "Vaisseau de Bataille", abbrev: "VB", image: imgVaisseauBataille, metal: 45000, crystal: 15000, deut: 0, category: "combat" },
  { id: "bombardier", name: "Bombardier", abbrev: "BB", image: imgBombardier, metal: 50000, crystal: 25000, deut: 15000, category: "combat" },
  { id: "destructeur", name: "Destructeur", abbrev: "DEST", image: imgDestructeur, metal: 60000, crystal: 50000, deut: 15000, category: "combat" },
  { id: "traqueur", name: "Traqueur", abbrev: "TRAQ", image: imgTraqueur, metal: 30000, crystal: 40000, deut: 15000, category: "combat" },
  { id: "edlm", name: "Étoile de la Mort", abbrev: "EDM", image: imgEtoileMort, metal: 5000000, crystal: 4000000, deut: 1000000, category: "combat" },
  { id: "faucheur", name: "Faucheur", abbrev: "FAUCH", image: imgFaucheur, metal: 85000, crystal: 55000, deut: 20000, category: "combat" },
  { id: "eclaireur", name: "Éclaireur", abbrev: "ECL", image: imgEclaireur, metal: 8000, crystal: 15000, deut: 8000, category: "combat" },
  { id: "pt", name: "Petit Transporteur", abbrev: "PT", image: imgPetitTransporteur, metal: 2000, crystal: 2000, deut: 0, category: "civil" },
  { id: "gt", name: "Grand Transporteur", abbrev: "GT", image: imgGrandTransporteur, metal: 6000, crystal: 6000, deut: 0, category: "civil" },
  { id: "recycleur", name: "Recycleur", abbrev: "REC", image: imgRecycleur, metal: 10000, crystal: 6000, deut: 2000, category: "civil" },
  { id: "sonde", name: "Sonde Espionnage", abbrev: "SE", image: imgSondeEspionnage, metal: 0, crystal: 1000, deut: 0, category: "civil" },
  { id: "colo", name: "Vaisseau Colonisation", abbrev: "COLO", image: imgVaisseauColonisation, metal: 10000, crystal: 20000, deut: 10000, category: "civil" },
  { id: "foreuse", name: "Foreuse", abbrev: "FOR", image: imgForeuse, metal: 2000, crystal: 2000, deut: 1000, category: "civil" },
  { id: "satellite", name: "Satellite Solaire", abbrev: "SAT", image: imgSatelliteSolaire, metal: 0, crystal: 2000, deut: 500, category: "civil" },
];

const defenses: DefenseData[] = [
  { id: "lm", name: "Lanceur de Missiles", abbrev: "LM", image: imgLanceurMissiles, metal: 2000, crystal: 0, deut: 0 },
  { id: "ll", name: "Artillerie Laser Légère", abbrev: "LL", image: imgLaserLeger, metal: 1500, crystal: 500, deut: 0 },
  { id: "lh", name: "Artillerie Laser Lourde", abbrev: "LLo", image: imgLaserLourd, metal: 6000, crystal: 2000, deut: 0 },
  { id: "gauss", name: "Canon de Gauss", abbrev: "Gauss", image: imgCanonGauss, metal: 20000, crystal: 15000, deut: 2000 },
  { id: "ions", name: "Artillerie à Ions", abbrev: "Ion", image: imgArtillerieIons, metal: 5000, crystal: 3000, deut: 0 },
  { id: "plasma", name: "Lanceur de Plasma", abbrev: "Plasma", image: imgLanceurPlasma, metal: 50000, crystal: 50000, deut: 30000 },
  { id: "pb", name: "Petit Bouclier", abbrev: "PB", image: imgPetitBouclier, metal: 10000, crystal: 10000, deut: 0 },
  { id: "gb", name: "Grand Bouclier", abbrev: "GB", image: imgGrandBouclier, metal: 50000, crystal: 50000, deut: 0 },
  { id: "mi", name: "Missile Interception", abbrev: "MI", image: imgMissileInterception, metal: 8000, crystal: 0, deut: 2000 },
  { id: "mip", name: "Missile Interplanétaire", abbrev: "MIP", image: imgMissileInterplanetaire, metal: 12500, crystal: 2500, deut: 10000 },
];

export default function GuideCoutFlotte() {
  const [activeTab, setActiveTab] = useState<"fleet" | "defense">("fleet");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [scrapPercentage, setScrapPercentage] = useState(70);

  const updateQuantity = (id: string, value: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, value) }));
  };

  const calculateTotal = (items: (ShipData | DefenseData)[]) => {
    let metal = 0, crystal = 0, deut = 0;
    items.forEach(item => {
      const qty = quantities[item.id] || 0;
      metal += item.metal * qty;
      crystal += item.crystal * qty;
      deut += item.deut * qty;
    });
    return { metal, crystal, deut, total: metal + crystal + deut };
  };

  const fleetTotal = calculateTotal(ships);
  const defenseTotal = calculateTotal(defenses);
  const currentTotal = activeTab === "fleet" ? fleetTotal : defenseTotal;
  const scrapTotal = {
    metal: currentTotal.metal * (scrapPercentage / 100),
    crystal: currentTotal.crystal * (scrapPercentage / 100),
    deut: currentTotal.deut * (scrapPercentage / 100),
    total: currentTotal.total * (scrapPercentage / 100),
  };

  const resetAll = () => setQuantities({});

  const combatShips = ships.filter(s => s.category === "combat");
  const civilShips = ships.filter(s => s.category === "civil");

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-6xl mx-auto"
          >
            <Link href="/tutoriels">
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
                <Calculator className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur de Coûts
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Flotte & Défenses - Calculez précisément vos besoins en ressources
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={() => setActiveTab("fleet")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === "fleet"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-[#1C2230] text-gray-400 hover:text-white border border-[#2E384D]"
                }`}
                data-testid="tab-fleet"
              >
                <Rocket className="w-5 h-5" />
                Flotte
              </button>
              <button
                onClick={() => setActiveTab("defense")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === "defense"
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/20"
                    : "bg-[#1C2230] text-gray-400 hover:text-white border border-[#2E384D]"
                }`}
                data-testid="tab-defense"
              >
                <Shield className="w-5 h-5" />
                Défenses
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl font-bold text-white flex items-center gap-3">
                      {activeTab === "fleet" ? (
                        <>
                          <Rocket className="w-6 h-6 text-cyan-400" />
                          Vaisseaux
                        </>
                      ) : (
                        <>
                          <Shield className="w-6 h-6 text-orange-400" />
                          Défenses
                        </>
                      )}
                    </h2>
                    <button
                      onClick={resetAll}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                      data-testid="button-reset"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Réinitialiser
                    </button>
                  </div>

                  {activeTab === "fleet" ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-orange-400 mb-3">Vaisseaux de combat</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {combatShips.map(ship => (
                            <div key={ship.id} className="bg-[#0B0E14] border border-[#2E384D] rounded-lg p-2 hover:border-orange-500/50 transition-colors">
                              <div className="aspect-square mb-2 rounded overflow-hidden bg-[#151924]">
                                <img src={ship.image} alt={ship.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-[10px] text-gray-400 text-center mb-1 truncate" title={ship.name}>{ship.abbrev}</p>
                              <input
                                type="number"
                                min="0"
                                value={quantities[ship.id] || ""}
                                onChange={(e) => updateQuantity(ship.id, parseInt(e.target.value) || 0)}
                                placeholder="0"
                                className="w-full bg-[#1C2230] border border-[#2E384D] rounded px-2 py-1 text-center text-sm text-orange-400 focus:border-orange-500 focus:outline-none"
                                data-testid={`input-ship-${ship.id}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-cyan-400 mb-3">Vaisseaux civils</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {civilShips.map(ship => (
                            <div key={ship.id} className="bg-[#0B0E14] border border-[#2E384D] rounded-lg p-2 hover:border-cyan-500/50 transition-colors">
                              <div className="aspect-square mb-2 rounded overflow-hidden bg-[#151924]">
                                <img src={ship.image} alt={ship.name} className="w-full h-full object-cover" />
                              </div>
                              <p className="text-[10px] text-gray-400 text-center mb-1 truncate" title={ship.name}>{ship.abbrev}</p>
                              <input
                                type="number"
                                min="0"
                                value={quantities[ship.id] || ""}
                                onChange={(e) => updateQuantity(ship.id, parseInt(e.target.value) || 0)}
                                placeholder="0"
                                className="w-full bg-[#1C2230] border border-[#2E384D] rounded px-2 py-1 text-center text-sm text-cyan-400 focus:border-cyan-500 focus:outline-none"
                                data-testid={`input-ship-${ship.id}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {defenses.map(def => (
                          <div key={def.id} className="bg-[#0B0E14] border border-[#2E384D] rounded-lg p-2 hover:border-red-500/50 transition-colors">
                            <div className="aspect-square mb-2 rounded overflow-hidden bg-[#151924]">
                              <img src={def.image} alt={def.name} className="w-full h-full object-cover" />
                            </div>
                            <p className="text-[10px] text-gray-400 text-center mb-1 truncate" title={def.name}>{def.abbrev}</p>
                            <input
                              type="number"
                              min="0"
                              value={quantities[def.id] || ""}
                              onChange={(e) => updateQuantity(def.id, parseInt(e.target.value) || 0)}
                              placeholder="0"
                              className="w-full bg-[#1C2230] border border-[#2E384D] rounded px-2 py-1 text-center text-sm text-red-400 focus:border-red-500 focus:outline-none"
                              data-testid={`input-defense-${def.id}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 sticky top-6">
                  <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-primary" />
                    Total
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-[#151924] rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-gray-400 to-gray-600"></div>
                        <span className="text-gray-300">Métal</span>
                      </div>
                      <span className="text-white font-bold" data-testid="text-total-metal">{formatNumber(currentTotal.metal)}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#151924] rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-cyan-400 to-blue-600"></div>
                        <span className="text-gray-300">Cristal</span>
                      </div>
                      <span className="text-white font-bold" data-testid="text-total-crystal">{formatNumber(currentTotal.crystal)}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#151924] rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-green-400 to-emerald-600"></div>
                        <span className="text-gray-300">Deutérium</span>
                      </div>
                      <span className="text-white font-bold" data-testid="text-total-deut">{formatNumber(currentTotal.deut)}</span>
                    </div>

                    <div className="border-t border-[#2E384D] pt-4">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/20 to-cyan-900/20 rounded-lg border border-primary/30">
                        <span className="text-primary font-medium">Total ressources</span>
                        <span className="text-white font-bold text-lg" data-testid="text-total-all">{formatNumber(currentTotal.total)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#151924] rounded-lg border border-[#2E384D]">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-white">Estimation ferrailleur</h3>
                        <p className="text-xs text-gray-400 mt-1">
                          Cet outil permet de simuler ce que le ferrailleur du jeu peut vous rendre selon le pourcentage choisi.
                        </p>
                      </div>
                      <span className="text-lg font-bold text-orange-400" data-testid="text-scrap-percentage">
                        {scrapPercentage}%
                      </span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={scrapPercentage}
                      onChange={(e) => setScrapPercentage(parseInt(e.target.value) || 0)}
                      className="w-full accent-orange-500"
                      data-testid="input-scrap-percentage"
                    />

                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Métal récupéré</span>
                        <span className="text-white font-semibold" data-testid="text-scrap-metal">
                          {formatNumber(scrapTotal.metal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Cristal récupéré</span>
                        <span className="text-white font-semibold" data-testid="text-scrap-crystal">
                          {formatNumber(scrapTotal.crystal)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Deutérium récupéré</span>
                        <span className="text-white font-semibold" data-testid="text-scrap-deut">
                          {formatNumber(scrapTotal.deut)}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-[#2E384D] flex items-center justify-between">
                        <span className="text-orange-400 font-medium">Total ferrailleur</span>
                        <span className="text-white font-bold" data-testid="text-scrap-total">
                          {formatNumber(scrapTotal.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#151924] rounded-lg">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Détail par unité</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {(activeTab === "fleet" ? ships : defenses)
                        .filter(item => (quantities[item.id] || 0) > 0)
                        .map(item => {
                          const qty = quantities[item.id] || 0;
                          const itemTotal = item.metal + item.crystal + item.deut;
                          return (
                            <div key={item.id} className="flex items-center justify-between text-sm">
                              <span className="text-gray-300">{qty.toLocaleString("fr-FR")}× {item.abbrev}</span>
                              <span className="text-gray-500">{formatNumber(itemTotal * qty)}</span>
                            </div>
                          );
                        })}
                      {Object.values(quantities).every(q => !q || q === 0) && (
                        <p className="text-gray-500 text-sm text-center py-2">Aucune unité sélectionnée</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <RelatedGuides currentGuide="cout-flotte" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

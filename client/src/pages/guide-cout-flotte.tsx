import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Shield, Calculator, Info, ChevronDown, ChevronUp } from "lucide-react";
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

type ShipData = {
  id: string;
  name: string;
  image: string;
  metal: number;
  crystal: number;
  deut: number;
};

type DefenseData = {
  id: string;
  name: string;
  image: string;
  metal: number;
  crystal: number;
  deut: number;
};

const ships: ShipData[] = [
  { id: "pt", name: "Petit Transporteur", image: "/attached_assets/ogame_ships/petit-transporteur.png", metal: 2000, crystal: 2000, deut: 0 },
  { id: "gt", name: "Grand Transporteur", image: "/attached_assets/ogame_ships/grand-transporteur.png", metal: 6000, crystal: 6000, deut: 0 },
  { id: "cl", name: "Chasseur Léger", image: "/attached_assets/ogame_ships/chasseur-leger.png", metal: 3000, crystal: 1000, deut: 0 },
  { id: "ch", name: "Chasseur Lourd", image: "/attached_assets/ogame_ships/chasseur-lourd.png", metal: 6000, crystal: 4000, deut: 0 },
  { id: "croiseur", name: "Croiseur", image: "/attached_assets/ogame_ships/croiseur.png", metal: 20000, crystal: 7000, deut: 2000 },
  { id: "vb", name: "Vaisseau de Bataille", image: "/attached_assets/ogame_ships/vaisseau-bataille.png", metal: 45000, crystal: 15000, deut: 0 },
  { id: "colo", name: "Vaisseau Colonisation", image: "/attached_assets/ogame_ships/vaisseau-colonisation.png", metal: 10000, crystal: 20000, deut: 10000 },
  { id: "recycleur", name: "Recycleur", image: "/attached_assets/ogame_ships/recycleur.png", metal: 10000, crystal: 6000, deut: 2000 },
  { id: "sonde", name: "Sonde Espionnage", image: "/attached_assets/ogame_ships/sonde-espionnage.png", metal: 0, crystal: 1000, deut: 0 },
  { id: "bombardier", name: "Bombardier", image: "/attached_assets/ogame_ships/bombardier.png", metal: 50000, crystal: 25000, deut: 15000 },
  { id: "destructeur", name: "Destructeur", image: "/attached_assets/ogame_ships/destructeur.png", metal: 60000, crystal: 50000, deut: 15000 },
  { id: "traqueur", name: "Traqueur", image: "/attached_assets/ogame_ships/traqueur.png", metal: 30000, crystal: 40000, deut: 15000 },
  { id: "edlm", name: "Étoile de la Mort", image: "/attached_assets/ogame_ships/etoile-mort.png", metal: 5000000, crystal: 4000000, deut: 1000000 },
  { id: "eclaireur", name: "Éclaireur", image: "/attached_assets/ogame_ships/eclaireur.png", metal: 8000, crystal: 15000, deut: 8000 },
  { id: "faucheur", name: "Faucheur", image: "/attached_assets/ogame_ships/faucheur.png", metal: 85000, crystal: 55000, deut: 20000 },
  { id: "foreuse", name: "Foreuse", image: "/attached_assets/ogame_ships/foreuse.png", metal: 2000, crystal: 2000, deut: 1000 },
  { id: "satellite", name: "Satellite Solaire", image: "/attached_assets/ogame_ships/satellite-solaire.png", metal: 0, crystal: 2000, deut: 500 },
];

const defenses: DefenseData[] = [
  { id: "lm", name: "Lanceur de Missiles", image: "/attached_assets/ogame_ships/lanceur-missiles.png", metal: 2000, crystal: 0, deut: 0 },
  { id: "ll", name: "Artillerie Laser Légère", image: "/attached_assets/ogame_ships/laser-leger.png", metal: 1500, crystal: 500, deut: 0 },
  { id: "lh", name: "Artillerie Laser Lourde", image: "/attached_assets/ogame_ships/laser-lourd.png", metal: 6000, crystal: 2000, deut: 0 },
  { id: "gauss", name: "Canon de Gauss", image: "/attached_assets/ogame_ships/canon-gauss.png", metal: 20000, crystal: 15000, deut: 2000 },
  { id: "ions", name: "Artillerie à Ions", image: "/attached_assets/ogame_ships/artillerie-ions.png", metal: 5000, crystal: 3000, deut: 0 },
  { id: "plasma", name: "Lanceur de Plasma", image: "/attached_assets/ogame_ships/lanceur-plasma.png", metal: 50000, crystal: 50000, deut: 30000 },
  { id: "pb", name: "Petit Bouclier", image: "/attached_assets/ogame_ships/petit-bouclier.png", metal: 10000, crystal: 10000, deut: 0 },
  { id: "gb", name: "Grand Bouclier", image: "/attached_assets/ogame_ships/grand-bouclier.png", metal: 50000, crystal: 50000, deut: 0 },
  { id: "mi", name: "Missile Interception", image: "/attached_assets/ogame_ships/missile-interception.png", metal: 8000, crystal: 0, deut: 2000 },
  { id: "mip", name: "Missile Interplanétaire", image: "/attached_assets/ogame_ships/missile-interplanetaire.png", metal: 12500, crystal: 2500, deut: 10000 },
];

export default function GuideCoutFlotte() {
  const [activeTab, setActiveTab] = useState<"fleet" | "defense">("fleet");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [showAllShips, setShowAllShips] = useState(false);
  const [showAllDefenses, setShowAllDefenses] = useState(false);

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

  const resetAll = () => setQuantities({});

  const displayedShips = showAllShips ? ships : ships.slice(0, 8);
  const displayedDefenses = showAllDefenses ? defenses : defenses.slice(0, 6);

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
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Réinitialiser
                    </button>
                  </div>

                  {activeTab === "fleet" ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {displayedShips.map(ship => (
                          <div
                            key={ship.id}
                            className="flex items-center gap-3 p-3 bg-[#151924] rounded-lg hover:bg-[#1a1f2e] transition-colors"
                          >
                            <img
                              src={ship.image}
                              alt={ship.name}
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{ship.name}</p>
                              <p className="text-gray-500 text-xs">
                                {formatNumber(ship.metal + ship.crystal + ship.deut)} total
                              </p>
                            </div>
                            <input
                              type="number"
                              value={quantities[ship.id] || ""}
                              onChange={(e) => updateQuantity(ship.id, parseInt(e.target.value) || 0)}
                              placeholder="0"
                              className="w-20 bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-right text-sm"
                            />
                          </div>
                        ))}
                      </div>
                      {ships.length > 8 && (
                        <button
                          onClick={() => setShowAllShips(!showAllShips)}
                          className="w-full mt-4 flex items-center justify-center gap-2 p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showAllShips ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Voir moins
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Voir tous les vaisseaux ({ships.length})
                            </>
                          )}
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {displayedDefenses.map(def => (
                          <div
                            key={def.id}
                            className="flex items-center gap-3 p-3 bg-[#151924] rounded-lg hover:bg-[#1a1f2e] transition-colors"
                          >
                            <img
                              src={def.image}
                              alt={def.name}
                              className="w-12 h-12 object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm font-medium truncate">{def.name}</p>
                              <p className="text-gray-500 text-xs">
                                {formatNumber(def.metal + def.crystal + def.deut)} total
                              </p>
                            </div>
                            <input
                              type="number"
                              value={quantities[def.id] || ""}
                              onChange={(e) => updateQuantity(def.id, parseInt(e.target.value) || 0)}
                              placeholder="0"
                              className="w-20 bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-right text-sm"
                            />
                          </div>
                        ))}
                      </div>
                      {defenses.length > 6 && (
                        <button
                          onClick={() => setShowAllDefenses(!showAllDefenses)}
                          className="w-full mt-4 flex items-center justify-center gap-2 p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showAllDefenses ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Voir moins
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Voir toutes les défenses ({defenses.length})
                            </>
                          )}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 sticky top-6">
                  <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    Coût Total
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-gray-400">Métal</span>
                      <span className="font-mono text-lg text-gray-300">{formatNumber(currentTotal.metal)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-cyan-400">Cristal</span>
                      <span className="font-mono text-lg text-cyan-300">{formatNumber(currentTotal.crystal)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-[#151924] rounded-lg">
                      <span className="text-teal-400">Deutérium</span>
                      <span className="font-mono text-lg text-teal-300">{formatNumber(currentTotal.deut)}</span>
                    </div>
                    <hr className="border-[#2E384D]" />
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary/20 to-cyan-900/20 border border-primary/30 rounded-lg">
                      <span className="text-primary font-bold">Total</span>
                      <span className="font-mono text-xl text-white">{formatNumber(currentTotal.total)}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-400">
                        <p>Les coûts affichés sont les coûts unitaires de base.</p>
                        <p className="mt-1">Multipliés par la quantité saisie.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {activeTab === "fleet" && fleetTotal.total > 0 && (
                  <div className="bg-blue-900/20 border border-blue-700/30 rounded-xl p-4">
                    <h4 className="font-bold text-blue-300 mb-2 text-sm">Points de flotte</h4>
                    <p className="font-mono text-xl text-blue-200">
                      {formatNumber(fleetTotal.total / 1000)} pts
                    </p>
                  </div>
                )}

                {activeTab === "defense" && defenseTotal.total > 0 && (
                  <div className="bg-orange-900/20 border border-orange-700/30 rounded-xl p-4">
                    <h4 className="font-bold text-orange-300 mb-2 text-sm">Points de défense</h4>
                    <p className="font-mono text-xl text-orange-200">
                      {formatNumber(defenseTotal.total / 1000)} pts
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h3 className="font-bold text-white mb-4">Tableau des coûts unitaires</h3>
                <div className="overflow-x-auto">
                  {activeTab === "fleet" ? (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#2E384D]">
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Vaisseau</th>
                          <th className="text-right py-2 px-3 text-gray-400 font-medium">Métal</th>
                          <th className="text-right py-2 px-3 text-cyan-400 font-medium">Cristal</th>
                          <th className="text-right py-2 px-3 text-teal-400 font-medium">Deut</th>
                          <th className="text-right py-2 px-3 text-white font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ships.map(ship => (
                          <tr key={ship.id} className="border-b border-[#2E384D]/50 hover:bg-[#151924]">
                            <td className="py-2 px-3 text-white">{ship.name}</td>
                            <td className="text-right py-2 px-3 text-gray-300 font-mono">{formatNumber(ship.metal)}</td>
                            <td className="text-right py-2 px-3 text-cyan-300 font-mono">{formatNumber(ship.crystal)}</td>
                            <td className="text-right py-2 px-3 text-teal-300 font-mono">{formatNumber(ship.deut)}</td>
                            <td className="text-right py-2 px-3 text-white font-mono font-bold">{formatNumber(ship.metal + ship.crystal + ship.deut)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-[#2E384D]">
                          <th className="text-left py-2 px-3 text-gray-400 font-medium">Défense</th>
                          <th className="text-right py-2 px-3 text-gray-400 font-medium">Métal</th>
                          <th className="text-right py-2 px-3 text-cyan-400 font-medium">Cristal</th>
                          <th className="text-right py-2 px-3 text-teal-400 font-medium">Deut</th>
                          <th className="text-right py-2 px-3 text-white font-medium">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {defenses.map(def => (
                          <tr key={def.id} className="border-b border-[#2E384D]/50 hover:bg-[#151924]">
                            <td className="py-2 px-3 text-white">{def.name}</td>
                            <td className="text-right py-2 px-3 text-gray-300 font-mono">{formatNumber(def.metal)}</td>
                            <td className="text-right py-2 px-3 text-cyan-300 font-mono">{formatNumber(def.crystal)}</td>
                            <td className="text-right py-2 px-3 text-teal-300 font-mono">{formatNumber(def.deut)}</td>
                            <td className="text-right py-2 px-3 text-white font-mono font-bold">{formatNumber(def.metal + def.crystal + def.deut)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-12">
              <RelatedGuides 
                currentGuide="cout-flotte"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

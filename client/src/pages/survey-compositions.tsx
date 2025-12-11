import { useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Shield, Send, CheckCircle, Info, BarChart3, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

import imgPetitTransporteur from "@assets/ogame_ships/petit-transporteur.png";
import imgGrandTransporteur from "@assets/ogame_ships/grand-transporteur.png";
import imgRecycleur from "@assets/ogame_ships/recycleur.png";
import imgChasseurLeger from "@assets/ogame_ships/chasseur-leger.png";
import imgChasseurLourd from "@assets/ogame_ships/chasseur-lourd.png";
import imgCroiseur from "@assets/ogame_ships/croiseur.png";
import imgVaisseauBataille from "@assets/ogame_ships/vaisseau-bataille.png";
import imgBombardier from "@assets/ogame_ships/bombardier.png";
import imgDestructeur from "@assets/ogame_ships/destructeur.png";
import imgTraqueur from "@assets/ogame_ships/traqueur.png";
import imgEtoileMort from "@assets/ogame_ships/etoile-mort.png";
import imgFaucheur from "@assets/ogame_ships/faucheur.png";
import imgEclaireur from "@assets/ogame_ships/eclaireur.png";
import imgSondeEspionnage from "@assets/ogame_ships/sonde-espionnage.png";
import imgLanceurMissiles from "@assets/ogame_ships/lanceur-missiles.png";
import imgLaserLeger from "@assets/ogame_ships/laser-leger.png";
import imgLaserLourd from "@assets/ogame_ships/laser-lourd.png";
import imgCanonGauss from "@assets/ogame_ships/canon-gauss.png";
import imgArtillerieIons from "@assets/ogame_ships/artillerie-ions.png";
import imgLanceurPlasma from "@assets/ogame_ships/lanceur-plasma.png";
import imgPetitBouclier from "@assets/ogame_ships/petit-bouclier.png";
import imgGrandBouclier from "@assets/ogame_ships/grand-bouclier.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const fleetShips = [
  { id: "pt", name: "Petit Transporteur", abbrev: "PT", image: imgPetitTransporteur, category: "civil" },
  { id: "gt", name: "Grand Transporteur", abbrev: "GT", image: imgGrandTransporteur, category: "civil" },
  { id: "rec", name: "Recycleur", abbrev: "REC", image: imgRecycleur, category: "civil" },
  { id: "sonde", name: "Sonde d'Espionnage", abbrev: "SE", image: imgSondeEspionnage, category: "civil" },
  { id: "cl", name: "Chasseur Léger", abbrev: "CL", image: imgChasseurLeger, category: "combat" },
  { id: "clo", name: "Chasseur Lourd", abbrev: "CLo", image: imgChasseurLourd, category: "combat" },
  { id: "cr", name: "Croiseur", abbrev: "CR", image: imgCroiseur, category: "combat" },
  { id: "vb", name: "Vaisseau de Bataille", abbrev: "VB", image: imgVaisseauBataille, category: "combat" },
  { id: "bb", name: "Bombardier", abbrev: "BB", image: imgBombardier, category: "combat" },
  { id: "dest", name: "Destructeur", abbrev: "DEST", image: imgDestructeur, category: "combat" },
  { id: "traq", name: "Traqueur", abbrev: "TRAQ", image: imgTraqueur, category: "combat" },
  { id: "edm", name: "Étoile de la Mort", abbrev: "EDM", image: imgEtoileMort, category: "combat" },
  { id: "fauch", name: "Faucheur", abbrev: "FAUCH", image: imgFaucheur, category: "combat" },
  { id: "ecl", name: "Éclaireur", abbrev: "ECL", image: imgEclaireur, category: "combat" },
];

const defenseUnits = [
  { id: "lm", name: "Lanceur de Missiles", abbrev: "LM", image: imgLanceurMissiles },
  { id: "ll", name: "Artillerie Laser Légère", abbrev: "LL", image: imgLaserLeger },
  { id: "llo", name: "Artillerie Laser Lourde", abbrev: "LLo", image: imgLaserLourd },
  { id: "gauss", name: "Canon de Gauss", abbrev: "Gauss", image: imgCanonGauss },
  { id: "ion", name: "Artillerie à Ions", abbrev: "Ion", image: imgArtillerieIons },
  { id: "plasma", name: "Lanceur de Plasma", abbrev: "Plasma", image: imgLanceurPlasma },
  { id: "pb", name: "Petit Bouclier", abbrev: "PB", image: imgPetitBouclier },
  { id: "gb", name: "Grand Bouclier", abbrev: "GB", image: imgGrandBouclier },
];

export default function SurveyCompositionsPage() {
  return (
    <Layout>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Link href="/tutoriels">
              <Button variant="ghost" className="text-gray-400 hover:text-white mb-4" data-testid="btn-back-tutorials">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux tutoriels
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-primary text-sm mb-6">
              <BarChart3 className="w-4 h-4" />
              <span>Sondage Communautaire</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Quelle est votre composition idéale ?
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Participez anonymement à notre sondage pour nous aider à comprendre les tendances de la communauté OGame francophone.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-700/30 rounded-xl p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-cyan-300 mb-2">Pourquoi ce sondage ?</h3>
                <p className="text-cyan-200/80 text-sm mb-3">
                  Les résultats collectés permettront de réaliser un compte rendu détaillé et de créer des guides sur les tendances de la communauté. 
                  Vos réponses sont <strong>100% anonymes</strong> - aucune information personnelle n'est collectée.
                </p>
                <h4 className="font-semibold text-cyan-300 text-sm mb-2">Comment participer ?</h4>
                <ul className="text-cyan-200/80 text-sm space-y-1 list-disc list-inside">
                  <li>Entrez les quantités souhaitées pour chaque unité</li>
                  <li>Vous pouvez laisser les cases à 0 si vous n'utilisez pas certaines unités</li>
                  <li>Ajoutez un commentaire si vous le souhaitez</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <div className="grid gap-8">
            <FleetSurveyCard />
            <DefenseSurveyCard />
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FleetSurveyCard() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [universe, setUniverse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { composition: string; strategy: string; universe: string }) => {
      const res = await fetch("/api/surveys/fleet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erreur lors de l'envoi");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setQuantities({});
      setComment("");
      setUniverse("");
    },
  });

  const handleQuantityChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  const formatComposition = () => {
    const parts: string[] = [];
    fleetShips.forEach(ship => {
      const qty = quantities[ship.id] || 0;
      if (qty > 0) {
        parts.push(`${ship.abbrev}: ${qty.toLocaleString("fr-FR")}`);
      }
    });
    return parts.join(" | ");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const composition = formatComposition();
    if (composition.length < 5) return;
    mutation.mutate({ composition, strategy: comment, universe });
  };

  const hasAnyQuantity = Object.values(quantities).some(q => q > 0);
  const combatShips = fleetShips.filter(s => s.category === "combat");
  const civilShips = fleetShips.filter(s => s.category === "civil");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden"
    >
      <div className="p-6 border-b border-[#2E384D]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Composition de Flotte Idéale</h2>
            <p className="text-gray-400 text-sm">Pour ceux qui font de la flotte</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {submitted ? (
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-300 mb-2">Merci pour votre participation !</h3>
            <p className="text-green-200/80 text-sm">Votre composition de flotte a été enregistrée.</p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="mt-4"
              data-testid="button-submit-another-fleet"
            >
              Soumettre une autre composition
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-orange-400 mb-3">Vaisseaux de combat</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {combatShips.map(ship => (
                  <div key={ship.id} className="bg-[#0B0E14] border border-[#2E384D] rounded-lg p-2 hover:border-orange-500/50 transition-colors">
                    <div className="aspect-square mb-2 rounded overflow-hidden">
                      <img src={ship.image} alt={ship.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-gray-400 text-center mb-1 truncate" title={ship.name}>{ship.abbrev}</p>
                    <input
                      type="number"
                      min="0"
                      value={quantities[ship.id] || ""}
                      onChange={(e) => handleQuantityChange(ship.id, e.target.value)}
                      placeholder="0"
                      className="w-full bg-[#1C2230] border border-[#2E384D] rounded px-2 py-1 text-center text-sm text-orange-400 focus:border-orange-500 focus:outline-none"
                      data-testid={`input-fleet-${ship.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cyan-400 mb-3">Vaisseaux civils</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {civilShips.map(ship => (
                  <div key={ship.id} className="bg-[#0B0E14] border border-[#2E384D] rounded-lg p-2 hover:border-cyan-500/50 transition-colors">
                    <div className="aspect-square mb-2 rounded overflow-hidden">
                      <img src={ship.image} alt={ship.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-gray-400 text-center mb-1 truncate" title={ship.name}>{ship.abbrev}</p>
                    <input
                      type="number"
                      min="0"
                      value={quantities[ship.id] || ""}
                      onChange={(e) => handleQuantityChange(ship.id, e.target.value)}
                      placeholder="0"
                      className="w-full bg-[#1C2230] border border-[#2E384D] rounded px-2 py-1 text-center text-sm text-cyan-400 focus:border-cyan-500 focus:outline-none"
                      data-testid={`input-fleet-${ship.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type d'univers (optionnel)
                </label>
                <select
                  value={universe}
                  onChange={(e) => setUniverse(e.target.value)}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                  data-testid="select-fleet-universe"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="x1">Univers x1</option>
                  <option value="x2-x4">Univers x2-x4</option>
                  <option value="x5-x7">Univers x5-x7</option>
                  <option value="x8+">Univers x8+</option>
                  <option value="speed">Univers Speed/War</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Commentaire (optionnel)
                </label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ex: Raider agressif, expé..."
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                  data-testid="input-fleet-comment"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending || !hasAnyQuantity}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              data-testid="button-submit-fleet"
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Envoi en cours...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Envoyer ma composition de flotte
                </span>
              )}
            </Button>

            {mutation.isError && (
              <p className="text-red-400 text-sm text-center">{mutation.error.message}</p>
            )}
          </form>
        )}
      </div>
    </motion.div>
  );
}

function DefenseSurveyCard() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [comment, setComment] = useState("");
  const [universe, setUniverse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: { composition: string; strategy: string; universe: string }) => {
      const res = await fetch("/api/surveys/defense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Erreur lors de l'envoi");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setQuantities({});
      setComment("");
      setUniverse("");
    },
  });

  const handleQuantityChange = (id: string, value: string) => {
    const num = parseInt(value) || 0;
    setQuantities(prev => ({ ...prev, [id]: num }));
  };

  const formatComposition = () => {
    const parts: string[] = [];
    defenseUnits.forEach(unit => {
      const qty = quantities[unit.id] || 0;
      if (qty > 0) {
        parts.push(`${unit.abbrev}: ${qty.toLocaleString("fr-FR")}`);
      }
    });
    return parts.join(" | ");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const composition = formatComposition();
    if (composition.length < 5) return;
    mutation.mutate({ composition, strategy: comment, universe });
  };

  const hasAnyQuantity = Object.values(quantities).some(q => q > 0);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden"
    >
      <div className="p-6 border-b border-[#2E384D]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Composition de Défense Idéale</h2>
            <p className="text-gray-400 text-sm">Pour ceux qui font de la défense</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {submitted ? (
          <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-300 mb-2">Merci pour votre participation !</h3>
            <p className="text-green-200/80 text-sm">Votre composition de défense a été enregistrée.</p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="mt-4"
              data-testid="button-submit-another-defense"
            >
              Soumettre une autre composition
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-cyan-400 mb-3">Installations de défense</h3>
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3">
                {defenseUnits.map(unit => (
                  <div key={unit.id} className="bg-[#0B0E14] border border-[#2E384D] rounded-lg p-2 hover:border-cyan-500/50 transition-colors">
                    <div className="aspect-square mb-2 rounded overflow-hidden">
                      <img src={unit.image} alt={unit.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-gray-400 text-center mb-1 truncate" title={unit.name}>{unit.abbrev}</p>
                    <input
                      type="number"
                      min="0"
                      value={quantities[unit.id] || ""}
                      onChange={(e) => handleQuantityChange(unit.id, e.target.value)}
                      placeholder="0"
                      className="w-full bg-[#1C2230] border border-[#2E384D] rounded px-2 py-1 text-center text-sm text-cyan-400 focus:border-cyan-500 focus:outline-none"
                      data-testid={`input-defense-${unit.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type d'univers (optionnel)
                </label>
                <select
                  value={universe}
                  onChange={(e) => setUniverse(e.target.value)}
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                  data-testid="select-defense-universe"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="x1">Univers x1</option>
                  <option value="x2-x4">Univers x2-x4</option>
                  <option value="x5-x7">Univers x5-x7</option>
                  <option value="x8+">Univers x8+</option>
                  <option value="speed">Univers Speed/War</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Commentaire (optionnel)
                </label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Ex: Défense passive, anti-raid..."
                  className="w-full bg-[#0B0E14] border border-[#2E384D] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                  data-testid="input-defense-comment"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending || !hasAnyQuantity}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
              data-testid="button-submit-defense"
            >
              {mutation.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Envoi en cours...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Envoyer ma composition de défense
                </span>
              )}
            </Button>

            {mutation.isError && (
              <p className="text-red-400 text-sm text-center">{mutation.error.message}</p>
            )}
          </form>
        )}
      </div>
    </motion.div>
  );
}

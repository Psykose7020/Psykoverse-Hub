import { motion } from "framer-motion";
import { Rocket, Ship, Shield, ExternalLink, Zap, Target, Package, Fuel, Info, Crosshair, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import RelatedGuides from "@/components/RelatedGuides";

import imgPetitTransporteur from "@assets/ogame_ships/petit-transporteur.png";
import imgGrandTransporteur from "@assets/ogame_ships/grand-transporteur.png";
import imgVaisseauColonisation from "@assets/ogame_ships/vaisseau-colonisation.png";
import imgRecycleur from "@assets/ogame_ships/recycleur.png";
import imgSondeEspionnage from "@assets/ogame_ships/sonde-espionnage.png";
import imgSatelliteSolaire from "@assets/ogame_ships/satellite-solaire.png";
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

const vaisseauxCivils = [
  { 
    nom: "Petit Transporteur", 
    abbr: "PT", 
    role: "Transport léger et rapide",
    metal: 2000, cristal: 2000, deut: 0,
    bouclier: 10, attaque: 5, fret: 5000,
    vitesse: 10000, conso: 20,
    description: "Idéal pour les petits pillages. Devient plus rapide que le GT au niveau 5 de Réacteur à impulsion.",
    rapidfire: "Aucun particulier",
    conseil: "Utilisez-les comme 'tampon' dans vos flottes de combat pour absorber les dégâts.",
    image: imgPetitTransporteur
  },
  { 
    nom: "Grand Transporteur", 
    abbr: "GT", 
    role: "Transport lourd",
    metal: 6000, cristal: 6000, deut: 0,
    bouclier: 25, attaque: 5, fret: 25000,
    vitesse: 7500, conso: 50,
    description: "5x plus de capacité que le PT. Plus rentable pour transporter de grandes quantités.",
    rapidfire: "Aucun particulier",
    conseil: "Privilégiez le GT pour les longs trajets - meilleur ratio fret/consommation.",
    image: imgGrandTransporteur
  },
  { 
    nom: "Vaisseau de Colonisation", 
    abbr: "VC", 
    role: "Coloniser de nouvelles planètes",
    metal: 10000, cristal: 20000, deut: 10000,
    bouclier: 100, attaque: 50, fret: 7500,
    vitesse: 2500, conso: 1000,
    description: "Permet de coloniser une nouvelle planète. Peut aussi transporter des ressources.",
    rapidfire: "Aucun particulier",
    conseil: "Envoyez-le avec des ressources pour développer rapidement votre nouvelle colonie.",
    image: imgVaisseauColonisation
  },
  { 
    nom: "Recycleur", 
    abbr: "REC", 
    role: "Recycler les champs de débris",
    metal: 10000, cristal: 6000, deut: 2000,
    bouclier: 10, attaque: 1, fret: 20000,
    vitesse: 2000, conso: 300,
    description: "Récupère 30% du métal et cristal des vaisseaux détruits dans les CDR.",
    rapidfire: "Aucun particulier",
    conseil: "Essentiel pour rentabiliser vos combats. Toujours prévoir assez de recycleurs !",
    image: imgRecycleur
  },
  { 
    nom: "Sonde d'Espionnage", 
    abbr: "SE", 
    role: "Espionner les planètes",
    metal: 0, cristal: 1000, deut: 0,
    bouclier: 0, attaque: 0, fret: 5,
    vitesse: 100000000, conso: 1,
    description: "Vitesse incommensurable. Efficacité dépend du niveau de technologie Espionnage.",
    rapidfire: "Vulnérable à presque tous les vaisseaux",
    conseil: "Envoyez plusieurs sondes pour obtenir plus de détails sur la cible.",
    image: imgSondeEspionnage
  },
  { 
    nom: "Satellite Solaire", 
    abbr: "SAT", 
    role: "Production d'énergie",
    metal: 0, cristal: 2000, deut: 500,
    bouclier: 1, attaque: 1, fret: 0,
    vitesse: 0, conso: 0,
    description: "Produit de l'énergie selon la température de la planète. Ne peut pas se déplacer.",
    rapidfire: "Vulnérable à tous les vaisseaux",
    conseil: "Sur planètes chaudes, très rentables. Attention : détruits lors des attaques !",
    image: imgSatelliteSolaire
  }
];

const vaisseauxCombat = [
  { 
    nom: "Chasseur Léger", 
    abbr: "CL", 
    role: "Tampon léger & rentabilité",
    metal: 3000, cristal: 1000, deut: 0,
    bouclier: 10, attaque: 50, fret: 50,
    vitesse: 12500, conso: 20,
    description: "Le vaisseau le plus rentable du jeu ! À coût égal, il surpasse toutes les flottes (sauf face aux Croiseurs qui le détruisent facilement).",
    rapidfire: "Vulnérable aux Croiseurs (x6)",
    conseil: "Excellent rapport qualité-prix. Utilisez-le en masse comme tampon pour absorber les dégâts et protéger vos vaisseaux lourds.",
    image: imgChasseurLeger
  },
  { 
    nom: "Chasseur Lourd", 
    abbr: "CLo", 
    role: "Tampon lourd",
    metal: 6000, cristal: 4000, deut: 0,
    bouclier: 25, attaque: 150, fret: 100,
    vitesse: 10000, conso: 75,
    description: "Un excellent tampon lourd ! Plus résistant que le CL, il absorbe plus de dégâts avant d'être détruit.",
    rapidfire: "x3 contre Sondes, x2 contre Satellites",
    conseil: "Très bon choix comme tampon robuste. Économe en deutérium et efficace en début d'univers.",
    image: imgChasseurLourd
  },
  { 
    nom: "Croiseur", 
    abbr: "CR", 
    role: "Anti-tampon",
    metal: 20000, cristal: 7000, deut: 2000,
    bouclier: 50, attaque: 400, fret: 800,
    vitesse: 15000, conso: 300,
    description: "Le tueur de tampons par excellence ! Son rapidfire x6 contre les CL en fait le meilleur anti-tampon du jeu.",
    rapidfire: "x6 contre CL, x10 contre Lance-missiles",
    conseil: "Indispensable pour éliminer rapidement les tampons adverses. Le vaisseau de combat le plus rapide.",
    image: imgCroiseur
  },
  { 
    nom: "Vaisseau de Bataille", 
    abbr: "VdB", 
    role: "Combat polyvalent",
    metal: 45000, cristal: 15000, deut: 0,
    bouclier: 200, attaque: 1000, fret: 1500,
    vitesse: 10000, conso: 500,
    description: "Un vaisseau polyvalent mais peu efficace. Sa consommation de 500 deut est énorme et son rapport coût/efficacité laisse à désirer.",
    rapidfire: "Aucun particulier",
    conseil: "À utiliser avec modération. D'autres vaisseaux offrent un meilleur rendement pour le même investissement.",
    image: imgVaisseauBataille
  },
  { 
    nom: "Bombardier", 
    abbr: "BB", 
    role: "Anti-défenses",
    metal: 50000, cristal: 25000, deut: 15000,
    bouclier: 500, attaque: 1000, fret: 500,
    vitesse: 5000, conso: 700,
    description: "Meilleur rapport coût/destruction contre les défenses lourdes.",
    rapidfire: "x20 contre LM, x20 contre LL, x10 contre LLo, x5 contre Ions, x5 contre Gauss",
    conseil: "Optimal pour détruire les défenses (sauf plasmas). Le 2e vaisseau le plus lent.",
    image: imgBombardier
  },
  { 
    nom: "Destructeur", 
    abbr: "DEST", 
    role: "Combat lourd",
    metal: 60000, cristal: 50000, deut: 15000,
    bouclier: 500, attaque: 2000, fret: 2000,
    vitesse: 5000, conso: 1000,
    description: "Le vaisseau le plus blindé. 2e plus puissant après l'EDLM.",
    rapidfire: "x2 contre Plasmas, x10 contre CLo, x5 contre LL",
    conseil: "100 destructeurs peuvent détruire une Étoile de la Mort. Essentiel contre les plasmas !",
    image: imgDestructeur
  },
  { 
    nom: "Traqueur", 
    abbr: "TRAQ", 
    role: "Chasseur de flottes",
    metal: 30000, cristal: 40000, deut: 15000,
    bouclier: 400, attaque: 700, fret: 750,
    vitesse: 10000, conso: 250,
    description: "Un vaisseau très populaire ! Sa consommation réduite (250 deut) et son énorme rapidfire contre les vaisseaux lourds en font un incontournable.",
    rapidfire: "x3 contre CR, x3 contre VdB, x4 contre BB, x7 contre DEST",
    conseil: "Très utilisé pour son excellent ratio conso/dégâts. Idéal pour chasser les flottes adverses à moindre coût.",
    image: imgTraqueur
  },
  { 
    nom: "Étoile de la Mort", 
    abbr: "EDLM/RIP", 
    role: "Destruction massive",
    metal: 5000000, cristal: 4000000, deut: 1000000,
    bouclier: 50000, attaque: 200000, fret: 1000000,
    vitesse: 100, conso: 1,
    description: "Le vaisseau le plus puissant. Seul capable de détruire les lunes (MoonBreak).",
    rapidfire: "x1250 contre SE, x250 contre SAT, x30 contre CL, x10 contre CLo, x5 contre CR...",
    conseil: "Très lente mais passe les défenses sans pertes. Coût énorme, à réserver aux gros joueurs.",
    image: imgEtoileMort
  },
  { 
    nom: "Faucheur", 
    abbr: "FAUCH", 
    role: "Recyclage automatique",
    metal: 85000, cristal: 55000, deut: 20000,
    bouclier: 700, attaque: 2800, fret: 10000,
    vitesse: 7000, conso: 1100,
    description: "Récupère automatiquement 30% des débris en combat. Très puissant.",
    rapidfire: "x5 contre CL, x3 contre CLo, x3 contre CR",
    conseil: "Parfait pour les raids longs - pas besoin d'envoyer des recycleurs après !",
    image: imgFaucheur
  },
  { 
    nom: "Éclaireur", 
    abbr: "ECLAI", 
    role: "Expéditions",
    metal: 8000, cristal: 15000, deut: 8000,
    bouclier: 100, attaque: 1, fret: 10000,
    vitesse: 12000, conso: 300,
    description: "Bonus massif en expédition pour la classe Explorateur. Très rapide.",
    rapidfire: "Aucun particulier",
    conseil: "Indispensable pour les Explorateurs. Augmente significativement les gains d'expédition.",
    image: imgEclaireur
  }
];

const defenses = [
  { nom: "Lanceur de Missiles", abbr: "LM", metal: 2000, cristal: 0, bouclier: 20, attaque: 80, image: imgLanceurMissiles },
  { nom: "Artillerie Laser Légère", abbr: "LL", metal: 1500, cristal: 500, bouclier: 25, attaque: 100, image: imgLaserLeger },
  { nom: "Artillerie Laser Lourde", abbr: "LLo", metal: 6000, cristal: 2000, bouclier: 100, attaque: 250, image: imgLaserLourd },
  { nom: "Canon de Gauss", abbr: "Gauss", metal: 20000, cristal: 15000, bouclier: 200, attaque: 1100, image: imgCanonGauss },
  { nom: "Artillerie à Ions", abbr: "Ion", metal: 2000, cristal: 6000, bouclier: 500, attaque: 150, image: imgArtillerieIons },
  { nom: "Lanceur de Plasma", abbr: "Plasma", metal: 50000, cristal: 50000, bouclier: 300, attaque: 3000, image: imgLanceurPlasma },
  { nom: "Petit Bouclier", abbr: "PB", metal: 10000, cristal: 10000, bouclier: 2000, attaque: 1, image: imgPetitBouclier },
  { nom: "Grand Bouclier", abbr: "GB", metal: 50000, cristal: 50000, bouclier: 10000, attaque: 1, image: imgGrandBouclier }
];

export default function GuideChantier() {
  const [selectedShip, setSelectedShip] = useState<typeof vaisseauxCivils[0] | typeof vaisseauxCombat[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"civils" | "combat" | "defenses">("combat");

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
              <div className="w-20 h-20 bg-gradient-to-br from-slate-500 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-slate-500/20">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Chantier spatial et défense
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Guide complet des vaisseaux, défenses et leurs caractéristiques
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Guide pour tous niveaux • Données officielles OGame
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <Ship className="w-6 h-6 text-primary" />
                  Le Chantier Spatial
                </h2>
                <p className="text-gray-300 mb-4">
                  Le chantier spatial permet de construire tous les vaisseaux. Plus son niveau est élevé, 
                  plus vous débloquez de vaisseaux et plus la construction est rapide.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                    <p className="text-sm text-primary">
                      <strong>Usine de Nanites :</strong> Chaque niveau divise le temps de construction par 2 !
                    </p>
                  </div>
                  <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <p className="text-sm text-green-300">
                      <strong>Dock Spatial (Général) :</strong> Récupérez une partie de vos pertes après un raid réussi.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setActiveTab("combat")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "combat" 
                      ? "bg-red-600 text-white" 
                      : "bg-[#1C2230] text-gray-400 hover:text-white"
                  }`}
                >
                  <Crosshair className="w-4 h-4 inline mr-2" />
                  Vaisseaux de Combat ({vaisseauxCombat.length})
                </button>
                <button
                  onClick={() => setActiveTab("civils")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "civils" 
                      ? "bg-primary text-white" 
                      : "bg-[#1C2230] text-gray-400 hover:text-white"
                  }`}
                >
                  <Package className="w-4 h-4 inline mr-2" />
                  Vaisseaux Civils ({vaisseauxCivils.length})
                </button>
                <button
                  onClick={() => setActiveTab("defenses")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === "defenses" 
                      ? "bg-amber-600 text-white" 
                      : "bg-[#1C2230] text-gray-400 hover:text-white"
                  }`}
                >
                  <Shield className="w-4 h-4 inline mr-2" />
                  Défenses ({defenses.length})
                </button>
              </div>

              {(activeTab === "combat" || activeTab === "civils") && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                      <h2 className="font-display text-xl font-bold text-white mb-4">
                        {activeTab === "combat" ? "Vaisseaux de Combat" : "Vaisseaux Civils"}
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {(activeTab === "combat" ? vaisseauxCombat : vaisseauxCivils).map((v, index) => (
                          <div 
                            key={index} 
                            onClick={() => setSelectedShip(v)}
                            className={`bg-[#151924] rounded-lg p-4 cursor-pointer transition-all hover:border-primary/50 border ${
                              selectedShip?.nom === v.nom ? "border-primary" : "border-transparent"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <img 
                                src={v.image} 
                                alt={v.nom}
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">
                                    {v.abbr}
                                  </span>
                                </div>
                                <div className="font-medium text-white text-sm">{v.nom}</div>
                                <div className="text-xs text-gray-500">{v.role}</div>
                                <div className="flex gap-3 mt-2 text-xs">
                                  <span className="text-red-400" title="Attaque">
                                    <Target className="w-3 h-3 inline mr-1" />{v.attaque}
                                  </span>
                                  <span className="text-blue-400" title="Bouclier">
                                    <Shield className="w-3 h-3 inline mr-1" />{v.bouclier}
                                  </span>
                                  <span className="text-green-400" title="Fret">
                                    <Package className="w-3 h-3 inline mr-1" />{v.fret.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 h-fit sticky top-4">
                    <h2 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-primary" />
                      Détails
                    </h2>
                    
                    {selectedShip ? (
                      <div className="space-y-4">
                        <div className="relative">
                          <img 
                            src={selectedShip.image} 
                            alt={selectedShip.nom}
                            className="w-full h-48 rounded-xl object-contain bg-[#151924] p-4"
                          />
                          <span className="absolute top-3 right-3 text-sm bg-primary/90 text-white px-3 py-1 rounded-lg font-bold shadow-lg">
                            {selectedShip.abbr}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{selectedShip.nom}</h3>
                          <p className="text-gray-400 text-sm">{selectedShip.role}</p>
                        </div>

                        <p className="text-gray-300 text-sm">{selectedShip.description}</p>

                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-white">Coût</h4>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="bg-[#151924] rounded p-2 text-center">
                              <div className="text-gray-500">Métal</div>
                              <div className="text-white font-bold">{selectedShip.metal.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#151924] rounded p-2 text-center">
                              <div className="text-gray-500">Cristal</div>
                              <div className="text-white font-bold">{selectedShip.cristal.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#151924] rounded p-2 text-center">
                              <div className="text-gray-500">Deut</div>
                              <div className="text-white font-bold">{selectedShip.deut.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-bold text-white">Caractéristiques</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-[#151924] rounded p-2 flex items-center gap-2">
                              <Target className="w-4 h-4 text-red-400" />
                              <div>
                                <div className="text-gray-500">Attaque</div>
                                <div className="text-white font-bold">{selectedShip.attaque.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="bg-[#151924] rounded p-2 flex items-center gap-2">
                              <Shield className="w-4 h-4 text-blue-400" />
                              <div>
                                <div className="text-gray-500">Bouclier</div>
                                <div className="text-white font-bold">{selectedShip.bouclier.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="bg-[#151924] rounded p-2 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-yellow-400" />
                              <div>
                                <div className="text-gray-500">Vitesse</div>
                                <div className="text-white font-bold">{selectedShip.vitesse.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="bg-[#151924] rounded p-2 flex items-center gap-2">
                              <Fuel className="w-4 h-4 text-green-400" />
                              <div>
                                <div className="text-gray-500">Conso</div>
                                <div className="text-white font-bold">{selectedShip.conso}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-3">
                          <h4 className="text-sm font-bold text-amber-400 mb-1">Rapidfire</h4>
                          <p className="text-xs text-gray-300">{selectedShip.rapidfire}</p>
                        </div>

                        <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
                          <h4 className="text-sm font-bold text-primary mb-1">Conseil</h4>
                          <p className="text-xs text-gray-300">{selectedShip.conseil}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Ship className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-500">Cliquez sur un vaisseau pour voir ses détails</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "defenses" && (
                <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl p-6">
                  <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-amber-400" />
                    Les Défenses
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Les défenses protègent vos planètes. Contrairement aux vaisseaux, elles ne peuvent pas se déplacer 
                    mais sont partiellement reconstruites après chaque combat (~70% de récupération).
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {defenses.map((d, index) => (
                      <div 
                        key={index}
                        className="bg-[#151924] border border-[#2E384D] rounded-xl p-4 hover:border-amber-500/50 transition-all group"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-20 h-20 rounded-lg overflow-hidden mb-3 bg-gradient-to-br from-amber-900/30 to-amber-950/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                            <img 
                              src={d.image} 
                              alt={d.nom}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <span className="text-xs bg-amber-600/20 text-amber-400 px-2 py-0.5 rounded font-bold mb-1">
                            {d.abbr}
                          </span>
                          <h4 className="text-white font-medium text-sm mb-2">{d.nom}</h4>
                          <div className="grid grid-cols-2 gap-2 w-full text-xs">
                            <div className="bg-[#1C2230] rounded p-1.5">
                              <div className="text-gray-500">Métal</div>
                              <div className="text-gray-300 font-medium">{d.metal.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#1C2230] rounded p-1.5">
                              <div className="text-gray-500">Cristal</div>
                              <div className="text-cyan-400 font-medium">{d.cristal.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#1C2230] rounded p-1.5">
                              <div className="text-gray-500">Bouclier</div>
                              <div className="text-blue-400 font-medium">{d.bouclier.toLocaleString()}</div>
                            </div>
                            <div className="bg-[#1C2230] rounded p-1.5">
                              <div className="text-gray-500">Attaque</div>
                              <div className="text-red-400 font-medium">{d.attaque.toLocaleString()}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 bg-amber-900/20 border border-amber-700/30 rounded-lg p-4">
                    <p className="text-sm text-amber-300">
                      <strong>Note :</strong> Sur certains serveurs avec l'option "CDR défense" activée, 
                      les défenses génèrent aussi un champ de débris lorsqu'elles sont détruites.
                    </p>
                  </div>
                </div>
              )}

              <RelatedGuides currentGuide="chantier" />
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

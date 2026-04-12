import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket, ChevronDown, ChevronUp, Plus, X, ArrowRightLeft,
  Info, Clock, Fuel, Package, Settings2, RefreshCw, Upload,
  Download, Search, ArrowRight, AlertTriangle, Wrench
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

import imgPetitTransporteur from "@assets/ogame_ships/petit-transporteur.png";
import imgGrandTransporteur from "@assets/ogame_ships/grand-transporteur.png";
import imgChasseurLeger from "@assets/ogame_ships/chasseur-leger.png";
import imgChasseurLourd from "@assets/ogame_ships/chasseur-lourd.png";
import imgFaucheur from "@assets/ogame_ships/faucheur.png";
import imgCroiseur from "@assets/ogame_ships/croiseur.png";
import imgVaisseauBataille from "@assets/ogame_ships/vaisseau-bataille.png";
import imgDestructeur from "@assets/ogame_ships/destructeur.png";
import imgBombardier from "@assets/ogame_ships/bombardier.png";
import imgEclaireur from "@assets/ogame_ships/eclaireur.png";
import imgTraqueur from "@assets/ogame_ships/traqueur.png";
import imgEtoileMort from "@assets/ogame_ships/etoile-mort.png";
import imgVaisseauColonisation from "@assets/ogame_ships/vaisseau-colonisation.png";
import imgRecycleur from "@assets/ogame_ships/recycleur.png";
import imgSondeEspionnage from "@assets/ogame_ships/sonde-espionnage.png";

const SPEED_STEPS = [100,95,90,85,80,75,70,65,60,55,50,45,40,35,30,25,20,15,10,5];

// Missions where EDM forces uniSpeed = 1
const EDM_SLOW_MISSIONS = ["hostiles", "espionnage", "recyclage"];

type ShipDef = {
  id: string; name: string; speed: number; fuel: number; cargo: number;
  img: string; engine: "combustion"|"impulsion"|"hyperespace"; col: 1|2|3;
  deathstar?: boolean;
};

const SHIPS: ShipDef[] = [
  { id: "petit_transporteur",    name: "Petit transporteur",       speed: 5000,      fuel: 20,   cargo: 5000,    img: imgPetitTransporteur,    engine: "combustion",  col: 1 },
  { id: "grand_transporteur",    name: "Grand transporteur",       speed: 7500,      fuel: 50,   cargo: 25000,   img: imgGrandTransporteur,    engine: "combustion",  col: 1 },
  { id: "chasseur_leger",        name: "Chasseur léger",           speed: 12500,     fuel: 20,   cargo: 50,      img: imgChasseurLeger,        engine: "combustion",  col: 1 },
  { id: "chasseur_lourd",        name: "Chasseur lourd",           speed: 10000,     fuel: 75,   cargo: 100,     img: imgChasseurLourd,        engine: "impulsion",   col: 1 },
  { id: "faucheur",              name: "Faucheur",                 speed: 7000,      fuel: 1100, cargo: 10000,   img: imgFaucheur,             engine: "hyperespace", col: 1 },
  { id: "croiseur",              name: "Croiseur",                 speed: 15000,     fuel: 300,  cargo: 800,     img: imgCroiseur,             engine: "impulsion",   col: 2 },
  { id: "vaisseau_bataille",     name: "Vaisseau de bataille",     speed: 10000,     fuel: 500,  cargo: 1500,    img: imgVaisseauBataille,     engine: "hyperespace", col: 2 },
  { id: "destructeur",           name: "Destructeur",              speed: 5000,      fuel: 1000, cargo: 2000,    img: imgDestructeur,          engine: "hyperespace", col: 2 },
  { id: "bombardier",            name: "Bombardier",               speed: 4000,      fuel: 700,  cargo: 500,     img: imgBombardier,           engine: "impulsion",   col: 2 },
  { id: "eclaireur",             name: "Éclaireur",                speed: 12000,     fuel: 300,  cargo: 10000,   img: imgEclaireur,            engine: "hyperespace", col: 2 },
  { id: "traqueur",              name: "Traqueur",                 speed: 10000,     fuel: 250,  cargo: 750,     img: imgTraqueur,             engine: "hyperespace", col: 3 },
  { id: "etoile_mort",           name: "Étoile de la mort",        speed: 100,       fuel: 1,    cargo: 1000000, img: imgEtoileMort,           engine: "hyperespace", col: 3, deathstar: true },
  { id: "vaisseau_colonisation", name: "Vaisseau de colonisation", speed: 2500,      fuel: 1000, cargo: 7500,    img: imgVaisseauColonisation, engine: "impulsion",   col: 3 },
  { id: "recycleur",             name: "Recycleur",                speed: 2000,      fuel: 300,  cargo: 20000,   img: imgRecycleur,            engine: "combustion",  col: 3 },
  { id: "sonde_espionnage",      name: "Sonde d'espionnage",       speed: 100000000, fuel: 1,    cargo: 0,       img: imgSondeEspionnage,      engine: "combustion",  col: 3 },
];

const PAYS = [
  { value: "fr", label: "France" },
  { value: "be", label: "Belgique" },
  { value: "ch", label: "Suisse" },
  { value: "ca", label: "Canada" },
  { value: "lu", label: "Luxembourg" },
  { value: "es", label: "Espagne" },
  { value: "de", label: "Allemagne" },
  { value: "pl", label: "Pologne" },
  { value: "ru", label: "Russie" },
  { value: "us", label: "États-Unis" },
  { value: "int", label: "International" },
];

const MILITARY_SHIPS = ["chasseur_leger","chasseur_lourd","croiseur","vaisseau_bataille","bombardier","destructeur","traqueur","faucheur","eclaireur"];
const TRANSPORT_SHIPS = ["petit_transporteur","grand_transporteur"];
const LS_KEY = "psykoverse_flight_options";
const FLEET_PREFIX = "flight_fleet_";
const UNI_PREFIX = "flight_uni_";

// ── Pure helpers ──────────────────────────────────────────────────────────────

function formatDuration(totalSeconds: number): string {
  if (!isFinite(totalSeconds) || totalSeconds <= 0) return "—";
  const s = Math.floor(totalSeconds);
  const days = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const hms = `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  return days > 0 ? `${days}j ${hms}` : hms;
}

function formatNum(n: number): string {
  if (!isFinite(n) || n === 0) return "0";
  if (n >= 1e9) return (n / 1e9).toFixed(2) + " G";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + " M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + " k";
  return Math.round(n).toLocaleString("fr-FR");
}

function parseTimeToSeconds(t: string): number {
  const parts = t.split(":");
  return (parseInt(parts[0])||0) * 3600 + (parseInt(parts[1])||0) * 60 + (parseInt(parts[2])||0);
}

function secondsToTimeStr(sec: number): string {
  const norm = ((sec % 86400) + 86400) % 86400;
  const h = Math.floor(norm / 3600);
  const m = Math.floor((norm % 3600) / 60);
  const s = norm % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function addDaysLabel(sec: number): string {
  const days = Math.floor(sec / 86400);
  const hms = secondsToTimeStr(sec);
  if (days > 0) return `+${days}j ${hms}`;
  if (days < 0) return `${days}j ${hms}`;
  return hms;
}

function parseDatetimeToSec(dt: string): number {
  if (!dt) return 0;
  return Math.floor(new Date(dt).getTime() / 1000);
}

function parseToleranceSec(t: string): number {
  const parts = t.split(":");
  return (parseInt(parts[0])||0) * 3600 + (parseInt(parts[1])||0) * 60;
}

function calcFlightDuration(distance: number, speedPct: number, fleetSpeed: number, uniSpeedFactor: number): number {
  if (fleetSpeed <= 0 || distance <= 0 || speedPct <= 0) return 0;
  return Math.round(
    (35000 / (speedPct / 10) * Math.sqrt(distance * 10 / fleetSpeed) + 10) / Math.max(uniSpeedFactor, 0.1)
  );
}

type ShipBonus = { speed: number; cargo: number; fuel: number };
type FlightSlot = { id: number; mode: "depart"|"arrivee"; time: string };
type SaveResult = {
  type: "galaxie"|"systeme"|"planete";
  delta: number; speed: number; duration: number; fuel: number; coordLabel: string;
};

const inputCls = "bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-primary/50 w-full";
const selectCls = "bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-primary/50 w-full";
const labelCls = "text-gray-400 text-xs mb-1 block";

function CoordInput({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col">
      <span className={labelCls}>{label}</span>
      <input type="number" min={min} max={max} value={value}
        onChange={e => onChange(Math.max(min, Math.min(max, parseInt(e.target.value)||min)))}
        className={inputCls + " w-16 text-center"}
      />
    </div>
  );
}

function TechInput({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input type="number" min={0} max={30} value={value}
        onChange={e => onChange(Math.max(0, Math.min(30, parseInt(e.target.value)||0)))}
        className={inputCls}
      />
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function OutilsTempsVolDev() {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("dev_access_granted") !== "true") {
      navigate("/outils/temps-vol");
    }
  }, []);

  if (sessionStorage.getItem("dev_access_granted") !== "true") return null;

  // Load from localStorage
  const stored = (() => { try { return JSON.parse(localStorage.getItem(LS_KEY)||"{}"); } catch { return {}; } })();
  const g = <T,>(key: string, def: T): T => (key in stored ? stored[key] : def);

  // UI state
  const [paramsOpen, setParamsOpen] = useState(true);
  const [shipStatsOpen, setShipStatsOpen] = useState(false);
  const [shipsOpen, setShipsOpen] = useState(true);
  const [activeResultTab, setActiveResultTab] = useState<"temps"|"sauvegarde">("temps");

  // Params
  const [playerClass, setPlayerClass] = useState<"collecteur"|"general"|"explorateur">(g("playerClass","collecteur"));
  const [allianceTraders, setAllianceTraders] = useState<boolean>(g("allianceTraders",false));
  const [allianceWarriors, setAllianceWarriors] = useState<boolean>(g("allianceWarriors",false));

  const [techCombustion, setTechCombustion] = useState<number>(g("techCombustion",0));
  const [techImpulsion, setTechImpulsion] = useState<number>(g("techImpulsion",0));
  const [techHyperespace, setTechHyperespace] = useState<number>(g("techHyperespace",0));
  const [techHyperTech, setTechHyperTech] = useState<number>(g("techHyperTech",0));
  const [lfRocktalCE, setLfRocktalCE] = useState<number>(g("lfRocktalCE",0));
  const [lfMechanGE, setLfMechanGE] = useState<number>(g("lfMechanGE",0));

  const [fromG, setFromG] = useState<number>(g("fromG",1));
  const [fromS, setFromS] = useState<number>(g("fromS",1));
  const [fromP, setFromP] = useState<number>(g("fromP",1));

  const [pays, setPays] = useState<string>(g("pays","fr"));
  const [univers, setUnivers] = useState<number>(g("univers",1));
  const [vitesseUnivers, setVitesseUnivers] = useState<number>(g("vitesseUnivers",1));

  const [circularSys, setCircularSys] = useState<boolean>(g("circularSys",false));
  const [circularGal, setCircularGal] = useState<boolean>(g("circularGal",false));
  const [nbSys, setNbSys] = useState<number>(g("nbSys",499));
  const [nbGal, setNbGal] = useState<number>(g("nbGal",9));

  const [missionSpeed, setMissionSpeed] = useState<number>(g("missionSpeed", g("speedHostiles", g("speedGuerre", 10))));

  const [spyCargo, setSpyCargo] = useState<number>(g("spyCargo",0));
  const [deutCollectorPct, setDeutCollectorPct] = useState<number>(g("deutCollectorPct",75));
  const [generalFuelReduction, setGeneralFuelReduction] = useState<number>(g("generalFuelReduction",25));
  const [collectorClassBonus, setCollectorClassBonus] = useState<number>(g("collectorClassBonus",0));

  const [shipBonuses, setShipBonuses] = useState<Record<string,ShipBonus>>(
    g("shipBonuses", Object.fromEntries(SHIPS.map(s => [s.id, {speed:0,cargo:0,fuel:0}])))
  );
  const [overrideFleetSpeed, setOverrideFleetSpeed] = useState<boolean>(g("overrideFleetSpeed",false));
  const [overrideFleetSpeedValue, setOverrideFleetSpeedValue] = useState<number>(g("overrideFleetSpeedValue",10000));
  const [quantities, setQuantities] = useState<Record<string,number>>(
    g("quantities", Object.fromEntries(SHIPS.map(s => [s.id, 0])))
  );

  const [missionType, setMissionType] = useState<"hostiles"|"pacifiques"|"propres"|"espionnage"|"recyclage">(() => {
    const v = g<string>("missionType", "pacifiques");
    // Migration douce : anciens types → nouveaux
    if (v === "guerre") return "hostiles";
    if (v === "pacifique") return "pacifiques";
    if (v === "maintien") return "pacifiques";
    return v as "hostiles"|"pacifiques"|"propres"|"espionnage"|"recyclage";
  });
  const [toG, setToG] = useState<number>(g("toG",1));
  const [toS, setToS] = useState<number>(g("toS",1));
  const [toP, setToP] = useState<number>(g("toP",1));

  // Scenario mode
  const [scenarioMode, setScenarioMode] = useState<"moonbreak"|"cdr">("moonbreak");
  const [interceptionArrival, setInterceptionArrival] = useState<string>("");
  const [interceptionClickReturn, setInterceptionClickReturn] = useState<string>("");

  // Flight slots
  const [flightSlots, setFlightSlots] = useState<FlightSlot[]>([{id:1,mode:"depart",time:""}]);
  const [nextSlotId, setNextSlotId] = useState(2);
  const [planDuration, setPlanDuration] = useState<number|null>(null);

  // Save points
  const [saveStartDT, setSaveStartDT] = useState("");
  const [saveReturnDT, setSaveReturnDT] = useState("");
  const [saveTolerance, setSaveTolerance] = useState("00:30");
  const [saveResults, setSaveResults] = useState<SaveResult[]>([]);
  const [saveSearched, setSaveSearched] = useState(false);

  // Quick return calculator (Partie 4)
  const [qrMode, setQrMode] = useState<"depart-arrivee"|"depart-rappel">("depart-arrivee");
  const [qrDepart, setQrDepart] = useState("");
  const [qrArrivee, setQrArrivee] = useState("");
  const [qrRappel, setQrRappel] = useState("");

  // UI toggles
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Fleet/Universe named slots
  const [fleetSlotName, setFleetSlotName] = useState("");
  const [uniSlotName, setUniSlotName] = useState("");
  const [savedFleets, setSavedFleets] = useState<string[]>(() =>
    Object.keys(localStorage).filter(k => k.startsWith(FLEET_PREFIX)).map(k => k.slice(FLEET_PREFIX.length))
  );
  const [savedUniverses, setSavedUniverses] = useState<string[]>(() =>
    Object.keys(localStorage).filter(k => k.startsWith(UNI_PREFIX)).map(k => k.slice(UNI_PREFIX.length))
  );

  // Auto-enable override speed in moonbreak mode
  useEffect(() => {
    if (scenarioMode === "moonbreak") setOverrideFleetSpeed(true);
  }, [scenarioMode]);

  // ── Persist all params to localStorage ──────────────────────────────────────
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({
      playerClass, allianceTraders, allianceWarriors,
      techCombustion, techImpulsion, techHyperespace, techHyperTech, lfRocktalCE, lfMechanGE,
      fromG, fromS, fromP, pays, univers, vitesseUnivers,
      circularSys, circularGal, nbSys, nbGal,
      missionSpeed, spyCargo,
      deutCollectorPct, generalFuelReduction, collectorClassBonus,
      shipBonuses, overrideFleetSpeed, overrideFleetSpeedValue,
      quantities, missionType, toG, toS, toP,
    }));
  }, [
    playerClass, allianceTraders, allianceWarriors,
    techCombustion, techImpulsion, techHyperespace, techHyperTech, lfRocktalCE, lfMechanGE,
    fromG, fromS, fromP, pays, univers, vitesseUnivers,
    circularSys, circularGal, nbSys, nbGal,
    missionSpeed, spyCargo,
    deutCollectorPct, generalFuelReduction, collectorClassBonus,
    shipBonuses, overrideFleetSpeed, overrideFleetSpeedValue,
    quantities, missionType, toG, toS, toP,
  ]);

  // ── Dynamic ship stats (motor upgrades) ─────────────────────────────────────
  const dynamicShips = useMemo((): ShipDef[] => {
    return SHIPS.map(ship => {
      if (ship.id === "petit_transporteur" && techImpulsion >= 5)
        return {...ship, speed: 10000, engine: "impulsion" as const};
      if (ship.id === "bombardier") {
        if (techHyperespace >= 8) return {...ship, speed: 5000, engine: "hyperespace" as const, fuel: 700};
        return {...ship, speed: 4000, engine: "impulsion" as const, fuel: 700};
      }
      if (ship.id === "recycleur") {
        if (techHyperespace >= 15) return {...ship, speed: 6000, engine: "hyperespace" as const, fuel: 900};
        if (techImpulsion >= 17)   return {...ship, speed: 4000, engine: "impulsion" as const, fuel: 600};
        return {...ship, speed: 2000, engine: "combustion" as const, fuel: 300};
      }
      return ship;
    });
  }, [techImpulsion, techHyperespace]);

  // ── Effective speeds ─────────────────────────────────────────────────────────
  const effectiveSpeeds = useMemo(() => {
    const r: Record<string,number> = {};
    for (const ship of dynamicShips) {
      const bonus = shipBonuses[ship.id] ?? {speed:0,cargo:0,fuel:0};
      let driveMult = 1;
      if (ship.engine === "combustion")   driveMult = 1 + 0.10 * techCombustion;
      else if (ship.engine === "impulsion") driveMult = 1 + 0.20 * techImpulsion;
      else                                driveMult = 1 + 0.30 * techHyperespace;

      let speed = ship.speed * driveMult;

      // Class doubling
      if (playerClass === "collecteur" && TRANSPORT_SHIPS.includes(ship.id))
        speed += Math.floor(ship.speed * (1 + 0.01 * lfRocktalCE));
      if (playerClass === "general" && MILITARY_SHIPS.includes(ship.id))
        speed += Math.floor(ship.speed * (1 + 0.01 * lfMechanGE));

      // Alliance bonuses
      if (allianceWarriors) speed += ship.speed * 0.1;
      if (allianceTraders && TRANSPORT_SHIPS.includes(ship.id)) speed += ship.speed * 0.1;

      // LF speed bonus
      speed += Math.ceil(ship.speed * bonus.speed * 0.01);

      r[ship.id] = Math.floor(speed);
    }
    return r;
  }, [dynamicShips, techCombustion, techImpulsion, techHyperespace,
      playerClass, lfRocktalCE, lfMechanGE, allianceWarriors, allianceTraders, shipBonuses]);

  const fleetSpeed = useMemo(() => {
    if (overrideFleetSpeed) return overrideFleetSpeedValue;
    let min = Infinity;
    for (const ship of dynamicShips) {
      if ((quantities[ship.id]??0) > 0) {
        const spd = effectiveSpeeds[ship.id] ?? ship.speed;
        if (spd < min) min = spd;
      }
    }
    return min === Infinity ? 10000 : min;
  }, [quantities, effectiveSpeeds, dynamicShips, overrideFleetSpeed, overrideFleetSpeedValue]);

  const hasDeathstar = useMemo(() => (quantities["etoile_mort"]??0) > 0, [quantities]);
  const hasAnyShip   = useMemo(() => SHIPS.some(s => (quantities[s.id]??0) > 0), [quantities]);

  const distance = useMemo(() => {
    if (fromG === toG && fromS === toS) return 5 * Math.abs(fromP - toP);
    if (fromG === toG) {
      let d = Math.abs(fromS - toS);
      if (circularSys) d = Math.min(d, nbSys - d);
      return 2700 + 95 * d;
    }
    let d = Math.abs(fromG - toG);
    if (circularGal) d = Math.min(d, nbGal - d);
    return 20000 * d;
  }, [fromG, fromS, fromP, toG, toS, toP, circularSys, circularGal, nbSys, nbGal]);

  // ── Cargo (same for all speeds) ───────────────────────────────────────────
  const totalCargo = useMemo(() => {
    let total = 0;
    for (const ship of dynamicShips) {
      const qty = quantities[ship.id] ?? 0;
      if (qty <= 0) continue;
      const bonus = shipBonuses[ship.id] ?? {speed:0,cargo:0,fuel:0};
      const cargoBase = (ship.id === "sonde_espionnage" && spyCargo > 0) ? spyCargo : ship.cargo;

      let inc = qty * cargoBase * (1 + 0.05 * techHyperTech);
      if (playerClass === "collecteur" && TRANSPORT_SHIPS.includes(ship.id))
        inc += Math.floor(qty * cargoBase * 0.25 * (1 + lfRocktalCE * 0.01));
      if (playerClass === "general" && (ship.id === "recycleur" || ship.id === "eclaireur"))
        inc += qty * cargoBase * 0.20;
      if (playerClass === "explorateur" && ship.id === "sonde_espionnage")
        inc += qty * cargoBase * 2;
      if (allianceTraders) inc *= 1.25;
      if (playerClass === "collecteur" && collectorClassBonus > 0) inc *= (1 + collectorClassBonus / 100);
      inc += Math.round(cargoBase * bonus.cargo * 0.01 * qty);
      total += inc;
    }
    return Math.floor(total);
  }, [dynamicShips, quantities, shipBonuses, techHyperTech, playerClass,
      lfRocktalCE, allianceTraders, collectorClassBonus, spyCargo]);

  // ── Per-row fuel calculation ──────────────────────────────────────────────
  function rowFuel(duration: number, uniSpeedFactor: number, dist: number): number {
    let totalFuel = 0;
    for (const ship of dynamicShips) {
      const qty = quantities[ship.id] ?? 0;
      if (qty <= 0) continue;
      const bonus = shipBonuses[ship.id] ?? {speed:0,cargo:0,fuel:0};
      const shipEff = Math.max(effectiveSpeeds[ship.id] ?? ship.speed, 1);
      const denom = duration * uniSpeedFactor - 10;
      const shipSpeedVal = (denom > 0)
        ? 35000 / denom * Math.sqrt(dist * 10 / shipEff)
        : 0;
      const deutFactor  = playerClass === "collecteur" ? deutCollectorPct / 100 : 1;
      const classFactor = playerClass === "general" ? (generalFuelReduction / 100) * (1 + 0.002 * lfMechanGE) : 0;
      const lfFuelFactor = bonus.fuel * 0.01;
      const baseConso = Math.floor(Math.floor(ship.fuel * 0.1 * deutFactor) * (1 - classFactor) * (1 - lfFuelFactor));
      const shipConso = Math.max(Math.round(baseConso * qty), 1);
      totalFuel += shipConso * dist / 35000 * Math.pow(Math.max(shipSpeedVal, 0) / 10 + 1, 2);
    }
    return (duration > 0 && dist > 0) ? Math.max(Math.round(totalFuel), 1) : 0;
  }

  // ── Results table ─────────────────────────────────────────────────────────
  const resultsData = useMemo(() => {
    return SPEED_STEPS.map(pct => {
      const edmSlow = EDM_SLOW_MISSIONS.includes(missionType);
      const uniSpeed = (hasDeathstar && edmSlow) ? 1 : vitesseUnivers;
      const t = calcFlightDuration(distance, pct, fleetSpeed, uniSpeed);
      const fuel = rowFuel(t, uniSpeed, distance);
      return { pct, time: t, fuel, cargo: totalCargo };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fleetSpeed, distance, vitesseUnivers, hasDeathstar, missionType,
      quantities, playerClass, deutCollectorPct, generalFuelReduction,
      shipBonuses, dynamicShips, techHyperTech, lfRocktalCE, lfMechanGE,
      totalCargo, effectiveSpeeds, allianceTraders, collectorClassBonus, spyCargo]);

  const missionSpeedPct = missionSpeed * 10;

  const missionFlightTime = useMemo(() => {
    const row = resultsData.find(r => r.pct === missionSpeedPct);
    return row ? row.time : 0;
  }, [resultsData, missionSpeedPct]);

  const effectivePlanDuration = planDuration ?? missionFlightTime;

  // ── Save points search ────────────────────────────────────────────────────
  function runSavePointsSearch() {
    if (!saveStartDT || !saveReturnDT) return;
    const startSec  = parseDatetimeToSec(saveStartDT);
    const returnSec = parseDatetimeToSec(saveReturnDT);
    if (returnSec <= startSec) return;
    const halfDur = Math.round((returnSec - startSec) / 2);
    const halfTol = Math.round(parseToleranceSec(saveTolerance) / 2);
    const edmSlow = EDM_SLOW_MISSIONS.includes(missionType);
    const uniSpeed = (hasDeathstar && edmSlow) ? 1 : vitesseUnivers;
    const results: SaveResult[] = [];

    const tryDist = (dist: number, type: SaveResult["type"], delta: number, label: string) => {
      for (const pct of SPEED_STEPS) {
        const dur = calcFlightDuration(dist, pct, fleetSpeed, uniSpeed);
        if (dur >= halfDur - halfTol && dur <= halfDur + halfTol) {
          const fuel = hasAnyShip ? rowFuel(dur, uniSpeed, dist) : 0;
          results.push({type, delta, speed: pct, duration: dur, fuel, coordLabel: label});
        }
      }
    };

    for (let dp = 1; dp <= 30; dp++)
      tryDist(5 * dp, "planete", dp, `Même système, écart pos. ${dp}`);
    for (let ds = 1; ds <= Math.min(nbSys, 499); ds++)
      tryDist(2700 + 95 * ds, "systeme", ds, `Même galaxie, écart sys. ${ds}`);
    for (let dg = 1; dg <= Math.min(nbGal - 1, 8); dg++)
      tryDist(20000 * dg, "galaxie", dg, `Écart gal. ${dg}`);

    results.sort((a, b) => a.speed !== b.speed ? a.speed - b.speed : a.fuel - b.fuel);
    setSaveResults(results);
    setSaveSearched(true);
  }

  function applySaveResult(r: SaveResult) {
    if (r.type === "planete") { setToG(fromG); setToS(fromS); setToP(Math.min(15, fromP + r.delta)); }
    else if (r.type === "systeme") { setToG(fromG); setToS(Math.min(nbSys, fromS + r.delta)); setToP(fromP); }
    else { setToG(Math.min(nbGal, fromG + r.delta)); setToS(fromS); setToP(fromP); }
    if (saveStartDT) {
      const startSec = parseDatetimeToSec(saveStartDT);
      setFlightSlots(prev => prev.map((s, i) => i === 0 ? {...s, time: secondsToTimeStr(startSec), mode: "depart"} : s));
    }
    setPlanDuration(r.duration);
    setActiveResultTab("temps");
  }

  // ── Flight slot helpers ───────────────────────────────────────────────────
  function updateSlotTime(id: number, val: string) {
    setFlightSlots(prev => prev.map(s => s.id === id ? {...s, time: val} : s));
  }
  function toggleSlotMode(id: number) {
    setFlightSlots(prev => prev.map(s => s.id === id ? {...s, mode: s.mode === "depart" ? "arrivee" : "depart"} : s));
  }
  function addSlot() {
    setFlightSlots(prev => [...prev, {id: nextSlotId, mode: "depart", time: ""}]);
    setNextSlotId(n => n + 1);
  }
  function removeSlot(id: number) {
    setFlightSlots(prev => prev.filter(s => s.id !== id));
  }
  function getCalcTime(slot: FlightSlot): string {
    if (!slot.time || effectivePlanDuration <= 0) return "—";
    const sec = parseTimeToSeconds(slot.time);
    return addDaysLabel(slot.mode === "depart" ? sec + effectivePlanDuration : sec - effectivePlanDuration);
  }

  // ── Fleet / Universe named slot management ────────────────────────────────
  const refreshFleets = () => setSavedFleets(Object.keys(localStorage).filter(k => k.startsWith(FLEET_PREFIX)).map(k => k.slice(FLEET_PREFIX.length)));
  const refreshUnis   = () => setSavedUniverses(Object.keys(localStorage).filter(k => k.startsWith(UNI_PREFIX)).map(k => k.slice(UNI_PREFIX.length)));

  const saveFleet = (name: string) => { if (!name.trim()) return; localStorage.setItem(FLEET_PREFIX+name, JSON.stringify(quantities)); refreshFleets(); };
  const loadFleet = (name: string) => { const d = localStorage.getItem(FLEET_PREFIX+name); if (d) try { setQuantities(prev => ({...prev,...JSON.parse(d)})); } catch {} };
  const deleteFleet = (name: string) => { localStorage.removeItem(FLEET_PREFIX+name); refreshFleets(); setFleetSlotName(""); };

  const currentUniParams = () => ({pays, univers, vitesseUnivers, circularSys, circularGal, nbSys, nbGal, techCombustion, techImpulsion, techHyperespace, techHyperTech, playerClass, deutCollectorPct, generalFuelReduction});
  const saveUniverse   = (name: string) => { if (!name.trim()) return; localStorage.setItem(UNI_PREFIX+name, JSON.stringify(currentUniParams())); refreshUnis(); };
  const loadUniverse   = (name: string) => {
    const d = localStorage.getItem(UNI_PREFIX+name); if (!d) return;
    try {
      const p = JSON.parse(d);
      if (p.pays !== undefined) setPays(p.pays);
      if (p.univers !== undefined) setUnivers(p.univers);
      if (p.vitesseUnivers !== undefined) setVitesseUnivers(p.vitesseUnivers);
      if (p.circularSys !== undefined) setCircularSys(p.circularSys);
      if (p.circularGal !== undefined) setCircularGal(p.circularGal);
      if (p.nbSys !== undefined) setNbSys(p.nbSys);
      if (p.nbGal !== undefined) setNbGal(p.nbGal);
      if (p.techCombustion !== undefined) setTechCombustion(p.techCombustion);
      if (p.techImpulsion !== undefined) setTechImpulsion(p.techImpulsion);
      if (p.techHyperespace !== undefined) setTechHyperespace(p.techHyperespace);
      if (p.techHyperTech !== undefined) setTechHyperTech(p.techHyperTech);
      if (p.playerClass !== undefined) setPlayerClass(p.playerClass);
      if (p.deutCollectorPct !== undefined) setDeutCollectorPct(p.deutCollectorPct);
      if (p.generalFuelReduction !== undefined) setGeneralFuelReduction(p.generalFuelReduction);
    } catch {}
  };
  const deleteUniverse = (name: string) => { localStorage.removeItem(UNI_PREFIX+name); refreshUnis(); setUniSlotName(""); };

  function updateShipBonus(shipId: string, field: keyof ShipBonus, val: number) {
    setShipBonuses(prev => ({...prev, [shipId]: {...prev[shipId], [field]: val}}));
  }
  const exportFleet = () => {
    const data = JSON.stringify(quantities, null, 2);
    navigator.clipboard.writeText(data).catch(() => {
      const blob = new Blob([data], {type:"application/json"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "flotte.json"; a.click();
      URL.revokeObjectURL(url);
    });
  };
  const importFleet = () => {
    const input = prompt("Collez le JSON de votre flotte :");
    if (!input) return;
    try { setQuantities(prev => ({...prev,...JSON.parse(input)})); }
    catch { alert("JSON invalide"); }
  };

  const speedOptions = Array.from({length: 10}, (_, i) => i + 1);
  const speedOptionsGeneral = Array.from({length: 20}, (_, i) => (i + 1) * 0.5);

  const shipsCol1 = dynamicShips.filter(s => s.col === 1);
  const shipsCol2 = dynamicShips.filter(s => s.col === 2);
  const shipsCol3 = dynamicShips.filter(s => s.col === 3);

  // Visible rows: non-Général sees only 10% multiples
  const visibleRows = playerClass === "general"
    ? resultsData
    : resultsData.filter(r => r.pct % 10 === 0);

  // Interception: confirmed speed row (closest departure time to click-return time)
  const confirmedRowPct = useMemo(() => {
    if (!interceptionClickReturn || !interceptionArrival) return null;
    const arrSec = parseTimeToSeconds(interceptionArrival);
    const retSec = parseTimeToSeconds(interceptionClickReturn);
    let minDiff = Infinity;
    let bestPct: number | null = null;
    for (const row of resultsData) {
      if (row.time <= 0) continue;
      const depSec = arrSec - row.time;
      const diff = Math.abs(depSec - retSec);
      if (diff < minDiff) { minDiff = diff; bestPct = row.pct; }
    }
    return bestPct;
  }, [interceptionArrival, interceptionClickReturn, resultsData]);

  // ═══ RENDER ═══════════════════════════════════════════════════════════════
  return (
    <Layout>
      <div className="fixed top-20 right-4 z-50 flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">
        <Wrench className="w-3 h-3" />
        Mode Dev
      </div>
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>

            <Link href="/tutoriels">
              <Button variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/20">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Calculateur de Temps de Vol
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Calculez la durée et la consommation de vos missions OGame en temps réel
              </p>
            </div>

            {/* ── BANDEAU AVERTISSEMENT ── */}
            <div className="flex items-start gap-3 bg-amber-950/60 border border-amber-600/50 rounded-xl px-5 py-4 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-amber-200 text-sm leading-relaxed">
                <span className="font-bold text-amber-300">Outil en cours de développement</span> — Les calculs peuvent contenir des erreurs. Ne pas utiliser pour des décisions critiques en jeu. Nous travaillons à améliorer la précision.
              </p>
            </div>

            {/* ── SÉLECTEUR DE SCÉNARIO ── */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setScenarioMode("moonbreak")}
                title="Utilisez les données de votre phalange de capteurs : composition de la flotte, vitesse exacte et heure du clic retour. Le calculateur génère tous les créneaux de départ possibles."
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-bold transition-colors ${scenarioMode === "moonbreak" ? "bg-amber-500/20 border-amber-500/50 text-amber-400" : "bg-[#1C2230] border-[#2E384D] text-gray-400 hover:text-white hover:border-gray-500"}`}>
                ⚔️ Moonbreak / Interception
              </button>
              <button
                onClick={() => setScenarioMode("cdr")}
                title="La flotte ennemie s'est cachée dans une mission recyclage. Ce n'est pas forcément que des recycleurs — saisissez toute la flotte estimée via espionnage. Utilisez l'heure de disparition du CDR comme heure d'arrivée."
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-sm font-bold transition-colors ${scenarioMode === "cdr" ? "bg-orange-500/20 border-orange-500/50 text-orange-400" : "bg-[#1C2230] border-[#2E384D] text-gray-400 hover:text-white hover:border-gray-500"}`}>
                ♻️ CDR — Flotte cachée
              </button>
            </div>

            {/* ── BLOC COORDONNÉES (visible, hors paramètres) ── */}
            {(() => {
              const borderCls = missionType === "hostiles" ? "border-red-500/50" : missionType === "pacifiques" ? "border-blue-500/50" : "border-green-500/50";
              const fromLabel = "🚀 Position de départ";
              const toLabel   = "🎯 Position de destination";
              return (
                <div className={`bg-[#1C2230] border ${borderCls} rounded-xl p-4 mb-4 transition-colors`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">{fromLabel}</label>
                      <div className="flex items-center gap-1">
                        <CoordInput label="G" value={fromG} min={1} max={9} onChange={setFromG} />
                        <span className="text-gray-500 pt-4">:</span>
                        <CoordInput label="S" value={fromS} min={1} max={499} onChange={setFromS} />
                        <span className="text-gray-500 pt-4">:</span>
                        <CoordInput label="P" value={fromP} min={1} max={16} onChange={setFromP} />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">{toLabel}</label>
                      <div className="flex items-center gap-1">
                        <CoordInput label="G" value={toG} min={1} max={9} onChange={setToG} />
                        <span className="text-gray-500 pt-4">:</span>
                        <CoordInput label="S" value={toS} min={1} max={499} onChange={setToS} />
                        <span className="text-gray-500 pt-4">:</span>
                        <CoordInput label="P" value={toP} min={1} max={16} onChange={setToP} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 bg-[#151924] rounded-lg px-4 py-2 w-fit">
                    <span className="text-xs text-gray-400">Distance</span>
                    <span className="text-amber-400 font-mono font-bold text-sm">{formatNum(distance)} UA</span>
                  </div>
                </div>
              );
            })()}

            <div className="space-y-4">

              {/* ── SECTION 1 : PARAMÈTRES ── */}
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden">
                <button onClick={() => setParamsOpen(o => !o)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Settings2 className="w-4 h-4 text-amber-400" />
                    Paramètres
                  </div>
                  {paramsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                <AnimatePresence>
                  {paramsOpen && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
                      exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden">
                      <div className="px-5 pb-6 space-y-5 border-t border-[#2E384D]">

                        {/* Classe + Alliance */}
                        <div className="flex flex-wrap items-center gap-6">
                          <div>
                            <label className={labelCls}>Classe</label>
                            <div className="flex gap-4">
                              {(["collecteur","general","explorateur"] as const).map(cls => (
                                <label key={cls} className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-300">
                                  <input type="radio" name="playerClass" value={cls}
                                    checked={playerClass === cls} onChange={() => setPlayerClass(cls)}
                                    className="accent-amber-400" />
                                  {cls.charAt(0).toUpperCase() + cls.slice(1)}
                                </label>
                              ))}
                            </div>
                          </div>
                          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                            <input type="checkbox" checked={allianceTraders}
                              onChange={e => setAllianceTraders(e.target.checked)} className="accent-amber-400" />
                            Alliance "Traders" (+25% cargo, +10% vitesse transporteurs)
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                            <input type="checkbox" checked={allianceWarriors}
                              onChange={e => setAllianceWarriors(e.target.checked)} className="accent-amber-400" />
                            Alliance "Guerriers" (+10% vitesse vaisseaux)
                          </label>
                        </div>

                        {/* Technologies */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <TechInput label="Réact. à combust." value={techCombustion} onChange={setTechCombustion} />
                          <TechInput label="Réact. à imp." value={techImpulsion} onChange={setTechImpulsion} />
                          <TechInput label="Prop. hyperespace" value={techHyperespace} onChange={setTechHyperespace} />
                          <TechInput label="Tech. Hyperespace" value={techHyperTech} onChange={setTechHyperTech} />
                        </div>

                        {/* LF bonuses */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className={labelCls}>Niveau LF Rocktal (Collecteur — vitesse/cargo transporteurs)</label>
                            <input type="number" min={0} max={30} value={lfRocktalCE}
                              onChange={e => setLfRocktalCE(Math.max(0, parseInt(e.target.value)||0))}
                              className={inputCls} />
                          </div>
                          <div>
                            <label className={labelCls}>Niveau LF Méchan (Général — vitesse/carbu vaisseaux militaires)</label>
                            <input type="number" min={0} max={30} value={lfMechanGE}
                              onChange={e => setLfMechanGE(Math.max(0, parseInt(e.target.value)||0))}
                              className={inputCls} />
                          </div>
                        </div>

                        {/* Circulaire */}
                        <div className="flex flex-wrap items-center gap-6">
                          <div>
                            <label className={labelCls}>Circulaire</label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                                <input type="checkbox" checked={circularSys} onChange={e => setCircularSys(e.target.checked)} className="accent-amber-400" />
                                Systèmes solaires
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                                <input type="checkbox" checked={circularGal} onChange={e => setCircularGal(e.target.checked)} className="accent-amber-400" />
                                Galaxies
                              </label>
                            </div>
                          </div>
                          <div className="min-w-36">
                            <label className={labelCls}>Nb. systèmes (défaut 499)</label>
                            <input type="number" min={1} max={999} value={nbSys}
                              onChange={e => setNbSys(Math.max(1, parseInt(e.target.value)||499))} className={inputCls} />
                          </div>
                          <div className="min-w-36">
                            <label className={labelCls}>Nb. galaxies (défaut 9)</label>
                            <input type="number" min={1} max={20} value={nbGal}
                              onChange={e => setNbGal(Math.max(1, parseInt(e.target.value)||9))} className={inputCls} />
                          </div>
                        </div>

                        {/* Deutérium */}
                        <div className="flex flex-wrap items-end gap-4">
                          <div className="min-w-48">
                            <label className={labelCls}>Conso. deut. Collecteur</label>
                            <select value={deutCollectorPct} onChange={e => setDeutCollectorPct(parseInt(e.target.value))} className={selectCls}>
                              {[100,90,80,70,60,50].map(v => <option key={v} value={v}>{v}%</option>)}
                            </select>
                          </div>
                          <div className="min-w-48">
                            <label className={labelCls}>Réduction conso. Général</label>
                            <select value={generalFuelReduction} onChange={e => setGeneralFuelReduction(parseInt(e.target.value))} className={selectCls}>
                              <option value={25}>25% réduction</option>
                              <option value={36}>36% réduction</option>
                              <option value={50}>50% réduction</option>
                            </select>
                          </div>
                          <div className="min-w-48">
                            <label className={labelCls}>Bonus personnage Collecteur (cargo %)</label>
                            <input type="number" min={0} max={100} value={collectorClassBonus}
                              onChange={e => setCollectorClassBonus(Math.max(0, parseFloat(e.target.value)||0))}
                              className={inputCls} placeholder="Ex: 25" />
                          </div>
                        </div>

                        {/* Bonus LF vaisseaux */}
                        <div className="bg-[#151924] border border-[#2E384D] rounded-lg overflow-hidden">
                          <button onClick={() => setShipStatsOpen(o => !o)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors">
                            <span className="text-sm font-bold text-gray-300">Bonus LF des vaisseaux (%)</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500">Vitesse / Cargaison / Carburant</span>
                              {shipStatsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                            </div>
                          </button>
                          <AnimatePresence>
                            {shipStatsOpen && (
                              <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
                                exit={{height:0,opacity:0}} transition={{duration:0.2}} className="overflow-hidden">
                                <div className="p-4 border-t border-[#2E384D]">
                                  <div className="flex justify-end mb-3">
                                    <Button size="sm" variant="outline"
                                      className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 text-xs"
                                      onClick={() => setShipBonuses(Object.fromEntries(SHIPS.map(s => [s.id, {speed:0,cargo:0,fuel:0}])))}>
                                      <RefreshCw className="w-3 h-3 mr-1" /> Réinitialiser
                                    </Button>
                                  </div>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b border-[#2E384D]">
                                          <th className="text-left py-2 px-2 text-gray-400 font-normal">Vaisseau</th>
                                          <th className="text-center py-2 px-2 text-gray-400 font-normal w-24">Vitesse %</th>
                                          <th className="text-center py-2 px-2 text-gray-400 font-normal w-24">Cargaison %</th>
                                          <th className="text-center py-2 px-2 text-gray-400 font-normal w-24">Carburant %</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {SHIPS.map(ship => (
                                          <tr key={ship.id} className="border-b border-[#2E384D]/50 hover:bg-white/3">
                                            <td className="py-1.5 px-2">
                                              <div className="flex items-center gap-2">
                                                <img src={ship.img} alt={ship.name} className="w-6 h-6 object-contain opacity-80" />
                                                <span className="text-gray-300 text-xs">{ship.name}</span>
                                              </div>
                                            </td>
                                            {(["speed","cargo","fuel"] as (keyof ShipBonus)[]).map(field => (
                                              <td key={field} className="py-1 px-2">
                                                <input type="number" min={-100} max={1000}
                                                  value={shipBonuses[ship.id]?.[field] ?? 0}
                                                  onChange={e => updateShipBonus(ship.id, field, parseFloat(e.target.value)||0)}
                                                  className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-xs w-full text-center focus:outline-none focus:border-primary/50" />
                                              </td>
                                            ))}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Override fleet speed */}
                        {scenarioMode === "moonbreak" ? (
                          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-amber-300 font-bold mb-2">
                              <input type="checkbox" checked={overrideFleetSpeed}
                                onChange={e => setOverrideFleetSpeed(e.target.checked)} className="accent-amber-400" />
                              Vitesse lue sur la phalange
                            </label>
                            <input type="number" min={1} value={overrideFleetSpeedValue}
                              disabled={!overrideFleetSpeed}
                              onChange={e => setOverrideFleetSpeedValue(Math.max(1, parseInt(e.target.value)||1))}
                              className={inputCls + (overrideFleetSpeed ? " border-amber-500/50" : " opacity-40 cursor-not-allowed")}
                              placeholder="ex: 12500" />
                            <p className="text-xs text-amber-200/70 mt-2">
                              💡 Si vous avez la vitesse exacte de la phalange, les niveaux de technologie n'ont pas besoin d'être renseignés.
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                              <input type="checkbox" checked={overrideFleetSpeed}
                                onChange={e => setOverrideFleetSpeed(e.target.checked)} className="accent-amber-400" />
                              Remplacer la vitesse de la flotte
                            </label>
                            <div className="min-w-40">
                              <input type="number" min={1} value={overrideFleetSpeedValue}
                                disabled={!overrideFleetSpeed}
                                onChange={e => setOverrideFleetSpeedValue(Math.max(1, parseInt(e.target.value)||1))}
                                className={inputCls + (overrideFleetSpeed ? "" : " opacity-40 cursor-not-allowed")}
                                placeholder="10000" />
                            </div>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── SECTION 2 : VAISSEAUX ── */}
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden">
                <button onClick={() => setShipsOpen(o => !o)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Rocket className="w-4 h-4 text-amber-400" />
                    Vaisseaux
                    {hasAnyShip && (
                      <span className="ml-2 text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        Vitesse flotte : {formatNum(fleetSpeed)}
                      </span>
                    )}
                  </div>
                  {shipsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>

                <AnimatePresence>
                  {shipsOpen && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}}
                      exit={{height:0,opacity:0}} transition={{duration:0.25}} className="overflow-hidden">
                      <div className="px-5 pb-5 border-t border-[#2E384D]">

                        {/* Fleet management */}
                        <div className="flex flex-wrap items-end gap-3 py-3">
                          <div className="flex-1 min-w-48">
                            <label className={labelCls}>Flotte sauvegardée</label>
                            <div className="flex gap-2">
                              <input type="text" value={fleetSlotName}
                                onChange={e => setFleetSlotName(e.target.value)}
                                placeholder="Nom de la flotte" className={inputCls} />
                              {savedFleets.length > 0 && (
                                <select className={selectCls + " w-40"} value="" onChange={e => setFleetSlotName(e.target.value)}>
                                  <option value="">— Sélectionner —</option>
                                  {savedFleets.map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-1.5 flex-wrap">
                            <Button size="sm" variant="outline"
                              className="bg-[#0B0E14] border-[#2E384D] text-gray-300 hover:text-white text-xs"
                              onClick={() => fleetSlotName && loadFleet(fleetSlotName)}>
                              <Download className="w-3 h-3 mr-1" /> Charger
                            </Button>
                            <Button size="sm" variant="outline"
                              className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 text-xs"
                              onClick={() => fleetSlotName.trim() && saveFleet(fleetSlotName)}>
                              <Upload className="w-3 h-3 mr-1" /> Sauvegarder
                            </Button>
                            {fleetSlotName && savedFleets.includes(fleetSlotName) && (
                              <Button size="sm" variant="outline"
                                className="bg-red-900/20 border-red-700/30 text-red-400 hover:bg-red-900/40 text-xs"
                                onClick={() => deleteFleet(fleetSlotName)}>
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                            <Button size="sm" variant="outline"
                              className="bg-red-900/20 border-red-700/30 text-red-400 hover:bg-red-900/40 text-xs"
                              onClick={() => setQuantities(Object.fromEntries(SHIPS.map(s => [s.id, 0])))}>
                              <X className="w-3 h-3 mr-1" /> Vider
                            </Button>
                            <button
                              onClick={() => setShowAdvanced(v => !v)}
                              className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1 border border-[#2E384D] rounded">
                              {showAdvanced ? "Avancé ▴" : "Avancé ▾"}
                            </button>
                          </div>
                          {showAdvanced && (
                            <div className="flex gap-1.5 flex-wrap mt-2 pl-2 border-l-2 border-[#2E384D]">
                              <Button size="sm" variant="outline"
                                className="bg-[#0B0E14] border-[#2E384D] text-gray-300 hover:text-white text-xs"
                                onClick={importFleet}>
                                <Upload className="w-3 h-3 mr-1" /> Import JSON flotte
                              </Button>
                              <Button size="sm" variant="outline"
                                className="bg-[#0B0E14] border-[#2E384D] text-gray-300 hover:text-white text-xs"
                                onClick={exportFleet}>
                                <Download className="w-3 h-3 mr-1" /> Export JSON flotte
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* 3-column ship grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {[shipsCol1, shipsCol2, shipsCol3].map((col, ci) => (
                            <div key={ci} className="space-y-2">
                              {col.map(ship => (
                                <div key={ship.id} className="flex items-center gap-2 bg-[#151924] border border-[#2E384D] rounded-lg px-3 py-2 hover:border-amber-500/30 transition-colors">
                                  <img src={ship.img} alt={ship.name}
                                    className="w-10 h-10 object-contain opacity-80 hover:opacity-100 hover:brightness-125 transition-all flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs text-gray-300 font-medium truncate">{ship.name}</div>
                                    <div className="text-xs text-gray-500 font-mono">{formatNum(effectiveSpeeds[ship.id] ?? ship.speed)}</div>
                                  </div>
                                  <input type="number" min={0} value={quantities[ship.id] ?? 0}
                                    onChange={e => {
                                      const v = Math.max(0, parseInt(e.target.value)||0);
                                      setQuantities(prev => ({...prev, [ship.id]: v}));
                                    }}
                                    className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1 text-white text-sm w-20 text-right focus:outline-none focus:border-amber-500/50" />
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── SECTION 3 : RÉSULTATS ── */}
              <div className="bg-[#1C2230] border border-[#2E384D] rounded-xl overflow-hidden">
                <div className="flex border-b border-[#2E384D]">
                  {(["temps","sauvegarde"] as const).map(tab => (
                    <button key={tab} onClick={() => setActiveResultTab(tab)}
                      className={`px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                        activeResultTab === tab
                          ? "border-b-2 border-amber-400 text-amber-400"
                          : "text-gray-400 hover:text-white"
                      }`}>
                      {tab === "temps" ? "Temps de vol" : "Points de sauvegarde"}
                    </button>
                  ))}
                </div>

                {/* TAB : TEMPS DE VOL */}
                {activeResultTab === "temps" && (
                  <div className="p-5">

                    <div className="flex flex-wrap items-start gap-5 mb-4">
                      <div>
                        <label className={labelCls}>Vitesse de mission</label>
                        <select value={missionSpeed} onChange={e => setMissionSpeed(parseFloat(e.target.value))}
                          className={selectCls + " w-20"}>
                          {Array.from({length: 10}, (_, i) => i + 1).map(v =>
                            <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <div className="flex items-start gap-2 bg-amber-950/40 border border-amber-700/40 rounded-lg px-3 py-2 max-w-sm mt-0.5">
                        <span className="text-amber-400 text-xs flex-shrink-0 mt-0.5">⚠️</span>
                        <p className="text-amber-200 text-xs leading-relaxed">
                          Vérifiez la vitesse selon le type de mission — elle peut varier entre missions hostiles et pacifiques sur certains univers.
                        </p>
                      </div>
                    </div>

                    {/* Bannière CDR */}
                    {scenarioMode === "cdr" && (
                      <div className="bg-orange-950/40 border border-orange-600/50 rounded-xl px-4 py-3 mb-4 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                        <p className="text-orange-200 text-sm">
                          <span className="font-bold text-orange-300">Flotte cachée dans un CDR</span> — Une flotte cachée dans un CDR peut contenir N'IMPORTE QUEL vaisseau. Vitesse = le vaisseau le plus lent. Ne supposez pas que c'est uniquement des recycleurs !
                        </p>
                      </div>
                    )}

                    {!hasAnyShip && (
                      <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-4 flex items-center gap-2 text-amber-300 text-sm">
                        <Info className="w-4 h-4 flex-shrink-0" />
                        Ajoutez des vaisseaux dans la section Vaisseaux pour voir les résultats.
                      </div>
                    )}

                    {hasDeathstar && missionType === "hostiles" && (
                      <div className="bg-purple-900/20 border border-purple-700/30 rounded-lg p-3 mb-4 text-xs text-purple-300 flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 flex-shrink-0" />
                        * En mission Guerre, l'Étoile de la mort ignore la vitesse de l'univers (toujours ×1).
                      </div>
                    )}

                    <div className="flex flex-col xl:flex-row gap-4">
                      {/* Tableau résultats */}
                      <div className="flex-1 overflow-x-auto">
                        <>
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-[#2E384D]">
                                  <th className="text-left py-2 px-3 text-gray-400 font-normal">Vitesse</th>
                                  <th className="text-left py-2 px-3 text-gray-400 font-normal">
                                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Durée</span>
                                  </th>
                                  <th className="text-left py-2 px-3 text-gray-400 font-normal">
                                    <span className="flex items-center gap-1"><Fuel className="w-3.5 h-3.5" /> Deut.</span>
                                  </th>
                                  <th className="text-left py-2 px-3 text-gray-400 font-normal">
                                    <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Cargo</span>
                                  </th>
                                  <th className="w-8 py-2"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {visibleRows.map(row => {
                                  const isSelected = row.pct === missionSpeedPct;
                                  const isFull = row.pct === 100;
                                  const isPlanLocked = planDuration === row.time && row.time > 0;
                                  return (
                                    <tr key={row.pct}
                                      className={`border-b border-[#2E384D]/40 transition-colors cursor-pointer
                                        ${isSelected ? "bg-amber-500/15 border-l-2 border-l-amber-400" : "hover:bg-white/5"}
                                        ${isFull && !isSelected ? "bg-white/3" : ""}
                                      `}
                                      onClick={() => {
                                        const sp = row.pct / 10;
                                        setMissionSpeed(sp);
                                      }}>
                                      <td className={`py-2 px-3 font-mono font-bold ${isSelected?"text-amber-400":isFull?"text-white":"text-gray-400"}`}>
                                        {row.pct}%
                                      </td>
                                      <td className={`py-2 px-3 font-mono ${isSelected?"text-amber-300":"text-gray-200"}`}>
                                        {hasAnyShip ? formatDuration(row.time) : "—"}
                                        {hasDeathstar && missionType === "hostiles" && <span className="text-purple-400 ml-1 text-xs">*</span>}
                                      </td>
                                      <td className={`py-2 px-3 font-mono text-xs ${isSelected?"text-amber-300":"text-blue-300"}`}>
                                        {hasAnyShip ? formatNum(row.fuel) : "—"}
                                      </td>
                                      <td className={`py-2 px-3 font-mono text-xs ${isSelected?"text-amber-300":"text-emerald-300"}`}>
                                        {hasAnyShip ? formatNum(row.cargo) : "—"}
                                      </td>
                                      <td className="py-2 px-1">
                                        {hasAnyShip && row.time > 0 && (
                                          <button
                                            onClick={e => { e.stopPropagation(); setPlanDuration(isPlanLocked ? null : row.time); }}
                                            title="Utiliser cette durée pour la planification"
                                            className={`p-1 rounded transition-colors ${isPlanLocked ? "text-amber-400 bg-amber-400/10" : "text-gray-500 hover:text-amber-400"}`}>
                                            <ArrowRight className="w-3 h-3" />
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                            <p className="text-xs text-gray-500 mt-2">
                              Cliquer une ligne = sélectionner cette vitesse · [→] = utiliser cette durée en planification
                              {playerClass !== "general" && <span className="ml-1 text-gray-600">(Général = paliers de 5%)</span>}
                            </p>
                          </>
                      </div>

                      {/* Bloc Planification */}
                      <div className="xl:w-64 flex-shrink-0">
                        <div className="bg-[#151924] border border-[#2E384D] rounded-xl overflow-hidden">
                          <div className="px-4 py-3 border-b border-[#2E384D]">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Planification</div>
                            <div className="text-xs text-gray-500 mt-0.5">
                              Durée : <span className="text-amber-400 font-mono">{hasAnyShip ? formatDuration(effectivePlanDuration) : "—"}</span>
                              {planDuration !== null && (
                                <button onClick={() => setPlanDuration(null)} className="ml-2 text-gray-600 hover:text-gray-400 text-xs underline">
                                  réinitialiser
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="p-3 space-y-3">
                            {flightSlots.map(slot => {
                              const calcTime = getCalcTime(slot);
                              return (
                                <div key={slot.id} className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-3 space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-300">
                                      {slot.mode === "depart" ? "⬆ Départ" : "⬇ Arrivée"}
                                    </span>
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => toggleSlotMode(slot.id)}
                                        className="p-1 text-gray-400 hover:text-primary transition-colors"
                                        title="Inverser Départ ↔ Arrivée">
                                        <ArrowRightLeft className="w-3 h-3" />
                                      </button>
                                      {flightSlots.length > 1 && (
                                        <button onClick={() => removeSlot(slot.id)}
                                          className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                                          <X className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  <input type="time" step="1" value={slot.time}
                                    onChange={e => updateSlotTime(slot.id, e.target.value)}
                                    className="bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1.5 text-white text-sm w-full focus:outline-none focus:border-amber-500/50 font-mono"
                                    placeholder="HH:MM:SS" />

                                  <div className="flex items-center gap-2">
                                    <div className="w-px h-6 bg-[#2E384D] mx-1" />
                                    <div className="flex-1">
                                      <div className="text-xs text-gray-500 mb-0.5">Vol</div>
                                      <div className="text-xs font-mono text-gray-300">
                                        {hasAnyShip ? formatDuration(effectivePlanDuration) : "—"}
                                      </div>
                                    </div>
                                  </div>

                                  <div className={`rounded p-2 ${slot.time ? "bg-amber-500/10 border border-amber-500/20" : "bg-[#0B0E14]"}`}>
                                    <div className="text-xs text-gray-400 mb-0.5">
                                      {slot.mode === "depart" ? "⬇ Arrivée" : "⬆ Départ"}
                                    </div>
                                    <div className={`text-sm font-mono font-bold ${slot.time ? "text-amber-400" : "text-gray-600"}`}>
                                      {slot.time ? calcTime : "?"}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            <button onClick={addSlot}
                              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-gray-400 hover:text-primary border border-dashed border-[#2E384D] hover:border-primary/30 rounded-lg transition-colors">
                              <Plus className="w-3 h-3" />
                              Ajouter un créneau
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── CALCULATEUR DE RETOUR RAPIDE ── */}
                    {(() => {
                      const parseT = (s: string) => {
                        const [h,m,sec] = s.split(":").map(Number);
                        return (h||0)*3600 + (m||0)*60 + (sec||0);
                      };
                      const fmt = (secs: number) => {
                        const s = ((secs % 86400) + 86400) % 86400;
                        const hh = Math.floor(s/3600), mm = Math.floor((s%3600)/60), ss = s%60;
                        return `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
                      };
                      const fmtDur = (secs: number) => {
                        const h = Math.floor(secs/3600), m = Math.floor((secs%3600)/60), s = secs%60;
                        return `${h}h ${m}m ${s}s`;
                      };
                      let result = "", durStr = "", error = false;
                      if (qrMode === "depart-arrivee" && qrDepart && qrArrivee) {
                        const dep = parseT(qrDepart), arr = parseT(qrArrivee);
                        const dur = ((arr - dep) + 86400) % 86400;
                        if (dur === 0) { error = true; }
                        else { const half = Math.floor(dur/2); result = fmt(dep + half); durStr = fmtDur(half); }
                      } else if (qrMode === "depart-rappel" && qrDepart && qrRappel) {
                        const dep = parseT(qrDepart), rap = parseT(qrRappel);
                        const dur = ((rap - dep) + 86400) % 86400;
                        if (dur === 0) { error = true; }
                        else { result = fmt(rap + dur); durStr = fmtDur(dur); }
                      }
                      const timeCls = "bg-[#0B0E14] border border-[#2E384D] rounded px-2 py-1.5 text-white text-sm focus:outline-none focus:border-amber-500/50 font-mono w-28";
                      return (
                        <div className="bg-[#151924] border border-[#2E384D] rounded-xl p-4 mt-4">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">⏱️ Calculateur de retour rapide</span>
                            <Link href="/outils/intercepteur" className="text-xs text-amber-400 hover:text-amber-300">
                              Outil dédié →
                            </Link>
                          </div>
                          <div className="flex flex-wrap items-end gap-3">
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">🚀 Départ</label>
                              <input type="time" step="1" value={qrDepart} onChange={e => setQrDepart(e.target.value)} className={timeCls} />
                            </div>
                            {qrMode === "depart-arrivee" ? (
                              <div>
                                <label className="text-xs text-gray-500 block mb-1">🎯 Arrivée souhaitée</label>
                                <input type="time" step="1" value={qrArrivee} onChange={e => setQrArrivee(e.target.value)} className={timeCls} />
                              </div>
                            ) : (
                              <div>
                                <label className="text-xs text-gray-500 block mb-1">🔄 Rappel (phalange)</label>
                                <input type="time" step="1" value={qrRappel} onChange={e => setQrRappel(e.target.value)} className={timeCls} />
                              </div>
                            )}
                            <button
                              onClick={() => setQrMode(m => m === "depart-arrivee" ? "depart-rappel" : "depart-arrivee")}
                              className="px-3 py-1.5 text-xs border border-[#2E384D] rounded bg-[#0B0E14] text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                              title="Basculer le mode">↕</button>
                            <div>
                              <label className="text-xs text-gray-500 block mb-1">
                                {qrMode === "depart-arrivee" ? "🔄 Rappel calculé" : "🎯 Arrivée calculée"}
                              </label>
                              <div className={`px-3 py-1.5 rounded font-mono text-sm font-bold min-w-28 text-center ${result ? "text-green-400 bg-green-500/10 border border-green-500/30" : "text-gray-600 bg-[#0B0E14] border border-[#2E384D]"}`}>
                                {result || "—"}
                              </div>
                              {durStr && <div className="text-xs text-gray-500 mt-1">Durée : {durStr}</div>}
                            </div>
                          </div>
                          {error && <p className="text-xs text-red-400 mt-2">⚠️ L'heure de départ est identique à l'heure saisie.</p>}
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* TAB : POINTS DE SAUVEGARDE */}
                {activeResultTab === "sauvegarde" && (
                  <div className="p-5">
                    <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-5 flex items-start gap-2">
                      <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-300">
                        <p className="font-bold text-white mb-1">Ghost / Fleetsave</p>
                        <p>Entrez l'heure de départ et de retour souhaitées. L'outil calcule toutes les coordonnées atteignables pour un aller-retour dans ce créneau. Cliquer une ligne pré-remplit la destination.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                      <div>
                        <label className={labelCls}>Départ</label>
                        <input type="datetime-local" step="1" value={saveStartDT}
                          onChange={e => setSaveStartDT(e.target.value)}
                          className={inputCls + " font-mono"} />
                        <button
                          onClick={() => {
                            const n = new Date();
                            const p = (x: number) => String(x).padStart(2,"0");
                            setSaveStartDT(`${n.getFullYear()}-${p(n.getMonth()+1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`);
                          }}
                          className="text-xs text-amber-400 hover:text-amber-300 mt-1">
                          (maintenant)
                        </button>
                      </div>
                      <div>
                        <label className={labelCls}>Retour</label>
                        <input type="datetime-local" step="1" value={saveReturnDT}
                          onChange={e => setSaveReturnDT(e.target.value)}
                          className={inputCls + " font-mono"} />
                      </div>
                      <div>
                        <label className={labelCls}>Tolérance (hh:mm)</label>
                        <input type="text" value={saveTolerance}
                          onChange={e => setSaveTolerance(e.target.value)}
                          placeholder="00:30" className={inputCls + " font-mono"} />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={runSavePointsSearch}
                          className="w-full bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30"
                          disabled={!saveStartDT || !saveReturnDT}>
                          <Search className="w-4 h-4 mr-2" /> Recherche
                        </Button>
                      </div>
                    </div>

                    {!hasAnyShip && (
                      <div className="text-xs text-amber-300 bg-amber-900/20 border border-amber-700/30 rounded px-3 py-2 mb-4">
                        Configurez une flotte pour afficher le deutérium consommé.
                      </div>
                    )}

                    {saveSearched && saveResults.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        Aucun résultat. Augmentez la tolérance ou ajustez les horaires.
                      </div>
                    )}

                    {saveResults.length > 0 && (
                      <div className="space-y-6">
                        {(["galaxie","systeme","planete"] as const)
                          .filter(type => saveResults.some(r => r.type === type))
                          .map(type => {
                            const rows = saveResults.filter(r => r.type === type);
                            const titles = {galaxie:"Galaxies", systeme:"Systèmes", planete:"Planètes"};
                            const colors = {galaxie:"bg-purple-400", systeme:"bg-blue-400", planete:"bg-green-400"};
                            return (
                              <div key={type}>
                                <h3 className="text-sm font-bold text-gray-300 mb-2 flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${colors[type]}`} />
                                  {titles[type]}
                                  <span className="text-xs font-normal text-gray-500">({rows.length} résultats)</span>
                                </h3>
                                <div className="overflow-x-auto">
                                  <table className="w-full text-sm">
                                    <thead>
                                      <tr className="border-b border-[#2E384D]">
                                        <th className="text-left py-2 px-3 text-gray-400 font-normal">Vitesse</th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-normal">Coordonnées</th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-normal">
                                          <span className="flex items-center gap-1"><Fuel className="w-3 h-3" /> Deut.</span>
                                        </th>
                                        <th className="text-left py-2 px-3 text-gray-400 font-normal">
                                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Durée aller</span>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {rows.map((r, i) => (
                                        <tr key={i}
                                          className="border-b border-[#2E384D]/40 hover:bg-white/5 cursor-pointer"
                                          onClick={() => applySaveResult(r)}
                                          title="Cliquer pour pré-remplir la destination">
                                          <td className="py-2 px-3 font-mono font-bold text-gray-300">{r.speed}%</td>
                                          <td className="py-2 px-3 text-gray-300 text-xs">{r.coordLabel}</td>
                                          <td className="py-2 px-3 font-mono text-xs text-blue-300">
                                            {hasAnyShip ? formatNum(r.fuel) : "—"}
                                          </td>
                                          <td className="py-2 px-3 font-mono text-xs text-amber-300">
                                            {formatDuration(r.duration)}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Lien guide */}
              <div className="bg-amber-900/20 border border-amber-700/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 text-sm">
                  <Info className="w-4 h-4" />
                  <span>Première utilisation ? → Guide complet : Moonbreak, CDR et interception</span>
                </div>
                <Link href="/guide/calc-temps-vol">
                  <Button size="sm" variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs">
                    Voir le guide →
                  </Button>
                </Link>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

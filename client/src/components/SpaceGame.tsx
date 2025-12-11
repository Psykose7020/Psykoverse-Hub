import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface Obstacle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  variant: number;
}

const SHIP_VARIANTS = [
  { name: "Chasseur Léger", body: "#4ADE80", accent: "#22C55E", glow: "rgba(74,222,128,0.8)", wings: "pointed", structure: 400 },
  { name: "Chasseur Lourd", body: "#EF4444", accent: "#B91C1C", glow: "rgba(239,68,68,0.8)", wings: "wide", structure: 1000 },
  { name: "Croiseur", body: "#00BFFF", accent: "#0080FF", glow: "rgba(0,191,255,0.8)", wings: "angular", structure: 2700 },
  { name: "Vaisseau Bataille", body: "#8B5CF6", accent: "#7C3AED", glow: "rgba(139,92,246,0.8)", wings: "heavy", structure: 6000 },
  { name: "Traqueur", body: "#F59E0B", accent: "#D97706", glow: "rgba(245,158,11,0.8)", wings: "sleek", structure: 7000 },
  { name: "Bombardier", body: "#6B7280", accent: "#374151", glow: "rgba(107,114,128,0.8)", wings: "bomber", structure: 7500 },
  { name: "Destructeur", body: "#DC2626", accent: "#7F1D1D", glow: "rgba(220,38,38,0.8)", wings: "massive", structure: 11000 },
  { name: "Étoile Mort", body: "#4A5568", accent: "#22C55E", glow: "rgba(34,197,94,0.9)", wings: "sphere", structure: 900000 },
  { name: "Petit Transport", body: "#14B8A6", accent: "#0D9488", glow: "rgba(20,184,166,0.8)", wings: "cargo", structure: 400 },
  { name: "Grand Transport", body: "#0EA5E9", accent: "#0369A1", glow: "rgba(14,165,233,0.8)", wings: "freighter", structure: 1200 },
  { name: "Colonisateur", body: "#84CC16", accent: "#65A30D", glow: "rgba(132,204,22,0.8)", wings: "colony", structure: 3000 },
  { name: "Recycleur", body: "#A3A3A3", accent: "#525252", glow: "rgba(163,163,163,0.8)", wings: "recycler", structure: 1600 },
  { name: "Sonde", body: "#E879F9", accent: "#D946EF", glow: "rgba(232,121,249,0.8)", wings: "probe", structure: 100 },
  { name: "Faucheur", body: "#EC4899", accent: "#DB2777", glow: "rgba(236,72,153,0.8)", wings: "reaper", structure: 14000 },
];

const MIN_STRUCTURE = Math.min(...SHIP_VARIANTS.map(s => s.structure));
const AVG_STRUCTURE = SHIP_VARIANTS.reduce((sum, s) => sum + s.structure, 0) / SHIP_VARIANTS.length;

function getShipScale(structure: number): number {
  const normalized = Math.min(Math.max(structure, MIN_STRUCTURE), AVG_STRUCTURE);
  const logMin = Math.log(MIN_STRUCTURE);
  const logMax = Math.log(AVG_STRUCTURE);
  const logValue = Math.log(normalized);
  const ratio = (logValue - logMin) / (logMax - logMin);
  return 0.75 + ratio * 0.5;
}

function getScoreMultiplier(structure: number): number {
  const scale = getShipScale(structure);
  return 0.6 + (scale - 0.75) * 1.6;
}

const PLANET_VARIANTS = [
  { from: "#8B7355", to: "#4A3728", hasRing: false, texture: "radial-gradient(ellipse at 30% 20%, #A08060 0%, transparent 40%), radial-gradient(ellipse at 70% 60%, #5A4030 0%, transparent 30%)" },
  { from: "#CD5C5C", to: "#8B2323", hasRing: false, texture: "radial-gradient(ellipse at 25% 30%, #E07070 0%, transparent 35%), radial-gradient(ellipse at 60% 70%, #702020 0%, transparent 25%)" },
  { from: "#4169E1", to: "#191970", hasRing: false, texture: "radial-gradient(ellipse at 40% 25%, #6090FF 0%, transparent 30%), radial-gradient(ellipse at 20% 60%, #1A2080 0%, transparent 40%)" },
  { from: "#DEB887", to: "#8B7355", hasRing: false, texture: "radial-gradient(ellipse at 35% 35%, #F0D0A0 0%, transparent 30%), radial-gradient(ellipse at 65% 55%, #6A5030 0%, transparent 35%)" },
  { from: "#F4A460", to: "#8B4513", hasRing: true, ringColor: "#D4A574", texture: "radial-gradient(ellipse at 30% 40%, #FFB870 0%, transparent 35%)" },
  { from: "#4682B4", to: "#1E3A5F", hasRing: false, texture: "radial-gradient(ellipse at 45% 30%, #5A9AC8 0%, transparent 40%), radial-gradient(ellipse at 25% 65%, #152A45 0%, transparent 30%)" },
  { from: "#FFE4B5", to: "#CD853F", hasRing: false, texture: "radial-gradient(ellipse at 40% 25%, #FFF0D0 0%, transparent 35%), radial-gradient(ellipse at 55% 70%, #A06020 0%, transparent 25%)" },
  { from: "#87CEEB", to: "#4682B4", hasRing: true, ringColor: "#A8D8EA", texture: "radial-gradient(ellipse at 35% 30%, #A0E0FF 0%, transparent 30%)" },
  { from: "#808080", to: "#2F2F2F", hasRing: false, texture: "radial-gradient(ellipse at 30% 25%, #A0A0A0 0%, transparent 30%), radial-gradient(ellipse at 60% 55%, #404040 0%, transparent 35%), radial-gradient(ellipse at 45% 75%, #252525 0%, transparent 20%)" },
  { from: "#FFA500", to: "#8B4500", hasRing: false, texture: "radial-gradient(ellipse at 25% 35%, #FFB830 0%, transparent 40%), radial-gradient(ellipse at 70% 50%, #703000 0%, transparent 30%)" },
];

function ShipPreview({ variant, size = 40 }: { variant: typeof SHIP_VARIANTS[0]; size?: number }) {
  const scale = size / 40;
  
  return (
    <div className="relative" style={{ width: size, height: size * 1.2 }}>
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ filter: `drop-shadow(0 0 ${8 * scale}px ${variant.glow})` }}
      >
        <div 
          className="relative"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${8 * scale}px solid transparent`,
            borderRight: `${8 * scale}px solid transparent`,
            borderBottom: `${20 * scale}px solid ${variant.body}`,
          }}
        />
        <div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 animate-pulse"
          style={{
            width: 4 * scale,
            height: 8 * scale,
            background: `linear-gradient(to bottom, ${variant.accent}, transparent)`,
            opacity: 0.8
          }}
        />
      </div>
    </div>
  );
}

export default function SpaceGame() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "gameover">("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [shipVariant, setShipVariant] = useState(0);
  const [pseudo, setPseudo] = useState("");
  const [univers, setUnivers] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [gameOffset, setGameOffset] = useState({ x: 0, y: 0 });
  
  const gameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerXRef = useRef(50);
  const playerYRef = useRef(85);
  const targetXRef = useRef(50);
  const targetYRef = useRef(85);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const obstacleIdRef = useRef(0);
  const isPlayingRef = useRef(false);
  const scoreRef = useRef(0);
  const shakeTargetRef = useRef({ x: 0, y: 0 });
  const lastShakeTimeRef = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem("psykoverse:highscore");
    if (saved) setHighScore(parseInt(saved));
    const savedShip = localStorage.getItem("psykoverse:ship");
    if (savedShip) setShipVariant(parseInt(savedShip));
  }, []);

  const updatePlayerPosition = useCallback(() => {
    if (!isPlayingRef.current) return;
    const diffX = targetXRef.current - playerXRef.current;
    const diffY = targetYRef.current - playerYRef.current;
    playerXRef.current += diffX * 0.5;
    playerYRef.current += diffY * 0.5;
    if (playerRef.current) {
      playerRef.current.style.left = `${playerXRef.current}%`;
      playerRef.current.style.top = `${playerYRef.current}%`;
    }
  }, []);

  const endGame = useCallback(() => {
    setGameState("gameover");
    isPlayingRef.current = false;
    document.exitPointerLock?.();
    setGameOffset({ x: 0, y: 0 });
    const finalScore = scoreRef.current;
    setScore(finalScore);
    const currentHigh = parseInt(localStorage.getItem("psykoverse:highscore") || "0");
    if (finalScore > currentHigh) {
      setHighScore(finalScore);
      localStorage.setItem("psykoverse:highscore", finalScore.toString());
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPlayingRef.current) return;
      
      if (document.pointerLockElement === gameRef.current) {
        const sensitivity = 0.15;
        const newX = targetXRef.current + e.movementX * sensitivity;
        const newY = targetYRef.current + e.movementY * sensitivity;
        targetXRef.current = Math.max(5, Math.min(95, newX));
        targetYRef.current = Math.max(20, Math.min(95, newY));
      } else if (gameRef.current) {
        const rect = gameRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        targetXRef.current = Math.max(5, Math.min(95, x));
        targetYRef.current = Math.max(20, Math.min(95, y));
      }
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement !== gameRef.current && isPlayingRef.current) {
        endGame();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
  }, [endGame]);

  const startGame = () => {
    localStorage.setItem("psykoverse:ship", shipVariant.toString());
    setGameState("playing");
    isPlayingRef.current = true;
    setScore(0);
    scoreRef.current = 0;
    setObstacles([]);
    setGameOffset({ x: 0, y: 0 });
    shakeTargetRef.current = { x: 0, y: 0 };
    playerXRef.current = 50;
    playerYRef.current = 85;
    targetXRef.current = 50;
    targetYRef.current = 85;
    if (playerRef.current) {
      playerRef.current.style.left = "50%";
      playerRef.current.style.top = "85%";
    }
    setSubmitted(false);
    setPseudo("");
    setUnivers("");
    lastTimeRef.current = performance.now();
    lastShakeTimeRef.current = performance.now();
    gameRef.current?.requestPointerLock?.();
  };

  const backToMenu = () => {
    setGameState("menu");
    setObstacles([]);
  };

  const submitScore = async () => {
    if (!pseudo.trim() || pseudo.length < 2) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: pseudo.trim(), univers: univers.trim() || "-", score })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevShip = () => {
    setShipVariant(prev => (prev - 1 + SHIP_VARIANTS.length) % SHIP_VARIANTS.length);
  };

  const nextShip = () => {
    setShipVariant(prev => (prev + 1) % SHIP_VARIANTS.length);
  };

  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreUpdateRef = useRef(0);
  const gameOffsetRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (gameState !== "playing") return;
    
    obstaclesRef.current = [];
    
    const gameLoop = (time: number) => {
      const deltaMs = time - lastTimeRef.current;
      lastTimeRef.current = time;
      
      const deltaFactor = deltaMs / 16.67;
      
      const multiplier = getScoreMultiplier(currentShip.structure);
      scoreRef.current += multiplier * deltaFactor * 0.25;
      
      scoreUpdateRef.current += deltaMs;
      if (scoreUpdateRef.current > 50) {
        scoreUpdateRef.current = 0;
        setScore(Math.floor(scoreRef.current));
      }
      
      updatePlayerPosition();

      if (scoreRef.current >= 2500) {
        const shakeDelta = time - lastShakeTimeRef.current;
        const progress = Math.min((scoreRef.current - 2500) / 17500, 1);
        const maxOffset = 200 + progress * 150;
        const changeInterval = Math.max(80, 600 - progress * 500);
        
        if (shakeDelta > changeInterval) {
          lastShakeTimeRef.current = time;
          const angle = Math.random() * Math.PI * 2;
          const distance = (0.5 + Math.random() * 0.5) * maxOffset;
          shakeTargetRef.current = {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance * 0.7
          };
        }
        
        gameOffsetRef.current = {
          x: gameOffsetRef.current.x + (shakeTargetRef.current.x - gameOffsetRef.current.x) * 0.06,
          y: gameOffsetRef.current.y + (shakeTargetRef.current.y - gameOffsetRef.current.y) * 0.06
        };
        setGameOffset({ ...gameOffsetRef.current });
      }

      for (const o of obstaclesRef.current) {
        o.y += o.speed * deltaFactor;
      }
      obstaclesRef.current = obstaclesRef.current.filter(o => o.y < 110);
      
      const difficultyRamp = Math.min(Math.max(0, scoreRef.current - 300) / 700, 1);
      const lateGameRamp = Math.min(Math.max(0, scoreRef.current - 1000) / 4000, 1);
      const spawnRate = (0.018 + difficultyRamp * 0.02 + lateGameRamp * 0.025) * deltaFactor;
      const baseSpeed = (0.45 + difficultyRamp * 0.35 + lateGameRamp * 0.4) * 1.125;
      
      if (Math.random() < spawnRate) {
        const randomOffset = (Math.random() - 0.5) * 30;
        const xPos = 7.5 + Math.random() * 85 + randomOffset * (Math.random() > 0.5 ? 1 : -1) * 0.3;
        const clampedX = Math.max(5, Math.min(95, xPos));
        
        const speedVariation = 0.3 + Math.random() * 0.9 + difficultyRamp * 0.5;
        
        obstaclesRef.current.push({
          id: obstacleIdRef.current++,
          x: clampedX,
          y: -10 - Math.random() * 5,
          size: 14 + Math.random() * 18,
          speed: baseSpeed + speedVariation * (0.7 + Math.random() * 0.6),
          variant: Math.floor(Math.random() * PLANET_VARIANTS.length)
        });
      }
      
      const basePlayerSize = 8;
      const scaledPlayerSize = basePlayerSize * getShipScale(SHIP_VARIANTS[shipVariant].structure);
      for (const o of obstaclesRef.current) {
        const dx = Math.abs(o.x - playerXRef.current);
        const dy = Math.abs(o.y - playerYRef.current);
        const minDist = (o.size / 2 + scaledPlayerSize) * 0.35;
        if (dx < minDist && dy < minDist) {
          endGame();
          return;
        }
      }
      
      setObstacles([...obstaclesRef.current]);
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameState, endGame, updatePlayerPosition]);

  const currentShip = SHIP_VARIANTS[shipVariant];
  const shipScale = getShipScale(currentShip.structure);

  return (
    <div ref={containerRef} className="hidden lg:block">
      <div 
        className="transition-transform duration-75 ease-out"
        style={{ 
          transform: `translate(${gameOffset.x}px, ${gameOffset.y}px)`,
        }}
      >
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-primary/70" />
            <span className="font-display font-bold text-white/80 text-xs">Space Escape</span>
            {score >= 2500 && (
              <span className="text-orange-400 text-[10px] animate-pulse">MODE CHAOS</span>
            )}
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Link 
              href="/classement" 
              className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 px-2 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1"
              data-testid="link-leaderboard"
            >
              <Trophy className="w-3 h-3" />
              Top
            </Link>
            <span className="text-primary font-bold">{Math.floor(score)}</span>
            <span className="text-yellow-400 flex items-center gap-1">
              <Trophy className="w-3 h-3" />{highScore}
            </span>
          </div>
        </div>

        <div
          ref={gameRef}
          className={`relative h-[320px] bg-black/10 rounded-2xl overflow-hidden select-none border border-white/5 ${gameState === "playing" ? "cursor-none" : "cursor-default"}`}
        >
        {gameState === "playing" && (
          <>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute pointer-events-none rounded-full bg-white/30"
                style={{
                  left: `${(i * 41 + score * 0.08) % 100}%`,
                  top: `${((i * 47 + score * (0.4 + (i % 3) * 0.2)) % 120) - 10}%`,
                  width: 1,
                  height: 2 + (i % 2),
                  opacity: 0.1 + (i % 3) * 0.05,
                }}
              />
            ))}
            <div
              ref={playerRef}
              className="absolute will-change-transform pointer-events-none"
              style={{ left: "50%", top: "85%", transform: `translate(-50%, -50%) scale(${shipScale})` }}
            >
              <div className="relative">
                <div 
                  className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[20px] border-l-transparent border-r-transparent"
                  style={{ 
                    borderBottomColor: currentShip.body,
                    filter: `drop-shadow(0 0 10px ${currentShip.glow})`
                  }}
                />
                <div 
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 opacity-80 animate-pulse"
                  style={{
                    background: `linear-gradient(to bottom, ${currentShip.accent}, transparent)`
                  }}
                />
              </div>
            </div>

            {obstacles.map(obstacle => {
              const v = PLANET_VARIANTS[obstacle.variant];
              return (
                <div
                  key={obstacle.id}
                  className="absolute pointer-events-none"
                  style={{
                    width: obstacle.size,
                    height: obstacle.size,
                    left: `${obstacle.x}%`,
                    top: `${obstacle.y}%`,
                    transform: 'translate3d(-50%, -50%, 0)',
                    willChange: 'transform',
                  }}
                >
                  <div
                    className="w-full h-full rounded-full relative"
                    style={{
                      background: `radial-gradient(circle at 30% 25%, ${v.from}, ${v.to} 70%, #000 100%)`,
                      boxShadow: `inset -4px -4px 12px rgba(0,0,0,0.8), inset 2px 2px 6px rgba(255,255,255,0.15), 0 0 ${obstacle.size * 0.3}px rgba(0,0,0,0.5)`
                    }}
                  >
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{ background: v.texture, opacity: 0.7 }}
                    />
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        background: 'radial-gradient(circle at 25% 20%, rgba(255,255,255,0.3) 0%, transparent 40%)',
                      }}
                    />
                    {v.hasRing && (
                      <svg 
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ width: obstacle.size * 2.2, height: obstacle.size * 0.9 }}
                        viewBox="0 0 110 45"
                      >
                        <defs>
                          <linearGradient id={`ring-${obstacle.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={v.ringColor || v.from} stopOpacity="0.2" />
                            <stop offset="50%" stopColor={v.ringColor || v.from} stopOpacity="0.7" />
                            <stop offset="100%" stopColor={v.ringColor || v.from} stopOpacity="0.2" />
                          </linearGradient>
                        </defs>
                        <ellipse 
                          cx="55" cy="22" rx="52" ry="10" 
                          fill="none" 
                          stroke={`url(#ring-${obstacle.id})`}
                          strokeWidth="4"
                        />
                        <ellipse 
                          cx="55" cy="22" rx="44" ry="7" 
                          fill="none" 
                          stroke={v.ringColor || v.from}
                          strokeWidth="2"
                          opacity="0.4"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}

        <AnimatePresence mode="wait">
          {gameState === "menu" && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4"
            >
              <Gamepad2 className="w-8 h-8 text-primary mb-2 drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
              <p className="text-white font-bold text-sm mb-4">Choisissez votre vaisseau</p>
              
              <div className="flex items-center gap-4 mb-4">
                <button 
                  onClick={prevShip}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-20 flex items-center justify-center">
                    <ShipPreview variant={currentShip} size={50} />
                  </div>
                  <p className="text-primary text-xs font-medium mt-1">{currentShip.name}</p>
                  <p className="text-gray-500 text-[10px]">{shipVariant + 1}/{SHIP_VARIANTS.length}</p>
                </div>
                
                <button 
                  onClick={nextShip}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <Button onClick={startGame} size="sm" className="mb-2">
                Jouer
              </Button>
              
              <Link 
                href="/classement"
                className="text-yellow-400 hover:text-yellow-300 text-xs flex items-center gap-1 transition-colors"
              >
                <Trophy className="w-3 h-3" />
                Voir le classement
              </Link>
            </motion.div>
          )}

          {gameState === "gameover" && (
            <motion.div
              key="gameover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4"
            >
              <div className="text-2xl mb-1">💥</div>
              <h4 className="font-display text-lg font-bold text-white">Game Over</h4>
              <p className="text-primary text-xl font-bold mb-3">{Math.floor(score)} pts</p>
              
              {!submitted ? (
                <div className="w-full max-w-xs space-y-2">
                  <input
                    type="text"
                    value={pseudo}
                    onChange={(e) => setPseudo(e.target.value.slice(0, 15))}
                    placeholder="Pseudo..."
                    className="w-full bg-[#1C2230] border border-[#2E384D] rounded-lg px-3 py-1.5 text-white text-center text-sm placeholder:text-gray-500 focus:outline-none focus:border-primary"
                    maxLength={15}
                  />
                  <input
                    type="text"
                    value={univers}
                    onChange={(e) => setUnivers(e.target.value.slice(0, 25))}
                    placeholder="Univers (optionnel)..."
                    className="w-full bg-[#1C2230] border border-[#2E384D] rounded-lg px-3 py-1.5 text-white text-center text-sm placeholder:text-gray-500 focus:outline-none focus:border-primary"
                    maxLength={25}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={submitScore}
                      disabled={isSubmitting || pseudo.trim().length < 2}
                      className="flex-1"
                      size="sm"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      {isSubmitting ? "..." : "Save"}
                    </Button>
                    <Button onClick={backToMenu} variant="outline" size="sm" className="border-primary/50">
                      Menu
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <p className="text-green-400 text-xs">Score enregistré !</p>
                  <Button onClick={backToMenu} size="sm">Menu</Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}

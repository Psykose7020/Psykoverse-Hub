import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, Send } from "lucide-react";
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
  { body: "#00BFFF", accent: "#0080FF", glow: "rgba(0,191,255,0.8)" },
  { body: "#FF6B6B", accent: "#FF4444", glow: "rgba(255,107,107,0.8)" },
  { body: "#4ADE80", accent: "#22C55E", glow: "rgba(74,222,128,0.8)" },
  { body: "#F59E0B", accent: "#D97706", glow: "rgba(245,158,11,0.8)" },
  { body: "#A855F7", accent: "#9333EA", glow: "rgba(168,85,247,0.8)" },
  { body: "#EC4899", accent: "#DB2777", glow: "rgba(236,72,153,0.8)" },
  { body: "#14B8A6", accent: "#0D9488", glow: "rgba(20,184,166,0.8)" },
  { body: "#EF4444", accent: "#B91C1C", glow: "rgba(239,68,68,0.8)" },
  { body: "#8B5CF6", accent: "#7C3AED", glow: "rgba(139,92,246,0.8)" },
  { body: "#06B6D4", accent: "#0891B2", glow: "rgba(6,182,212,0.8)" },
  { body: "#F97316", accent: "#EA580C", glow: "rgba(249,115,22,0.8)" },
  { body: "#84CC16", accent: "#65A30D", glow: "rgba(132,204,22,0.8)" },
  { body: "#E879F9", accent: "#D946EF", glow: "rgba(232,121,249,0.8)" },
  { body: "#FBBF24", accent: "#F59E0B", glow: "rgba(251,191,36,0.8)" },
  { body: "#38BDF8", accent: "#0EA5E9", glow: "rgba(56,189,248,0.8)" },
];

const OBSTACLE_VARIANTS = [
  { from: "#6B7280", to: "#374151", name: "asteroid" },
  { from: "#EF4444", to: "#7F1D1D", name: "mars" },
  { from: "#3B82F6", to: "#1E3A8A", name: "neptune" },
  { from: "#F59E0B", to: "#78350F", name: "venus" },
  { from: "#8B5CF6", to: "#4C1D95", name: "purple" },
  { from: "#10B981", to: "#064E3B", name: "earth" },
  { from: "#EC4899", to: "#831843", name: "pink" },
  { from: "#6366F1", to: "#312E81", name: "indigo" },
  { from: "#F97316", to: "#7C2D12", name: "orange" },
  { from: "#14B8A6", to: "#134E4A", name: "teal" },
];

export default function SpaceGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [shipVariant, setShipVariant] = useState(0);
  const [pseudo, setPseudo] = useState("");
  const [univers, setUnivers] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerXRef = useRef(50);
  const targetXRef = useRef(50);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const obstacleIdRef = useRef(0);
  const isPlayingRef = useRef(false);
  const scoreRef = useRef(0);

  useEffect(() => {
    const saved = localStorage.getItem("psykoverse:highscore");
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const updatePlayerPosition = useCallback(() => {
    if (!isPlayingRef.current) return;
    const diff = targetXRef.current - playerXRef.current;
    playerXRef.current += diff * 0.5;
    if (playerRef.current) {
      playerRef.current.style.left = `${playerXRef.current}%`;
    }
  }, []);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!gameRef.current || !isPlayingRef.current) return;
      const rect = gameRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      targetXRef.current = Math.max(5, Math.min(95, x));
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!gameRef.current || !isPlayingRef.current) return;
      const rect = gameRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      targetXRef.current = Math.max(5, Math.min(95, x));
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const startGame = () => {
    const randomShip = Math.floor(Math.random() * SHIP_VARIANTS.length);
    setShipVariant(randomShip);
    setIsPlaying(true);
    isPlayingRef.current = true;
    setIsGameOver(false);
    setScore(0);
    scoreRef.current = 0;
    setObstacles([]);
    playerXRef.current = 50;
    targetXRef.current = 50;
    if (playerRef.current) {
      playerRef.current.style.left = "50%";
    }
    setSubmitted(false);
    setPseudo("");
    setUnivers("");
    lastTimeRef.current = performance.now();
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsGameOver(true);
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

  const submitScore = async () => {
    if (!pseudo.trim() || pseudo.length < 2 || !univers.trim()) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: pseudo.trim(), univers: univers.trim(), score })
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = (time: number) => {
      const delta = time - lastTimeRef.current;
      
      if (delta > 16) {
        lastTimeRef.current = time;
        scoreRef.current += 1;
        setScore(scoreRef.current);
        
        updatePlayerPosition();

        setObstacles(prev => {
          const updated = prev
            .map(o => ({ ...o, y: o.y + o.speed }))
            .filter(o => o.y < 110);
          
          if (Math.random() < 0.018 + Math.min(scoreRef.current / 10000, 0.025)) {
            updated.push({
              id: obstacleIdRef.current++,
              x: Math.random() * 85 + 7.5,
              y: -10,
              size: 14 + Math.random() * 18,
              speed: 0.7 + Math.random() * 1.0 + Math.min(scoreRef.current / 2500, 1.2),
              variant: Math.floor(Math.random() * OBSTACLE_VARIANTS.length)
            });
          }
          
          const playerY = 85;
          const playerSize = 8;
          for (const o of updated) {
            const dx = Math.abs(o.x - playerXRef.current);
            const dy = Math.abs(o.y - playerY);
            const minDist = (o.size / 2 + playerSize) * 0.35;
            if (dx < minDist && dy < minDist) {
              endGame();
              return [];
            }
          }
          
          return updated;
        });
      }
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, endGame, updatePlayerPosition]);

  const currentShip = SHIP_VARIANTS[shipVariant];

  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-primary/70" />
          <span className="font-display font-bold text-white/80 text-xs">Space Escape</span>
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
          <span className="text-primary font-bold">{score}</span>
          <span className="text-yellow-400 flex items-center gap-1">
            <Trophy className="w-3 h-3" />{highScore}
          </span>
        </div>
      </div>

      <div
        ref={gameRef}
        className="relative h-[320px] rounded-2xl overflow-hidden cursor-none select-none border border-white/10"
        style={{
          background: "radial-gradient(ellipse at center, #0a0a1a 0%, #050510 100%)"
        }}
        onPointerDown={(e) => {
          if (!isPlaying && !isGameOver) {
            startGame();
          }
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
      >
        {isPlaying && (
          <>
            <div
              ref={playerRef}
              className="absolute will-change-transform pointer-events-none"
              style={{ left: "50%", top: "85%", transform: "translate(-50%, -50%)" }}
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
              const v = OBSTACLE_VARIANTS[obstacle.variant];
              return (
                <div
                  key={obstacle.id}
                  className="absolute rounded-full will-change-transform pointer-events-none"
                  style={{
                    left: `${obstacle.x}%`,
                    top: `${obstacle.y}%`,
                    width: obstacle.size,
                    height: obstacle.size,
                    transform: "translate(-50%, -50%)",
                    background: `radial-gradient(circle at 30% 30%, ${v.from}, ${v.to})`,
                    boxShadow: `inset -3px -3px 8px rgba(0,0,0,0.6), inset 2px 2px 4px rgba(255,255,255,0.15), 0 0 ${obstacle.size/3}px ${v.from}40`
                  }}
                />
              );
            })}
          </>
        )}

        <AnimatePresence>
          {!isPlaying && !isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40"
            >
              <Gamepad2 className="w-10 h-10 text-primary mb-3 drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
              <p className="text-white font-bold text-sm drop-shadow-lg">Cliquez pour jouer</p>
              <p className="text-gray-300 text-xs mb-3">Évitez les planètes</p>
              <Link 
                href="/classement"
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Voir le classement
              </Link>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-4"
            >
              <div className="text-2xl mb-1">💥</div>
              <h4 className="font-display text-lg font-bold text-white">Game Over</h4>
              <p className="text-primary text-xl font-bold mb-3">{score} pts</p>
              
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
                    placeholder="Univers..."
                    className="w-full bg-[#1C2230] border border-[#2E384D] rounded-lg px-3 py-1.5 text-white text-center text-sm placeholder:text-gray-500 focus:outline-none focus:border-primary"
                    maxLength={25}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={submitScore}
                      disabled={isSubmitting || pseudo.trim().length < 2 || !univers}
                      className="flex-1"
                      size="sm"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      {isSubmitting ? "..." : "Save"}
                    </Button>
                    <Button onClick={startGame} variant="outline" size="sm" className="border-primary/50">
                      Rejouer
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <p className="text-green-400 text-xs">Score enregistré !</p>
                  <Button onClick={startGame} size="sm">Rejouer</Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

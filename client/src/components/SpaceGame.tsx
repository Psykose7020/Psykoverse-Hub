import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Trophy, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface Star {
  x: number;
  y: number;
  speed: number;
  size: number;
}

export default function SpaceGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [stars, setStars] = useState<Star[]>([]);
  const [pseudo, setPseudo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const playerXRef = useRef(50);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const asteroidIdRef = useRef(0);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem("psykoverse:highscore");
    if (saved) setHighScore(parseInt(saved));
    
    const initialStars = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      speed: 0.5 + Math.random() * 1.5,
      size: 1 + Math.random() * 2
    }));
    setStars(initialStars);
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!gameRef.current || !isPlayingRef.current) return;
    const rect = gameRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    playerXRef.current = Math.max(5, Math.min(95, x));
    if (playerRef.current) {
      playerRef.current.style.left = `${playerXRef.current}%`;
    }
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isPlayingRef.current) {
        handleMove(e.clientX);
      }
    };
    
    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [handleMove]);

  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);

  const startGame = () => {
    setIsPlaying(true);
    isPlayingRef.current = true;
    setIsGameOver(false);
    setScore(0);
    setAsteroids([]);
    playerXRef.current = 50;
    if (playerRef.current) {
      playerRef.current.style.left = "50%";
    }
    setSubmitted(false);
    setPseudo("");
    lastTimeRef.current = performance.now();
  };

  const endGame = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setIsGameOver(true);
    setScore(prev => {
      const finalScore = prev;
      const currentHigh = parseInt(localStorage.getItem("psykoverse:highscore") || "0");
      if (finalScore > currentHigh) {
        setHighScore(finalScore);
        localStorage.setItem("psykoverse:highscore", finalScore.toString());
      }
      return finalScore;
    });
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const submitScore = async () => {
    if (!pseudo.trim() || pseudo.length < 2) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pseudo: pseudo.trim(), score })
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
        
        setScore(s => s + 1);
        
        setStars(prev => prev.map(star => ({
          ...star,
          y: star.y + star.speed > 100 ? 0 : star.y + star.speed
        })));

        setAsteroids(prev => {
          const updated = prev
            .map(a => ({ ...a, y: a.y + a.speed }))
            .filter(a => a.y < 110);
          
          if (Math.random() < 0.03 + Math.min(score / 5000, 0.05)) {
            updated.push({
              id: asteroidIdRef.current++,
              x: Math.random() * 90 + 5,
              y: -10,
              size: 15 + Math.random() * 20,
              speed: 1.5 + Math.random() * 2 + Math.min(score / 1000, 2)
            });
          }
          
          const playerY = 85;
          const playerSize = 8;
          for (const a of updated) {
            const dx = Math.abs(a.x - playerXRef.current);
            const dy = Math.abs(a.y - playerY);
            const minDist = (a.size / 2 + playerSize) * 0.4;
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
  }, [isPlaying, endGame, score]);

  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-primary/70" />
          <span className="font-display font-bold text-white/80 text-xs">Space Escape</span>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-primary font-bold">{score}</span>
          <span className="text-yellow-400 flex items-center gap-1">
            <Trophy className="w-3 h-3" />{highScore}
          </span>
        </div>
      </div>

      <div
        ref={gameRef}
        className="relative h-[320px] bg-black/20 rounded-2xl overflow-hidden cursor-none select-none border border-white/10"
        onMouseMove={handleMouseMove}
        onClick={() => !isPlaying && !isGameOver && startGame()}
      >
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
          />
        ))}

        {isPlaying && (
          <>
            <div
              ref={playerRef}
              className="absolute will-change-transform"
              style={{ left: "50%", top: "85%", transform: "translate(-50%, -50%)" }}
            >
              <div className="relative">
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[20px] border-l-transparent border-r-transparent border-b-primary drop-shadow-[0_0_10px_rgba(0,191,255,0.8)]" />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-gradient-to-b from-orange-400 to-transparent opacity-80 animate-pulse" />
              </div>
            </div>

            {asteroids.map(asteroid => (
              <div
                key={asteroid.id}
                className="absolute bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-lg will-change-transform"
                style={{
                  left: `${asteroid.x}%`,
                  top: `${asteroid.y}%`,
                  width: asteroid.size,
                  height: asteroid.size,
                  transform: "translate(-50%, -50%)",
                  boxShadow: "inset -3px -3px 6px rgba(0,0,0,0.5), inset 2px 2px 4px rgba(255,255,255,0.1)"
                }}
              />
            ))}
          </>
        )}

        <AnimatePresence>
          {!isPlaying && !isGameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/30"
            >
              <Gamepad2 className="w-10 h-10 text-primary mb-3 drop-shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
              <p className="text-white font-bold text-sm drop-shadow-lg">Cliquez pour jouer</p>
              <p className="text-gray-300 text-xs">Bougez la souris</p>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4"
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

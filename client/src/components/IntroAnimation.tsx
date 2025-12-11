import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import allianceLogo from "@assets/Design_sans_titre_(5)_1765452209873.png";

const INTRO_VERSION = "psykoverse:intro:v2";
const MIN_DURATION = 3000;
const MAX_DURATION = 8000;

const imagesToPreload = [
  allianceLogo,
  "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=225&fit=crop",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=225&fit=crop",
  "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=400&h=225&fit=crop",
];

function Star({ delay }: { delay: number }) {
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const duration = 0.5 + Math.random() * 0.5;
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 20, 40],
        x: (startX - 50) * 20,
        y: (startY - 50) * 20,
      }}
      transition={{ 
        duration,
        delay,
        ease: "easeOut"
      }}
    />
  );
}

export default function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);
  const [phase, setPhase] = useState<"loading" | "reveal" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState<number[]>([]);

  const preloadImages = useCallback(async () => {
    let loaded = 0;
    const promises = imagesToPreload.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setProgress((loaded / imagesToPreload.length) * 100);
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setProgress((loaded / imagesToPreload.length) * 100);
          resolve();
        };
        img.src = src;
      });
    });
    await Promise.all(promises);
  }, []);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem(INTRO_VERSION);
    if (hasSeenIntro) {
      setShowIntro(false);
      setPhase("done");
      return;
    }

    const starArray = Array.from({ length: 150 }, (_, i) => i);
    setStars(starArray);

    const startTime = Date.now();
    
    preloadImages().then(() => {
      const elapsed = Date.now() - startTime;
      const remainingMin = Math.max(0, MIN_DURATION - elapsed);
      
      setTimeout(() => {
        setPhase("reveal");
        setTimeout(() => {
          setPhase("done");
          localStorage.setItem(INTRO_VERSION, "true");
          setShowIntro(false);
        }, 1500);
      }, remainingMin);
    });

    const maxTimer = setTimeout(() => {
      if (phase === "loading") {
        setPhase("reveal");
        setTimeout(() => {
          setPhase("done");
          localStorage.setItem(INTRO_VERSION, "true");
          setShowIntro(false);
        }, 1500);
      }
    }, MAX_DURATION);

    return () => clearTimeout(maxTimer);
  }, [preloadImages, phase]);

  if (phase === "done" && !showIntro) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-[9999] bg-[#0B0E14] overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              {stars.map((i) => (
                <Star key={i} delay={i * 0.015} />
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0B0E14]" />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0, opacity: 0, rotateY: -180 }}
                animate={phase === "loading" ? 
                  { scale: [0, 1.2, 1], opacity: 1, rotateY: 0 } : 
                  { scale: 1.1, opacity: 1 }
                }
                transition={{ 
                  duration: 1.5, 
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.5
                }}
                className="relative"
              >
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 60px rgba(0, 191, 255, 0.3)",
                      "0 0 120px rgba(0, 191, 255, 0.6)",
                      "0 0 60px rgba(0, 191, 255, 0.3)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="rounded-full"
                >
                  <img 
                    src={allianceLogo} 
                    alt="Psykoverse" 
                    className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_40px_rgba(0,191,255,0.5)]"
                  />
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8 font-display text-3xl md:text-5xl font-bold text-white tracking-wider"
              >
                <span className="text-primary text-glow">PSYKO</span>VERSE
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="mt-4 text-gray-400 text-sm md:text-base"
              >
                Guides OGame Francophones
              </motion.p>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "200px" }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="mt-8 h-1 bg-[#1C2230] rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {phase === "reveal" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 text-primary font-medium"
                >
                  Bienvenue Commandant !
                </motion.div>
              )}
            </div>

            {phase === "reveal" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={`burst-${i}`}
                    className="absolute left-1/2 top-1/2 w-2 h-2 bg-primary rounded-full"
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ 
                      x: Math.cos(i * (Math.PI * 2 / 20)) * 300,
                      y: Math.sin(i * (Math.PI * 2 / 20)) * 300,
                      opacity: 0,
                      scale: 0
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className={showIntro ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
}

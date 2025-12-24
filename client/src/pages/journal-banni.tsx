import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Home,
  Calendar,
  AlertTriangle,
  Clock,
  Heart,
  Lock,
  Unlock,
  MessageSquare,
  Sparkles,
  Eye,
  EyeOff,
  MousePointer,
  RefreshCw
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

interface Chapter {
  date: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
  mood: "neutral" | "dark" | "hope" | "despair" | "relief";
}

const RevealText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [revealed, setRevealed] = useState(false);
  
  return (
    <div className="relative group">
      <motion.div
        initial={{ filter: "blur(8px)", opacity: 0.3 }}
        animate={revealed ? { filter: "blur(0px)", opacity: 1 } : {}}
        transition={{ duration: 0.5, delay }}
        className={!revealed ? "cursor-pointer" : ""}
        onClick={() => setRevealed(true)}
      >
        {children}
      </motion.div>
      {!revealed && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg cursor-pointer hover:bg-black/10 transition-colors"
          onClick={() => setRevealed(true)}
        >
          <div className="flex items-center gap-2 text-primary text-sm font-medium bg-[#1C2230] px-3 py-1.5 rounded-full border border-primary/30">
            <Eye className="w-4 h-4" />
            Cliquez pour révéler
          </div>
        </div>
      )}
    </div>
  );
};

const TypewriterText = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);
  
  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

const InteractiveChoice = ({ 
  question, 
  options, 
  onSelect,
  result 
}: { 
  question: string; 
  options: string[]; 
  onSelect: (index: number) => void;
  result?: { index: number; message: string };
}) => {
  return (
    <div className="bg-[#151924] border border-[#2E384D] rounded-xl p-6 my-6">
      <p className="text-white font-semibold mb-4 flex items-center gap-2">
        <MousePointer className="w-4 h-4 text-primary" />
        {question}
      </p>
      {!result ? (
        <div className="flex flex-wrap gap-3">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className="px-4 py-2 bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30 rounded-lg transition-all hover:scale-105"
              data-testid={`choice-${i}`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-300 italic"
        >
          {result.message}
        </motion.div>
      )}
    </div>
  );
};

const TerminalMessage = ({ lines }: { lines: string[] }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => prev < lines.length ? prev + 1 : prev);
    }, 800);
    return () => clearInterval(timer);
  }, [lines.length]);
  
  return (
    <div className="bg-black/80 border border-green-500/30 rounded-lg p-4 font-mono text-sm my-6">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-green-500/20">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="text-gray-500 text-xs ml-2">terminal</span>
      </div>
      {lines.slice(0, visibleLines).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={`${line.startsWith(">") ? "text-green-400" : line.startsWith("!") ? "text-red-400" : "text-gray-400"}`}
        >
          {line}
        </motion.div>
      ))}
      {visibleLines < lines.length && (
        <span className="text-green-400 animate-pulse">_</span>
      )}
    </div>
  );
};

const chapters: Chapter[] = [
  {
    date: "",
    title: "Couverture",
    icon: BookOpen,
    mood: "neutral",
    content: (
      <div className="flex flex-col items-center justify-center -mt-4">
        <motion.div 
          className="w-full max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/journal-cover.png" 
            alt="Le Journal d'un Banni - Psykose" 
            className="w-full h-auto rounded-2xl shadow-2xl shadow-primary/30 border-2 border-[#2E384D]"
          />
        </motion.div>
        
        <motion.div 
          className="w-full max-w-md mx-auto mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative rounded-xl overflow-hidden shadow-xl shadow-primary/20 border border-[#2E384D]">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/journal-cover.png"
              className="w-full h-auto"
              data-testid="cover-video"
            >
              <source src="/journal-cover-video.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
            <motion.div
              className="absolute bottom-3 left-3 right-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-white/80 text-xs font-medium">Animation en direct</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-400 italic text-lg">
            Une histoire vraie. Un bannissement. Une leçon.
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Décembre 2025</span>
          </div>
          <motion.button 
            className="pt-6 cursor-pointer hover:scale-105 transition-transform"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={() => window.dispatchEvent(new Event("nextChapter"))}
            data-testid="btn-start-reading"
          >
            <p className="text-primary font-medium flex items-center justify-center gap-2">
              <ChevronRight className="w-5 h-5" />
              Cliquez pour commencer la lecture
              <ChevronRight className="w-5 h-5" />
            </p>
          </motion.button>
        </div>
      </div>
    )
  },
  {
    date: "05 décembre",
    title: "L'instant où le jeu s'arrête mais pas la tête",
    icon: AlertTriangle,
    mood: "neutral",
    content: (
      <div className="space-y-6">
        <p className="text-xl italic text-gray-300">Je me connecte machinalement.</p>
        <p className="text-gray-400">Pas avec excitation. Pas avec appréhension.</p>
        <p className="text-gray-400">Avec ce geste neutre qu'on fait quand on joue depuis trop longtemps.</p>
        
        <div className="my-10 text-center">
          <p className="text-4xl font-bold text-white mb-4">Et puis… rien.</p>
          <p className="text-2xl text-red-400 font-semibold">Scorpius n'est plus là.</p>
        </div>
        
        <p className="text-gray-400">Pas de message dramatique. Pas d'écran rouge.</p>
        <p className="text-gray-400">Juste cette phrase, plantée là comme un panneau administratif sur une planète morte :</p>
        
        <TerminalMessage lines={[
          "> Connexion au serveur...",
          "> Vérification du compte...",
          "! ERREUR: Compte suspendu",
          "! Motif : botusing",
          "> Session terminée."
        ]} />
        
        <p className="text-gray-400">Je la relis. Deux fois. Trois fois.</p>
        <p className="text-white font-medium">Je ne suis pas surpris. Je suis… <span className="text-primary">vidé</span>.</p>
        
        <blockquote className="border-l-4 border-primary pl-6 my-8 py-2 bg-primary/5 rounded-r-lg">
          <p className="italic text-gray-300 text-lg">
            C'est étrange, un bannissement : ce n'est pas un choc, c'est un arrêt.
          </p>
          <p className="italic text-gray-300 text-lg mt-2">
            Comme si quelqu'un avait appuyé sur pause, mais seulement pour toi.
          </p>
        </blockquote>
        
        <p className="text-gray-400">Je m'adosse à ma chaise. Je pense au script.</p>
        <p className="text-gray-400">Pas avec colère. Pas avec honte.</p>
        <p className="text-gray-400">Avec cette lucidité désagréable qu'on a toujours après.</p>
        
        <RevealText>
          <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6 text-center">
            <p className="text-2xl text-gray-500 italic">« C'était une mauvaise idée. »</p>
            <p className="text-gray-600 mt-2">Pas héroïque. Pas tragique. Juste idiot.</p>
          </div>
        </RevealText>
      </div>
    )
  },
  {
    date: "06 décembre",
    title: "Le lendemain sans rythme",
    icon: Clock,
    mood: "dark",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-gray-300">Le lendemain, je me réveille plus tôt que d'habitude.</p>
        <p className="text-primary font-medium">Réflexe de joueur.</p>
        
        <div className="bg-[#151924] border border-[#2E384D] rounded-lg p-6 my-6">
          <p className="text-gray-400">Je regarde l'heure.</p>
          <p className="text-gray-400">Je calcule mentalement un temps de vol qui n'existe plus.</p>
          <p className="text-gray-400">Je tends la main vers la souris… puis je la repose.</p>
        </div>
        
        <div className="bg-gradient-to-r from-[#1C2230] to-[#151924] border-2 border-primary/30 rounded-xl p-8 my-8 text-center">
          <p className="text-xl text-white font-semibold mb-3">C'est là que je comprends :</p>
          <p className="text-2xl text-primary font-bold">Le bannissement n'enlève pas le jeu,</p>
          <p className="text-2xl text-primary font-bold">il enlève le rythme.</p>
        </div>
        
        <p className="text-gray-400">Tout est trop calme. Trop silencieux.</p>
        
        <div className="flex items-center gap-4 my-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <p className="text-green-400">Je vais sur le lobby. <span className="font-bold">Hercules est toujours là.</span></p>
        </div>
        
        <p className="text-gray-400 italic">Je clique dessus sans entrer. Juste pour vérifier qu'il existe encore.</p>
        <p className="text-gray-400">Je fais ça plusieurs fois dans la journée.</p>
        
        <RevealText delay={0.5}>
          <p className="text-gray-500 text-center text-lg italic my-6">
            Comme on vérifie qu'un proche respire encore.
          </p>
        </RevealText>
      </div>
    )
  },
  {
    date: "07 décembre",
    title: "Le mensonge confortable",
    icon: MessageSquare,
    mood: "neutral",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-white font-medium">Je me convaincs que tout va bien.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
            <Lock className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 font-semibold">Scorpius</p>
            <p className="text-gray-500 text-sm">Tombé. Logique. Accepté.</p>
          </div>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
            <Unlock className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <p className="text-green-400 font-semibold">Hercules</p>
            <p className="text-gray-500 text-sm">Tient. C'est l'essentiel.</p>
          </div>
        </div>
        
        <p className="text-gray-400">Je me raconte une histoire simple, rassurante :</p>
        
        <blockquote className="border-l-4 border-yellow-500 pl-6 my-6 bg-yellow-500/10 p-4 rounded-r-lg">
          <p className="italic text-yellow-300 text-xl">« Chaque univers est indépendant. »</p>
        </blockquote>
        
        <RevealText>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
            <p className="text-red-400 font-bold text-lg">C'est faux.</p>
            <p className="text-gray-500 mt-1">Mais à ce moment-là, j'en ai besoin.</p>
          </div>
        </RevealText>
        
        <p className="text-gray-400 mt-6">Je passe la journée à ne rien faire. À ouvrir le lobby. À le refermer.</p>
        
        <div className="text-center my-10 p-6 border border-[#2E384D] rounded-xl">
          <p className="text-xl text-white font-semibold">
            Je découvre que je suis devenu
          </p>
          <p className="text-2xl text-primary font-bold mt-2">
            spectateur de mon propre compte.
          </p>
        </div>
      </div>
    )
  },
  {
    date: "08 décembre",
    title: "Le temps s'étire",
    icon: Clock,
    mood: "dark",
    content: (
      <div className="space-y-6">
        <p className="text-xl italic text-gray-400">Le temps devient élastique.</p>
        
        <p className="text-gray-400">Je commence à lire les CGU.</p>
        <p className="text-gray-400">Pas comme un texte.</p>
        <p className="text-primary font-medium">Comme un roman policier où je connais déjà la fin.</p>
        
        <TerminalMessage lines={[
          "> Ouverture conditions_generales.pdf",
          "> Recherche: 'suspension'...",
          "> 47 résultats trouvés",
          "> Recherche: 'appel'...",
          "> 3 résultats trouvés",
          "! Aucune échappatoire détectée."
        ]} />
        
        <p className="text-gray-400">Je tombe sur l'article. Je le relis.</p>
        <p className="text-gray-400">Je comprends parfaitement ce qu'il dit.</p>
        
        <div className="bg-[#151924] border border-[#2E384D] rounded-lg p-6 my-8">
          <p className="text-center text-gray-400">
            Et pourtant, mon cerveau continue à chercher une nuance.
          </p>
          <p className="text-center text-gray-400 mt-2">Un angle. Une échappatoire.</p>
          
          <RevealText delay={1}>
            <p className="text-center text-red-400 font-bold text-2xl mt-6">Il n'y en a pas.</p>
          </RevealText>
        </div>
      </div>
    )
  },
  {
    date: "Entre deux jours",
    title: "Le second Scorpius",
    icon: Sparkles,
    mood: "hope",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-gray-400 italic">Dans cet état un peu flottant, je récupère un second compte Scorpius.</p>
        
        <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-lg p-6 my-6">
          <p className="text-green-400">Un compte arrivé <span className="font-bold">après la faute</span>.</p>
          <p className="text-green-400">Après le bannissement.</p>
          <p className="text-green-400">Après la claque.</p>
        </div>
        
        <p className="text-gray-400">Je le regarde comme on regarde une page blanche.</p>
        <p className="text-gray-400">Pas avec enthousiasme. <span className="text-primary font-medium">Avec prudence.</span></p>
        
        <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-gray-300">
          Je me dis que c'est peut-être une façon de continuer sans tricher…<br/>
          <span className="text-gray-500">Non. Mauvais mot.</span><br/>
          Sans déborder.
        </blockquote>
        
        <p className="text-gray-400">Je n'ose même pas y jouer vraiment.</p>
        <p className="text-gray-400">J'y vais doucement.</p>
        <p className="text-gray-400 italic">Comme si l'univers pouvait encore me voir.</p>
        
        <RevealText delay={0.5}>
          <div className="bg-red-900/30 border-2 border-red-500/50 rounded-xl p-6 text-center mt-8">
            <p className="text-red-400 font-bold text-xl">Spoiler : il me voyait déjà.</p>
          </div>
        </RevealText>
      </div>
    )
  },
  {
    date: "12 décembre",
    title: "L'effondrement",
    icon: Lock,
    mood: "despair",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-red-400 font-medium">Le 12 décembre, je comprends enfin ce qu'est un bannissement de lobby.</p>
        
        <p className="text-gray-400">Je me connecte.</p>
        
        <div className="text-center my-12">
          <motion.p 
            className="text-6xl font-bold text-white"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Rien.
          </motion.p>
          <p className="text-3xl text-gray-500 mt-4">Plus rien.</p>
        </div>
        
        <TerminalMessage lines={[
          "> Tentative de connexion...",
          "> Rafraîchissement...",
          "> Changement de navigateur...",
          "> Vérification identité...",
          "! ACCÈS REFUSÉ",
          "! Tous les univers verrouillés",
          "! Hercules: BLOQUÉ"
        ]} />
        
        <div className="bg-red-900/40 border-2 border-red-500/60 rounded-2xl p-10 my-10 text-center">
          <Lock className="w-20 h-20 text-red-500 mx-auto mb-6 animate-pulse" />
          <p className="text-3xl text-red-400 font-bold">Hercules compris.</p>
        </div>
        
        <p className="text-gray-400 italic">C'est là que quelque chose se brise.</p>
        <p className="text-gray-400 italic">Pas bruyamment. Intérieurement.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6">
            <p className="text-gray-500 text-sm mb-2">Scorpius</p>
            <p className="text-gray-400">C'était une erreur.</p>
          </div>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
            <p className="text-red-400 text-sm mb-2">Hercules</p>
            <p className="text-white font-semibold">C'était une vie parallèle.</p>
          </div>
        </div>
        
        <blockquote className="border-l-4 border-red-500 pl-6 my-8 text-gray-300 text-lg">
          Je réalise soudain que je peux rejouer…<br/>
          <span className="text-red-400 font-semibold">mais que je ne peux pas revenir.</span>
        </blockquote>
      </div>
    )
  },
  {
    date: "13 décembre",
    title: "Le vertige",
    icon: Heart,
    mood: "despair",
    content: (
      <div className="space-y-6">
        <p className="text-xl italic text-gray-400">Je tourne en rond.</p>
        <p className="text-gray-400">Je pense à des absurdités :</p>
        
        <div className="space-y-3 my-6 pl-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            <p className="text-gray-300">les premières planètes,</p>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            <p className="text-gray-300">les premières flottes,</p>
          </motion.div>
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            <p className="text-gray-300">les nuits à attendre un retour à 4h du matin.</p>
          </motion.div>
        </div>
        
        <p className="text-gray-400">Tout ça est enfermé derrière une décision administrative.</p>
        
        <div className="bg-[#151924] border border-[#2E384D] rounded-xl p-8 my-8">
          <p className="text-center text-gray-400">Je me surprends à être triste pour un jeu.</p>
          <p className="text-center text-gray-400 mt-2">Et ça me fait rire. Un rire nerveux.</p>
          
          <div className="my-6 text-center">
            <p className="text-primary font-semibold text-lg">
              « Sérieusement, tu vas pleurer pour des pixels ? »
            </p>
          </div>
          
          <RevealText>
            <div className="text-center">
              <p className="text-white font-bold text-2xl">Oui.</p>
              <p className="text-gray-300 mt-2">Parce que ces pixels racontaient quelque chose.</p>
            </div>
          </RevealText>
        </div>
      </div>
    )
  },
  {
    date: "14–15 décembre",
    title: "Le couloir administratif",
    icon: MessageSquare,
    mood: "neutral",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-white">Je découvre la hiérarchie comme on découvre les étages d'une prison.</p>
        
        <div className="space-y-4 my-8">
          <motion.div 
            className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 font-bold">GO</span>
              </div>
              <div>
                <p className="text-green-400 font-semibold">Game Operator</p>
                <p className="text-gray-400 text-sm">Répond. Poli. Calme.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold text-sm">SGO</span>
              </div>
              <div>
                <p className="text-blue-400 font-semibold">Super Game Operator</p>
                <p className="text-gray-400 text-sm">Supervise. Silencieux.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-purple-400 font-bold">GA</span>
              </div>
              <div>
                <p className="text-purple-400 font-semibold">Game Admin</p>
                <p className="text-gray-400 text-sm">Explique que c'est "hors cadre".</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-[#1C2230] border border-yellow-500/30 rounded-lg p-5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-xs">CoMa</span>
              </div>
              <div>
                <p className="text-yellow-400 font-semibold">Community Manager</p>
                <p className="text-gray-400 text-sm">Plane au-dessus, invisible.</p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <p className="text-gray-400">Je comprends que chaque message est une pièce.</p>
        <p className="text-white font-medium">Chaque phrase, une clé possible… ou un verrou.</p>
        
        <div className="text-center my-8 p-4 border border-[#2E384D] rounded-lg">
          <RefreshCw className="w-8 h-8 text-gray-500 mx-auto mb-2 animate-spin" style={{ animationDuration: '3s' }} />
          <p className="text-gray-500 italic">Je réécris tout dix fois.</p>
        </div>
      </div>
    )
  },
  {
    date: "16 décembre",
    title: "L'absurde",
    icon: AlertTriangle,
    mood: "neutral",
    content: (
      <div className="space-y-6">
        <p className="text-2xl text-yellow-400 font-medium">Et puis, l'absurde.</p>
        
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6 my-8">
          <p className="font-semibold text-yellow-400 mb-4 text-lg">Sur Scorpius :</p>
          <div className="space-y-3 pl-4">
            <div className="flex items-center gap-3">
              <span className="text-yellow-500">→</span>
              <p className="text-gray-300">je suis banni,</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500">→</span>
              <p className="text-gray-300">je récupère un compte après,</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500">→</span>
              <p className="text-gray-300">je peux continuer.</p>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-yellow-500/20">
            <p className="text-green-400 font-semibold">Donc l'erreur est datée.</p>
          </div>
        </div>
        
        <div className="text-center my-10">
          <p className="text-3xl text-red-400 font-bold">
            Mais Hercules reste enfermé.
          </p>
        </div>
        
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6">
          <p className="text-gray-400">Le compte le plus propre.</p>
          <p className="text-gray-400">Le plus ancien.</p>
          <p className="text-white font-semibold">Le plus investi.</p>
        </div>
        
        <div className="text-center my-10">
          <p className="text-gray-500 italic">Je commence à rire tout seul.</p>
          <p className="text-gray-500 italic">Un rire fatigué.</p>
          <p className="text-white mt-4">
            Celui des gens qui comprennent que la logique existe…
          </p>
          <p className="text-primary font-semibold text-lg">
            mais pas pour eux.
          </p>
        </div>
      </div>
    )
  },
  {
    date: "17 décembre",
    title: "La prison mentale",
    icon: Lock,
    mood: "dark",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-gray-400">Je dors mal.</p>
        
        <div className="bg-black/60 border border-gray-800 rounded-xl p-8 my-8 text-center">
          <p className="text-gray-500 italic text-lg">Je rêve de timers.</p>
          <p className="text-gray-500 italic text-lg mt-2">De flottes bloquées.</p>
          <p className="text-gray-500 italic text-lg mt-2">De boutons grisés.</p>
        </div>
        
        <p className="text-gray-400">Je réalise que le bannissement ne m'empêche pas de jouer.</p>
        
        <div className="bg-gradient-to-r from-red-900/20 to-[#1C2230] border-2 border-red-500/30 rounded-xl p-8 my-10 text-center">
          <p className="text-2xl text-red-400 font-bold">
            Il m'empêche de passer à autre chose.
          </p>
        </div>
        
        <div className="text-center">
          <p className="text-xl text-gray-400">Je suis libre…</p>
          <p className="text-xl text-white font-semibold mt-2">mais coincé.</p>
        </div>
      </div>
    )
  },
  {
    date: "18 décembre",
    title: "La fissure",
    icon: Unlock,
    mood: "hope",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-green-400 font-medium">Une réponse arrive.</p>
        
        <div className="bg-gradient-to-br from-green-900/30 to-teal-900/20 border-2 border-green-500/40 rounded-2xl p-10 my-10 text-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Unlock className="w-16 h-16 text-green-400 mx-auto mb-6" />
          </motion.div>
          <p className="text-green-400 font-bold text-2xl">Le second Scorpius est débanni.</p>
        </div>
        
        <p className="text-gray-400">Je relis le message. Lentement.</p>
        
        <div className="bg-[#1C2230] border border-primary/30 rounded-lg p-6 my-6">
          <p className="text-white font-semibold">Donc on peut distinguer.</p>
          <p className="text-primary font-medium mt-2">Donc tout n'est pas figé.</p>
        </div>
        
        <p className="text-primary">Je respire un peu mieux.</p>
        
        <div className="text-center my-10 p-6 bg-red-900/20 border border-red-500/30 rounded-xl">
          <Lock className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-red-400 font-semibold text-lg">
            Mais Hercules reste enfermé.
          </p>
        </div>
      </div>
    )
  },
  {
    date: "19–21 décembre",
    title: "L'aveu intérieur",
    icon: Heart,
    mood: "neutral",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-gray-400">À ce stade, je n'argumente plus.</p>
        <p className="text-white font-medium text-lg">Je parle simplement.</p>
        
        <div className="space-y-4 my-8">
          <motion.div 
            className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-gray-300">Je dis que <span className="text-primary font-medium">je comprends</span>.</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gray-300">Je dis que <span className="text-primary font-medium">j'accepte</span>.</p>
          </motion.div>
          
          <motion.div 
            className="bg-primary/10 border border-primary/30 rounded-lg p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-primary">Je dis que je demande juste <span className="font-bold">une proportion</span>.</p>
          </motion.div>
        </div>
        
        <div className="text-center my-10">
          <p className="text-gray-400 italic text-lg">Je parle comme un type fatigué.</p>
          <p className="text-gray-500 mt-2">Pas comme un joueur.</p>
          <p className="text-gray-500">Pas comme un avocat.</p>
        </div>
      </div>
    )
  },
  {
    date: "22 décembre",
    title: "La phrase",
    icon: Sparkles,
    mood: "relief",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-gray-400">Elle arrive.</p>
        <p className="text-gray-400">Courte. Sèche. Humaine.</p>
        
        <div className="my-16">
          <motion.div 
            className="bg-gradient-to-r from-green-900/40 via-primary/30 to-green-900/40 border-2 border-green-500/50 rounded-2xl p-12 text-center shadow-2xl shadow-green-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p 
              className="text-5xl md:text-6xl font-bold text-green-400 font-display"
              animate={{ textShadow: ["0 0 20px rgba(74, 222, 128, 0)", "0 0 40px rgba(74, 222, 128, 0.5)", "0 0 20px rgba(74, 222, 128, 0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Another chance.
            </motion.p>
          </motion.div>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-400">Je reste immobile.</p>
          <p className="text-gray-400">Je n'ai pas envie de crier victoire.</p>
          <p className="text-white font-semibold text-lg">J'ai juste envie de… m'asseoir.</p>
        </div>
        
        <div className="text-center mt-12">
          <motion.div 
            className="inline-flex items-center gap-4 bg-green-500/20 text-green-400 px-8 py-4 rounded-full border-2 border-green-500/40 shadow-lg shadow-green-500/20"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Unlock className="w-8 h-8" />
            <span className="font-bold text-2xl">Hercules est là.</span>
          </motion.div>
        </div>
        
        <div className="mt-10 p-6 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
          <p className="text-green-400 italic">
            Je me dis que c'est fini. Que j'ai eu de la chance.
          </p>
          <p className="text-gray-400 mt-2">
            Que je ne referai plus jamais cette erreur.
          </p>
        </div>
      </div>
    )
  },
  {
    date: "23 décembre",
    title: "Le même jour, quelques heures plus tard",
    icon: Lock,
    mood: "despair",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-gray-400">Je venais à peine de respirer.</p>
        <p className="text-gray-400">Hercules était revenu. J'avais eu ma seconde chance.</p>
        <p className="text-gray-400">Je me disais que le pire était derrière.</p>
        
        <div className="my-10 text-center">
          <motion.p 
            className="text-4xl font-bold text-red-400"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Et puis le message est arrivé.
          </motion.p>
        </div>
        
        <TerminalMessage lines={[
          "> Message reçu : 23/12/2025 15:54:08",
          "> Expéditeur : Super Opérateur",
          "> Objet : Bannissement définitif",
          "---",
          "Suite au débanissement de votre compte,",
          "précédemment banni à la suite d'une extension",
          "de votre bannissement pour botusing sur Scorpius,",
          "nous avons voulu vérifier si, effectivement,",
          "vous n'utilisez pas de bot sur Hercules.",
          "---",
          "! L'analyse conséquente a permis de constater",
          "! que c'est malheureusement également le cas.",
          "---",
          "! Le compte est donc banni définitivement",
          "! pour botusing."
        ]} />
        
        <div className="bg-red-900/30 border-2 border-red-500/50 rounded-2xl p-8 my-10">
          <p className="text-center text-red-400 font-bold text-2xl mb-4">
            La seconde chance venait d'être retirée.
          </p>
          <p className="text-center text-gray-400">
            L'analyse avait été faite. Sur Hercules.
          </p>
          <p className="text-center text-gray-400 mt-2">
            Ils ont trouvé l'usage du même script. Celui que j'avais créé pour Scorpius.
          </p>
          <p className="text-center text-gray-500 mt-2 text-sm italic">
            Le même outil. Un autre univers. Même conséquence.
          </p>
        </div>
        
        <div className="text-center space-y-4">
          <p className="text-gray-400">Je regarde l'écran.</p>
          <p className="text-gray-400">Je ne ressens même plus de colère.</p>
          <p className="text-white font-semibold text-xl">Juste une fatigue immense.</p>
        </div>
        
        <div className="mt-10 bg-[#1C2230] border border-[#2E384D] rounded-xl p-6 md:p-8">
          <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-500" />
            Ce que je me dis à ce moment-là
          </h5>
          
          <div className="space-y-4 text-gray-400 leading-relaxed">
            <p>
              J'avais gardé l'espoir. Tout au long de cette histoire, j'avais gardé l'espoir qu'aucune trace 
              de ce script ne soit visible sur Hercules. À mes yeux, il n'avait pas vraiment servi sur ce compte. 
              Pas comme sur Scorpius.
            </p>
            
            <p>
              Et pourtant, ils ont trouvé.
            </p>
            
            <p className="text-gray-500 italic border-l-2 border-gray-600 pl-4">
              Une "analyse conséquente" en 5 heures ? C'est ce qu'on m'a dit.
              <br/>
              Je ne peux m'empêcher de penser que le dossier était déjà prêt. 
              Préparé "au cas où" le Community Manager serait favorable à une seconde chance.
            </p>
            
            <p>
              Comme si, depuis le début, l'objectif avait toujours été de me mettre hors-ligne définitivement.
            </p>
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-yellow-900/20 to-transparent border-l-4 border-yellow-500/50 p-6 rounded-r-xl">
          <p className="text-yellow-400/80 font-medium mb-3">Un sentiment qui reste</p>
          <p className="text-gray-400">
            Je garde la sensation que nous ne sommes pas tous égaux face au staff. 
            Même si ces derniers semblent faire de leur mieux, un traitement plus humain aurait été souhaitable.
          </p>
          <p className="text-gray-500 mt-3 text-sm italic">
            Je ne dis pas qu'ils ont tort. Je dis juste que la manière compte autant que la décision.
          </p>
        </div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 italic mb-4">Je n'avais plus rien à défendre. Juste quelque chose à dire.</p>
          <p className="text-gray-400">Alors j'ai écrit une dernière réponse.</p>
        </div>
        
        <div className="mt-8 bg-gradient-to-br from-primary/5 via-[#1C2230] to-[#151924] border border-primary/30 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-primary/20">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-white font-semibold">Ma réponse au staff</p>
              <p className="text-gray-500 text-xs">23/12/2025 17:52:56</p>
            </div>
          </div>
          
          <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <p>Bonjour,</p>
            <p>
              Je vous remercie pour votre dernier message et pour les explications apportées.
            </p>
            <p>
              Je souhaite simplement vous faire part, une dernière fois, de ce que cette décision représente 
              pour moi. Après de très nombreuses années passées sur OGame, ce bannissement définitif marque 
              pour moi la fin de mon parcours dans le jeu.
            </p>
            <p>
              L'infraction reconnue, que je considère comme un écart isolé et sans précédent dans mon gameplay, 
              a eu des conséquences d'une ampleur que je n'aurais jamais pu imaginer. Je n'ai jamais cherché à 
              contourner durablement les règles, ni à m'inscrire dans une pratique systématique ou répétée. 
              Malgré cela, l'enchaînement des décisions et la rapidité avec laquelle la situation a évolué 
              m'ont donné le sentiment d'un processus devenu impossible à enrayer.
            </p>
            <p>
              Au-delà de la sanction elle-même, c'est surtout la perte d'un univers dans lequel je me suis 
              investi pendant des années, en temps, en énergie et en engagement, qui est difficile à accepter. 
              <span className="text-gray-500 italic">(Hercules étant l'aboutissement de cela)</span>
            </p>
            <p>
              Je prends néanmoins acte de votre position et de la décision finale. Mon message n'a pas vocation 
              à relancer un débat, mais simplement à exprimer, de manière sincère, ce que cette issue représente 
              humainement pour moi.
            </p>
            <p>
              Je vous remercie pour le temps consacré à mon dossier et vous souhaite une bonne continuation.
            </p>
            <p className="text-gray-400">Cordialement,<br/>Psykose</p>
          </div>
        </div>
        
        <div className="mt-10 p-6 bg-[#1C2230] border border-[#2E384D] rounded-xl">
          <p className="text-gray-400 italic text-center">
            C'est là que je comprends que c'est vraiment terminé.
          </p>
          <p className="text-gray-500 text-center mt-2">
            Pas juste le compte. Pas juste le jeu.
          </p>
          <p className="text-primary font-semibold text-center mt-2">
            Toute une époque.
          </p>
        </div>
      </div>
    )
  },
  {
    date: "Communication importante",
    title: "Lettre ouverte à la communauté",
    icon: Heart,
    mood: "neutral",
    content: (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-primary/5 via-[#1C2230] to-[#151924] border border-primary/20 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-primary/20">
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white">Communication importante</h4>
              <p className="text-gray-500">De Psykose, à tous ceux qui ont suivi l'aventure</p>
            </div>
          </div>
          
          <div className="space-y-8 text-gray-300 leading-relaxed text-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-xl"
            >
              <p className="text-red-300 font-semibold text-xl mb-2">Il n'y aura pas de retour.</p>
              <p className="text-gray-400">
                Pas de nouveau départ, pas de compte recréé, pas d'univers parallèle pour faire semblant que rien ne s'est passé. Ce qui s'achève ici n'est pas seulement Hercules, ni même OGame dans son ensemble, mais une histoire complète, commencée il y a des années et menée jusqu'à son terme.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-white font-medium italic text-center text-xl">L'écran s'éteint sans bruit.</p>
              <p className="text-gray-400 text-center">Le bouton « Jouer » devient inutile.</p>
              <p className="text-gray-400">
                Et avec lui disparaissent des habitudes, des réflexes, une présence quotidienne devenue presque naturelle. OGame ne sera plus un détour, ni un refuge, ni même une tentation. Cette décision marque une fin totale du jeu pour moi.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#0B0E14] border border-[#2E384D] rounded-xl p-6"
            >
              <p className="text-gray-300">
                Ce qui rend cette fin particulière, ce n'est pas la sanction en elle-même, mais ce qu'elle emporte. Des années d'investissement, de patience, de passion parfois déraisonnable. Un parcours imparfait, comme tous les parcours humains, mais sincère. Un seul écart, jugé insignifiant sur le moment, aura entraîné des conséquences dont je n'avais jamais imaginé l'ampleur. Non pas une simple correction, mais une rupture nette, définitive, irréversible.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-green-900/20 to-transparent border-l-4 border-green-500/50 p-6 rounded-r-xl"
            >
              <p className="text-green-400 font-medium mb-3">Il y a eu l'espoir, pourtant.</p>
              <p className="text-gray-400">
                Un moment bref, fragile, mais réel. Lorsqu'une seconde chance a été accordée. Lorsqu'un regard humain a semblé primer sur la mécanique. Cet espoir n'était pas une illusion volontaire, mais une confiance accordée, pleinement, honnêtement. Sa disparition n'en a été que plus douloureuse, laissant derrière elle cette sensation étrange d'avoir cru encore, trop tard.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center py-8"
            >
              <p className="text-2xl text-white font-display">Alors vient le temps du retrait.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-gray-300">
                Le commandant quitte l'univers sans fracas, sans colère affichée, sans chercher à convaincre ou à réécrire ce qui ne changera plus. Avec de l'amertume, oui, mais aussi avec une forme de lucidité. Tout ne se gagne pas. Tout ne se corrige pas. Et parfois, partir dignement est la seule chose qu'il reste à faire.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="bg-primary/10 border border-primary/30 rounded-xl p-6"
            >
              <p className="text-primary font-medium mb-3">Le Psykoverse, lui aussi, sera impacté.</p>
              <p className="text-gray-400">
                Il ne peut en être autrement. Un projet né de la passion du jeu, construit autour du partage, de la transmission, de l'envie d'aider les autres à progresser sans se perdre. Cette dynamique ne disparaîtra pas du jour au lendemain, mais elle devra évoluer, se transformer, s'adapter à une réalité nouvelle.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-white font-medium mb-3">Je m'assurerai que la suite se fasse avec dignité.</p>
              <p className="text-gray-400">
                Sans amertume projetée sur les autres. Sans abandon brutal. Le Psykoverse ne sera pas laissé à l'abandon, mais il ne sera plus porté de la même manière. Ce qui doit s'éteindre s'éteindra proprement. Ce qui peut subsister le fera sans trahir l'esprit initial.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="text-center space-y-2 py-6 text-gray-500 italic"
            >
              <p>Les univers continueront sans moi.</p>
              <p>Les classements évolueront.</p>
              <p>D'autres construiront, d'autres tomberont, d'autres apprendront à leurs dépens les règles invisibles de ces mondes persistants.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 }}
              className="bg-gradient-to-br from-[#5865F2]/10 via-[#1C2230] to-transparent border border-[#5865F2]/30 rounded-xl p-6"
            >
              <p className="text-gray-300">
                Et quelque part, dans la mémoire silencieuse du jeu, restera la trace d'un commandant imparfait, passionné, parfois naïf, mais toujours investi. Quelqu'un qui aura joué longtemps, sincèrement, et jusqu'au bout.
              </p>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center py-10 bg-gradient-to-b from-transparent via-[#1C2230]/50 to-transparent rounded-2xl"
        >
          <p className="text-2xl text-white font-display mb-4">La transmission s'achève ici.</p>
          <p className="text-gray-400 text-lg mb-2">Sans retour prévu.</p>
          <p className="text-primary font-semibold text-xl mt-6">Mais sans regret d'avoir essayé.</p>
          <div className="mt-8">
            <p className="text-gray-600 text-sm">— Psykose</p>
          </div>
        </motion.div>
      </div>
    )
  },
  {
    date: "Épilogue",
    title: "Ce que cette prison m'a laissé",
    icon: BookOpen,
    mood: "relief",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-gray-400">Je n'ai pas gagné. Je n'ai pas perdu.</p>
        <p className="text-white font-semibold text-2xl mb-8">J'ai appris que :</p>
        
        <div className="space-y-4">
          {[
            "l'habitude est dangereuse,",
            "l'expérience n'immunise pas,",
            "le lobby n'oublie jamais,",
            "et que l'humilité est parfois la seule clé."
          ].map((lesson, i) => (
            <motion.div 
              key={i}
              className="flex items-start gap-4 bg-[#1C2230] border border-[#2E384D] rounded-lg p-5"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <span className="text-primary text-2xl">→</span>
              <p className="text-gray-300 text-lg">{lesson}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-br from-red-900/20 via-[#1C2230] to-primary/10 border-2 border-red-500/30 rounded-2xl p-10">
          <h4 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            Dernière note à moi-même
          </h4>
          
          <div className="space-y-4 text-gray-300 text-lg">
            <p>Ne jamais croire que l'expérience donne des passe-droits.</p>
            <p>Ne jamais croire que "ça passe" parce que "ça a toujours passé".</p>
            <p>Ne jamais croire qu'un script est "juste un outil".</p>
          </div>
          
          <div className="mt-10 pt-8 border-t border-red-500/30 text-center">
            <p className="text-xl text-white italic mb-4">Et surtout :</p>
            <blockquote className="text-primary font-semibold text-xl md:text-2xl leading-relaxed">
              Quand tu te dis "personne ne verra",<br/>
              c'est souvent que quelqu'un regarde déjà depuis longtemps.
            </blockquote>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">— Fin du journal —</p>
        </div>
        
        <div className="mt-16 bg-gradient-to-br from-[#5865F2]/20 via-[#1C2230] to-primary/10 border-2 border-[#5865F2]/40 rounded-2xl p-8 md:p-10">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#5865F2]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-[#5865F2]" />
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Et vous, qu'en pensez-vous ?</h4>
            <p className="text-gray-400 max-w-lg mx-auto">
              Cette histoire vous a parlé ? Vous avez vécu quelque chose de similaire ? 
              Venez partager votre avis avec la communauté !
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://discord.gg/3PWk4HmfNn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 shadow-lg shadow-[#5865F2]/30"
              data-testid="btn-discord-journal"
            >
              <MessageSquare className="w-5 h-5" />
              Discuter sur Discord
            </a>
            <button 
              onClick={() => window.dispatchEvent(new Event("openFeedbackModal"))}
              className="inline-flex items-center justify-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary font-bold px-6 py-3 rounded-xl transition-all hover:scale-105 border border-primary/30"
              data-testid="btn-feedback-journal"
            >
              <Heart className="w-5 h-5" />
              Laisser un feedback
            </button>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            Votre retour nous aide à créer du contenu qui vous ressemble.
          </p>
        </div>
      </div>
    )
  }
];

const moodBackgrounds: Record<string, { gradient: string; elements: React.ReactNode }> = {
  neutral: {
    gradient: "from-slate-900 via-[#0B0E14] to-[#0B0E14]",
    elements: (
      <>
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/50 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />
      </>
    )
  },
  dark: {
    gradient: "from-slate-950 via-gray-950 to-[#0B0E14]",
    elements: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-black/80" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
        <div className="absolute top-1/4 left-10 w-1 h-1 bg-gray-500/30 rounded-full" />
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-gray-600/20 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-slate-800/20 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-gray-900/30 rounded-full blur-2xl" />
      </>
    )
  },
  hope: {
    gradient: "from-emerald-950/50 via-teal-950/30 to-[#0B0E14]",
    elements: (
      <>
        <div className="absolute top-10 right-20 w-3 h-3 bg-green-400/40 rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-10 w-2 h-2 bg-emerald-400/30 rounded-full animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-1/4 w-2 h-2 bg-teal-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-emerald-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-teal-900/15 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      </>
    )
  },
  despair: {
    gradient: "from-red-950/60 via-rose-950/30 to-[#0B0E14]",
    elements: (
      <>
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-black/50" />
        <div className="absolute top-10 left-1/4 w-2 h-2 bg-red-500/30 rounded-full animate-pulse" />
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-red-400/40 rounded-full" />
        <div className="absolute bottom-1/4 left-10 w-1.5 h-1.5 bg-orange-500/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-rose-900/15 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      </>
    )
  },
  relief: {
    gradient: "from-cyan-950/40 via-blue-950/30 to-[#0B0E14]",
    elements: (
      <>
        <div className="absolute top-10 right-10 w-4 h-4 bg-primary/30 rounded-full animate-pulse shadow-lg shadow-primary/20" />
        <div className="absolute top-1/4 left-20 w-2 h-2 bg-cyan-400/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-teal-400/30 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '2s' }} />
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-60 h-60 bg-cyan-900/20 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </>
    )
  }
};

const ShootingStar = ({ delay }: { delay: number }) => {
  const startX = Math.random() * 100;
  const startY = Math.random() * 50;
  
  return (
    <motion.div
      className="absolute w-1 h-1 bg-white rounded-full"
      style={{ top: `${startY}%`, left: `${startX}%` }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: [0, 150, 300],
        y: [0, 75, 150],
      }}
      transition={{
        duration: 1.5,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 8 + 5,
        ease: "easeOut"
      }}
    >
      <div className="absolute inset-0 w-24 h-px bg-gradient-to-r from-white via-white/50 to-transparent -translate-x-full" />
    </motion.div>
  );
};

const FloatingParticle = ({ index, mood }: { index: number; mood: string }) => {
  const colors: Record<string, string> = {
    neutral: "bg-blue-400/30",
    dark: "bg-gray-500/20",
    hope: "bg-emerald-400/40",
    despair: "bg-red-400/30",
    relief: "bg-cyan-400/40"
  };
  
  const size = Math.random() * 3 + 1;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 10;
  
  return (
    <motion.div
      className={`absolute rounded-full ${colors[mood] || colors.neutral} blur-sm`}
      style={{
        width: size,
        height: size,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0, 30, 0],
        x: [0, 15, 0, -15, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.2, 1, 0.8, 1],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const Nebula = ({ mood, layer }: { mood: string; layer: number }) => {
  const nebulaColors: Record<string, { from: string; to: string }> = {
    neutral: { from: "from-blue-900/20", to: "to-purple-900/10" },
    dark: { from: "from-gray-900/30", to: "to-slate-900/20" },
    hope: { from: "from-emerald-900/25", to: "to-teal-900/15" },
    despair: { from: "from-red-900/30", to: "to-rose-950/20" },
    relief: { from: "from-cyan-900/25", to: "to-blue-900/15" }
  };
  
  const colors = nebulaColors[mood] || nebulaColors.neutral;
  const positions = [
    { top: "10%", left: "-20%", size: "60%" },
    { top: "50%", right: "-15%", size: "50%" },
    { bottom: "10%", left: "30%", size: "40%" },
  ];
  const pos = positions[layer % positions.length];
  
  return (
    <motion.div
      className={`absolute bg-gradient-radial ${colors.from} ${colors.to} rounded-full blur-3xl`}
      style={{
        width: pos.size,
        height: pos.size,
        ...pos
      }}
      animate={{
        scale: [1, 1.1, 1, 0.95, 1],
        opacity: [0.3, 0.5, 0.3, 0.4, 0.3],
        x: layer % 2 === 0 ? [0, 20, 0, -20, 0] : [0, -15, 0, 15, 0],
        y: layer % 2 === 0 ? [0, -15, 0, 15, 0] : [0, 10, 0, -10, 0],
      }}
      transition={{
        duration: 20 + layer * 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

const PulseRing = ({ mood }: { mood: string }) => {
  const colors: Record<string, string> = {
    neutral: "border-blue-500/20",
    dark: "border-gray-600/10",
    hope: "border-emerald-500/30",
    despair: "border-red-500/20",
    relief: "border-cyan-500/30"
  };
  
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full border ${colors[mood] || colors.neutral}`}
          style={{
            width: 200 + i * 150,
            height: 200 + i * 150,
            left: -(100 + i * 75),
            top: -(100 + i * 75),
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 4 + i,
            delay: i * 1.5,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

const spaceBackgrounds = [
  "/journal-bg/space-bg-1.jpg",
  "/journal-bg/space-bg-2.jpg", 
  "/journal-bg/space-bg-3.jpg"
];

const getMoodBackground = (mood: string, chapterIndex: number): number => {
  if (mood === "despair" || (chapterIndex >= 6 && chapterIndex <= 10)) return 1;
  if (mood === "hope" || mood === "relief" || chapterIndex >= 11) return 2;
  return 0;
};

const getMoodOverlay = (mood: string): string => {
  switch (mood) {
    case "dark": return "from-slate-950/80 via-gray-900/60 to-black/70";
    case "despair": return "from-red-950/50 via-rose-900/30 to-black/60";
    case "hope": return "from-emerald-950/40 via-teal-900/20 to-black/50";
    case "relief": return "from-cyan-950/40 via-blue-900/20 to-black/50";
    default: return "from-blue-950/50 via-indigo-900/30 to-black/60";
  }
};

const SpaceBackground = ({ mood, chapterIndex }: { mood: string; chapterIndex: number }) => {
  const bgIndex = getMoodBackground(mood, chapterIndex);
  const overlayGradient = getMoodOverlay(mood);
  
  const [stars] = useState(() => 
    [...Array(60)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 3
    }))
  );
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.img
            src={spaceBackgrounds[bgIndex]}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            animate={{
              scale: [1, 1.05, 1],
              x: [0, 10, 0, -10, 0],
              y: [0, -5, 0, 5, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </AnimatePresence>
      
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`}
        animate={{ opacity: [0.7, 0.8, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {[0, 1, 2].map((layer) => (
        <Nebula key={layer} mood={mood} layer={layer} />
      ))}
      
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          background: "radial-gradient(circle at 20% 80%, rgba(120, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 200, 255, 0.08) 0%, transparent 40%)",
          mixBlendMode: "screen"
        }}
      />
      
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              top: `${star.y}%`,
              left: `${star.x}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
              boxShadow: [
                "0 0 2px rgba(255,255,255,0.3)",
                "0 0 8px rgba(255,255,255,1)",
                "0 0 2px rgba(255,255,255,0.3)"
              ]
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {[...Array(20)].map((_, i) => (
        <FloatingParticle key={i} index={i} mood={mood} />
      ))}
      
      {[0, 4, 9, 15].map((delay) => (
        <ShootingStar key={delay} delay={delay} />
      ))}
      
      {chapterIndex > 0 && <PulseRing mood={mood} />}
      
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)"
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-[#0B0E14]/30" />
      
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 30% 70%, rgba(100, 150, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 30%, rgba(100, 150, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 70%, rgba(100, 150, 255, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default function JournalBanni() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < chapters.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (index: number) => {
    setCurrentPage(index);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowRight") nextPage();
    if (e.key === "ArrowLeft") prevPage();
  }, [currentPage]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleNextChapter = () => nextPage();
    window.addEventListener("nextChapter", handleNextChapter);
    return () => window.removeEventListener("nextChapter", handleNextChapter);
  }, [currentPage]);

  const chapter = chapters[currentPage];
  const Icon = chapter.icon;

  return (
    <Layout>
      <section className="min-h-screen py-8 md:py-12 relative overflow-hidden bg-[#0B0E14]">
        <SpaceBackground mood={chapter.mood} chapterIndex={currentPage} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <Link href="/">
              <Button variant="ghost" className="text-gray-400 hover:text-white" data-testid="btn-journal-home">
                <Home className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold hidden sm:inline">Journal d'un banni</span>
            </div>
            
            <div className="text-gray-500 text-sm">
              {currentPage + 1} / {chapters.length}
            </div>
          </motion.div>

          <div className="flex gap-1 mb-8 overflow-x-auto pb-2 justify-center">
            {chapters.map((ch, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`flex-shrink-0 w-3 h-3 rounded-full transition-all ${
                  index === currentPage 
                    ? "bg-primary scale-125 shadow-lg shadow-primary/50" 
                    : index < currentPage 
                    ? "bg-primary/50 hover:bg-primary/70" 
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                data-testid={`btn-chapter-${index}`}
                title={ch.title}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-[#1C2230]/90 backdrop-blur-md border border-[#2E384D] rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-[#2E384D] bg-gradient-to-r from-[#1C2230] to-[#151924]">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        {chapter.date}
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white font-display">
                        {chapter.title}
                      </h2>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-10 min-h-[400px]">
                  {chapter.content}
                </div>
                
                <div className="p-6 border-t border-[#2E384D] bg-[#151924]/50 flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="border-[#2E384D] disabled:opacity-30"
                    data-testid="btn-prev-chapter"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Précédent</span>
                  </Button>
                  
                  <div className="text-gray-500 text-xs md:text-sm hidden md:block text-center max-w-xs">
                    {chapter.date}
                  </div>
                  
                  <Button
                    onClick={nextPage}
                    disabled={currentPage === chapters.length - 1}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-30"
                    data-testid="btn-next-chapter"
                  >
                    <span className="hidden sm:inline">Suivant</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 text-sm">
              ← → Utilisez les flèches du clavier pour naviguer
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

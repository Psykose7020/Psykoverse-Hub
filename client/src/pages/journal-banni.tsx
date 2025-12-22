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
  Sparkles
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

const chapters: Chapter[] = [
  {
    date: "05 décembre",
    title: "L'instant où le jeu s'arrête",
    icon: AlertTriangle,
    mood: "neutral",
    content: (
      <div className="space-y-6">
        <p className="text-lg italic text-gray-400">Je me connecte machinalement.</p>
        <p>Pas avec excitation. Pas avec appréhension.</p>
        <p>Avec ce geste neutre qu'on fait quand on joue depuis trop longtemps.</p>
        <p className="text-2xl font-bold text-white my-8">Et puis… rien.</p>
        <p className="text-red-400 font-semibold">Scorpius n'est plus là.</p>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6 my-8">
          <p className="text-red-400 font-mono text-center">Motif : botusing</p>
        </div>
        <p>Je la relis. Deux fois. Trois fois.</p>
        <p>Je ne suis pas surpris. Je suis… <span className="text-gray-300 font-semibold">vidé</span>.</p>
        <blockquote className="border-l-4 border-primary pl-4 my-6 italic text-gray-400">
          C'est étrange, un bannissement : ce n'est pas un choc, c'est un arrêt.
          Comme si quelqu'un avait appuyé sur pause, mais seulement pour toi.
        </blockquote>
        <p className="text-gray-500">« C'était une mauvaise idée. »</p>
        <p className="text-gray-500">Pas héroïque. Pas tragique. Juste idiot.</p>
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
        <p>Le lendemain, je me réveille plus tôt que d'habitude.</p>
        <p className="text-primary">Réflexe de joueur.</p>
        <p>Je regarde l'heure. Je calcule mentalement un temps de vol qui n'existe plus.</p>
        <p>Je tends la main vers la souris… puis je la repose.</p>
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6 my-8 text-center">
          <p className="text-xl text-white font-semibold mb-2">C'est là que je comprends :</p>
          <p className="text-primary text-lg">le bannissement n'enlève pas le jeu, il enlève le rythme.</p>
        </div>
        <p>Tout est trop calme. Trop silencieux.</p>
        <p>Je vais sur le lobby. <span className="text-green-400">Hercules est toujours là.</span></p>
        <p className="text-gray-400 italic">Je clique dessus sans entrer. Juste pour vérifier qu'il existe encore.</p>
        <p className="text-gray-500">Comme on vérifie qu'un proche respire encore.</p>
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
        <p className="text-lg">Je me convaincs que tout va bien.</p>
        <p>Scorpius est tombé. Logique. Accepté.</p>
        <p className="text-green-400">Mais Hercules tient. Et Hercules, c'est l'essentiel.</p>
        <blockquote className="border-l-4 border-yellow-500 pl-4 my-6 bg-yellow-500/10 p-4 rounded-r-lg">
          <p className="italic">« Chaque univers est indépendant. »</p>
          <p className="text-sm text-yellow-400 mt-2">C'est faux. Mais à ce moment-là, j'en ai besoin.</p>
        </blockquote>
        <p className="text-gray-400">Je passe la journée à ne rien faire. À ouvrir le lobby. À le refermer.</p>
        <p className="text-white font-semibold text-center text-xl my-8">
          Je découvre que je suis devenu spectateur de mon propre compte.
        </p>
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
        <p className="text-lg italic text-gray-400">Le temps devient élastique.</p>
        <p>Je commence à lire les CGU.</p>
        <p>Pas comme un texte. <span className="text-primary">Comme un roman policier où je connais déjà la fin.</span></p>
        <p>Je tombe sur l'article. Je le relis. Je comprends parfaitement ce qu'il dit.</p>
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6 my-8">
          <p className="text-center text-gray-400">
            Et pourtant, mon cerveau continue à chercher une nuance.
          </p>
          <p className="text-center text-gray-400">Un angle. Une échappatoire.</p>
          <p className="text-center text-red-400 font-bold text-xl mt-4">Il n'y en a pas.</p>
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
        <p className="text-gray-400 italic">Dans cet état un peu flottant, je récupère un second compte Scorpius.</p>
        <p>Un compte arrivé <span className="text-green-400">après la faute</span>. Après le bannissement. Après la claque.</p>
        <p>Je le regarde comme on regarde une page blanche.</p>
        <p>Pas avec enthousiasme. <span className="text-primary">Avec prudence.</span></p>
        <blockquote className="border-l-4 border-primary pl-4 my-6 italic">
          Je me dis que c'est peut-être une façon de continuer sans déborder.
        </blockquote>
        <p className="text-gray-400">Je n'ose même pas y jouer vraiment. J'y vais doucement.</p>
        <p className="text-gray-500">Comme si l'univers pouvait encore me voir.</p>
        <p className="text-red-400 font-semibold text-center text-lg mt-8">
          Spoiler : il me voyait déjà.
        </p>
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
        <p className="text-lg text-red-400">Le 12 décembre, je comprends enfin ce qu'est un bannissement de lobby.</p>
        <p>Je me connecte.</p>
        <p className="text-4xl font-bold text-center my-8 text-white">Rien.</p>
        <p className="text-2xl text-center text-gray-400">Plus rien.</p>
        <p className="text-gray-400">Je rafraîchis. Je change de navigateur. Je vérifie si c'est moi.</p>
        <p className="text-red-400 font-bold">Non. Tout est fermé.</p>
        <div className="bg-red-900/30 border-2 border-red-500/50 rounded-xl p-8 my-8 text-center">
          <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-red-400 font-bold">Hercules compris.</p>
        </div>
        <p className="text-gray-400 italic">C'est là que quelque chose se brise. Pas bruyamment. Intérieurement.</p>
        <p>Parce que Scorpius, c'était une erreur.</p>
        <p className="text-white font-semibold">Mais Hercules, c'était une vie parallèle.</p>
        <blockquote className="border-l-4 border-red-500 pl-4 my-6 text-gray-300">
          Je réalise soudain que je peux rejouer… mais que je ne peux pas revenir.
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
        <p className="text-lg italic text-gray-400">Je tourne en rond.</p>
        <p>Je pense à des absurdités :</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 pl-4">
          <li>les premières planètes,</li>
          <li>les premières flottes,</li>
          <li>les nuits à attendre un retour à 4h du matin.</li>
        </ul>
        <p className="text-gray-400 mt-6">Tout ça est enfermé derrière une décision administrative.</p>
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6 my-8">
          <p className="text-center">Je me surprends à être triste pour un jeu.</p>
          <p className="text-center text-gray-400 mt-2">Et ça me fait rire. Un rire nerveux.</p>
          <p className="text-center text-primary font-semibold mt-4">
            « Sérieusement, tu vas pleurer pour des pixels ? »
          </p>
          <p className="text-center text-white font-bold text-xl mt-4">
            Oui. Parce que ces pixels racontaient quelque chose.
          </p>
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
        <p className="text-lg">Je découvre la hiérarchie comme on découvre les étages d'une prison.</p>
        <div className="grid grid-cols-1 gap-3 my-8">
          <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-4">
            <p><span className="text-primary font-semibold">Le GO</span> répond. Poli. Calme.</p>
          </div>
          <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-4">
            <p><span className="text-blue-400 font-semibold">Le SGO</span> supervise. Silencieux.</p>
          </div>
          <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-4">
            <p><span className="text-purple-400 font-semibold">Le GA</span> explique que c'est "hors cadre".</p>
          </div>
          <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-4">
            <p><span className="text-yellow-400 font-semibold">Le CoMa</span>… le CoMa plane au-dessus, invisible.</p>
          </div>
        </div>
        <p className="text-gray-400">Je comprends que chaque message est une pièce.</p>
        <p className="text-white">Chaque phrase, une clé possible… ou un verrou.</p>
        <p className="text-gray-500 italic text-center mt-6">Je réécris tout dix fois.</p>
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
        <p className="text-lg text-yellow-400">Et puis, l'absurde.</p>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-6 my-6">
          <p className="font-semibold text-yellow-400 mb-4">Sur Scorpius :</p>
          <ul className="space-y-2 text-gray-300">
            <li>→ je suis banni,</li>
            <li>→ je récupère un compte après,</li>
            <li>→ je peux continuer.</li>
          </ul>
          <p className="text-green-400 font-semibold mt-4">Donc l'erreur est datée.</p>
        </div>
        <p className="text-red-400 font-bold text-xl text-center my-8">
          Mais Hercules reste enfermé.
        </p>
        <p className="text-gray-400">Le compte le plus propre. Le plus ancien. Le plus investi.</p>
        <div className="text-center my-8">
          <p className="text-gray-500 italic">Je commence à rire tout seul.</p>
          <p className="text-gray-500 italic">Un rire fatigué.</p>
          <p className="text-white mt-4">
            Celui des gens qui comprennent que la logique existe… mais pas pour eux.
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
        <p className="text-lg text-gray-400">Je dors mal.</p>
        <div className="bg-[#0B0E14] border border-[#2E384D] rounded-lg p-6 my-8 text-center">
          <p className="text-gray-500 italic">Je rêve de timers.</p>
          <p className="text-gray-500 italic">De flottes bloquées.</p>
          <p className="text-gray-500 italic">De boutons grisés.</p>
        </div>
        <p>Je réalise que le bannissement ne m'empêche pas de jouer.</p>
        <p className="text-primary font-bold text-xl text-center my-8">
          Il m'empêche de passer à autre chose.
        </p>
        <p className="text-gray-400 text-center">Je suis libre… mais coincé.</p>
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
        <p className="text-lg text-green-400">Une réponse arrive.</p>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-6 my-8 text-center">
          <Unlock className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <p className="text-green-400 font-bold text-xl">Le second Scorpius est débanni.</p>
        </div>
        <p className="text-gray-400">Je relis le message. Lentement.</p>
        <p className="text-white font-semibold">Donc on peut distinguer. Donc tout n'est pas figé.</p>
        <p className="text-primary">Je respire un peu mieux.</p>
        <p className="text-red-400 text-center mt-8 font-semibold">
          Mais Hercules reste enfermé.
        </p>
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
        <p className="text-lg text-gray-400">À ce stade, je n'argumente plus.</p>
        <p className="text-white">Je parle simplement.</p>
        <div className="bg-[#1C2230] border border-[#2E384D] rounded-lg p-6 my-8 space-y-3">
          <p className="text-gray-300">Je dis que je comprends.</p>
          <p className="text-gray-300">Je dis que j'accepte.</p>
          <p className="text-primary">Je dis que je demande juste une proportion.</p>
        </div>
        <p className="text-gray-400 italic text-center">
          Je parle comme un type fatigué.
        </p>
        <p className="text-gray-500 text-center">
          Pas comme un joueur. Pas comme un avocat.
        </p>
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
        <p className="text-lg text-gray-400">Elle arrive.</p>
        <p className="text-gray-400">Courte. Sèche. Humaine.</p>
        <div className="bg-gradient-to-r from-green-900/30 via-primary/20 to-green-900/30 border-2 border-green-500/50 rounded-xl p-8 my-12 text-center">
          <p className="text-4xl font-bold text-green-400 font-display">Another chance.</p>
        </div>
        <p className="text-gray-400 text-center">Je reste immobile.</p>
        <p className="text-gray-400 text-center">Je n'ai pas envie de crier victoire.</p>
        <p className="text-white text-center font-semibold">J'ai juste envie de… m'asseoir.</p>
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-green-500/20 text-green-400 px-6 py-3 rounded-full border border-green-500/30">
            <Unlock className="w-6 h-6" />
            <span className="font-bold text-xl">Hercules est là.</span>
          </div>
        </div>
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
        <p className="text-lg text-gray-400">Je n'ai pas gagné. Je n'ai pas perdu.</p>
        <p className="text-white font-semibold text-xl mb-6">J'ai appris que :</p>
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-[#1C2230] border border-[#2E384D] rounded-lg p-4">
            <span className="text-primary">→</span>
            <p>l'habitude est dangereuse,</p>
          </div>
          <div className="flex items-start gap-3 bg-[#1C2230] border border-[#2E384D] rounded-lg p-4">
            <span className="text-primary">→</span>
            <p>l'expérience n'immunise pas,</p>
          </div>
          <div className="flex items-start gap-3 bg-[#1C2230] border border-[#2E384D] rounded-lg p-4">
            <span className="text-primary">→</span>
            <p>le lobby n'oublie jamais,</p>
          </div>
          <div className="flex items-start gap-3 bg-[#1C2230] border border-[#2E384D] rounded-lg p-4">
            <span className="text-primary">→</span>
            <p>et que l'humilité est parfois la seule clé.</p>
          </div>
        </div>
        
        <div className="mt-12 bg-gradient-to-br from-red-900/20 via-[#1C2230] to-primary/10 border border-red-500/30 rounded-xl p-8">
          <h4 className="text-xl font-bold text-white mb-6 text-center">Dernière note à moi-même</h4>
          <div className="space-y-4 text-gray-300">
            <p>Ne jamais croire que l'expérience donne des passe-droits.</p>
            <p>Ne jamais croire que "ça passe" parce que "ça a toujours passé".</p>
            <p>Ne jamais croire qu'un script est "juste un outil".</p>
          </div>
          <div className="mt-8 pt-6 border-t border-red-500/30">
            <p className="text-center text-lg text-white italic">Et surtout :</p>
            <blockquote className="text-center text-primary font-semibold text-xl mt-4">
              Quand tu te dis "personne ne verra",<br/>
              c'est souvent que quelqu'un regarde déjà depuis longtemps.
            </blockquote>
          </div>
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
        <div className="absolute top-20 left-1/2 w-px h-32 bg-gradient-to-b from-primary/20 to-transparent" />
      </>
    )
  }
};

const SpaceBackground = ({ mood, chapterIndex }: { mood: string; chapterIndex: number }) => {
  const bg = moodBackgrounds[mood] || moodBackgrounds.neutral;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 bg-gradient-to-b ${bg.gradient}`} />
      
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.5 + 0.1,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 2 + 's'
            }}
          />
        ))}
      </div>
      
      {chapterIndex >= 5 && chapterIndex <= 9 && (
        <div className="absolute top-1/4 right-10 w-24 h-24 md:w-32 md:h-32">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-900/40 rounded-full blur-sm" />
          <div className="absolute inset-2 bg-gradient-to-br from-red-700/30 to-red-950/50 rounded-full" />
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-400/30 rounded-full" />
          <div className="absolute bottom-1/3 right-1/3 w-4 h-1 bg-red-500/20 rounded-full rotate-12" />
        </div>
      )}
      
      {(chapterIndex === 10 || chapterIndex === 11) && (
        <div className="absolute top-1/3 right-20 w-20 h-20 md:w-28 md:h-28">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-800/30 rounded-full blur-sm animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute inset-2 bg-gradient-to-br from-green-600/20 to-teal-900/30 rounded-full" />
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400/30 to-transparent rounded-full blur-md" />
        </div>
      )}
      
      {(chapterIndex === 12 || chapterIndex === 13) && (
        <>
          <div className="absolute top-20 right-1/4 w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-900/30 rounded-full blur-md animate-pulse" style={{ animationDuration: '6s' }} />
            <div className="absolute inset-4 bg-gradient-to-br from-primary/30 to-cyan-800/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/40 rounded-full" />
          </div>
          <div className="absolute top-1/2 left-10 w-1 h-20 bg-gradient-to-b from-primary/40 to-transparent rotate-45" />
          <div className="absolute bottom-1/3 right-10 w-1 h-16 bg-gradient-to-b from-cyan-400/30 to-transparent -rotate-30" />
        </>
      )}
      
      {bg.elements}
      
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes shootingStar {
          0% { transform: translateX(0) translateY(0); opacity: 1; }
          100% { transform: translateX(-200px) translateY(200px); opacity: 0; }
        }
      `}</style>
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

  const chapter = chapters[currentPage];
  const Icon = chapter.icon;

  return (
    <Layout>
      <section className="min-h-screen py-8 md:py-12 relative overflow-hidden bg-[#0B0E14]">
        <SpaceBackground mood={chapter.mood} chapterIndex={currentPage} />
        
        <div className="container mx-auto px-4 relative">
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
              <span className="text-primary font-semibold">Journal d'un banni</span>
            </div>
            
            <div className="text-gray-500 text-sm">
              {currentPage + 1} / {chapters.length}
            </div>
          </motion.div>

          <div className="flex gap-1 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {chapters.map((ch, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`flex-shrink-0 w-3 h-3 rounded-full transition-all ${
                  index === currentPage 
                    ? "bg-primary scale-125" 
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
              <div className="bg-[#1C2230]/80 backdrop-blur-sm border border-[#2E384D] rounded-2xl overflow-hidden shadow-2xl">
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
                      <h2 className="text-2xl font-bold text-white font-display">
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
                    Précédent
                  </Button>
                  
                  <div className="text-gray-500 text-sm hidden md:block">
                    {chapter.date} — {chapter.title}
                  </div>
                  
                  <Button
                    onClick={nextPage}
                    disabled={currentPage === chapters.length - 1}
                    className="bg-primary hover:bg-primary/90 disabled:opacity-30"
                    data-testid="btn-next-chapter"
                  >
                    Suivant
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
            <p className="text-gray-500 text-sm">
              Utilisez les flèches ← → du clavier pour naviguer
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

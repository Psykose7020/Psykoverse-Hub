import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Trophy, Gamepad2, Globe, Clock, Medal } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  pseudo: string;
  univers: string;
  score: number;
  createdAt: string;
}

export default function Classement() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then(res => res.json())
      .then(data => {
        setEntries(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getMedalColor = (rank: number) => {
    if (rank === 0) return "text-yellow-400";
    if (rank === 1) return "text-gray-300";
    if (rank === 2) return "text-amber-600";
    return "text-gray-500";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short"
    });
  };

  return (
    <Layout>
      <div className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                Classement <span className="text-primary">Space Escape</span>
              </h1>
            </div>
            <p className="text-gray-400 max-w-xl mx-auto">
              Les meilleurs pilotes de la communauté. Jouez au mini-jeu sur la page d'accueil pour apparaître ici !
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-[#0F1319] border border-[#2E384D] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-4 py-3 bg-[#1C2230] text-xs text-gray-500 font-medium uppercase tracking-wider">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-4">Joueur</div>
                <div className="col-span-3">Univers</div>
                <div className="col-span-2 text-right">Score</div>
                <div className="col-span-2 text-right">Date</div>
              </div>

              {loading ? (
                <div className="p-12 text-center text-gray-500">
                  Chargement...
                </div>
              ) : entries.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>Aucun score enregistré pour l'instant.</p>
                  <p className="text-sm mt-2">Soyez le premier à jouer !</p>
                </div>
              ) : (
                <div className="divide-y divide-[#2E384D]/50">
                  {entries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-[#1C2230]/50 transition-colors ${
                        index < 3 ? "bg-gradient-to-r from-primary/5 to-transparent" : ""
                      }`}
                    >
                      <div className="col-span-1 text-center">
                        {index < 3 ? (
                          <Medal className={`w-5 h-5 mx-auto ${getMedalColor(index)}`} />
                        ) : (
                          <span className="text-gray-500 text-sm">{index + 1}</span>
                        )}
                      </div>
                      <div className="col-span-4">
                        <span className={`font-medium ${index < 3 ? "text-white" : "text-gray-300"}`}>
                          {entry.pseudo}
                        </span>
                      </div>
                      <div className="col-span-3 flex items-center gap-1.5 text-gray-400 text-sm">
                        <Globe className="w-3.5 h-3.5" />
                        {entry.univers}
                      </div>
                      <div className="col-span-2 text-right">
                        <span className={`font-bold ${index === 0 ? "text-yellow-400" : index < 3 ? "text-primary" : "text-gray-300"}`}>
                          {entry.score.toLocaleString()}
                        </span>
                      </div>
                      <div className="col-span-2 text-right text-gray-500 text-sm flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(entry.createdAt)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

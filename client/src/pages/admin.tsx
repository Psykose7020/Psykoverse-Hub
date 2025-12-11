import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Lock, Users, Eye, Calendar, TrendingUp, ExternalLink, LogOut, BarChart3, Globe, MessageCircle, Mail, Archive, CheckCircle, Clock, ChevronRight, X, Edit } from "lucide-react";

interface Feedback {
  id: string;
  message: string;
  page: string | null;
  userAgent: string | null;
  ip: string | null;
  status: string;
  createdAt: string;
}

interface VisitStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  recentVisits: Array<{
    id: string;
    page: string;
    userAgent: string | null;
    ip: string | null;
    referrer: string | null;
    visitedAt: string;
  }>;
  pageStats: Array<{ page: string; count: number }>;
}

interface GeoData {
  ip: string;
  lat: number;
  lon: number;
  city: string;
  country: string;
  count: number;
}

interface LeaderboardEntry {
  id: string;
  pseudo: string;
  univers: string;
  score: number;
  ip: string | null;
  createdAt: string;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [geoData, setGeoData] = useState<GeoData[]>([]);
  const [token, setToken] = useState("");
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [activeTab, setActiveTab] = useState<"stats" | "feedback" | "leaderboard">("stats");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchStats();
      fetchGeoData();
      fetchFeedback();
      fetchLeaderboard();
      const interval = setInterval(fetchStats, 30000);
      const geoInterval = setInterval(fetchGeoData, 60000);
      const feedbackInterval = setInterval(fetchFeedback, 30000);
      const leaderboardInterval = setInterval(fetchLeaderboard, 60000);
      return () => {
        clearInterval(interval);
        clearInterval(geoInterval);
        clearInterval(feedbackInterval);
        clearInterval(leaderboardInterval);
      };
    }
  }, [isLoggedIn, token]);

  const fetchGeoData = async () => {
    try {
      const res = await fetch("/api/admin/geo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setGeoData(data);
      }
    } catch (err) {
      console.error("Failed to fetch geo data:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const fetchFeedback = async () => {
    try {
      const res = await fetch("/api/admin/feedback", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setFeedbackList(data);
      }
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/admin/leaderboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLeaderboard(data);
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    }
  };

  const updateFeedbackStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/feedback/${id}`, {
        method: "PATCH",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setFeedbackList(prev => prev.map(f => f.id === id ? updated : f));
        if (selectedFeedback?.id === id) {
          setSelectedFeedback(updated);
        }
      }
    } catch (err) {
      console.error("Failed to update feedback:", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const data = await res.json();
        setToken(data.token);
        localStorage.setItem("adminToken", data.token);
        setIsLoggedIn(true);
        setPassword("");
      } else {
        setError("Mot de passe incorrect");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
    localStorage.removeItem("adminToken");
    setToken("");
    setIsLoggedIn(false);
    setStats(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const parseUserAgent = (ua: string | null) => {
    if (!ua) return { browser: "Inconnu", os: "Inconnu", device: "Inconnu" };
    
    let browser = "Autre";
    if (ua.includes("Edg/")) browser = "Edge";
    else if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Opera") || ua.includes("OPR")) browser = "Opera";
    
    let os = "Autre";
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Mac OS")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
    
    let device = "Desktop";
    if (ua.includes("Mobile") || ua.includes("Android") || ua.includes("iPhone")) device = "Mobile";
    else if (ua.includes("iPad") || ua.includes("Tablet")) device = "Tablette";
    
    return { browser, os, device };
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center p-4">
        <div className="bg-[#12161F] border border-[#1E2A3A] rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00BFFF] to-[#0080FF] rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-6 font-['Exo_2']">
            Espace Administrateur
          </h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0B0E14] border border-[#1E2A3A] rounded-lg px-4 py-3 text-white focus:border-[#00BFFF] focus:outline-none transition-colors"
                placeholder="Entrez le mot de passe"
                data-testid="input-admin-password"
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00BFFF] to-[#0080FF] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              data-testid="button-admin-login"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
          
          <button
            onClick={() => setLocation("/")}
            className="w-full mt-4 text-gray-500 text-sm hover:text-gray-400 transition-colors"
            data-testid="link-back-home"
          >
            ← Retour au site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white font-['Exo_2']">
              Dashboard Administrateur
            </h1>
            <p className="text-gray-400 mt-1">Psykoverse - Statistiques visiteurs</p>
          </div>
          
          <div className="flex gap-3">
            <EditModeButton />
            <a
              href="https://replit.com/@7020Psykose/psykoverse"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#F26207] hover:bg-[#E55100] text-white px-4 py-2 rounded-lg transition-colors"
              data-testid="link-replit-edit"
            >
              <ExternalLink className="w-4 h-4" />
              Modifier sur Replit
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-[#1E2A3A] hover:bg-[#2A3A4A] text-gray-300 px-4 py-2 rounded-lg transition-colors"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "stats" 
                ? "bg-gradient-to-r from-[#00BFFF] to-[#0080FF] text-white" 
                : "bg-[#1E2A3A] text-gray-400 hover:text-white"
            }`}
            data-testid="tab-stats"
          >
            <BarChart3 className="w-4 h-4" />
            Statistiques
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors relative ${
              activeTab === "feedback" 
                ? "bg-gradient-to-r from-[#00BFFF] to-[#0080FF] text-white" 
                : "bg-[#1E2A3A] text-gray-400 hover:text-white"
            }`}
            data-testid="tab-feedback"
          >
            <Mail className="w-4 h-4" />
            Boîte aux lettres
            {feedbackList.filter(f => f.status === "nouveau").length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {feedbackList.filter(f => f.status === "nouveau").length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("leaderboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === "leaderboard" 
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white" 
                : "bg-[#1E2A3A] text-gray-400 hover:text-white"
            }`}
            data-testid="tab-leaderboard"
          >
            <TrendingUp className="w-4 h-4" />
            Leaderboard
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
              {leaderboard.length}
            </span>
          </button>
        </div>

        {activeTab === "stats" && (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Eye className="w-6 h-6" />}
            label="Total visites"
            value={stats?.total || 0}
            color="from-[#00BFFF] to-[#0080FF]"
          />
          <StatCard
            icon={<Calendar className="w-6 h-6" />}
            label="Aujourd'hui"
            value={stats?.today || 0}
            color="from-[#10B981] to-[#059669]"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Cette semaine"
            value={stats?.thisWeek || 0}
            color="from-[#F59E0B] to-[#D97706]"
          />
          <StatCard
            icon={<Users className="w-6 h-6" />}
            label="Ce mois"
            value={stats?.thisMonth || 0}
            color="from-[#8B5CF6] to-[#7C3AED]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#12161F] border border-[#1E2A3A] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#00BFFF]" />
              Visites récentes
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 text-sm border-b border-[#1E2A3A]">
                    <th className="pb-3">Page</th>
                    <th className="pb-3">Device</th>
                    <th className="pb-3">OS</th>
                    <th className="pb-3">Navigateur</th>
                    <th className="pb-3">IP</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recentVisits.slice(0, 20).map((visit) => {
                    const ua = parseUserAgent(visit.userAgent);
                    return (
                      <tr key={visit.id} className="border-b border-[#1E2A3A]/50 text-sm">
                        <td className="py-3 text-white">{visit.page}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            ua.device === "Mobile" ? "bg-green-900/50 text-green-400" :
                            ua.device === "Tablette" ? "bg-purple-900/50 text-purple-400" :
                            "bg-blue-900/50 text-blue-400"
                          }`}>
                            {ua.device}
                          </span>
                        </td>
                        <td className="py-3 text-gray-400">{ua.os}</td>
                        <td className="py-3 text-gray-400">{ua.browser}</td>
                        <td className="py-3 text-gray-500 font-mono text-xs">{visit.ip || "-"}</td>
                        <td className="py-3 text-gray-500">{formatDate(visit.visitedAt)}</td>
                      </tr>
                    );
                  })}
                  {(!stats || stats.recentVisits.length === 0) && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        Aucune visite enregistrée
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#12161F] border border-[#1E2A3A] rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#00BFFF]" />
              Pages populaires
            </h2>
            <div className="space-y-3">
              {stats?.pageStats.map((page, index) => (
                <div key={page.page} className="flex items-center justify-between">
                  <span className="text-gray-300">{page.page}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 bg-gradient-to-r from-[#00BFFF] to-[#0080FF] rounded-full"
                      style={{
                        width: `${Math.min(100, (page.count / (stats?.total || 1)) * 200)}px`,
                      }}
                    />
                    <span className="text-white font-medium min-w-[40px] text-right">
                      {page.count}
                    </span>
                  </div>
                </div>
              ))}
              {(!stats || stats.pageStats.length === 0) && (
                <p className="text-gray-500 text-center py-4">Aucune donnée</p>
              )}
            </div>
          </div>
        </div>

        {/* World Map */}
        <div className="mt-6 bg-[#12161F] border border-[#1E2A3A] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#00BFFF]" />
            Carte des visiteurs
          </h2>
          <div className="relative w-full h-[300px] md:h-[400px] bg-[#0B0E14] rounded-lg overflow-hidden">
            <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="pointGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00BFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00BFFF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect fill="#0B0E14" width="1000" height="500" />
              
              {/* North America */}
              <path d="M120,80 L140,70 L180,65 L220,70 L250,80 L270,100 L280,130 L260,160 L240,180 L200,200 L180,220 L160,250 L140,280 L150,300 L180,320 L200,350 L180,360 L150,340 L120,300 L100,260 L90,220 L80,180 L90,140 L100,100 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* Central America */}
              <path d="M180,320 L200,330 L220,350 L240,370 L250,390 L240,400 L220,390 L200,370 L180,350 L170,330 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* South America */}
              <path d="M250,390 L280,380 L320,390 L340,420 L350,460 L330,490 L300,495 L270,480 L250,450 L240,420 L250,400 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* Europe */}
              <path d="M450,80 L480,70 L520,75 L560,80 L580,100 L570,130 L550,150 L520,160 L490,155 L460,140 L440,120 L440,100 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* UK */}
              <path d="M430,100 L440,90 L450,95 L455,110 L445,120 L430,115 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* Africa */}
              <path d="M450,180 L500,170 L550,180 L580,210 L590,260 L580,320 L560,370 L520,400 L480,410 L450,390 L430,350 L420,300 L430,250 L440,210 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* Russia/Asia North */}
              <path d="M580,60 L650,50 L720,45 L800,50 L860,60 L900,80 L920,100 L910,130 L880,150 L820,160 L750,155 L680,145 L620,130 L590,110 L580,80 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* Middle East */}
              <path d="M580,160 L620,150 L660,160 L680,190 L670,220 L640,240 L600,230 L580,200 L575,175 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* India */}
              <path d="M680,200 L720,190 L750,210 L760,250 L740,290 L700,310 L670,290 L660,250 L670,220 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* China/East Asia */}
              <path d="M750,120 L800,110 L850,120 L880,150 L870,190 L840,220 L800,240 L760,230 L740,200 L740,160 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* Japan */}
              <path d="M890,140 L910,130 L920,145 L915,170 L900,180 L885,170 L880,155 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* Southeast Asia */}
              <path d="M800,250 L840,240 L870,260 L880,300 L860,330 L820,340 L790,320 L780,280 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* Australia */}
              <path d="M820,380 L880,370 L920,390 L940,430 L920,470 L870,480 L820,460 L800,420 L810,390 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {/* New Zealand */}
              <path d="M950,450 L965,440 L975,455 L970,475 L955,480 L945,465 Z" fill="#1E2A3A" stroke="#2E384D" strokeWidth="1" />
              
              {geoData.map((geo, i) => {
                const x = ((geo.lon + 180) / 360) * 1000;
                const y = ((90 - geo.lat) / 180) * 500;
                const size = Math.min(20, 5 + geo.count * 3);
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={size} fill="url(#pointGlow)" opacity="0.6" />
                    <circle cx={x} cy={y} r={size / 2} fill="#00BFFF" />
                    <title>{`${geo.city}, ${geo.country} (${geo.count} visite${geo.count > 1 ? 's' : ''})`}</title>
                  </g>
                );
              })}
            </svg>
            
            {geoData.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Aucune donnée de géolocalisation disponible
              </div>
            )}
          </div>
          
          {geoData.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {geoData.slice(0, 10).map((geo, i) => (
                <span key={i} className="px-3 py-1 bg-[#0B0E14] border border-[#1E2A3A] rounded-full text-xs text-gray-300">
                  {geo.city}, {geo.country} ({geo.count})
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-gray-600 text-sm">
          Les statistiques se rafraîchissent automatiquement toutes les 30 secondes
        </div>
        </>
        )}

        {activeTab === "feedback" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#12161F] border border-[#1E2A3A] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#00BFFF]" />
                Messages reçus
                <span className="text-sm text-gray-500 font-normal">({feedbackList.length})</span>
              </h2>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {feedbackList.map((fb) => (
                  <div
                    key={fb.id}
                    onClick={() => setSelectedFeedback(fb)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedFeedback?.id === fb.id
                        ? "bg-[#1E2A3A] border-[#00BFFF]"
                        : fb.status === "nouveau"
                        ? "bg-[#0B0E14] border-[#1E2A3A] hover:border-[#00BFFF]/50"
                        : "bg-[#0B0E14]/50 border-[#1E2A3A]/50 hover:border-[#1E2A3A]"
                    }`}
                    data-testid={`feedback-item-${fb.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {fb.status === "nouveau" && (
                            <span className="w-2 h-2 bg-[#00BFFF] rounded-full animate-pulse"></span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            fb.status === "nouveau" ? "bg-blue-900/50 text-blue-400" :
                            fb.status === "lu" ? "bg-green-900/50 text-green-400" :
                            "bg-gray-900/50 text-gray-400"
                          }`}>
                            {fb.status === "nouveau" ? "Nouveau" : fb.status === "lu" ? "Lu" : "Archivé"}
                          </span>
                          {fb.page && (
                            <span className="text-xs text-gray-500">{fb.page}</span>
                          )}
                        </div>
                        <p className={`text-sm truncate ${fb.status === "nouveau" ? "text-white" : "text-gray-400"}`}>
                          {fb.message}
                        </p>
                        <span className="text-xs text-gray-600 mt-1 block">{formatDate(fb.createdAt)}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    </div>
                  </div>
                ))}
                
                {feedbackList.length === 0 && (
                  <div className="text-center py-12">
                    <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500">Aucun message pour le moment</p>
                    <p className="text-gray-600 text-sm">Les visiteurs peuvent vous envoyer des feedbacks anonymes</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#12161F] border border-[#1E2A3A] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#00BFFF]" />
                Détails
              </h2>
              
              {selectedFeedback ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      selectedFeedback.status === "nouveau" ? "bg-blue-900/50 text-blue-400" :
                      selectedFeedback.status === "lu" ? "bg-green-900/50 text-green-400" :
                      "bg-gray-900/50 text-gray-400"
                    }`}>
                      {selectedFeedback.status === "nouveau" ? "Nouveau" : selectedFeedback.status === "lu" ? "Lu" : "Archivé"}
                    </span>
                    <button
                      onClick={() => setSelectedFeedback(null)}
                      className="text-gray-500 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="bg-[#0B0E14] rounded-lg p-4">
                    <p className="text-white whitespace-pre-wrap">{selectedFeedback.message}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{formatDate(selectedFeedback.createdAt)}</span>
                    </div>
                    {selectedFeedback.page && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Globe className="w-4 h-4" />
                        <span>Page : {selectedFeedback.page}</span>
                      </div>
                    )}
                    {selectedFeedback.ip && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <span className="font-mono text-xs">IP : {selectedFeedback.ip}</span>
                      </div>
                    )}
                    {selectedFeedback.userAgent && (
                      <div className="text-gray-600 text-xs mt-2 p-2 bg-[#0B0E14] rounded">
                        {(() => {
                          const ua = parseUserAgent(selectedFeedback.userAgent);
                          return `${ua.device} • ${ua.os} • ${ua.browser}`;
                        })()}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 pt-4 border-t border-[#1E2A3A]">
                    {selectedFeedback.status !== "lu" && (
                      <button
                        onClick={() => updateFeedbackStatus(selectedFeedback.id, "lu")}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                        data-testid="btn-mark-read"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Marquer lu
                      </button>
                    )}
                    {selectedFeedback.status !== "archivé" && (
                      <button
                        onClick={() => updateFeedbackStatus(selectedFeedback.id, "archivé")}
                        className="flex-1 flex items-center justify-center gap-2 bg-[#1E2A3A] hover:bg-[#2A3A4A] text-gray-300 px-3 py-2 rounded-lg text-sm transition-colors"
                        data-testid="btn-archive"
                      >
                        <Archive className="w-4 h-4" />
                        Archiver
                      </button>
                    )}
                    {selectedFeedback.status === "archivé" && (
                      <button
                        onClick={() => updateFeedbackStatus(selectedFeedback.id, "nouveau")}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        Restaurer
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500">Sélectionnez un message</p>
                  <p className="text-gray-600 text-sm">Cliquez sur un message pour voir les détails</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="bg-[#12161F] border border-[#1E2A3A] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Space Escape - Leaderboard</h3>
                <p className="text-gray-500 text-sm">Top 50 des meilleurs scores</p>
              </div>
            </div>

            {leaderboard.length === 0 ? (
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">Aucun score enregistré</p>
                <p className="text-gray-600 text-sm">Les joueurs n'ont pas encore soumis leurs scores</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30" :
                      index === 1 ? "bg-gradient-to-r from-gray-400/20 to-slate-400/20 border border-gray-400/30" :
                      index === 2 ? "bg-gradient-to-r from-orange-600/20 to-amber-600/20 border border-orange-500/30" :
                      "bg-[#1E2A3A]"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? "bg-yellow-500 text-black" :
                      index === 1 ? "bg-gray-400 text-black" :
                      index === 2 ? "bg-orange-600 text-white" :
                      "bg-[#2A3A4A] text-gray-400"
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-white">{entry.pseudo}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded">{entry.univers}</span>
                        <span>
                          {new Date(entry.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="text-center min-w-[100px]">
                      <p className="text-xs text-gray-600 font-mono">{entry.ip || "-"}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-lg ${
                        index === 0 ? "text-yellow-400" :
                        index === 1 ? "text-gray-300" :
                        index === 2 ? "text-orange-400" :
                        "text-primary"
                      }`}>
                        {entry.score.toLocaleString("fr-FR")}
                      </p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EditModeButton() {
  const [, setLocation] = useLocation();
  
  const handleClick = () => {
    localStorage.setItem("editModeActive", "true");
    window.dispatchEvent(new Event("editModeChanged"));
    setLocation("/");
  };
  
  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all shadow-lg shadow-cyan-500/20"
      data-testid="button-edit-mode"
    >
      <Edit className="w-4 h-4" />
      Mode Édition
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-[#12161F] border border-[#1E2A3A] rounded-lg p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white">{value.toLocaleString("fr-FR")}</p>
        </div>
      </div>
    </div>
  );
}

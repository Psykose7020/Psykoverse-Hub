import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Lock, Users, Eye, Calendar, TrendingUp, ExternalLink, LogOut, BarChart3, Globe } from "lucide-react";

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

export default function Admin() {
  const [, setLocation] = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<VisitStats | null>(null);
  const [geoData, setGeoData] = useState<GeoData[]>([]);
  const [token, setToken] = useState("");

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
      const interval = setInterval(fetchStats, 30000);
      const geoInterval = setInterval(fetchGeoData, 60000);
      return () => {
        clearInterval(interval);
        clearInterval(geoInterval);
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
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              <defs>
                <radialGradient id="pointGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00BFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00BFFF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect fill="#0B0E14" width="1000" height="500" />
              <path
                d="M150,120 L180,100 L220,105 L260,95 L300,100 L340,90 L380,95 L420,85 L460,90 L500,80 L540,85 L580,75 L620,80 L660,70 L700,75 L740,65 L780,70 L820,60 L860,65
                   M100,180 L140,170 L180,175 L220,165 L260,170 L300,160 L340,165 L380,155 L420,160 L460,150 L500,155 L540,145 L580,150 L620,140 L660,145 L700,135 L740,140 L780,130 L820,135 L860,125 L900,130
                   M80,240 L120,235 L160,240 L200,230 L240,235 L280,225 L320,230 L360,220 L400,225 L440,215 L480,220 L520,210 L560,215 L600,205 L640,210 L680,200 L720,205 L760,195 L800,200 L840,190 L880,195 L920,185
                   M100,300 L140,295 L180,300 L220,290 L260,295 L300,285 L340,290 L380,280 L420,285 L460,275 L500,280 L540,270 L580,275 L620,265 L660,270 L700,260 L740,265 L780,255 L820,260 L860,250 L900,255
                   M120,360 L160,355 L200,360 L240,350 L280,355 L320,345 L360,350 L400,340 L440,345 L480,335 L520,340 L560,330 L600,335 L640,325 L680,330 L720,320 L760,325 L800,315 L840,320 L880,310
                   M150,420 L190,415 L230,420 L270,410 L310,415 L350,405 L390,410 L430,400 L470,405 L510,395 L550,400 L590,390 L630,395 L670,385 L710,390 L750,380 L790,385 L830,375"
                stroke="#1E2A3A"
                strokeWidth="0.5"
                fill="none"
              />
              <ellipse cx="280" cy="200" rx="120" ry="100" fill="#1E2A3A" opacity="0.3" />
              <ellipse cx="520" cy="180" rx="80" ry="120" fill="#1E2A3A" opacity="0.3" />
              <ellipse cx="750" cy="220" rx="100" ry="80" fill="#1E2A3A" opacity="0.3" />
              <ellipse cx="850" cy="350" rx="60" ry="50" fill="#1E2A3A" opacity="0.3" />
              <ellipse cx="350" cy="380" rx="80" ry="60" fill="#1E2A3A" opacity="0.3" />
              <ellipse cx="550" cy="380" rx="40" ry="30" fill="#1E2A3A" opacity="0.3" />
              
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
      </div>
    </div>
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

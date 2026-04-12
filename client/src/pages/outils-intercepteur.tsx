import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Copy, Check, ArrowRight, RotateCcw, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// ── Helpers ───────────────────────────────────────────────────────────────────

function nowDT(): string {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}T${p(n.getHours())}:${p(n.getMinutes())}:${p(n.getSeconds())}`;
}

function dtToSec(dt: string): number | null {
  if (!dt) return null;
  const ms = new Date(dt).getTime();
  if (isNaN(ms)) return null;
  return Math.floor(ms / 1000);
}

function addSecsToDT(dt: string, secs: number): string {
  const base = new Date(dt).getTime();
  if (isNaN(base)) return "";
  const result = new Date(base + secs * 1000);
  const p = (x: number) => String(x).padStart(2, "0");
  return `${result.getFullYear()}-${p(result.getMonth() + 1)}-${p(result.getDate())}T${p(result.getHours())}:${p(result.getMinutes())}:${p(result.getSeconds())}`;
}

/** Format ISO datetime → JJ/MM/AAAA HH:MM:SS */
function formatDT(dt: string): string {
  if (!dt) return "—";
  const d = new Date(dt);
  if (isNaN(d.getTime())) return "—";
  const p = (x: number) => String(x).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function formatDuration(secs: number): string {
  if (!isFinite(secs) || secs === 0) return "—";
  const abs = Math.abs(secs);
  const d = Math.floor(abs / 86400);
  const h = Math.floor((abs % 86400) / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  const p = (x: number) => String(x).padStart(2, "0");
  const hms = `${p(h)}h ${p(m)}m ${p(s)}s`;
  return d > 0 ? `${d}j ${hms}` : hms;
}

const inputCls =
  "bg-[#0B0E14] border border-[#2E384D] rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-primary/50 w-full";

// ── Composant champ éditable ──────────────────────────────────────────────────

function EditableField({
  label, icon, tooltip, value, onChange, subLink,
}: {
  label: string; icon: string; tooltip: React.ReactNode;
  value: string; onChange: (v: string) => void;
  subLink?: { text: string; href: string };
}) {
  return (
    <div className="rounded-xl border border-[#2E384D] bg-[#151924] p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="font-bold text-white text-sm">{label}</span>
      </div>
      <div className="text-xs text-gray-500 mb-3 space-y-0.5">{tooltip}</div>
      <div className="flex gap-2">
        <input
          type="datetime-local"
          step="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
        <button
          type="button"
          onClick={() => onChange(nowDT())}
          className="text-xs text-amber-400 hover:text-amber-300 whitespace-nowrap px-2 border border-amber-500/30 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
        >
          Maintenant
        </button>
      </div>
      {subLink && (
        <Link href={subLink.href}>
          <span className="inline-block mt-2 text-xs text-primary/60 hover:text-primary transition-colors cursor-pointer">
            {subLink.text}
          </span>
        </Link>
      )}
    </div>
  );
}

// ── Composant champ calculé ───────────────────────────────────────────────────

function ComputedField({
  label, icon, description, value, duration, negative, onCopy, copied,
}: {
  label: string; icon: string; description?: string; value: string;
  duration: number; negative: boolean;
  onCopy: () => void; copied: boolean;
}) {
  return (
    <div className="rounded-xl border border-green-500/40 bg-green-950/30 p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="font-bold text-white text-sm">
          {label}{" "}
          <span className="text-xs font-normal text-green-400">— calculé automatiquement</span>
        </span>
      </div>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}

      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="bg-[#0B0E14] border border-green-500/30 rounded-lg px-4 py-3 my-2"
        >
          <span className={`text-2xl md:text-3xl font-mono font-bold ${value ? "text-green-400" : "text-gray-600"}`}>
            {value ? formatDT(value) : "—"}
          </span>
        </motion.div>
      </AnimatePresence>

      {negative ? (
        <p className="text-xs text-red-400 mb-3 font-medium">⚠️ Vérifiez vos dates — durée négative</p>
      ) : duration > 0 ? (
        <p className="text-xs text-gray-400 mb-3">
          Durée de vol : <span className="text-gray-200 font-mono">{formatDuration(duration)}</span>
        </p>
      ) : null}

      <div className="flex gap-2">
        <button
          onClick={onCopy}
          disabled={!value}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[#2E384D] bg-[#0B0E14] text-gray-300 hover:text-white hover:border-gray-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copié !" : "Copier"}
        </button>
        <Link href="/outils/temps-vol">
          <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors">
            <ArrowRight className="w-3 h-3" />
            Calculateur complet
          </button>
        </Link>
      </div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────

/**
 * Mode A (calcul-retour) : Départ + Rappel → calcule Retour
 *   durée = Rappel − Départ
 *   Retour = Rappel + durée
 *
 * Mode B (calcul-rappel) : Départ + Retour → calcule Rappel
 *   durée = (Retour − Départ) / 2
 *   Rappel = Départ + durée
 */
type Mode = "calcul-retour" | "calcul-rappel";

export default function OutilsIntercepteur() {
  const [mode, setMode] = useState<Mode>("calcul-retour");

  const [depart, setDepart] = useState("");
  const [rappel, setRappel] = useState("");
  const [retour, setRetour] = useState("");

  const [copied, setCopied] = useState(false);

  // ── Calcul en temps réel ────────────────────────────────────────────────────

  const computed = useCallback((): {
    value: string; duration: number; negative: boolean;
  } => {
    if (mode === "calcul-retour") {
      // Départ + Rappel → Retour
      const dep = dtToSec(depart);
      const rap = dtToSec(rappel);
      if (dep === null || rap === null) return { value: "", duration: 0, negative: false };
      const duree = rap - dep;
      if (duree <= 0) return { value: "", duration: duree, negative: true };
      return { value: addSecsToDT(rappel, duree), duration: duree, negative: false };
    } else {
      // Départ + Retour → Rappel
      const dep = dtToSec(depart);
      const ret = dtToSec(retour);
      if (dep === null || ret === null) return { value: "", duration: 0, negative: false };
      const duree = Math.round((ret - dep) / 2);
      if (duree <= 0) return { value: "", duration: duree, negative: true };
      return { value: addSecsToDT(depart, duree), duration: duree, negative: false };
    }
  }, [mode, depart, rappel, retour]);

  const { value: computedValue, duration, negative } = computed();

  useEffect(() => { setCopied(false); }, [computedValue]);

  function handleCopy() {
    if (!computedValue) return;
    navigator.clipboard.writeText(formatDT(computedValue)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Layout>
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-lg">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Retour */}
            <Link href="/tutoriels">
              <Button variant="outline" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
                ← Retour aux tutoriels
              </Button>
            </Link>

            {/* En-tête */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-500/20">
                <Crosshair className="w-8 h-8 text-white" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                Intercepteur de Flotte
              </h1>
              <p className="text-gray-400 text-sm mb-2">
                Calculez le retour ennemi en 3 champs
              </p>
              <Link href="/guide/calc-temps-vol">
                <span className="text-xs text-primary/70 hover:text-primary transition-colors cursor-pointer">
                  Comment ça marche ? →
                </span>
              </Link>
            </div>

            {/* Sélecteur de mode */}
            <div className="flex gap-2">
              <div className="relative flex-1 group">
                <button
                  onClick={() => setMode("calcul-retour")}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    mode === "calcul-retour"
                      ? "bg-primary/20 border-primary/60 text-primary"
                      : "bg-[#151924] border-[#2E384D] text-gray-400 hover:text-white hover:border-gray-500"
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  Calculer le Retour
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-[#1C2230] border border-[#2E384D] rounded-lg px-3 py-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 text-center">
                  Je connais le <strong className="text-white">Départ</strong> et le <strong className="text-white">Rappel</strong> → je veux savoir quand la flotte revient
                </div>
              </div>

              <div className="relative flex-1 group">
                <button
                  onClick={() => setMode("calcul-rappel")}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
                    mode === "calcul-rappel"
                      ? "bg-primary/20 border-primary/60 text-primary"
                      : "bg-[#151924] border-[#2E384D] text-gray-400 hover:text-white hover:border-gray-500"
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Calculer le Rappel
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-[#1C2230] border border-[#2E384D] rounded-lg px-3 py-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 text-center">
                  Je connais le <strong className="text-white">Départ</strong> et le <strong className="text-white">Retour</strong> souhaité → je veux savoir quand rappeler
                </div>
              </div>
            </div>

            {/* Les 3 champs — ordre fixe : Départ, Rappel, Retour */}
            <div className="space-y-3">

              {/* 🚀 Départ — toujours éditable */}
              <EditableField
                label="Départ"
                icon="🚀"
                tooltip={
                  <>
                    <p>Heure à laquelle la flotte est partie.</p>
                    <p className="text-amber-400/80 mt-1">⚠️ Cette heure n'est PAS visible directement sur la phalange.</p>
                    <p className="mt-1">Pour la calculer : utilisez le calculateur de temps de vol avec l'heure d'arrivée vue sur la phalange — chaque créneau de vitesse (100%, 90%…) donne une heure de départ différente.</p>
                  </>
                }
                value={depart}
                onChange={setDepart}
                subLink={{ text: "→ Calculer depuis la phalange", href: "/outils/temps-vol" }}
              />

              {/* 🔄 Rappel */}
              {mode === "calcul-retour" ? (
                <EditableField
                  label="Rappel"
                  icon="🔄"
                  tooltip={<p>Heure à laquelle le joueur a cliqué 'Retour' — visible sur votre phalange de capteurs.</p>}
                  value={rappel}
                  onChange={setRappel}
                />
              ) : (
                <ComputedField
                  label="Rappel"
                  icon="🔄"
                  description="Heure à laquelle le joueur a cliqué 'Retour' — visible sur votre phalange de capteurs."
                  value={computedValue}
                  duration={duration}
                  negative={negative}
                  onCopy={handleCopy}
                  copied={copied}
                />
              )}

              {/* 🎯 Retour */}
              {mode === "calcul-retour" ? (
                <ComputedField
                  label="Retour"
                  icon="🎯"
                  description="Heure d'arrivée de la flotte chez l'ennemi. Envoyez votre flotte pour arriver à ce moment précis."
                  value={computedValue}
                  duration={duration}
                  negative={negative}
                  onCopy={handleCopy}
                  copied={copied}
                />
              ) : (
                <EditableField
                  label="Retour"
                  icon="🎯"
                  tooltip={<p>Heure à laquelle vous voulez que la flotte soit de retour — pour planifier votre attaque.</p>}
                  value={retour}
                  onChange={setRetour}
                />
              )}
            </div>

            {/* Formule active */}
            <div className="bg-[#151924] border border-[#2E384D] rounded-xl px-4 py-3 text-xs text-gray-500 space-y-1">
              {mode === "calcul-retour" ? (
                <>
                  <p className="font-bold text-gray-400">Mode actif : Départ + Rappel → Retour</p>
                  <p>durée = Rappel − Départ &nbsp;·&nbsp; Retour = Rappel + durée</p>
                </>
              ) : (
                <>
                  <p className="font-bold text-gray-400">Mode actif : Départ + Retour → Rappel</p>
                  <p>durée = (Retour − Départ) ÷ 2 &nbsp;·&nbsp; Rappel = Départ + durée</p>
                </>
              )}
            </div>

          </motion.div>
        </div>
      </section>
    </Layout>
  );
}

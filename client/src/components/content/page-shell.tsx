import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function PageContainer({
  children,
  maxWidth = "max-w-5xl",
}: {
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} className={cn("mx-auto", maxWidth)}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function PageBackLink({ href = "/tutoriels", label = "Retour aux tutoriels" }: { href?: string; label?: string }) {
  return (
    <Button asChild variant="outline" className="mb-6 bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 hover:text-white">
      <Link href={href}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}

export function PageHero({
  icon: IconComponent,
  title,
  description,
  gradient,
  badge,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  badge?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-12 text-center">
      <div className={cn("mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-lg", gradient)}>
        <IconComponent className="h-10 w-10 text-white" />
      </div>
      <h1 className="font-display mb-4 text-4xl font-bold text-white md:text-5xl">{title}</h1>
      <p className="mx-auto max-w-2xl text-lg text-gray-400">{description}</p>
      {badge ? <div className="mt-4">{badge}</div> : null}
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  icon: IconComponent,
  children,
  tone = "default",
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  tone?: "default" | "accent" | "warning";
}) {
  const toneClass =
    tone === "accent"
      ? "border-primary/30 bg-primary/10"
      : tone === "warning"
        ? "border-amber-600/40 bg-amber-950/30"
        : "border-[#2E384D] bg-[#1C2230]";

  return (
    <div className={cn("rounded-2xl border p-6", toneClass)}>
      <div className="mb-5 flex items-start gap-3">
        {IconComponent ? (
          <div className="mt-0.5 rounded-xl border border-white/10 bg-black/20 p-2">
            <IconComponent className="h-5 w-5 text-primary" />
          </div>
        ) : null}
        <div>
          <h2 className="font-display text-xl font-bold text-white">{title}</h2>
          {description ? <p className="mt-1 text-sm text-gray-400">{description}</p> : null}
        </div>
      </div>
      {children}
    </div>
  );
}

export function FormulaNotice({
  title,
  lines,
  tone = "accent",
}: {
  title: string;
  lines: ReactNode[];
  tone?: "accent" | "warning";
}) {
  const classes =
    tone === "warning"
      ? "border-amber-700/30 bg-amber-900/20"
      : "border-primary/30 bg-primary/10";

  return (
    <div className={cn("rounded-xl border p-4", classes)}>
      <p className="mb-2 font-bold text-white">{title}</p>
      <div className="space-y-1 text-sm text-gray-300">
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export function ResultStat({
  label,
  value,
  hint,
  valueClassName,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-xl border border-[#2E384D] bg-[#151924] p-4">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={cn("mt-2 text-2xl font-bold text-white", valueClassName)}>{value}</p>
      {hint ? <p className="mt-2 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

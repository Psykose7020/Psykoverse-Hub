export function clampNumber(value: number, min: number, max?: number): number {
  if (!Number.isFinite(value)) return min;
  const normalized = Math.max(min, value);
  return typeof max === "number" ? Math.min(normalized, max) : normalized;
}

export function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";

  const absolute = Math.abs(value);
  if (absolute >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} G`;
  if (absolute >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} M`;
  if (absolute >= 1_000) return `${(value / 1_000).toFixed(2)} k`;
  return Math.round(value).toLocaleString("fr-FR");
}

export function formatInteger(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("fr-FR");
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0s";

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (days > 0) return `${days}j ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}s`;
  if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
  return `${remainingSeconds}s`;
}

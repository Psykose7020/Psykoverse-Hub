import { useEditMode } from "../contexts/EditModeContext";
import { X, Settings, Eye } from "lucide-react";
import { Link } from "wouter";

export function AdminEditBar() {
  const { isEditMode, disableEditMode } = useEditMode();

  if (!isEditMode) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-cyan-900/95 to-blue-900/95 backdrop-blur-sm border-b border-cyan-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-cyan-100 font-medium text-sm">Mode Édition</span>
          <span className="text-cyan-400/80 text-xs hidden sm:inline">
            Cliquez sur un texte pour le modifier • Sauvegarde automatique
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded text-sm font-medium transition-colors"
            data-testid="link-admin-panel"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Admin</span>
          </Link>

          <button
            onClick={disableEditMode}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 rounded text-sm font-medium transition-colors"
            data-testid="button-exit-edit-mode"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Mode normal</span>
          </button>
        </div>
      </div>
    </div>
  );
}

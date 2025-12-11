import { useEditMode } from "../contexts/EditModeContext";
import { X, Save, Settings, Loader2 } from "lucide-react";
import { Link } from "wouter";

export function AdminEditBar() {
  const { isEditMode, disableEditMode, saveAllChanges, hasPendingChanges, isSaving } = useEditMode();

  if (!isEditMode) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-cyan-900/95 to-blue-900/95 backdrop-blur-sm border-b border-cyan-500/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-cyan-300 font-medium text-sm">Mode Édition Actif</span>
          {hasPendingChanges && (
            <span className="bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded text-xs">
              Modifications non sauvegardées
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={saveAllChanges}
            disabled={!hasPendingChanges || isSaving}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ${
              hasPendingChanges
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
            }`}
            data-testid="button-save-all"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Sauvegarder tout
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded text-sm font-medium transition-colors"
            data-testid="link-admin-panel"
          >
            <Settings className="w-4 h-4" />
            Panneau Admin
          </Link>

          <button
            onClick={disableEditMode}
            className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded text-sm font-medium transition-colors"
            data-testid="button-exit-edit-mode"
          >
            <X className="w-4 h-4" />
            Quitter
          </button>
        </div>
      </div>
    </div>
  );
}

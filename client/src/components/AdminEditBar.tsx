import { useState, useEffect } from "react";
import { X, Settings, Pencil } from "lucide-react";
import { Link } from "wouter";

export function AdminEditBar() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const token = localStorage.getItem("adminToken");
      const editActive = localStorage.getItem("editModeActive") === "true";
      setIsAdmin(!!token);
      setIsEditMode(editActive);
    };
    
    checkStatus();
    window.addEventListener("storage", checkStatus);
    window.addEventListener("editModeChanged", checkStatus);
    
    return () => {
      window.removeEventListener("storage", checkStatus);
      window.removeEventListener("editModeChanged", checkStatus);
    };
  }, []);

  const toggleEditMode = () => {
    const newState = !isEditMode;
    if (newState) {
      localStorage.setItem("editModeActive", "true");
    } else {
      localStorage.removeItem("editModeActive");
    }
    setIsEditMode(newState);
    window.dispatchEvent(new Event("editModeChanged"));
  };

  if (!isAdmin) return null;

  if (!isEditMode) {
    return (
      <button
        onClick={toggleEditMode}
        className="fixed bottom-4 right-4 z-[9999] bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-3 rounded-full shadow-lg shadow-cyan-500/30 flex items-center gap-2 font-medium transition-all hover:scale-105"
        data-testid="button-enable-edit-mode"
      >
        <Pencil className="w-5 h-5" />
        Mode Édition
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-cyan-900 to-blue-900 border-b-2 border-cyan-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-100 font-bold">MODE ÉDITION ACTIF</span>
          </div>
          <span className="text-cyan-300/80 text-sm hidden md:block">
            Survolez un texte et cliquez sur le crayon pour le modifier
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
            data-testid="link-admin-panel"
          >
            <Settings className="w-4 h-4" />
            Admin
          </Link>

          <button
            onClick={toggleEditMode}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
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

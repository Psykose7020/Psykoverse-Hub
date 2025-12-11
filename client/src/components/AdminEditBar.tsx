import { useState, useEffect, useRef } from "react";
import { X, Settings, Pencil, ChevronUp } from "lucide-react";
import { Link } from "wouter";

export function AdminEditBar() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (isEditMode && !isCollapsed) {
      timerRef.current = setTimeout(() => {
        setIsCollapsed(true);
      }, 5000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isEditMode, isCollapsed]);

  const handleExpand = () => {
    setIsCollapsed(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isEditMode && !isCollapsed) {
      timerRef.current = setTimeout(() => {
        setIsCollapsed(true);
      }, 3000);
    }
  };

  const toggleEditMode = () => {
    const newState = !isEditMode;
    if (newState) {
      localStorage.setItem("editModeActive", "true");
      setIsCollapsed(false);
    } else {
      localStorage.removeItem("editModeActive");
    }
    setIsEditMode(newState);
    window.dispatchEvent(new Event("editModeChanged"));
  };

  const exitEditMode = () => {
    localStorage.removeItem("editModeActive");
    setIsEditMode(false);
    setIsCollapsed(false);
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
        <span className="hidden sm:inline">Mode Édition</span>
      </button>
    );
  }

  if (isCollapsed) {
    return (
      <button
        onClick={handleExpand}
        className="fixed bottom-4 right-4 z-[9999] bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white w-14 h-14 rounded-full shadow-lg shadow-cyan-500/40 flex items-center justify-center transition-all hover:scale-110 animate-pulse"
        title="Mode Édition actif - Cliquez pour développer"
        data-testid="button-expand-edit-bar"
      >
        <Pencil className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-cyan-900 to-blue-900 border-b-2 border-cyan-500 shadow-lg transition-all"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-100 font-bold text-sm md:text-base">MODE ÉDITION</span>
          </div>
          <span className="text-cyan-300/80 text-xs md:text-sm hidden lg:block">
            Survolez un texte avec un crayon et cliquez pour le modifier
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={() => setIsCollapsed(true)}
            className="flex items-center gap-1 px-2 md:px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
            title="Réduire la barre"
          >
            <ChevronUp className="w-4 h-4" />
            <span className="hidden md:inline">Réduire</span>
          </button>

          <Link
            href="/admin"
            className="flex items-center gap-1 px-2 md:px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors"
            data-testid="link-admin-panel"
          >
            <Settings className="w-4 h-4" />
            <span className="hidden md:inline">Admin</span>
          </Link>

          <button
            onClick={exitEditMode}
            className="flex items-center gap-1 px-2 md:px-3 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
            data-testid="button-exit-edit-mode"
          >
            <X className="w-4 h-4" />
            <span className="hidden md:inline">Quitter</span>
          </button>
        </div>
      </div>
    </div>
  );
}

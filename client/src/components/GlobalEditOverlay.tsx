import { useState, useEffect, useCallback, useRef } from "react";
import { X, Check, Loader2, Pencil } from "lucide-react";

interface EditPosition {
  x: number;
  y: number;
  width: number;
  element: HTMLElement;
  originalText: string;
}

export function GlobalEditOverlay() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editPosition, setEditPosition] = useState<EditPosition | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  const handleCtrlClick = useCallback((e: MouseEvent) => {
    if (!isAdmin || !isEditMode) return;
    if (!e.ctrlKey && !e.metaKey) return;

    const target = e.target as HTMLElement;
    
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "BUTTON") {
      return;
    }

    if (target.closest("[data-no-edit]") || target.closest("button") || target.closest("a")) {
      return;
    }

    const text = target.innerText?.trim();
    if (!text || text.length < 2 || text.length > 500) return;

    e.preventDefault();
    e.stopPropagation();

    const rect = target.getBoundingClientRect();
    setEditPosition({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      width: Math.max(rect.width, 200),
      element: target,
      originalText: text,
    });
    setEditValue(text);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
  }, [isAdmin, isEditMode]);

  useEffect(() => {
    document.addEventListener("click", handleCtrlClick, true);
    return () => {
      document.removeEventListener("click", handleCtrlClick, true);
    };
  }, [handleCtrlClick]);

  const handleSave = async () => {
    if (!editPosition || editValue.trim() === editPosition.originalText) {
      setEditPosition(null);
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) return;

    const contentId = `global-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: contentId, content: editValue.trim() }),
      });

      if (res.ok) {
        editPosition.element.innerText = editValue.trim();
        editPosition.element.setAttribute("data-content-id", contentId);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
      setEditPosition(null);
    }
  };

  const handleCancel = () => {
    setEditPosition(null);
    setEditValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
  };

  if (!isAdmin || !isEditMode) return null;

  return (
    <>
      {showSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[10001] bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
          <Check className="w-4 h-4" />
          Modification sauvegardée !
        </div>
      )}

      <div className="fixed bottom-40 right-6 z-[9998] bg-cyan-900/90 backdrop-blur text-cyan-100 px-3 py-2 rounded-lg text-xs border border-cyan-500/30 shadow-lg max-w-[200px]">
        <div className="flex items-center gap-2 mb-1">
          <Pencil className="w-3 h-3" />
          <span className="font-bold">Astuce Admin</span>
        </div>
        <p>Ctrl + Clic sur n'importe quel texte pour le modifier</p>
      </div>

      {editPosition && (
        <div 
          className="fixed inset-0 z-[10000]"
          onClick={handleCancel}
        >
          <div 
            className="absolute bg-[#1a1f2e] border-2 border-cyan-400 rounded-lg shadow-2xl shadow-cyan-500/20 p-2"
            style={{
              left: editPosition.x,
              top: editPosition.y,
              minWidth: editPosition.width,
              maxWidth: "90vw",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <textarea
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white border-none outline-none resize-none min-h-[60px] p-2"
              style={{ 
                fontSize: "inherit",
                lineHeight: "inherit",
              }}
              rows={Math.min(5, Math.ceil(editValue.length / 50))}
            />
            <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-cyan-500/30">
              <span className="text-xs text-gray-400 mr-auto self-center">
                Entrée = Sauver, Échap = Annuler
              </span>
              {isSaving ? (
                <div className="bg-blue-500 text-white px-3 py-1.5 rounded flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                <>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-400 text-white px-3 py-1.5 rounded text-sm transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { useState, useEffect, useRef } from "react";
import { Pencil, Check, X, Loader2 } from "lucide-react";

interface EditableTextProps {
  id: string;
  defaultValue: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "span" | "div";
  className?: string;
  multiline?: boolean;
}

export function EditableText({
  id,
  defaultValue,
  as: Component = "span",
  className = "",
  multiline = false,
}: EditableTextProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(defaultValue);
  const [editValue, setEditValue] = useState(defaultValue);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    const checkAdmin = () => {
      const token = localStorage.getItem("adminToken");
      const editActive = localStorage.getItem("editModeActive") === "true";
      setIsAdmin(!!token);
      setIsEditMode(editActive);
    };
    
    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    window.addEventListener("editModeChanged", checkAdmin);
    
    return () => {
      window.removeEventListener("storage", checkAdmin);
      window.removeEventListener("editModeChanged", checkAdmin);
    };
  }, []);

  useEffect(() => {
    fetch("/api/content")
      .then(res => res.json())
      .then(data => {
        if (data[id]) {
          setContent(data[id]);
          setEditValue(data[id]);
        }
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editValue.trim() === content) {
      setIsEditing(false);
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, content: editValue.trim() }),
      });

      if (res.ok) {
        setContent(editValue.trim());
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditValue(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCancel();
    }
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    }
  };

  if (!isAdmin || !isEditMode) {
    return <Component className={className}>{content}</Component>;
  }

  if (isEditing) {
    return (
      <div className="relative inline-flex items-center gap-2">
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} bg-cyan-900/30 border-2 border-cyan-400 rounded px-2 py-1 outline-none min-w-[200px] resize-none`}
            rows={3}
            data-testid={`input-${id}`}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`${className} bg-cyan-900/30 border-2 border-cyan-400 rounded px-2 py-1 outline-none min-w-[150px]`}
            data-testid={`input-${id}`}
          />
        )}
        <div className="flex gap-1">
          {isSaving ? (
            <div className="bg-blue-500 text-white p-2 rounded">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-400 text-white p-2 rounded transition-colors"
                title="Sauvegarder"
                data-testid={`save-${id}`}
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 hover:bg-red-400 text-white p-2 rounded transition-colors"
                title="Annuler"
                data-testid={`cancel-${id}`}
              >
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block group">
      <Component 
        className={`${className} cursor-pointer border-2 border-dashed border-transparent hover:border-cyan-400/50 hover:bg-cyan-900/10 rounded px-1 -mx-1 transition-all`}
        onClick={() => setIsEditing(true)}
        data-testid={`editable-${id}`}
      >
        {content}
      </Component>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-cyan-500 hover:bg-cyan-400 text-white p-1.5 rounded-full shadow-lg transition-opacity"
        title="Modifier ce texte"
      >
        <Pencil className="w-3 h-3" />
      </button>
      {showSuccess && (
        <div className="absolute -top-8 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
          ✓ Sauvegardé !
        </div>
      )}
    </div>
  );
}

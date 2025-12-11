import { useRef, useEffect, useState, useCallback } from "react";
import { useEditMode } from "../contexts/EditModeContext";
import { Pencil, Check, Loader2 } from "lucide-react";

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
  const { isEditMode, getContent, saveContent } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const content = getContent(id, defaultValue);

  useEffect(() => {
    if (contentRef.current && !isEditing) {
      contentRef.current.innerText = content;
    }
  }, [content, isEditing]);

  const handleSave = useCallback(async () => {
    if (!contentRef.current) return;
    
    const newValue = contentRef.current.innerText.trim();
    if (newValue !== content && newValue !== "") {
      setIsSaving(true);
      const success = await saveContent(id, newValue);
      setIsSaving(false);
      if (success) {
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 1500);
      }
    }
    setIsEditing(false);
  }, [content, id, saveContent]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (contentRef.current) {
        contentRef.current.innerText = content;
      }
      setIsEditing(false);
    }
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleSave();
    }
  };

  const startEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus();
        const range = document.createRange();
        range.selectNodeContents(contentRef.current);
        range.collapse(false);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }, 10);
  };

  if (!isEditMode) {
    return <Component className={className}>{content}</Component>;
  }

  return (
    <div className="relative group inline-block">
      <Component
        ref={contentRef as any}
        className={`${className} ${
          isEditing 
            ? "outline outline-2 outline-cyan-400 bg-cyan-900/30 rounded-sm px-1 -mx-1" 
            : "hover:outline hover:outline-2 hover:outline-dashed hover:outline-cyan-400/60 hover:bg-cyan-900/20 rounded-sm cursor-pointer transition-all"
        }`}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        onClick={() => !isEditing && startEditing()}
        data-testid={`editable-${id}`}
      >
        {content}
      </Component>
      
      {!isEditing && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={startEditing}
            className="bg-cyan-500 hover:bg-cyan-400 text-white p-1.5 rounded-full shadow-lg shadow-cyan-500/30"
            title="Cliquez pour modifier"
          >
            <Pencil className="w-3 h-3" />
          </button>
        </div>
      )}
      
      {isEditing && (
        <div className="absolute -top-2 -right-2 flex gap-1">
          {isSaving ? (
            <div className="bg-blue-500 text-white p-1.5 rounded-full">
              <Loader2 className="w-3 h-3 animate-spin" />
            </div>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-400 text-white p-1.5 rounded-full shadow-lg"
              title="Valider (Entrée)"
            >
              <Check className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
      
      {showSaved && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap animate-pulse">
          ✓ Sauvegardé !
        </div>
      )}
    </div>
  );
}

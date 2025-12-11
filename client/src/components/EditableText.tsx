import { useRef, useEffect, useState } from "react";
import { useEditMode } from "../contexts/EditModeContext";
import { Pencil, Check } from "lucide-react";

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
  const { isEditMode, getContent, updateContent } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const contentRef = useRef<HTMLElement>(null);

  const content = getContent(id, defaultValue);

  useEffect(() => {
    setLocalValue(content);
  }, [content]);

  const handleBlur = () => {
    if (contentRef.current) {
      const newValue = contentRef.current.innerText;
      if (newValue !== content) {
        updateContent(id, newValue);
      }
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (contentRef.current) {
        contentRef.current.innerText = content;
      }
      setIsEditing(false);
    }
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleBlur();
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{content}</Component>;
  }

  return (
    <div className="relative group inline-block">
      <Component
        ref={contentRef as any}
        className={`${className} ${isEditing ? "outline outline-2 outline-cyan-400 bg-cyan-900/20 rounded px-1" : "hover:outline hover:outline-1 hover:outline-cyan-400/50 hover:bg-cyan-900/10 rounded cursor-pointer"}`}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onClick={() => !isEditing && setIsEditing(true)}
        data-testid={`editable-${id}`}
      >
        {localValue}
      </Component>
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute -right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-500 text-white p-1 rounded text-xs"
          title="Modifier"
        >
          <Pencil className="w-3 h-3" />
        </button>
      )}
      {isEditing && (
        <button
          onClick={handleBlur}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-green-500 text-white p-1 rounded text-xs"
          title="Valider"
        >
          <Check className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

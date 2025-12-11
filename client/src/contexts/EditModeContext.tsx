import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface EditModeContextType {
  isEditMode: boolean;
  isAdmin: boolean;
  content: Record<string, string>;
  pendingChanges: Record<string, string>;
  enableEditMode: () => void;
  disableEditMode: () => void;
  getContent: (id: string, defaultValue: string) => string;
  updateContent: (id: string, value: string) => void;
  saveAllChanges: () => Promise<void>;
  hasPendingChanges: boolean;
  isSaving: boolean;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) {
    return {
      isEditMode: false,
      isAdmin: false,
      content: {},
      pendingChanges: {},
      enableEditMode: () => {},
      disableEditMode: () => {},
      getContent: (_id: string, defaultValue: string) => defaultValue,
      updateContent: () => {},
      saveAllChanges: async () => {},
      hasPendingChanges: false,
      isSaving: false,
    };
  }
  return context;
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});
  const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      fetch("/api/admin/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) {
            setIsAdmin(true);
            const editModeActive = localStorage.getItem("editModeActive") === "true";
            if (editModeActive) {
              setIsEditMode(true);
            }
          } else {
            setIsAdmin(false);
            setIsEditMode(false);
            localStorage.removeItem("editModeActive");
          }
        })
        .catch(() => {
          setIsAdmin(false);
        });
    }
  }, []);

  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(console.error);
  }, []);

  const enableEditMode = useCallback(() => {
    if (isAdmin) {
      setIsEditMode(true);
      localStorage.setItem("editModeActive", "true");
    }
  }, [isAdmin]);

  const disableEditMode = useCallback(() => {
    setIsEditMode(false);
    localStorage.removeItem("editModeActive");
    setPendingChanges({});
  }, []);

  const getContent = useCallback(
    (id: string, defaultValue: string) => {
      if (pendingChanges[id] !== undefined) return pendingChanges[id];
      if (content[id] !== undefined) return content[id];
      return defaultValue;
    },
    [content, pendingChanges]
  );

  const updateContent = useCallback((id: string, value: string) => {
    setPendingChanges((prev) => ({ ...prev, [id]: value }));
  }, []);

  const saveAllChanges = useCallback(async () => {
    const token = localStorage.getItem("adminToken");
    if (!token || Object.keys(pendingChanges).length === 0) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/content/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contents: pendingChanges }),
      });

      if (res.ok) {
        setContent((prev) => ({ ...prev, ...pendingChanges }));
        setPendingChanges({});
      }
    } catch (error) {
      console.error("Failed to save changes:", error);
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges]);

  const hasPendingChanges = Object.keys(pendingChanges).length > 0;

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        isAdmin,
        content,
        pendingChanges,
        enableEditMode,
        disableEditMode,
        getContent,
        updateContent,
        saveAllChanges,
        hasPendingChanges,
        isSaving,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

interface EditModeContextType {
  isEditMode: boolean;
  isAdmin: boolean;
  content: Record<string, string>;
  enableEditMode: () => void;
  disableEditMode: () => void;
  getContent: (id: string, defaultValue: string) => string;
  saveContent: (id: string, value: string) => Promise<boolean>;
}

const EditModeContext = createContext<EditModeContextType | null>(null);

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) {
    return {
      isEditMode: false,
      isAdmin: false,
      content: {},
      enableEditMode: () => {},
      disableEditMode: () => {},
      getContent: (_id: string, defaultValue: string) => defaultValue,
      saveContent: async () => false,
    };
  }
  return context;
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

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
            localStorage.removeItem("adminToken");
          }
        })
        .catch(() => {
          setIsAdmin(false);
          setIsEditMode(false);
          localStorage.removeItem("editModeActive");
          localStorage.removeItem("adminToken");
        });
    } else {
      setIsAdmin(false);
      setIsEditMode(false);
      localStorage.removeItem("editModeActive");
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
  }, []);

  const getContent = useCallback(
    (id: string, defaultValue: string) => {
      if (content[id] !== undefined) return content[id];
      return defaultValue;
    },
    [content]
  );

  const saveContent = useCallback(async (id: string, value: string): Promise<boolean> => {
    const token = localStorage.getItem("adminToken");
    if (!token) return false;

    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, content: value }),
      });

      if (res.ok) {
        setContent((prev) => ({ ...prev, [id]: value }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to save content:", error);
      return false;
    }
  }, []);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        isAdmin,
        content,
        enableEditMode,
        disableEditMode,
        getContent,
        saveContent,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
}

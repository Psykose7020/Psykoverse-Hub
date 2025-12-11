import { createContext, useContext, ReactNode } from "react";

const EditModeContext = createContext(null);

export function useEditMode() {
  return useContext(EditModeContext);
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

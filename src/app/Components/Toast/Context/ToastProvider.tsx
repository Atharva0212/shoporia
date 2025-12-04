import { PropsWithChildren } from "react";
import { ToastContext } from "./ToastContext";
import { useToastController } from "../hooks/useToastController";

export function ToastProvider({ children }: PropsWithChildren) {
  const { addToast } = useToastController();
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
    </ToastContext.Provider>
  );
}

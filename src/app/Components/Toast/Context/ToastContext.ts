import { createContext, useContext } from "react";
import { useToastController } from "../hooks/useToastController";

type ToastContextType={
    addToast:ReturnType<typeof useToastController>["addToast"];
}

export const ToastContext=createContext<ToastContextType|null>(null);

export function useToast(){
    const context=useContext(ToastContext);
    if(!context){
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}


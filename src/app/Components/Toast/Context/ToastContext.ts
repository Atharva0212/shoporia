"use client";

import { createContext, useContext } from "react";
import { AddToast } from "../types";

type ToastContextType={
    addToast:AddToast;
}

export const ToastContext=createContext<ToastContextType|null>(null);

export function useToast(){
    const context=useContext(ToastContext);
    if(!context){
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
}


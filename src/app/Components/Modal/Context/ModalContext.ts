"use client";

import { createContext, useContext } from "react";
import { useModalController } from "../hooks/useModalController";

type ModalContextType = {
    setModal: ReturnType<typeof useModalController>["setModal"];
    openModal: ReturnType<typeof useModalController>["openModal"];
}

export const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal should be used within ModalProvider");
    }
    return context;
}
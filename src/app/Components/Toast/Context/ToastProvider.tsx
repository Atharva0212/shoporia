"use client";

import { PropsWithChildren } from "react";
import { ToastContext } from "./ToastContext";
import { useToastController } from "../hooks/useToastController";
import { ToastContainer } from "../ToastContainer";

export function ToastProvider({ children }: PropsWithChildren) {
  const {
    toastList,
    toastRefs,
    handleCloseToast,
    handleMouseEnter,
    handleMouseLeave,
    addToast,
  } = useToastController();
  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer
        toastList={toastList}
        toastRefs={toastRefs}
        handleCloseToast={handleCloseToast}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </ToastContext.Provider>
  );
}

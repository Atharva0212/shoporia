"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Button } from "../Button";
import { Duration } from "./Constants/Duration";
import { ModalState } from "./Constants/ModalState";
import { ModalStateType } from "./type";
import { theme } from "./Constants/theme";
import { AnimationVariants } from "./Constants/AnimationVariants";
import "./modal.css"

type ModalProps = {
  closeModal: () => void;
  modal: ModalStateType;
};

export function Modal({ closeModal, modal }: ModalProps) {
  useEffect(() => {
    const duration =
      modal.status !== ModalState.CLOSED ? modal.options.duration : Duration;
    const timer = setTimeout(() => {
      closeModal();
    }, duration);
    return () => clearTimeout(timer);
  },[modal,closeModal]);

  if (modal.status === ModalState.CLOSED) {
    return null;
  }

  const { content, id, options, variant } = modal;
const variantTheme =theme[variant];
const modalAnimation =AnimationVariants[options.animationVariant]
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      closeModal();
      return;
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        tabIndex={-1}
        className={`relative bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center max-w-md w-full gap-4 ${
          modal.status === ModalState.OPEN
            ? modalAnimation.enter
            : modal.status === ModalState.CLOSING
            ? modalAnimation.exit
            : ""
        }`}
      >
        <Button
          aria-label="Close Modal"
          onKeyUp={handleKeyDown}
          className="absolute top-4 right-4 px-2 rounded-full hover:bg-gray-100"
        >
          <Image
            src={"/icons/close.svg"}
            alt="Close"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </Button>
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full"
          style={{ backgroundColor: variantTheme.iconBg }}
        >
          <Image
            src={variantTheme.icon.src}
            alt={variantTheme.icon.alt}
            width={20}
            height={20}
            className={`w-8 h-8`}
          />
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
}

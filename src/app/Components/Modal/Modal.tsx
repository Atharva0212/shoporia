"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { Button } from "../Button";
import { AnimationVariants } from "./Constants/AnimationVariants";
import { ModalState } from "./Constants/ModalState";
import "./modal.css";
import { ModalStateType } from "./type";

type ModalProps = {
  closeModal: () => void;
  modal: ModalStateType;
};

export function Modal({ closeModal, modal }: ModalProps) {
  useEffect(() => {
    const timer =
      modal.status !== ModalState.CLOSED &&
      !modal.options.closeBehavior.manualClose
        ? setTimeout(() => {
            closeModal();
          }, modal.options.closeBehavior.duration)
        : null;
    return () => {
      if (timer) {
        return clearTimeout(timer);
      }
    };
  }, [modal, closeModal]);
   

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
    },
    [closeModal],
  );

  if (modal.status === ModalState.CLOSED) {
    return null;
  }

  const { content, id, options } = modal;
  const modalAnimation = AnimationVariants[options.animationVariant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        tabIndex={-1}
        className={`relative bg-white rounded-2xl shadow-2xl p-4 flex flex-col items-center w-[min(100%-2rem,28rem)] gap-4 ${
          modal.status === ModalState.OPEN
            ? modalAnimation.enter
            : modal.status === ModalState.CLOSING
              ? modalAnimation.exit
              : ""
        }`}
      >
        <Button
          aria-label="Close Modal"
          onClick={closeModal}
          onKeyUp={handleKeyDown}
          className="absolute top-4 right-4 px-2 rounded-full hover:bg-gray-100 z-99"
        >
          <Image
            src={"/icons/close.svg"}
            alt="Close"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        </Button>
        {content}
      </div>
    </div>
  );
}

"use client";

import { PropsWithChildren } from "react";
import { ModalContext } from "./ModalContext";
import { Modal } from "../Modal";
import { useModalController } from "../hooks/useModalController";

export function ModalProvider({ children }: PropsWithChildren) {
  const { activeModal, closeModal, setModal, openModal } = useModalController();
  return (
    <ModalContext.Provider value={{ setModal, openModal }}>
      {children}
      <Modal modal={activeModal} closeModal={closeModal} />
    </ModalContext.Provider>
  );
}

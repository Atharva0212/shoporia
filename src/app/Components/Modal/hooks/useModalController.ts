"use client";

import { theme } from "@/src/app/Components/Modal/Constants/theme";
import React, { useState } from "react";
import { ModalState } from "../Constants/ModalState";
import { ModalOptions, ModalStateType } from "../type";

export function useModalController() {
    const [activeModal, setActiveModal] = useState<ModalStateType>({ status: ModalState.CLOSED });

    function setModal(content: React.ReactNode, variant: keyof typeof theme, options: Partial<ModalOptions> = {}) {
        const id = generateId();
        const wrappedContent = React.createElement(
            "h2",
            { id, className: "text-h5 font-bold" },
            content
        );

        openModal(wrappedContent, id, variant, options)
    }

    function openModal(content: React.ReactNode, id: string, variant: keyof typeof theme, options: Partial<ModalOptions> = {}) {
        const { animationVariant = "FADE", duration = 2000 } = options;
        setActiveModal({ status: ModalState.OPEN, content, id, variant, options: { animationVariant, duration } });
    }

    function closeModal() {
        setActiveModal(prev => {
            if (prev.status === ModalState.OPEN) {
                return { ...prev, status: ModalState.CLOSING }
            } else {
                return prev;
            }
        })
        setTimeout(() => {
            setActiveModal({ status: ModalState.CLOSED });
        }, 200);
    }
    return { activeModal, setModal, openModal, closeModal }
}
function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

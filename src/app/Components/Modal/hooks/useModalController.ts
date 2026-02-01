"use client";

import { theme } from "@/src/app/Components/Modal/Constants/theme";
import React, { useCallback, useEffect, useState } from "react";
import { ModalState } from "../Constants/ModalState";
import { ModalOptions, ModalStateType } from "../type";
import { Duration } from "../Constants/Duration";
import { NotificationModalContent } from "../Components/NotificationModalContent";

export function useModalController() {
    const [activeModal, setActiveModal] = useState<ModalStateType>({ status: ModalState.CLOSED });

    const openModal = useCallback((content: React.ReactNode, id: string, options: Partial<ModalOptions> = {}) => {

        const { animationVariant = "FADE", closeBehavior } = options;
        const modalCloseBehavior = closeBehavior ?? {
            manualClose: false,
            duration: Duration
        }

        setActiveModal({ status: ModalState.OPEN, content, id, options: { animationVariant, closeBehavior: modalCloseBehavior } });
    }, [])

    const setModal = useCallback((content: React.ReactNode, variant: keyof typeof theme, options: Partial<ModalOptions> = {}) => {
        const id = generateId();
        const wrappedContent = React.createElement(
            "h2",
            { id, className: "text-h5 font-bold" },
            content
        );
        const notificationModalContentElement = React.createElement(NotificationModalContent, { variant, content: wrappedContent });

        openModal(notificationModalContentElement, id, options)
    }, [openModal])

    const closeModal = useCallback(() => {
        setActiveModal(prev =>
            prev.status === ModalState.OPEN
                ? { ...prev, status: ModalState.CLOSING }
                : prev
        );

        wait().then(() => {
            setActiveModal(prev => {
                if (prev.status !== "closed") {
                    return { status: ModalState.CLOSED }
                }
                return prev
            });
        })
    }, []);


    return { activeModal, setModal, openModal, closeModal }
}
export function generateId() {
    return Math.random().toString(36).substring(2, 9);
}

function wait(duration = 200) {
    return new Promise(res => {
        setTimeout(res, duration)
    })
}
import React, { useCallback } from "react";
import { CompleteProfileModal } from "../app/Components/Modal/Components/CompleteProfileModal";
import { useModal } from "../app/Components/Modal/Context/ModalContext";
import { generateId } from "../app/Components/Modal/hooks/useModalController";

export function useCompleteProfileModal() {
    const { openModal, closeModal } = useModal();

    const openCompleteProfileModal = useCallback(() => {
        const completeProfileModalElement = React.createElement(CompleteProfileModal, { closeModal })
        const id = generateId();
        openModal(completeProfileModalElement, id, {
            closeBehavior: {
                manualClose: true,
            }
        })
     }, [closeModal, openModal]);

    return { openCompleteProfileModal }
}


 
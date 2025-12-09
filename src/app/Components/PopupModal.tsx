"use client";

import { useEffect } from "react";
import { useModal } from "./Modal/Context/ModalContext"

export function PopupModal() {
    const {setModal}=useModal();
    useEffect(()=>{
        setModal("This site is currently under active development. Some features may not work as expected.","info")
    },[setModal])
  return (
    <div>PopupModal</div>
  )
}

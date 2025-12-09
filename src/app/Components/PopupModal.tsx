"use client";

import { useEffect, useEffectEvent } from "react";
import { useModal } from "./Modal/Context/ModalContext"

export function PopupModal() {
    const {setModal}=useModal();

    const showDevNotice=useEffectEvent(()=>{
      setModal("This site is currently under active development. Some features may not work as expected.","info")
    })
    useEffect(()=>{
      showDevNotice();
    },[])
  return null;
}

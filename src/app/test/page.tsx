"use client";

import React, { useEffect } from 'react'
import { useModal } from '../Components/Modal/Context/ModalContext'
import { useToast } from '../Components/Toast/Context/ToastContext';

export default function Page() {
    const {setModal}=useModal();
    const {addToast}=useToast()
    useEffect(()=>{
      addToast("Hi","success",{animationVariant:"SLIDE"})
      addToast("Hi","info")
      addToast("Hi","warning")
      addToast(`${crypto.getRandomValues}`,"error")
      
        // setModal("Hi",'info',{
        //     animationVariant:"SLIDE"
        // })
    },[])
  return (
    <div></div>
  )
}

"use client";

import React, { useEffect } from 'react'
import { useModal } from '../Components/Modal/Context/ModalContext'

export default function Page() {
    const {setModal}=useModal();
    useEffect(()=>{
        setModal("Hi",'info',{
            animationVariant:"SLIDE"
        })
    },[])
  return (
    <div>page</div>
  )
}

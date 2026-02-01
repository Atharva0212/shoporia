"use client";

import React from 'react'
import { useModal } from '../Components/Modal/Context/ModalContext';

export default function Page() {
    const {setModal}=useModal()
    console.log("hidj");
    
  return (
    <div>page</div>
  )
}

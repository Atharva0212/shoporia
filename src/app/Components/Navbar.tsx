"use client";

import Image from "next/image";
import { Layout } from "./Layout";
import { Button } from "./Button";
import clsx from "clsx";
import { useState } from "react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav className="bg-background w-full p-2">
        <div className="border-b border-divider-200 py-2">
          <Layout className="flex items-center justify-between gap-1">
            <Logo />
            <SearchInput className="hidden sm:block flex-1" />
            <NavbarActions />
            <HamburgerMenu isMenuOpen={isMenuOpen} onMenuToogle={()=>setIsMenuOpen(prev=>!prev)}/>
          </Layout>
        </div>
        <div className={`sm:hidden border-b border-divider-300 ${isMenuOpen?"block":"hidden"}`}>
          <Layout className="py-4">
            <SearchInput className="mx-auto mb-4" />
            <NavbarMenuActions/>
          </Layout>
        </div>
      </nav>
    </>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="bg-inverse text-text-inverse px-2  rounded-lg text-h4 md:text-h3">
        S
      </div>
      <h2 className="text-h5 md:text-h3">Shoporia</h2>
    </div>
  );
}

function SearchInput({ className }: { className?: string }) {
  return (
    <div className={clsx("relative max-w-xl w-full", className)}>
      <input
        type="text"
        placeholder="Search products, categories..."
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-2 text-text-muted border border-divider-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-body"
      />
      <div className="w-5 h-5 text-gray-400 absolute left-4 top-2.5">
        <Image src={"/icons/search.svg"} alt="Search" width={20} height={20} />
      </div>
    </div>
  );
}

function NavbarActions() {
  return (
    <div className="hidden sm:flex items-center gap-4">
      <Button className="relative px-2 rounded-full before:content-['2'] before:absolute before:right-1 before:top-0 before:bg-inverse before:rounded-full before:font-body before:font-semibold before:text-text-inverse before:px-1 text-[12px]">
        <Image
          src={"/icons/shopping-cart.svg"}
          alt="shopping-cart"
          height={20}
          width={20}
          className="w-[26px] h-[26px]"
        />
      </Button>
      <Button className="flex items-center gap-1 bg-inverse rounded-full">
        <Image
          src={"/icons/user.svg"}
          alt=""
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="text-text-inverse">Login</span>
      </Button>
    </div>
  );
}

function NavbarMenuActions() {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <Button className="flex items-center justify-center gap-1 bg-inverse rounded-2xl">
        <Image
          src={"/icons/user.svg"}
          alt=""
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="text-text-inverse">Login</span>
      </Button>
      <Button className="flex items-center justify-center border border-divider-400 gap-1 rounded-2xl">
        <Image
          src={"/icons/shopping-cart.svg"}
          alt="shopping-cart"
          height={20}
          width={20}
          className="w-[26px] h-[26px]"
        />
        Cart (4)
      </Button>
    </div>
  );
}

type HamburgerMenuProps={
  isMenuOpen:boolean,
onMenuToogle:()=>void,
}

function HamburgerMenu({isMenuOpen,onMenuToogle}:HamburgerMenuProps) {
  return (
    <button
      onClick={onMenuToogle}
      className="sm:hidden flex flex-col justify-center items-center gap-1 w-6 relative focus:outline-none *:block *:w-full *:h-[3px] *:bg-inverse *:rounded *:duration-300 *:ease-in-out"
      aria-label="Toggle menu"
    >
      <span
        className={` transition-transform 
          ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
      ></span>
      <span
        className={`transition-opacity
          ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
      ></span>
      <span
        className={`transition-transform
          ${isMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
      ></span>
    </button>
  );
}

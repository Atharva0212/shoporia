"use client";

import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { Layout } from "./Layout";
import { useCallback, useState } from "react";
import Link from "next/link";
import { CartDrawer } from "./CartDrawer";
import { useAppSelector } from "../store/hooks";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
    const handleCartOpenChange = useCallback(function (isOpen: boolean) {
    setIsCartOpen(isOpen);
  },[]);
  return (
    <>
      <nav>
        <div className="border-b border-divider-200">
          <Layout
            backgroundColor="background"
            className="flex items-center justify-between gap-1"
          >
            <Logo />
            <SearchInput className="hidden sm:block flex-1" />
            <NavbarActions handleCartOpenChange={handleCartOpenChange}/>
            <HamburgerMenu
              isMenuOpen={isMenuOpen}
              onMenuToogle={() => setIsMenuOpen((prev) => !prev)}
            />
          </Layout>
        </div>
        <div
          className={`sm:hidden border-b border-divider-300 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <Layout className="py-4">
            <SearchInput className="mx-auto mb-4" />
            <NavbarMenuActions handleCartOpenChange={handleCartOpenChange}/>
          </Layout>
        </div>
        <CartDrawer isCartOpen={isCartOpen} handleCartOpenChange={handleCartOpenChange}/>
      </nav>
    </>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="bg-inverse text-text-100 px-2  rounded-lg text-h4 md:text-h3">
        S
      </div>
      <h2 className="text-h5 md:text-h3">Shoporia</h2>
    </div>
  );
}

function SearchInput({ className }: { className?: string }) {
  return (
    <div className={twMerge("relative max-w-xl w-full", className)}>
      <input
        type="text"
        placeholder="Search products, categories..."
        // value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-2 text-text-500 border border-divider-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-body"
      />
      <div className="w-5 h-5 text-gray-400 absolute left-4 top-2.5">
        <Image src={"/icons/search.svg"} alt="Search" width={20} height={20} />
      </div>
    </div>
  );
}

function NavbarActions({handleCartOpenChange}:{handleCartOpenChange:(isCartOpen: boolean)=>void}) {
  const cartCount=useAppSelector(state=>state.cart).items.length;
  return (
    <div className="hidden sm:flex items-center gap-4">
      <Button data-count={cartCount} onClick={()=>handleCartOpenChange(true)} className={`relative px-2 rounded-full before:content-[attr(data-count)] before:absolute before:-right-2 before:-top-2 before:bg-white before:outline-1 before:outline-black before:rounded-full before:font-body before:font-medium before:text-text-900 before:px-2 text-[12px]`}>
        <Image
          src={"/icons/shopping-cart.svg"}
          alt="shopping-cart"
          height={20}
          width={20}
          className="w-[26px] h-[26px]"
        />
      </Button>
      <LoginButton />
    </div>
  );
}

function LoginButton() {
  return (
    <Link
      className="flex items-center justify-center gap-1 bg-inverse rounded-2xl py-2 px-4 text-body"
      href={"/login"}
    >
      <Image
        src={"/icons/user.svg"}
        alt=""
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="text-text-100">Login</span>
    </Link>
  );
}

function NavbarMenuActions({handleCartOpenChange}:{handleCartOpenChange:(isCartOpen: boolean)=>void}) {
  const cartCount=useAppSelector(state=>state.cart).items.length;
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <LoginButton />
      <Button onClick={()=>handleCartOpenChange(true)} className="flex items-center justify-center border border-divider-400 gap-1 rounded-2xl">
        <Image
          src={"/icons/shopping-cart.svg"}
          alt="shopping-cart"
          height={20}
          width={20}
          className="w-[26px] h-[26px]"
        />
        Cart ({cartCount})
      </Button>
    </div>
  );
}

type HamburgerMenuProps = {
  isMenuOpen: boolean;
  onMenuToogle: () => void;
};

function HamburgerMenu({ isMenuOpen, onMenuToogle }: HamburgerMenuProps) {
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

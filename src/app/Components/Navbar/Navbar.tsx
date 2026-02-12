"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { Button } from "../Button";
import { CartDrawer } from "../CartDrawer";
import { Layout } from "../Layout";
import { Logo } from "../Logo";
import { SearchInput } from "./Components/SearchInput";
import { ProfileAvatar } from "./Components/ProfileAvatar";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const handleCartOpenChange = useCallback(function (isOpen: boolean) {
    setIsCartOpen(isOpen);
  }, []);
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
            <NavbarActions handleCartOpenChange={handleCartOpenChange} />
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
            <NavbarMenuActions handleCartOpenChange={handleCartOpenChange} />
          </Layout>
        </div>
        <CartDrawer
          isCartOpen={isCartOpen}
          handleCartOpenChange={handleCartOpenChange}
        />
      </nav>
    </>
  );
}

function NavbarActions({
  handleCartOpenChange,
}: {
  handleCartOpenChange: (isCartOpen: boolean) => void;
}) {
  const { isLoggedIn, avatarBg, name } = useAppSelector((state) => state.user);

  const loginStatus = !!(isLoggedIn && avatarBg && name);

  const cartCount = useAppSelector((state) => state.cart).items.length;
  return (
    <div className="hidden sm:flex items-center gap-8">
      <Button
        data-count={cartCount}
        onClick={() => handleCartOpenChange(true)}
        className={`relative px-2 rounded-full before:content-[attr(data-count)] before:absolute before:-right-2 before:-top-2 before:bg-white before:outline-1 before:outline-black before:rounded-full before:font-body before:font-medium before:text-text-900 before:px-2 text-[12px]`}
      >
        <Image
          src={"/icons/shopping-cart.svg"}
          alt="shopping-cart"
          height={26}
          width={26}
          className="w-[26px] h-[26px]"
        />
      </Button>
      {loginStatus ? (
        <ProfileAvatar avatarBg={avatarBg} initial={name[0]} />
      ) : (
        <LoginButton />
      )}
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

function NavbarMenuActions({
  handleCartOpenChange,
}: {
  handleCartOpenChange: (isCartOpen: boolean) => void;
}) {
  const { isLoggedIn, avatarBg, name } = useAppSelector((state) => state.user);

  const loginStatus = !!(isLoggedIn && avatarBg && name);

  const cartCount = useAppSelector((state) => state.cart).items.length;
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      {loginStatus ? (
        <ProfileAvatar avatarBg={avatarBg} initial={name[0]} />
      ) : (
        <LoginButton />
      )}
      <Button
        onClick={() => handleCartOpenChange(true)}
        className="flex items-center justify-center border border-divider-400 gap-1 rounded-2xl"
      >
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

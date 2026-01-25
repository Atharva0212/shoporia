"use client";

import Image from "next/image";
import { useRouter } from "next/router";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition inline-flex items-center justify-center gap-2"
    >
      <Image
        src={"/icons/arrow.svg"}
        alt=""
        height={20}
        width={20}
        className="rotate-180 w-5 h-5"
      />
      Go Back
    </button>
  );
}

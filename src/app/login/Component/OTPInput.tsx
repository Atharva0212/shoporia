import React, { useRef, useState } from "react";
import { Button } from "../../Components/Button";
import Image from "next/image";
import axios from "axios";
import { useToast } from "../../Components/Toast/Context/ToastContext";
import { RedirectApiResponse } from "../../api/auth/verify-otp/types";
import { useModal } from "../../Components/Modal/Context/ModalContext";
import { getErrorMessage } from "@/src/utils/getErrorMessage";

export function OTPInput({ length = 6 }: { length?: number }) {
  const [otpArray, setOtpArray] = useState<string[]>(
    new Array(length).fill("")
  );

  const inputRef = useRef<HTMLInputElement[]>([]);

  const { addToast } = useToast();
  const { setModal } = useModal();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const val = e.currentTarget.value.slice(-1);
    if (!val || !/^\d$/.test(val)) return;
    setOtpArray((prev) => {
      const newOtp = [...prev];
      newOtp[index] = val;
      if (index < length - 1) {
        newOtp[index + 1] = "";
      }
      return newOtp;
    });
    inputRef.current[index + 1]?.focus();
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (e.key === "Escape" || e.key === "Backspace") {
      //   e.preventDefault(); // prevent any default behavior
      setOtpArray((prev) => {
        const newOtp = [...prev];
        newOtp[index] = "";
        return newOtp;
      });
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft") {
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowRight") {
      if (index < length - 1) {
        inputRef.current[index + 1]?.focus();
      }
    }
  }

  function handlePaste(
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    const digits = pastedText.replace(/\D/g, "");
    if (!digits) return;
    setOtpArray((prev) => {
      const newOtp = [...prev];
      for (let i = 0; i < digits.length; i++) {
        const currentIndex = index + i;
        if (currentIndex < newOtp.length) {
          newOtp[currentIndex] = digits[i];
        }
      }
      return newOtp;
    });
    const nextFocusedIndex = Math.min(index + digits.length, length - 1);
    inputRef.current[nextFocusedIndex]?.focus();
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isAnyEmpty = otpArray.some((input) => !input);
    if (isAnyEmpty) {
      addToast("Please enter all 6 digits before continuing.", "warning");
      return;
    }
    try {
      const response = await axios.post<RedirectApiResponse>(
        "/api/auth/verify-otp",
        { otp: otpArray }
      );
      const { data } = response;
      if (data.success) {
        window.location.href = data.redirect;
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, "Failed to verify OTP. Please try again.");
      setModal(errorMessage, "error");
    }
  }

  return (
    <form onSubmit={handleOtpSubmit}>
      <div className="p-2 flex items-center gap-2 justify-center mt-2">
        {otpArray.map((value, index) => {
          return (
            <React.Fragment key={index}>
              <label
                htmlFor={`otp-input-${index + 1}`}
                className="sr-only"
              >{`otp-input-${index + 1}`}</label>
              <input
                key={index}
                id={`otp-input-${index + 1}`}
                value={value}
                ref={(el) => {
                  inputRef.current[index] = el!;
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                className="w-12 h-14 text-center border-2 border-divider-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                style={{
                  fontSize: "var(--font-size-h6)",
                  letterSpacing: "var(--letter-spacing-h6)",
                  fontFamily: "var(--font-body)",
                }}
              />
            </React.Fragment>
          );
        })}
      </div>
      <Button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-inverse my-2"
      >
        <Image
          src={"/icons/circle-check.svg"}
          alt=""
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="text-body text-white">Verify and Continue</span>
      </Button>
    </form>
  );
}

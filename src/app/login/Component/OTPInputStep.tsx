import { useState } from "react";
import { useLoginContext } from "../Context/LoginContext/LoginContext";
import { OTPInput } from "./OTPInput";
import axios from "axios";
import { MessageApiResponse } from "@/src/Types/response";
import { useToast } from "../../Components/Toast/Context/ToastContext";
import { getErrorMessage } from "@/src/utils/getErrorMessage";

export function OTPEntryStep() {
  return (
    <div className="mt-4">
      <p className="text-body text-center">Enter 6-Digit Code</p>
      <OTPInput />
      <OTPControls />
    </div>
  );
}

function OTPControls() {
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const { updateStatus } = useLoginContext();
  const { addToast } = useToast();

  async function handleResendOtp() {
    try {
      setIsResendDisabled(true);
      const response = await axios.get<MessageApiResponse>(
        "api/auth/re-send-otp"
      );
      const { data } = response;
      if (data.success) {
        addToast(data.message, "info");
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, "Failed to resend OTP. Please try again.");
      addToast(errorMessage, "error");
    } finally {
      setIsResendDisabled(false);
    }
  }

  return (
    <div className="text-center text-body space-y-3 mt-6">
      <p className="font-normal">
        Didn&apos;t receive the code?{" "}
        <button
          disabled={isResendDisabled}
          onClick={handleResendOtp}
          className="text-body font-medium hover:underline"
        >
          Resend OTP
        </button>
      </p>
      <button
        onClick={() => updateStatus("pending")}
        className="text-sm text-gray-600 hover:text-gray-900"
      >
        ← Back to email
      </button>
    </div>
  );
}

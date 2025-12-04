import { useLoginContext } from "../Context/LoginContext/LoginContext";
import { OTPInput } from "./OTPInput";

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
  const { updateStatus } = useLoginContext();
  return (
    <div className="text-center text-body space-y-3 mt-6">
      <p className="font-normal">
        Didn&apos;t receive the code?{" "}
        <button
          onClick={() => {
            // alert(`OTP resent to ${email}`);
          }}
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

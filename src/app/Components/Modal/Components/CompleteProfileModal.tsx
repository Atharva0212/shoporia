import { updateName } from "@/src/app/features/user/userSlice";
import { useAppDispatch } from "@/src/app/store/hooks";
import { MessageApiResponse } from "@/src/Types/response";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useToast } from "../../Toast/Context/ToastContext";
import { getErrorMessage } from "@/src/utils/getErrorMessage";

export function CompleteProfileModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const dispatch = useAppDispatch();
  const { addToast } = useToast();

  const handleProfileSave = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const normalizedName = name.trim();
      if (!normalizedName) {
        setError("Please enter your name");
        return;
      }
      const normalizedNameLength = normalizedName.length;
      if (normalizedNameLength < 2) {
        setError("Name must be at least 2 characters");
        return;
      }

      if (normalizedNameLength > 50) {
        setError("Name must be less than 50 characters");
        return;
      }

      setIsSavingProfile(true);
      setError("");
      try {
        const response = await axios.patch<MessageApiResponse>(
          "/api/auth/profile",
          { name },
        );
        const { data } = response;

        if (data.success) {
          dispatch(updateName({ name }));
          closeModal();
          console.log(closeModal());

          addToast(data.message, "success");
          return;
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error, "Failed to update profile");
        setError(errorMessage);
      } finally {
        setIsSavingProfile(false);
      }
    },
    [name, dispatch, closeModal, addToast],
  );
  return (
    <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slideUp border border-gray-200">
      {/* Header */}
      <div className="p-6 pb-4 text-center border-b border-divider-200">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-divider-100 rounded-full mb-4">
          <Image
            src={"/icons/user-lg.svg"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 text-gray-700"
          />
        </div>
        <h2 className="text-h4 font-bold text-text-900 mb-2">
          Complete Your Profile
        </h2>
        <p className="text-text-700">
          We need your name to personalize your experience
        </p>
      </div>

      <div className="p-6">
        <form onSubmit={(e) => handleProfileSave(e)} className="space-y-4">
          <div>
            <label className="block text-body font-medium text-text-900 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition ${
                error
                  ? "border-red-500 focus:ring-red-500 bg-red-50"
                  : "border-gray-300 focus:ring-gray-900 focus:border-transparent"
              }`}
              autoFocus
            />

            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-600 text-body-sm">
                <Image
                  src={"/fonts/circle-alert.svg"}
                  alt=""
                  width={24}
                  height={24}
                  className="w-4 h-4 shrink-0"
                />
                <span>{error}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSavingProfile}
            className="w-full bg-inverse text-body text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSavingProfile ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>

      <div className="px-6 pb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-body-sm text-blue-900">
            <span className="font-semibold">Note:</span> You can update your
            name anytime in profile settings
          </p>
        </div>
      </div>
    </div>
  );
}

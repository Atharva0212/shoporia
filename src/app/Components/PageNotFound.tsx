import Image from "next/image";
import Link from "next/link";
import { BackButton } from "./BackButton";

export function PageNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Oops! The page you&apos;re looking for doesn&apos;t exist. It might
            have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition inline-flex items-center justify-center gap-2"
            >
              <Image src={"/icons/house.svg"} alt="" width={20} height={20} className="w-5 h-5" />
              Back to Home
            </Link>
            <BackButton/>
          </div>
        </div>
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "./Components/Modal/Context/ModalProvider";
import { ToastProvider } from "./Components/Toast/Context/ToastProvider";

export const metadata: Metadata = {
  title: "Discover Premium Products Across Fashion, Tech & Lifestyle",
  description:
    "Shop top brands and trending categories at Shoporia. Explore premium electronics, fashion, home essentials, and more – all in one modern and elegant online store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-body`}>
        <ToastProvider>
          <ModalProvider>{children}</ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

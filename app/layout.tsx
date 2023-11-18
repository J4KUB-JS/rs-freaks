"use client";
import { Navigation } from "@/components/Navigation";
import "./globals.css";
import { Footer } from "@/components/Footer";

import { AuthContextProvider } from "./context/AuthContext";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/svg+xml" href="../public/logo.svg" />
        <title>RS Freaks</title>
      </Head>
      <body className=" bg-gray-50 font-Lato text-gray-900" data-theme="light">
        <AuthContextProvider>
          <Navigation />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}

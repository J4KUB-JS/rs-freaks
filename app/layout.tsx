"use client";
import { Navigation } from "@/components/Navigation";
import "./globals.css";
import { Footer } from "@/components/Footer";

import { AuthContextProvider } from "./context/AuthContext";
import Head from "next/head";
import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "RS Freaks",
//   description:
//     "Explore the world of automotive passion with our car enthusiasts club. Discover upcoming events, read insightful blog posts, and connect with fellow car lovers. Join us for thrilling rallies, engaging discussions, and a shared love for all things automotive.",
//   keywords:
//     "car enthusiasts, automotive club, car events, motoring community, rally meetings, car blog, automotive passion, car meetups, motoring events, auto enthusiasts",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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

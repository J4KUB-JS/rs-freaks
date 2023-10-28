import { Navigation } from "@/components/Navigation/Navigation";
import "./globals.css";
import { Footer } from "@/components/Footer/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className=" bg-gray-50 font-Lato text-gray-900" data-theme="light">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}

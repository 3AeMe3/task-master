import { Inter, Sora } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import ScrollToTop from "@/features/landingPage/components/scroll-to-top";

export const metadata: Metadata = {
  title: "TaskMaster",
  description: "Project to put on practice my next.js knowledge",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`  bg-black  ${inter.variable} ${sora.variable}`}>
        <ScrollToTop />
        <div className="bg-main">
          <span></span>
        </div>

        <div className="text-white">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}

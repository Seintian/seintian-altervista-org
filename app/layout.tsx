import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Professional Portfolio",
  description: "Curriculum Vitae and Projects",
};

import { SiteProvider } from "@/context/SiteContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased`}>
        <SiteProvider>
          {children}
        </SiteProvider>
      </body>
    </html>
  );
}

import Providers from "@/components/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Breadcrumbs from "@/components/breadcrumbs";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPPS",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <Navbar />
          <Breadcrumbs />
          <div className="w-full">
            <div className="mx-auto max-w-7xl">{children}</div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

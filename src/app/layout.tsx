import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Breadcrumbs from "@/components/breadcrumbs";
import Providers from "@/components/providers";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPPS",
  description:
    "Custom production proposal system for direct communication between customers and production",
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
          <div className="container">
            <Breadcrumbs />
            <div className="mt-8">{children}</div>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}

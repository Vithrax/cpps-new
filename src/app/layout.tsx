import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Breadcrumbs from "@/components/breadcrumbs";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";

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
      <body className={cn(font.className, "max-h-screen")}>
        <Providers>
          <Navbar />
          <div className="sm:container px-1 pt-16 h-screen">
            <Breadcrumbs />
            <section className="mt-8">{children}</section>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/navbar";
import Breadcrumbs from "@/components/breadcrumbs";
import Providers from "@/components/providers";
import type { Metadata } from "next";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CPPS | Home",
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
            <main className="mt-8">{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

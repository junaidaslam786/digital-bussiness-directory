import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KoreaBiz Directory - South Korea Business Directory",
  description: "Discover and connect with the best businesses across South Korea. Search by category, city, or browse featured enterprises.",
  keywords: ["South Korea", "business", "directory", "enterprises", "companies", "services"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

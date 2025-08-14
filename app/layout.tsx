import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header"; // 1. Import the Header

export const metadata: Metadata = {
  title: "AI Trip Planner",
  description: "Your personal AI trip planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header /> {/* 2. Place the Header here, above the page content */}
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
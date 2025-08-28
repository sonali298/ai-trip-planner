// File: app/layout.tsx

import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Provider from "./provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "AI Trip Planner",
  description: "Your personal AI trip planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <ClerkProvider>
          <ConvexClientProvider>
            <Provider>
              <Header />
              {children}
            </Provider>
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
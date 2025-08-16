import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/Header";
import { ConvexClientProvider } from "./ConvexClientProvider";
import Provider from "./provider"; // Import your custom provider

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
    <ClerkProvider>
      <ConvexClientProvider>
        <html lang="en">
          <body className={outfit.className}>
            {/* Your custom provider now wraps the UI */}
            <Provider>
              <Header />
              {children}
            </Provider>
          </body>
        </html>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
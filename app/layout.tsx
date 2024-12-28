import type { Metadata } from "next";
import "./globals.css";
import AppWithProviders from "./app";

export const metadata: Metadata = {
  title: "Liquid",
  description: "Liquid web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-Aeonik xl:rounded-[32px] xl:m-4 xl:border xl:border-primary-150 pt-6">
        <AppWithProviders>{children}</AppWithProviders>
      </body>
    </html>
  );
}

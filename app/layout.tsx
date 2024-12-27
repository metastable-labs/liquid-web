import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`font-Aeonik`}>{children}</body>
    </html>
  );
}

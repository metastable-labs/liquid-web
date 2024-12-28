import type { Metadata } from "next";
import "./globals.css";
import { LWNavigation } from "@/components";

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
        <div className="flex xl:gap-20 2xl:gap-28 2xl:justify-between">
          <div className="hidden xl:block">
            <LWNavigation />
          </div>

          <div className="xl:w-[80%] w-full pb-24">{children}</div>
        </div>

        <div className="xl:hidden fixed left-0 bottom-0 w-full">
          <LWNavigation />
        </div>
      </body>
    </html>
  );
}

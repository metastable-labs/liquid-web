import type { Metadata } from "next";
import "./globals.css";
import App from "./app";
import Providers from "@/providers";

export const metadata: Metadata = {
  title: "Liquid",
  description: "Liquid web",
  keywords: [
    "liquid",
    "pools",
    "crypto agent",
    "defi",
    "defi agent",
    "pool strategy",
    "pool strategies",
    "crypto",
    "crypto pools",
    "crypto pool",
  ],
  applicationName: "Liquid",
  openGraph: {
    title: "Liquid",
    description: "Liquid web",
    url: "https://beta.useliquid.xyz",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/djzeufu4j/image/upload/v1736164264/liquid_preview_knkf6b.jpg",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "defiwrapped.xyz",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://beta.useliquid.xyz",
    title: "Liquid",
    description: "Liquid web",
    images: [
      {
        url: "https://res.cloudinary.com/djzeufu4j/image/upload/v1736164264/liquid_preview_knkf6b.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="fc:frame"
          content='{
            "version": "next",
            "imageUrl": "https://beta.useliquid.xyz/liquid_preview.jpg",
            "button":{
              "title": "Check this out",
              "action": {
                "type": "launch_frame",
                "name": "Liquid",
                "url": "https://beta.useliquid.xyz",
                "splashImageUrl": "https://beta.useliquid.xyz/liquid-logo.png",
                "splashBackgroundColor": "#f7f7f7"
              }
            }
          }'
        />
      </head>
      <body className="font-Aeonik xl:rounded-[32px] xl:m-4 xl:border xl:border-primary-150 no-scrollbar">
        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}

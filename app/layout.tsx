import type { Metadata } from "next";
import "./globals.css";
import App from "./app";
import Providers from "@/providers";
import Script from "next/script";

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
    description: "The First Collaborative Finance Curation Platform",
    url: "https://beta.useliquid.xyz",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/djzeufu4j/image/upload/v1736164264/liquid_preview_knkf6b.jpg",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "beta.useliquid.xyz",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://beta.useliquid.xyz",
    title: "Liquid",
    description: "The First Collaborative Finance Curation Platform",
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
      <body className="font-Aeonik lg:rounded-[32px] lg:m-4 lg:border lg:border-primary-150 no-scrollbar">
        {/** Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1SHGD261ZW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-1SHGD261ZW');
        `}
        </Script>

        <Providers>
          <App>{children}</App>
        </Providers>
      </body>
    </html>
  );
}

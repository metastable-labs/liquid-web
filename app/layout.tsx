import type { Metadata } from "next";
import "./globals.css";
import App from "./app";
import Providers from "@/providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Liquid",
  description: "Liquid web",
  keywords: [
    "ai",
    "ai agents",    
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
    title: "Launch an onchain AI agent in seconds",
    description: "Liquid makes crypto simple. an AI agent that takes onchain actions for you.",
    url: "https://app.useliquid.xyz",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/njokuscript/image/upload/v1740572700/Section_preview_2_u2yliq.png",
        width: 1200,
        height: 630,
      },
    ],
    siteName: "app.useliquid.xyz",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://app.useliquid.xyz",
    title: "Launch an onchain AI agent in seconds",
    description: "Liquid makes crypto simple. an AI agent that takes onchain actions for you.",
    images: [
      {
        url: "https://res.cloudinary.com/njokuscript/image/upload/v1740572700/Section_preview_2_u2yliq.png",
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
            "imageUrl": "https://app.useliquid.xyz/liquid_preview.jpg",
            "button":{
              "title": "Check this out",
              "action": {
                "type": "launch_frame",
                "name": "Liquid",
                "url": "https://app.useliquid.xyz",
                "splashImageUrl": "https://app.useliquid.xyz/liquid-logo.png",
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

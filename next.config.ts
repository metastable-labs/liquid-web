import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  
 img-src 'self' blob:
    https://assets.smold.app 
    https://res.cloudinary.com
    https://i.imgur.com 
    https://imagedelivery.net
    https://liquid-user-assets.s3.eu-west-2.amazonaws.com
    https://explorer-api.walletconnect.com
    https://apple.com/apple-pay
    https://google.com/pay
    https://auth.privy.io/api/v1/analytics_events;
  
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com;
  
  child-src https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://www.geckoterminal.com https://dexscreener.com;
  
  frame-src https://auth.privy.io https://verify.walletconnect.com https://verify.walletconnect.org https://challenges.cloudflare.com https://www.geckoterminal.com https://dexscreener.com;
  
  connect-src 'self' 
    https://auth.privy.io 
    wss://relay.walletconnect.com 
    wss://relay.walletconnect.org 
    wss://www.walletlink.org 
    https://*.rpc.privy.systems 
    https://dev.useliquid.xyz 
    https://www.google-analytics.com 
    https://pulse.walletconnect.org 
    https://explorer-api.walletconnect.com 
    https://*.walletconnect.com
    https://region1.google-analytics.com
    https://www.geckoterminal.com
    https://www.googletagmanager.com/gtag/js
    https://apple.com/apple-pay
    https://google.com/pay
    https://auth.privy.io/api/v1/analytics_events
    wss://dev.useliquid.xyz/aqua
    https://dexscreener.com;
  
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com;
  
  font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
  
  report-uri /api/csp-violation-report-endpoint;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.smold.app",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "imagedelivery.net",
      },
      {
        protocol: "https",
        hostname: "liquid-user-assets.s3.eu-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
    ],
  },
  headers: async () => {
    return [
      {
        // This pattern applies to all routes in your application.
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

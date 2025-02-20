import { PropsWithChildren } from "react";
import { http } from "wagmi";
import { base } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

export const privyConfig: PrivyClientConfig = {
  loginMethods: ["farcaster", "twitter"],
  embeddedWallets: {
    createOnLogin: "all-users",
  },
  fundingMethodConfig: {
    moonpay: {
      paymentMethod: "credit_debit_card", // Purchase with credit or debit card
      uiConfig: { accentColor: "#4691FE", theme: "light" }, // Styling preferences for MoonPay's UIs
    },
  },
};

const queryClient = new QueryClient();

const PrivyWalletProvider = ({ children }: PropsWithChildren) => {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    throw new Error("NEXT_PUBLIC_PRIVY_APP_ID not found");
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={privyConfig}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
};

export default PrivyWalletProvider;

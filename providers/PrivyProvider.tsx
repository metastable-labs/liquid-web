import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { base } from "viem/chains";
import { http } from "wagmi";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import { PropsWithChildren } from "react";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
});

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
    requireUserPasswordOnCreate: true,
    showWalletUIs: true,
  },
  loginMethods: ["wallet"],
  appearance: {
    showWalletLoginFirst: true,
    walletList: [
      "metamask",
      "coinbase_wallet",
      "rainbow",
      "wallet_connect",
      "detected_ethereum_wallets",
      "safe",
      "uniswap",
    ],
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

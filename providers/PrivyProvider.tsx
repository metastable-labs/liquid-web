import { PropsWithChildren } from "react";
import { http } from "wagmi";
import { base } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, WagmiProvider } from "@privy-io/wagmi";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: true,
});

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  // connectors: [frameConnector()]  // If we want to connect to user's farcaster wallet
});

export const privyConfig: PrivyClientConfig = {
  loginMethods: ["wallet"],
  appearance: {
    showWalletLoginFirst: true,
    walletList: [
      "metamask",
      "rainbow",
      "uniswap",
      "detected_solana_wallets",
      "detected_ethereum_wallets",
      "wallet_connect",
    ],
    logo: "https://res.cloudinary.com/djzeufu4j/image/upload/v1734991182/liquid_logo_ico.ico",
    landingHeader: "Connect wallet to Liquid",
    walletChainType: "ethereum-and-solana",
  },
  externalWallets: {
    solana: {
      connectors: solanaConnectors,
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

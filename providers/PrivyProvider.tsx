import { PropsWithChildren } from "react";
import { PrivyClientConfig, PrivyProvider } from "@privy-io/react-auth";

export const privyConfig: PrivyClientConfig = {
  loginMethods: ["farcaster"],
  embeddedWallets: {
    ethereum: {
      createOnLogin: "all-users",
    },
    solana: {
      createOnLogin: "all-users",
    },
  },
};

const PrivyWalletProvider = ({ children }: PropsWithChildren) => {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    throw new Error("NEXT_PUBLIC_PRIVY_APP_ID not found");
  }

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID}
      config={privyConfig}
    >
      {children}
    </PrivyProvider>
  );
};

export default PrivyWalletProvider;

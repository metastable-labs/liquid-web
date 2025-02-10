import { useEffect } from "react";
import { useAccount } from "wagmi";
import { switchChain } from "@wagmi/core";

import { usePrivy, useWallets } from "@privy-io/react-auth";
import { wagmiConfig } from "@/providers/PrivyProvider";

const useSwitchNetworkConnect = () => {
  const { connector, chainId } = useAccount();
  const { ready, authenticated } = usePrivy();
  const { wallets: evmWallets } = useWallets();

  const wallet = evmWallets[0];

  const listener = () => {
    if (wallet && authenticated && ready) {
      const isAcceptedChain = wagmiConfig.chains.find(
        (chain) => chain.id === chainId
      );

      if (!isAcceptedChain) {
        return switchChain(wagmiConfig, { chainId: wagmiConfig.chains[0].id });
      }
    }
  };

  useEffect(() => {
    listener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, authenticated, evmWallets]);

  return {
    connector,
  };
};

export default useSwitchNetworkConnect;

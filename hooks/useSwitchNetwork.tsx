import { useEffect } from "react";
import { useAccount } from "wagmi";
import { switchChain } from "@wagmi/core";

import { usePrivy } from "@privy-io/react-auth";
import { wagmiConfig } from "@/providers/PrivyProvider";

const useSwitchNetworkConnect = () => {
  const { connector, chainId } = useAccount();
  const { ready, authenticated } = usePrivy();

  const listener = () => {
    if (chainId && authenticated && ready) {
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
  }, [chainId, authenticated]);

  return {
    connector,
  };
};

export default useSwitchNetworkConnect;

import { useSolanaFundingPlugin } from "@privy-io/react-auth/solana";
import { useFundWallet as useSolanaFundWallet } from "@privy-io/react-auth/solana";
import { useFundWallet as useEVMFundWallet } from "@privy-io/react-auth";
import { base } from "viem/chains";

const useFunding = () => {
  useSolanaFundingPlugin();
  const { fundWallet: fundEVMWallet } = useEVMFundWallet();
  const { fundWallet: fundSolanaWallet } = useSolanaFundWallet();

  const fundWallet = (address: string, network: "evm" | "solana") => {
    if (network === "solana") {
      return fundSolanaWallet(address);
    }

    return fundEVMWallet(address, {
      chain: base,
    });
  };

  return {
    fundWallet,
  };
};

export default useFunding;

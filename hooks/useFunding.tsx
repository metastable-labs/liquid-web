import { useSolanaFundingPlugin } from "@privy-io/react-auth/solana";
import { useFundWallet as useSolanaFundWallet } from "@privy-io/react-auth/solana";
import { useFundWallet as useEVMFundWallet } from "@privy-io/react-auth";

const useFunding = () => {
  useSolanaFundingPlugin();
  const { fundWallet: fundEVMWallet } = useEVMFundWallet();
  const { fundWallet: fundSolanaWallet } = useSolanaFundWallet();

  const fundWallet = (address: string, network: "evm" | "solana") => {
    if (network === "evm") {
      return fundEVMWallet(address);
    }

    return fundSolanaWallet(address);
  };

  return {
    fundWallet,
  };
};

export default useFunding;

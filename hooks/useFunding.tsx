import { useSolanaFundingPlugin } from "@privy-io/react-auth/solana";
import { useFundWallet as useSolanaFundWallet } from "@privy-io/react-auth/solana";
import { useFundWallet as useEVMFundWallet } from "@privy-io/react-auth";
import { base } from "viem/chains";
import useAppActions from "@/store/app/actions";
import useSystemFunctions from "./useSystemFunctions";
import { formatEther } from "viem";
import useWalletActions from "@/store/wallet/actions";

const useFunding = () => {
  useSolanaFundingPlugin();
  const { showToast } = useAppActions();
  const { fetchWallet } = useWalletActions();
  const { walletState } = useSystemFunctions();
  const { fundWallet: fundEVMWallet } = useEVMFundWallet({
    onUserExited({ balance }) {
      const privyBalance = formatEther(balance!);
      const serverBalance = walletState.assets?.find(
        (asset) => asset.symbol === "ETH"
      )?.uiAmount;

      if (serverBalance === undefined) return;

      if (Number(privyBalance) > serverBalance) {
        showToast(
          "Deposit successful! It might take a few seconds to reflect on your balance.",
          "success"
        );
        fetchWallet();
      }
    },
  });
  const { fundWallet: fundSolanaWallet } = useSolanaFundWallet({
    onUserExited({ balance }) {
      const privyBalance = balance;
      const serverBalance = walletState.assets?.find(
        (asset) => asset.symbol === "SOL"
      )?.uiAmount;

      if (serverBalance === undefined) return;

      if (Number(privyBalance) > serverBalance) {
        showToast(
          "Deposit successful! It might take a few seconds to reflect on your balance.",
          "success"
        );
        fetchWallet();
      }
    },
  });

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

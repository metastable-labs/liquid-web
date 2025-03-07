import useSystemFunctions from "@/hooks/useSystemFunctions";
import api from "./api";

import { setAssets, setLoadingAssets } from ".";

const useWalletActions = () => {
  const { dispatch } = useSystemFunctions();

  const fetchWallet = async () => {
    try {
      dispatch(setLoadingAssets(true));
      const response = await api.fetchAssets();

      const processedResponse = response
        .sort((a, b) => b.name.localeCompare(a.name))
        .map((asset) => ({
          ...asset,
          chainId: asset.chainId.toLowerCase() as "base" | "solana",
        }));

      const ethIndex = processedResponse.findIndex(
        (asset) => asset.symbol === "ETH"
      );
      if (ethIndex !== -1) {
        const [ethAsset] = processedResponse.splice(ethIndex, 1);
        processedResponse.unshift(ethAsset);
      }

      dispatch(setAssets(processedResponse));
    } catch (error: any) {
      //
    } finally {
      dispatch(setLoadingAssets(false));
    }
  };

  return {
    fetchWallet,
  };
};

export default useWalletActions;

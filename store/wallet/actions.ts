import useSystemFunctions from "@/hooks/useSystemFunctions";
import api from "./api";

import { setAssets, setLoadingAssets } from ".";

const useWalletActions = () => {
  const { dispatch } = useSystemFunctions();

  const fetchWallet = async () => {
    try {
      dispatch(setLoadingAssets(true));
      const response = await api.fetchAssets();

      dispatch(setAssets(response));
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

import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import useLinkedAccounts from "./useLinkedAccounts";
import useSystemFunctions from "./useSystemFunctions";

export const usePermissionStatus = (
  delegationDetails?: AgentDelegationDetails[]
) => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const { user, ready } = usePrivy();
  const { evmWallet, solanaWallet } = useLinkedAccounts();
  const { appState } = useSystemFunctions();

  useEffect(() => {
    const permissionGranted =
      user && ready
        ? evmWallet?.delegated &&
          (appState.isSolanaSupported ? solanaWallet?.delegated : true) &&
          (delegationDetails ? delegationDetails[0]?.isActive : false)
        : false;

    setIsPermissionGranted(permissionGranted);
  }, [
    user,
    ready,
    delegationDetails,
    evmWallet,
    solanaWallet,
    appState.isSolanaSupported,
  ]);

  return isPermissionGranted;
};

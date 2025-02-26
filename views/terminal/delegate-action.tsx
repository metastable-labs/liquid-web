import { usePrivy, useDelegatedActions } from "@privy-io/react-auth";
import { LWButton } from "@/components";
import useAppActions from "@/store/app/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAgentActions from "@/store/agent/actions";

function DelegateActionButton() {
  const { user, login } = usePrivy();
  const { delegateOrUndelegate } = useAgentActions();
  const { revokeWallets } = useDelegatedActions();
  const { showGrantPermission, showSelectNetworkModal } = useAppActions();
  const { agentState } = useSystemFunctions();

  const isAlreadyDelegatedToThisAgent = agentState.delegationDetails?.isActive;

  const onRevoke = () => {
    const agentId = agentState.agent?.id || "";

    showGrantPermission(false);
    revokeWallets().then(() => {
      delegateOrUndelegate(agentId, false);
    });
  };

  const onClick = () => {
    if (user == null) {
      return login();
    }

    const solanaWallet: any = user?.linkedAccounts.find(
      (account) =>
        account.type === "wallet" &&
        account.chainType === "solana" &&
        account.walletClientType === "privy"
    );

    const evmWallet: any = user?.linkedAccounts.find(
      (account) =>
        account.type === "wallet" &&
        account.chainType === "ethereum" &&
        account.walletClientType === "privy"
    );

    if (
      solanaWallet?.delegated &&
      evmWallet?.delegated &&
      isAlreadyDelegatedToThisAgent
    ) {
      return onRevoke();
    }

    showGrantPermission(false);
    return showSelectNetworkModal(true);
  };

  const btnText = user == null ? "Connect Wallet" : "Continue";

  return <LWButton title={btnText} onClick={onClick} />;
}

export default DelegateActionButton;

import { usePrivy, useDelegatedActions } from "@privy-io/react-auth";
import { LWButton } from "@/components";
import useAppActions from "@/store/app/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAgentActions from "@/store/agent/actions";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";

function DelegateActionButton() {
  const { user, login } = usePrivy();
  const { delegateOrUndelegate } = useAgentActions();
  const { revokeWallets } = useDelegatedActions();
  const { showGrantPermission, showSelectNetworkModal } = useAppActions();
  const { agentState, appState } = useSystemFunctions();
  const { solanaWallet, evmWallet } = useLinkedAccounts();

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

    if (
      (appState.isSolanaSupported ? solanaWallet?.delegated : true) &&
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

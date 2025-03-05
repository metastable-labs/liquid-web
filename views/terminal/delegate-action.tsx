import { usePrivy, useDelegatedActions, useLogin } from "@privy-io/react-auth";
import { LWButton } from "@/components";
import useAppActions from "@/store/app/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAgentActions from "@/store/agent/actions";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";

function DelegateActionButton() {
  const { showGrantPermission, showSelectNetworkModal } = useAppActions();
  const { user } = usePrivy();
  const { login } = useLogin({
    onComplete: () => {
      showGrantPermission(false);
    },
  });
  const { delegateOrUndelegate } = useAgentActions();
  const { revokeWallets } = useDelegatedActions();
  const { agentState, appState } = useSystemFunctions();
  const { solanaWallet, evmWallet } = useLinkedAccounts();
  const { delegateWallet } = useDelegatedActions();

  const isAlreadyDelegatedToThisAgent =
    agentState.delegationDetails?.[0]?.isActive;

  const onDelegateEvmWallet = () => {
    if (evmWallet?.delegated && !isAlreadyDelegatedToThisAgent) {
      const agentId = agentState.agent?.id || "";
      return delegateOrUndelegate(agentId, true, "BASE");
    }

    const agentId = agentState.agent?.id || "";

    delegateWallet({
      address: evmWallet?.address,
      chainType: "ethereum",
    }).then(() => {
      delegateOrUndelegate(agentId, true, "BASE");
      showSelectNetworkModal(false);
    });
  };

  const onRevoke = () => {
    const agentId = agentState.agent?.id || "";

    showGrantPermission(false);
    // revokeWallets().then(() => {
    //   delegateOrUndelegate(agentId, false, "BASE");
    //   delegateOrUndelegate(agentId, false, "SOLANA");
    // });
    delegateOrUndelegate(agentId, false, "BASE");
    delegateOrUndelegate(agentId, false, "SOLANA");
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
    // return showSelectNetworkModal(true);
    return onDelegateEvmWallet();
  };

  const btnText = user == null ? "Connect Wallet" : "Continue";

  return <LWButton title={btnText} onClick={onClick} />;
}

export default DelegateActionButton;

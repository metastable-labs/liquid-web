import { usePrivy, useDelegatedActions } from "@privy-io/react-auth";
import { LWButton } from "@/components";
import useAppActions from "@/store/app/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAgentActions from "@/store/agent/actions";

function DelegateActionButton() {
  const { user, login } = usePrivy();
  const { delegateOrUndelegate } = useAgentActions();
  const { delegateWallet, revokeWallets } = useDelegatedActions();
  const { showGrantPermission } = useAppActions();
  const { agentState } = useSystemFunctions();

  const isAlreadyDelegatedToThisAgent = agentState.delegationDetails?.isActive;
  const isAlreadyDelegatedWallet = !!user?.linkedAccounts.find(
    (account) =>
      account.type === "wallet" &&
      account.delegated &&
      account.walletClientType === "privy"
  );

  const onDelegate = async () => {
    if (!user) return;

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

    const agentId = agentState.agent?.id || "";

    showGrantPermission(false);

    await delegateWallet({
      address: solanaWallet?.address,
      chainType: "solana",
    });
    await delegateWallet({
      address: evmWallet?.address,
      chainType: "ethereum",
    }).then(() => {
      delegateOrUndelegate(agentId, true);
    });
  };

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

    if (!isAlreadyDelegatedWallet) {
      return onDelegate();
    }

    if (isAlreadyDelegatedWallet && !isAlreadyDelegatedToThisAgent) {
      const agentId = agentState.agent?.id || "";
      return delegateOrUndelegate(agentId, true);
    }

    if (isAlreadyDelegatedWallet && isAlreadyDelegatedToThisAgent) {
      return onRevoke();
    }
  };

  const btnText = user == null ? "Connect Wallet" : "Continue";

  return <LWButton title={btnText} onClick={onClick} />;
}

export default DelegateActionButton;

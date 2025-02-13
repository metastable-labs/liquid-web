import { usePrivy, useDelegatedActions } from "@privy-io/react-auth";
import { LWButton } from "@/components";
import useAppActions from "@/store/app/actions";

function DelegateActionButton() {
  const { user, login } = usePrivy();
  const { delegateWallet, revokeWallets } = useDelegatedActions();
  const { showGrantPermission } = useAppActions();

  const isAlreadyDelegated = !!user?.linkedAccounts.find(
    (account) =>
      account.type === "wallet" &&
      account.delegated &&
      account.walletClientType === "privy"
  );

  const onDelegate = () => {
    if (!user) return;

    const chainType = user.wallet?.chainType;
    const address = user.wallet?.address;

    showGrantPermission(false);
    if (chainType === "solana") {
      delegateWallet({
        address: address!,
        chainType: "solana",
      });
    } else {
      delegateWallet({
        address: address!,
        chainType: "ethereum",
      });
    }
  };

  const onRevoke = () => {
    showGrantPermission(false);
    revokeWallets();
  };

  const onClick = () => {
    if (user == null) {
      return login();
    }

    if (isAlreadyDelegated) {
      return onRevoke();
    }

    onDelegate();
  };

  const btnText = user == null ? "Connect Wallet" : "Continue";

  return <LWButton title={btnText} onClick={onClick} />;
}

export default DelegateActionButton;

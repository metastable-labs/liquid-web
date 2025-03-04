import { LWButton } from "@/components";
import DelegateActionButton from "./delegate-action";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";

const permissionInfo = [
  "Make sure your wallet has enought ETH for unrestricted agent trades.",
  "Agents can use a % of the delegated balance per trade, based on their goals.",
];

const revokeInfo = [
  "You can revoke the agent's permissions anytime.",
  "This will prevent the agent from making any more trades on your behalf.",
];

const AccessDenied = () => {
  const { appState } = useSystemFunctions();
  const { solanaWallet, evmWallet } = useLinkedAccounts();
  const { showAccessDeniedModal } = useAppActions();

  const permissionGranted =
    evmWallet?.delegated &&
    (appState.isSolanaSupported ? solanaWallet?.delegated : true);

  const info = permissionGranted ? revokeInfo : permissionInfo;

  return (
    <div className="px-6 pt-1 pb-6 flex flex-col gap-6">
      {/* <p className="self-stretch text-[16px] leading-[19.84px] text-primary-50">
        We&apos;ll be rolling out to more users soon. Follow us on{" "}
        <a
          href="https://x.com/getliquidapp"
          target="_blank"
          className="underline underline-offset-2"
        >
          X
        </a>{" "}
        and Join our{" "}
        <a
          href="https://discord.gg/fDwU7XUx"
          target="_blank"
          className="underline underline-offset-2"
        >
          Discord
        </a>
        /
        <a
          href="https://warpcast.com/~/channel/liquidapp"
          target="_blank"
          className="underline underline-offset-2"
        >
          Warpcast
        </a>{" "}
        channel to stay updated.
      </p> */}
      <p className="self-stretch text-[16px] leading-[19.84px] text-primary-50">
        Follow our Warpcast channel and check back
      </p>
      <LWButton
        title="Got it"
        onClick={() => showAccessDeniedModal(false)}
        className="mx-5"
      />
    </div>
  );
};

export default AccessDenied;

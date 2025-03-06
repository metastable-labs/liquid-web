import DelegateActionButton from "./delegate-action";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { LinearInfoIcon } from "@/public/icons";
import useAppActions from "@/store/app/actions";
import classNames from "classnames";
import Link from "next/link";

const permissionInfo = [
  "Make sure your wallet has enought ETH for unrestricted agent trades.",
  "Agents can use a % of the delegated balance per trade, based on their goals.",
];

const revokeInfo = [
  "You can revoke the agent's permissions anytime.",
  "This will prevent the agent from making any more trades on your behalf.",
];

const FundWalletPrompt = () => {
  const { showGrantPermission } = useAppActions();
  const { walletState } = useSystemFunctions();

  const balance =
    walletState.assets?.find((asset) => asset.symbol.toLowerCase() === "eth")
      ?.balance || 0;

  return (
    <div
      className={classNames(
        "p-[14px] rounded-xl flex items-center xl:items-start gap-2 bg-primary-3150",
        {
          hidden: Number(balance) > 0,
        }
      )}
    >
      <div className="w-[18px]">
        <LinearInfoIcon />
      </div>

      <div className="text-sm leading-[20px] lg:text-base text-primary-1350 xl:-mt-1">
        Your balance is low.{" "}
        <span className="font-bold underline">
          <Link onClick={() => showGrantPermission(false)} href="/wallet">
            Fund your wallet
          </Link>
        </span>{" "}
        to enjoy unrestricted trades.
      </div>
    </div>
  );
};

const Permission = () => {
  const { appState } = useSystemFunctions();
  const { solanaWallet, evmWallet } = useLinkedAccounts();

  const permissionGranted =
    evmWallet?.delegated &&
    (appState.isSolanaSupported ? solanaWallet?.delegated : true);

  const info = permissionGranted ? revokeInfo : permissionInfo;

  return (
    <div className="px-6 pt-1 pb-6 flex flex-col gap-6">
      <FundWalletPrompt />

      <ul className="flex flex-col gap-5 text-[16px] leading-[19.84px] text-primary-50 list-disc">
        {info.map((info, index) => (
          <li key={index} className="ml-4">
            {info}
          </li>
        ))}
      </ul>

      <p className="self-stretch px-3.5 pt-3.5 pb-4 bg-primary-1400 rounded-xl text-[16px] leading-[19.84px] text-primary-2150">
        Note that Liquid or the AI Agents will not have access to your{" "}
        <span className="font-bold">private keys</span> and you can always
        revoke access anytime on the app.
      </p>

      <DelegateActionButton />
    </div>
  );
};

export default Permission;

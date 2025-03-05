import DelegateActionButton from "./delegate-action";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const permissionInfo = [
  "Make sure your wallet has enought ETH for unrestricted agent trades.",
  "Agents can use a % of the delegated balance per trade, based on their goals.",
];

const revokeInfo = [
  "You can revoke the agent's permissions anytime.",
  "This will prevent the agent from making any more trades on your behalf.",
];

const Permission = () => {
  const { appState } = useSystemFunctions();
  const { solanaWallet, evmWallet } = useLinkedAccounts();

  const permissionGranted =
    evmWallet?.delegated &&
    (appState.isSolanaSupported ? solanaWallet?.delegated : true);

  const info = permissionGranted ? revokeInfo : permissionInfo;

  return (
    <div className="px-6 pt-1 pb-6 flex flex-col gap-6">
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

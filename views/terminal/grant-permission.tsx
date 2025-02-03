import { LWButton } from "@/components";

const GrantPermission = ({ onClick }: { onClick: () => void }) => {
  const info = [
    "It's advisable to use a fresh wallet with ETH or SOL to set the max spend for unrestricted agent trades.",
    "Agents can use a % of the delegated balance per trade, based on their goals.",
  ];

  return (
    <div className="px-6 pt-1 pb-6 flex flex-col gap-6">
      <ul className="flex flex-col gap-9 text-[16px] leading-[19.84px] text-primary-50 list-disc">
        {info.map((info, index) => (
          <li key={index} className="ml-4">
            {info}
          </li>
        ))}
      </ul>

      <p className="self-stretch px-3.5 pt-3.5 pb-4 bg-primary-1400 rounded-xl text-[16px] leading-[19.84px] text-primary-2150">
        Note that neither Privy nor Liquid will ever have access to your{" "}
        <span className="font-bold">private keys</span> and you can always
        revoke access anytime on the app.
      </p>

      <LWButton title="Continue" onClick={onClick} />
    </div>
  );
};

export default GrantPermission;

const permissionsInfo = [
  <p key={0}>
    You grant permissions to{" "}
    <span className="font-bold">allow the agent to trade on your behalf</span>{" "}
    without handing over your private keys.
  </p>,
  <p key={1}>
    Just click <span className="font-bold">{"Grant Permissions"}</span> on the
    agent&apos;s page and
    <span className="font-bold">grant trading permissions</span> via a secure
    delegation (e.g, Privy).
  </p>,
  <p key={2}>
    If the agent succeeds,{" "}
    <span className="font-bold">
      your wallet sees the profits from those trades.
    </span>{" "}
    You can
    <span className="font-bold">revoke this permission</span> anytime.
  </p>,
];

const WhyGrantPermission = () => {
  return (
    <div className="flex flex-col gap-4 items-stretch">
      <h1 className="text-[clamp(24px,5vw,28px)] leading-[clamp(27px,5vw,31.36px)] text-primary-2350 font-bold font-QuantaGroteskPro">
        Why should you grant permission?
      </h1>

      <ul className="flex flex-col gap-10 px-3.5 pt-3.5 pb-4 rounded-3xl bg-primary-1750 text-[18px] leading-[22.32px] text-primary-2350 list-disc">
        {permissionsInfo.map((info, index) => (
          <li key={index} className="ml-7">
            {info}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyGrantPermission;

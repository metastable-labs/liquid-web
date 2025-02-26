import React, { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import { LWButton, LWClickAnimation } from "@/components";
import { ShareIcon } from "@/public/icons";
import { formatNumberWithSuffix } from "@/utils/helpers";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";

const AgentOverview = () => {
  const { navigate, agentState, appState } = useSystemFunctions();
  const { ready, user } = usePrivy();
  const { showGrantPermission } = useAppActions();
  const { solanaWallet, evmWallet } = useLinkedAccounts();

  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const { delegationDetails } = agentState;
  const agent = agentState.agent;
  const name = agent?.name || "";

  const actions: Array<ILWButton> = [
    {
      title: `${isPermissionGranted ? "Revoke" : "Grant Permission"}`,
      onClick: () => showGrantPermission(true),
      variant: isPermissionGranted ? "danger" : "primaryAlt",
    },
    {
      title: `Trade (coming soon)`, // `Trade $${agent?.token.symbol}`
      onClick: () => navigate.push(`/${agent?.id}/trade`),
      variant: "secondary",
    },
  ];

  const rates = [
    { title: "Win rate", value: agent?.winRate || "0%" },
    { title: "Users", value: formatNumberWithSuffix(agent?.users || 0) },
    {
      title: "Last 7D PnL",
      value: `+${agent?.last7dPnl || ""}`,
      variant: "positive",
    },
    {
      title: "Total PnL",
      value: `+$${agent?.totalPnl?.toLocaleString() || "0"}`,
      variant: "positive",
    },
  ];

  useEffect(() => {
    const permissionGranted =
      user && ready
        ? evmWallet?.delegated &&
          (appState.isSolanaSupported ? solanaWallet?.delegated : true) &&
          (delegationDetails ? delegationDetails?.isActive : false)
        : false;

    setIsPermissionGranted(permissionGranted);
  }, [
    user,
    ready,
    delegationDetails,
    evmWallet,
    solanaWallet,
    appState.isSolanaSupported,
  ]);

  const extras = [
    <span
      key="symbol"
      className="text-[14px] leading-[18.48px] text-primary-2350 font-medium"
    >
      ${agent?.token.symbol}
    </span>,
    <div key="base" className="flex items-center gap-0.5">
      <Image
        src="/icons/base.png"
        alt="base icon"
        width={16}
        height={16}
        quality={100}
        className="object-cover"
      />

      <span className="text-[14px] leading-[18.48px] text-primary-450 font-medium">
        BASE
      </span>
    </div>,
  ];

  const handleShare = () => {
    console.log("Share");
  };

  return (
    <div className="self-stretch lg:p-6 lg:border lg:border-primary-150 lg:bg-white lg:rounded-3xl flex flex-col items-stretch gap-8">
      <div className="self-stretch flex flex-col items-stretch gap-6">
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/liquid.png"
              alt={`${name} icon`}
              width={64}
              height={64}
              quality={100}
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
            />

            <h1 className="text-[clamp(21px,5vw,32px)] leading-[clamp(32px,5vw,31.35.84px)] tracking-[-1px] text-primary-400 font-bold font-QuantaGroteskPro">
              {name}
            </h1>

            {extras.map((extra, index) => (
              <div
                key={index}
                className="p-2 h-[34px] flex items-center justify-center border border-primary-2300 rounded-xl bg-primary-1750 w-fit overflow-hidden"
              >
                {extra}
              </div>
            ))}
          </div>

          <LWClickAnimation onClick={handleShare}>
            <ShareIcon />
          </LWClickAnimation>
        </div>

        <p
          className={classNames(
            "text-[16px] leading-[19.84px] text-primary-100 content-center h-full",
            { "max-w-[504px]": user }
          )}
        >
          Welcome to Agent {agent?.name}’s terminal. Here, you can grant{" "}
          {agent?.name} access to your wallet to achieve its goal or you can buy
          and sell Agent’s token.
        </p>

        <div className="self-stretch grid grid-cols-2 lg:flex lg:flex-row items-center gap-6 px-6 py-4 border border-primary-150 rounded-2xl justify-between">
          {rates.map((rate, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col gap-2">
                <h4 className="text-[clamp(12px,5vw,15px)] leading-[clamp(16px,5vw,19.8px)] text-primary-100">
                  {rate.title}
                </h4>
                <span
                  className={classNames(
                    "text-[clamp(14px,5vw,16px)] leading-[clamp(17px,5vw,19.2px)] font-medium",
                    {
                      "text-primary-2600": !rate.title.includes("PnL"),
                      "text-primary-2700":
                        rate.title.includes("PnL") &&
                        rate.variant === "positive",
                      "text-primary-1350":
                        rate.title.includes("PnL") &&
                        rate.variant === "negative",
                    }
                  )}
                >
                  {rate.value}
                </span>
              </div>
              {index < rates.length - 1 && (
                <div className="px-2 hidden lg:block">
                  <div className="h-[1px] w-full lg:h-4 lg:w-[1px] bg-primary-2450" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {ready &&
          actions.map((action, index) => (
            <div
              key={index}
              className={classNames("w-full", {
                relative: action.variant === "secondary",
              })}
            >
              <LWButton
                title={action.title}
                onClick={action.onClick}
                variant={action.variant}
                className="w-full"
              />

              {action.variant === "secondary" && (
                <div className="rounded-[21.6px] bg-[rgba(217, 217, 217, 0.01)] backdrop-blur-[1px] absolute w-full h-full top-0 left-0" />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AgentOverview;

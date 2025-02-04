"use client";
import { useState } from "react";
import Image from "next/image";

import { LWClickAnimation, LWButton, LWUserPaper, LWPost } from "@/components";
import { ShareIcon } from "@/public/icons";
import InfoCard from "./info-card";
import { agent } from "./dummy";
import ModalWrapper from "@/components/modal/modal-wrapper";
import GrantPermission from "./grant-permission";
import { formatNumberWithSuffix } from "@/utils/helpers";
import classNames from "classnames";

const Terminal = () => {
  const [openGrantPermission, setOpenGrantPermission] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const { creator, description, goal, icon, name, symbol } = agent;

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

  const handlePermission = () => {
    if (!permissionGranted && !openGrantPermission) {
      setOpenGrantPermission(true);
      return;
    }

    if (!permissionGranted && openGrantPermission) {
      // Handle the Privy delegation for granting permissions her
      return;
    }

    // Revoke the permissions here
  };

  const actions: Array<ILWButton> = [
    {
      title: `Trade $${symbol}`,
      onClick: () => console.log("Trade"),
      variant: "secondary",
    },
    {
      title: `${permissionGranted ? "Revoke" : "Grant Permission"}`,
      onClick: handlePermission,
      variant: "primaryAlt",
    },
  ];

  const infoCards: Array<InfoCardProps> = [
    { children: <LWUserPaper user={creator} />, title: "Creator" },
    {
      children: (
        <p className="text-[16px] leading-[19.84px] text-primary-100 flex items-center justify-center h-full">
          {agent.goal}
        </p>
      ),
      title: "Agent’s Goal",
    },
  ];

  const handleShare = () => {
    console.log("Share");
  };

  const rates = [
    { title: "Win rate", value: "98%" },
    { title: "Users", value: formatNumberWithSuffix(4_400) },
    { title: "Last 7D PnL", value: `+${96.4}%`, variant: "positive" },
    {
      title: "Total PnL",
      value: `+$${(456_000).toLocaleString()}`,
      variant: "positive",
    },
  ];

  return (
    <>
      <div className="w-full px-5 mt-10 flex flex-col gap-14 pb-10">
        <div className="flex flex-col gap-6">
          <div className="self-stretch p-4 border border-primary-150 bg-white rounded-3xl flex flex-col items-stretch gap-10 md:flex-row md:items-center md:justify-between ">
            <div className="flex items-center gap-2">
              <Image
                src={icon}
                alt={`${name} icon`}
                width={100}
                height={100}
                quality={100}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
              />

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-[clamp(24px,5vw,28px)] leading-[clamp(27px,5vw,31.36px)] text-primary-2350 font-bold font-QuantaGroteskPro">
                    {name}
                  </h1>

                  <LWClickAnimation onClick={handleShare}>
                    <ShareIcon />
                  </LWClickAnimation>
                </div>

                <div className="px-2 py-1 flex items-center justify-center border border-primary-2300 rounded-xl bg-primary-1750 w-fit">
                  <span className="text-[14px] leading-[18.48px] text-primary-2350 font-medium">
                    ${symbol}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              {rates.map((rate, index) => (
                <div key={index} className="flex flex-col gap-2">
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
              ))}
            </div>
          </div>

          <div className="self-stretch p-6 border border-primary-150 bg-white rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <p className="max-w-[504px] text-[clamp(15px,5vw,18px)] leading-[clamp(18px,5vw,23.76px)] text-primary-100 font-medium">
              {description}
            </p>

            <div className="flex flex-col-reverse md:flex-row md:items-center gap-6">
              {actions.map((action, index) => (
                <LWButton
                  key={index}
                  title={action.title}
                  onClick={action.onClick}
                  variant={action.variant}
                  className="w-full md:w-auto"
                />
              ))}
            </div>
          </div>

          <div className="self-stretch p-6 border border-primary-150 bg-white rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-6">
            {infoCards.map((infoCard, index) => (
              <InfoCard key={index} title={infoCard.title}>
                {infoCard.children}
              </InfoCard>
            ))}
          </div>
        </div>

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
      </div>

      <ModalWrapper
        title="Granting Permissions"
        isOpen={openGrantPermission}
        onClose={() => setOpenGrantPermission(false)}
        enlargeTitle
      >
        <GrantPermission onClick={handlePermission} />
      </ModalWrapper>
    </>
  );
};

export default Terminal;

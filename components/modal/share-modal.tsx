"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import { CopyIcon, RotatedAddIcon, XIcon } from "@/public/icons";
import useCopy from "@/hooks/useCopy";
import { formatNumberWithSuffix } from "@/utils/helpers";
import ModalWrapper from "./modal-wrapper";
import LWClickAnimation from "../click-animation";

const truncateURL = (url: string, length: number = 20) => {
  return url.length > length ? `${url.substring(0, length)}...` : url;
};

const LWShareModal = () => {
  const {
    agentState: { agent },
    appState: { openShareModal },
    pathname,
  } = useSystemFunctions();
  const { showShareModal } = useAppActions();
  const { handleCopy } = useCopy();
  const [currentURL, setCurrentURL] = useState("");

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const url = `${window.location.origin}${pathname}`;
    setCurrentURL(url);
  }, [pathname]);

  const onClose = () => showShareModal(false);

  const handleShare = async (platform: "farcaster" | "twitter") => {
    const message = encodeURIComponent(
      `Check out this AI Agent ${agent?.name} here: ${currentURL}`
    );

    if (platform === "farcaster") {
      window.open(`https://warpcast.com/~/compose?text=${message}`, "_blank");
    } else if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
    }
  };

  const actions = [
    {
      icon: <CopyIcon height={20} width={20} />,
      action: () => handleCopy(currentURL),
    },
    {
      icon: (
        <Image
          src="/images/farcaster.png"
          alt="farcaster logo"
          width={20}
          height={20}
          quality={100}
          className="w-5 h-5 object-cover rounded-full"
        />
      ),
      action: () => handleShare("farcaster"),
    },
    {
      icon: <XIcon />,
      action: () => handleShare("twitter"),
    },
  ];

  const currentPnlIsPositive =
    agent?.currentPnl != undefined && agent?.currentPnl >= 0;
  const totalPnlIsPositive =
    agent?.totalPnl != undefined && agent?.totalPnl >= 0;

  const rates = [
    { title: "Win rate", value: agent?.winRate || "0%" },
    { title: "Users", value: formatNumberWithSuffix(agent?.users || 0) },
    {
      title: "Current PnL",
      value: agent?.currentPnl
        ? `${currentPnlIsPositive ? "+" : ""}${agent?.currentPnl}%`
        : "0%",
      variant: currentPnlIsPositive ? "positive" : "negative",
    },
    {
      title: "Total PnL",
      value: agent?.totalPnl
        ? `${totalPnlIsPositive ? "+" : ""}${agent?.totalPnl}%`
        : "0%",
      variant: totalPnlIsPositive ? "positive" : "negative",
    },
  ];

  return (
    <ModalWrapper isOpen={openShareModal} onClose={onClose} fluid>
      <div className="p-5 md:p-7 flex flex-col gap-6 self-stretch w-full md:w-[507px]">
        <div className="flex flex-col items-stretch self-stretch gap-8">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[24px] leading-[26.88px] tracking-[-0.6px] font-medium text-primary-950">
              Share <span className="font-bold">Agent {agent?.name}</span>
            </h1>

            <LWClickAnimation onClick={onClose}>
              <RotatedAddIcon height={24} width={24} fill="#1E293B" />
            </LWClickAnimation>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 self-stretch flex items-center p-2 rounded-xl bg-primary-600">
              <span className="text-[16px] leading-[19.84px] text-primary-1700 overflow-hidden text-ellipsis whitespace-nowrap">
                {truncateURL(currentURL)}
              </span>
            </div>

            {actions.map(({ icon, action }, index) => (
              <LWClickAnimation
                key={index}
                className="flex items-center justify-center min-w-fit p-2.5 border border-primary-150 bg-primary-500 rounded-full"
                onClick={action}
              >
                {icon}
              </LWClickAnimation>
            ))}
          </div>
        </div>

        <div
          ref={boxRef}
          className="self-stretch lg:p-6 lg:border lg:border-primary-150 lg:bg-white lg:rounded-3xl flex flex-col items-stretch gap-6"
        >
          <div className="flex items-center gap-2">
            <Image
              src={"/images/liquid.png"}
              alt={`${agent?.name} icon`}
              width={64}
              height={64}
              quality={100}
              className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
            />

            <h1 className="text-[clamp(21px,5vw,28px)] leading-[clamp(25px,5vw,31.36px)] tracking-[-1px] text-primary-400 font-bold font-QuantaGroteskPro">
              {agent?.name}
            </h1>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-primary-2350 text-[clamp(16px,5vw,19.7px)] leading-[clamp(23px,5vw,26px)] font-medium">
              Agent’s Goal
            </h2>

            <div className="self-stretch border border-primary-150 rounded-2xl p-4 flex-1">
              <p className="text-[16px] leading-[19.84px] text-primary-100 content-center h-full max-w-[365px]">
                {agent?.goal}
              </p>
            </div>
          </div>

          <div className="self-stretch grid grid-cols-2 lg:flex lg:flex-row items-center gap-2 px-6 py-4 border border-primary-150 rounded-2xl justify-between">
            {rates.map((rate, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col gap-2">
                  <h4 className="text-[clamp(12px,5vw,15px)] leading-[clamp(16px,5vw,19.8px)] text-primary-100 text-nowrap">
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
      </div>
    </ModalWrapper>
  );
};

export default LWShareModal;

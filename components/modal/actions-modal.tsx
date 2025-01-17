"use client";
import { useState } from "react";
import classNames from "classnames";
import Image from "next/image";

import { MoreIcon, InfoCircleIcon, InfoCircleFillIcon } from "@/public/icons";
import usePositionActions from "@/store/position/actions";
import useAppActions from "@/store/app/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import ExitPostionModal from "./exit-position-modal";
import { ActionModalProps } from "./types";
import { Button } from "../ui/button";
import ModalWrapper from "./modal-wrapper";
import LWClickAnimation from "../click-animation";

const TokenIcons = ({ icons }: { icons: Array<string> }) => (
  <div
    className={classNames("flex items-center justify-center", {
      "-space-x-1.5": icons.length > 1,
    })}
  >
    {icons.map((icon, index) => (
      <Image
        key={index}
        src={icon}
        alt="Token icon"
        width={16}
        height={16}
        className="rounded-full"
      />
    ))}
  </div>
);

function ActionsModal({ isOpen, onClose }: ActionModalProps) {
  const {
    positionState: { activePosition: position },
  } = useSystemFunctions();
  const { setIsClaiming, setIsWithdrawing } = usePositionActions();
  const { setInfo } = useAppActions();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const assets = position?.assets;

  const iconPairs = (() => {
    if (!assets) return [[], []];

    if (assets.length < 3) {
      return [[assets[0].logo], assets.length === 2 ? [assets[1].logo] : []];
    } else if (assets.length === 3) {
      return [[assets[0].logo], [assets[1].logo, assets[2].logo]];
    } else if (assets.length === 4) {
      return [
        [assets[0].logo, assets[1].logo],
        [assets[2].logo, assets[3].logo],
      ];
    } else {
      throw new Error("Assets array must contain 2 to 4 items.");
    }
  })();

  const onWithdraw = () => {
    setIsWithdrawing(true);
    console.log("Withdraw clicked");
  };

  const onClaimYield = () => {
    setIsClaiming(true);
    console.log("Claim yield clicked");
  };

  const onClaimRewards = () => {
    setIsClaiming(true);
    console.log("Claim rewards clicked");
  };

  const actions = [
    {
      title: "Total Balance",
      value: position?.totalBalance,
      onClick: onWithdraw,
      buttonTitle: "Withdraw",
      infoClick: () =>
        setInfo({
          title: "What’s your total balance?",
          description:
            "Your total balance reflects the amount of money available in a particular position. It includes all deposits.",
        }),
    },
    {
      title: "Yield Earned",
      value: position?.yieldEarned,
      onClick: onClaimYield,
      buttonTitle: "Claim",
      infoClick: () =>
        setInfo({
          title: "What is Yield?",
          description:
            "Yield refers to the income earned on an investment over time, typically expressed as a percentage.",
        }),
      disabled: true,
    },
    {
      title: "Rewards",
      value: position?.rewards,
      onClick: onClaimRewards,
      buttonTitle: "Claim",
      infoClick: () =>
        setInfo({
          title: "How are my rewards calculated?",
          description:
            "Rewards are calculated based on your contributions and performance metrics within the specified position.",
        }),
      disabled: true,
    },
  ];

  return (
    <>
      <ModalWrapper isOpen={isOpen} onClose={onClose} title="Action">
        <div className="gap-3 p-6 w-full flex flex-col items-stretch">
          <div className="flex items-center justify-between border-[#EAEEF4] border-[1px] px-4 py-3 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <span className="text-[15px] text-[#1E293B] font-medium">
                  {position?.strategy.name}
                </span>
                <div className="flex gap-1">
                  <TokenIcons icons={iconPairs[0]} />
                  {iconPairs[1].length > 0 && <MoreIcon />}
                  <TokenIcons icons={iconPairs[1]} />
                </div>
              </div>
            </div>
            <div className="text-[12px] text-[#64748B] font-light">
              Est. APY{" "}
              <span className="text-[#4691FE] text-[13px] font-medium">
                {position?.strategy?.apy || "0.00"}%
              </span>
            </div>
          </div>

          {actions.map(({ infoClick, title, value, disabled }, index) => (
            <div
              key={index}
              className={classNames(
                "flex items-center justify-between border-[#EAEEF4] border-[1px] px-4 py-3 rounded-xl",
                { "opacity-30 pointer-events-none": disabled }
              )}
            >
              <LWClickAnimation onClick={infoClick} className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-sm text-[#64748B] text-[12px] font-light">
                    {title}
                  </span>
                  <div className="min-w-fit">
                    <InfoCircleIcon />
                  </div>
                </div>

                <div className="text-lg font-medium text-[13px] font-ClashDisplay xl">
                  $
                  {Number(value).toLocaleString(undefined, {
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 2,
                  })}
                </div>
              </LWClickAnimation>

              {/* <Button
                  onClick={onClick}
                  variant="secondary"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-[28px] text-[11px] w-[73px]"
                >
                  {buttonTitle}
                </Button> */}
            </div>
          ))}

          <div className="flex gap-3 px-3.5 pt-3.5 pb-4 bg-primary-1750 rounded-xl">
            <InfoCircleFillIcon />

            <p className="text-[14px] leading-[18.48px] text-primary-1500">
              Yields and Rewards calculation are coming soon.
            </p>
          </div>

          <div className="w-full px-6 py-3">
            <LWClickAnimation
              onClick={() => setIsExitModalOpen(true)}
              className="flex items-center justify-center py-[18px] px-8 w-full rounded-[30px] bg-primary-500"
            >
              <span className="text-[16px] leading-[16px] text-primary-1700 font-QuantaGroteskPro font-semibold">
                Exit Position
              </span>
            </LWClickAnimation>
          </div>
        </div>
      </ModalWrapper>

      <ExitPostionModal
        isOpen={isExitModalOpen}
        onClose={() => setIsExitModalOpen(false)}
      />
    </>
  );
}

export default ActionsModal;

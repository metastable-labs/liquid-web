"use client";

import { MoreIcon, InfoCircleIcon } from "@/public/icons";
import usePositionActions from "@/store/position/actions";
import useAppActions from "@/store/app/actions";
import { ActionModalProps } from "./types";
import Image from "next/image";
import { Button } from "../ui/button";
import ModalWrapper from "./modal-wrapper";
import LWClickAnimation from "../click-animation";

function ActionsModal({ isOpen, onClose, position }: ActionModalProps) {
  const { setIsClaiming, setIsWithdrawing } = usePositionActions();
  const { setInfo } = useAppActions();

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
      value: position?.totalBalance.toLocaleString(),
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
      value: position?.yieldEarned.toLocaleString(),
      onClick: onClaimYield,
      buttonTitle: "Claim",
      infoClick: () =>
        setInfo({
          title: "What is Yield?",
          description:
            "Yield refers to the income earned on an investment over time, typically expressed as a percentage.",
        }),
    },
    {
      title: "Rewards",
      value: position?.rewards.toLocaleString(),
      onClick: onClaimRewards,
      buttonTitle: "Claim",
      infoClick: () =>
        setInfo({
          title: "How are my rewards calculated?",
          description:
            "Rewards are calculated based on your contributions and performance metrics within the specified position.",
        }),
    },
  ];

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Action">
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-[#EAEEF4] border-[1px] px-4 py-3 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <span className="text-[15px] text-[#1E293B] font-medium">
                  {position?.title}
                </span>
                <div className="flex gap-1">
                  <div className="flex items-center justify-center -space-x-1.5">
                    {position &&
                      Object?.values?.(position?.iconPairs[0]).map(
                        (icon, i) => (
                          <div key={i}>
                            <Image
                              src={icon}
                              alt="Token icon"
                              width={16}
                              height={16}
                              className="rounded-full"
                            />
                          </div>
                        )
                      )}
                  </div>

                  <div className="min-w-fit min-h-fit ">
                    <MoreIcon />
                  </div>

                  <div className="flex items-center justify-center -space-x-1.5">
                    {position &&
                      Object.values(position?.iconPairs[1]).map((icon, i) => (
                        <div key={i}>
                          <Image
                            src={icon}
                            alt="Token icon"
                            width={16}
                            height={16}
                            className="rounded-full"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-[12px] text-[#64748B] font-light">
              Est. APY{" "}
              <span className="text-[#4691FE] text-[13px] font-medium">
                {position?.estimatedAPY}%
              </span>
            </div>
          </div>

          {actions.map(
            ({ buttonTitle, infoClick, onClick, title, value }, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-[#EAEEF4] border-[1px] px-4 py-3 rounded-xl"
              >
                <LWClickAnimation onClick={infoClick}>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-[#64748B] text-[12px] font-light">
                      {title}
                    </span>
                    <div className="min-w-fit">
                      <InfoCircleIcon />
                    </div>
                  </div>

                  <div className="text-lg font-medium text-[13px] font-ClashDisplay">
                    ${value}
                  </div>
                </LWClickAnimation>

                <Button
                  onClick={onClick}
                  variant="secondary"
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-[28px] text-[11px] w-[73px]"
                >
                  {buttonTitle}
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ActionsModal;

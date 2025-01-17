"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { Slider } from "../ui/slider";
import { PercentageButton } from "../ui/percentage-button";
import { HoldButton } from "./hold-button";
import { WithdrawModalProps } from "./types";
import ModalWrapper from "./modal-wrapper";

const tokenUrl =
  "https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png";

export function WithdrawModal({ isOpen, onClose }: WithdrawModalProps) {
  const {
    positionState: { activePosition },
  } = useSystemFunctions();
  const [percentage, setPercentage] = useState(100);
  const [balance, setBalance] = useState(0);

  const tokenSymbol = "USDC";

  const amount = (balance * percentage) / 100;
  const percentageOptions = [10, 25, 50, 75, 100];

  const handleConfirm = () => {
    console.log(`Withdrawing ${amount} ${tokenSymbol}`);
    onClose();
  };

  useEffect(() => {
    setBalance(Number(activePosition?.totalBalance) || 0);
  }, [activePosition?.totalBalance]);

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Withdraw">
      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-6 border-[#EAEEF4] border-[1px] p-5 rounded-xl">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{percentage}%</span>
                <span>
                  {amount.toLocaleString()} {tokenSymbol}
                </span>
              </div>
              <Slider
                value={[percentage]}
                onValueChange={([value]) => setPercentage(value)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-5">
              <div className="flex items-center gap-1">
                <Image
                  src={tokenUrl}
                  alt="Token icon"
                  width={18}
                  height={18}
                  className="rounded-full"
                />

                <span>{tokenSymbol}</span>
              </div>
              <span className="font-light text-[#64748B]">
                Balance:
                <span className="text-primary-1700 font-normal">
                  {" "}
                  {balance.toLocaleString(undefined, {
                    maximumFractionDigits: 5,
                    minimumFractionDigits: 2,
                  })}
                </span>
              </span>
            </div>

            <div className="flex gap-2">
              {percentageOptions.map((value) => (
                <PercentageButton
                  key={value}
                  value={value}
                  isSelected={percentage === value}
                  onClick={() => setPercentage(value)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600 mb-5">
              <span className="font-light text-[12px]">
                You`&apos;`ll receive:
              </span>
              <div className="flex items-center gap-1">
                <Image
                  src={tokenUrl}
                  alt="Token icon"
                  width={18}
                  height={18}
                  className="rounded-full"
                />
                <span className="text-[14px]">
                  {amount.toLocaleString()} {tokenSymbol}
                </span>
              </div>
            </div>

            <HoldButton
              className="w-full"
              onHoldComplete={handleConfirm}
              holdDuration={1000}
            >
              Hold to confirm
            </HoldButton>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

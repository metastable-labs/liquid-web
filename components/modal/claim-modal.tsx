"use client";

import { useState } from "react";
import { Slider } from "../ui/slider";
import { PercentageButton } from "../ui/percentage-button";
import { HoldButton } from "./hold-button";
import { ClaimModalProps } from "./types";
import ModalWrapper from "./modal-wrapper";
import Image from "next/image";
const tokenUrl =
  "https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenBIcon_wscb3p.png";

export function ClaimModal({ isOpen, onClose }: ClaimModalProps) {
  const [percentage, setPercentage] = useState(100);

  const balance = 10000;
  const tokenSymbol = "USDC";

  const amount = (balance * percentage) / 100;

  const percentageOptions = [10, 25, 50, 75, 100];

  const handleConfirm = () => {
    console.log(`claiming ${amount} ${tokenSymbol}`);
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Claim">
      <div className="p-6">
        <div className="space-y-6">
          <div className="space-y-6 border-[#EAEEF4] p-5 rounded-xl border-[1px]">
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
                Claimable:
                <span className="text-[#334155] font-normal">
                  {" "}
                  ${balance.toLocaleString()}
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
            <div>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
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
              <div className="flex justify-between text-sm text-gray-600 mb-5">
                <span className="font-light text-[12px]">Fees:</span>
                <div className="flex items-center gap-1">
                  <span className="text-[14px]">${"5".toLocaleString()}</span>
                </div>
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

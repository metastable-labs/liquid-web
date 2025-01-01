"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import supportedAssets from "@/constants/supported-assets";
import useFormattedAmount from "@/hooks/useFormattedAmount";
import { Keypad } from "../ui/keypad";
import { HoldButton } from "./hold-button";
import { InvestModalProps } from "./types";
import { ChevronDown } from "lucide-react";
import ModalWrapper from "./modal-wrapper";
import { useIsMobile } from "../../hooks/useIsMobile";

export function InvestModal({
  isOpen,
  onClose,
  balance = 3600,
}: InvestModalProps) {
  const { amount, formattedValue, floatValue, updateAmount } =
    useFormattedAmount();
  const [token, setToken] = useState<SupportedAsset>();

  const isMobile = useIsMobile();
  const tokenSymbol = token?.symbol || "USDC";

  const handleKeyPress = (key: string) => {
    if (amount.includes(".") && key === ".") return;
    if (amount === "0" && key !== ".") {
      updateAmount(key);
    } else {
      updateAmount(amount + key);
    }
  };

  const handleBackspace = () => {
    updateAmount(amount.slice(0, -1));
  };

  useEffect(() => {
    const token = supportedAssets.find((asset) => asset.symbol === tokenSymbol);
    if (token) {
      setToken(token);
    }
  }, [tokenSymbol]);

  const handleMaxClick = () => {
    updateAmount(balance.toString());
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Invest">
      <div className="p-6">
        <div className="space-y-6">
          <div className="border-[#EAEEF4] p-5 rounded-xl border-[1px]">
            <div className="flex justify-between items-center">
              <input
                type="text"
                value={formattedValue}
                onChange={(e) => updateAmount(e.target.value)}
                className="text-4xl font-medium tabular-nums w-full bg-transparent border-none outline-none"
              />

              <div className="flex items-center gap-1 bg-[#F8FAFC] px-2 py-1 rounded-full">
                <Image
                  src={token?.logo || ""}
                  alt="Token icon"
                  width={18}
                  height={18}
                  className="rounded-full"
                />
                <span className="text-[12px]">{tokenSymbol}</span>
                <ChevronDown size={20} strokeWidth={1} color="#94A3B8" />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span
                className="text-[#375DFB] text-[12px] cursor-pointer"
                onClick={handleMaxClick}
              >
                Max
              </span>
              <span className="font-light text-[#64748B] text-[12px]">
                Available:
                <span className="text-[#334155] font-normal text-[13px]">
                  ${balance.toLocaleString()} {tokenSymbol}
                </span>
              </span>
            </div>
          </div>

          {isMobile && (
            <Keypad
              onKeyPress={handleKeyPress}
              onBackspace={handleBackspace}
              className="mb-6"
            />
          )}

          <div className="flex justify-between text-sm text-gray-600 mb-5">
            <span className="font-light text-[12px]">You&apos;ll receive:</span>
            <div className="flex items-center gap-1">
              <Image
                src={token?.logo || ""}
                alt="Token icon"
                width={18}
                height={18}
                className="rounded-full"
              />
              <span className="text-[14px]">
                {floatValue.toLocaleString()} {tokenSymbol}
              </span>
            </div>
          </div>

          <HoldButton
            className="w-full"
            onHoldComplete={() => {
              console.log(`Investing ${floatValue} ${tokenSymbol}`);
              onClose();
            }}
            holdDuration={1000}
          >
            Hold to confirm
          </HoldButton>
        </div>
      </div>
    </ModalWrapper>
  );
}

export interface SupportedAsset {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  logo: string;
  balance: number;
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useBalance } from "wagmi";
import classNames from "classnames";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

import supportedAssets from "@/constants/supported-assets";
import useFormattedAmount from "@/hooks/useFormattedAmount";
import useScreenDetect from "@/hooks/useScreenDetect";
import { USDCContractAddress } from "@/constants/addresses";
import { formatBalance } from "@/utils/helpers";
import usePositionActions from "@/store/position/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { Keypad } from "../ui/keypad";
import { HoldButton } from "./hold-button";
import { InvestModalProps } from "./types";
import { ChevronDown } from "lucide-react";
import ModalWrapper from "./modal-wrapper";
import LWClickAnimation from "../click-animation";

export function InvestModal({ isOpen, onClose, onChainId }: InvestModalProps) {
  const {
    amount,
    updateAmount,
    amountWithThousandSeparator,
    amountWithoutThousandSeparator,
  } = useFormattedAmount();
  const { address } = useAccount();
  const { ready, authenticated, login } = usePrivy();
  const { isLoading, data } = useBalance({
    address,
    token: USDCContractAddress,
  });
  const { joinStrategy } = usePositionActions();
  const { positionState } = useSystemFunctions();

  const [token, setToken] = useState<SupportedAsset>();
  const [balance, setBalance] = useState("0");
  const { isDesktop } = useScreenDetect();

  const { loadingInvesting, closeInvestModal } = positionState;
  const tokenSymbol = token?.symbol || "USDC";

  const amountIsGreaterThanBalance =
    Number(amountWithoutThousandSeparator) > Number(balance);
  const disableButton =
    amountIsGreaterThanBalance || loadingInvesting || !amount || amount === "0";

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

  const handleLogin = () => {
    login({ loginMethods: ["wallet"] });
  };

  const handleSubmit = async () => {
    joinStrategy(Number(amountWithoutThousandSeparator), onChainId);
  };

  useEffect(() => {
    if (data) {
      const formattedUsdcBalance = (
        Number(data?.value || 0) /
        10 ** 6
      ).toString();
      const resp = formatBalance(formattedUsdcBalance);
      setBalance(resp);
    }
  }, [data, loadingInvesting]);

  useEffect(() => {
    const token = supportedAssets.find((asset) => asset.symbol === tokenSymbol);
    if (token) {
      setToken(token);
    }
  }, [tokenSymbol]);

  const handleMaxClick = () => {
    updateAmount(balance.toString());
  };

  useEffect(
    function closeModal() {
      if (closeInvestModal) {
        onClose();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [closeInvestModal]
  );

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Invest">
      <div className="p-6">
        <div className="space-y-6">
          <div
            className={classNames(
              "p-5 rounded-xl border-[1px] transition-all duration-500",
              {
                "border-[#EAEEF4]": !amountIsGreaterThanBalance,
                "border-primary-1350": amountIsGreaterThanBalance,
              }
            )}
          >
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="0.00"
                value={amountWithThousandSeparator}
                onChange={(e) => updateAmount(e.target.value)}
                autoFocus
                className={classNames(
                  "text-4xl font-medium tabular-nums w-full bg-transparent border-none outline-none",
                  {
                    "text-primary-1350": amountIsGreaterThanBalance,
                  }
                )}
                disabled={!isDesktop}
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

            {ready && authenticated && !isLoading && (
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
                    {"  "}${balance.toLocaleString()} {tokenSymbol}
                  </span>
                </span>
              </div>
            )}
          </div>

          {!isDesktop && (
            <Keypad
              onKeyPress={handleKeyPress}
              onBackspace={handleBackspace}
              className="mb-6"
            />
          )}

          {ready && authenticated ? (
            <HoldButton
              className="w-full transition-all duration-500"
              onHoldComplete={handleSubmit}
              holdDuration={1000}
              disabled={disableButton}
              loading={loadingInvesting}
            >
              Hold to confirm
            </HoldButton>
          ) : (
            <LWClickAnimation
              onClick={handleLogin}
              className="w-full h-10 flex items-center justify-center bg-primary-350 rounded-full text-[14px] leading-[18.48px] font-medium text-white text-cente"
              stopPropagation
            >
              <span className="r">Connect wallet to continue</span>
            </LWClickAnimation>
          )}
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

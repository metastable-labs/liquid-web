"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useBalance } from "wagmi";
import classNames from "classnames";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

import useFormattedAmount from "@/hooks/useFormattedAmount";
import useScreenDetect from "@/hooks/useScreenDetect";
import { formatBalance } from "@/utils/helpers";
import usePositionActions from "@/store/position/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import supportedAssets from "@/constants/supported-assets";
import { ChevronDownIcon } from "@/public/icons";
import { Keypad } from "../ui/keypad";
import { HoldButton } from "./hold-button";
import { InvestModalProps } from "./types";
import ModalWrapper from "./modal-wrapper";
import LWClickAnimation from "../click-animation";

export function InvestModal({
  isOpen,
  onClose,
  onChainId,
  assets,
}: InvestModalProps) {
  const {
    amount,
    updateAmount,
    amountWithThousandSeparator,
    amountWithoutThousandSeparator,
  } = useFormattedAmount();
  const { address } = useAccount();
  const { ready, authenticated, login } = usePrivy();
  const { joinStrategy } = usePositionActions();
  const { positionState } = useSystemFunctions();
  const { isDesktop } = useScreenDetect();
  const [token, setToken] = useState<Asset>();
  const [balance, setBalance] = useState("0");
  const [showAssetSelection, setShowAssetSelection] = useState(false);

  const selectedAddress = supportedAssets.find(
    (asset) => asset.symbol === assets[0]?.symbol
  )?.address;

  const { isLoading, data } = useBalance({
    address,
    token: assets[0]?.address || selectedAddress,
  });

  const { loadingInvesting, closeInvestModal } = positionState;

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

  const handleMaxClick = () => {
    updateAmount(balance.toString());
  };

  useEffect(() => {
    if (data?.symbol === "USDC") {
      const formattedUsdcBalance = (
        Number(data?.value || 0) /
        10 ** 6
      ).toString();
      const resp = formatBalance(formattedUsdcBalance, 4);
      setBalance(resp);
    }

    if (data?.symbol === "WETH") {
      const formattedWethBalance = (
        Number(data?.value || 0) /
        10 ** 18
      ).toString();
      const resp = formatBalance(formattedWethBalance, 4);
      setBalance(resp);
    }
  }, [data, loadingInvesting]);

  useEffect(() => {
    if (assets) {
      setToken(assets[0]);
    }
  }, [assets]);

  useEffect(
    function closeModal() {
      if (closeInvestModal && isOpen) {
        onClose();
        updateAmount("");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [closeInvestModal, isOpen]
  );

  return (
    <>
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
                    "text-4xl font-medium tabular-nums w-[75%] bg-transparent border-none outline-none",
                    {
                      "text-primary-1350": amountIsGreaterThanBalance,
                    }
                  )}
                  disabled={!isDesktop}
                />

                <LWClickAnimation
                  onClick={() => setShowAssetSelection(true)}
                  disabled={assets.length === 1}
                  className="flex items-center gap-1 bg-[#F8FAFC] px-2 py-1 rounded-full w-fit"
                >
                  {token?.logo && (
                    <Image
                      src={token.logo}
                      alt="Token icon"
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                  )}

                  <span className="text-[12px]">{token?.symbol}</span>

                  {assets.length > 1 && (
                    <div className="w-fit h-fit">
                      <ChevronDownIcon />
                    </div>
                  )}
                </LWClickAnimation>
              </div>

              <div
                className={classNames(
                  "flex justify-between items-center transition-all duration-500 h-5",
                  {
                    "opacity-0": !(ready && authenticated && !isLoading),
                    "opacity-100": ready && authenticated && !isLoading,
                  }
                )}
              >
                <span
                  className="text-[#375DFB] text-[12px] cursor-pointer"
                  onClick={handleMaxClick}
                >
                  Max
                </span>
                <span className="font-light text-[#64748B] text-[12px]">
                  Available:
                  <span className="text-primary-1700 font-normal text-[13px]">
                    {"  "}${balance.toLocaleString()} {token?.symbol}
                  </span>
                </span>
              </div>
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

      <ModalWrapper
        isOpen={showAssetSelection}
        onClose={() => setShowAssetSelection(false)}
        title="Asset Selection"
      >
        <div className="p-6">
          <div className="space-y-6">
            {assets.map((asset) => (
              <div
                onClick={() => {
                  setToken(asset);
                  setShowAssetSelection(false);
                }}
                key={asset.symbol}
                className="flex items-center justify-between p-4 rounded-xl border-[1px] border-[#EAEEF4] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={asset.logo}
                    alt="Token icon"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="text-[14px] font-medium">
                    {asset.symbol}
                  </span>
                </div>
                <span className="text-[14px] font-light text-[#64748B]">
                  {asset.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

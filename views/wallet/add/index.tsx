import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { LWClickAnimation } from "@/components";
import useFormattedAmount from "@/hooks/useFormattedAmount";
import useFunding from "@/hooks/useFunding";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";
import { ArrowLeftIcon } from "@/public/icons";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const Add = ({ onClose }: InteractionProps) => {
  const { walletState } = useSystemFunctions();
  const { updateAmount, amountWithThousandSeparator } = useFormattedAmount();
  const [inputWidth, setInputWidth] = useState(50);
  const spanRef = useRef<HTMLSpanElement>(null);
  const { evmWallet } = useLinkedAccounts();
  const { fundWallet } = useFunding();

  const amountValue = amountWithThousandSeparator?.replace(/,/g, "");
  const ethBalance =
    walletState.assets?.find((asset) => asset.symbol === "ETH")?.uiAmount || 0;

  const onFundEvmWallet = () => {
    if (!evmWallet) return;

    fundWallet(evmWallet.address, "evm", amountValue);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 10);
    }
  }, [amountWithThousandSeparator]);

  return (
    <div className="-mt-14 flex flex-col items-stretch gap-6 h-full">
      <LWClickAnimation
        onClick={handleClose}
        className="flex items-center gap-0.5 w-fit"
      >
        <ArrowLeftIcon fill="#0C0507" width={20} height={20} />
        <span className="text-[13px] leading-[16.12px] text-primary-400">
          Back
        </span>
      </LWClickAnimation>

      <div className="flex-1 flex flex-col justify-between items-center gap-20">
        <h1 className="w-full text-center text-[24px] leading-[26.88px] tracking-[-0.6px] text-primary-1700">
          Enter amount
        </h1>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center justify-center gap-1 font-QuantaGroteskPro">
            <div className="relative">
              <span
                ref={spanRef}
                className="invisible absolute whitespace-pre text-[36px] font-bold tabular-nums"
              >
                {amountWithThousandSeparator || "0.00"}
              </span>

              <input
                type="text"
                placeholder="0.00"
                value={amountWithThousandSeparator}
                onChange={(e) => updateAmount?.(e.target.value)}
                autoFocus
                style={{ width: `${inputWidth}px` }}
                className={classNames(
                  "text-[36px] leading-[40.32px] text-primary-950 font-bold tabular-nums bg-transparent border-none outline-none transition-all duration-300"
                )}
              />
            </div>

            <span className="text-[28px] leading-[31.36px] text-primary-2400 font-bold">
              ETH
            </span>
          </div>

          <span className="text-[11px] leading-[13.64px] text-primary-2400 font-medium">
            Available balance: {ethBalance} ETH
          </span>
        </div>

        <LWClickAnimation
          onClick={onFundEvmWallet}
          loading={false}
          className={classNames({ "pointer-events-none": !amountValue })}
        >
          <div
            className={classNames(
              "w-[234px] h-[45px] rounded-[18px] flex items-center justify-center transition-all duration-500",
              {
                "bg-primary-350": !!amountValue,
                "bg-primary-2100 pointer-events-none": !amountValue,
              }
            )}
          >
            <span className="text-[16.2px] leading-[21.6px] text-white font-medium text-center">
              Next
            </span>
          </div>
        </LWClickAnimation>
      </div>
    </div>
  );
};

export default Add;

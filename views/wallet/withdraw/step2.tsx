import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

import { LWClickAnimation } from "@/components";
import useTruncateText from "@/hooks/useTruncateText";

const Step2 = ({
  address,
  amount,
  setStep,
  setAddress,
  setAmount,
}: WithdrawStepProps) => {
  const { truncatedText } = useTruncateText(address, 8, 8);
  const [inputWidth, setInputWidth] = useState(50);
  const spanRef = useRef<HTMLSpanElement>(null);

  const disableNext = !amount;

  const handleNext = () => {
    setStep?.(2);
  };

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth + 10); // +10px for padding
    }
  }, [amount]);

  return (
    <div className="self-stretch flex flex-col gap-24">
      <div className="self-stretch px-4 py-2.5 flex items-center justify-center gap-2 border-b border-b-primary-550 shadow-withdrawAddressInput h-[60px]">
        <p className="w-full text-[16px] leading-[19.84px] text-primary-950 font-medium">
          <span className="font-normal text-primary-2400">To: </span>
          <span>({truncatedText})</span>
        </p>

        <LWClickAnimation
          onClick={() => setStep?.(0)}
          className="px-3 py-2 flex items-center justify-center rounded-2xl border border-primary-550 bg-white min-w-fit"
        >
          <span className="text-[14px] leading-[18.48px] text-primary-950 font-medium">
            Change
          </span>
        </LWClickAnimation>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 font-QuantaGroteskPro">
            <div className="relative">
              <span
                ref={spanRef}
                className="invisible absolute whitespace-pre text-[36px] font-bold tabular-nums"
              >
                {amount || "0.00"}
              </span>

              <input
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount?.(e.target.value)}
                autoFocus
                style={{ width: `${inputWidth}px` }}
                className={classNames(
                  "text-[36px] leading-[40.32px] text-primary-950 font-bold tabular-nums bg-transparent border-none outline-none transition-all duration-300"
                )}
              />
            </div>

            <span className="text-[28px] leading-[31.36px] text-primary-2400 font-bold">
              USDC
            </span>
          </div>

          <motion.span
            animate={{
              height: amount ? "auto" : 0,
              opacity: amount ? 1 : 0,
            }}
            className="text-[14px] leading-[18.48px] text-primary-950 font-bold mt-1"
          >
            ~${(1298.68).toLocaleString()}
          </motion.span>
        </div>

        <LWClickAnimation
          onClick={handleNext}
          loading={false}
          className={classNames({ "pointer-events-none": disableNext })}
        >
          <div
            className={classNames(
              "w-[234px] h-[45px] rounded-[18px] flex items-center justify-center transition-all duration-500",
              {
                "bg-primary-350": !disableNext,
                "bg-primary-2100 pointer-events-none": disableNext,
              }
            )}
          >
            <span className="text-[16.2px] leading-[21.6px] text-white font-medium text-center">
              Next
            </span>
          </div>
        </LWClickAnimation>
      </div>

      <div className="self-stretch px-4 py-2.5 flex items-center justify-center gap-2 border-t border-t-primary-550 shadow-withdrawAddressInput h-[60px]">
        <p className="w-full text-[16px] leading-[19.84px] text-primary-950 font-medium">
          <span className="font-normal text-primary-2400">Bal: </span>
          <span>({(4506).toLocaleString()} USDC)</span>
        </p>

        <LWClickAnimation
          onClick={() => setAmount?.("4506")}
          className="px-3 py-2 flex items-center justify-center rounded-2xl border border-primary-550 bg-white min-w-fit w-20"
        >
          <span className="text-[14px] leading-[18.48px] text-primary-950 font-medium">
            Max
          </span>
        </LWClickAnimation>
      </div>
    </div>
  );
};

export default Step2;

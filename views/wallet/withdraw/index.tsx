import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LWClickAnimation } from "@/components";
import { ArrowLeftIcon } from "@/public/icons";
import useFormattedAmount from "@/hooks/useFormattedAmount";
import { appearAnimation } from "@/utils/helpers";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";

const Withdraw = ({ onClose }: InteractionProps) => {
  const [step, setStep] = useState<number>(1);
  const [address, setAddress] = useState<string>(
    "0x1234567890qwertyuio098765432wedrftgyhj"
  );
  const { amount, updateAmount, amountWithThousandSeparator } =
    useFormattedAmount();

  const steps = [
    <Step1 key={1} setStep={setStep} setAddress={setAddress} />,
    <Step2
      key={2}
      address={address}
      amount={amountWithThousandSeparator}
      setAmount={updateAmount}
      setStep={setStep}
    />,
    <Step3
      key={3}
      onClose={onClose}
      address={address}
      amount={amountWithThousandSeparator}
    />,
  ];

  const handleClose = () => {
    if (step === 0) return onClose();
    setStep(step - 1);
  };
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

      <AnimatePresence mode="popLayout">
        <motion.div key={step} {...appearAnimation} className="h-full">
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Withdraw;

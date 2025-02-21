import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { LWClickAnimation } from "@/components";
import { ArrowLeftIcon } from "@/public/icons";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { appearAnimation } from "@/utils/helpers";

const Withdraw = ({ onClose }: InteractionProps) => {
  const [step, setStep] = useState<number>(0);

  const steps = [
    <Step1 key={1} setStep={setStep} />,
    <Step2 key={2} setStep={setStep} />,
    <Step3 key={3} onClose={onClose} />,
  ];

  const handleClose = () => {
    onClose();
  };
  return (
    <div className="-mt-14 flex flex-col items-stretch gap-6">
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
        <motion.div key={step} {...appearAnimation} className="">
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Withdraw;

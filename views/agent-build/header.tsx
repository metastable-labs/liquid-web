import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

import { CheckIcon, ChevronRightIcon } from "@/public/icons";

interface StepProps {
  step: number;
  title: string;
  current: boolean;
  passed: boolean;
  onClick?: () => void;
}

const Step = ({ step, title, current, passed, onClick }: StepProps) => {
  return (
    <div
      className={classNames("flex items-center justify-center gap-2", {
        "cursor-pointer": onClick,
      })}
      onClick={() => onClick && onClick()}
    >
      <div
        className={classNames(
          "rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center transition-all duration-300",
          {
            "bg-primary-350": current,
            "bg-primary-1000": passed,
            "bg-white border border-primary-550": !current && !passed,
            "text-white": current,
            "text-primary-1800": !current,
          }
        )}
      >
        <AnimatePresence mode="popLayout">
          {passed ? (
            <motion.span
              key={1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute"
            >
              <CheckIcon />
            </motion.span>
          ) : (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={0}
              className="text-[10px] md:text-[12px] font-medium text-center leading-none"
            >
              {step}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <span
        className={classNames(
          "text-xs md:text-sm tracking-[-0.084px] font-Clash-Display font-normal",
          {
            "text-primary-50": current,
            "text-primary-1800": !current,
          }
        )}
      >
        {title}
      </span>
    </div>
  );
};

const Header = ({
  step,
  setStep,
  disabled,
}: {
  step: number;
  setStep: (step: number) => void;
  disabled: boolean;
}) => {
  return (
    <div
      className={classNames("flex items-center justify-center gap-4", {
        "pointer-events-none": disabled,
      })}
    >
      <Step
        current={step === 0}
        passed={step != 0}
        step={1}
        title="Select Function"
        onClick={() => setStep(0)}
      />
      <ChevronRightIcon />
      <Step
        current={step === 1}
        passed={step > 1}
        step={2}
        title="Step 2"
        onClick={step > 1 ? () => setStep(1) : undefined}
      />
      <ChevronRightIcon />
      <Step current={step === 2} passed={step > 2} step={3} title="Step 3" />
    </div>
  );
};

export default Header;

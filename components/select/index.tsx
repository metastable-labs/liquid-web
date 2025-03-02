"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

import { SortIcon } from "@/public/icons";
import LWClickAnimation from "../click-animation";
import LWBackdrop from "../backdrop";

const LWSelect = ({
  defaultValue,
  disabled,
  label,
  onClick,
  options,
  title,
  fullWidth = false,
}: ILWSelect) => {
  // Manage the selected value locally
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || ""
  );
  const [displayText, setDisplayText] = useState<string>(title || "");
  const [isOpen, setIsOpen] = useState(false);

  const showOptions = isOpen && options;

  // Update display text when defaultValue or options change
  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options?.find(
        (option) => option.value === defaultValue
      );
      if (defaultOption) {
        setDisplayText(defaultOption.title);
        setSelectedValue(defaultOption.value);
      } else {
        setDisplayText(title || "");
      }
    }
  }, [defaultValue, options, title]);

  const handleValue = (option: SelectOption) => {
    setIsOpen(false);
    setDisplayText(option.title);
    setSelectedValue(option.value);
    onClick?.(option.value);
  };

  const close = () => setIsOpen(false);

  return (
    <div
      className={classNames("relative", {
        "w-full items-stretch": fullWidth,
      })}
    >
      <LWClickAnimation
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="px-3 py-2 flex items-center justify-between gap-2 border border-primary-150 bg-primary-600 rounded-xl"
      >
        <SortIcon />
        <span className="text-[15px] leading-[19.8px] text-primary-1700 font-medium">
          {displayText}
        </span>
      </LWClickAnimation>

      <AnimatePresence>
        {showOptions && (
          <>
            <LWBackdrop onClick={close} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-1 z-20 border border-primary-150 bg-white shadow-profileDropdown rounded-2xl p-2 flex flex-col gap-5 w-fit"
            >
              {options?.map(({ title, value }) => (
                <div
                  onClick={() => handleValue({ title, value })}
                  key={value}
                  className={classNames(
                    "flex items-center p-2.5 rounded-lg cursor-pointer",
                    {
                      "bg-primary-600 pointer-events-none":
                        value === selectedValue,
                    }
                  )}
                >
                  <span className="text-[15px] leading-[19.8px] text-primary-1800 font-medium whitespace-nowrap">
                    {title}
                  </span>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LWSelect;

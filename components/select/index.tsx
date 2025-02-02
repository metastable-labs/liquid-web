import { useEffect, useState } from "react";
import Image from "next/image";
import classNames from "classnames";

import { ArrowCircleDownIcon } from "@/public/icons";
import LWClickAnimation from "../click-animation";
import ModalWrapper from "../modal/modal-wrapper";

const LWSelect = ({
  defaultValue,
  disabled,
  label,
  onClick,
  options,
  title,
  variant = "primary",
  fullWidth = false,
}: ILWSelect) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayText, setDisplayText] = useState<string>(title!);
  const [icon, setIcon] = useState<string | undefined>(undefined);

  const showOptions = isOpen && options;

  const handleValue = (option: SelectOption) => {
    setIsOpen(false);
    setDisplayText(option.title);
    setIcon(option.icon);
    onClick?.(option.value);
  };

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options?.find(
        (option) => option.value === defaultValue
      );
      if (defaultOption) {
        setDisplayText(defaultOption.title);
        setIcon(defaultOption.icon);
      } else {
        setDisplayText(title!);
        setIcon(undefined);
      }
    }
  }, [defaultValue, options, title]);

  return (
    <div
      className={classNames({
        "flex flex-col gap-1.5 relative": variant === "primary",
        "w-full items-stretch": fullWidth,
      })}
    >
      {label && (
        <label
          className={classNames({
            "text-[13px] leading-[16.12px] font-medium text-primary-400":
              variant === "primary",
          })}
        >
          {label}
        </label>
      )}

      <LWClickAnimation
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={classNames({
          "p-3.5 w-full flex items-center justify-between gap-2 border border-primary-150 bg-white rounded-2xl":
            variant === "primary",
        })}
      >
        <div
          className={classNames({
            "flex items-center gap-2": icon,
          })}
        >
          {icon && (
            <Image
              src={icon}
              alt={`${displayText}-icon`}
              width={24}
              height={24}
              className="rounded-full object-cover"
              quality={100}
            />
          )}

          <span
            className={classNames({
              "text-[14px] leading-[18.48px] text-primary-50":
                variant === "primary",
            })}
          >
            {displayText}
          </span>
        </div>

        <div className="min-w-fit">
          <ArrowCircleDownIcon />
        </div>
      </LWClickAnimation>

      <ModalWrapper isOpen={isOpen} onClose={closeModal} title={label}>
        <div className="p-6">
          <div className="space-y-6">
            {options?.map(({ title, value, icon }) => (
              <div
                onClick={handleValue.bind(this, { title, value, icon })}
                key={value}
                className="flex items-center justify-between p-4 rounded-xl border-[1px] border-[#EAEEF4] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={icon!}
                    alt={`${title}-icon`}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />

                  <span className="text-[14px] font-light text-primary-50">
                    {title}
                  </span>
                </div>

                <div
                  className={classNames(
                    "w-2 h-2 rounded-full transition-all duration-500",
                    {
                      "bg-primary-1000": value === defaultValue,
                      "bg-transparent": value !== defaultValue,
                    }
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default LWSelect;

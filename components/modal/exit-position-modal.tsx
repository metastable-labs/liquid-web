"use client";
import classNames from "classnames";

import LWClickAnimation from "../click-animation";
import ModalWrapper from "./modal-wrapper";
import { ExitPostionModalProps } from "./types";
import { TreeIcon } from "@/public/icons";
import usePositionActions from "@/store/position/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const ExitPostionModal = ({
  isOpen,
  onClose,
  onParentClose,
}: ExitPostionModalProps) => {
  const { positionState } = useSystemFunctions();
  const { exitStrategy } = usePositionActions();

  const exit = () => {
    if (!positionState.activePosition?.strategy.onChainId) return;

    exitStrategy(positionState.activePosition?.strategy.onChainId, {
      onSuccess: () => {
        onClose();
        onParentClose();
      },
    });
  };

  const actions = [
    {
      title: "Yes, Exit position",
      variant: "primary",
      onClick: exit,
      loading: positionState.loadingExit,
    },
    { title: "Cancel", variant: "secondary", onClick: onClose },
  ];
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6 flex flex-col gap-3 items-center">
        <div className="flex items-center justify-center w-full">
          <TreeIcon />
        </div>

        <p className="text-[20px] leading-[23.2px] font-medium text-primary-950 text-center w-full max-w-72">
          Are you sure you wan’t to exit this position?
        </p>

        <p className="text-[16px] leading-[19.84px] text-primary-100 text-center w-full max-w-80">
          Your invested asset and earnings will be withdrawn. You will also stop
          earning yield from this strategy
        </p>

        <div className="flex flex-col items-center justify-center py-3 px-6 gap-2 w-full">
          {actions.map(({ onClick, title, variant, loading }, index) => (
            <LWClickAnimation
              key={index}
              onClick={onClick}
              loading={loading}
              className={classNames(
                "flex items-center justify-center py-[18px] px-8 w-full rounded-[30px]",
                {
                  "bg-primary-500": variant === "primary",
                  "bg-primary-1550": variant === "secondary",
                }
              )}
            >
              <span
                className={classNames(
                  "text-[16px] leading-[16px] font-QuantaGroteskPro font-semibold",
                  {
                    "text-primary-1700": variant === "primary",
                    "text-primary-1350": variant === "secondary",
                  }
                )}
              >
                {title}
              </span>
            </LWClickAnimation>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ExitPostionModal;

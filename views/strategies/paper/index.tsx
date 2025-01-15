import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import moment from "moment";
import classNames from "classnames";

import { LWClickAnimation } from "@/components";
import { EmojiHappyIcon, ArrowRightIcon } from "@/public/icons";
import { InvestModal } from "@/components/modal/invest-modal";

const MAX_DESCRIPTION_LENGTH = 100;

const StrategyPaper = ({
  onClick,
  strategy: {
    apy,
    createdAt,
    curator,
    description,
    owner,
    name,
    onChainId,
    steps,
  },
  active,
  variant = "primary",
  close,
}: IStrategyPaper) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openInvest, setOpenInvest] = useState(false);

  const { assets } = steps[0];

  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH && !isExpanded
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  const showInvestButton = variant === "primary" && !active;

  const handleSeeMoreClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleInvestModal = () => {
    setOpenInvest(!openInvest);
  };

  const handleClick = () => {
    if (active && variant === "primary" && close) {
      close();
    } else {
      onClick?.();
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={classNames(
          "w-full flex flex-col gap-5 self-stretch cursor-pointer"
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <Image
                src={
                  "https://res.cloudinary.com/djzeufu4j/image/upload/v1735331176/Avatar_udfxuk.png"
                }
                alt={`${curator}'s avatar`}
                width={40}
                height={40}
                className="rounded-full"
                quality={100}
              />

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] leading-[16.8px] text-primary-400 font-medium font-ClashDisplay">
                    {curator.handle}
                  </span>
                  <span className="text-[12px] leading-[15.84px] text-primary-100 font-normal">
                    {moment(createdAt).fromNow()}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1">
                  <EmojiHappyIcon />
                  <p className="text-[12px] leading-[15.84px]">
                    Automated by{" "}
                    <span className="text-primary-450">{owner.handle}</span>
                  </p>
                </div>
              </div>
            </div>

            {variant === "primary" ? (
              <div className="flex items-center gap-1">
                <span className="text-[12px] leading-[15.84px] text-primary-100">
                  Est. APY
                </span>

                <span className="text-[14px] leading-[16.8px] text-primary-350 font-medium font-ClashDisplay">
                  {Number(apy)}%
                </span>
              </div>
            ) : (
              <LWClickAnimation
                onClick={handleInvestModal}
                className="w-[72px] h-[25px] flex items-center justify-center bg-primary-350 rounded-[10px]"
                stopPropagation
              >
                <span className="text-[14px] leading-[18.48px] font-medium text-white text-center">
                  Invest
                </span>
              </LWClickAnimation>
            )}
          </div>

          <div className="self-stretch flex flex-col gap-2">
            <h1 className="text-[15px] leading-[19.8px] text-primary-400 font-medium">
              {name}
            </h1>

            {variant === "secondary" && (
              <div className="flex items-center gap-1">
                <span className="text-[12px] leading-[15.84px] text-primary-100">
                  Est. APY
                </span>

                <span className="text-[14px] leading-[16.8px] text-primary-350 font-medium font-ClashDisplay">
                  {Number(apy)}%
                </span>
              </div>
            )}

            <motion.p
              animate={{ height: isExpanded ? "fit-content" : 35 }}
              className="text-[15px] leading-[19.8px] text-primary-100"
            >
              {truncatedDescription}
            </motion.p>

            {description.length > MAX_DESCRIPTION_LENGTH && (
              <LWClickAnimation
                className="mt-3 w-fit"
                onClick={handleSeeMoreClick}
                stopPropagation
              >
                <span className="text-[11px] leading-[13.2px] text-primary-450 underline underline-offset-2 cursor-pointer">
                  {isExpanded ? "See less" : "See more..."}
                </span>
              </LWClickAnimation>
            )}
          </div>
        </div>

        {showInvestButton && (
          <LWClickAnimation
            onClick={handleInvestModal}
            className="w-[72px] h-[25px] flex items-center justify-center bg-primary-350 rounded-[10px]"
            stopPropagation
          >
            <span className="text-[14px] leading-[18.48px] font-medium text-white text-center">
              Invest
            </span>
          </LWClickAnimation>
        )}

        {active && variant === "primary" && (
          <LWClickAnimation className="w-fit h-[25px]">
            <ArrowRightIcon />
          </LWClickAnimation>
        )}
      </div>

      {openInvest && (
        <InvestModal
          isOpen={openInvest}
          onClose={() => setOpenInvest(false)}
          onChainId={onChainId}
          assets={assets}
        />
      )}
    </>
  );
};

export default StrategyPaper;

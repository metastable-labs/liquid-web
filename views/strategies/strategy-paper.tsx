import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import moment from "moment";
import classNames from "classnames";

import { LWClickAnimation } from "@/components";
import { EmojiHappyIcon, ArrowRightIcon } from "@/public/icons";

const MAX_DESCRIPTION_LENGTH = 100;

const StrategyPaper = ({
  onClick,
  strategy: {
    createdAt,
    description,
    estimatedAPY,
    id,
    owner,
    ownerAvatar,
    title,
  },
  active,
  variant = "primary",
  close,
}: IStrategyPaper) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH && !isExpanded
      ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
      : description;

  const showInvestButton = variant === "primary" && !active;

  const handleSeeMoreClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const invest = () => {
    console.log("Investing in strategy", id);
  };

  const handleClick = () => {
    if (active && variant === "primary" && close) {
      close();
    } else {
      onClick?.();
    }
  };

  console.log("active", active);

  return (
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
              src={ownerAvatar}
              alt={`${owner}'s avatar`}
              width={40}
              height={40}
              className="rounded-full"
              quality={100}
            />

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] leading-[16.8px] text-primary-400 font-medium">
                  @{owner}
                </span>
                <span className="text-[12px] leading-[15.84px] text-primary-100 font-normal">
                  {moment(createdAt).fromNow()}
                </span>
              </div>

              <div className="flex items-center justify-center gap-1">
                <EmojiHappyIcon />
                <p className="text-[12px] leading-[15.84px]">
                  Automated by{" "}
                  <span className="text-primary-450">@getliquid</span>
                </p>
              </div>
            </div>
          </div>

          {variant === "primary" ? (
            <div className="flex items-center gap-1">
              <span className="text-[12px] leading-[15.84px] text-primary-100">
                Est. APY
              </span>

              <span className="text-[14px] leading-[16.8px] text-primary-350 font-medium">
                {estimatedAPY}%
              </span>
            </div>
          ) : (
            <LWClickAnimation
              onClick={invest}
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
            {title}
          </h1>

          <motion.p
            animate={{ height: isExpanded ? "fit-content" : 50 }}
            className="text-[15px] leading-[19.8px] text-primary-100"
          >
            {truncatedDescription}
          </motion.p>

          {description.length > MAX_DESCRIPTION_LENGTH && (
            <LWClickAnimation
              className="mt-0.5 w-fit"
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
          onClick={invest}
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
  );
};

export default StrategyPaper;

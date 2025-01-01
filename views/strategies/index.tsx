"use client";
import { useCallback, useState } from "react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

import ChessPiece from "@/assets/chess-piece";
import { ArrowLeftIcon, ArrowRightIcon } from "@/public/icons";
import { LWClickAnimation } from "@/components";
import { strategies } from "./dummy";
import StrategyPaper from "./strategy-paper";
import StrategyDetail from "./strategy-detail";
import ModalWrapper from "@/components/modal/modal-wrapper";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const Strategies = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null
  );

  const handleStrategyClick = (strategy: Strategy | null): void =>
    setSelectedStrategy(strategy);

  console.log("strategy", selectedStrategy);

  return (
    <div
      className={classNames("", {
        "xl:flex xl:gap-12 2xl:gap-36": selectedStrategy,
      })}
    >
      <div
        className={classNames(
          "flex flex-col gap-7 pt-[30px] pb-[60px] px-[18px] xl:pr-[0px] xl:max-w-[500px]",
          { "hidden xl:flex": selectedStrategy }
        )}
      >
        <div className="p-4 flex items-center justify-between gap-4 bg-primary-250 border border-primary-200 rounded-xl">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] leading-[17.92px] text-primary-300 font-bold">
              Explore AI powered strategies
            </h1>
            <p className="max-w-[170px] text-[11px] leading-[13.64px] text-primary-300">
              Start earning on Liquid with DeFi Strategies
            </p>
          </div>

          <ChessPiece />
        </div>

        {strategies.map((strategy, index) => (
          <div
            key={index}
            className={classNames({
              "pb-7 border-b border-b-primary-500":
                index !== strategies.length - 1,
            })}
          >
            <StrategyPaper
              strategy={strategy}
              onClick={() => handleStrategyClick(strategy)}
              active={selectedStrategy?.id === strategy.id}
              close={() => handleStrategyClick(null)}
            />
          </div>
        ))}
      </div>

      {selectedStrategy && (
        <div className="flex flex-col gap-9 xl:hidden px-5">
          <div className="relative flex items-center justify-center">
            <LWClickAnimation
              onClick={() => handleStrategyClick(null)}
              className="h-fit w-fit absolute left-0 top-0"
            >
              <ArrowLeftIcon />
            </LWClickAnimation>

            <span>Strategy</span>
          </div>

          <StrategyDetail strategy={selectedStrategy} />
        </div>
      )}

      <ModalWrapper
        isOpen={!!selectedStrategy}
        onClose={() => handleStrategyClick(null)}
        variant="flush-right"
      >
        <StrategyDetail strategy={selectedStrategy!} />
      </ModalWrapper>
    </div>
  );
};

export default Strategies;

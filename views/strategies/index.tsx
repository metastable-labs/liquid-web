"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";

import ChessPiece from "@/assets/chess-piece";
import ModalWrapper from "@/components/modal/modal-wrapper";
import usePositionActions from "@/store/position/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import StrategyDetail from "./strategy-detail";
import StrategyPaper from "./paper";
import StrategyPaperSkeleton from "./paper/skeleton";

const Strategies = () => {
  const { getStrategies } = usePositionActions();
  const {
    positionState: { loadingStrategies, strategies, strategiesMeta },
  } = useSystemFunctions();
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null
  );

  const showEmptyState = !Boolean(strategies?.length) && !loadingStrategies;
  const showShouldFetchMore = shouldFetchMore || loadingStrategies;

  const handleStrategyClick = (strategy: Strategy | null): void =>
    setSelectedStrategy(strategy);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        Boolean(strategiesMeta?.next)
      ) {
        setShouldFetchMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [strategiesMeta?.next]);

  useEffect(() => {
    if (!shouldFetchMore) return;

    const query = `page=${strategiesMeta?.next}&limit=10`;

    getStrategies(query, { onSuccess: () => setShouldFetchMore(false) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore]);

  useEffect(() => {
    if (!strategies) getStrategies(`page=1&limit=10`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames("", {
        "xl:flex xl:gap-12 2xl:gap-36": selectedStrategy,
      })}
    >
      <div
        className={classNames(
          "flex flex-col gap-7 px-[18px] xl:pr-[0px] xl:max-w-[500px] xl:pb-16 pt-8 xl:pt-0"
          // { "hidden xl:flex": selectedStrategy }
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

        {strategies?.map((strategy, index) => (
          <div
            key={index}
            className={classNames({
              "pb-7 border-b border-b-primary-500":
                index !== strategies.length - 1 || showShouldFetchMore,
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

        {showShouldFetchMore && <StrategyPaperSkeleton />}
      </div>

      {/* {selectedStrategy && (
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
      )} */}

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

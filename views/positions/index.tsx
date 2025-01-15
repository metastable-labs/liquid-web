"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import usePositionActions from "@/store/position/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setLoadingPosition } from "@/store/position";
import PositionCard from "./card";
import PositionCardSkeleton from "./card/skeleton";
import PositionsEmpty from "./empty";

const Positions = () => {
  const { getPositions } = usePositionActions();
  const {
    positionState: { loadingPositions, positions, positionsMeta },
    dispatch,
  } = useSystemFunctions();
  const { address } = useAccount();
  const { ready } = usePrivy();
  const [shouldFetchMore, setShouldFetchMore] = useState(false);

  const showEmptyState =
    (!Boolean(positions?.length) && !loadingPositions) || (!address && ready);
  const showShouldFetchMore = shouldFetchMore || loadingPositions;

  const initialPositionFetch = () => {
    if (positions) return;
    if (ready && !address) dispatch(setLoadingPosition(false));
    if (address) getPositions(`walletAddress=${address}&page=1&limit=10`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 200 &&
        Boolean(positionsMeta?.next)
      ) {
        setShouldFetchMore(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [positionsMeta?.next]);

  useEffect(() => {
    if (!shouldFetchMore) return;

    const query = `walletAddress=${address}&page=${positionsMeta?.next}&limit=10`;

    getPositions(query, { onSuccess: () => setShouldFetchMore(false) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore]);

  useEffect(() => {
    initialPositionFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div
      className={classNames(
        "xl:pb-16 pt-8 xl:pt-0 px-3.5 self-stretch flex flex-col gap-6 xl:max-w-[500px]",
        {
          "justify-center items-center h-[80vh]": showEmptyState,
        }
      )}
    >
      {positions?.map((position, index) => (
        <PositionCard key={index} {...position} />
      ))}

      {showShouldFetchMore && <PositionCardSkeleton />}

      {showEmptyState && <PositionsEmpty />}
    </div>
  );
};

export default Positions;

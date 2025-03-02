import { motion } from "framer-motion";
import classNames from "classnames";

// Base skeleton class – adjust colors as needed.
const skeletonBase = "bg-gray-300 animate-pulse rounded";

interface WalletSkeletonProps {
  walletInteraction?: string | number;
  // Optionally, you can pass a desired number of assets to simulate
  assetsCount?: number;
}

const WalletSkeleton = ({
  walletInteraction = "skeleton-key",
  assetsCount = 3,
}: WalletSkeletonProps) => {
  // Stub for appearAnimation.
  const appearAnimation = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  // For the actions, we assume there are 2 buttons.
  const actionsCount = 2;

  return (
    <>
      <div className="w-full lg:p-6 lg:rounded-[32px] lg:border lg:border-primary-150 bg-white flex flex-col gap-[70px]">
        {/* Header Section */}
        <div className="flex items-center gap-6 justify-between self-stretch px-4 py-3 border border-primary-550 bg-primary-600 rounded-[26px]">
          <div className="flex items-center gap-6">
            {/* Image Skeleton: simulate a rounded avatar */}
            <div
              className={classNames(skeletonBase, "w-10 h-10 rounded-full")}
            />
            <div className="flex flex-col gap-[5px]">
              {/* Title Skeleton for "Wallet" */}
              <div className={classNames(skeletonBase, "w-24 h-[23px]")} />
              {/* Paragraph Skeleton: simulating two lines of text */}
              <div className={classNames(skeletonBase, "w-[278px] h-[30px]")} />
            </div>
          </div>
          {/* ETHSOL component placeholder */}
          <div className="flex items-center -space-x-2">
            {[1, 2].map((image, index) => (
              <div
                key={index}
                className="w-[25px] h-[25px] rounded-full border border-primary-2750 bg-gray-300 relative"
              />
            ))}
          </div>
        </div>

        {/* Body Section */}
        <motion.div
          key={walletInteraction}
          {...appearAnimation}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          <div className="flex flex-col gap-[29px]">
            {/* Total Holdings Section */}
            <div className="flex flex-col gap-2.5">
              {/* Label Skeleton: "Total Holdings" */}
              <div className={classNames(skeletonBase, "w-14 h-[16px]")} />
              <div className="flex gap-3 items-center flex-wrap">
                {/* Balance Skeleton */}
                <div className={classNames(skeletonBase, "w-24 h-[40px]")} />
              </div>
            </div>

            {/* Actions Section */}
            <div className="self-stretch flex flex-col gap-8">
              <div className="self-stretch flex items-center gap-4">
                {Array.from({ length: actionsCount }).map((_, index) => (
                  <div
                    key={index}
                    className={classNames(
                      "flex-1 px-[21.6px] py-[6.75px] flex items-center justify-center gap-[6.75px] rounded-[21.6px] h-[54px]",
                      {
                        // First button: simulate a solid background
                        "bg-gray-200": index === 0,
                        // Second button: simulate an outlined button
                        "border border-gray-300 bg-gray-100": index === 1,
                      }
                    )}
                  />
                ))}
              </div>

              {/* Assets Section */}
              <div className="flex flex-col self-stretch items-stretch gap-6">
                {/* Heading Skeleton for "Assets" */}
                <div
                  className={classNames(skeletonBase, "mb-5 w-32 h-[27px]")}
                />
                <div className="flex flex-col self-stretch items-stretch gap-6">
                  {Array.from({ length: assetsCount }).map((_, index) => (
                    <div
                      key={index}
                      className={classNames(
                        skeletonBase,
                        "w-full h-16 rounded-xl"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full lg:p-6 lg:rounded-[32px] lg:border lg:border-primary-150 bg-white hidden xl:flex flex-col gap-[70px] justify-between h-full">
        {/* Title Skeleton */}
        <div className="bg-gray-300 animate-pulse rounded w-40 h-[26px]" />

        {/* Activity Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Date Header Skeleton */}
          <div className={classNames(skeletonBase, "w-28 h-4")} />

          {/* Activity Items */}
          <div className="flex flex-col gap-11">
            {/* We'll show 4 skeleton items for demonstration. Adjust as needed. */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Icon Skeleton */}
                  <div
                    className={classNames(skeletonBase, "w-8 h-8 rounded-full")}
                  />

                  <div className="flex flex-col gap-1">
                    {/* Activity Name Skeleton */}
                    <div className={classNames(skeletonBase, "w-32 h-4")} />
                    {/* Time Skeleton */}
                    <div className={classNames(skeletonBase, "w-16 h-3")} />
                  </div>
                </div>

                {/* Amount Skeleton */}
                <div className={classNames(skeletonBase, "w-16 h-4")} />
              </div>
            ))}
          </div>
        </div>

        {/* Paragraph Skeleton */}
        <div className="bg-gray-300 animate-pulse rounded max-w-[272px] self-center w-full h-[20px]" />
      </div>
    </>
  );
};

export default WalletSkeleton;

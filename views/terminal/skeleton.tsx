"use client";
import React from "react";
import classNames from "classnames";

// Base skeleton style (you can adjust the color as needed)
const skeletonBase = "bg-gray-300 animate-pulse rounded";

// --- AgentOverview Skeleton ---
const AgentOverviewSkeleton = () => {
  return (
    <div className="self-stretch lg:p-6 lg:border lg:border-primary-150 lg:bg-white lg:rounded-3xl flex flex-col items-stretch gap-8">
      <div className="self-stretch flex flex-col items-stretch gap-6">
        {/* Header Section */}
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Avatar Skeleton */}
            <div
              className={classNames(
                skeletonBase,
                "w-12 h-12 lg:w-16 lg:h-16 rounded-full"
              )}
            />
            {/* Name Skeleton */}
            <div
              className={classNames(
                skeletonBase,
                "w-40 h-[clamp(21px,5vw,32px)]"
              )}
            />
            {/* Extras Skeleton (simulate one extra box) */}
            {[0, 1].map((_, index) => (
              <div
                key={index}
                className={classNames(
                  skeletonBase,
                  "p-2 h-[34px] w-12 flex items-center justify-center border border-gray-400 rounded-xl"
                )}
              />
            ))}
          </div>
          {/* Share Icon Skeleton */}
          <div className={classNames(skeletonBase, "w-6 h-6")} />
        </div>

        {/* Description Skeleton */}
        <div
          className={classNames(skeletonBase, "w-full max-w-[504px] h-16")}
        />

        {/* Stats Section */}
        <div className="self-stretch grid grid-cols-2 lg:flex lg:flex-row items-center gap-6 px-6 py-4 border border-primary-150 rounded-2xl justify-between">
          {/** Assuming 4 stat items for a close mimic of the original layout */}
          {[0, 1, 2, 3].map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className={classNames(skeletonBase, "w-20 h-4")} />
              <div className={classNames(skeletonBase, "w-24 h-6")} />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div
          className={classNames(
            skeletonBase,
            "w-full md:w-1/2 h-[52px] rounded-[21.6px]"
          )}
        />
        <div
          className={classNames(
            skeletonBase,
            "w-full md:w-1/2 h-[52px] rounded-[21.6px]"
          )}
        />
      </div>
    </div>
  );
};

const AgentInfosSkeleton = () => {
  return (
    <div className="self-stretch p-6 border border-primary-150 bg-white rounded-3xl flex flex-col items-stretch justify-between gap-6 flex-1">
      {[0, 1].map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          {/* Title Skeleton: matches the original h2 styling (clamp font-size approximated with h-6) */}
          <div className="bg-gray-300 animate-pulse rounded w-40 h-6" />

          {/* Content Skeleton: mimics the self-stretch bordered container with padding and flex-1 */}
          <div className="self-stretch border border-primary-150 rounded-2xl p-4 flex-1">
            {/* Placeholder for the actual content, matching typical height */}
            <div className="bg-gray-300 animate-pulse rounded w-full h-24" />
          </div>
        </div>
      ))}
    </div>
  );
};

const WhyGrantPermissionSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 items-stretch">
      {/* Heading Skeleton */}
      <div
        className={classNames(skeletonBase, "w-full max-w-[500px] h-[28px]")}
      />

      {/* List Skeleton */}
      <ul className="flex flex-col gap-10 px-3.5 py-8 rounded-3xl bg-primary-1750">
        {[0, 1, 2].map((_, index) => (
          <li key={index} className="ml-7">
            <div className={classNames(skeletonBase, "w-full h-[22px]")} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Parent Skeleton Component ---
const AgentPageSkeleton = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row items-stretch gap-[30px]">
        <AgentOverviewSkeleton />
        <AgentInfosSkeleton />
      </div>
      <WhyGrantPermissionSkeleton />
    </>
  );
};

export default AgentPageSkeleton;

import React from "react";
import classNames from "classnames";

interface LWAgentCardSkeletonProps {
  variant?: "primary" | "secondary";
  backgroundColor?: string;
}

const LWAgentCardSkeleton = ({
  variant = "primary",
  backgroundColor,
}: LWAgentCardSkeletonProps) => {
  const skeletonBase = "bg-gray-300 animate-pulse rounded";

  const containerClasses = classNames({
    "self-stretch flex flex-col lg:flex-row items-center gap-[18px] border border-primary-150 bg-white p-6 lg:gap-20 lg:justify-between rounded-2xl":
      variant === "primary",
    "self-stretch flex flex-col items-center border border-primary-150 bg-white p-6 gap-9 rounded-2xl":
      variant === "secondary",
  });

  const avatarClasses = classNames(skeletonBase, {
    "w-14 h-14": variant === "primary",
    "w-10 h-10": variant === "secondary",
  });

  const titleClasses = classNames(skeletonBase, "w-12 h-4");

  const subtitleClasses = classNames(skeletonBase, "w-16 h-4");

  const statTitleClasses = classNames(skeletonBase, "w-14 h-3");
  const statValueClasses = classNames(skeletonBase, "w-16 h-4");

  const buttonSkeletonClasses = classNames(
    skeletonBase,
    "w-full h-[40px] lg:w-[120px] lg:h-[45px] rounded-2xl"
  );

  return (
    <div className={containerClasses} style={{ backgroundColor }}>
      <div
        className={classNames({
          "w-full lg:w-auto flex lg:block items-center justify-between":
            variant === "primary",
          "flex items-center justify-between w-full": variant === "secondary",
        })}
      >
        <div className="flex items-center gap-2">
          <div className={avatarClasses} style={{ borderRadius: 9999 }} />

          <div className="flex flex-col gap-2">
            <div className={titleClasses} />
            <div className="flex items-center gap-1">
              <div className={subtitleClasses} />
              <div className={subtitleClasses} />
              <div
                className={classNames(
                  skeletonBase,
                  "w-[13px] h-[13px] rounded-full"
                )}
              />
            </div>
          </div>
        </div>

        {variant === "primary" && (
          <div className="lg:hidden w-fit">
            <div className={classNames(skeletonBase, "w-5 h-5")} />
          </div>
        )}
      </div>

      <div
        className={classNames(
          "flex items-center justify-between w-full lg:w-auto",
          {
            "lg:gap-10": variant === "primary",
            "gap-7": variant === "secondary",
          }
        )}
      >
        {[0, 1, 2].map((index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={statTitleClasses} />
            <div className="my-1" />
            <div className={statValueClasses} />
          </div>
        ))}
      </div>

      {variant === "primary" && (
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className={buttonSkeletonClasses} />
          <div className="hidden lg:block">
            <div className={classNames(skeletonBase, "w-5 h-5")} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LWAgentCardSkeleton;

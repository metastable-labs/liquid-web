import React from "react";
import classNames from "classnames";

const PositionCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-full self-stretch">
      {[...Array(7)].map((_, index) => (
        <div
          key={index}
          className="py-3 px-4 flex flex-col gap-6 self-stretch rounded-[10px] border bg-gray-100 border-gray-300 animate-pulse"
        >
          <div className="self-stretch flex items-center justify-between">
            <div className="flex flex-col gap-2 justify-center">
              <div className="w-24 h-4 bg-gray-300 rounded-sm" />
              <div className="flex items-center gap-1">
                <div className="flex items-center justify-center -space-x-1.5">
                  {[...Array(2)].map((_, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 bg-gray-300 rounded-full"
                    />
                  ))}
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <div className="flex items-center justify-center -space-x-1.5">
                  {[...Array(2)].map((_, idx) => (
                    <div
                      key={idx}
                      className="w-4 h-4 bg-gray-300 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <div className="w-12 h-3 bg-gray-300 rounded-sm" />
              <div className="w-8 h-4 bg-gray-300 rounded-sm" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {[...Array(3)].map((_, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col gap-1">
                  <div className="w-16 h-3 bg-gray-300 rounded-sm" />
                  <div className="w-20 h-4 bg-gray-300 rounded-sm" />
                </div>
                {idx < 2 && <div className="w-[1px] h-6 bg-gray-300" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PositionCardSkeleton;

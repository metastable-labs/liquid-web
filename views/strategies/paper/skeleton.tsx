import classNames from "classnames";

const StrategyPaperSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 w-full self-stretch">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={classNames("", {
            "pb-7 border-b border-b-primary-500": index !== 6 - 1,
          })}
        >
          <div className="flex flex-col gap-4 animate-pulse">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex flex-col gap-1">
                  <div className="w-24 h-4 bg-gray-200 rounded-sm" />
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-3 bg-gray-200 rounded-sm" />
                  </div>
                </div>
              </div>

              <div className="w-[72px] h-[25px] bg-gray-200 rounded-[10px]" />
            </div>

            <div className="self-stretch flex flex-col gap-2">
              <div className="w-36 h-5 bg-gray-200 rounded-sm" />
              <div className="w-full h-9 bg-gray-200 rounded-sm" />
              <div className="w-24 h-3 bg-gray-200 rounded-sm mt-1" />
            </div>

            <div className="w-[72px] h-[25px] bg-gray-200 rounded-[10px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StrategyPaperSkeleton;

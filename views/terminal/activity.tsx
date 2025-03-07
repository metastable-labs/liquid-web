import useSystemFunctions from "@/hooks/useSystemFunctions";

const Activity = () => {
  const { agentState } = useSystemFunctions();
  const { agent } = agentState;

  const activityCards = [
    {
      title: "Active Positions",
      value: agent?.activePositions,
    },
    {
      type: "space",
    },
    {
      title: "No. of positions entered",
      value: agent?.totalPositions,
    },
    {
      title: "",
      value: "",
    },
  ];

  return (
    <div>
      <h2 className="text-[clamp(24px,5vw,28px)] leading-[clamp(27px,5vw,31.36px)] text-primary-2350 font-bold font-QuantaGroteskPro">
        Activity
      </h2>

      <div className="lg:p-6 lg:border lg:border-primary-150 lg:bg-white lg:rounded-3xl flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[20%] mt-4">
        {activityCards.map((item, index) => {
          if (item?.type === "space") {
            return (
              <div
                key={index}
                className="w-4 lg:w-[1px] h-[1px] lg:h-4 bg-primary-2450"
              />
            );
          }

          return (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-[16px] leading-[19.84px] text-primary-100">
                {item.title}
              </p>

              <p className="text-primary-2600 font-medium">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Activity;

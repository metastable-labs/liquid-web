import Image from "next/image";
import classNames from "classnames";

import { LWClickAnimation } from "@/components";
import { ShareIcon } from "@/public/icons";
import { formatNumberWithSuffix } from "@/utils/helpers";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const AgentHeader = () => {
  const { agentState } = useSystemFunctions();
  const agent = agentState.agent;
  const name = agent?.name || "";

  const handleShare = () => {
    console.log("Share");
  };

  const rates = [
    { title: "Win rate", value: agent?.winRate || "0%" },
    { title: "Users", value: formatNumberWithSuffix(agent?.users || 0) },
    {
      title: "Last 7D PnL",
      value: `+${agent?.last7dPnl || ""}`,
      variant: "positive",
    },
    {
      title: "Total PnL",
      value: `+$${agent?.totalPnl?.toLocaleString() || "0"}`,
      variant: "positive",
    },
  ];

  return (
    <div className="self-stretch p-4 border border-primary-150 bg-white rounded-3xl flex flex-col items-stretch gap-10 md:flex-row md:items-center md:justify-between ">
      <div className="flex items-center gap-2">
        <Image
          src={"/images/liquid.png"}
          alt={`${name} icon`}
          width={100}
          height={100}
          quality={100}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-[clamp(24px,5vw,28px)] leading-[clamp(27px,5vw,31.36px)] text-primary-2350 font-bold font-QuantaGroteskPro">
              {name}
            </h1>

            <LWClickAnimation onClick={handleShare}>
              <ShareIcon />
            </LWClickAnimation>
          </div>

          <div className="px-2 py-1 flex items-center justify-center border border-primary-2300 rounded-xl bg-primary-1750 w-fit">
            <span className="text-[14px] leading-[18.48px] text-primary-2350 font-medium">
              ${agent?.token.symbol || ""}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        {rates.map((rate, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h4 className="text-[clamp(12px,5vw,15px)] leading-[clamp(16px,5vw,19.8px)] text-primary-100">
              {rate.title}
            </h4>

            <span
              className={classNames(
                "text-[clamp(14px,5vw,16px)] leading-[clamp(17px,5vw,19.2px)] font-medium",
                {
                  "text-primary-2600": !rate.title.includes("PnL"),
                  "text-primary-2700":
                    rate.title.includes("PnL") && rate.variant === "positive",
                  "text-primary-1350":
                    rate.title.includes("PnL") && rate.variant === "negative",
                }
              )}
            >
              {rate.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentHeader;

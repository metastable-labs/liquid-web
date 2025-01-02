import Image from "next/image";
import classNames from "classnames";

import {
  CoinsIcon,
  ChartIcon,
  MoneyTickIcon,
  SwapHorizontalIcon,
} from "@/public/icons";
import { formatNumberWithSuffix } from "@/utils/helpers";
import StrategyPaper from "./paper";

const StrategyDetail = ({ strategy }: IStrategyDetails) => {
  const {
    agentCuratorFee,
    numberOfDeposits,
    riskProfile,
    steps,
    totalValueLocked,
  } = strategy;

  const assets = Array.from(
    new Map(
      steps
        .flatMap((step) => step.assets)
        .map((asset) => [asset.name, { icon: asset.logo, name: asset.name }])
    ).values()
  );

  const protocols = Array.from(
    new Map(
      steps.map((step) => [
        step.protocol.name,
        { icon: step.protocol.logo, name: step.protocol.name },
      ])
    ).values()
  );

  console.log("assets", assets);

  const maps = [
    { title: "Assets involved", data: assets },
    { title: "Protocols", data: protocols },
  ];

  const information = [
    {
      icon: <MoneyTickIcon />,
      title: "Total value locked",
      value: `$${totalValueLocked}`,
    },
    {
      icon: <ChartIcon />,
      title: "Risk profile",
      value: riskProfile,
      theme: riskProfile,
    },
    {
      icon: <SwapHorizontalIcon />,
      title: "No. of deposits",
      value: numberOfDeposits.toLocaleString(),
    },
    {
      icon: <CoinsIcon />,
      title: "Agent Curator fee",
      value: agentCuratorFee,
    },
  ];

  return (
    <div className="flex flex-col gap-7 pb-6">
      <StrategyPaper strategy={strategy} variant="secondary" />

      {maps.map(({ title, data }, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h2 className="text-[12px] leading-[15.84px] text-primary-100">
            {title}
          </h2>

          <div className="flex items-center gap-4">
            {data.map(({ icon, name }, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image
                  src={icon}
                  alt={`${name} icon`}
                  width={24}
                  height={24}
                  quality={100}
                  className="rounded-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="w-full h-[1px] rounded-full bg-primary-500" />

      <div className="flex flex-col gap-6">
        <h2 className="text-[16px] leading-[19.2px] text-primary-400 font-medium">
          Strategy info
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {information.map(({ icon, title, value, theme }, index) => (
            <div
              key={index}
              className={classNames(
                "p-4 flex flex-col gap-4 border rounded-xl",
                {
                  "border-primary-550 bg-primary-600": !theme,
                  "border-primary-650 bg-primary-700": theme === "Stable",
                  "border-primary-1050 bg-primary-1100": theme === "Moderate",
                  "border-primary-1200 bg-primary-1250": theme === "High",
                }
              )}
            >
              <div
                className={classNames(
                  "w-fit h-fit p-1.5 flex items-center justify-center rounded-[9px]",
                  {
                    "bg-primary-400": !theme,
                    "bg-primary-900": theme === "Stable",
                    "bg-primary-1150": theme === "Moderate",
                    "bg-primary-1300": theme === "High",
                  }
                )}
              >
                {icon}
              </div>

              <div className="flex flex-col gap-2">
                <h3
                  className={classNames("text-[14px] leading-[18.48px]", {
                    "text-primary-400": !theme,
                    "text-primary-900": theme === "Stable",
                    "text-primary-1150": theme === "Moderate",
                    "text-primary-1300": theme === "High",
                  })}
                >
                  {title}
                </h3>

                <h1
                  className={classNames(
                    "text-[28px] leading-[31.36px] font-bold capitalize font-QuantaGroteskPro",
                    {
                      "text-primary-400": !theme,
                      "text-primary-900": theme === "Stable",
                      "text-primary-1150": theme === "Moderate",
                      "text-primary-1300": theme === "High",
                    }
                  )}
                >
                  {value}
                </h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyDetail;

import Image from "next/image";
import classNames from "classnames";

import { formatNumberWithSuffix } from "@/utils/helpers";
import { ExternalLinkIcon } from "@/public/icons";
import LWClickAnimation from "../click-animation";

const AgentStat = ({ title, value }: AgentStat) => (
  <div className="flex flex-col gap-2">
    <span className="text-[12px] leading-[15.84px] lg:text-[15px] lg:leading-[19.8px] text-primary-100 whitespace-nowrap">
      {title}
    </span>

    {typeof value === "string" ? (
      <span className="text-[16px] leading-[19.2px] text-primary-2600 font-medium">
        {value}
      </span>
    ) : (
      value
    )}
  </div>
);

const LWAgentCard = ({
  agent: { creator, id, last7dPnl, name, users, winRate },
  actions,
  actionIdentifier,
  variant = "primary",
}: AgentCardProps) => {
  // Properly define the case where the current user is the creator of the agent
  const isCreator = creator.username === "creator";

  const stats: Array<AgentStat> = [
    { title: "Win rate", value: `${winRate}%` || "0%" },
    { title: "Users", value: formatNumberWithSuffix(users || 0) },
    {
      title: "Last 7D PnL",
      value: (
        <span
          className={classNames("text-[16px] leading-[19.2px] font-medium", {
            "text-primary-2700": last7dPnl > 0,
            "text-[#AF1D38]": last7dPnl < 0,
          })}
        >
          {`${last7dPnl > 0 ? "+" : ""}${last7dPnl}%`}
        </span>
      ),
    },
  ];

  const handleAction = (actionIdentifier: TableActionIdentifier) => {
    switch (actionIdentifier) {
      case "grant":
        actions?.grant?.(id);
        break;
      case "pause":
        actions?.pause?.(id);
        break;
      case "revoke":
        actions?.revoke?.(id);
        break;
      case "start":
        actions?.start?.(id);
        break;
    }
  };

  return (
    <div
      className={classNames({
        "self-stretch p-6 flex flex-col lg:flex-row items-center lg:justify-between lg:gap-20 gap-[18px] rounded-2xl border border-primary-150 bg-white":
          variant === "primary",
        "self-stretch p-6 flex flex-col items-center gap-9 rounded-2xl border border-primary-150 bg-white":
          variant === "secondary",
      })}
    >
      <div
        className={classNames({
          "w-full lg:w-auto flex lg:block items-center justify-between":
            variant === "primary",
          "w-full flex items-center justify-between": variant === "secondary",
        })}
      >
        <div className="flex items-center gap-2">
          <Image
            src={creator.pfp}
            alt="User Avatar"
            width={56}
            height={56}
            quality={100}
            className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover"
          />

          <div className={classNames({ "flex flex-col gap-2": !isCreator })}>
            <h2 className="text-primary-2350 text-[16px] leading-[19.2px] lg:text-[20px] lg:leading-[23.2px] font-medium">
              {name}
            </h2>

            {!isCreator && (
              <div className="flex items-center gap-1 text-[11px] leading-[13.64px] lg:text-[12px] lg:leading-[15.84px]">
                <span className="text-primary-100">Creator:</span>

                <span className="text-primary-350">@{creator.username}</span>

                <Image
                  src="/images/farcaster.png"
                  alt="farcaster logo"
                  width={13}
                  height={13}
                  quality={100}
                  className="w-[13px] h-[13px] object-cover rounded-full"
                />
              </div>
            )}
          </div>
        </div>

        <a
          href="#"
          target="_blank"
          className={classNames({ "lg:hidden w-fit": variant === "primary" })}
        >
          <ExternalLinkIcon />
        </a>
      </div>

      <div
        className={classNames("flex items-center justify-between w-full", {
          "lg:gap-10 lg:w-auto": variant === "primary",
          "gap-7": variant === "secondary",
        })}
      >
        <AgentStat {...stats[0]} />

        <div className="w-[1px] h-4 bg-primary-2450" />

        <AgentStat {...stats[1]} />

        <div className="w-[1px] h-4 bg-primary-2450" />

        <AgentStat {...stats[2]} />
      </div>

      {variant === "primary" && (
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <LWClickAnimation
            onClick={() => handleAction(actionIdentifier!)}
            className={classNames(
              "w-full h-[40px] lg:w-[150px] lg:h-[45px] flex items-center justify-center rounded-2xl",
              {
                "bg-primary-1550": actionIdentifier === "revoke",
                "bg-primary-600": actionIdentifier === "pause",
                "bg-primary-700":
                  actionIdentifier === "grant" || actionIdentifier === "start",
              }
            )}
          >
            <span
              className={classNames(
                "text-[16px] leading-[16px] font-semibold capitalize",
                {
                  "text-primary-1350": actionIdentifier === "revoke",
                  "text-primary-950": actionIdentifier === "pause",
                  "text-primary-2700":
                    actionIdentifier === "grant" ||
                    actionIdentifier === "start",
                }
              )}
            >
              {actionIdentifier}
            </span>
          </LWClickAnimation>

          <a href="#" target="_blank" className="hidden lg:block">
            <ExternalLinkIcon />
          </a>
        </div>
      )}
    </div>
  );
};

export default LWAgentCard;

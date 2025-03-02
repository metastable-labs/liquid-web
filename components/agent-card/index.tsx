import Image from "next/image";
import classNames from "classnames";

import { formatNumberWithSuffix } from "@/utils/helpers";
import { ExternalLinkIcon } from "@/public/icons";
import LWClickAnimation from "../click-animation";

const AgentStat = ({ title, value, isIntro, variant }: AgentStat) => (
  <div
    className={classNames("flex flex-col", {
      "gap-2": !isIntro,
      "gap-[3px]": isIntro && variant === "primary",
      "gap-1": isIntro && variant === "secondary",
    })}
  >
    <span
      className={classNames("text-primary-100 whitespace-nowrap", {
        "text-[12px] leading-[15.84px] lg:text-[15px] lg:leading-[19.8px]":
          !isIntro,
        "text-[6.93px] leading-[9.148px]": isIntro && variant === "primary",
        "text-[12px] leading-[15.84px]": isIntro && variant === "secondary",
      })}
    >
      {title}
    </span>

    {typeof value === "string" ? (
      <span
        className={classNames("text-primary-2600 font-medium", {
          "text-[16px] leading-[19.2px]": !isIntro,
          "text-[7.392px] leading-[8.87px]": isIntro && variant === "primary",
          "text-[14px] leading-[17px]": isIntro && variant === "secondary",
        })}
      >
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
  isIntro = false,
  backgroundColor,
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
          className={classNames("font-medium", {
            "text-primary-2700": last7dPnl > 0,
            "text-[#AF1D38]": last7dPnl < 0,
            "text-[16px] leading-[19.2px]": !isIntro,
            "text-[7.392px] leading-[8.87px]": isIntro,
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
      className={classNames("transition-all duration-500", {
        "self-stretch flex flex-col lg:flex-row items-center gap-[18px] border border-primary-150 bg-white":
          variant === "primary",
        "p-6 lg:gap-20 lg:justify-between rounded-2xl":
          variant === "primary" && !isIntro,
        "p-[11px] justify-between rounded-[7px]":
          variant === "primary" && isIntro,
        "self-stretch flex flex-col items-center border border-primary-150 bg-white hover:shadow-agentLog":
          variant === "secondary",
        "p-6 gap-9 rounded-2xl": variant === "secondary" && !isIntro,
        "p-3 gap-4 rounded-xl h-[136px] justify-between w-[246px]":
          variant === "secondary" && isIntro,
      })}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className={classNames({
          "w-full lg:w-auto flex lg:block items-center justify-between":
            variant === "primary",
          "flex items-center justify-between": variant === "secondary",
          "w-full": !isIntro,
        })}
      >
        <div className="flex items-center gap-2">
          <Image
            src={creator.pfp}
            alt="User Avatar"
            width={56}
            height={56}
            quality={100}
            className={classNames("rounded-full object-cover", {
              "w-10 h-10 lg:w-14 lg:h-14": !isIntro,
              "w-[25px] h-[25px]": isIntro && variant === "primary",
              "w-10 h-10": isIntro && variant === "secondary",
            })}
          />

          <div className={classNames({ "flex flex-col gap-2": !isCreator })}>
            <h2
              className={classNames("text-primary-2350 font-medium", {
                "text-[16px] leading-[19.2px] lg:text-[20px] lg:leading-[23.2px]":
                  !isIntro,
                "text-[9.24px] leading-[10.718px]":
                  isIntro && variant === "primary",
                "text-[16px] leading-[19.2px]":
                  isIntro && variant === "secondary",
              })}
            >
              {name}
            </h2>

            {!isCreator && (
              <div
                className={classNames("flex items-center", {
                  "gap-1 lg:text-[12px] lg:leading-[15.84px]": !isIntro,
                  "gap-0.5 text-[11px] leading-[13.64px]": isIntro,
                })}
              >
                <span className="text-primary-100">Creator:</span>

                <span className="text-primary-350">@{creator.username}</span>

                {!isIntro && (
                  <Image
                    src="/images/farcaster.png"
                    alt="farcaster logo"
                    width={13}
                    height={13}
                    quality={100}
                    className="w-[13px] h-[13px] object-cover rounded-full"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className={classNames({ "lg:hidden w-fit": variant === "primary" })}
        >
          <ExternalLinkIcon width={20} height={20} />
        </div>
      </div>

      <div
        className={classNames("flex items-center justify-between w-full ", {
          "lg:gap-10 lg:w-auto": variant === "primary" && !isIntro,
          "gap-7": variant === "secondary" && !isIntro,
          "gap-4": isIntro,
        })}
      >
        <AgentStat isIntro={isIntro} {...stats[0]} variant={variant} />

        <div
          className={classNames("bg-primary-2450", {
            "w-[1px] h-4": !isIntro,
            "w-[1px] h-[7px] bg-primary-2450": isIntro && variant === "primary",
            "w-[1px] h-3 bg-primary-2450": isIntro && variant === "secondary",
          })}
        />

        <AgentStat isIntro={isIntro} {...stats[1]} variant={variant} />

        <div
          className={classNames("bg-primary-2450", {
            "w-[1px] h-4": !isIntro,
            "w-[1px] h-[7px] bg-primary-2450": isIntro && variant === "primary",
            "w-[1px] h-3 bg-primary-2450": isIntro && variant === "secondary",
          })}
        />

        <AgentStat isIntro={isIntro} {...stats[2]} variant={variant} />
      </div>

      {variant === "primary" && (
        <div
          className={classNames({
            "flex items-center gap-3 w-full lg:w-auto": !isIntro,
          })}
        >
          {!isIntro && (
            <LWClickAnimation
              onClick={() => handleAction(actionIdentifier!)}
              className={classNames(
                "w-full h-[40px] lg:w-[150px] lg:h-[45px] flex items-center justify-center rounded-2xl",
                {
                  "bg-primary-1550": actionIdentifier === "revoke",
                  "bg-primary-600": actionIdentifier === "pause",
                  "bg-primary-700":
                    actionIdentifier === "grant" ||
                    actionIdentifier === "start",
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
          )}

          <div className="hidden lg:block">
            <ExternalLinkIcon
              width={isIntro ? 11 : undefined}
              height={isIntro ? 11 : undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LWAgentCard;

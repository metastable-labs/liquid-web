import Image from "next/image";
import classNames from "classnames";

import { formatNumberWithSuffix } from "@/utils/helpers";
import { ExternalLinkIcon } from "@/public/icons";
import { LWClickAnimation } from "@/components";
import Link from "next/link";
import useAgentActions from "@/store/agent/actions";

const AgentStat = ({ title, value }: AgentStat) => (
  <div className="flex flex-col gap-2">
    <span className="text-primary-100 whitespace-nowrap text-[12px] leading-[15.84px] lg:text-[15px] lg:leading-[19.8px]">
      {title}
    </span>

    {typeof value === "string" ? (
      <span className="text-primary-2600 font-medium text-[16px] leading-[19.2px]">
        {value}
      </span>
    ) : (
      value
    )}
  </div>
);

const AgentItem = ({ creator, id, last7dPnl, name, users, winRate }: Agent) => {
  const { delegateOrUndelegate } = useAgentActions();

  const handleAction = () => {
    delegateOrUndelegate(id, false, "BASE");
    // delegateOrUndelegate(id, false, "SOLANA");
  };

  const last7dpnlIsPositive = last7dPnl && last7dPnl > 0;

  const stats: Array<AgentStat> = [
    { title: "Win rate", value: `${winRate}%` || "0%" },
    { title: "Users", value: formatNumberWithSuffix(users || 0) },
    {
      title: "Last 7D PnL",
      value: (
        <span
          className={classNames("font-medium text-[16px] leading-[19.2px]", {
            "text-primary-2700": last7dpnlIsPositive,
            "text-[#AF1D38]": !last7dpnlIsPositive,
          })}
        >
          {`${last7dpnlIsPositive ? "+" : ""}${last7dPnl}%`}
        </span>
      ),
    },
  ];

  return (
    <div className="transition-all duration-500 self-stretch flex flex-col lg:flex-row lg:justify-between items-center gap-[18px] border border-primary-150 bg-white p-6 rounded-2xl">
      <Link
        href={`/${id}`}
        className="w-full lg:w-auto flex lg:block items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Image
            src={creator.pfp}
            alt="User Avatar"
            width={56}
            height={56}
            quality={100}
            className="rounded-full object-cover w-10 h-10 lg:w-14 lg:h-14"
          />

          <div className="flex flex-col gap-2">
            <h2 className="text-primary-2350 font-medium text-[16px] leading-[19.2px] lg:text-[20px] lg:leading-[23.2px]">
              {name}
            </h2>

            <div className="flex items-center gap-1 lg:text-[12px] lg:leading-[15.84px]">
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
          </div>
        </div>

        <div className="lg:hidden w-fit">
          <ExternalLinkIcon width={20} height={20} />
        </div>
      </Link>

      <div className="flex items-center justify-between w-full lg:gap-10 lg:w-auto">
        <AgentStat {...stats[0]} />

        <div className="bg-primary-2450 w-[1px] h-4" />

        <AgentStat {...stats[1]} />

        <div className="bg-primary-2450 w-[1px] h-4" />

        <AgentStat {...stats[2]} />
      </div>

      <div className="flex items-center gap-3 w-full lg:w-auto">
        <LWClickAnimation
          onClick={handleAction}
          className="w-full h-[40px] lg:w-[150px] lg:h-[45px] flex items-center justify-center rounded-2xl bg-primary-1550"
        >
          <span className="text-[16px] leading-[16px] font-semibold capitalize text-primary-1350">
            Revoke
          </span>
        </LWClickAnimation>

        <Link href={`/${id}`} className="hidden lg:block">
          <ExternalLinkIcon />
        </Link>
      </div>
    </div>
  );
};

export default AgentItem;

import Link from "next/link";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import {
  LWAgentCard,
  LWAgentCardSkeleton,
  LWClickAnimation,
} from "@/components";
import classNames from "classnames";
import { ArrowLeftIcon } from "@/public/icons";

const ExploreAgents = ({ loading, seeAll }: ExploreAgentsProps) => {
  const {
    agentState: { agents, agentsMeta, loadingAgents },
  } = useSystemFunctions();

  const agents_: Array<Agent> =
    agents?.map((agent) => ({
      name: agent?.name,
      creator: agent.creator,
      goal: agent?.goal,
      id: agent?.id,
      last7dPnl: agent.last7dPnl,
      totalPnl: agent.totalPnl,
      token: {
        agentId: agent?.token.agentId,
        name: agent?.token.name,
        symbol: "MHN",
        locked: "100",
        marketCap: "100",
        status: "active",
      },
      type: agent.type,
      users: agent.users,
      winRate: agent.winRate,
      active: true,
    })) || [];

  const showSkeleton = seeAll ? loading : loadingAgents && !agents;
  const showAgents = Boolean(agents_.length) && !loadingAgents;
  const showEmptyState = !loadingAgents && agents_.length === 0;
  const showSeeAll = Number(agentsMeta?.totalItems) > 12;

  return (
    <div
      className={classNames(
        "flex flex-col items-stretch gap-6 lg:self-center self-stretch pb-10",
        {
          "max-w-[1077px]": !seeAll,
          "w-full": seeAll,
        }
      )}
    >
      {!seeAll && (
        <div className="flex items-center justify-between">
          <h1
            className={classNames(
              "text-[15px] leading-[19.8px] font-medium text-primary-1700",
              {
                "text-center": showEmptyState,
              }
            )}
          >
            Explore Agents from the community
          </h1>

          {showSeeAll && (
            <Link href="/explore">
              <LWClickAnimation className="flex items-center justify-center gap-1 w-fit">
                <span className="text-[15px] leading-[19.84px] text-primary-950 font-medium">
                  See all
                </span>

                <div className="rotate-180">
                  <ArrowLeftIcon width={24} height={24} fill="#0F172A" />
                </div>
              </LWClickAnimation>
            </Link>
          )}
        </div>
      )}

      {showEmptyState ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <p className="text-[16px] leading-[19.2px] text-gray-500">
            No agents found.
          </p>
          <p className="mt-2 text-[14px] leading-[16.8px] text-gray-400">
            Please check back later or try refreshing the page.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {showAgents &&
            agents_.map((agent, index) => (
              <Link href={`/${agent?.id}`} key={index}>
                <LWAgentCard agent={agent} variant="secondary" />
              </Link>
            ))}

          {showSkeleton &&
            Array.from({ length: seeAll ? 12 : 9 }).map((_, index) => (
              <LWAgentCardSkeleton key={index} variant="secondary" />
            ))}
        </div>
      )}
    </div>
  );
};

export default ExploreAgents;

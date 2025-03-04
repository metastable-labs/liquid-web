import { useEffect, useState } from "react";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { LWSelect } from "@/components";
import { ArrowLeftIcon } from "@/public/icons";
import useAgentActions from "@/store/agent/actions";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import ExploreAgents from "../create/explore-agents";

type SelectOption = {
  title: string;
  value: string;
};

const sortOptions: Array<SelectOption> = [
  { title: "Top rated", value: "top" },
  { title: "Highest to lowest", value: "htl" },
  { title: "Lowest to highest", value: "lth" },
];

const metricOptions: Array<SelectOption> = [
  { title: "All", value: "all" },
  { title: "PnL", value: "pnl" },
  { title: "Users", value: "users" },
  { title: "Win rate", value: "wr" },
];

const Explore = () => {
  const {
    navigate,
    agentState: { agentsMeta, agents, loadingAgents },
  } = useSystemFunctions();
  const { fetchAgents } = useAgentActions();

  const [sortFilter, setSortFilter] = useState<string>(sortOptions[0].value);
  const [metricFilter, setMetricFilter] = useState<string>(
    metricOptions[0].value
  );

  const hasMoreData =
    agentsMeta && agents && agents.length < agentsMeta.totalItems;

  const shouldFetchMore = useInfiniteScroll(hasMoreData || false);

  useEffect(() => {
    if (!agents) fetchAgents(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldFetchMore && agentsMeta && agentsMeta.nextPage) {
      fetchAgents(agentsMeta.nextPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore]);

  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => navigate.back()}
        className="hidden w-fit lg:flex items-center gap-1"
      >
        <ArrowLeftIcon fill="#334155" width={24} height={24} />
        <span className="text-[15px] leading-[19.8px] font-medium text-primary-2350">
          Back home
        </span>
      </button>

      <div className="flex items-center justify-between">
        <h1 className="text-[32px] leading-[35.84px] text-primary-1700 font-bold font-QuantaGroteskPro">
          Explore Agents
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-[15px] leading-[19.8px] text-primary-1700 font-medium">
            Filter by:
          </span>

          <div className="flex items-center gap-2">
            <LWSelect
              defaultValue={sortOptions[0].value}
              onClick={(value) => setSortFilter(value)}
              options={sortOptions}
            />

            <div className="w-[1px] h-5 bg-primary-150" />

            <LWSelect
              defaultValue={metricOptions[0].value}
              onClick={(value) => setMetricFilter(value)}
              options={metricOptions}
            />
          </div>
        </div>
      </div>

      <ExploreAgents seeAll loading={shouldFetchMore || loadingAgents} />
    </div>
  );
};

export default Explore;

"use client";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useAgentActions from "@/store/agent/actions";
import { AgentIconActive } from "@/public/icons";
import AgentsMap from "./agents-map";

const Agents = () => {
  const {
    agentState: { myAgentsMeta, myAgents, loadingMyAgents },
  } = useSystemFunctions();
  const { fetchMyAgents } = useAgentActions();
  const { ready, authenticated, user } = usePrivy();

  const address = user?.wallet?.address;

  const hasMoreData =
    myAgentsMeta && myAgents && myAgents.length < myAgentsMeta.totalItems;

  const shouldFetchMore = useInfiniteScroll(hasMoreData || false);

  useEffect(() => {
    fetchMyAgents(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (shouldFetchMore && myAgentsMeta) {
      fetchMyAgents(myAgentsMeta.nextPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchMore]);

  if (!ready) return null;

  if (ready && (!authenticated || !address))
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <p className="text-lg font-medium text-gray-600">
          Please sign in to view your agents.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Authentication is required to access your personalized agents.
        </p>
      </div>
    );

  return (
    <div className="lg:p-6 flex flex-col gap-10 lg:gap-[70px] max-w-[940px]">
      <div className="py-3 px-4 rounded-[26px] border border-primary-550 bg-primary-600 flex items-center gap-6 w-full">
        <AgentIconActive width={40} height={40} fill="#F17B2B" />

        <div className="flex flex-col justify-center gap-[5px]">
          <h2 className="text-primary-50 text-[16px] leading-[19.2px] lg:text-[20px] lg:leading-[23.2px] font-medium">
            My Agents
          </h2>
          <p className="text-primary-100 text-[11px] leading-[13.64px] lg:text-[12px] lg:leading-[15.84px]">
            Here you can see and manage all the agents’s you’ve created on
            Liquid
          </p>
        </div>
      </div>

      <AgentsMap loading={shouldFetchMore || loadingMyAgents} />
    </div>
  );
};

export default Agents;

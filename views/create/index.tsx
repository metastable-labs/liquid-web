import { useEffect } from "react";
import Image from "next/image";

import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useAgentActions from "@/store/agent/actions";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import ExploreAgents from "./explore-agents";

const Create = () => {
  const {
    agentState: { agentsMeta, agents, loadingAgents },
  } = useSystemFunctions();
  const { fetchAgents } = useAgentActions();

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
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-center space-y-10 lg:-space-y-3">
        <Image
          src="/images/coming-soon.png"
          alt="Coming soon"
          width={500}
          height={500}
          quality={100}
          className="w-full h-[297px] hidden lg:block"
        />

        <Image
          src="/images/mobile-coming-soon.png"
          alt="Coming soon"
          width={500}
          height={500}
          quality={100}
          className="w-full h-fit lg:hidden"
        />

        <p className="text-[18px] leading-[22.32px] text-primary-1700 text-center max-w-xl">
          Creation of Agent coming soon. For now, go to farcaster and tag{" "}
          <span>
            <a
              href="https://warpcast.com/liquidapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400"
            >
              @liquidapp
            </a>
          </span>
          , with your prompt and an Agent will be created for you.
        </p>
      </div>

      <ExploreAgents />
    </div>
  );
};

export default Create;

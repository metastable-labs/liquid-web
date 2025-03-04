import { LWAgentCard, LWAgentCardSkeleton } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const AgentsMap = ({ loading }: { loading: boolean }) => {
  const {
    agentState: { myAgents },
  } = useSystemFunctions();

  const showEmptyState = !loading && myAgents && myAgents.length === 0;

  return (
    <div className="flex flex-col gap-6 items-stretch pb-10">
      {loading ? (
        Array.from({ length: 9 }).map((_, index) => (
          <LWAgentCardSkeleton key={index} />
        ))
      ) : showEmptyState ? (
        <div className="flex flex-col items-center justify-center w-full py-10">
          <p className="text-[16px] leading-[19.2px] text-gray-500">
            {"You haven't created any agents yet."}
          </p>
          <p className="mt-2 text-[14px] leading-[16.8px] text-gray-400">
            Once you create an agent, they will appear here.
          </p>
        </div>
      ) : (
        myAgents?.map((agent) => (
          <LWAgentCard
            key={agent.id}
            agent={agent}
            actionIdentifier={agent.active ? "pause" : "start"}
            actions={{ revoke: (id: string) => console.log(id) }}
          />
        ))
      )}
    </div>
  );
};

export default AgentsMap;

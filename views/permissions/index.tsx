import { LWAgentCardSkeleton } from "@/components";
import { PermissionsIconActive } from "@/public/icons";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAgentActions from "@/store/agent/actions";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import AgentItem from "./item";

const Permissions = () => {
  const {
    agentState: { delegatedAgents, loadingDelegatedAgents },
  } = useSystemFunctions();
  const { fetchDelegatedAgents } = useAgentActions();
  const { ready, authenticated, user } = usePrivy();

  const address = user?.wallet?.address;

  const showEmptyState =
    !loadingDelegatedAgents &&
    (!delegatedAgents || delegatedAgents?.length === 0);

  const showSkeleton = !delegatedAgents && loadingDelegatedAgents;

  useEffect(() => {
    fetchDelegatedAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!ready) return null;

  if (ready && (!authenticated || !address))
    return (
      <div className="flex flex-col items-center justify-center h-full py-20">
        <p className="text-lg font-medium text-gray-600">
          Please sign in to view your delegated agents.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Authentication is required to access your delegated agents.
        </p>
      </div>
    );

  return (
    <div className="lg:p-6 flex flex-col gap-10 lg:gap-[70px] max-w-[940px]">
      <div className="py-3 px-4 rounded-[26px] border border-primary-550 bg-primary-600 flex items-center gap-6 w-full">
        <PermissionsIconActive width={40} height={40} fill="#F17B2B" />

        <div className="flex flex-col justify-center gap-[5px]">
          <h2 className="text-primary-50 text-[16px] leading-[19.2px] lg:text-[20px] lg:leading-[23.2px] font-medium">
            Permissions
          </h2>
          <p className="text-primary-100 text-[11px] leading-[13.64px] lg:text-[12px] lg:leading-[15.84px]">
            Here you can manage your permissions,. Revoke or Grant access to
            Agents.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-stretch pb-10">
        {showSkeleton ? (
          Array.from({ length: 9 }).map((_, index) => (
            <LWAgentCardSkeleton key={index} />
          ))
        ) : showEmptyState ? (
          <div className="flex flex-col items-center justify-center w-full py-10">
            <p className="text-[16px] leading-[19.2px] text-gray-500">
              {"You haven't delegated actions to any agents yet."}
            </p>
            <p className="mt-2 text-[14px] leading-[16.8px] text-gray-400">
              Once you delegate an agent, it will appear here.
            </p>
          </div>
        ) : (
          delegatedAgents?.map((agent) => (
            <AgentItem key={agent.id} {...agent} />
          ))
        )}
      </div>
    </div>
  );
};

export default Permissions;

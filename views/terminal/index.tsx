"use client";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

import Loading from "@/components/ui/loading";
import ModalWrapper from "@/components/modal/modal-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import useAgentActions from "@/store/agent/actions";
import AgentLog from "./agent-log";
import GrantPermission from "./grant-permission";
import WhyGrantPermission from "./why-grant-permission";
import AgentInfos from "./infos";
import AgentOverview from "./agent-overview";
import classNames from "classnames";

const Terminal = () => {
  const { fetchDelegationDetails } = useAgentActions();
  const { appState, agentState } = useSystemFunctions();
  const { showGrantPermission } = useAppActions();
  const { ready, user } = usePrivy();
  const agent = agentState.agent;

  const permissionGranted =
    user?.wallet?.delegated && agentState.delegationDetails?.isActive;

  useEffect(
    function getDelegationInfo() {
      if (!agent?.id || !ready) return;

      fetchDelegationDetails(agent?.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [agent, ready]
  );

  if (agentState.loadingAgent || agentState.loadingDelegationDetails) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={classNames("w-full flex flex-col gap-14 pb-10", {
          "max-w-[1020px]": user,
          "px-5": !user,
        })}
      >
        <div
          className={classNames(
            "flex flex-col lg:flex-row items-stretch gap-[30px]"
          )}
        >
          <AgentOverview />

          <AgentInfos />
        </div>

        <WhyGrantPermission />
      </div>

      <ModalWrapper
        title={permissionGranted ? "Revoke Permission" : "Grant Permission"}
        isOpen={appState.openGrantPermission}
        onClose={() => showGrantPermission(false)}
        enlargeTitle
      >
        <GrantPermission />
      </ModalWrapper>

      <AgentLog />
    </>
  );
};

export default Terminal;

"use client";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";

import Loading from "@/components/ui/loading";
import { LWButton } from "@/components";
import ModalWrapper from "@/components/modal/modal-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import useAgentActions from "@/store/agent/actions";
import AgentLog from "./agent-log";
import GrantPermission from "./grant-permission";
import WhyGrantPermission from "./why-grant-permission";
import AgentInfos from "./infos";
import AgentHeader from "./agent-header";

const Terminal = () => {
  const { fetchDelegationDetails } = useAgentActions();
  const { navigate, appState, agentState, dispatch } = useSystemFunctions();
  const { showGrantPermission } = useAppActions();
  const { ready, user } = usePrivy();
  const agent = agentState.agent;

  const permissionGranted =
    user?.wallet?.delegated && agentState.delegationDetails?.isActive;

  const actions: Array<ILWButton> = [
    {
      title: `Trade $${agent?.token.symbol}`,
      onClick: () => navigate.push(`/${agent?.id}/trade`),
      variant: "secondary",
    },
    {
      title: `${permissionGranted ? "Revoke" : "Grant Permission"}`,
      onClick: () => showGrantPermission(true),
      variant: "primaryAlt",
    },
  ];

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
      <div className="w-full px-5 mt-10 flex flex-col gap-14 pb-10">
        <div className="flex flex-col gap-6">
          <AgentHeader />

          <div className="self-stretch p-6 border border-primary-150 bg-white rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <p className="max-w-[504px] text-[clamp(15px,5vw,18px)] leading-[clamp(18px,5vw,23.76px)] text-primary-100 font-medium">
              Welcome to Agent {agent?.name}’s terminal. Here, you can grant{" "}
              {agent?.name} access to your wallet to achieve its goal or you can
              buy and sell Agent’s token.
            </p>

            <div className="flex flex-col-reverse md:flex-row md:items-center gap-6">
              {ready &&
                actions.map((action, index) => (
                  <LWButton
                    key={index}
                    title={action.title}
                    onClick={action.onClick}
                    variant={action.variant}
                    className="w-full md:w-auto"
                  />
                ))}
            </div>
          </div>

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

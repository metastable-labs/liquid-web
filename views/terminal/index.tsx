"use client";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import classNames from "classnames";

import ModalWrapper from "@/components/modal/modal-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import { BlueInfoIcon } from "@/public/icons";
import useAgentActions from "@/store/agent/actions";
import { setDelegationDetails } from "@/store/agent";
import { usePermissionStatus } from "@/hooks/usePermissionStatus";
import AgentLog from "./agent-log";
import Permission from "./grant-permission";
import WhyGrantPermission from "./why-grant-permission";
import AgentInfos from "./infos";
import AgentOverview from "./agent-overview";
import TerminalSkeleton from "./skeleton";
import AccessDenied from "./access-denied";
import useWalletActions from "@/store/wallet/actions";

const Terminal = () => {
  const { appState, agentState, dispatch } = useSystemFunctions();
  const { showGrantPermission, showAccessDeniedModal } = useAppActions();
  const { fetchDelegationDetails } = useAgentActions();
  const { user } = usePrivy();
  const { fetchWallet } = useWalletActions();
  const { delegationDetails, agent, loadingAgent } = agentState;
  const isPermissionGranted = usePermissionStatus(delegationDetails);

  const modals = [
    {
      title: isPermissionGranted ? "Revoke Permission" : "Grant Permission",
      isOpen: appState.openGrantPermission,
      onClose: () => showGrantPermission(false),
      children: <Permission />,
    },
    {
      title: "You’re not whitelisted",
      isOpen: appState.openAccessDenied,
      onClose: () => showAccessDeniedModal(false),
      children: <AccessDenied />,
    },
  ];

  useEffect(() => {
    dispatch(setDelegationDetails(undefined));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchWallet();

    if (!agent) return;

    fetchDelegationDetails(agent.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent, user]);

  return (
    <>
      <div
        className={classNames("w-full flex flex-col gap-2.5 pb-10", {
          "max-w-[1020px]": user,
          "lg:px-5": !user,
        })}
      >
        <div className="flex items-center gap-3 px-3.5 pt-3.5 pb-4 rounded-xl bg-primary-1750 self-stretch w-full">
          <div className="w-fit">
            <BlueInfoIcon />
          </div>

          <p className="text-[14px] leading-[18.48px] text-primary-1500">
            Liquid is currently in beta and may occasionally make mistakes. Use
            at your own risk. At this stage, Liquid supports only Base.
          </p>
        </div>

        {loadingAgent && <TerminalSkeleton />}

        {!loadingAgent && (
          <div className="w-full flex flex-col gap-14">
            <div className="flex flex-col xl:flex-row items-stretch gap-[30px]">
              <AgentOverview />

              <AgentInfos />
            </div>

            <WhyGrantPermission />
          </div>
        )}
      </div>

      {modals.map((modal, index) => (
        <ModalWrapper key={index} {...modal} enlargeTitle />
      ))}

      {agent?.id && <AgentLog agentId={agent.id} />}
    </>
  );
};

export default Terminal;

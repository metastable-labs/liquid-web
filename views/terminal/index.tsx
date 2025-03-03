"use client";
import { usePrivy } from "@privy-io/react-auth";
import classNames from "classnames";

import ModalWrapper from "@/components/modal/modal-wrapper";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAppActions from "@/store/app/actions";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";
import AgentLog from "./agent-log";
import GrantPermission from "./grant-permission";
import WhyGrantPermission from "./why-grant-permission";
import AgentInfos from "./infos";
import AgentOverview from "./agent-overview";
import { useEffect, useState } from "react";
import TerminalSkeleton from "./skeleton";
import AccessDenied from "./access-denied";
import useAgentActions from "@/store/agent/actions";

const Terminal = () => {
  const { appState, agentState } = useSystemFunctions();
  const { showGrantPermission, showAccessDeniedModal } = useAppActions();
  const { fetchDelegationDetails } = useAgentActions();
  const { user, ready } = usePrivy();
  const { solanaWallet, evmWallet } = useLinkedAccounts();
  const { delegationDetails, agent, loadingAgent } = agentState;

  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const modals = [
    {
      title: isPermissionGranted ? "Revoke Permission" : "Grant Permission",
      isOpen: appState.openGrantPermission,
      onClose: () => showGrantPermission(false),
      children: <GrantPermission />,
    },
    {
      title: "You’re not whitelisted",
      isOpen: appState.openAccessDenied,
      onClose: () => showAccessDeniedModal(false),
      children: <AccessDenied />,
    },
  ];

  useEffect(() => {
    const permissionGranted =
      user && ready
        ? evmWallet?.delegated &&
          (appState.isSolanaSupported ? solanaWallet?.delegated : true) &&
          (delegationDetails ? delegationDetails[0]?.isActive : false)
        : false;

    setIsPermissionGranted(permissionGranted);
  }, [
    user,
    ready,
    delegationDetails,
    evmWallet,
    solanaWallet,
    appState.isSolanaSupported,
  ]);

  useEffect(() => {
    if (!agent || !user) return;

    fetchDelegationDetails(agent.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent, user]);

  return (
    <>
      <div
        className={classNames("w-full flex flex-col gap-14 pb-10", {
          "max-w-[1020px]": user,
          "px-5": !user,
        })}
      >
        {loadingAgent && <TerminalSkeleton />}

        {!loadingAgent && (
          <>
            <div className="flex flex-col xl:flex-row items-stretch gap-[30px]">
              <AgentOverview />

              <AgentInfos />
            </div>

            <WhyGrantPermission />
          </>
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

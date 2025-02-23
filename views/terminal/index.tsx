"use client";
import { useEffect } from "react";
import { usePrivy } from "@privy-io/react-auth";
import classNames from "classnames";

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

const Terminal = () => {
  const { fetchDelegationDetails } = useAgentActions();
  const { appState, agentState } = useSystemFunctions();
  const { showGrantPermission } = useAppActions();
  const { ready, user } = usePrivy();
  const agent = agentState.agent;

  const solanaWallet: any = user?.linkedAccounts.find(
    (account) =>
      account.type === "wallet" &&
      account.chainType === "solana" &&
      account.walletClientType === "privy"
  );

  const evmWallet: any = user?.linkedAccounts.find(
    (account) =>
      account.type === "wallet" &&
      account.chainType === "ethereum" &&
      account.walletClientType === "privy"
  );

  const permissionGranted =
    evmWallet?.delegated &&
    solanaWallet?.delegated &&
    agentState.delegationDetails?.isActive;

  const loading =
    agentState.loadingAgent ||
    (!agentState.delegationDetails && agentState.loadingDelegationDetails);

  useEffect(
    function getDelegationInfo() {
      if (!agent?.id || !ready) return;

      fetchDelegationDetails(agent?.id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [agent, ready]
  );

  return (
    <>
      <div
        className={classNames("w-full flex flex-col gap-14 pb-10", {
          "max-w-[1020px]": user,
          "px-5": !user,
        })}
      >
        {loading && (
          <div className="flex flex-col xl:flex-row items-stretch">
            <Loading />
          </div>
        )}

        {!loading && (
          <>
            <div className="flex flex-col xl:flex-row items-stretch gap-[30px]">
              <AgentOverview />

              <AgentInfos />
            </div>

            <WhyGrantPermission />
          </>
        )}
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

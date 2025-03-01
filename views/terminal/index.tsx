"use client";
import { usePrivy } from "@privy-io/react-auth";
import classNames from "classnames";

import Loading from "@/components/ui/loading";
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
import Spinner from "@/components/ui/spinner";

const Terminal = () => {
  const { appState, agentState } = useSystemFunctions();
  const { showGrantPermission } = useAppActions();
  const { user, ready } = usePrivy();
  const { solanaWallet, evmWallet } = useLinkedAccounts();
  const { delegationDetails, agent } = agentState;

  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  const loading =
    agentState.loadingAgent ||
    (!agentState.delegationDetails && agentState.loadingDelegationDetails);

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

  return (
    <>
      <div
        className={classNames("w-full flex flex-col gap-14 pb-10", {
          "max-w-[1020px]": user,
          "px-5": !user,
        })}
      >
        {loading && (
          <div className="flex items-center justify-center h-[70vh]">
            <Spinner />
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
        title={isPermissionGranted ? "Revoke Permission" : "Grant Permission"}
        isOpen={appState.openGrantPermission}
        onClose={() => showGrantPermission(false)}
        enlargeTitle
      >
        <GrantPermission />
      </ModalWrapper>

      {agent?.id && <AgentLog agentId={agent.id} />}
    </>
  );
};

export default Terminal;

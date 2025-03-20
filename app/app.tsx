"use client";
import { useEffect } from "react";
import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import {
  LWNavigation,
  LWToastNotification,
  LWToolBar,
  LWSelectNetworkModal,
  LWIntro,
  LWBanner,
  LWShareModal,
} from "@/components";
import UiLoading from "@/components/ui/loading";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useAgentActions from "@/store/agent/actions";

const App = ({ children }: { children: React.ReactNode }) => {
  const { ready, authenticated, user } = usePrivy();
  const { fetchChannelFollowers } = useAgentActions();
  const { appState } = useSystemFunctions();

  const address = user?.wallet?.address || "";

  const showNavigation = ready && authenticated && address;

  useEffect(() => {
    fetchChannelFollowers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={classNames(
          "flex flex-col h-[100dvh] md:h-[96vh] overflow-y-auto no-scrollbar pt-0",
          {
            relative: appState.appIsReady,
          }
        )}
      >
        <LWToolBar />

        {!appState.appIsReady && <UiLoading />}

        {appState.appIsReady && (
          <div
            className={classNames(
              "w-full flex relative lg:border-t-0 lg:rounded-t-none lg:bg-transparent lg:overflow-visible mt-7 p-6 lg:p-0 border-t border-primary-150 rounded-t-[32px] bg-white overflow-y-scroll",
              {
                "lg:items-center lg:justify-center": !showNavigation,
                "lg:gap-[100px] lg:px-5 lg:pt-0": showNavigation,
              }
            )}
          >
            {showNavigation && <LWNavigation />}

            <div
              className={classNames("flex-1 lg:min-h-[345px]", {
                "px-0 lg:px-5": !authenticated || !address,
              })}
            >
              {children}
            </div>
          </div>
        )}
      </div>

      <LWToastNotification />

      <LWSelectNetworkModal />

      <LWIntro />

      <LWBanner />

      <LWShareModal />
    </>
  );
};

export default App;

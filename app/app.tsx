"use client";
import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import {
  LWNavigation,
  LWToastNotification,
  LWToolBar,
  LWSelectNetworkModal,
} from "@/components";
import UiLoading from "@/components/ui/loading";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const App = ({ children }: { children: React.ReactNode }) => {
  const { ready, authenticated, user } = usePrivy();
  const { appState } = useSystemFunctions();

  const address = user?.wallet?.address || "";

  const showNavigation = ready && authenticated && address;

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

            <div className="flex-1">{children}</div>
          </div>
        )}
      </div>

      <LWToastNotification />

      <LWSelectNetworkModal />
    </>
  );
};

export default App;

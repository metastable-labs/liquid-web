"use client";
import { useMemo } from "react";
import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import { LWNavigation, LWToastNotification, LWToolBar } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const mainPages = ["/", "/wallet", "/permissions", "/agents"];

const App = ({ children }: { children: React.ReactNode }) => {
  const { ready, authenticated, user } = usePrivy();
  const { pathname } = useSystemFunctions();

  const address = user?.wallet?.address || "";
  const supportsNavigation = useMemo(() => {
    if (!pathname) return true;

    const pathSegments = pathname.split("/").filter(Boolean);

    if (mainPages.includes(pathname)) return true;

    const isAgentDetailPage =
      pathSegments.length === 1 && /^[a-f0-9-]{36}$/.test(pathSegments[0]);

    const isAgentTradePage =
      pathSegments.length === 2 &&
      /^[a-f0-9-]{36}$/.test(pathSegments[0]) &&
      pathSegments[1] === "trade";

    return !(isAgentDetailPage || isAgentTradePage);
  }, [pathname]);

  const showNavigation =
    supportsNavigation && ready && authenticated && address;

  return (
    <>
      <div className="relative flex flex-col h-[100dvh] md:h-[96vh] overflow-y-auto no-scrollbar pt-0">
        <LWToolBar />

        <div
          className={classNames("w-full flex relative", {
            "items-center justify-center": !showNavigation,
            "lg:gap-[100px] lg:px-5 lg:pt-0 lg:mt-11 lg:border-t-0 lg:rounded-t-none lg:bg-transparent lg:overflow-visible mt-7 p-6 border-t border-primary-150 rounded-t-[32px] bg-white overflow-auto":
              showNavigation,
          })}
        >
          {showNavigation && <LWNavigation />}

          <div className="flex-1">{children}</div>
        </div>
      </div>

      <LWToastNotification />
    </>
  );
};

export default App;

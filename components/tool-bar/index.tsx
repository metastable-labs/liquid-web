"use client";
import { useEffect } from "react";
import Image from "next/image";
import classNames from "classnames";
import { usePrivy } from "@privy-io/react-auth";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { WalletAddIcon } from "@/public/icons";
import { truncateWalletAddress } from "@/utils/helpers";
import { setTokenHeader } from "@/utils/axios";
import useAgentActions from "@/store/agent/actions";
import LWClickAnimation from "../click-animation";
import Menu from "./menu";

const LWToolBar = () => {
  const { pathname } = useSystemFunctions();
  const { ready, authenticated, login, logout, user, getAccessToken } =
    usePrivy();
  const { connectUser } = useAgentActions();

  const address = user?.wallet?.address || "";
  const linkedTwitter = user?.linkedAccounts?.find(
    (account) => account.type === "twitter_oauth"
  );
  const linkedFarcaster = user?.linkedAccounts?.find(
    (account) => account.type === "farcaster"
  );
  const avatar = linkedTwitter?.profilePictureUrl || linkedFarcaster?.pfp || "";
  const isTradeRoute = pathname.split("/")[2] === "trade";

  const authUser = async () => {
    if (!user) return;

    const accessToken = await getAccessToken();

    if (!accessToken) return;

    await setTokenHeader(accessToken);

    setTimeout(() => {
      connectUser();
    }, 1500);
  };

  useEffect(() => {
    authUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <div
      className={classNames(
        "w-full sticky top-0 flex items-center justify-between gap-5 px-5 py-5 xl:bg-transparent z-10 rounded-full min-h-[77px]",
        {
          "bg-primary-2650": isTradeRoute,
          "bg-white": !isTradeRoute,
        }
      )}
      style={{
        background: isTradeRoute
          ? "white"
          : "linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.5) 70%, transparent 100%)",
      }}
    >
      <Image
        src="/images/logo.png"
        alt="Liquid Logo"
        width={119}
        height={24}
        quality={100}
        className="object-cover"
      />

      <div className="flex items-center gap-5">
        <a href="#" target="_blank" className="hidden lg:block">
          <span className="text-[14px] leading-[18.48px] text-primary-50 font-medium">
            How it works?
          </span>
        </a>

        {ready && (!authenticated || !address) && (
          <LWClickAnimation
            onClick={login}
            className="px-4 py-2 w-[100px] flex items-center justify-center rounded-lg border border-primary-550 bg-white"
          >
            <span className="text-[14px] leading-[18.48px] font-medium text-primary-950">
              Sign in
            </span>
          </LWClickAnimation>
        )}

        {ready && authenticated && address && (
          <>
            <LWClickAnimation
              onClick={logout}
              className="p-1.5 lg:flex items-center justify-center gap-2 rounded-[10px] border border-primary-500 bg-primary-600 hidden"
            >
              {avatar && (
                <Image
                  src={avatar}
                  alt={`${avatar} avatar`}
                  width={30}
                  height={30}
                  quality={100}
                  className="w-7 h-7 rounded-full object-cover"
                />
              )}

              <span className="text-[14px] leading-[18.48px] font-medium text-primary-1450">
                {truncateWalletAddress(address)}
              </span>
            </LWClickAnimation>

            <Menu />
          </>
        )}
      </div>
    </div>
  );
};

export default LWToolBar;

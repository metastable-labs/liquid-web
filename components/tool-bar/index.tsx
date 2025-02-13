import Image from "next/image";
import classNames from "classnames";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { WalletAddIcon } from "@/public/icons";
import { usePrivy } from "@privy-io/react-auth";
import LWClickAnimation from "../click-animation";
import { truncateWalletAddress } from "@/utils/helpers";
import { useEffect } from "react";
import { setTokenHeader } from "@/utils/axios";
import useAgentActions from "@/store/agent/actions";

const LWToolBar = () => {
  const { pathname } = useSystemFunctions();
  const { ready, authenticated, login, logout, user } = usePrivy();
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

    await setTokenHeader(user.id);

    connectUser();
  };

  useEffect(() => {
    authUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  return (
    <div
      className={classNames(
        "w-full sticky top-0 flex items-center justify-between gap-5 px-5 py-5 xl:bg-transparent z-10",
        {
          "bg-primary-2650": isTradeRoute,
          "bg-white": !isTradeRoute,
        }
      )}
    >
      <Image
        src="/images/logo.png"
        alt="Liquid Logo"
        width={119}
        height={24}
        quality={100}
        className="object-cover"
      />

      {ready && (!authenticated || !address) && (
        <LWClickAnimation
          onClick={login}
          className="p-1.5 flex items-center gap-2 rounded-[10px] border border-primary-500 bg-primary-600"
        >
          <WalletAddIcon />

          <span className="text-[14px] leading-[18.48px] font-medium text-primary-1450">
            Login
          </span>
        </LWClickAnimation>
      )}

      {ready && authenticated && address && (
        <LWClickAnimation
          onClick={logout}
          className="p-1.5 flex items-center justify-center gap-2 rounded-[10px] border border-primary-500 bg-primary-600"
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
      )}
    </div>
  );
};

export default LWToolBar;

"use client";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

import { LWClickAnimation } from "@/components";
import { truncateWalletAddress } from "@/utils/helpers";
import useSwitchNetworkConnect from "@/hooks/useSwitchNetwork";
import { DisconnectIcon } from "@/public/icons";
import { useEffect } from "react";
import useAppActions from "@/store/app/actions";

const ConnectWalletButton = () => {
  const { registerUser } = useAppActions();
  const {} = useSwitchNetworkConnect();
  const { address } = useAccount();
  const { ready, authenticated, login, logout } = usePrivy();

  const handleLogin = () => {
    login({ loginMethods: ["wallet"] });
  };

  useEffect(() => {
    if (ready && authenticated && address) {
      registerUser(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, authenticated, address]);

  return (
    <div className="flex justify-end pr-4 xl:pr-20 py-3 fixed top-0 xl:top-5 right-0 z-50 bg-white w-full xl:w-auto">
      {ready && !authenticated && (
        <LWClickAnimation
          onClick={handleLogin}
          className="bg-gray-100 text-gray-900 hover:bg-gray-100/80 h-10 px-10 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium"
          disabled={false}
        >
          Connect
        </LWClickAnimation>
      )}

      {ready && authenticated && address && (
        <div className="flex items-center gap-[9px]">
          <div className="bg-gray-100 text-gray-900 hover:bg-gray-100/80 h-10 px-5 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-sm font-medium">
            <div className="w-[10px] h-[10px] rounded-full bg-primary-1000" />

            <div>{truncateWalletAddress(address)}</div>
          </div>

          <LWClickAnimation onClick={logout} className="min-w-fit min-h-fit">
            <DisconnectIcon />
          </LWClickAnimation>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletButton;

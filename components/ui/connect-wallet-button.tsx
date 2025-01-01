"use client";
import { LWClickAnimation } from "@/components";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { truncateWalletAddress } from "@/utils/helpers";
import useSwitchNetworkConnect from "@/hooks/useSwitchNetwork";

const ConnectWalletButton = () => {
  const {} = useSwitchNetworkConnect();
  const { address } = useAccount();
  const { ready, authenticated, login, logout } = usePrivy();

  const handleLogin = () => {
    login({ loginMethods: ["wallet"] });
  };

  return (
    <div className="flex justify-end pr-20">
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
        <LWClickAnimation
          onClick={logout}
          className="bg-gray-100 text-gray-900 hover:bg-gray-100/80 h-10 px-5 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-sm font-medium"
        >
          <div className="w-[10px] h-[10px] rounded-full bg-primary-1000" />

          <div>{truncateWalletAddress(address)}</div>
        </LWClickAnimation>
      )}
    </div>
  );
};

export default ConnectWalletButton;

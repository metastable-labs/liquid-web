import Image from "next/image";
import classNames from "classnames";
import { useAccount } from "wagmi";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { WalletAddIcon } from "@/public/icons";
import useAppActions from "@/store/app/actions";
import useSwitchNetworkConnect from "@/hooks/useSwitchNetwork";
import { usePrivy, useSolanaWallets, useWallets } from "@privy-io/react-auth";
import LWClickAnimation from "../click-animation";
import { truncateWalletAddress } from "@/utils/helpers";

const LWToolBar = () => {
  const { pathname } = useSystemFunctions();
  const { registerUser } = useAppActions();
  const {} = useSwitchNetworkConnect();
  const { ready, authenticated, login, logout } = usePrivy();
  const { wallets: solanaWallets } = useSolanaWallets();
  const { wallets: evmWallets } = useWallets();

  const solanaAddress = solanaWallets?.[0]?.address;
  const evmAddress = evmWallets?.[0]?.address;
  const address = evmAddress || solanaAddress || "";

  const isTradeRoute = pathname.split("/")[2] === "trade";

  const handleLogin = async () => {
    await logout();
    login({ loginMethods: ["wallet"] });
  };

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
          onClick={handleLogin}
          className="p-1.5 flex items-center gap-2 rounded-[10px] border border-primary-500 bg-primary-600"
        >
          <WalletAddIcon />

          <span className="text-[14px] leading-[18.48px] font-medium text-primary-1450">
            Connect wallet
          </span>
        </LWClickAnimation>
      )}

      {ready && authenticated && address && (
        <LWClickAnimation
          onClick={logout}
          className="p-1.5 flex items-center gap-2 rounded-[10px] border border-primary-500 bg-primary-600"
        >
          <span className="text-[14px] leading-[18.48px] font-medium text-primary-1450">
            {truncateWalletAddress(address)}
          </span>
        </LWClickAnimation>
      )}
    </div>
  );
};

export default LWToolBar;

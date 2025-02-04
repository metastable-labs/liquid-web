import Image from "next/image";
import classNames from "classnames";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { WalletAddIcon } from "@/public/icons";
import LWClickAnimation from "../click-animation";

const LWToolBar = () => {
  const { pathname } = useSystemFunctions();
  const isTradeRoute = pathname.split("/")[2] === "trade";
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

      <LWClickAnimation className="p-1.5 flex items-center gap-2 rounded-[10px] border border-primary-500 bg-primary-600">
        <WalletAddIcon />

        <span className="text-[14px] leading-[18.48px] font-medium text-primary-1450">
          Connect wallet
        </span>
      </LWClickAnimation>
    </div>
  );
};

export default LWToolBar;

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";

import { LWClickAnimation } from "@/components";
import { PositionIcon } from "@/public/icons";
import useSystemFunctions from "@/hooks/useSystemFunctions";

const PositionsEmpty = () => {
  const [buttonTitle, setButtonTitle] = useState("Start earning");
  const { isConnected } = useAccount();
  const { ready, authenticated, login } = usePrivy();
  const { navigate } = useSystemFunctions();

  const onClick = () => {
    if (ready && !authenticated) {
      login({ loginMethods: ["wallet"] });
    } else if (ready && authenticated && isConnected) {
      navigate.push("/");
    }
  };

  useEffect(() => {
    if (ready && authenticated && isConnected) {
      setButtonTitle("Start earning");
    } else {
      setButtonTitle("Connect wallet");
    }
  }, [ready, authenticated, isConnected]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <PositionIcon />

      <p className="text-sm text-primary-400 text-center">
        You don’t have any open positions
      </p>

      <LWClickAnimation
        onClick={onClick}
        className="px-11 py-2.5 bg-primary-350 rounded-3xl"
      >
        <span className="text-[14px] leading-[14px] font-semibold text-white font-QuantaGroteskPro">
          {buttonTitle}
        </span>
      </LWClickAnimation>
    </div>
  );
};

export default PositionsEmpty;

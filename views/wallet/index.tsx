"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";

import { appearAnimation } from "@/utils/helpers";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import useWalletActions from "@/store/wallet/actions";
import WalletSkeleton from "./skeleton";
import Add from "./add";
import Withdraw from "./withdraw";
import ETHSOL from "./eth-sol";
import Main from "./main";

const Wallet = () => {
  const { user } = usePrivy();
  const { walletState } = useSystemFunctions();
  const { fetchWallet } = useWalletActions();

  const [walletInteraction, setWalletInteraction] =
    useState<WalletInteration>("main");

  useEffect(() => {
    if (!user) return;

    fetchWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const walletInteractions = {
    main: <Main setWalletInteraction={setWalletInteraction} />,
    add: <Add onClose={() => setWalletInteraction("main")} />,
    withdraw: <Withdraw onClose={() => setWalletInteraction("main")} />,
  };

  return (
    <div
      className={classNames(
        "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-[76px] pb-10 lg:pb-0",
        {
          "lg:px-5": !user,
          "max-w-[1076px]": user,
        }
      )}
    >
      {!walletState.assets && walletState.loadingAssets ? (
        <WalletSkeleton />
      ) : (
        <div className="w-full lg:p-6 lg:rounded-[32px] lg:border lg:border-primary-150 bg-white flex flex-col gap-[70px]">
          <div className="flex items-center gap-6 justify-between self-stretch px-4 py-3 border border-primary-550 bg-primary-600 rounded-[26px]">
            <div className="flex items-center gap-6">
              <Image
                src="/images/person.png"
                alt="Activity"
                width={40}
                height={40}
                quality={100}
                className="w-10 h-10 object-cover rounded-full"
              />

              <div className="flex flex-col gap-[5px]">
                <h3 className="text-[20px] leading-[23.2px] text-primary-50 font-medium">
                  Wallet
                </h3>

                <p className="text-[12px] leading-[15.84px] text-primary-100 max-w-[278px]">
                  Liquid uses <span className="font-bold">privy delegated</span>{" "}
                  wallets to allow agents take actions on your behalf
                </p>
              </div>
            </div>

            <ETHSOL />
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={walletInteraction}
              {...appearAnimation}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              {walletInteractions[walletInteraction]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Wallet;

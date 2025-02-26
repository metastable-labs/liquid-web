"use client";
import { useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";

import { CoinIcon, ArrowUpAltIcon, ArrowRightIcon } from "@/public/icons";
import { LWClickAnimation } from "@/components";
import { appearAnimation } from "@/utils/helpers";
import useAppActions from "@/store/app/actions";
import Add from "./add";
import Withdraw from "./withdraw";
import AssetPaper from "./asset-paper";
import ETHSOL from "./eth-sol";

const Wallet = () => {
  const { user } = usePrivy();
  const { showSelectNetworkModal } = useAppActions();
  const [walletInteraction, setWalletInteraction] =
    useState<WalletInteration>("main");

  const balance = "0.00";

  const actions = [
    {
      title: "Add money",
      icon: <CoinIcon />,
      action: () => showSelectNetworkModal(true),
    },
    {
      title: "Withdraw",
      icon: <ArrowUpAltIcon />,
      action: () => setWalletInteraction("withdraw"),
    },
  ];

  const assets: Array<Asset> = [
    {
      title: "USD Coin",
      icon: "/images/usdc.png",
      network: "base",
      symbol: "USDC",
      balance: 4506,
      balanceUSDValue: 4508,
    },
    {
      title: "cbBTC",
      icon: "/images/btc.png",
      network: "base",
      symbol: "cbBTC",
      balance: 700,
      balanceUSDValue: 12_000_000,
    },
    {
      title: "Ethereum",
      icon: "/images/eth.png",
      network: "base",
      symbol: "ETH",
      balance: 300,
      balanceUSDValue: 40_540.89,
    },
  ];

  const walletInteractions = {
    main: (
      <div className="flex flex-col gap-[29px]">
        <div className="flex flex-col gap-2.5">
          <h5 className="text-[13px] leading-[16.12px] text-primary-100">
            Total Holdings
          </h5>

          <span className="text-[36px] leading-[40.32px] text-primary-950 font-QuantaGroteskPro font-bold">
            ${balance}
          </span>
        </div>

        <div className="self-stretch flex flex-col gap-8">
          <div className="self-stretch flex items-center gap-4">
            {actions.map(({ action, icon, title }, index) => (
              <LWClickAnimation
                onClick={action}
                key={index}
                className={classNames(
                  "flex-1 px-[21.6px] py-[6.75px] flex items-center justify-center gap-[6.75px] rounded-[21.6px] h-[54px]",
                  {
                    "bg-primary-350": index === 0,
                    "border border-primary-550 bg-primary-600": index === 1,
                  }
                )}
              >
                <span
                  className={classNames(
                    "text-[16.2px] leading-[21.6px] font-medium text-center",
                    {
                      "text-white": index === 0,
                      "text-primary-1700": index === 1,
                    }
                  )}
                >
                  {title}
                </span>
                {icon}
              </LWClickAnimation>
            ))}
          </div>

          <div className="flex flex-col self-stretch items-stretch gpa-[29px]">
            <h1 className="mb-5 text-[24px] leading-[26.88px] tracking-[-0.6px] text-primary-50 font-medium">
              Assets
            </h1>

            <div className="flex flex-col self-stretch items-stretch gap-6">
              {assets.map((asset, index) => (
                <AssetPaper key={index} asset={asset} />
              ))}

              <LWClickAnimation
                onClick={() => console.log("Clicked")}
                className="flex items-center gap-1 w-fit"
              >
                <span className="text-[13px] leading-[16.12px] text-primary-400">
                  See all
                </span>
                <ArrowRightIcon fill="#0C0507" width={14} height={14} />
              </LWClickAnimation>
            </div>
          </div>
        </div>
      </div>
    ),
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

      <div className="w-full lg:p-6 lg:rounded-[32px] lg:border lg:border-primary-150 bg-white hidden xl:flex flex-col gap-[70px]">
        <h1 className="text-[19.7px] leading-[26px] text-primary-400 font-medium">
          Activity
        </h1>

        <Image
          src="/images/activity.png"
          alt="Activity"
          width={500}
          height={500}
          quality={100}
          className="w-full h-[388px]"
        />

        <p className="text-[15px] leading-[19.8px text-primary-1700 font-medium max-w-[272px] text-center self-center">
          Activity feature is coming soon and will be available in the next
          release
        </p>
      </div>
    </div>
  );
};

export default Wallet;

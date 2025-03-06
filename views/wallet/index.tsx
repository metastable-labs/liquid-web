"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";

import { CoinIcon, ArrowUpAltIcon, ArrowRightIcon } from "@/public/icons";
import { LWClickAnimation } from "@/components";
import { appearAnimation } from "@/utils/helpers";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import Spinner from "@/components/ui/spinner";
import WalletSkeleton from "./skeleton";
import useWalletActions from "@/store/wallet/actions";
import Add from "./add";
import Withdraw from "./withdraw";
import AssetPaper from "./asset-paper";
import ETHSOL from "./eth-sol";
import useLinkedAccounts from "@/hooks/useLinkedAccounts";
import useFunding from "@/hooks/useFunding";

const Wallet = () => {
  const { user } = usePrivy();
  const { walletState } = useSystemFunctions();
  const { fetchWallet } = useWalletActions();
  const { evmWallet } = useLinkedAccounts();
  const { fundWallet } = useFunding();

  const [walletInteraction, setWalletInteraction] =
    useState<WalletInteration>("main");

  const [assets, setAssets] = useState<Wallet[]>([]);

  const balance = "0.00";
  const showSeeAll = assets?.length && assets?.length <= 4;

  const onFundEvmWallet = () => {
    if (!evmWallet) return;

    fundWallet(evmWallet.address, "evm");
  };

  const actions = [
    {
      title: "Add money",
      icon: <CoinIcon />,
      // action: () => showSelectNetworkModal(true),
      action: onFundEvmWallet,
    },
    {
      title: "Withdraw",
      icon: <ArrowUpAltIcon />,
      action: () => setWalletInteraction("withdraw"),
    },
  ];

  const handleSeeAll = () => {
    const assets = walletState?.assets || [];
    if (showSeeAll) {
      setAssets([...assets]);
    } else {
      const firstFourAssets = assets.slice(0, 4);
      setAssets([...firstFourAssets]);
    }
  };

  useEffect(() => {
    const assets = walletState.assets;

    if (!assets) return;

    if (assets.length > 4) {
      const firstFourAssets = assets.slice(0, 4);
      setAssets([...firstFourAssets]);
    } else {
      setAssets([...assets]);
    }
  }, [walletState.assets]);

  useEffect(() => {
    if (!user) return;

    fetchWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const walletInteractions = {
    main: (
      <div className="flex flex-col gap-[29px]">
        <div className="flex flex-col gap-2.5">
          <h5 className="text-[13px] leading-[16.12px] text-primary-100">
            Total Holdings
          </h5>

          <div className="flex gap-3 items-center flex-wrap">
            <span className="text-[36px] leading-[40.32px] text-primary-950 font-QuantaGroteskPro font-bold">
              ${balance}
            </span>

            {walletState.loadingAssets && (
              <div className="mb-2">
                <Spinner size={5} />
              </div>
            )}
          </div>
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
              {assets && assets.length > 0 ? (
                <>
                  {assets.map((asset, index) => (
                    <AssetPaper key={index} asset={asset} />
                  ))}

                  {walletState.assets && walletState.assets.length > 4 && (
                    <LWClickAnimation
                      onClick={handleSeeAll}
                      className="flex items-center gap-1 w-fit"
                    >
                      <span className="text-[13px] leading-[16.12px] text-primary-400">
                        {showSeeAll ? "See all" : "See less"}
                      </span>
                      <ArrowRightIcon fill="#0C0507" width={14} height={14} />
                    </LWClickAnimation>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center w-full py-10">
                  <p className="text-[16px] leading-[19.2px] text-gray-500">
                    You don’t have any assets yet.
                  </p>
                  <p className="mt-2 text-[14px] leading-[16.8px] text-gray-400">
                    Add funds to your wallet to get started.
                  </p>
                </div>
              )}
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
      {!walletState.assets && walletState.loadingAssets ? (
        <WalletSkeleton />
      ) : (
        <>
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
                    Liquid uses{" "}
                    <span className="font-bold">privy delegated</span> wallets
                    to allow agents take actions on your behalf
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
        </>
      )}
    </div>
  );
};

export default Wallet;

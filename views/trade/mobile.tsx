import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Address } from "viem";
import classNames from "classnames";

import { Token } from "@/components/trade-interface/types";
import { CheckIcon, CopyIcon } from "@/public/icons";
import { LWClickAnimation, LWTradeInterface } from "@/components";
import TokenInfo from "./token-info";
import useCopy from "@/hooks/useCopy";
import { useState } from "react";

const token: Token = {
  id: "1",
  token_name: "Agent MoonShot",
  token_symbol: "MST",
  token_address: "0x1234567890abcdef1234567890abcdef12345678" as Address,
  exchange_address: "0xabcdef1234567890abcdef1234567890abcdef12" as Address,
  token_total_supply: 1000000,
  token_logo_url: "/images/liquid.png",
  create_token_page: true,
  warpcast_channel_link: "https://warpcast.example.com/channel",
  website_url: "https://example.com",
  twitter_url: "https://twitter.com/example",
  telegram_url: "https://t.me/example",
  chain: {
    id: 10,
    name: "optimism",
    deployer_address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd" as Address,
    transaction_hash: "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
  },
  is_active: true,
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-01-02T00:00:00Z",
  market_cap: 5000000,
  price: 5.0,
  volume: 100000,
  total_buy_count: 250,
  total_sell_count: 100,
};

const icons = [
  <CopyIcon key="copy" />,
  <CheckIcon key="check" width={20} height={20} fill="green" />,
];

type MobileTabs = "info" | "buy/sell";
const mobileTabs: MobileTabs[] = ["info", "buy/sell"];

const MobileView = ({ data, period, periods, setPeriod }: IView) => {
  const [mobileTab, setMobileTab] = useState<MobileTabs>("info");

  const { handleCopy, hasCopied } = useCopy("Copied token address");

  const extras = [
    <span
      key="symbol"
      className="text-[14px] leading-[18.48px] text-primary-2350 font-medium"
    >
      ${token.token_symbol}
    </span>,
    <div key="base" className="flex items-center gap-0.5">
      <Image
        src="/icons/base.png"
        alt="base icon"
        width={16}
        height={16}
        quality={100}
        className="object-cover"
      />

      <span className="text-[14px] leading-[18.48px] text-primary-450 font-medium">
        BASE
      </span>
    </div>,
    <LWClickAnimation
      key="copy"
      onClick={() => handleCopy(token.token_address as string)}
      className="min-w-[25px]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={+hasCopied}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          exit={{ opacity: 0 }}
          className={classNames(
            "flex items-center justify-center w-full h-full",
            { "pointer-events-none": hasCopied }
          )}
        >
          {icons[+hasCopied]}
        </motion.div>
      </AnimatePresence>
    </LWClickAnimation>,
    <a
      key="ethercan"
      href={`https://etherscan.io/token/${token.token_address}`}
      target="_blank"
      rel="noreferrer"
      className="w-full h-full flex items-center justify-center"
    >
      <Image
        src="/icons/etherscan.png"
        alt="etherscan icon"
        width={24}
        height={24}
        quality={100}
        className="object-cover"
      />
    </a>,
  ];

  const items = [
    <div key="info" className="w-full">
      <TokenInfo />
    </div>,
    <div key="buy/sell" className="w-full">
      <LWTradeInterface token={token} />
    </div>,
  ];

  return (
    <div className="pb-10">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={mobileTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-w-full"
        >
          {items.find((item) => item.key === mobileTab)}
        </motion.div>
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 w-screen h-fit flex items-center justify-around px-[34px] py-4 bg-[#FFFEF7]">
        {mobileTabs.map((tab, index) => (
          <div
            onClick={() => setMobileTab(tab)}
            key={index}
            className={classNames(
              "py-2.5 px-3.5 flex items-center justify-center text-sm capitalize transition-colors relative",
              {
                "text-primary-2200": tab === mobileTab,
                "text-[#475467]": tab !== mobileTab,
              }
            )}
          >
            {tab}

            {tab === mobileTab && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-[3px] bg-primary-2200 absolute bottom-0 left-0"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileView;

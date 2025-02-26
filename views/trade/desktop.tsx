import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Address } from "viem";
import classNames from "classnames";

import { Token } from "@/components/trade-interface/types";
import { CheckIcon, CopyIcon } from "@/public/icons";
import { LWClickAnimation, LWTradeInterface } from "@/components";
import TokenInfo from "./token-info";
import useCopy from "@/hooks/useCopy";

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

const DesktopView = ({ data, period, periods, setPeriod }: IView) => {
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
  return (
    <div className="flex justify-between gap-3.5 sticky top-0 w-full">
      <div className="w-3/4 flex flex-col gap-[77px]">
        <div className="w-full flex items-center gap-[17.6px]">
          <div className="flex items-center gap-1">
            <Image
              src={token.token_logo_url}
              alt={`${token.token_name} icon`}
              width={40}
              height={40}
              quality={100}
              className="w-10 h-10 rounded-full object-cover"
            />

            <h1 className="text-[clamp(29px,5vw,32px)] leading-[clamp(32px,5vw,31.35.84px)] tracking-[-1px] text-primary-400 font-bold font-QuantaGroteskPro">
              {token.token_name}
            </h1>
          </div>

          {extras.map((extra, index) => (
            <div
              key={index}
              className="p-2 h-[34px] flex items-center justify-center border border-primary-2300 rounded-xl bg-primary-1750 w-fit overflow-hidden"
            >
              {extra}
            </div>
          ))}
        </div>

        <iframe
          height="100%"
          width="100%"
          id="geckoterminal-embed"
          title="GeckoTerminal Embed"
          src="https://www.geckoterminal.com/solana/pools/22WrmyTj8x2TRVQen3fxxi2r4Rn6JDHWoMTpsSmn8RUd?embed=1&info=0&swaps=0&grayscale=0&light_chart=1"
          frameBorder="0"
          allow="clipboard-write"
          allowFullScreen
        ></iframe>
        <div></div>
      </div>

      <div className="w-1/4 sticky top-0 flex flex-col gap-8 items-stretch">
        <LWTradeInterface token={token} />

        <div className="w-full">
          <TokenInfo />
        </div>
      </div>
    </div>
  );
};

export default DesktopView;

"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useAccount } from "wagmi";
import { NumericFormat, OnValueChange } from "react-number-format";
import { getBalance } from "@wagmi/core";
import { formatEther } from "viem";
import { usePrivy } from "@privy-io/react-auth";

import { LWClickAnimation } from "@/components";
import { ETHIcon, ExportIcon, InfoIcon } from "@/public/icons";
import { formatAmount } from "@/utils/helpers";
import { ILBTradeInterface } from "./types";

const tabs = ["buy", "sell"];

function truncateToDecimals(num: number) {
  const factor = Math.pow(10, 5);
  return Math.floor(num * factor) / factor;
}

const LWTradeInterface = ({ standAlone = true, token }: ILBTradeInterface) => {
  const { ready, authenticated } = usePrivy();
  const { address } = useAccount();

  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<number>();
  const [valueToGet, setValueToGet] = useState<number | undefined>(0.99);
  const [ethBalance, setEthBalance] = useState<number>(100);
  const [tokenBalance, setTokenBalance] = useState<number>(23090);

  const balance = tab === "buy" ? ethBalance : tokenBalance;

  const invalidAmount = !authenticated
    ? false
    : (tab === "buy" && Number(amount) > ethBalance) ||
      (tab === "sell" && Number(amount) > tokenBalance);

  const balancePartitions = [
    {
      text: "10%",
      onClick: () => setAmount(truncateToDecimals(balance * 0.1)),
    },
    {
      text: "25%",
      onClick: () => setAmount(truncateToDecimals(balance * 0.25)),
    },
    {
      text: "50%",
      onClick: () => setAmount(truncateToDecimals(balance * 0.5)),
    },
    {
      text: "75%",
      onClick: () => setAmount(truncateToDecimals(balance * 0.75)),
    },
    { text: "MAX", onClick: () => setAmount(truncateToDecimals(balance)) },
  ];

  const transactionLoading = false;
  const tokenToGet = tab === "buy" ? token?.token_symbol : "ETH";
  const decimal = tab === "buy" ? 4 : 10;
  const amountToGet = formatAmount(valueToGet, decimal).toLocaleString();
  const info = [{ title: "You'll get", value: `${amountToGet} ${tokenToGet}` }];

  const tokenSymbol = tab === "buy" ? "ETH" : token?.token_symbol;
  const tokenLogo =
    tab === "buy" ? (
      <ETHIcon height={20} width={20} />
    ) : (
      <Image
        src={token?.token_logo_url || ""}
        alt="token"
        width={20}
        height={20}
        quality={100}
        className="w-5 h-5 object-cover"
      />
    );

  const handleAmountChange: OnValueChange = ({ floatValue }) => {
    setAmount(floatValue || 0);
  };

  //   const handleGetBalance = async () => {
  //     const ethResponse = await getBalance(wagmiConfig, {
  //       address: address!,
  //       unit: "ether",
  //     });

  //     const ethBalance = formatEther(ethResponse.value);
  //     const formattedEthValue = truncateToDecimals(Number(ethBalance));

  //     setEthBalance(formattedEthValue);

  //     const tokenBalance = await getBalance(wagmiConfig, {
  //       address: address!,
  //       token: token?.token_address,
  //     });

  //     const formattedBalanceValue = truncateToDecimals(
  //       Number(tokenBalance.formatted)
  //     );

  //     setTokenBalance(formattedBalanceValue);
  //   };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!amount || !token?.id) return;

    if (!authenticated && ready) return () => console.log("Authenticate User");

    // if (tab === "buy") return buyTokens(token?.exchange_address, amount);

    // return sellTokens(token?.exchange_address, token.token_address, amount);

    return;
  };

  //   useEffect(() => {
  //     if (!amount) {
  //       setValueToGet(undefined);
  //       return;
  //     }

  //     if (tab === "buy") {
  //       calculateBuyTokenAmount(token?.exchange_address!, amount).then((val) =>
  //         setValueToGet(val)
  //       );
  //     } else {
  //       calculateSellTokenAmount(token?.exchange_address!, amount).then((val) =>
  //         setValueToGet(val)
  //       );
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [amount]);

  //   useEffect(() => {
  //     if (!address || !authenticated) return;

  //     handleGetBalance();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [address, authenticated]);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className={classNames("h-fit flex flex-col gap-9", {
          "p-6 rounded-3xl bg-white border border-primary-150 w-full":
            standAlone,
          "max-w-80 md:max-w-[343px]": !standAlone,
        })}
      >
        <div className="self-stretch flex flex-col items-stretch gap-4">
          <div className="p-1 self-stretch flex gap-1 bg-primary-500 rounded-xl h-[38px]">
            {tabs.map((text) => (
              <div
                key={text}
                className={classNames(
                  "p-1 flex-1 flex items-center justify-center rounded-lg text-[14px] leading-[18.48px] font-medium cursor-pointer transition-colors duration-300 capitalize",
                  {
                    "text-primary-50 rounded-lg bg-white shadow-functionCard":
                      text === tab,
                    "text-primary-100": text !== tab,
                  }
                )}
                onClick={() => {
                  setTab(text as "buy" | "sell");
                  setAmount(0);
                  setValueToGet(undefined);
                }}
              >
                {text}
              </div>
            ))}
          </div>

          <div className="p-4 self-stretch flex items-center justify-between rounded-xl border border-primary-150">
            <NumericFormat
              value={amount}
              className="bg-transparent outline-none text-primary-950 text-[24px] leading-[26.88px] tracking-[-0.6px] max-w-[50%] font-medium"
              placeholder="Amount"
              thousandSeparator=","
              allowNegative={false}
              onValueChange={handleAmountChange}
            />

            <div className="flex flex-col items-end justify-center gap-1.5">
              <div className="px-3 py-1.5 bg-primary-600 flex items-center justify-between gap-2 rounded-full">
                {tokenLogo}
                <span className="text-primary-2800 font-semibold text-[15px] leading-[24px] tracking-[-0.075px]">
                  {tokenSymbol}
                </span>
              </div>

              <div className="flex items-end gap-[5px]">
                <span className="text-primary-100 text-[12px] leading-[15.84px]">
                  Available:
                </span>

                <span className="text-primary-1700 text-[13px] leading-[16.12px]">
                  {balance.toLocaleString("en", {
                    maximumFractionDigits: 5,
                  })}{" "}
                  {tokenSymbol}
                </span>
              </div>
            </div>
          </div>

          <div className="self-stretch flex-wrap flex items-center content-center gap-2.5">
            {balancePartitions.map(({ text, onClick }, index) => (
              <LWClickAnimation
                key={index}
                className="px-[11px] py-1.5 bg-primary-600 border border-primary-550 rounded-[10px] flex-1 flex items-center justify-center"
                onClick={onClick}
              >
                <span className="text-primary-1700 font-medium text-[13px] leading-[16.12px]">
                  {text}
                </span>
              </LWClickAnimation>
            ))}
          </div>
        </div>

        <div className="self-stretch flex flex-col items-stretch gap-4">
          <motion.div
            animate={{
              height: valueToGet ? "42px" : 0,
              opacity: valueToGet ? 1 : 0,
            }}
            className="flex flex-col gap-3 items-stretch justify-center rounded-lg transition-all duration-500"
          >
            {info.map(({ title, value }, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 text-primary-250 text-sm"
              >
                <span className="text-[12px] leading-[15.84px] text-primary-100">
                  {title}
                </span>
                <span className="text-[14px] leading-[18.48px] text-primary-1800 font-medium">
                  {value}
                </span>
              </div>
            ))}
          </motion.div>

          <LWClickAnimation
            loading={transactionLoading}
            disabled={!amount || invalidAmount}
            type="submit"
            className="self-stretch w-full -mt-1 mb-2"
          >
            <div
              className={classNames(
                "flex-1 w-full px-20 py-4 flex items-center justify-center rounded-[30px] transition-all duration-500",
                {
                  "bg-primary-350": tab === "buy",
                  "bg-primary-1350": tab === "sell",
                }
              )}
            >
              <span className="text-[16px] leading-[16px] text-white font-semibold capitalize">
                {tab}
              </span>
            </div>
          </LWClickAnimation>

          <div className="self-stretch flex items-center justify-center">
            <a href="" className="flex items-center justify-center gap-[3px]">
              <Image
                src="/images/flaunch.png"
                alt="Flaunch Logo"
                width={18}
                height={18}
                quality={100}
                className="w-[18px] h-[18px] object-cover"
              />

              <span className="text-[12px] leading-[15.84px] text-primary-100 underline">
                Swap on Flaunch
              </span>

              <ExportIcon />
            </a>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {invalidAmount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={classNames(
              "mt-6 bg-primary-2950 p-2 flex items-center rounded-[10px] w-full",
              { "absolute left-0 top-[96%]": !standAlone }
            )}
          >
            <div className="flex items-center justify-center p-1">
              <InfoIcon width={24} height={24} fill="#6E330C" />
            </div>

            <p className="text-primary-3000 text-[14px] leading-[24px] max-w-[348.7px]">{`You don't have enough ${
              tab === "buy" ? "ETH" : token?.token_symbol
            }`}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LWTradeInterface;

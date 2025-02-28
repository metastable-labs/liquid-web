import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import classNames from "classnames";

import {
  AttachmentIcon,
  DollarSquareIcon,
  MemecoinIcon,
  SendIcon,
  CoinsIcon,
  BookSavedIcon,
} from "@/public/icons";

const AgentStat = ({ title, value }: AgentStat) => (
  <div className="flex flex-col gap-2">
    <span className="text-[12px] leading-[15.84px] lg:text-[15px] lg:leading-[19.8px] text-primary-100 whitespace-nowrap">
      {title}
    </span>
    {typeof value === "string" ? (
      <span className="text-[16px] leading-[19.2px] text-primary-2600 font-medium">
        {value}
      </span>
    ) : (
      value
    )}
  </div>
);

const stats: Array<AgentStat> = [
  { title: "Win rate", value: "95%" },
  { title: "Users", value: "5.2k" },
  {
    title: "Last 7D PnL",
    value: (
      <span className="text-[16px] leading-[19.2px] font-medium text-primary-2700">
        +85.7%
      </span>
    ),
  },
];

const agents = [
  { icon: <MemecoinIcon />, title: "Memecoin agent" },
  { icon: <DollarSquareIcon />, title: "Liquidity Provider" },
  {
    icon: <CoinsIcon width={7.572} height={7.572} fill="#C2540A" />,
    title: "Defi Agent",
  },
  { icon: <BookSavedIcon />, title: "Research Agent" },
];

const staggerAnimation = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const agentContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const agentChildVariants: Variants = {
  hidden: {
    x: "100%",
    opacity: 0,
  },
  visible: {
    x: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const text =
  "Create an agent to buy tokens launched in the past 3 hours with a market cap of $150k market cap.";
const staggerDelay = 0.1;
const animationDuration = 0.6;
const totalCycleTime = (text.length - 1) * staggerDelay + animationDuration;

const Step1 = () => {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, totalCycleTime * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-8 pointer-events-none">
      <motion.div className="self-stretch p-[21.36px] flex flex-col items-center gap-8 rounded-2xl border border-primary-150 bg-white shadow-secondaryShadow">
        <div className="w-full flex items-center gap-2">
          <Image
            src="/images/avatar1.png"
            alt="Avatar"
            width={50}
            height={50}
            quality={100}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />

          <div className="flex flex-col gap-2">
            <h2 className="text-primary-2350 text-[16px] leading-[19.2px] lg:text-[20px] lg:leading-[23.2px] font-medium">
              Fizzle
            </h2>

            <div className="flex items-center gap-1 text-[11px] leading-[13.64px] lg:text-[12px] lg:leading-[15.84px]">
              <span className="text-primary-100">Creator:</span>
              <span className="text-primary-350">@njokuscript</span>
              <Image
                src="/images/farcaster.png"
                alt="farcaster logo"
                width={13}
                height={13}
                quality={100}
                className="w-[13px] h-[13px] object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between w-full gap-7">
          <AgentStat {...stats[0]} />
          <div className="w-[1px] h-4 bg-primary-2450" />
          <AgentStat {...stats[1]} />
          <div className="w-[1px] h-4 bg-primary-2450" />
          <AgentStat {...stats[2]} />
        </div>
      </motion.div>

      <div className="self-stretch flex flex-col gap-3.5">
        <div className="px-[14.23px] py-[10.67px] flex flex-col gap-3.5 rounded-[18.673px] border border-primary-550 shadow-inputShadow bg-white">
          <motion.p
            key={cycle}
            className="text-[12.449px] leading-[16.432px] text-primary-2400 max-w-[298px] whitespace-pre-wrap"
            variants={staggerAnimation}
            initial="hidden"
            animate="visible"
          >
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                style={{ display: "inline-block" }}
                variants={{
                  hidden: { y: 0 },
                  visible: {
                    y: [0, -1, 0],
                    transition: {
                      duration: animationDuration,
                      delay: index * staggerDelay,
                    },
                  },
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.p>

          <div className="flex items-center justify-between">
            <AttachmentIcon />
            <SendIcon />
          </div>
        </div>

        <motion.div
          className="flex items-center justify-between gap-[9.465px]"
          variants={agentContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {agents.map(({ icon, title }, index) => (
            <motion.div
              key={index}
              variants={agentChildVariants}
              className={classNames(
                "py-[2.839px] px-[5.679px] rounded-[7.572px] border-[0.473px] flex items-center justify-center gap-[3.786px]",
                {
                  "border-primary-200 bg-primary-250":
                    title === "Memecoin agent",
                  "border-primary-1850 bg-primary-1900":
                    title === "Liquidity Provider",
                  "border-primary-2900 bg-primary-1400": title === "Defi Agent",
                  "border-primary-650 bg-primary-700":
                    title === "Research Agent",
                }
              )}
            >
              {icon}
              <span
                className={classNames(
                  "text-[7.572px] leading-[9.389px] font-medium whitespace-nowrap",
                  {
                    "text-primary-2950": title === "Memecoin agent",
                    "text-primary-3000": title === "Liquidity Provider",
                    "text-primary-3050": title === "Defi Agent",
                    "text-primary-2700": title === "Research Agent",
                  }
                )}
              >
                {title}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Step1;

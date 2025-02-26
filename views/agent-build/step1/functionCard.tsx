import classNames from "classnames";

import { FunctionCardProps } from "../types";
import { Phoenix, Orandis, Solaris, Liquid } from "@/public/icons";

const icons = {
  "trade-memecoins": <Phoenix />,
  "provide-liquidity": <Orandis />,
  "invest-defi": <Solaris />,
  "liquid-protocol": <Liquid />,
};

const titles = {
  "trade-memecoins": "Trade memecoins",
  "provide-liquidity": "Providing Liquidity",
  "invest-defi": "Investing in DeFi",
  "liquid-protocol": "Liquid protocol Specific Agents",
};

const descriptions = {
  "trade-memecoins":
    "Enable users to create agents focused on trading memecoins on Base and Solana networks",
  "provide-liquidity":
    "Agents can be configured to provide liquidity by setting price ticks, amounts, and durations.",
  "invest-defi":
    "Enable agents to perform investment actions on DeFi platforms like Moonwell or Morpho.",
  "liquid-protocol": "Agents that specializes in curation of strategies",
};

const FunctionCard = ({
  setAgentFunction,
  active,
  agentFunction,
}: FunctionCardProps) => {
  const onClick = () => {
    setAgentFunction(agentFunction);
  };

  console.log("agent function", agentFunction);

  return (
    <button
      type="button"
      className={classNames(
        "p-4 flex flex-col gap-4 rounded-xl border transition-all duration-500",
        {
          "border-primary-150 bg-primary-600":
            agentFunction === "trade-memecoins",
          "border-primary-1850 bg-primary-1900":
            agentFunction === "provide-liquidity",
          "border-primary-650 bg-primary-700": agentFunction === "invest-defi",
          "border-primary-500 bg-primary-1950":
            agentFunction === "liquid-protocol",
          "shadow-xl": active,
        }
      )}
      onClick={onClick}
    >
      <div
        className={classNames(
          "w-full h-[89px] self-stretch p-4 flex items-center justify-center rounded-xl border",
          {
            "border-primary-550 bg-primary-150":
              agentFunction === "trade-memecoins",
            "border-primary-2000 bg-primary-1850":
              agentFunction === "provide-liquidity",
            "border-primary-1000 bg-primary-650":
              agentFunction === "invest-defi",
            "border-primary-2050 bg-primary-2100":
              agentFunction === "liquid-protocol",
          }
        )}
      >
        {icons[agentFunction!]}
      </div>

      <h1
        className={classNames("text-[18px] leading-[23.76px] font-medium", {
          "text-primary-400": agentFunction === "trade-memecoins",
          "text-primary-2150": agentFunction === "provide-liquidity",
          "text-primary-900": agentFunction === "invest-defi",
          "text-primary-2200": agentFunction === "liquid-protocol",
        })}
      >
        {titles[agentFunction!]}
      </h1>

      <p className="text-[14px] leading-[18.48px] text-primary-400 text-left">
        {descriptions[agentFunction!]}
      </p>

      <div className="h-[31px] w-full" />
    </button>
  );
};

export default FunctionCard;

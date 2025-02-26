import classNames from "classnames";

import { Liquid, Orandis, Phoenix, Solaris } from "@/public/icons";
import { AgentFunction } from "../types";

const icons = {
  "trade-memecoins": <Phoenix width={24} height={24} />,
  "provide-liquidity": <Orandis width={24} height={24} />,
  "invest-defi": <Solaris width={24} height={24} />,
  "liquid-protocol": <Liquid width={24} height={24} />,
};

const titles = {
  "trade-memecoins": "Meme coin trader",
  "provide-liquidity": "Liquidity Provider",
  "invest-defi": "DeFi investor",
  "liquid-protocol": "Liquid Strategizer",
};

const AgentBadge = ({ agent }: { agent: AgentFunction }) => (
  <div
    className={classNames(
      "p-2 flex items-center gap-1 rounded-[11px] border transition-all duration-500 w-fit",
      {
        "border-primary-500 bg-primary-600": agent === "trade-memecoins",
        "border-primary-1850 bg-primary-1900": agent === "provide-liquidity",
        "border-primary-650 bg-primary-700": agent === "invest-defi",
        "border-primary-2300 bg-primary-1750": agent === "liquid-protocol",
      }
    )}
  >
    {icons[agent]}

    <span
      className={classNames("text-[16px] leading-[19.84px] font-medium", {
        "text-primary-400": agent === "trade-memecoins",
        "text-primary-2150": agent === "provide-liquidity",
        "text-primary-900": agent === "invest-defi",
        "text-primary-2350": agent === "liquid-protocol",
      })}
    >
      {titles[agent]}
    </span>
  </div>
);

export default AgentBadge;

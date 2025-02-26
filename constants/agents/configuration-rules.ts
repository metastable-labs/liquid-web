import { AgentFunction } from "@/views/agent-build/types";
import { title } from "process";

type ConfigurationCustom =
  | "supported-networks"
  | "trading-parameters"
  | "risk-configurations"
  | "trading-execution-rules"
  | "liquidity-provision-settings"
  | "auto-rebalancing-rules"
  | "investment-strategies"
  | "automated-yield-optimization"
  | "strategy-execution"
  | "governance-interaction"
  | "supported-platforms"
  | "supported-protocols";

type TitleValue = {
  title: string;
  value: string | Array<string>;
};

type ConfigurationRules = Record<
  AgentFunction,
  Partial<Record<ConfigurationCustom, TitleValue>>
>;

const CONFIGURATION_RULES: ConfigurationRules = {
  "trade-memecoins": {
    "supported-networks": {
      title: "Supported Networks",
      value: "Base, Solana",
    },
    "trading-parameters": {
      title: "Trading Parameters",
      value: [
        "Entry & exit price ranges",
        "Stop-loss and take-profit levels",
        "Slippage tolerance",
        "Max daily trade volume",
      ],
    },
    "risk-configurations": {
      title: "Risk Configurations",
      value: [
        "Low risk: Trade established memecoins only",
        "Medium risk: Mix of high-cap and mid-cap memecoins",
        "High risk: High-volatility microcaps and newly launched tokens",
      ],
    },
    "trading-execution-rules": {
      title: "Trading Execution Rules",
      value: [
        "Momentum trading",
        "Arbitrage strategies",
        "Trend-based AI signals",
      ],
    },
  },
  "provide-liquidity": {
    "supported-networks": {
      title: "Supported Networks",
      value: "Aerodrome, Uniswap V3",
    },
    "liquidity-provision-settings": {
      title: "Liquidity Provision Settings",
      value: [
        "Token pairs selection",
        "Price tick ranges",
        "Liquidity duration lock",
        "Impermanent loss mitigation strategies",
      ],
    },
    "risk-configurations": {
      title: "Risk Configurations",
      value: [
        "Low risk: Large-cap, stable token pairs",
        "Medium risk: Volatile token pairs with incentives",
        "High risk: Exotic pairs with high yield but low liquidity",
      ],
    },
    "auto-rebalancing-rules": {
      title: "Auto-Rebalancing Rules",
      value: ["Rebalancing frequency", "Threshold for liquidity reallocation"],
    },
  },
  "invest-defi": {
    "supported-platforms": {
      title: "Supported Platforms",
      value: "Moonwell, Morpho, Aave, Compound",
    },
    "investment-strategies": {
      title: "Investment Strategies",
      value: [
        "Lending and borrowing",
        "Yield farming",
        "Governance staking",
        "Auto-compounding strategies",
      ],
    },
    "risk-configurations": {
      title: "Risk Configurations",
      value: [
        "Low risk: Stablecoin lending, blue-chip staking",
        "Medium risk: LP staking, moderate volatility assets",
        "High risk: High-yield farming, leveraged strategies",
      ],
    },
    "automated-yield-optimization": {
      title: "Automated Yield Optimization",
      value: [
        "APR-based strategy selection",
        "Auto-withdrawal upon yield drop",
      ],
    },
  },
  "liquid-protocol": {
    "supported-protocols": {
      title: "Supported Protocols",
      value: "Liquid staking derivatives, rebalancing vaults",
    },
    "strategy-execution": {
      title: "Strategy Execution",
      value: [
        "Staking and restaking logic",
        "Yield redirection",
        "Risk-adjusted rebalancing",
      ],
    },
    "risk-configurations": {
      title: "Risk Configurations",
      value: [
        "Low risk: Liquid staking with auto-compound",
        "Medium risk: Hybrid strategy (staking + yield redirection)",
        "High risk: Complex rebalancing with aggressive yield targeting",
      ],
    },
    "governance-interaction": {
      title: "Governance Interaction",
      value: [
        "Auto-vote on governance proposals",
        "Stake-based governance influence",
      ],
    },
  },
};

export default CONFIGURATION_RULES;

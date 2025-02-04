import { Address } from "viem";

type Token = {
  id: string;
  token_name: string;
  token_symbol: string;
  token_address: Address;
  exchange_address: Address;
  token_total_supply: number;
  token_logo_url: string;
  create_token_page: boolean;
  warpcast_channel_link: string;
  website_url: string;
  twitter_url: string;
  telegram_url: string;
  chain: {
    id: number;
    name: "optimism" | "base" | "mode";
    deployer_address: Address;
    transaction_hash: string;
  };
  is_active: boolean;
  created_at: string;
  updated_at: string;
  market_cap: number;
  price: number;
  volume: number;
  total_buy_count: number;
  total_sell_count: number;
};

interface ILBTradeInterface {
  standAlone?: boolean;
  token?: Token;
}

export type { ILBTradeInterface, Token };

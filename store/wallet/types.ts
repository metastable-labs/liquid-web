type Wallet = {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logo: string;
  balance: string;
  balanceUSD: number;
  uiAmount: number;
  chainId: "base" | "solana";
};

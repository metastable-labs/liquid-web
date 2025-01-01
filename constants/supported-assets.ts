export interface SupportedAsset {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  logo: string;
  balance: number;
}

const supportedAssets = [
  {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6,
    symbol: "USDC",
    name: "USDC",
    logo: "https://assets.smold.app/api/token/8453/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913/logo-128.png",
    balance: 3600,
  },
  {
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    logo: "https://assets.smold.app/api/token/8453/0x4200000000000000000000000000000000000006/logo-128.png",
    balance: 3600,
  },
  {
    address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
    decimals: 6,
    symbol: "USDbC",
    name: "USD Base Coin",
    logo: "https://assets.smold.app/api/token/8453/0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA/logo-128.png",
    balance: 3600,
  },
  {
    address: "0x940181a94A35A4569E4529A3CDfB74e38FD98631",
    decimals: 18,
    symbol: "AERO",
    name: "Aerodrome",
    logo: "https://assets.smold.app/api/token/8453/0x940181a94A35A4569E4529A3CDfB74e38FD98631/logo-128.png",
    balance: 3600,
  },
  {
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    decimals: 18,
    symbol: "DAI",
    name: "DAI Stablecoin",
    logo: "https://assets.smold.app/api/token/8453/0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb/logo-128.png",
    balance: 3600,
  },
  {
    address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    decimals: 18,
    symbol: "cbBTC",
    name: "Coinbase Wrapped BTC",
    logo: "https://assets.smold.app/api/token/8453/0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf/logo-128.png",
    balance: 3600,
  },
  {
    address: "0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42",
    decimals: 6,
    symbol: "EURC",
    name: "EURC",
    logo: "https://assets.smold.app/api/token/8453/0x60a3E35Cc302bFA44Cb288Bc5a4F316Fdb1adb42/logo-128.png",
    balance: 3600,
  },
  {
    address: "0xA88594D404727625A9437C3f886C7643872296AE",
    decimals: 18,
    symbol: "WELL",
    name: "WELL",
    logo: "https://assets.smold.app/api/token/8453/0xA88594D404727625A9437C3f886C7643872296AE/logo-128.png",
    balance: 3600,
  },
];

export default supportedAssets;

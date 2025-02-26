type Protocol = {
  name: string;
  description: string;
  icon: string;
  link: string;
  id: string;
};

const PROTOCOLS: Array<Protocol> = [
  {
    name: "Moonwell",
    description:
      "Moonwell is a decentralized exchange (DEX) that enables users to trade tokens directly from their wallets.",
    icon: "/images/moonwell.png",
    link: "https://moonwell.io",
    id: "moonwell",
  },
  {
    name: "Solana",
    description:
      "Solana is a high-performance blockchain that can support thousands of transactions per second.",
    icon: "/images/solana.png",
    link: "https://solana.com",
    id: "solana",
  },
];

export default PROTOCOLS;

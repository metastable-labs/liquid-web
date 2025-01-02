type Asset = {
  logo: string;
  name: string;
  symbol: string;
};

type Entity = {
  handle: string;
  id: string;
};

type Meta = {
  count: number;
  next: number | null;
  prev: number | null;
};

type Position = {
  apy: string;
  assets: Array<Asset>;
  closedAt: string | null;
  closeTransactionHash: string | null;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  profitLoss: string;
  rewards: string;
  status: "ACTIVE" | "CLOSED" | "PENDING" | "DELETED";
  strategyId: string;
  totalBalance: string;
  transactionHash: string;
  updatedAt: string;
  userId: string;
  yieldEarned: string;
};

type Positions = {
  meta: Meta;
  positions: Array<Position>;
};

type Position_ = {
  estimatedAPY: number;
  iconPairs: Array<{
    primary: string;
    secondary: string;
  }>;
  rewards: number;
  title: string;
  totalBalance: number;
  yieldEarned: number;
};

type Step = {
  actionType: "SUPPLY" | "BORROW" | "REPAY" | "WITHDRAW";
  amountRatio: number;
  assetOut: string;
  assets: Array<Asset>;
  assetsIn: string[];
  data: string;
  id: string;
  protocol: {
    logo: string;
    name: string;
    symbol: string;
  };
  sequence: number;
  transactionHash: null;
};

type Strategies = {
  meta: Meta;
  strategies: Array<Strategy>;
};

type Strategy = {
  agentCuratorFee: string;
  apy: string;
  createdAt: string;
  curator: Entity;
  description: string;
  id: string;
  minDeposit: string;
  name: string;
  numberOfDeposits: number;
  owner: Entity;
  riskProfile: string;
  riskScore: number;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  steps: Array<Step>;
  totalValueLocked: string;
  tvl: string;
};

type User = {
  id: string;
  avatar: string;
  name: string;
  username: string;
  following: number;
  followers: number;
  warpcastURL: string;
  twitterURL: string;
  createdAt: string;
  updatedAt: string;
};

type Agent = {
  id: string;
  name: string;
  goal: string;
  type: string;
  token: {
    agentId: string;
    name: string;
    symbol: string;
    locked: string;
    marketCap: string;
    status: string;
  };
  creator: Creator;
  winRate: number;
  users: number;
  last7dPnl: number;
  totalPnl: number;
  active?: boolean;
};

type Creator = {
  username: string;
  fid: number;
  followers: number;
  following: number;
  pfp: string;
  profile: { bio: any[] };
};

type InfoCardProps = {
  title: string;
  children: React.ReactNode;
};

type Transaction = {
  type: "buy" | "sell";
  date: string;
  amount: number;
  token: string;
};

type AgentLog = {
  date: string;
  transactions: Array<Transaction>;
};

type Log = {
  timestamp: string;
  message: string;
  type: "INFO" | "ERROR" | "WARNING";
  terminate: boolean;
};

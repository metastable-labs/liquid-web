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
  creator: string;
  winRate: number;
  users: number;
  last7dPnl: string;
  totalPnl: string;
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

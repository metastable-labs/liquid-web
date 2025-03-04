type AgentDelegationDetails = {
  id: string;
  agentId: string;
  userId: string;
  provider: string;
  key: string;
  permissions: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  chain: "BASE" | "SOLANA";
};

type Creator = {
  username: string;
  fid: number;
  followers: number;
  following: number;
  pfp: string;
  profile: {
    bio: {
      text: string;
    };
  };
};

type Agent = {
  id: string;
  name: string;
  goal: string;
  type: string;
  token: {
    agentId: string;
    name: string;
    locked: string;
    marketCap: string;
    status: string;
    symbol: string;
  };
  creator: Creator;
  winRate: number;
  users: number;
  last7dPnl: number;
  totalPnl: number;
  active?: boolean;
};

type AgentsMeta = {
  perPage: string;
  totalItems: number;
  nextPage: number | null;
  previousPage: number | null;
};

type AgentsResponse = {
  data: Agent[];
  meta: AgentsMeta;
  success: boolean;
  message: string;
};

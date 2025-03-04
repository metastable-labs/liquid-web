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

type AgentsMeta = {
  size: number;
  totalItems: number;
  nextPage: number;
  previousPage: string;
};

type AgentsResponse = AgentsMeta & {
  records: Array<Agent>;
};

type DelegatedAgents = {
  name: string;
  creator: string;
  winRate: number;
  users: number;
  last7dPnl: number;
  totalPnl: number;
  agentId: string;
  agentType: string;
  pfp: string;
};

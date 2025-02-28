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

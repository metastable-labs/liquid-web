import { axiosInstance } from "@/utils/axios";

type API = {
  fetchAgent: (agentId: string) => Promise<Agent>;
  fetchDelegationStatus: (agentId: string) => Promise<AgentDelegationDetails[]>;
  delegateOrUndelegate: (
    agentId: string,
    isActive: boolean,
    chain: string
  ) => Promise<void>;
  connectUser: () => Promise<void>;
  fetchAgents: (page: number) => Promise<AgentsResponse>;
  fetchDelegatedAgents: () => Promise<AgentsResponse>;
  fetchMyAgents: (page: number) => Promise<AgentsResponse>;
  fetchChannelFollowers: () => Promise<ChannelFollower[]>;
};

const api: API = {
  fetchDelegationStatus: async (
    agentId: string
  ): Promise<AgentDelegationDetails[]> => {
    const response = await axiosInstance.get(
      `agents/delegate/status/${agentId}`
    );

    return response.data?.data;
  },

  fetchAgent: async (agentId: string) => {
    const response = await axiosInstance.get(`agents/${agentId}`);

    return response.data?.data;
  },

  delegateOrUndelegate: async (
    agentId: string,
    isActive: boolean,
    chain: string
  ) => {
    await axiosInstance.post(`agents/delegate`, { agentId, isActive, chain });
  },

  connectUser: async () => {
    await axiosInstance.post("user/connect", {
      provider: "privy",
    });
  },

  fetchAgents: async (page: number) => {
    const response = await axiosInstance.get(`agents/all?size=12&page=${page}`);

    return response.data;
  },

  fetchDelegatedAgents: async () => {
    const response = await axiosInstance.get(`/agents/delegate?size=50`);

    return response.data;
  },

  fetchMyAgents: async (page: number) => {
    const response = await axiosInstance.get(`agents?size=12&page=${page}`);

    return response.data;
  },

  fetchChannelFollowers: async () => {
    const response = await axiosInstance.get(`social/channel/followers`);

    return response.data?.data;
  },
};

export default api;

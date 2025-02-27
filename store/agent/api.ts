import { axiosInstance } from "@/utils/axios";

type API = {
  fetchAgent: (agentId: string) => Promise<Agent>;
  fetchDelegationStatus: (agentId: string) => Promise<AgentDelegationDetails>;
  delegateOrUndelegate: (agentId: string, isActive: boolean) => Promise<void>;
  connectUser: () => Promise<void>;
  fetchAgents: (page: number) => Promise<Agent[]>;
};

const api: API = {
  fetchDelegationStatus: async (
    agentId: string
  ): Promise<AgentDelegationDetails> => {
    const response = await axiosInstance.get(
      `agents/delegate/status/${agentId}`
    );

    return response.data?.data;
  },

  fetchAgent: async (agentId: string) => {
    const response = await axiosInstance.get(`agents/${agentId}`);

    return response.data?.data;
  },

  delegateOrUndelegate: async (agentId: string, isActive: boolean) => {
    await axiosInstance.post(`agents/delegate`, { agentId, isActive });
  },

  connectUser: async () => {
    await axiosInstance.post("user/connect", {
      provider: "privy",
    });
  },

  fetchAgents: async (page: number) => {
    const response = await axiosInstance.get(`agents/all?size=12&page=${page}`);

    return response.data?.data;
  },
};

export default api;

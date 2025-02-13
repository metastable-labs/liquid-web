import { axiosInstance } from "@/utils/axios";

type API = {
  fetchDelegationStatus: (agentId: string) => Promise<AgentDelegationDetails>;
  delegateOrUndelegate: (agentId: string, isActive: boolean) => Promise<void>;
  connectUser: () => Promise<void>;
};

const api: API = {
  fetchDelegationStatus: async (
    agentId: string
  ): Promise<AgentDelegationDetails> => {
    const response = await axiosInstance.get(
      `agents/delegate/status/${agentId}`
    );

    return response.data;
  },

  delegateOrUndelegate: async (agentId: string, isActive: boolean) => {
    await axiosInstance.post(`agents/delegate`, { agentId, isActive });
  },

  connectUser: async () => {
    await axiosInstance.post("user/connect", {
      provider: "privy",
    });
  },
};

export default api;

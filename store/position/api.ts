import { axiosInstance } from "@/utils/axios";

type API = {
  fetchStrategies: (query: string) => Promise<Strategies>;
  fetchPositions: (query: string) => Promise<Positions>;
};

const api: API = {
  fetchStrategies: async (query: string): Promise<Strategies> => {
    const response = await axiosInstance.get(`strategies?${query}`);

    const data = {
      strategies: response.data?.data,
      meta: response.data?.meta,
    };

    return data;
  },

  fetchPositions: async (query: string): Promise<Positions> => {
    const response = await axiosInstance.get(`positions?${query}`);

    const data = {
      positions: response.data?.data,
      meta: response.data?.meta,
    };

    return data;
  },
};

export default api;

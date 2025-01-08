import { axiosInstance } from "@/utils/axios";

type API = {
  onboard: (walletAddress: string) => Promise<any>;
};

const api: API = {
  onboard: async (walletAddress: string): Promise<any> => {
    const response = await axiosInstance.post(`user/onboard`, {
      walletAddress,
    });

    return response.data;
  },
};

export default api;

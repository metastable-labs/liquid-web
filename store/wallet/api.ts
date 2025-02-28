import { axiosInstance } from "@/utils/axios";

type API = {
  fetchAssets: () => Promise<Wallet[]>;
};

const api: API = {
  fetchAssets: async () => {
    const response = await axiosInstance.get(`user/portfolio`);

    return response.data?.data;
  },
};

export default api;

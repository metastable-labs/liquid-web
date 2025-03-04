import axios, { AxiosError } from "axios";
import { setupCache } from "axios-cache-interceptor";
import { getAccessToken } from "@privy-io/react-auth";

const axiosInstance = axios.create({
  baseURL: "https://dev.useliquid.xyz/aqua/api/v1/",
});

// const axiosInstance = setupCache(Axios);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      const accessToken = await getAccessToken();

      if (!accessToken) return;

      await setTokenHeader(accessToken);

      if (error.config?.headers) {
        // Update the original request's headers with the new token.
        error.config.headers.Authorization = `Bearer ${accessToken}`;

        // Retry the request using the original config.
        return axiosInstance(error.config);
      }
    }
    return Promise.reject(error);
  }
);

const setTokenHeader = async (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { axiosInstance, setTokenHeader };

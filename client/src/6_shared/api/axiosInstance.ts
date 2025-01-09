import type { AxiosError } from 'axios';
import axios from 'axios';
import type { AppStore } from '../../1_app/store/store';
import { z } from 'zod';

let store: AppStore | null = null;

const axiosInstance = axios.create({
  baseURL: '/api',
});

export function injectStore(_store: AppStore): void {
  store = _store;
}

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${store?.getState().auth.accessToken}`;
  }
  return config;
});

const accessTokenSchema = z.object({
  accessToken: z.string(),
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: { sent?: boolean } }) => {
    const prevRequest = error.config;
    if (error.response?.status === 403 && !prevRequest.sent) {
      const response = await axios('/api/tokens/refresh');
      const newAccessToken = accessTokenSchema.parse(response.data).accessToken;
      store?.dispatch({ type: 'auth/setAccessToken', payload: newAccessToken });
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

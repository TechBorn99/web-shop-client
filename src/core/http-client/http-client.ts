import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import localStorageService from 'core/services/internal/local-storage.service';
import { authStoreSagas } from 'core/store/auth-store/auth-store.types';
import { store } from 'index';
import {
  WebShopApiAuthUrls,
  WEBSHOP_API_AUTH_BASE_URL,
} from 'utils/constants/api/webshop-api-endpoints.consts';
import { AuthRoutes } from 'utils/constants/routes/app-routes.consts';

const http: AxiosInstance = axios.create();

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (
      !config.url?.includes(WEBSHOP_API_AUTH_BASE_URL) ||
      config.url.includes(WebShopApiAuthUrls.SignOut) ||
      config.url.includes(WebShopApiAuthUrls.UserInfo)
    ) {
      config.headers!.Authorization = `Bearer ${
        localStorageService.getSignedUser()?.token
      }`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (
      error?.message?.includes('401') &&
      !window.location.pathname.includes(AuthRoutes.SignIn)
    ) {
      store.dispatch(
        authStoreSagas.signUserOut({
          shouldCallAPI: false,
        }),
      );
      window.location.replace(AuthRoutes.SignIn);
    }
    return Promise.reject(error);
  },
);

export default http;

const WEBSHOP_API_BASE_URL = `${process.env.REACT_APP_WEBSHOP_API_URL}/api`;

export const WEBSHOP_API_AUTH_BASE_URL = `${WEBSHOP_API_BASE_URL}/auth`;
export const WEBSHOP_API_USERS_BASE_URL = `${WEBSHOP_API_BASE_URL}/users`;

export const WebShopApiAuthUrls = {
  SignIn: `${WEBSHOP_API_AUTH_BASE_URL}/sign-in`,
  SignUp: `${WEBSHOP_API_AUTH_BASE_URL}/sign-up`,
  SignOut: `${WEBSHOP_API_AUTH_BASE_URL}/sign-out`,
  UserInfo: `${WEBSHOP_API_USERS_BASE_URL}/user-info`,
  ForgotPassword: `${WEBSHOP_API_AUTH_BASE_URL}/forgot-password`,
  ResetPassword: `${WEBSHOP_API_AUTH_BASE_URL}/reset-password`,
};

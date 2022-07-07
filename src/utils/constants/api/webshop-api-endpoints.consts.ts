const WEBSHOP_API_BASE_URL = `${process.env.REACT_APP_WEBSHOP_API_URL}/api`;

export const WEBSHOP_API_AUTH_BASE_URL = `${WEBSHOP_API_BASE_URL}/auth`;
export const WEBSHOP_API_USERS_BASE_URL = `${WEBSHOP_API_BASE_URL}/users`;
export const WEBSHOP_API_PRODUCTS_BASE_URL = `${WEBSHOP_API_BASE_URL}/products`;
export const WEBSHOP_API_SHOPPING_CART_BASE_URL = `${WEBSHOP_API_BASE_URL}/shopping-cart`;
export const WEBSHOP_API_PAYMENT_BASE_URL = `${WEBSHOP_API_BASE_URL}/payment`;

export const WebShopApiAuthUrls = {
  SignIn: `${WEBSHOP_API_AUTH_BASE_URL}/sign-in`,
  SignUp: `${WEBSHOP_API_AUTH_BASE_URL}/sign-up`,
  SignOut: `${WEBSHOP_API_AUTH_BASE_URL}/sign-out`,
  UserInfo: `${WEBSHOP_API_USERS_BASE_URL}/user-info`,
  ForgotPassword: `${WEBSHOP_API_AUTH_BASE_URL}/forgot-password`,
  ResetPassword: `${WEBSHOP_API_AUTH_BASE_URL}/reset-password`,
};

export const WebShopApiProductUrl = {
  GetProductPage: `${WEBSHOP_API_PRODUCTS_BASE_URL}`,
  MakeProductAvailable: (uuid: string) =>
    `${WEBSHOP_API_PRODUCTS_BASE_URL}/product/${uuid}/available`,
  MakeProductUnavailable: (uuid: string) =>
    `${WEBSHOP_API_PRODUCTS_BASE_URL}/product/${uuid}/not-available`,
  SoftDeleteProduct: (uuid: string) =>
    `${WEBSHOP_API_PRODUCTS_BASE_URL}/product/${uuid}`,
  CreateNewProduct: `${WEBSHOP_API_PRODUCTS_BASE_URL}/create`,
  UpdateProduct: `${WEBSHOP_API_PRODUCTS_BASE_URL}/product/update`,
};

export const WebShopApiShoppingCartUrl = {
  AddAnItem: `${WEBSHOP_API_SHOPPING_CART_BASE_URL}/add-item`,
  GetByUuids: `${WEBSHOP_API_SHOPPING_CART_BASE_URL}/get-items`,
  GetShoppingCart: `${WEBSHOP_API_SHOPPING_CART_BASE_URL}`,
  RemoveSingleItem: (uuid: string) =>
    `${WEBSHOP_API_SHOPPING_CART_BASE_URL}/shopping-cart-items/${uuid}`,
};

export const WebShopApiPaymentUrls = {
  Charge: `${WEBSHOP_API_PAYMENT_BASE_URL}/charge`,
  GetAllPayments: `${WEBSHOP_API_PAYMENT_BASE_URL}`,
};

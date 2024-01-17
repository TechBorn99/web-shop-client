export const GlobalRoutes = {
  Home: '/home',
  Auth: '/auth',
  ShoppingCart: '/shopping-cart',
  NotFound: '*',
  Dashboard: '/dashboard',
};

export const AuthRoutes = {
  SignIn: `${GlobalRoutes.Auth}/sign-in`,
  SignUp: `${GlobalRoutes.Auth}/sign-up`,
  ForgotPassword: `${GlobalRoutes.Auth}/forgot-password`,
  ResetPassword: `${GlobalRoutes.Auth}/reset-password`,
};

export const ProductRoutes = {
  SingleProduct: (productUuid: string) =>
    `${GlobalRoutes.Home}/products/${productUuid}`,
};

export const ShoppingCartRoutes = {
  ShoppingCart: `${GlobalRoutes.ShoppingCart}`,
};

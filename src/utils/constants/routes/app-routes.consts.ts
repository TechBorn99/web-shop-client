export const GlobalRoutes = {
  Home: '/home',
  Auth: '/auth',
  NotFound: '*',
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

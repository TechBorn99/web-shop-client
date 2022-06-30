export const GlobalRoutes = {
  Home: '/',
  Auth: '/auth',
  NotFound: '*',
};

export const AuthRoutes = {
  SignIn: `${GlobalRoutes.Auth}/sign-in`,
  SignUp: `${GlobalRoutes.Auth}/sign-up`,
  ForgotPassword: `${GlobalRoutes.Auth}/forgot-password`,
  ResetPassword: `${GlobalRoutes.Auth}/reset-password`,
};

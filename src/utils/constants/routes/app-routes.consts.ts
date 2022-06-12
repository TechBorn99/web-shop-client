export const GlobalRoutes = {
  Auth: '/auth'
};

export const AuthRoutes = {
  SignIn: `${GlobalRoutes.Auth}/sign-in`,
  SignUp: `${GlobalRoutes.Auth}/sign-up`,
  ForgotPassword: `${GlobalRoutes.Auth}/forgot-password`,
  ResetPassword: `${GlobalRoutes.Auth}/reset-password`,
};

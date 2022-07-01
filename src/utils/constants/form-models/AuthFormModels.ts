export interface SignUpFormModel {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}

export interface SignInFormModel {
  email: string;
  password: string;
}

export interface ForgotPasswordFormModel {
  email: string;
}

export interface ResetPasswordFormModel {
  password: string;
}

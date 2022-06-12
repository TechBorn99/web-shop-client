export interface SignInRequestDTO {
  email: string;
  password: string;
}

export interface SignUpRequestDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface ResetPasswordRequestDTO {
  password: string;
  token: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

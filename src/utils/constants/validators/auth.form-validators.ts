const emailValidationPattern =
  "^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";

const emailValidationPatternMessage = 'E-mail address not valid!';

const requiredFieldMessage = 'This field is required!';

export const SignInFormValidator = {
  email: [
    { required: true, message: requiredFieldMessage },
    {
      pattern: emailValidationPattern,
      message: emailValidationPatternMessage,
    },
  ],
  password: [
    {
      required: true,
      message: requiredFieldMessage,
    },
  ],
};

export const ForgotPasswordFormValidator = {
  email: [
    { required: true, message: requiredFieldMessage },
    {
      pattern: emailValidationPattern,
      message: emailValidationPatternMessage,
    },
  ],
};

export const ResetPasswordFormValidator = {
  password: [
    {
      required: true,
      message: requiredFieldMessage,
    },
    {
      pattern:
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-]).{8,}$',
      message:
        'A password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character!',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: requiredFieldMessage,
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }

        return Promise.reject(new Error('Passwords do not match!'));
      },
    }),
  ],
};

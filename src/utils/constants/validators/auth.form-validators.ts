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
    // {
    //   pattern:
    //     '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-]).{8,}$',
    //   message:
    //     'Lozinka treba da ima minimum 8 karaktera, jedno veliko slovo, jedno malo slovo, jedan broj i jedan specijalan karakter!',
    // },
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

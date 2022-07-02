const emailValidationPattern =
  "^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
const phoneNumberValidationPattern =
  '^(\\+\\d{1,3}( )?)?((\\(\\d{1,3}\\))|\\d{1,3})[- .]?\\d{3,4}[- .]?\\d{4}$';
const passwordValidationPattern =
  '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-]).{8,}$';

const emailValidationPatternMessage = 'E-mail address not valid!';
const phoneNumberValidationPatternMessage = 'Phone number not valid!';
const passwordValidationPatternMessage =
  'A password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character!';

const requiredFieldMessage = 'This field is required!';

export const SignUpFormValidator = {
  email: [
    { required: true, message: requiredFieldMessage },
    {
      pattern: emailValidationPattern,
      message: emailValidationPatternMessage,
    },
  ],
  phoneNumber: [
    {
      required: true,
      message: requiredFieldMessage,
    },
    {
      pattern: phoneNumberValidationPattern,
      message: phoneNumberValidationPatternMessage,
    },
  ],
  firstName: [
    {
      required: true,
      message: requiredFieldMessage,
    },
  ],
  lastName: [
    {
      required: true,
      message: requiredFieldMessage,
    },
  ],
  role: [
    {
      required: true,
      message: requiredFieldMessage,
    },
  ],
};

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
      pattern: passwordValidationPattern,
      message: passwordValidationPatternMessage,
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

export const SignInFormValidator = {
  email: [
    { required: true, message: 'This field is required!' },
    {
      pattern:
        "^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
      message: 'E-mail address not valid!',
    },
  ],
  password: [
    {
      required: true,
      message: 'This field is required!',
    },
    // {
    //   pattern:
    //     '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?.!@$%^&*-]).{8,}$',
    //   message:
    //     'Lozinka treba da ima minimum 8 karaktera, jedno veliko slovo, jedno malo slovo, jedan broj i jedan specijalan karakter!',
    // },
  ],
};

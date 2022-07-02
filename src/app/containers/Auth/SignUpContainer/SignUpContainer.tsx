import SignUpCard from 'app/components/Auth/SignUpCard/SignUpCard';
import authService from 'core/services/http/auth/auth.service';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpFormModel } from 'utils/constants/form-models/AuthFormModels';
import {
  showErrorMessage,
  showSuccessMessage,
} from 'utils/constants/messages/messages.helper';
import { AuthRoutes } from 'utils/constants/routes/app-routes.consts';

const SignUpContainer = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    role,
    phoneNumber,
  }: SignUpFormModel) => {
    try {
      setIsLoading(true);

      await authService.signUp({
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        phoneNumber: phoneNumber,
      });

      showSuccessMessage('User successfully created.');

      navigate(AuthRoutes.SignIn);
    } catch (err: any) {
      if (err.response.status === 409) {
        showErrorMessage('Account with this e-mail address already exists!');
      } else if (err.response.status === 422) {
        showErrorMessage('Invalid phone number!');
      } else {
        showErrorMessage('An error occurred!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='webshop-auth-page webshop-auth-container'>
      <SignUpCard onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default SignUpContainer;

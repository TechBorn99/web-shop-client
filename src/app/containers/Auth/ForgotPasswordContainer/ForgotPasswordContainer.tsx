import ForgotPasswordCard from 'app/components/Auth/ForgotPasswordCard/ForgotPasswordCard';
import authService from 'core/services/http/auth/auth.service';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordFormModel } from 'utils/constants/form-models/AuthFormModels';
import {
  showErrorMessage,
  showSuccessMessage,
} from 'utils/constants/messages/messages.helper';
import { AuthRoutes } from 'utils/constants/routes/app-routes.consts';

const ForgotPasswordContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async ({ email }: ForgotPasswordFormModel) => {
    try {
      setIsLoading(true);

      await authService.forgotPassword({ email });

      navigate(AuthRoutes.SignIn);

      showSuccessMessage(
        `E-mail was sent to address: ${email}. Please check your inbox.`,
      );
    } catch {
      showErrorMessage('User not found.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='webshop-auth-page webshop-auth-container'>
      <ForgotPasswordCard onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ForgotPasswordContainer;

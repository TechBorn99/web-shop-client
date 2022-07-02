import ResetPasswordCard from 'app/components/Auth/ResetPasswordCard/ResetPasswordCard';
import authService from 'core/services/http/auth/auth.service';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResetPasswordFormModel } from 'utils/constants/form-models/AuthFormModels';
import {
  showErrorMessage,
  showSuccessMessage,
} from 'utils/constants/messages/messages.helper';
import { AuthRoutes } from 'utils/constants/routes/app-routes.consts';

const ResetPasswordContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getTokenFromQueryParamsOrRedirect();
  }, []);

  const getTokenFromQueryParamsOrRedirect = () => {
    const {
      query: { token: resetPasswordToken },
    } = qs.parseUrl(location.search);

    if (!resetPasswordToken) {
      navigate(AuthRoutes.SignIn);
    } else {
      setToken(resetPasswordToken as string);
    }
  };

  const onSubmit = async ({ password }: ResetPasswordFormModel) => {
    try {
      setIsLoading(true);

      await authService.resetPassword({ password: password, token: token! });

      showSuccessMessage('Password changed successfully!');

      navigate(AuthRoutes.SignIn);
    } catch {
      showErrorMessage('An error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='webshop-auth-page webshop-auth-container'>
      <ResetPasswordCard onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

export default ResetPasswordContainer;

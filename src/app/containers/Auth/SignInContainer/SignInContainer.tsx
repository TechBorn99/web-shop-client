import SignInCard from 'app/components/Auth/SignInCard/SignInCard';
import authService from 'core/services/http/auth/auth.service';
import { authStoreSagas } from 'core/store/auth-store/auth-store.types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { showErrorMessage } from 'utils/constants/messages/messages.helper';
import { GlobalRoutes } from 'utils/constants/routes/app-routes.consts';
import { useDispatch } from 'react-redux';
import { SignInFormModel } from 'utils/constants/form-models/AuthFormModels';
//import { RootState } from 'types';
//import { authStoreActions } from 'core/store/auth-store/auth-store.slice';

export const SignInContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  //const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const onSubmit = async ({ email, password }: SignInFormModel) => {
    try {
      //dispatch(authStoreActions.startLoading());
      setIsLoading(true);
      const { data } = await authService.signIn({ email, password });

      dispatch(authStoreSagas.signUserIn(data));

      navigate(GlobalRoutes.Home);
    } catch {
      showErrorMessage('Wrong credentials entered!');
    } finally {
      setIsLoading(false);
      //dispatch(authStoreActions.stopLoading());
    }
  };

  return (
    <div className='webshop-auth-page webshop-auth-container'>
      <SignInCard onSubmit={onSubmit} isLoading={isLoading} />
    </div>
  );
};

import { PayloadAction } from '@reduxjs/toolkit';
import {
  SignInResponseDTO,
  UserDetailsResponseDTO,
} from 'core/services/http/auth/dto/auth-service.response.dto';
import { AuthStoreState } from './auth-store.types';

const signUserIn = (
  state: AuthStoreState,
  action: PayloadAction<SignInResponseDTO>,
) => {
  const { token } = action.payload;
  state.token = token;
};

const setUserInfo = (
  state: AuthStoreState,
  action: PayloadAction<UserDetailsResponseDTO>,
) => {
  const userDetails = action.payload;
  state.user = userDetails;
};

const updateAccessToken = (
  state: AuthStoreState,
  action: PayloadAction<string>,
) => {
  state.token = action.payload;
};

const clearUser = (state: AuthStoreState, action: PayloadAction) => {
  state.token = null;
  state.user = null;
};

const startLoading = (state: AuthStoreState, action: PayloadAction) => {
  console.log('test');
  state.isLoading = true;
};

const stopLoading = (state: AuthStoreState, action: PayloadAction) => {
  console.log('test');
  state.isLoading = false;
};

const authStoreReducers = {
  signUserIn,
  setUserInfo,
  updateAccessToken,
  clearUser,
  startLoading,
  stopLoading,
};

export default authStoreReducers;

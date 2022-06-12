import { createAction } from '@reduxjs/toolkit';
import {
  SignInResponseDTO,
  UserDetailsResponseDTO,
} from 'core/services/http/auth/dto/auth-service.response.dto';

export interface AuthStoreState {
  token?: string | null;
  user?: UserDetailsResponseDTO | null;
  isLoading: boolean;
}

export const authStoreSagas = {
  signUserIn: createAction<SignInResponseDTO>('signUserIn'),
  signUserOut: createAction<SignOutPayload>('signUserOut'),
};

export interface SignOutPayload {
  shouldCallAPI: boolean;
}
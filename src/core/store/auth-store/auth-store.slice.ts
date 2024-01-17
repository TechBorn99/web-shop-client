import { createSlice } from 'utils/@reduxjs/toolkit';
import authStoreReducers from './auth-store.reducer';
import { AuthStoreState } from './auth-store.types';

export const initialState: AuthStoreState = {
  token: null,
  user: null,
  isLoading: false,
};

const authStoreSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: authStoreReducers,
});

export const {
  actions: authStoreActions,
  reducer: authStoreReducer,
  name: authStoreKey,
} = authStoreSlice;

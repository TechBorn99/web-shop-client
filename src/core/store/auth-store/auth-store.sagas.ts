import { PayloadAction } from '@reduxjs/toolkit';
import authService from 'core/services/http/auth/auth.service';
import { SignInResponseDTO } from 'core/services/http/auth/dto/auth-service.response.dto';
import localStorageService from 'core/services/internal/local-storage.service';
import { all, put, takeEvery } from 'redux-saga/effects';
import { authStoreActions } from './auth-store.slice';
import { authStoreSagas, SignOutPayload } from './auth-store.types';

function* handleSignUserIn(action: PayloadAction<SignInResponseDTO>) {
  const {
    payload: { token, account },
  } = action;
  yield localStorageService.signUserIn({ token });
  yield put(authStoreActions.setUserInfo(account));
}

function* handleSignUserOut(action: PayloadAction<SignOutPayload>) {
  const { payload } = action;
  try {
    if (payload.shouldCallAPI) {
      yield authService.signOut();
    }

    yield put(authStoreActions.clearUser());
    localStorageService.clearUser();
  } catch {}
}

export default function* watchAuthStoreSagas() {
  yield all([
    takeEvery(authStoreSagas.signUserIn.type, handleSignUserIn),
    takeEvery(authStoreSagas.signUserOut.type, handleSignUserOut),
  ]);
}

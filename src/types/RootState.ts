import { AuthStoreState } from 'core/store/auth-store/auth-store.types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  auth: AuthStoreState;
}

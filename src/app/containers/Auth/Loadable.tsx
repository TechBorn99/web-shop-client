import { lazyLoad } from 'utils/loadable';

export const SignInContainer = lazyLoad(
  () => import('./SignInContainer/SignInContainer'),
  module => module.SignInContainer,
);

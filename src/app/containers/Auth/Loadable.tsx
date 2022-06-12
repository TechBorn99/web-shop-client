import { lazyLoad } from 'utils/loadable';

export const SignInContainer = lazyLoad(
  () => import('./SignInContainer'),
  module => module.SignInContainer,
);

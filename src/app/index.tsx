import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import {
  AuthRoutes,
  GlobalRoutes,
} from 'utils/constants/routes/app-routes.consts';
import { SignInContainer } from './containers/Auth/SignInContainer/SignInContainer';
import ForgotPasswordContainer from './containers/Auth/ForgotPasswordContainer/ForgotPasswordContainer';
import ResetPasswordContainer from './containers/Auth/ResetPasswordContainer/ResetPasswordContainer';
import SignUpContainer from './containers/Auth/SignUpContainer/SignUpContainer';
import AuthChecker from './components/Checkers/AuthChecker';
import WebShopStoreInitializer from './components/Initializers/WebShopStoreInitializer';
import WebShopHeader from './components/Layout/Header/WebShopHeader';

export function App() {
  const { i18n } = useTranslation();

  return (
    <BrowserRouter>
      <AuthChecker>
        <WebShopStoreInitializer />
        <Helmet
          titleTemplate='%s - WebShop'
          defaultTitle='WebShop'
          htmlAttributes={{ lang: i18n.language }}
        >
          <meta name='description' content='Online WebShop App' />
        </Helmet>
        <WebShopHeader />
        <Routes>
          <Route path={GlobalRoutes.Home} element={<HomePage />} />
          <Route path={GlobalRoutes.Auth}>
            <Route path={AuthRoutes.SignUp} element={<SignUpContainer />} />
            <Route path={AuthRoutes.SignIn} element={<SignInContainer />} />
            <Route
              path={AuthRoutes.ForgotPassword}
              element={<ForgotPasswordContainer />}
            />
            <Route
              path={AuthRoutes.ResetPassword}
              element={<ResetPasswordContainer />}
            />
            <Route path={GlobalRoutes.NotFound} element={<NotFoundPage />} />
          </Route>
          <Route path={GlobalRoutes.NotFound} element={<NotFoundPage />} />
        </Routes>
      </AuthChecker>
    </BrowserRouter>
  );
}

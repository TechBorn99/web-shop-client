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

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate='%s - WebShop'
        defaultTitle='WebShop'
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name='description' content='Online WebShop App' />
      </Helmet>

      <Routes>
        <Route path={GlobalRoutes.Home} element={<HomePage />} />
        <Route path={GlobalRoutes.Auth}>
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
    </BrowserRouter>
  );
}

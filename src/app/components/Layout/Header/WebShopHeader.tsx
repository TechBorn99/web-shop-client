import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'types';
import { getUserName } from 'utils/helpers/username.helper';
import WebShopButton from 'app/components/Shared/Misc/WebShopButton/WebShopButton';
import {
  AuthRoutes,
  GlobalRoutes,
  ShoppingCartRoutes,
} from 'utils/constants/routes/app-routes.consts';
import { ShoppingCartOutlined, DashboardFilled } from '@ant-design/icons';
import { PageHeader } from 'antd';
import { authStoreSagas } from 'core/store/auth-store/auth-store.types';
import localStorageService from 'core/services/internal/local-storage.service';
import { Roles } from 'core/services/http/auth/dto/auth-service.response.dto';

const WebShopHeader = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(
      authStoreSagas.signUserOut({
        shouldCallAPI: false,
      }),
    );

    localStorageService.clearUser();

    navigate(AuthRoutes.SignIn);
  };

  const renderExtra = (): ReactNode[] => {
    const actions: ReactNode[] = [];

    if (user == null) {
      actions.push([
        <WebShopButton
          text='Sign in'
          onClick={() => navigate(AuthRoutes.SignIn)}
          type='link'
        />,
        <WebShopButton
          text='Sign up'
          onClick={() => navigate(AuthRoutes.SignUp)}
          type='primary'
        />,
      ]);
    } else {
      actions.push(
        <WebShopButton
          text='Sign out'
          onClick={handleSignOut}
          type='link'
          isDanger
        />,
      );
    }

    if (user == null || user.role.name !== Roles.WebShopSeller) {
      actions.push(
        <WebShopButton
          text=''
          onClick={() => navigate(ShoppingCartRoutes.ShoppingCart)}
          type='primary'
          icon={<ShoppingCartOutlined />}
          style={{ borderRadius: '100px', background: '#9A9AEB' }}
        />,
      );
    }

    if (user != null && user.role.name === Roles.WebShopAdmin) {
      actions.push(
        <WebShopButton
          text=''
          onClick={() => navigate(GlobalRoutes.Dashboard)}
          type='primary'
          icon={<DashboardFilled />}
          style={{ borderRadius: '100px', background: '' }}
        />,
      );
    }

    actions.push(
      <WebShopButton
        text='Home'
        onClick={() => navigate(GlobalRoutes.Home)}
        type='primary'
        style={{ borderRadius: '100px', background: '#9A9AEB' }}
      />,
    );

    return actions;
  };

  return (
    <PageHeader
      className='site-page-header'
      title={
        user != null ? (
          getUserName(user)
        ) : (
          <WebShopButton
            text='WebShop'
            onClick={() => navigate(GlobalRoutes.Home)}
            type='text'
            style={{ fontSize: '18px', fontWeight: 'bold' }}
          />
        )
      }
      avatar={{
        src:
          user != null
            ? 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4'
            : 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
        // TODO: Replace these images when storing to s3 is enabled
        alt: 'Avatar',
      }}
      extra={renderExtra()}
    />
  );
};

export default WebShopHeader;

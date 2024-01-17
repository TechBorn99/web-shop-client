import { Form } from 'antd';
import WebShopFormButton from 'app/components/Shared/Form/Button/WebShopFormButton';
import WebShopFormInput from 'app/components/Shared/Form/Input/WebShopFormInput';
import WebShopFormPassword from 'app/components/Shared/Form/Input/WebShopFormPassword';
import WebShopAuthCardAdditionalInfo from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopAuthCardAdditionalInfo';
import WebShopAuthCardContainer from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopAuthCard';
import WebShopAuthCardContent from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopCardContent';
import React from 'react';
import { useNavigate } from 'react-router';
import { SignInFormValidator } from 'utils/constants/validators/auth.form-validators';
import { AuthRoutes } from 'utils/constants/routes/app-routes.consts';
import { SignInFormModel } from 'utils/constants/form-models/AuthFormModels';

interface SignInCardProps {
  isLoading: boolean;
  onSubmit: (values: any) => void;
}

const SignInCard = ({ isLoading, onSubmit }: SignInCardProps) => {
  const navigate = useNavigate();

  const onForgotPasswordClick = () => {
    navigate(AuthRoutes.ForgotPassword);
  };

  const onSignUpClick = () => {
    navigate(AuthRoutes.SignUp);
  };

  return (
    <div className='webshop-auth-container__card'>
      <WebShopAuthCardContainer>
        <WebShopAuthCardContent>
          <Form<SignInFormModel> onFinish={onSubmit}>
            <h1>Access your account</h1>
            <p style={{ width: '320px' }}>
              Please enter your credentials to sign in
            </p>
            <WebShopFormInput
              label='E-mail address'
              name='email'
              rules={SignInFormValidator.email}
              type='email'
            />
            <WebShopFormPassword
              label='Password'
              name='password'
              rules={SignInFormValidator.password}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <WebShopFormButton
                text='Log in'
                type='primary'
                htmlType='submit'
                isLoading={isLoading}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <WebShopFormButton
                text='Forgot password'
                type='link'
                onClick={onForgotPasswordClick}
                isLoading={isLoading}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <WebShopFormButton
                text='Sign up'
                type='ghost'
                onClick={onSignUpClick}
                isLoading={isLoading}
              />
            </div>
          </Form>
        </WebShopAuthCardContent>
        <WebShopAuthCardAdditionalInfo>
          <h1>WebShop</h1>
          <img
            src='https://i.ibb.co/JpfbfJF/003-Mac-Book-Space-Gray.png' // TODO: replace and save in assets
            alt='screenshot'
          />
          <h3>Welcome to the WebShop</h3>
          <p>A place where you can find anything, with just a few clicks!</p>
        </WebShopAuthCardAdditionalInfo>
      </WebShopAuthCardContainer>
    </div>
  );
};

export default SignInCard;

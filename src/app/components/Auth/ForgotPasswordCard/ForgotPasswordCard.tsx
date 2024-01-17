import { Form } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordFormModel } from 'utils/constants/form-models/AuthFormModels';
import { AuthRoutes } from 'utils/constants/routes/app-routes.consts';
import { ForgotPasswordFormValidator } from 'utils/constants/validators/auth.form-validators';
import WebShopFormButton from '../../Shared/Form/Button/WebShopFormButton';
import WebShopFormInput from '../../Shared/Form/Input/WebShopFormInput';
import WebShopAuthCardContainer from '../../Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopAuthCard';
import WebShopAuthCardAdditionalInfo from '../../Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopAuthCardAdditionalInfo';
import WebShopAuthCardContent from '../../Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopCardContent';

interface ForgotPasswordCardProps {
  isLoading: boolean;
  onSubmit: (values: ForgotPasswordFormModel) => void;
}

const ForgotPasswordCard = ({
  isLoading,
  onSubmit,
}: ForgotPasswordCardProps) => {
  const navigate = useNavigate();

  const handleBackToSignInClick = () => {
    navigate(AuthRoutes.SignIn);
  };

  return (
    <div className='webshop-auth-container__card'>
      <WebShopAuthCardContainer>
        <WebShopAuthCardContent>
          <Form<ForgotPasswordFormModel> onFinish={onSubmit}>
            <h1>You forgot your password?</h1>
            <p style={{ width: '320px' }}>
              Enter you e-mail, and we'll send you instructions on how to reset
              it!
            </p>
            <WebShopFormInput
              label='E-mail address'
              name='email'
              rules={ForgotPasswordFormValidator.email}
              type='email'
            />
            <WebShopFormButton
              text='Submit'
              type='primary'
              isLoading={isLoading}
              htmlType='submit'
            />
            <WebShopFormButton
              text='Back to sign-in page'
              type='link'
              onClick={handleBackToSignInClick}
            />
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

export default ForgotPasswordCard;

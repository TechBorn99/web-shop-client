import { Form } from 'antd';
import WebShopFormButton from 'app/components/Shared/Form/Button/WebShopFormButton';
import WebShopFormPassword from 'app/components/Shared/Form/Input/WebShopFormPassword';
import WebShopAuthCardContainer from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopAuthCard';
import WebShopAuthCardAdditionalInfo from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopAuthCardAdditionalInfo';
import WebShopAuthCardContent from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopCardContent';
import React from 'react';
import { ResetPasswordFormModel } from 'utils/constants/form-models/AuthFormModels';
import { ResetPasswordFormValidator } from 'utils/constants/validators/auth.form-validators';

interface ResetPasswordProps {
  isLoading: boolean;
  onSubmit: (values: ResetPasswordFormModel) => void;
}

const ResetPasswordCard = ({ isLoading, onSubmit }: ResetPasswordProps) => {
  return (
    <div className='webshop-auth-container__card'>
      <WebShopAuthCardContainer>
        <WebShopAuthCardContent>
          <Form<ResetPasswordFormModel> onFinish={onSubmit}>
            <h1>Choose a new password:</h1>
            <p style={{ width: '320px' }}>
              All that is left is to select a new password!
            </p>
            <WebShopFormPassword
              label='New password'
              name='password'
              rules={ResetPasswordFormValidator.password}
            />
            <WebShopFormPassword
              label='Confirm new password'
              name='confirm'
              rules={ResetPasswordFormValidator.confirmPassword}
            />
            <WebShopFormButton
              text='Change the password'
              type='primary'
              htmlType='submit'
              isLoading={isLoading}
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

export default ResetPasswordCard;

import { Form, RadioChangeEvent } from 'antd';
import WebShopFormButton from 'app/components/Shared/Form/Button/WebShopFormButton';
import WebShopFormInput from 'app/components/Shared/Form/Input/WebShopFormInput';
import WebShopAuthCardContainer from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopAuthCard';
import WebShopAuthCardAdditionalInfo from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopAuthCardAdditionalInfo';
import WebShopAuthCardContent from 'app/components/Shared/Form/Misc/WebShopCard/WebShopAuthCard/WebShopCardContent';
import WebShopFormRadioButton from 'app/components/Shared/Form/RadioButton/WebShopFormRadioButton';
import React, { useState } from 'react';
import { SignInFormModel } from 'utils/constants/form-models/AuthFormModels';
import { SignUpFormValidator } from 'utils/constants/validators/auth.form-validators';

interface SignUpCardProps {
  isLoading?: boolean;
  onSubmit: (values: any) => void;
}

const SignUpCard = ({ isLoading, onSubmit }: SignUpCardProps) => {
  const [role, setRole] = useState('WEBSHOP_CUSTOMER');

  const onChange = (e: RadioChangeEvent) => {
    console.log(e.target.value);
    setRole(e.target.value);
  };

  return (
    <div className='webshop-auth-container__card'>
      <WebShopAuthCardContainer>
        <WebShopAuthCardContent>
          <Form<SignInFormModel> onFinish={onSubmit}>
            <h1>Create a new account</h1>
            <p style={{ width: '320px' }}>
              Please enter your data, so we can create your account
            </p>
            <WebShopFormInput
              label='First name'
              name='firstName'
              rules={SignUpFormValidator.firstName}
            />
            <WebShopFormInput
              label='Last name'
              name='lastName'
              rules={SignUpFormValidator.lastName}
            />
            <WebShopFormInput
              label='E-mail address'
              name='email'
              rules={SignUpFormValidator.email}
              type='email'
            />
            <WebShopFormInput
              label='Phone number'
              name='phoneNumber'
              rules={SignUpFormValidator.phoneNumber}
            />
            <WebShopFormRadioButton
              defaultValue={role}
              currentValue={role}
              values={['WEBSHOP_CUSTOMER', 'WEBSHOP_SELLER']}
              options={['Customer', 'Seller']}
              onChange={onChange}
              name='role'
              label='Role'
              rules={SignUpFormValidator.role}
            />
            <WebShopFormButton
              text='Log in'
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

export default SignUpCard;

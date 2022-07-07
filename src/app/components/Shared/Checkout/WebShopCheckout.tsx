import paymentsService from 'core/services/http/payments/payments.service';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {
  showConfirmMessage,
  showErrorMessage,
  showSuccessMessage,
} from 'utils/constants/messages/messages.helper';
import { AuthRoutes } from 'utils/constants/routes/app-routes.consts';
import { numberFormatter } from 'utils/helpers/number-formatter.helper';

interface WebShopCheckoutProps {
  amount: number;
  name: string;
  isUserLoggedIn: boolean;
}

const WebShopCheckout = ({
  amount,
  name,
  isUserLoggedIn,
}: WebShopCheckoutProps) => {
  const navigate = useNavigate();

  const handleToken = async token => {
    try {
      console.log({ isUserLoggedIn });
      if (!isUserLoggedIn) {
        showConfirmMessage(
          'Sign in?',
          'Your payment was unsuccessful - you must be signed in to continue.',
          () => {
            navigate(AuthRoutes.SignIn);
          },
        );
      } else {
        checkout(token);
      }
    } catch (err: any) {
      showErrorMessage('Payment was unsuccessful!');
    }
  };

  const checkout = async token => {
    await paymentsService.charge({
      amount: amount,
      token: token.id,
    });
    showSuccessMessage('Payment was successful!');
  };

  return (
    <div>
      <StripeCheckout
        token={handleToken}
        stripeKey={
          'pk_test_51LIuBSCQluBFg8DlfcswFWmvJuT35Bu90XG01MnJEZ27iDVjQ4LRD0mSeyu6t9FANTCLsVGKJZbzg4BoQ2xqEG5u00qsTOZDCq'
        }
        label={'Pay Now'}
        name={name}
        image='https://joeschmoe.io/api/v1/random'
        description={`Your total is ${numberFormatter.format(amount || 0)} RSD`}
        panelLabel='Pay Now'
        currency='USD'
      />
    </div>
  );
};

export default WebShopCheckout;

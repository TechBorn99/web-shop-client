import React, { PropsWithChildren } from 'react';
import './style.scss';

type Props = PropsWithChildren<{}>;

const WebShopAuthCardAdditionalInfo = ({ children }: Props) => {
  return (
    <div className='webshop-auth-card-container__additional-info'>
      {children}
    </div>
  );
};

export default WebShopAuthCardAdditionalInfo;

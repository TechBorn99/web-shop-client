import React, { PropsWithChildren } from 'react';
import './style.scss';

type Props = PropsWithChildren<{}>;

const WebShopAuthCardContent = ({ children }: Props) => {
  return <div className='webshop-auth-card-container__content'>{children}</div>;
};

export default WebShopAuthCardContent;

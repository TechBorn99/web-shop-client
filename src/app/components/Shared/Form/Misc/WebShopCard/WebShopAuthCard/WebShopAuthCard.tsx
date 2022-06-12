import React, { PropsWithChildren } from 'react';
import './style.scss';

type Props = PropsWithChildren<{}>;

const WebShopAuthCardContainer = ({ children }: Props) => {
  return <div className='webshop-auth-card-container'>{children}</div>;
};

export default WebShopAuthCardContainer;

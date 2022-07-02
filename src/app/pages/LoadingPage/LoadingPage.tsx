import { Spin } from 'antd';
import React from 'react';
import './style.scss';

const LoadingPage = () => {
  return (
    <div className='webshop-loading-page'>
      <h1>WebShop</h1>
      <Spin />
    </div>
  );
};

export default LoadingPage;

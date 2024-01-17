import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles.scss';

const WebShopFooter = () => {
  const location = useLocation();

  return (
    <Footer
      style={{
        display:
          location.pathname.includes('shopping-cart') ||
          location.pathname.includes('dashboard')
            ? 'none'
            : '',
      }}
    >
      <div className='grid-wrapper'>
        <div className='grid'>
          <div className='grid-content-1 grid-title'>About company</div>
          <div className='grid-content-2'>Coming soon</div>
          <div className='grid-content-3'>Coming soon</div>
          <div className='grid-content-4 grid-title'>Our products</div>
          <div className='grid-content-5'>Coming soon</div>
          <div className='grid-content-6'>Coming soon</div>
          <div className='grid-content-7 grid-title'>Help</div>
          <div className='grid-content-8'>Coming soon</div>
          <div className='grid-content-9'>Coming soon</div>
        </div>
      </div>
      <hr
        style={{
          maxWidth: '50%',
          marginTop: '16px',
          height: '1px',
          backgroundColor: '#D3DBD8',
          border: 'none',
        }}
      />
      <div className='copyright'>
        Copyright Ⓒ 2022
        <a
          style={{ color: 'black', marginLeft: '8px', fontWeight: 'bold' }}
          href='https://github.com/Stefi99R'
        >
          Stefan Radojević
        </a>
      </div>
    </Footer>
  );
};

export default WebShopFooter;

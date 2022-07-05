import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
import './styles.scss';

const WebShopFooter = () => {
  return (
    <Footer>
      <div className='grid-wrapper'>
        <div className='grid'>
          <div className='grid-content-1 grid-title'>About company</div>
          <div className='grid-content-2'>Available soon</div>
          <div className='grid-content-3'>Available soon</div>
          <div className='grid-content-4 grid-title'>Our products</div>
          <div className='grid-content-5'>Available soon</div>
          <div className='grid-content-6'>Available soon</div>
          <div className='grid-content-7 grid-title'>Help</div>
          <div className='grid-content-8'>Available soon</div>
          <div className='grid-content-9'>Available soon</div>
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

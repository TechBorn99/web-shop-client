import WebShopProductList from 'app/components/Products/WebShopProductList';
import WebShopCarousel from 'app/components/Shared/Misc/WebShopCarousel/WebShopCarousel';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import './styles.scss';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name='description' content='WebShop homepage' />
      </Helmet>
      <WebShopCarousel />
      <h1 className='h1-text'>WebShop products</h1>
      <WebShopProductList />
    </>
  );
}

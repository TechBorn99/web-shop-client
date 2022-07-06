import { Carousel } from 'antd';
import React from 'react';
import WebShopCarouselImage from './WebShopCarouselImage/WebShopCarouselImage';

const WebShopCarousel = () => {
  const imageUrls = [
    'carousel-1.jpg',
    'carousel-2.jpg',
    'carousel-3.jpg',
    'carousel-4.jpg',
  ];

  return (
    <Carousel autoplay>
      {imageUrls.map(imageUrl => (
        <WebShopCarouselImage imageUrl={imageUrl} key={imageUrl} />
      ))}
    </Carousel>
  );
};

export default WebShopCarousel;

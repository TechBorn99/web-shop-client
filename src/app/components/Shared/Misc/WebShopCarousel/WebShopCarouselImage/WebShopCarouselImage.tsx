import React from 'react';

interface WebShopCarouselImageProps {
  imageUrl: string;
}

const WebShopCarouselImage = ({ imageUrl }: WebShopCarouselImageProps) => {
  return (
    <div>
      <img
        style={{ width: '100%', height: '60vh', objectFit: 'cover' }}
        src={imageUrl}
        alt='Carousel'
      />
    </div>
  );
};

export default WebShopCarouselImage;

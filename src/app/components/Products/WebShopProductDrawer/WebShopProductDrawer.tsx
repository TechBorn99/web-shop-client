import { Avatar, Drawer, Image, List } from 'antd';
import { ProductResponseDTO } from 'core/services/http/products/dto/product-service.response.dto';
import React from 'react';
import { convertToReadableDate } from 'utils/helpers/date.helpers';
import { getUserName } from 'utils/helpers/username.helper';
import './styles.scss';

interface WebShopProductDrawerProps {
  product: ProductResponseDTO | undefined;
  visible: boolean;
  onClose: (visible: boolean) => void;
  placement: 'top' | 'bottom' | 'right' | 'left';
}

const WebShopProductDrawer = ({
  product,
  visible,
  onClose,
  placement,
}: WebShopProductDrawerProps) => {
  return (
    <Drawer
      width={640}
      onClose={() => onClose(visible)}
      visible={visible}
      placement={placement}
      closable={false}
      className='webshop-drawer'
    >
      <Image
        style={{
          width: '640px',
          height: '300px',
          objectFit: 'cover',
        }}
        src='https://picsum.photos/640/300'
        alt='Product'
      />

      <div className='title-wrapper'>
        <h1 className='title'>{product?.name}</h1>
      </div>
      <div className='description-wrapper'>
        <div className='attribute'>
          <p className='info-name'>Price:</p>
          <p className='info-description'>
            {product?.price} <b>RSD</b>
          </p>
        </div>
        <div className='attribute'>
          <p className='info-name'>Product description: </p>
          <p className='info-description'>
            {product?.description !== '' ? product?.description : '/'}
          </p>
        </div>
        <div className='attribute'>
          <p className='info-name'>Posted on: </p>
          <p className='info-description'>
            {product && convertToReadableDate(product.createdAt)}
          </p>
        </div>
        <div>
          <List.Item.Meta
            className='avatar'
            avatar={
              <div className='grid-item-1' style={{ display: 'flex' }}>
                <Avatar src='https://joeschmoe.io/api/v1/random' />
                <div
                  style={{
                    marginLeft: '8px',
                    textAlign: 'center',
                    marginTop: '4px',
                  }}
                >
                  {getUserName(product?.seller?.account)}
                </div>
              </div>
            } // TODO: user avatar image placeholder, should replace when image storing to s3 is enabled
          />
        </div>
      </div>
    </Drawer>
  );
};

export default WebShopProductDrawer;

import { Avatar, Card, Image, List } from 'antd';
import Meta from 'antd/lib/card/Meta';
import WebShopCheckout from 'app/components/Shared/Checkout/WebShopCheckout';
import WebShopButton from 'app/components/Shared/Misc/WebShopButton/WebShopButton';
import { ProductResponseDTO } from 'core/services/http/products/dto/product-service.response.dto';
import {
  ShoppingCartItemResponseDTO,
  ShoppingCartResponseDTO,
} from 'core/services/http/shopping-cart/dto/shopping-cart-service.response';
import shoppingCartService from 'core/services/http/shopping-cart/shopping-cart.service';
import localStorageService from 'core/services/internal/local-storage.service';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import {
  showErrorMessage,
  showSuccessMessage,
} from 'utils/constants/messages/messages.helper';
import { numberFormatter } from 'utils/helpers/number-formatter.helper';
import { getUserName } from 'utils/helpers/username.helper';
import './styles.scss';

const ShoppingCartContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ShoppingCartResponseDTO>();
  const user = useSelector((state: RootState) => state.auth.user);
  const [areProductsFromLocalStorage, setAreProductsFromLocalStorage] =
    useState(false);

  const fetchItemsFromLocalStorage = async () => {
    const localStorageShoppingCartItems =
      localStorageService.getShoppingCartProducts();

    const shoppingCartItemsUuids = localStorageShoppingCartItems.map(
      storageItem => storageItem.cartItemUuid,
    );

    const { data } = await shoppingCartService.getItemsByUuids({
      cartItemsUuids: shoppingCartItemsUuids,
    });

    const totalPrice = data
      .map(product => {
        const pricePerUnit = product.price;

        const quantity =
          localStorageShoppingCartItems.find(
            storageCartItem => storageCartItem.cartItemUuid === product.uuid,
          )?.quantity || 0;

        return pricePerUnit * quantity;
      })
      .reduce((partialSum, a) => partialSum + a, 0);

    const shoppingCartData: ShoppingCartItemResponseDTO[] = data.map(
      product => {
        const quantity =
          localStorageShoppingCartItems.find(
            storageCartItem => storageCartItem.cartItemUuid === product.uuid,
          )?.quantity || 0;

        return {
          quantity: quantity,
          product: product,
          totalPrice: quantity * product.price,
        };
      },
    );

    setData({
      totalPrice: totalPrice,
      shoppingCartItems: shoppingCartData,
    });

    setAreProductsFromLocalStorage(true);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);

      if (user != null) {
        const { data } = await shoppingCartService.getShoppingCart();

        if (data == null) {
          fetchItemsFromLocalStorage();
        } else {
          setData(data);
        }
      } else {
        fetchItemsFromLocalStorage();
      }
    } catch (err: any) {
      console.log({ err });
      showErrorMessage('An error occurred while loading the data!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemoveSingleFromShoppingCart = async (
    product: ProductResponseDTO,
  ) => {
    if (!areProductsFromLocalStorage) {
      try {
        setIsLoading(true);

        if (user) {
          await shoppingCartService.removeSingleProduct({
            cartItemUuid: product.uuid,
          });
        } else {
          localStorageService.removeSingleFromCart({
            cartItemUuid: product.uuid,
            quantity: 1,
          });
        }

        loadData();

        showSuccessMessage(
          'Product was successfully subtracted from your cart!',
        );
      } catch (err: any) {
        showErrorMessage('An error has occurred!');
      } finally {
        setIsLoading(false);
      }
    } else {
      localStorageService.removeSingleFromCart({
        cartItemUuid: product.uuid,
        quantity: 1,
      });

      loadData();
    }
  };

  const handleAddAnotherToTheCart = async (product: ProductResponseDTO) => {
    if (!areProductsFromLocalStorage) {
      try {
        setIsLoading(true);

        if (user) {
          await shoppingCartService.addAProduct({
            quantity: 1,
            cartItemUuid: product.uuid,
          });
        } else {
          localStorageService.addAProductToTheCart({
            cartItemUuid: product.uuid,
            quantity: 1,
          });
        }

        loadData();

        showSuccessMessage('Product was successfully added to you cart!');
      } catch (err: any) {
        console.log({ err });
        showErrorMessage(
          'An error has occurred while trying to add an item to cart!',
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      localStorageService.addAProductToTheCart({
        cartItemUuid: product.uuid,
        quantity: 1,
      });

      loadData();
    }
  };

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        style={{ margin: '48px auto' }}
        dataSource={data?.shoppingCartItems}
        className='item-list'
        renderItem={item => (
          <List.Item>
            <Card
              style={{ borderRadius: '10px' }}
              cover={
                <Image
                  alt='example'
                  src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                />
              }
            >
              <Meta
                avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
                title={item.product.name}
                description={item.product.description}
              />
              <div style={{ marginTop: '48px', display: 'flex' }}>
                <p style={{ fontWeight: 'bold', marginRight: '8px' }}>
                  Quantity:
                </p>
                <p>{item.quantity}</p>
              </div>
              <div style={{ marginTop: '12px', display: 'flex' }}>
                <p style={{ fontWeight: 'bold', marginRight: '8px' }}>
                  Price per unit:
                </p>
                <p>{numberFormatter.format(item.product.price)} RSD</p>
              </div>
              <div style={{ marginTop: '12px', display: 'flex' }}>
                <p style={{ fontWeight: 'bold', marginRight: '8px' }}>
                  Total price:
                </p>
                <p>{numberFormatter.format(item.totalPrice)} RSD</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1' }}>
                <WebShopButton
                  type='primary'
                  isDanger
                  text='Remove single from the cart'
                  onClick={() =>
                    handleRemoveSingleFromShoppingCart(item.product)
                  }
                  isLoading={isLoading}
                />
                <WebShopButton
                  style={{ marginTop: '12px' }}
                  type='primary'
                  text='Add another'
                  onClick={() => handleAddAnotherToTheCart(item.product)}
                  isLoading={isLoading}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <WebShopCheckout
          amount={data?.totalPrice || 0}
          name={getUserName(user)}
          isUserLoggedIn={user != null}
        />
      </div>
    </div>
  );
};

export default ShoppingCartContainer;

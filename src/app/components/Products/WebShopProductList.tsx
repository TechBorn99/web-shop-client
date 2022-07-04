import {
  Avatar,
  Divider,
  List,
  Pagination,
  PaginationProps,
  Space,
} from 'antd';
import { Roles } from 'core/services/http/auth/dto/auth-service.response.dto';
import {
  FilterRequestDTO,
  SortersRequestDTO,
} from 'core/services/http/products/dto/product-service.request.dto';
import {
  ProductPageResponseDTO,
  ProductResponseDTO,
} from 'core/services/http/products/dto/product-service.response.dto';
import productService from 'core/services/http/products/product.service';
import {
  PageableDTO,
  Paged,
} from 'core/services/http/_base/dto/base-service.response.dto';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import {
  showErrorMessage,
  startLoadingMessage,
} from 'utils/constants/messages/messages.helper';
import { ProductRoutes } from 'utils/constants/routes/app-routes.consts';
import { numberFormatter } from 'utils/helpers/number-formatter.helper';
import WebShopButton from '../Shared/Misc/WebShopButton/WebShopButton';
import WebShopPagination from '../Shared/Misc/WebShopPagination/WebShopPagination';
import './styles.scss';

// const data = Array.from({ length: 23 }).map((_, i) => ({
//   href: 'https://ant.design',
//   title: `ant design part ${i}`,
//   avatar: 'https://joeschmoe.io/api/v1/random',
//   description:
//     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//   content:
//     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));

// const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );

const WebShopProductList = () => {
  const [data, setData] = useState<ProductPageResponseDTO>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  const loadData = async (
    pageable: PageableDTO,
    sorters?: SortersRequestDTO,
    filters?: FilterRequestDTO,
  ) => {
    try {
      setIsLoading(true);

      const { data } = await productService.getPageProductWithFilters({
        pageable: pageable,
        sorters: sorters,
        filters: filters,
      });

      setData(data);

      setPageSize(data.productPage.pageable?.pageSize || 10);
      setPageNumber(data.productPage.pageable?.pageNumber || 1);
    } catch (err: any) {
      showErrorMessage('An error occurred while loading data!');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = () => {};

  const setProductAsUnavailable = () => {};

  const setProductAsAvailable = () => {};

  const deleteProduct = () => {};

  const renderActions = (isItemAvailable: boolean): ReactNode[] => {
    const actions: ReactNode[] = [];

    if (user?.role.name === Roles.WebShopCustomer) {
      actions.push(
        <WebShopButton
          isLoading={isLoading}
          text='Add to cart'
          onClick={addToCart}
          type='primary'
          isDisabled={!isItemAvailable}
        />,
      );
    }

    if (user?.role.name === Roles.WebShopSeller) {
      actions.push(
        <WebShopButton
          isLoading={isLoading}
          text='Delete product'
          onClick={deleteProduct}
          type='primary'
          isDanger={true}
        />,
      );

      actions.push(
        isItemAvailable ? (
          <WebShopButton
            isLoading={isLoading}
            text='Set product as unavailable'
            onClick={setProductAsUnavailable}
            type='primary'
            isDanger={true}
          />
        ) : (
          <WebShopButton
            isLoading={isLoading}
            text='Set product as available'
            onClick={setProductAsAvailable}
            type='primary'
          />
        ),
      );
    }

    return actions;
  };

  const getUserName = (item: ProductResponseDTO) => {
    return item.seller?.account != null
      ? item.seller?.account?.firstName + ' ' + item.seller?.account?.lastName
      : 'John Doe';
  };

  const onChange = (pageNumber: number, pageSize: number) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  useEffect(() => {
    loadData({
      pageNumber: pageNumber,
      pageSize: pageSize,
      offset: 0,
    });
  }, []);

  useEffect(() => {
    loadData({
      pageNumber: pageNumber,
      pageSize: pageSize,
      offset: (pageNumber - 1) * pageSize,
    });
  }, [pageSize, pageNumber]);

  return (
    <div>
      <List
        className='product-list'
        itemLayout='horizontal'
        size='small'
        pagination={false}
        dataSource={data?.productPage?.content}
        split={false}
        footer={false}
        renderItem={(item, index) => (
          <div className='grid-container'>
            <List.Item
              style={{
                display: 'grid',
              }}
              key={item.name}
              extra={
                <img
                  className='grid-item-5'
                  width={180}
                  alt='Product'
                  src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png' // TODO: product image placeholder, should replace when image storing to s3 is enabled
                />
              }
            >
              <List.Item.Meta
                avatar={
                  <div className='grid-item-1' style={{ display: 'flex' }}>
                    <Avatar src='https://joeschmoe.io/api/v1/random' />
                    <div style={{ marginLeft: '8px', textAlign: 'center' }}>
                      {getUserName(item)}
                    </div>
                  </div>
                } // TODO: user avatar image placeholder, should replace when image storing to s3 is enabled
              />
              <List.Item.Meta
                style={{ paddingTop: '16px', width: '200px' }}
                title={
                  <a
                    className='grid-item-2'
                    href={ProductRoutes.SingleProduct(item.uuid)}
                  >
                    {item.name.substring(0, 56) +
                      (item.name.length > 56 ? '...' : '')}
                  </a>
                }
                description={
                  <div
                    className='grid-item-3'
                    style={{
                      width: '600px',
                    }}
                  >
                    {item.description.substring(0, 256) +
                      (item.description.length > 256 ? '...' : '')}
                  </div>
                }
              />
              <div className='grid-item-4'>
                {numberFormatter.format(item.price) + ' RSD'}
              </div>
            </List.Item>
            <div style={{ maxWidth: '300px', display: 'flex', gap: '12px' }}>
              {renderActions(item.isAvailable)}
            </div>
            {index + 1 !== data?.productPage?.content?.length && (
              <Divider
                type='horizontal'
                style={{ backgroundColor: '#f4f4f4' }}
              />
            )}
          </div>
        )}
      />
      {data?.productPage?.content.length !== 0 && (
        <WebShopPagination
          onPageNumberOrSizeChange={onChange}
          totalElements={data?.totalElements || 1}
          currentPage={data?.productPage?.pageable.pageNumber || 1}
          pageSize={pageSize}
          isLoading={isLoading}
        />
        // <div>
        //   <Pagination
        //     disabled={isLoading}
        //     showSizeChanger
        //     className='pagination'
        //     showQuickJumper={false}
        //     onChange={onChange}
        //     total={totalProducts}
        //     pageSize={pageSize}
        //     current={pageNumber}
        //   />
        // </div>
      )}
    </div>
  );
};

export default WebShopProductList;

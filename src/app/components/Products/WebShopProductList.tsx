import { Avatar, Divider, List } from 'antd';
import { Roles } from 'core/services/http/auth/dto/auth-service.response.dto';
import {
  FilterRequestDTO,
  GetProductPageWithFiltersRequestDTO,
  SortersRequestDTO,
} from 'core/services/http/products/dto/product-service.request.dto';
import {
  ProductPageResponseDTO,
  ProductResponseDTO,
} from 'core/services/http/products/dto/product-service.response.dto';
import productService from 'core/services/http/products/product.service';
import shoppingCartService from 'core/services/http/shopping-cart/shopping-cart.service';
import localStorageService from 'core/services/internal/local-storage.service';
import React, { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'types';
import { ProductFormModel } from 'utils/constants/form-models/ProductFormModels';
import {
  showConfirmMessage,
  showErrorMessage,
  showSuccessMessage,
} from 'utils/constants/messages/messages.helper';
import { numberFormatter } from 'utils/helpers/number-formatter.helper';
import { getUserName } from 'utils/helpers/username.helper';
import WebShopProductFilters from '../Shared/Form/Misc/WebShopProductFilters/WebShopProductFilters';
import WebShopProductSorters from '../Shared/Form/Misc/WebShopProductSorters/WebShopProductSorters';
import WebShopButton from '../Shared/Misc/WebShopButton/WebShopButton';
import WebShopCollapse from '../Shared/Misc/WebShopCollapse/WebShopCollapse';
import WebShopPagination from '../Shared/Misc/WebShopPagination/WebShopPagination';
import WebShopProductChangeModal from './CreateProductModal/WebShopCreateProductModal';
import './styles.scss';
import WebShopProductDrawer from './WebShopProductDrawer/WebShopProductDrawer';

const WebShopProductList = () => {
  const [data, setData] = useState<ProductPageResponseDTO>();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState<FilterRequestDTO>();
  const [sorters, setSorters] = useState<SortersRequestDTO>();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductResponseDTO>();
  const [isCreateProductModalVisible, setIsCreateProductModalVisible] =
    useState(false);
  const [isUpdateProductModalVisible, setIsUpdateProductModalVisible] =
    useState(false);
  const [selectedProductForUpdate, setSelectedProductForUpdate] =
    useState<ProductResponseDTO | null>();

  const loadData = async ({
    pageable,
    sorters,
    filters,
  }: GetProductPageWithFiltersRequestDTO) => {
    try {
      setIsLoading(true);

      const { data } = await productService.getPageProductWithFilters({
        pageable: pageable,
        sorters: sorters,
        filters: filters,
      });

      setData(data);

      setPageSize(data.productPage?.pageable?.pageSize || 10);
      setPageNumber(data.productPage?.pageable?.pageNumber || 1);
    } catch (err: any) {
      console.log(err);
      showErrorMessage('An error occurred while loading data!');
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: ProductResponseDTO) => {
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

      showSuccessMessage('Product was successfully added to you cart!');
    } catch (err: any) {
      console.log({ err });
      showErrorMessage(
        'An error has occurred while trying to add an item to cart!',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const setProductAsUnavailable = async item => {
    try {
      setIsLoading(true);

      await productService.makeProductUnavailable(item.uuid);

      loadData({
        pageable: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          offset: (pageNumber - 1) * pageSize,
        },
      });

      showSuccessMessage('Product availability changed successfully!');
    } catch (err: any) {
      showErrorMessage(
        'An error occurred while trying to make a product unavailable!',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const setProductAsAvailable = async item => {
    try {
      setIsLoading(true);

      await productService.makeProductAvailable(item.uuid);

      loadData({
        pageable: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          offset: (pageNumber - 1) * pageSize,
        },
      });

      showSuccessMessage('Product availability changed successfully!');
    } catch (err: any) {
      showErrorMessage(
        'An error occurred while trying to make a product available!',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (item: ProductResponseDTO) => {
    try {
      setIsLoading(true);

      await productService.softDeleteProduct(item.uuid);

      loadData({
        pageable: {
          pageNumber: pageNumber,
          pageSize: pageSize,
          offset: (pageNumber - 1) * pageSize,
        },
      });

      showSuccessMessage('Product deleted successfully!');
    } catch (err: any) {
      showErrorMessage(
        'An error occurred while trying to delete a product! Deletion was unsuccessful.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderActions = (item: ProductResponseDTO): ReactNode[] => {
    const actions: ReactNode[] = [];

    if (
      user?.role.name === Roles.WebShopSeller &&
      user.email === item.seller.account.email
    ) {
      actions.push(
        <WebShopButton
          isLoading={isLoading}
          text='Delete product'
          onClick={() =>
            showConfirmMessage(
              'Confirm deletion',
              'Are you sure you want to delete this product?',
              () => {
                deleteProduct(item);
              },
            )
          }
          type='primary'
          isDanger={true}
        />,
        <WebShopButton
          isLoading={isLoading}
          text='Update a product'
          onClick={() => handleOpenUpdateProductModal(item)}
          type='primary'
        />,
      );

      actions.push(
        item.isAvailable ? (
          <WebShopButton
            isLoading={isLoading}
            text='Set product as unavailable'
            onClick={() => setProductAsUnavailable(item)}
            type='primary'
            isDanger={true}
          />
        ) : (
          <WebShopButton
            isLoading={isLoading}
            text='Set product as available'
            onClick={() => setProductAsAvailable(item)}
            type='primary'
          />
        ),
      );
    }

    if (user == null || user?.role.name !== Roles.WebShopSeller) {
      actions.push(
        <WebShopButton
          isLoading={isLoading}
          text='Add to cart'
          onClick={() => addToCart(item)}
          type='primary'
          isDisabled={!item.isAvailable}
        />,
      );
    }

    return actions;
  };

  const onChange = (pageNumber: number, pageSize: number) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize);
  };

  useEffect(() => {
    loadData({
      pageable: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        offset: 0,
      },
    });
  }, []);

  useEffect(() => {
    loadData({
      pageable: {
        pageNumber: pageNumber,
        pageSize: pageSize,
        offset: (pageNumber - 1) * pageSize,
      },
      sorters: sorters,
      filters: filters,
    });
  }, [pageSize, pageNumber]);

  const onSubmitFiltersAndSorters = () => {
    loadData({
      pageable: {
        pageNumber: 1,
        pageSize: 10,
        offset: 0,
      },
      sorters: sorters,
      filters: filters,
    });
  };

  const showProduct = (product: ProductResponseDTO) => {
    setSelectedProduct(product);
    setDrawerVisible(true);
  };

  const onProductDrawerClose = () => {
    setDrawerVisible(false);
  };

  const handleOpenCreateProductModal = () => {
    setIsCreateProductModalVisible(true);
  };

  const handleCloseCreateProductModal = () => {
    setIsCreateProductModalVisible(false);
  };

  const handleCreateNewProduct = async ({
    name,
    description,
    isAvailable,
    price,
  }: ProductFormModel) => {
    try {
      setIsLoading(true);

      await productService.createNewProduct({
        name: name,
        description: description,
        isAvailable: isAvailable,
        price: price,
      });

      onSubmitFiltersAndSorters();

      showSuccessMessage('A new product was added successfully.');
    } catch (err: any) {
      if (err.response.status === 409) {
        showErrorMessage(
          'A product with this name is already created by this user, please select another name.',
        );
      } else {
        showErrorMessage('An error occurred while trying to save a product.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseUpdateProductModal = () => {
    setSelectedProductForUpdate(null);
    setIsUpdateProductModalVisible(false);
  };

  const handleOpenUpdateProductModal = (product: ProductResponseDTO) => {
    setSelectedProductForUpdate(product);
    setIsUpdateProductModalVisible(true);
  };

  const handleUpdateProduct = async (
    { name, description, isAvailable, price }: ProductFormModel,
    productUuid,
  ) => {
    try {
      setIsLoading(true);

      console.log(productUuid);

      await productService.updateProduct({
        uuid: productUuid,
        name: name,
        description: description,
        isAvailable: isAvailable,
        price: price,
      });

      onSubmitFiltersAndSorters();

      showSuccessMessage('Product was successfully updated.');
    } catch (err: any) {
      showErrorMessage('An error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className='filters-sorters-collapse'>
        <WebShopCollapse header='Filters and Sorters'>
          <WebShopProductFilters
            onApplyFilters={setFilters}
            isLoading={isLoading}
          />
          <WebShopProductSorters
            onApplySorters={setSorters}
            isLoading={isLoading}
          />
          <WebShopButton
            text='Submit'
            onClick={onSubmitFiltersAndSorters}
            isLoading={isLoading}
          />
        </WebShopCollapse>
      </div>
      {user?.role.name === Roles.WebShopSeller && (
        <div style={{ maxWidth: '50%', margin: '24px auto 0' }}>
          <div style={{ maxWidth: '25%', marginLeft: 'auto' }}>
            <WebShopButton
              isLoading={isLoading}
              type='primary'
              text='Add a new product'
              onClick={handleOpenCreateProductModal}
            />
          </div>
        </div>
      )}
      <WebShopProductChangeModal
        isVisible={isCreateProductModalVisible}
        onSubmit={handleCreateNewProduct}
        onCancel={handleCloseCreateProductModal}
        isLoading={isLoading}
        title='Add a new product'
        submitButtonText='Create'
      />
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
                    <div
                      style={{
                        marginLeft: '8px',
                        textAlign: 'center',
                        marginTop: '4px',
                      }}
                    >
                      {getUserName(item?.seller?.account)}
                    </div>
                  </div>
                } // TODO: user avatar image placeholder, should replace when image storing to s3 is enabled
              />
              <List.Item.Meta
                style={{ paddingTop: '16px', width: '200px' }}
                title={
                  <a
                    className='grid-item-2'
                    onClick={() => showProduct(item)}
                    // href={ProductRoutes.SingleProduct(item.uuid)} TODO: if wanted for a producgt to be on a separate page
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
              {renderActions(item)}
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
      <WebShopProductDrawer
        placement='right'
        product={selectedProduct}
        visible={drawerVisible}
        onClose={onProductDrawerClose}
      />
      <WebShopProductChangeModal
        isVisible={isUpdateProductModalVisible}
        onSubmit={handleUpdateProduct}
        onCancel={handleCloseUpdateProductModal}
        isLoading={isLoading}
        title='Update a product'
        formData={selectedProductForUpdate}
        submitButtonText='Update'
      />
      {data?.productPage?.content.length !== 0 && (
        <WebShopPagination
          onPageNumberOrSizeChange={onChange}
          totalElements={data?.totalElements || 1}
          currentPage={data?.productPage?.pageable.pageNumber || 1}
          pageSize={pageSize}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default WebShopProductList;

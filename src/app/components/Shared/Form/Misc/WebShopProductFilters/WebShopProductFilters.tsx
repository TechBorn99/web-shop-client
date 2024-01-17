import { Form } from 'antd';
import { FilterRequestDTO } from 'core/services/http/products/dto/product-service.request.dto';
import React, { useState } from 'react';
import { ProductFiltersFormModel } from 'utils/constants/form-models/ProductFormModels';
import { ProductFilterValidators } from 'utils/constants/validators/product.form-validators';
import {
  convertToAPIReadableDate,
  currentDate,
} from 'utils/helpers/date.helpers';
import WebShopFormButton from '../../Button/WebShopFormButton';
import WebShopDatePicker from '../../DatePicker/WebShopDatePicker';
import WebShopFormInput from '../../Input/WebShopFormInput';
import './styles.scss';

interface WebShopProductFiltersProps {
  isLoading: boolean;
  onApplyFilters: (filters: FilterRequestDTO) => void;
}

const WebShopProductFilters = ({
  isLoading,
  onApplyFilters,
}: WebShopProductFiltersProps) => {
  const handleOnSubmit = ({
    queryString,
    priceTo,
    priceFrom,
    createdAtFrom,
    createdAtTo,
  }: ProductFiltersFormModel) => {
    onApplyFilters({
      containsChars: queryString,
      priceRange: {
        priceFrom: priceFrom,
        priceTo: priceTo,
      },
      dateRange: {
        createdAtFrom:
          createdAtFrom == null ? '' : convertToAPIReadableDate(createdAtFrom),
        createdAtTo:
          createdAtTo == null ? '' : convertToAPIReadableDate(createdAtTo),
      },
    });
  };

  return (
    <Form<ProductFiltersFormModel>
      style={{ marginLeft: '5%', marginRight: '5%', width: '90%' }}
      onFinish={handleOnSubmit}
      className='webshop_page__card'
    >
      <h1>Filters:</h1>
      <p style={{ width: '100%' }}>
        Add some filters, then click on submit to apply them
      </p>
      <WebShopFormInput
        label='Query string'
        name='queryString'
        rules={[]}
        type='text'
      />
      <WebShopFormInput
        label='Price from'
        name='priceFrom'
        rules={ProductFilterValidators.price}
        type='number'
      />
      <WebShopFormInput
        label='Price to'
        name='priceTo'
        rules={ProductFilterValidators.price}
        type='number'
      />
      <WebShopDatePicker
        name='createdAtFrom'
        label='Date from'
        rules={[]}
        initialDate={null}
      />
      <WebShopDatePicker
        name='createdAtTo'
        label='Date to'
        rules={[]}
        initialDate={currentDate}
      />
      <WebShopFormButton
        text='Apply'
        type='primary'
        htmlType='submit'
        isLoading={isLoading}
      />
    </Form>
  );
};

export default WebShopProductFilters;

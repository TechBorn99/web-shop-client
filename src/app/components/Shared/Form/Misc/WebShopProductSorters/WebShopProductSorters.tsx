import { Form, RadioChangeEvent } from 'antd';
import { SortersRequestDTO } from 'core/services/http/products/dto/product-service.request.dto';
import React, { useState } from 'react';
import { ProductSortersFormModel } from 'utils/constants/form-models/ProductFormModels';
import { ProductSortersValidators } from 'utils/constants/validators/product.form-validators';
import WebShopFormButton from '../../Button/WebShopFormButton';
import WebShopFormRadioButton from '../../RadioButton/WebShopFormRadioButton';
import './styles.scss';

interface WebShopProductSortersProps {
  isLoading: boolean;
  onApplySorters: (sorters: SortersRequestDTO) => void;
}

const WebShopProductSorters = ({
  isLoading,
  onApplySorters,
}: WebShopProductSortersProps) => {
  const [sortingCriteria, setSortingCriteria] = useState<
    'dateOfCreation' | 'price' | 'name'
  >('dateOfCreation');

  const [sortAscending, setSortAscending] = useState(true);

  const handleOnSubmit = ({ attribute }: ProductSortersFormModel) => {
    onApplySorters({
      ascending: sortAscending,
      attribute: sortingCriteria,
    });
  };

  const onChangeSortDirection = (e: RadioChangeEvent) => {
    setSortAscending(e.target.value);
  };

  const onChangeSortCriteria = (e: RadioChangeEvent) => {
    setSortingCriteria(e.target.value);
  };

  return (
    <Form<ProductSortersFormModel>
      style={{ marginLeft: '5%', marginRight: '5%', width: '90%' }}
      onFinish={handleOnSubmit}
      className='webshop_page__card'
    >
      <h1>Sorters:</h1>
      <p style={{ width: '100%' }}>
        Select a sorter, then click on submit to apply it
      </p>
      <WebShopFormRadioButton
        currentValue={sortAscending}
        values={[true, false]}
        options={['Ascending', 'Descending']}
        onChange={onChangeSortDirection}
        defaultValue={sortAscending}
        name='sortersDirection'
        label='Sort ascending or descending'
        rules={[]}
      />
      <WebShopFormRadioButton
        currentValue={sortingCriteria}
        values={['dateOfCreation', 'name', 'price']}
        options={['Date of creation', 'Name', 'Price']}
        onChange={onChangeSortCriteria}
        defaultValue={sortingCriteria}
        name='sortersCriteria'
        label='Sorting criteria'
        rules={[]}
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

export default WebShopProductSorters;

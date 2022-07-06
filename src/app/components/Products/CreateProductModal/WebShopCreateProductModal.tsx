import { Form, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import WebShopFormButton from 'app/components/Shared/Form/Button/WebShopFormButton';
import WebShopFormCheckbox from 'app/components/Shared/Form/Checkbox/WebShopFormCheckbox';
import WebShopFormInput from 'app/components/Shared/Form/Input/WebShopFormInput';
import WebShopFormTextBox from 'app/components/Shared/Form/TextBox/WebShopFormTextBox';
import { ProductResponseDTO } from 'core/services/http/products/dto/product-service.response.dto';
import React, { useEffect, useState } from 'react';
import { ProductFormModel } from 'utils/constants/form-models/ProductFormModels';
import { CreateProductValidators } from 'utils/constants/validators/product.form-validators';

interface WebShopCreateProductModalProps {
  isVisible: boolean;
  onSubmit: (product: ProductFormModel, uuid?: string) => void;
  onCancel: (e: any) => void;
  isLoading: boolean;
  title: string;
  formData?: ProductResponseDTO | null;
  submitButtonText: string;
  uuid?: string;
}

const WebShopProductChangeModal = ({
  isVisible,
  onSubmit,
  onCancel,
  isLoading,
  title,
  formData,
  submitButtonText,
}: WebShopCreateProductModalProps) => {
  const [isProductAvailable, setIsProductAvailable] = useState(true);
  const [form] = useForm();

  const handleChange = (e: any) => {
    setIsProductAvailable(e.target.checked);
  };

  useEffect(() => {
    if (formData) {
      form.setFields([
        {
          name: 'name',
          value: formData.name,
        },
        {
          name: 'description',
          value: formData.description,
        },
        {
          name: 'price',
          value: formData.price,
        },
        {
          name: 'isAvailable',
          value: formData.isAvailable,
        },
      ]);
    }
  }, [formData]);

  const handleOnSubmit = (product: ProductFormModel) => {
    if (submitButtonText === 'Create') {
      onSubmit({
        description: product.description,
        isAvailable: product.isAvailable,
        name: product.name,
        price: product.price,
      });
    } else {
      onSubmit(
        {
          description: product.description,
          isAvailable: product.isAvailable,
          name: product.name,
          price: product.price,
        },
        formData != null ? formData.uuid : '',
      );
    }

    if (submitButtonText === 'Create') form.resetFields();
  };

  return (
    <Modal
      title={title}
      centered
      visible={isVisible}
      onCancel={onCancel}
      okButtonProps={{ style: { display: 'none' } }}
    >
      <Form<ProductFormModel> onFinish={handleOnSubmit} form={form}>
        <p style={{ width: '320px' }}>Enter the product details below:</p>
        <WebShopFormInput
          rules={CreateProductValidators.name}
          name='name'
          label='Name'
          placeholder='e.g Wireless charger'
          initialValue={formData?.name ? formData.name : ''}
        />
        <WebShopFormTextBox
          rules={CreateProductValidators.description}
          name='description'
          label='Name'
          placeholder='e.g Description of the wireless charger'
          maxLength={300}
          initialValue={formData?.description ? formData.description : ''}
        />
        <WebShopFormInput
          rules={CreateProductValidators.price}
          name='price'
          label='Price'
          type='number'
          initialValue={formData?.price ? formData.price : 0}
        />
        <WebShopFormCheckbox
          label='Is product currently available?'
          initialValue={
            formData?.isAvailable ? formData.isAvailable : isProductAvailable
          }
          rules={CreateProductValidators.isAvailable}
          name='isAvailable'
          onChange={e => handleChange(e)}
          value={isProductAvailable}
        />
        <WebShopFormButton
          text={submitButtonText}
          type='primary'
          htmlType='submit'
          isLoading={isLoading}
        />
      </Form>
    </Modal>
  );
};

export default WebShopProductChangeModal;

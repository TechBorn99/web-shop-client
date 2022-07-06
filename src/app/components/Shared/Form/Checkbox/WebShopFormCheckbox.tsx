import { Checkbox, Form } from 'antd';
import React from 'react';

interface WebShopFormCheckboxProps {
  label: string;
  initialValue: boolean;
  rules: any[];
  name: string;
  onChange: (e: any) => void;
  value: boolean;
}

const WebShopFormCheckbox = ({
  label,
  initialValue,
  name,
  rules,
  onChange,
  value,
}: WebShopFormCheckboxProps) => {
  return (
    <Form.Item
      label={label}
      initialValue={initialValue}
      name={name}
      rules={rules}
      hasFeedback
      valuePropName='checked'
    >
      <Checkbox onChange={onChange} value={value} />
    </Form.Item>
  );
};

export default WebShopFormCheckbox;

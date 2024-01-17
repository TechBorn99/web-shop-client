import { Form, Input } from 'antd';
import React from 'react';
import './style.scss';

interface WebShopFormPasswordInputProps {
  label: string;
  name: string | string[];
  placeholder?: string;
  initialValue?: string | number;
  rules: any[];
}

const WebShopFormPasswordInput = ({
  label,
  name,
  placeholder,
  initialValue,
  rules,
}: WebShopFormPasswordInputProps) => {
  return (
    <Form.Item
      label={label}
      hasFeedback
      labelCol={{ span: 24 }}
      initialValue={initialValue}
      name={name}
      rules={rules}
    >
      <Input.Password placeholder={placeholder} />
    </Form.Item>
  );
};

export default WebShopFormPasswordInput;

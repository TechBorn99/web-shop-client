import { Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React from 'react';

interface WebShopFormTextBoxProps {
  label: string;
  initialValue: string;
  name: string;
  rules: any[];
  maxLength: number;
  placeholder: string;
}

const WebShopFormTextBox = ({
  label,
  initialValue,
  name,
  rules,
  maxLength,
  placeholder,
}: WebShopFormTextBoxProps) => {
  return (
    <Form.Item
      label={label}
      hasFeedback
      labelCol={{ span: 24 }}
      initialValue={initialValue}
      name={name}
      rules={rules}
    >
      <TextArea showCount maxLength={maxLength} placeholder={placeholder} />
    </Form.Item>
  );
};

export default WebShopFormTextBox;

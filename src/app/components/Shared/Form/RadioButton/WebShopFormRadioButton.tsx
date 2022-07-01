import { Form, Radio, RadioChangeEvent } from 'antd';
import React from 'react';

interface WebShopFormRadioButtonProps {
  currentValue: string;
  values: any[];
  options: any[];
  onChange: (e: RadioChangeEvent) => void;
  defaultValue: any;
  name: string;
  label: string;
  rules: any[];
}

const WebShopFormRadioButton = ({
  currentValue,
  values,
  onChange,
  defaultValue,
  options,
  name,
  label,
  rules,
}: WebShopFormRadioButtonProps) => {
  return (
    <Form.Item
      label={label}
      hasFeedback
      labelCol={{ span: 24 }}
      name={name}
      rules={rules}
    >
      <Radio.Group
        onChange={onChange}
        value={currentValue}
        defaultValue={defaultValue}
      >
        {values.map((value, index) => (
          <Radio value={value} key={value}>
            {options[index]}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default WebShopFormRadioButton;

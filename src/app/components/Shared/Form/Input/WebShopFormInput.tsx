import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip } from 'antd';
import React from 'react';
import './style.scss';

interface WebShopFormInputProps {
  rules: any[];
  label?: string;
  placeholder?: string;
  name: string | string[];
  initialValue?: string | number;
  type?: 'text' | 'number' | 'email';
  size?: 'small' | 'large' | 'middle';
  helpText?: string;
  isDisabled?: boolean;
}

const WebShopFormInput = ({
  label,
  name,
  placeholder,
  type,
  initialValue,
  rules,
  helpText,
  size = 'middle',
  isDisabled = false,
}: WebShopFormInputProps) => {
  return (
    <Form.Item
      label={label}
      hasFeedback
      labelCol={{ span: 24 }}
      initialValue={initialValue}
      name={name}
      rules={rules}
    >
      <Input
        type={type}
        size={size}
        disabled={isDisabled}
        placeholder={placeholder}
        suffix={
          helpText && (
            <Tooltip title={helpText}>
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          )
        }
      />
    </Form.Item>
  );
};

export default WebShopFormInput;

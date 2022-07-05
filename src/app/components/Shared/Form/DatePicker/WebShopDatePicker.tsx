import { DatePicker, Form } from 'antd';
import React from 'react';
import { DateFormatEnum } from 'utils/helpers/date.helpers';

interface WebShopDatePickerProps {
  label: string;
  name: string;
  rules?: any[];
  initialDate?: any;
}

const WebShopDatePicker = ({
  label,
  name,
  rules,
  initialDate,
}: WebShopDatePickerProps) => {
  return (
    <Form.Item
      label={label}
      initialValue={initialDate}
      labelCol={{ span: 24 }}
      name={name}
      rules={rules}
    >
      <DatePicker
        style={{ width: '100%' }}
        format={DateFormatEnum.ReadableDate}
      />
    </Form.Item>
  );
};

export default WebShopDatePicker;

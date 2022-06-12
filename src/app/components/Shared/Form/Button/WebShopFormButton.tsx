import { Form } from 'antd';
import React from 'react';
import WebShopButton, {
  WebShopButtonHtmlType,
  WebShopButtonType,
} from '../../Misc/WebShopButton/WebShopButton';

interface WebShopFormButtonProps {
  text: string;
  htmlType?: WebShopButtonHtmlType;
  isLoading?: boolean;
  type?: WebShopButtonType;
  onClick?: () => void;
}

const WebShopFormButton = ({
  text,
  type,
  isLoading,
  htmlType = 'button',
  onClick,
}: WebShopFormButtonProps) => {
  return (
    <Form.Item>
      <WebShopButton
        htmlType={htmlType}
        type={type}
        text={text}
        isLoading={isLoading}
        onClick={onClick}
      />
    </Form.Item>
  );
};

export default WebShopFormButton;

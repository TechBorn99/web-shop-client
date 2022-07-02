import { Button } from 'antd';
import React from 'react';

interface WebShopButtonProps {
  text: string;
  type?: WebShopButtonType;
  isLoading?: boolean;
  htmlType?: WebShopButtonHtmlType;
  onClick?: () => void;
  isDisabled?: boolean;
  isDanger?: boolean;
}

export type WebShopButtonType =
  | 'primary'
  | 'default'
  | 'link'
  | 'ghost'
  | 'dashed'
  | 'text';

export type WebShopButtonHtmlType = 'submit' | 'reset' | 'button';

const WebShopButton = ({
  isLoading,
  text,
  type,
  htmlType = 'button',
  isDisabled = false,
  isDanger = false,
  onClick,
}: WebShopButtonProps) => {
  return (
    <Button
      danger={isDanger}
      disabled={isDisabled}
      style={{ width: '100%' }}
      htmlType={htmlType}
      type={type}
      loading={isLoading}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default WebShopButton;

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
  icon?: any;
  style?: React.CSSProperties;
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
  icon,
  style,
}: WebShopButtonProps) => {
  return (
    <Button
      danger={isDanger}
      disabled={isDisabled}
      className='webshop-default-button'
      style={style}
      htmlType={htmlType}
      type={type}
      loading={isLoading}
      onClick={onClick}
      icon={icon}
    >
      {text}
    </Button>
  );
};

export default WebShopButton;

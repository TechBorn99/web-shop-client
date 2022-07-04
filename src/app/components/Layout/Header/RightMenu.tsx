import React from 'react';
import { Menu, Avatar } from 'antd';
import { UserOutlined, CodeOutlined, LogoutOutlined } from '@ant-design/icons';

interface RightMenuProps {
  username: string;
  mode: any;
}

const RightMenu = ({ mode, username }: RightMenuProps) => {
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        key='dropdown-side-menu'
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className='username'>{username}</span>
          </>
        }
      >
        <Menu.Item key='project'>
          <CodeOutlined /> Projects
        </Menu.Item>
        <Menu.Item key='about-us'>
          <UserOutlined /> Profile
        </Menu.Item>
        <Menu.Item key='log-out'>
          <LogoutOutlined /> <div style={{ textAlign: 'center' }}>Logout</div>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;

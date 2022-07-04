import React, { useEffect, useState } from 'react';
import { Layout, Drawer } from 'antd';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import { useLocation } from 'react-router-dom';
import './styles.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'types';

const WebShopHeader = () => {
  const [visible, setVisible] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const showDrawer = () => {
    setVisible(!visible);
  };

  let { pathname: location } = useLocation();

  useEffect(() => {
    setVisible(false);
  }, [location]);

  return (
    <nav className='navbar'>
      <Layout>
        <Layout.Header className='nav-header'>
          <div className='logo'>
            <h3 className='brand-font'>WebShop</h3>
          </div>
          <div className='navbar-menu'>
            <div className='leftMenu'>
              <LeftMenu mode={'horizontal'} />
            </div>
            {/* <Button className='menuButton' type='text' onClick={showDrawer}>
              <MenuOutlined />
            </Button> TODO: uncomment when the work on responsive design starts*/}
            <div className='rightMenu'>
              <RightMenu
                mode={'horizontal'}
                username={user ? user.firstName + ' ' + user.lastName : ''}
              />
            </div>

            <Drawer
              title={'WebShop'}
              placement='right'
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <LeftMenu mode={'inline'} />
              <RightMenu
                mode={'inline'}
                username={user?.firstName + ' ' + user?.lastName}
              />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default WebShopHeader;

import React from 'react';
import styles from './MainLayout.css';
import Menus from './Menus';
import { Icon, Button, Menu } from 'antd';
import { routerRedux, Link } from 'dva/router';

const { SubMenu, MenuItemGroup } = Menu;

function MainLayout({ children, location, islight, isCollapsed, dispatch }) {

  /**
   * 侧导航栏拉伸
   */
  const changeCollapsed = () => {

    dispatch({
      type: 'user/setCollapsed',
      payload: {
        isCollapsed: !isCollapsed,
      }
    })
  }

  const logigOut = () => {
    routerRedux.push('/login');
  }

  return (
    <div className={styles.normal}>
      <Menus {...{ location, islight, dispatch, isCollapsed }} />
      <div className={styles.content}>
        <div className={styles.header} >
          <div>
            <div className={styles.collapse} onClick={changeCollapsed}>
              <Icon type={isCollapsed ? 'menu-unfold' : 'menu-fold'} />
            </div>
          </div>
          <div className={styles.headerright}>
            <div className={styles.collapse}>
              <Icon type="mail" />
            </div>
            <div>
              <Menu
                mode="horizontal"
              >
                <SubMenu key="sub1-2" title={<span><Icon type="user" /><span>蓝羽</span></span>}>
                  <Menu.Item key="5">
                    <Link to='/login' />
                    Sign Out
                    </Menu.Item>
                </SubMenu>
              </Menu>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
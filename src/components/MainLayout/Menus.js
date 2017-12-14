import React from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from 'dva/router';
import styles from './Menus.css';

const { SubMenu } = Menu,
  light = '#fff',
  dark = '#3e3e3e';

export default function Menus({ location, islight, isCollapsed, dispatch }) {

  /**
   *  改变主题样式
   */
  function changeTheme(bool) {

    dispatch({
      type: 'user/setLight',
      payload: {
        islight: bool,
      }
    })
  }

  return (
    <div style={{ background: islight ? light : dark, borderColor: islight ? '#e9e9e9' : dark }} className={styles.normal} >

      {
        //  头部logo
      }
      <div className={styles.logo}>
        <img className={styles.logoimg} src='/logo.png'></img>
        {!isCollapsed ? <span className={styles.logotitle}>Ant Design</span> : ''}
      </div>

      {
        //  左侧导航栏
      }
      <div className={styles.content}>
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          inlineCollapsed={isCollapsed}
          theme={islight ? "light" : "dark"}
          defaultOpenKeys={['sub1-2', 'sub1-3']}
        >
          <Menu.Item key="3"><Icon type="user-add" /><span>人员管理</span></Menu.Item>
          <Menu.Item key="4"><Icon type="area-chart" /><span>排班管理</span></Menu.Item>
          <SubMenu key="sub1-2" disabled={!isCollapsed} title={<span><Icon type="appstore" /><span>设备空间</span></span>}>
            <Menu.Item key="5"><Icon type="inbox" />设备管理</Menu.Item>
            <Menu.Item key="6"><Icon type="bank" />房间管理</Menu.Item>
            <Menu.Item key="7"><Icon type="copy" />设备通讯录</Menu.Item>
            <Menu.Item key="8"><Icon type="idcard" />打印设备房间名片</Menu.Item>
          </SubMenu>
          <SubMenu key="sub1-3" disabled={!isCollapsed} title={<span><Icon type="bars" /><span>工单</span></span>}>
            <Menu.Item key="51"><Icon type="file-add" />分配工单处理职责</Menu.Item>
            <Menu.Item key="61"><Icon type="file-text" />我的工单</Menu.Item>
            <Menu.Item key="71"><Icon type="bars" />计划监控</Menu.Item>
            <Menu.Item key="81"><Icon type="bar-chart" />工单管理</Menu.Item>
            <Menu.Item key="82"><Icon type="dot-chart" />标准操作知识库</Menu.Item>
          </SubMenu>
        </Menu>
      </div>

      {
        //  Switch  主题选择按钮
        !isCollapsed ? <div className={styles.footer}>
          <span className={styles.themename}><Icon type="bulb" />Switch Theme</span>
          <Switch
            checked={islight}
            onChange={changeTheme}
            checkedChildren="Light"
            unCheckedChildren="Dark"
          />
        </div> : ''}

    </div >
  );
}

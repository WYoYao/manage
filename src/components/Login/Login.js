import React from 'react';
import { Row, Col, Button, Radio, Icon, Input } from 'antd';
import styles from './Login.css';

import LoginTab from './LoginTab/LoginTab.js';

const ButtonGroup = Button.Group;

function callback(key) {
  console.log(key);
}

function Login(login) {

  return (
    <div className={styles.normal}>
      <Row className={styles.h} type="flex" justify="center" align="middle">
        <Col span={24}>
          <div className={styles.loginBox}>
            <em className={styles.icon}></em>
            <p className={styles.title}>LOGO</p>
            <div className={styles.content}>
              <LoginTab {...login} />
              <div className={styles.block}>
                <div className={styles.line}>
                  <Input size="large" placeholder="请输入账户" />
                </div>
                <div className={styles.line}>
                  <Input size="large" placeholder="请输入密码" />
                </div>
              </div>
              <div className={styles.btnline}>
                <Button size="large" type="primary">登　录</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <img src="/login.jpg" alt="" className={styles.loginBackImage} />
    </div>
  );
}

export default Login;

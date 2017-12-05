import React from 'react';
import { Row, Col, Button, Radio, Icon, Input } from 'antd';
import styles from './Login.css';

import LoginTab from './LoginTab/LoginTab.js';

const ButtonGroup = Button.Group;

function callback(key) {
  console.log(key);
}

function Login(login) {

  let {
    isCompany,
    dispatch,
    username,
    password,
  } = login;

  /**
   * 提交登录
   */
  const handlerSubmit = function () {

    console.log({
      isCompany,
      username,
      password,
    });

  }

  /**
   * 修改的帐号密码
   * @param {需要修改的键值} name 
   * @param {*} e 
   */
  const handleInput = function (name, e) {

    let action = {
      type: 'login/changeWord',
    };

    action[name] = e.target.value;

    dispatch(action)
  }

  return (
    <div className={styles.normal}>
      <Row className={styles.h} type="flex" justify="center" align="middle">
        <Col span={24}>
          <div className={styles.loginBox}>
            <em className={styles.icon}></em>
            <p className={styles.title}>LOGO</p>
            <div className={styles.content}>
              <LoginTab {...{ isCompany, dispatch }} />
              <div className={styles.block}>
                <div className={styles.line}>
                  <Input size="large" value={username} placeholder="请输入账户" onChange={handleInput.bind(null, 'username')} />
                </div>
                <div className={styles.line}>
                  <Input type="password" size="large" value={password} placeholder="请输入密码" onChange={handleInput.bind(null, 'password')} />
                </div>
              </div>
              <div className={styles.btnline}>
                <Button size="large" type="primary" onClick={handlerSubmit} >登　录</Button>
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

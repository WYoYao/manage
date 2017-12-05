import React from 'react';
import { Button, Radio } from 'antd';
import styles from './LoginTab.css';

function LoginTab({ isCompany, dispatch }) {

  let fn = (e) => {

    dispatch({
      type: 'login/changeIsCompany',
      isCompany: e.target.value
    })
  }
  return (
    <div className={styles.tab}>
      <Radio.Group value={isCompany} onChange={fn}>
        <Radio.Button value={true}>企业用户</Radio.Button>
        <Radio.Button value={false}>个人用户</Radio.Button>
      </Radio.Group>
    </div>
  );
}

export default LoginTab;

import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage({ location, islight, dispatch, isCollapsed }) {
  return (
    <MainLayout {...{ location, islight, dispatch, isCollapsed }}>
      {
        // <div className={styles.normal}>
        //   <h1 className={styles.title}>Yay! Welcome to dva!</h1>
        //   <div className={styles.welcome} />
        //   <ul className={styles.list}>
        //     <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        //     <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
        //   </ul>
        // </div>
        // <h2>Hello World</h2>
      }
    </MainLayout>
  );
}

function mapStateToProps({ user }) {

  return user;
}


export default connect(mapStateToProps)(IndexPage);
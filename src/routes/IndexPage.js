import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';

function IndexPage({ location, islight, dispatch, isCollapsed, children }) {
  return (
    <MainLayout {...{ location, islight, dispatch, isCollapsed }}>
      {children}
    </MainLayout>
  );
}

function mapStateToProps({ user }) {

  return user;
}


export default connect(mapStateToProps)(IndexPage);
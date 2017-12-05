import React from 'react';
import { connect } from 'dva';
import styles from './Persion.css';
import MainLayout from '../components/MainLayout/MainLayout';
import PersionComponent from '../components/Persion/Persion'

export default function Persion({ location }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <PersionComponent />
      </div>
    </MainLayout>
  );
}
import React from 'react';
import { connect } from 'dva';
import styles from './Equipment.css';
import Equipment from '../components/equipment/Equipment';

function mapStateToProps({ equipment }) {

  return equipment;
}

export default connect(mapStateToProps)(Equipment);

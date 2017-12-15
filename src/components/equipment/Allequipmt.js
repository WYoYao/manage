import React, { Component } from 'react';
import styles from './Allequipmt.css';

export default class Allequipmt extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    console.log(this.props.name);
  }
  render() {

    let { _id, dispatch, name } = this.props;

    return (
      <div   className={styles.normal}>
        {name}
      </div>
    );
  }
}
import React from 'react';
import {connect} from 'dva';
import {Button} from 'antd';
import styles from './Persion.css';

function Persion({count}) {

  function add() {


    console.log(this);

    console.log('+');
  }

  function remove() {
    console.log('-');
  }

  return (
    <div className={styles.contenter}>
      <div className={styles.normal}>
        <Button onClick={add.bind(null,count)}>+</Button>
          {count}
        <Button onClick={remove.bind(null,count)}>-</Button>
      </div>
    </div>
  );
}

// function mapDispatchToProps(action){

//   return {

//   };
// }

function mapStateToProps(state) {

  const { count } = state.persion;
  return {
    count
  };
}

export default connect(mapStateToProps)(Persion);

// export default connect(mapStateToProps,mapDispatchToProps)(Persion);
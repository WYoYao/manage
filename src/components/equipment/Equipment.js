import React, { Component } from 'react';
import { Tabs } from 'antd';
import styles from './Equipment.css';
import Allequipmt from './Allequipmt';

const { TabPane } = Tabs;

export default class Equipment extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { dispatch } = this.props;

    // 默认查询选项卡列表
    dispatch({
      type: 'equipment/getEquipmentClass',
      payload: {},
    })
  }
  render() {
    const { tabList, dispatch } = this.props;

    return (
      <div>
        <Tabs defaultActiveKey="1" size='Large'>
          {
            tabList.map(equip => {
              
              let item = { ...equip, dispatch };
              return <TabPane tab={`${equip.name} ${equip.count}`} key={equip._id}><Allequipmt {...item} /></TabPane>
            })
          }
        </Tabs>
      </div>
    )
  }
}
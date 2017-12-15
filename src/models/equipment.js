import * as equipmentService from '../services/equipment';

export default {
  namespace: 'equipment',
  state: {
    tabList: [

    ], //首页列表Tab 选项卡
  },
  reducers: {
    // 设置设备类型
    setEquipmentClass(state, { payload: tabList }) {
      console.log(arguments);

      return { ...state, ...{ tabList } }
    }
  },
  effects: {
    // 查询设备分类列表
    *getEquipmentClass({ }, { put, call }) {

      const res = yield call(equipmentService.getEquipmentClass, {});

      if (res.BaseResponse.Code == 1) {

        yield put({
          type: 'setEquipmentClass',
          payload: res.content,
        })
      }

    }
  },
  subscriptions: {},
};

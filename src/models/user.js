
export default {
  namespace: 'user',
  state: {
    user: {},
    rules: [], // {_id,name,children}
    islight: false, // 侧导航栏主题颜色
    isCollapsed: false // 导航栏是否收起
  },
  reducers: {
    // 设置用户信息
    setUser(state, { payload }) {
      return { ...state, ...{ payload } }
    },
    // 设置权限
    setRules(state, { payload }) {
      return { ...state, ...{ payload } }
    },
    // 设置侧导航栏主题
    setLight(state, { payload }) {

      return { ...state, ...payload }
    },
    // 设置侧导航栏是否收缩
    setCollapsed(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {},
  subscriptions: {},
};

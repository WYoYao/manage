
export default {
  namespace: 'login',
  state: {
    isCompany: true, // 是否是公司登录
    username: "",  // 账户名称
    password: "",  // 密码
  },
  reducers: {
    changeIsCompany: function (state, reducer) {

      var isCompany = reducer.isCompany;
      return { ...state, isCompany };
    }
  },
  effects: {},
  subscriptions: {},
};

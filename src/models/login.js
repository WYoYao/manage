import * as loginService from '../services/login.js';


export default {
  namespace: 'login',
  state: {
    isCompany: true, // 是否是公司登录
    username: "",  // 账户名称
    password: "",  // 密码
  },
  reducers: {
    // 修改登录的方式
    changeIsCompany: function (state, reducer) {

      let username, password, isCompany = reducer.isCompany;

      return { ...state, isCompany, password, username };
    },
    // 修改帐号名称或着密码名称
    changeWord: function (state, reducer) {

      let {
        password,
        username
      } = reducer;

      username = username != void 0 ? username : state.username;
      password = password != void 0 ? password : state.password;

      return { ...state, username, password }

    }
  },
  effects: {
    *login({ username, password, isCompany }) {

      console.log(put);

      yield call(loginService.login, { username, password, isCompany });
      // yield put({
      //   type: 'changeWord',
      //   payload: {
      //     username: "登录成功",
      //     password: "password",
      //   },
      // });
    },
  },
  subscriptions: {},
};

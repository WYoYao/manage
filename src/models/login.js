import * as loginService from '../services/login.js';
import { routerRedux } from 'dva/router';


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
    },
    // 登录失败
    loginFail: function (state, reducer) {
      console.log('登录失败');

      return state;
    },
    // 登录的状态
    changeLoading: function (state, { isLoading }) {
      return { ...state, isLoading };
    },
  },
  effects: {
    *login({ username, password, isCompany }, { put, call, select }) {

      const res = yield call(loginService.login, { username, password, isCompany });

      if (res.BaseResponse.Code == 1) {

        // 登录成功跳转
        yield put({
          type: 'user/setUser',
          payload: res.content,
        });

        yield put(routerRedux.push({
          pathname: '/',
        }))
      } else {

        // 失败后处理
        yield put({
          type: 'loginFail',
          payload: res.BaseResponse.Message,
        });
      }

      //  无论成功失败取消提交的loading
      yield put({
        type: 'changeLoading',
        isLoading: false,
      })
    },
  },
  subscriptions: {},
};
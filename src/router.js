import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";

import Persion from "./routes/Persion.js";

import Login from "./routes/Login.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/users" component={Users} />
      <Route path="/persion" component={Persion} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default RouterConfig;

import React from 'react';
import { Switch, Route, Redirect, routerRedux, Router } from 'dva/router';
import PropTypes from 'prop-types';
import { connect } from 'dva';

import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import Persion from "./routes/Persion.js";
import Login from "./routes/Login.js";

import Equipment from "./routes/Equipment.js";

function Routers({ app, history }) {

  // 获取所有的model 然后附加到对应的App
  const routes = [
    {
      path: '/login',
      model: require('./models/login'),
      component: require('./routes/Login'),
    },
    {
      path: '/equipment',
      model: require('./models/equipment'),
      component: require('./routes/Equipment'),
    }
  ];

  routes.forEach(({ model }) => {

    app.model(model);
  })

  return (
    <Router history={history}>
      <Route path="/" component={IndexPage}>
        <Route path="/users" component={Users} />
        <Route path="/persion" component={Persion} />
        <Route path="/login" component={Login} />
        <Route path="/equipment" component={Equipment} />
      </Route>
    </Router>
  );
}

export default Routers;

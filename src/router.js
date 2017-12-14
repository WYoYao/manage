import React from 'react';
import { Switch, Route, Redirect, routerRedux,Router } from 'dva/router';
import PropTypes from 'prop-types';
import { connect } from 'dva';

import IndexPage from './routes/IndexPage';
import Users from "./routes/Users.js";
import Persion from "./routes/Persion.js";
import Login from "./routes/Login.js";

function Routers({app,history}) {
  
  // 获取所有的model 然后附加到对应的App
  const routes=[
    {
      path:'/login',
      model:require('./models/login'),
      component:require('./routes/Login'),
    }
  ];

  routes.forEach(({model})=>{
    app.model(model);
  })

  return (
    <Router history={history}>
        <Route path="/" component={IndexPage} />
        <Route path="/users" component={Users} />
        <Route path="/persion" component={Persion} />
        <Route path="/login" component={Login} />
      </Router>
      );
}

export default Routers;

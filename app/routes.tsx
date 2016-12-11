import * as React from 'react';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import App from './components/App/App';
import Home from './views/Home/Home';
import Login from './views/Login/Login';

export const routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={Home}/>
        <Route path="/login" component={Login}/>
      </Route>
    </Router>
  );
};

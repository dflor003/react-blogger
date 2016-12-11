import * as React from 'react';
import { Component, PropTypes, ChildContextProvider } from 'react';
import { Router, Route, IndexRedirect, Redirect, hashHistory } from 'react-router';

import App from './components/App/App';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Profile from './views/Profile/Profile';
import AuthService from './services/AuthService';

interface IContext {
  auth: AuthService;
}

export default class AppRoutes extends Component<any, any> implements ChildContextProvider<IContext> {
  static childContextTypes = {
    auth: PropTypes.instanceOf(AuthService)
  };

  private auth: AuthService;

  constructor() {
    super();
    const clientId = '6PCPeiJR2EVqk2wf9QwiQ6eIEUBUc8hN';
    const domain = 'danilf.auth0.com';
    this.auth = new AuthService(clientId, domain);
  }

  getChildContext(): IContext {
    return {
      auth: this.auth
    };
  }

  render() {
    const auth = this.auth;
    const requiresAuth = (nextState, replace) => {
      if (!auth.isLoggedIn()) {
        replace({ pathname: '/login' })
      }
    };

    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="/home"/>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/access_token=:token" component={Login}/>
          <Redirect from="/error=:error&error_description=:errorDescription" to="/login?error=:error&errorDescription=:errorDescription"/>
        </Route>
      </Router>
    );
  }
}

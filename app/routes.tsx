import * as React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App/App';
import Home from './views/Home';

export const mainRoutes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home}/>
      </Route>
    </Router>
  );
};

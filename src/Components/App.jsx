import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import routes from '../routes.js';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route path={routes.mainPage()} component={Login} />
      <Route path={routes.loginUserPath()} component={Login} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;

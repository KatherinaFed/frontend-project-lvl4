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
      <Route path={routes.mainPage() || routes.loginPage()} component={Login} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;

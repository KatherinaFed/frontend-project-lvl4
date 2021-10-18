import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import routes from '../routes.js';
import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import Chat from './Chat.jsx';

const App = () => (
  <Router>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Switch>
        <Route path={routes.mainPath()} component={Chat} />
        <Route path={routes.loginPath()} component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default App;

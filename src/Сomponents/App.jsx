import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import NotFound from './NotFound.jsx';
import Login from './Login.jsx';
import Navbar from './Navbar.jsx';
import Chat from './Chat.jsx';

import authContext from '../contexts/authContext.js';
import { useAuth } from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const ChatRoute = ({ children, path }) => {
  const { loggedIn } = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (loggedIn ? children : (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      ))}
    />
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Switch>
          <ChatRoute exact path="/">
            <Chat />
          </ChatRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  </AuthProvider>
);

export default App;

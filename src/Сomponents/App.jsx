import React from 'react';
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
import Signup from './Signup.jsx';

import {
  AuthProvider,
  ModalProvider,
  ThemeProvider,
} from '../contexts/index.js';

import { useAuth } from '../contexts/hooks/index.js';

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
    <ThemeProvider>
      <ModalProvider>
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
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </ModalProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default App;

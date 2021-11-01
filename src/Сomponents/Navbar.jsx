import { Button, Navbar, Container } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth, useTheme } from '../hooks/index.js';
import SwitchButton from './darkMode/buttonMode.jsx';
import darkMode from './darkMode/themes.js';

const Nav = () => {
  const { theme } = useTheme();
  const { dark, white } = darkMode;
  const themeNavbar = theme ? dark : white;
  const themeText = theme ? white : dark;

  const AuthButton = () => {
    const { loggedIn, logOut } = useAuth();

    return loggedIn ? (
      <Button onClick={logOut} className="btn btn-primary" type="button">
        Выйти
      </Button>
    ) : null;
  };

  return (
    <Navbar className={`shadow-sm navbar navbar-expand-lg navbar-light bg-${themeNavbar}`}>
      <Container>
        <Navbar.Brand className={`text-${themeText}`} as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        <div className="navbar-nav">
          <AuthButton />
          <SwitchButton />
        </div>
      </Container>
    </Navbar>
  );
};

export default Nav;

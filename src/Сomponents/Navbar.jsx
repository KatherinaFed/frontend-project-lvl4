import { Button, Navbar, Container } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth, useTheme } from '../contexts/hooks/index.js';
import SwitchButton from './darkMode/buttonMode.jsx';
import darkMode from './darkMode/themes.js';

const Nav = () => {
  const { t } = useTranslation();

  const { theme } = useTheme();
  const { dark, white } = darkMode;
  const themeNavbar = theme ? dark : white;
  const themeText = theme ? white : dark;

  const AuthButton = () => {
    const { loggedIn, logOut } = useAuth();

    return loggedIn ? (
      <Button onClick={logOut} className="btn btn-primary" type="button">
        {t('loginForm.logout')}
      </Button>
    ) : null;
  };

  return (
    <Navbar className={`shadow-sm navbar navbar-expand-lg navbar-light bg-${themeNavbar}`}>
      <Container>
        <Navbar.Brand className={`text-${themeText}`} as={Link} to="/">
          {t('projectName')}
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

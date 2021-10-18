import { Button, Navbar, Container } from 'react-bootstrap';
import React from 'react';
import { useHistory } from 'react-router-dom';

import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const Nav = () => {
  const { loggedIn, logOut } = useAuth();
  const mainPath = routes.mainPath();
  const history = useHistory();

  const AuthButton = () => {
    if (loggedIn) {
      history.push(mainPath);

      return (
        <Button onClick={logOut} className="btn btn-primary" type="button">Выйти</Button>
      );
    }

    return null;
  };

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href={mainPath}>Hexlet Chat</Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Nav;

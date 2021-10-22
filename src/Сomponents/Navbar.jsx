import { Button, Navbar, Container } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/index.js';

const Nav = () => {
  const AuthButton = () => {
    const { loggedIn, logOut } = useAuth();

    return loggedIn ? (
      <Button onClick={logOut} className="btn btn-primary" type="button">
        Выйти
      </Button>
    ) : null;
  };

  return (
    <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
};

export default Nav;

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import loginJPG from '../../assets/images/login.jpg';
import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';

const logInSchema = Yup.object().shape({
  username: Yup.string().trim().min(4).max(10).required(),
  password: Yup.string().trim().required(),
});

const Login = () => {
  const [authFailed, setAuthFailed] = useState(false);

  const auth = useAuth();
  const history = useHistory();

  const textInput = useRef();
  useEffect(() => {
    textInput.current.focus();
  }, []);

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    logInSchema,
    onSubmit: async (value) => {
      const loginPath = routes.loginPath();
      const chatPath = routes.mainPath();

      try {
        setAuthFailed(false);
        const { data } = await axios.post(loginPath, value);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        history.replace({ pathname: chatPath });
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          textInput.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="card shadow-sm">
            <Card.Body className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={loginJPG}
                  className="rounded-circle"
                  alt="loginPicture"
                />
              </div>

              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={handleSubmit}
              >
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={handleChange}
                    ref={textInput}
                    value={values.username}
                    isInvalid={authFailed}
                    id="username"
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    onChange={handleChange}
                    value={values.password}
                    isInvalid={authFailed}
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    type="password"
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    The username or password is incorrect
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="w-100 mb-3 btn btn-primary">
                  Войти
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

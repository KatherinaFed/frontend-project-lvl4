import React from 'react';
import {
  Button, Card, Form, FormControl, FormGroup, FormLabel,
} from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import loginJPG from './images/login.jpg';

const Login = () => {
  const validationSchema = Yup.object({
    username: Yup.string().trim()
      .min(3, 'Слишком короткое имя!')
      .max(20, 'Слишком длинное имя!')
      .required('Required username!'),
    password: Yup.string().trim()
      .min(6, 'Слишком короткий пароль!')
      .max(10, 'Слишком длинный пароль!')
      .required('Required password!'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card className="card shadow-sm">
            <Card.Body className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginJPG} className="rounded-circle" alt="loginPicture" />
              </div>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <FormGroup className="form-floating mb-3">
                  <FormControl
                    id="username"
                    name="username"
                    autocomplete="username"
                    required
                    placeholder="Ваш ник"
                    value={formik.initialValues.username}
                  />
                  <FormLabel for="username">Ваш ник</FormLabel>
                </FormGroup>
                <FormGroup className="form-floating mb-4">
                  <FormControl
                    id="password"
                    name="password"
                    autocomplete="current-password"
                    required
                    placeholder="Пароль"
                    type="password"
                    value={formik.initialValues.password}
                  />
                  <FormLabel for="password">Пароль</FormLabel>
                </FormGroup>
                <Button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;

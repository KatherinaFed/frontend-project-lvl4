import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';

import signupJPG from '../../assets/images/signup.jpg';
import { useAuth, useTheme } from '../hooks/index.js';
import routes from '../routes.js';
import darkMode from './darkMode/themes.js';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

const Signup = () => {
  const [authFailed, setAuthFailed] = useState(null);
  const auth = useAuth();
  const history = useHistory();

  const textInput = useRef();
  useEffect(() => {
    textInput.current.focus();
  }, []);

  const {
    handleChange,
    handleSubmit,
    isSubmitting,
    values,
    errors,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: signupSchema,
    onSubmit: async (value, { setSubmitting }) => {
      const signupPath = routes.signupPath();
      const chatPath = routes.mainPath();
      const { username, password } = value;

      try {
        setSubmitting(false);
        const { data } = await axios.post(signupPath, { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        history.replace({ pathname: chatPath });
      } catch (e) {
        setSubmitting(false);
        if (e.isAxiosError && e.response.status === 409) {
          setAuthFailed('Пользователь с таким именем уже зарегистрирован');
          return;
        }

        throw e;
      }
    },
  });

  return (
    <Row className="justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className="card shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img
                src={signupJPG}
                className="rounded-circle"
                alt="signupPicture"
              />
            </div>

            <Form onSubmit={handleSubmit} className="w-50">
              <h1 className="text-center mb-4">Регистрация</h1>

              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={handleChange}
                  ref={textInput}
                  value={values.username}
                  isInvalid={errors.username || authFailed}
                  disabled={isSubmitting}
                  // className={themeFormControl}
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  placeholder="От 3 до 20 символов"
                />
                <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.username || authFailed}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={values.password}
                  isInvalid={errors.password || authFailed}
                  disabled={isSubmitting}
                  // className={themeFormControl}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  placeholder="Не менее 6 символов"
                />
                <Form.Label htmlFor="password">Пароль</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.password || authFailed}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={values.confirmPassword}
                  isInvalid={errors.confirmPassword || authFailed}
                  disabled={isSubmitting}
                  // className={themeFormControl}
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  placeholder="Пароли должны совпадать"
                />
                <Form.Label htmlFor="confirmPassword">
                  Подтвердите пароль
                </Form.Label>
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword || authFailed}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="w-100" variant="primary">
                Зарегистрироваться
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Row>
  );
};

export default Signup;

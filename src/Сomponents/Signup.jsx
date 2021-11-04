import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Form, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import signupJPG from '../../assets/images/signup.jpg';
import { useAuth, useTheme } from '../hooks/index.js';
import routes from '../routes.js';
import darkMode from './darkMode/themes.js';

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'errors.nameLength')
    .max(20, 'errors.nameLength')
    .required('errors.requiredField'),
  password: Yup.string()
    .min(6, 'errors.passwordLength')
    .required('errors.requiredField'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'errors.passwordMatch'),
});

const Signup = () => {
  const [authFailed, setAuthFailed] = useState(null);

  const { t } = useTranslation();
  const auth = useAuth();
  const history = useHistory();

  const { theme } = useTheme();
  const { dark, white } = darkMode;
  const themeCard = theme ? dark : white;
  const themeFormControl = theme ? 'bg-dark text-white' : '';
  const themeText = theme ? white : dark;

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
      } catch (err) {
        setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(t('errors.userExist'));
          return;
        }

        setAuthFailed(t('errors.defaultError'));
      }
    },
  });

  return (
    <Row className="justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card className={`card shadow-sm bg-${themeCard}`}>
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <img
                src={signupJPG}
                className="rounded-circle"
                alt="signupPicture"
              />
            </div>

            <Form onSubmit={handleSubmit} className="w-50">
              <h1 className={`text-${themeText} text-center mb-4`}>{t('signupForm.signup')}</h1>

              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={handleChange}
                  ref={textInput}
                  value={values.username}
                  isInvalid={errors.username || authFailed}
                  disabled={isSubmitting}
                  className={themeFormControl}
                  id="username"
                  name="username"
                  autoComplete="username"
                  required
                  placeholder={t('signupForm.placeholderName')}
                />
                <Form.Label htmlFor="username">{t('signupForm.signupName')}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {t(errors.username) || authFailed}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={values.password}
                  isInvalid={errors.password || authFailed}
                  disabled={isSubmitting}
                  className={themeFormControl}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  placeholder={t('signupForm.placeholderPassword')}
                />
                <Form.Label htmlFor="password">{t('signupForm.signupPassword')}</Form.Label>
                <Form.Control.Feedback type="invalid">
                  {t(errors.password) || authFailed}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="form-floating mb-3">
                <Form.Control
                  onChange={handleChange}
                  value={values.confirmPassword}
                  isInvalid={errors.confirmPassword || authFailed}
                  disabled={isSubmitting}
                  className={themeFormControl}
                  id="confirmPassword"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  placeholder={t('signupForm.placeholderConfirmPassword')}
                />
                <Form.Label htmlFor="confirmPassword">
                  {t('signupForm.confirmPassword')}
                </Form.Label>
                <Form.Control.Feedback type="invalid">
                  {t(errors.confirmPassword) || authFailed}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" className="w-100" variant="primary">
                {t('signupForm.registration')}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Row>
  );
};

export default Signup;

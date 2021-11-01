import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { useModal, useSocket } from '../../../hooks/index.js';

const ModalForm = () => {
  const socket = useSocket();
  const { handleClose, modalInfo } = useModal();
  const { channels } = useSelector((state) => state.chat);

  const { name } = channels.find((item) => item.id === modalInfo.id);
  const channelName = channels.map((item) => item.name);

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, 'Длина названия должна быть не менее 3-х символов')
      .max(20, 'Длина названия должна быть не более 20-ти символов')
      .notOneOf(channelName, 'Название должно быть уникально')
      .required(),
  });

  const textInput = useRef();
  useEffect(() => {
    textInput.current.select();
  }, []);

  const { handleChange, handleSubmit, isSubmitting, values, errors } = useFormik({
    initialValues: {
      name,
    },
    channelSchema,
    onSubmit: (data, { setSubmitting }) => {
      setSubmitting(true);

      socket.renameChannel({ id: modalInfo.id, name: data.name }, ({ status }) => {
        if (status === 'ok') {
          handleClose();
        }
      });
    },
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          name="name"
          className="mb-2"
          testid="rename-channel"
          onChange={handleChange}
          ref={textInput}
          disabled={isSubmitting}
          isInvalid={errors.name}
          value={values.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleClose}
            type="button"
            className="me-2 btn btn-secondary"
          >
            Отменить
          </Button>
          <Button type="submit" className="btn btn-primary">
            Отправить
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default ModalForm;

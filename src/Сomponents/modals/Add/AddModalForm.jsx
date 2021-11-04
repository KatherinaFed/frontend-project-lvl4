import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import store from '../../../store/index.js';
import { setActiveChannel } from '../../../store/chatSlice.js';
import { useModal, useSocket } from '../../../hooks/index.js';

const ModalForm = () => {
  const { t } = useTranslation();
  const socket = useSocket();
  const { handleClose } = useModal();
  const { channels } = useSelector((state) => state.chat);
  const channelName = channels.map((item) => item.name);

  const channelSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, 'errors.channelNameLength')
      .max(20, 'errors.channelNameLength')
      .notOneOf(channelName, 'errors.uniqueChannelName')
      .required(),
  });

  const textInput = useRef();
  useEffect(() => {
    textInput.current.focus();
  }, []);

  const { handleChange, handleSubmit, isSubmitting, errors } = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: channelSchema,
    onSubmit: ({ name }, { setSubmitting }) => {
      setSubmitting(true);

      const channel = { name };
      socket.newChannel(channel, (response) => {
        if (response.status === 'ok') {
          store.dispatch(setActiveChannel(response.data.id));
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
          data-testid="add-channel"
          className="mb-2"
          onChange={handleChange}
          ref={textInput}
          disabled={isSubmitting}
          isInvalid={errors.name}
        />
        <Form.Control.Feedback type="invalid">
          {t(errors.name)}
        </Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleClose}
            type="button"
            className="me-2 btn btn-secondary"
          >
            {t('modals.send')}
          </Button>
          <Button type="submit" className="btn btn-primary">
            {t('modals.cancel')}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
};

export default ModalForm;

import React, { useRef, useEffect } from 'react';
import { Button, Col, Form, FormControl, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { useSocket, useTheme } from '../hooks/index.js';
import darkMode from './darkMode/themes.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const { currentChannelId } = useSelector((state) => state.chat);
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const socket = useSocket();

  const textInput = useRef(null);
  useEffect(() => {
    textInput.current.focus();
  });

  const { handleChange, handleSubmit, isSubmitting, values } = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }, { resetForm, setSubmitting }) => {
      const newMessage = {
        message,
        channelId: currentChannelId,
        username,
      };

      socket.newMessage(newMessage, ({ status }) => {
        if (status === 'ok') {
          setSubmitting(true);
          resetForm();
          setSubmitting(false);
        }
      });
    },
  });

  return (
    <Form onSubmit={handleSubmit} className="form-label">
      <Row className="align-items-center">
        <Col className="p-0">
          <FormControl
            ref={textInput}
            data-testid="new-message"
            placeholder={t('messages.placeholderName')}
            name="message"
            type="text"
            value={values.message}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </Col>
        <Col xs="auto">
          <Button
            role="button"
            className="btn btn-group-vertical"
            type="submit"
            name={t('messages.send')}
            disabled={values.message === '' || isSubmitting}
          >
            {t('messages.send')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

const Messages = () => {
  const { channels, messages, currentChannelId } = useSelector((state) => state.chat);

  const buildMessage = ({ message, id, username }) => (
    <div key={id} className="text-break mb-2">
      <b>{username}</b>
      {': '}
      {message}
    </div>
  );

  const renderMessages = () => {
    const render = messages
      .filter(({ channelId }) => channelId === currentChannelId)
      .map((message) => buildMessage(message));

    return (
      <div
        className="chat-messages h-100 overflow-auto text-break px-5"
        id="messages-box"
      >
        {render}
      </div>
    );
  };

  const renderChannel = () => {
    const { theme } = useTheme();
    const { dark, white } = darkMode;
    const statusMode = theme ? dark : white;

    const currentChannel = channels.find(({ id }) => id === currentChannelId);
    const countOfMessages = messages.filter(({ channelId }) => channelId === currentChannelId);

    return (
      <div className={`bg-${statusMode} mx-0 mb-4 p-3 shadow-sm small`}>
        <p className="m-0">
          <b>{currentChannel ? currentChannel.name : null}</b>
        </p>
        <span className="text-mutted">{`${countOfMessages.length} messages`}</span>
      </div>
    );
  };

  return (
    <Col className="d-flex flex-column h-100 p-0">
      {renderChannel()}
      {renderMessages()}
      <div className="mt-auto px-5 py-3">
        <MessageForm />
      </div>
    </Col>
  );
};

export default Messages;

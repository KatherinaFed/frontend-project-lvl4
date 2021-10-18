import React, { useRef, useEffect } from 'react';
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const inputSchema = Yup.object().shape({
  message: Yup.string().trim().min(1).max(400).required(),
});

const MessageForm = () => {
  const textInput = useRef();
  useEffect(() => {
    textInput.current.focus();
  }, []);

  const { handleChange, handleSubmit, isSubmitting, values } = useFormik({
    initialValues: {
      message: '',
    },
    inputSchema,
    onSubmit: () => {},
  });

  return (
    <div className="mt-auto py-3 px-5">
      <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <FormControl
            className="border-0 p-0 ps-2"
            ref={textInput}
            data-testid="new-message"
            placeholder="Ваше сообщение..."
            name="message"
            type="text"
            value={values.message}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <Button
            className="btn btn-group-vertical"
            type="submit"
            disabled={isSubmitting}
            variant="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

const Messages = () => {
  const { channels, currentChannelId, messages } = useSelector(
    (state) => state.chat,
  );

  const currentChannelName = () => {
    const channel = channels.find(({ id }) => id === currentChannelId);
    console.log(channel);

    return channel ? channel.name : '';
  };

  return (
    <Col className="d-flex flex-column h-100 p-0">
      <div className="bg-light mx-0 mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{}</b>
        </p>
        <span className="text-mutted">{`${0} messages`}</span>
      </div>
      <div
        className="chat-messages h-100 overflow-auto text-break px-5"
        id="messages-box"
      />
      <MessageForm />
    </Col>
  );
};

export default Messages;

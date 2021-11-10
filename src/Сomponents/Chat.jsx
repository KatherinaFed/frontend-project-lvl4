import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import store from '../store/index.js';
import { setData } from '../store/chatSlice.js';
import routes from '../routes.js';
import { useTheme } from '../hooks/index.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const Chat = () => {
  const { theme } = useTheme();
  const statusMode = theme
    ? 'h-100 text-light bg-dark flex-md-row'
    : 'h-100 bg-white flex-md-row';

  useEffect(() => {
    axios
      .get(routes.dataPath(), { headers: getAuthHeader() })
      .then((response) => {
        store.dispatch(setData(response.data));
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className={statusMode}>
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default Chat;

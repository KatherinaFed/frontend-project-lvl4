import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import routes from '../routes.js';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Chat = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 bg-white flex-md-row">
      <Channels />
      <Messages />
    </Row>
  </Container>
);

export default Chat;

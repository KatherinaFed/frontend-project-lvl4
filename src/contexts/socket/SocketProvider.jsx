import React from 'react';
import io from 'socket.io-client';
import store from '../../store/index.js';
import { addMessage, addChannel, removeChannel, renameChannel } from '../../store/chatSlice.js';

import SocketContext from './SocketContext.js';

const SocketProvider = ({ children }) => {
  const socket = io();

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });
  socket.on('removeChannel', (id) => {
    store.dispatch(removeChannel(id));
  });

  const socketValues = {
    newMessage: (message, response) => socket.emit('newMessage', message, response),
    newChannel: (channel, response) => socket.emit('newChannel', channel, response),
    renameChannel: (data, response) => socket.emit('renameChannel', data, response),
    removeChannel: (id, response) => socket.emit('removeChannel', id, response),
  };

  return (
    <SocketContext.Provider value={socketValues}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

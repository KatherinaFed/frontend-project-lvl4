import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import App from './Сomponents/App.jsx';
import store from './store/index.js';
import { addMessage, addChannel } from './store/chatSlice.js';
import SocketContext from './contexts/socketContext.js';

const render = () => {
  const socket = io();

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
  });

  const socketValues = {
    newMessage: (message, response) => socket.emit('newMessage', message, response),
    newChannel: (channel, response) => socket.emit('newChannel', channel, response),
  };

  ReactDOM.render(
    <Provider store={store}>
      <SocketContext.Provider value={socketValues}>
        <App />
      </SocketContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default render;

import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollBarProvider } from '@rollbar/react';
import { rollbarConfig, rollbarInstance } from './rollbar.js';

import App from './Сomponents/App.jsx';
import store from './store/index.js';
import resources from './locales/index.js';
// import { SocketProvider } from './contexts/index.js';
import SocketContext from './contexts/socket/SocketContext.js';
import { addMessage, addChannel, removeChannel, renameChannel } from './store/chatSlice.js';

const render = async (socket) => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',

    interpolation: {
      escapeValue: false,
    },
  });

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
    <Provider store={store}>
      <RollBarProvider config={rollbarConfig} instance={rollbarInstance}>
        <I18nextProvider i18n={i18n}>
          {/* <SocketProvider> */}
          <SocketContext.Provider value={socketValues}>
            <App />
          </SocketContext.Provider>
          {/* </SocketProvider> */}
        </I18nextProvider>
      </RollBarProvider>
    </Provider>
  );
};

export default render;

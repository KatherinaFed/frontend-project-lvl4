import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './Сomponents/App.jsx';
import store from './store/index.js';
import { SocketProvider } from './contexts/index.js';

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>,
    document.getElementById('chat'),
  );
};

export default render;

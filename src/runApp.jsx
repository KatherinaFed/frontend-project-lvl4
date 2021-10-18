import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Сomponents/App.jsx';
import store from './store/index.js';

const render = () => {
  const vdom = document.getElementById('chat');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    vdom,
  );
};

export default render;

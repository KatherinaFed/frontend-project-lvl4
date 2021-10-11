import React from 'react';
import ReactDOM from 'react-dom';
import App from './Сomponents/App.jsx';

const render = () => {
  const vdom = document.getElementById('chat');
  ReactDOM.render(<App />, vdom);
};

export default render;

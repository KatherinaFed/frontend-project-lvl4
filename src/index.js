// @ts-check
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import app from './runApp.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = async () => {
  const socket = io();
  const run = await app(socket);

  ReactDOM.render(
    run,
    document.getElementById('chat'),
  );
};

runApp();

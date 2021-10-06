import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App.jsx';

const cardBody = document.createElement('div');
cardBody.classList.add('card-body');

ReactDOM.render(<App />, cardBody);

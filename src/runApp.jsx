import React from 'react';
import ReactDOM from 'react-dom';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';

import App from './Сomponents/App.jsx';
import store from './store/index.js';
import { SocketProvider } from './contexts/index.js';
import resources from './locales/index.js';

const render = async () => {
  await i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <SocketProvider>
          <App />
        </SocketProvider>
      </I18nextProvider>
    </Provider>
  );
};

// const render = () => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <SocketProvider>
//         <App />
//       </SocketProvider>
//     </Provider>,
//     document.getElementById('chat'),
//   );
// };

export default render;

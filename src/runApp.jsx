import React from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollBarProvider } from '@rollbar/react';
import { rollbarConfig, rollbarInstance } from './rollbar.js';

import App from './Сomponents/App.jsx';
import store from './store/index.js';
import resources from './locales/index.js';
import { SocketProvider } from './contexts/index.js';

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
      <RollBarProvider config={rollbarConfig} instance={rollbarInstance}>
        <I18nextProvider i18n={i18n}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </I18nextProvider>
      </RollBarProvider>
    </Provider>
  );
};

export default render;

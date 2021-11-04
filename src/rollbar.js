import Rollbar from 'rollbar';

export const rollbarConfig = {
  accessToken: 'f501ada370ee452782227e32d4d13fa2',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: 'production',
};

export const rollbarInstance = new Rollbar(rollbarConfig);

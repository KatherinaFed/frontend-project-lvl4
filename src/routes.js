// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
  dataPath: () => [host, prefix, 'data'].join('/'),
  signupPath: () => [host, prefix, 'signup'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  mainPath: () => '/',
};

import { useContext } from 'react';

import AuthContext from '../auth/AuthContext.js';
import ModalContext from '../modal/ModalContext.js';
import SocketContext from '../socket/SocketContext.js';
import ThemeContext from '../theme/ThemeContext.js';

const useAuth = () => useContext(AuthContext);
const useModal = () => useContext(ModalContext);
const useSocket = () => useContext(SocketContext);
const useTheme = () => useContext(ThemeContext);

export {
  useAuth,
  useModal,
  useSocket,
  useTheme,
};

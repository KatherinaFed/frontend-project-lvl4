import { useContext } from 'react';

import AuthContext from '../contexts/auth/AuthContext.js';
import ModalContext from '../contexts/modal/ModalContext.js';
import SocketContext from '../contexts/socket/SocketContext.js';
import ThemeContext from '../contexts/theme/ThemeContext.js';

const useAuth = () => useContext(AuthContext);
const useModal = () => useContext(ModalContext);
const useSocket = () => useContext(SocketContext);
const useTheme = () => useContext(ThemeContext);

export { useAuth, useModal, useSocket, useTheme };

import { useContext } from 'react';

import authContext from '../contexts/authContext.js';
import socketContext from '../contexts/socketContext.js';

const useAuth = () => useContext(authContext);
const useSocket = () => useContext(socketContext);

export { useAuth, useSocket };

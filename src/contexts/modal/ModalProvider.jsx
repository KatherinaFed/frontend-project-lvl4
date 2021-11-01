import React, { useState } from 'react';

import ModalContext from './ModalContext.js';

const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({ type: null, id: null });

  const handleShow = (typeModal, modalId) => {
    setShow(true);
    setModalInfo({ type: typeModal, id: modalId });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <ModalContext.Provider value={{ show, modalInfo, handleShow, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

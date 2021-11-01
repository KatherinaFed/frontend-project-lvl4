import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { useModal, useSocket } from '../../../hooks/index.js';

const RemoveChannel = () => {
  const socket = useSocket();
  const { show, modalInfo, handleClose } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.removeChannel({ id: modalInfo.id }, ({ status }) => {
      if (status === 'ok') {
        handleClose();
      }
    });
  };

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h4">Удалить канал</Modal.Title>
        <Button
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn btn-close"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={handleClose} className="me-2 btn btn-secondary">Отменить</Button>
          <Button onClick={handleSubmit} className="btn btn-danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;

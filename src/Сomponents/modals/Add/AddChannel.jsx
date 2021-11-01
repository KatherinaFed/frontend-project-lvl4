import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import ModalForm from './AddModalForm.jsx';
import { useModal } from '../../../hooks/index.js';

const AddChannel = () => {
  const { show, handleClose } = useModal();

  return (
    <Modal show={show} centered onHide={handleClose}>
      <Modal.Header>
        <Modal.Title className="h4">Добавить канал</Modal.Title>
        <Button
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn btn-close"
        />
      </Modal.Header>
      <Modal.Body>
        <ModalForm />
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;

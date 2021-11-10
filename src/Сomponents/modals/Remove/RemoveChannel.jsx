import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useModal, useSocket } from '../../../hooks/index.js';

const RemoveChannel = () => {
  const { t } = useTranslation();
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
        <Modal.Title className="h4">{t('modals.removeChannel')}</Modal.Title>
        <Button
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
          className="btn btn-close"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            onClick={handleClose}
            role="button"
            name={t('modals.cancel')}
            className="me-2 btn btn-secondary"
          >
            {t('modals.cancel')}
          </Button>
          <Button
            onClick={handleSubmit}
            role="button"
            name={t('modals.remove')}
            className="btn btn-danger"
          >
            {t('modals.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;

import React from 'react';
import { Button, ButtonGroup, Col, Dropdown, Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import store from '../store/index.js';
import { setActiveChannel } from '../store/chatSlice.js';
import { useTheme, useModal } from '../hooks/index.js';
import darkMode from './darkMode/themes.js';
import { AddChannel, RemoveChannel, RenameChannel } from './modals/modals.js';

const Channels = () => {
  const { t } = useTranslation();
  const { handleShow, modalInfo } = useModal();
  const { theme } = useTheme();
  const { dark, light } = darkMode;
  const themeButton = theme ? dark : light;

  const { channels, currentChannelId } = useSelector((state) => state.chat);

  const setActive = (id) => () => {
    store.dispatch(setActiveChannel(id));
  };

  const renderChannels = () => {
    const listOfChannels = channels.map(({ id, name, removable }) => {
      const activeChannel = id === currentChannelId;
      const buttonStyle = activeChannel ? 'secondary' : themeButton;

      return !removable ? (
        <Nav.Item key={id} as="li" className="w-100">
          <Button
            role="button"
            onClick={setActive(id)}
            type="button"
            className="w-100 rounded-0 text-start text-truncate my-1"
            variant={buttonStyle}
          >
            <span># </span>
            {name}
          </Button>
        </Nav.Item>
      ) : (
        <Nav.Item key={id} as="li" className="w-100">
          <Dropdown className="d-flex" as={ButtonGroup}>
            <Button
              role="button"
              onClick={setActive(id)}
              type="button"
              className="w-100 rounded-0 text-start text-truncate my-1"
              variant={buttonStyle}
            >
              <span># </span>
              {name}
            </Button>
            <Dropdown.Toggle
              aria-haspopup="true"
              split
              variant={buttonStyle}
              className="flex-grow-0 my-1 rounded-end"
            />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleShow('removing', id)}>
                {t('channels.remove')}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleShow('renaming', id)}>
                {t('channels.rename')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav.Item>
      );
    });

    return channels ? listOfChannels : null;
  };

  const renderModal = (typeModal) => {
    let modal = null;
    if (typeModal.type === 'adding') {
      modal = <AddChannel />;
    } else if (typeModal.type === 'removing') {
      modal = <RemoveChannel />;
    } else if (typeModal.type === 'renaming') {
      modal = <RenameChannel />;
    }

    return modal;
  };

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 align-text-bottom">
        <span>{t('channels.name')}</span>
        <button
          onClick={() => handleShow('adding', null)}
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus-square"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <div id="channel-list">
        <Nav fill as="ul" variant="pills" className="flex-column px-2">
          {renderChannels()}
        </Nav>
      </div>
      {renderModal(modalInfo)}
    </Col>
  );
};

export default Channels;

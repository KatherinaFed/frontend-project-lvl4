import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Dropdown,
  Nav,
} from 'react-bootstrap';
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
    if (typeModal.type === 'adding') {
      return <AddChannel />;
    }
    if (typeModal.type === 'removing') {
      return <RemoveChannel />;
    }
    if (typeModal.type === 'renaming') {
      return <RenameChannel />;
    }

    return null;
  };

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 align-text-bottom">
        <h5>{t('channels.name')}</h5>
        <Button
          onClick={() => handleShow('adding', null)}
          type="button"
          size="sm"
          variant="outline-primary"
          className="border"
        >
          +
        </Button>
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

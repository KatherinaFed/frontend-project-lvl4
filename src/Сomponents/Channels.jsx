import React from 'react';
import { Button, ButtonGroup, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChannel } from '../store/chatSlice.js';

const Channels = () => {
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((state) => state.chat);

  const setActive = (id) => () => {
    dispatch(setActiveChannel(id));
  };

  const renderChannels = () => {
    const listOfChannels = (
      <ButtonGroup vertical className="w-100 overflow-hidden">
        {channels.map(({ id, name }) => {
          const activeChannel = id === currentChannelId;
          const buttonActive = activeChannel ? 'secondary' : 'light';

          return (
            <Button
              key={id}
              onClick={setActive(id)}
              type="button"
              className="rounded-0 text-start text-truncate my-1"
              variant={buttonActive}
            >
              <span># </span>
              {name}
            </Button>
          );
        })}
      </ButtonGroup>
    );

    return channels ? listOfChannels : null;
  };

  return (
    <Col className="col-4 col-md-2 border-end pt-5 px-0">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 align-text-bottom">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical">
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
      {renderChannels()}
    </Col>
  );
};

export default Channels;

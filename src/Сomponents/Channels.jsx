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
              onClick={setActive(id)}
              type="button"
              className="rounded-0 text-start text-truncate my-1"
              variant={buttonActive}
            >
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
        <span className="fs-3">Каналы</span>
        <Button type="button" className="border" variant="light">
          +
        </Button>
      </div>
      {renderChannels()}
    </Col>
  );
};

export default Channels;

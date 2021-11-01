import { createSlice } from '@reduxjs/toolkit';

const defaultChannel = 1;

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
    setData(state, action) {
      const { channels, messages, currentChannelId } = action.payload;
      return {
        channels: [...channels],
        messages: [...messages],
        currentChannelId,
      };
    },
    addChannel(state, action) {
      const { channels, messages, currentChannelId } = state;

      return {
        channels: [...channels, action.payload],
        messages,
        currentChannelId,
      };
    },
    setActiveChannel(state, action) {
      const { channels, messages } = state;
      return {
        channels,
        messages,
        currentChannelId: action.payload,
      };
    },
    addMessage(state, action) {
      const { channels, messages, currentChannelId } = state;
      return {
        channels,
        messages: [...messages, action.payload],
        currentChannelId,
      };
    },
    renameChannel(state, action) {
      const { id, name } = action.payload;
      const channel = state.channels.find((item) => item.id === id);
      channel.name = name;
    },
    removeChannel(state, action) {
      const { id } = action.payload;
      const { channels, messages, currentChannelId } = state;

      const newChannel = currentChannelId === id ? defaultChannel : currentChannelId;

      return {
        channels: channels.filter((item) => item.id !== id),
        messages: messages.filter((item) => item.channelId !== id),
        currentChannelId: newChannel,
      };
    },
  },
});

export const {
  setData,
  addChannel,
  setActiveChannel,
  addMessage,
  renameChannel,
  removeChannel,
} = chatSlice.actions;

export default chatSlice.reducer;

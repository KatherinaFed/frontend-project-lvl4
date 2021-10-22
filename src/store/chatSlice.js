import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
    currentChannelId: null,
  },
  reducers: {
    setData(state, action) {
      const { channels, currentChannelId, messages } = action.payload;
      return {
        channels: [...channels],
        messages: [...messages],
        currentChannelId,
      };
    },
    addChannel(state, action) {
      const { channel } = action.payload;
      const { id } = channel;
      state.channels.push(channel);
      state.currentChannelId = id;
    },
    setActiveChannel(state, action) {
      return {
        ...state,
        currentChannelId: action.payload,
      };
    },
    addMessage(state, action) {
      const { channels, currentChannelId, messages } = state;
      return {
        channels,
        currentChannelId,
        messages: [...messages, action.payload],
      };
    },
  },
});

export const {
  setData,
  addChannel,
  setActiveChannel,
  addMessage,
} = chatSlice.actions;

export default chatSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    currentChannelId: null,
    messages: [],
  },
  reducers: {
    setData(state, action) {
      const { channels, currentChannelId, messages } = action.payload;
      return {
        channels: [...channels],
        currentChannelId,
        messages: [...messages],
      };
    },
    addChannel(state, action) {
      const { channelData } = action.payload;
      const { id } = channelData;
      state.channels.push(channelData);
      state.currentChannelId = id;
    },
    setActiveChannel(state, action) {
      const { id } = action.payload;
      const { channels, messages } = state;
      return {
        channels,
        currentChannelId: id,
        messages,
      };
    },
    addMessage(state, action) {
      const { messageData } = action.payload;
      state.messages.push(messageData);
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

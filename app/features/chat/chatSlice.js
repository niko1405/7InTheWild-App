import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: {
    messages: [],
    chatId: null,
    participants: [],
  },
  chats: [],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    comment: (state, action) => {
      state.chat = {
        messages: action.payload.messages,
        chatId: action.payload._id,
        participants: action.payload.participants,
      };
    },
    getChat: (state, action) => {
      let payload = action.payload;

      state.chat =
        payload !== null
          ? {
              messages: payload.messages,
              chatId: payload._id,
              participants: payload.participants,
            }
          : initialState.chat;
    },
    getChats: (state, action) => {
      state.chats = action.payload;
    },
    chatStateAction: (state, action) => {
      let payload = action.payload;

      let filterChats = state.chats?.filter(
        (chat) => chat?._id !== payload.chatId
      );
      let chats = payload.delete
        ? filterChats
        : [...filterChats, payload.newChat];

      state.chats = chats;
    },
    clear: (state) => {
      state.chat = {
        messages: [],
        chatId: null,
        participants: [],
      };
      state.chats = [];
    },
  },
});

export const { comment, getChat, chatStateAction, getChats, clear } =
  chatSlice.actions;

export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { getChat, getChatList } from "../actions/chatAction";
import type { ChatState } from "../types/chatType";

const initialState: ChatState = {
  isChatLoading: false,
  ChatData: null,
  isChatError: false,

  isChatlistLoading: false,
  ChatList: [],
  isChatlistError: false,
};

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: initialState,
  reducers: {
    clearChatData: (state) => {
      state.ChatData = null;
    },
  },
  extraReducers: (builder) => {
    // get Chat Data
    builder.addCase(getChat.pending, (state) => {
      state.isChatLoading = true;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.isChatLoading = false;
      state.ChatData = action.payload;
    });
    builder.addCase(getChat.rejected, (state) => {
      state.isChatLoading = false;
      state.isChatError = true;
    });

    // get Chat List

    builder.addCase(getChatList.pending, (state) => {
      state.isChatlistLoading = true;
    });
    builder.addCase(getChatList.fulfilled, (state, action) => {
      state.isChatlistLoading = false;
      state.ChatList = action.payload;
    });
    builder.addCase(getChatList.rejected, (state) => {
      state.isChatlistLoading = false;
      state.isChatlistError = true;
    });
  },
});

export const { clearChatData } = chatSlice.actions;
export default chatSlice.reducer;

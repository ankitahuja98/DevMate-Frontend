import { createSlice } from "@reduxjs/toolkit";
import { chatDelete, getChat, getChatList } from "../actions/chatAction";
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
      const { data, totalMessages, page, size } = action.payload;

      if (!state.ChatData || page === 1) {
        // First load or reset
        state.ChatData = {
          data: data,
          totalMessages,
          page,
          size,
        };
      } else {
        // Prepend older messages
        state.ChatData = {
          ...state.ChatData,
          data: [...data, ...state.ChatData.data],
          page,
          totalMessages,
        };
      }

      state.isChatLoading = false;
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
      state.ChatList = action.payload.data;
    });
    builder.addCase(getChatList.rejected, (state) => {
      state.isChatlistLoading = false;
      state.isChatlistError = true;
    });
    builder.addCase(chatDelete.fulfilled, (state, action) => {
      const { targetUserId } = action.meta.arg;

      state.ChatList = state.ChatList.filter((val) => val._id !== targetUserId);

      state.ChatData = null;
    });
  },
});

export const { clearChatData } = chatSlice.actions;
export default chatSlice.reducer;

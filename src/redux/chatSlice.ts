import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { environment } from "../environment/environments";
import { ChatMessage, ChatState } from "../interfaces";

const initialState: ChatState = {
  messages: [],
  status: false,
  context: environment.INITIAL_CONTEXT,
};

export const slice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages(state, { payload }: { payload: ChatMessage }) {
      const newMessage: ChatMessage = {
        author: payload.author,
        createdAt: format(new Date(), "HH:mm"),
        id: uuidv4(),
        message: payload.message,
      };
      state.messages.push(newMessage);
    },
    setStatusResponse(state, { payload }: { payload: boolean }) {
      return { ...state, status: payload };
    },
    setContext(state, { payload }: { payload: string }) {
      return { ...state, context: payload };
    },
  },
});

export const { setMessages, setStatusResponse, setContext } = slice.actions;

export const selectChat = (state: any): ChatState => state.chat;

export default slice.reducer;

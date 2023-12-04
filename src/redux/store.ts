import { combineReducers, configureStore } from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import modalSlice from "./modalSlice";

const combinedReducer = combineReducers({
  modalModel: modalSlice,
  chat: chatSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "CLEAR") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});

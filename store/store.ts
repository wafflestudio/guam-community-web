import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import commentsReducer from "./commentsSlice";
import boardReducer from "./boardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    boardId: boardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

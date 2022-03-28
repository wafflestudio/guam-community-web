import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import commentsReducer from "./commentsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

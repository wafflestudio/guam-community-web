import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
// Inferred type: {user: UserState}
export type RootState = ReturnType<typeof store.getState>;

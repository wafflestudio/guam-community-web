import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../feature/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
// Inferred type: {user: UserState}
export type RootState = ReturnType<typeof store.getState>;

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import authReducer from "./authSlice";
import commentFormReducer from "./commentFormSlice";
import pairReducer from "./letterPairSlice";
import modalReducer from "./modalSlice";
import { postsApi } from "./postsApi";
import userReducer from "./userSlice";

export const store = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      modals: modalReducer,
      commentForm: commentFormReducer,
      pair: pairReducer,
      [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });

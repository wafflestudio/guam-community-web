import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { postsApi } from "../api/postsApi";

import authReducer from "./authSlice";
import commentFormReducer from "./commentFormSlice";
import modalReducer from "./modalSlice";
import userReducer from "./userSlice";

export const store = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      modals: modalReducer,
      commentForm: commentFormReducer,
      [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postsApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });

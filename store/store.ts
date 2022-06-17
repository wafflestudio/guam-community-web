import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { postDetailApi } from "../api/postDetailApi";
import { postsListApi } from "../api/postsListApi";

import authReducer from "./authSlice";
import commentFormReducer from "./commentFormSlice";
import modalReducer from "./modalSlice";

export const store = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      modals: modalReducer,
      commentForm: commentFormReducer,
      [postsListApi.reducerPath]: postsListApi.reducer,
      [postDetailApi.reducerPath]: postDetailApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        postsListApi.middleware,
        postDetailApi.middleware
      ),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });

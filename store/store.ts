import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import boardReducer from "./boardSlice";
import commentsReducer from "./commentsSlice";
import postDetailReducer from "./postDetailSlice";
import postsListReducer from "./postsListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    boardId: boardReducer,
    postsList: postsListReducer,
    postDetail: postDetailReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

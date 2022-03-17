import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import commentsReducer from "./commentsSlice";
import boardReducer from "./boardSlice";
import postsListReducer from "./postsListSlice";
import postDetailReducer from "./postDetailSlice";

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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPostsListPost } from "../types/types";

type IPostsListState = {
  posts: IPostsListPost[];
};

type IPostsListReducer = {
  setPosts: (
    state: IPostsListState,
    action: PayloadAction<IPostsListPost[]>
  ) => IPostsListState;
};

const initialState = {
  posts: [],
};

const postsListSlice = createSlice<IPostsListState, IPostsListReducer>({
  name: "comments",
  initialState,
  reducers: {
    setPosts: (_, action) => {
      return {
        posts: action.payload,
      };
    },
  },
});

export const { setPosts } = postsListSlice.actions;

export default postsListSlice.reducer;

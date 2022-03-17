import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDetailedPost } from "../types/types";

type IPostState = {
  post: IDetailedPost | undefined;
};

type IPostReducer = {
  setPost: (
    state: IPostState,
    action: PayloadAction<IDetailedPost | undefined>
  ) => IPostState;
};

const initialState = {
  post: undefined,
};

const postDetailSlice = createSlice<IPostState, IPostReducer>({
  name: "comments",
  initialState,
  reducers: {
    setPost: (_, action) => {
      return {
        post: action.payload,
      };
    },
  },
});

export const { setPost } = postDetailSlice.actions;

export default postDetailSlice.reducer;

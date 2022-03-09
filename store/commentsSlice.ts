import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../types/types";

type ICommentState = {
  comments: IComment[] | null;
};

type ICommentReducer = {
  setComments: (
    state: ICommentState,
    action: PayloadAction<IComment[] | null>
  ) => ICommentState;
};

const initialState = {
  comments: [],
};

const commentsSlice = createSlice<ICommentState, ICommentReducer>({
  name: "comments",
  initialState,
  reducers: {
    setComments: (_, action) => {
      return {
        comments: action.payload,
      };
    },
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;

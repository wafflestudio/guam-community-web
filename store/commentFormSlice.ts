import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RefObject } from "react";

import { IImageUrl } from "../types/types";

type ICommentFormState = {
  commentInput: string;
  mentionListOpen: boolean;
  images: File[];
  imageUrls: IImageUrl[];
};

const initialState: ICommentFormState = {
  commentInput: "",
  mentionListOpen: false,
  images: [],
  imageUrls: [],
};

const commentFormSlice = createSlice({
  name: "commentForm",
  initialState,
  reducers: {
    setCommentInput: (state, action: PayloadAction<string>) => {
      state.commentInput = action.payload;
    },
    setMentionListOpen: (state, action: PayloadAction<boolean>) => {
      state.mentionListOpen = action.payload;
    },
    setImages: (state, action: PayloadAction<File[]>) => {
      state.images = action.payload;
    },
    setImageUrls: (state, action: PayloadAction<IImageUrl[]>) => {
      state.imageUrls = action.payload;
    },
  },
});

export const { setCommentInput, setMentionListOpen, setImages, setImageUrls } =
  commentFormSlice.actions;

export default commentFormSlice.reducer;

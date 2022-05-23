import { createSlice } from "@reduxjs/toolkit";

import { IUser } from "../types/types";

const initialState: IUser = {
  id: null,
  introduction: null,
  githubId: null,
  blogUrl: null,
  nickname: null,
  email: null,
  profileImage: null,
  interests: [],
  profileSet: false,
};

const pairSlice = createSlice({
  name: "pair",
  initialState,
  reducers: {
    setPair: (_, action) => {
      return action.payload;
    },
    removePair: () => {
      return initialState;
    },
  },
});

export const { setPair, removePair } = pairSlice.actions;

export default pairSlice.reducer;

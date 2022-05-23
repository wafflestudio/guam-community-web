import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../types/types";

type UserReducerType = {
  setUserState: (state: IUser, action: PayloadAction<IUser>) => IUser;
  removeUserState: () => IUser;
};

const initialState = {
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

const userSlice = createSlice<IUser, UserReducerType>({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeUserState: () => {
      return initialState;
    },
  },
});

export const { setUserState, removeUserState } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

type authState = {
  isLoggedIn: undefined | boolean;
};

const initialState: authState = {
  isLoggedIn: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: () => {
      return { isLoggedIn: true };
    },
    signOut: () => {
      return { isLoggedIn: false };
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;

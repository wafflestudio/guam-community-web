import { createSlice } from "@reduxjs/toolkit";

type authState = {
  isLoggedIn: null | boolean;
};

const initialState: authState = {
  isLoggedIn: null,
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

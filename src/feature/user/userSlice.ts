import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "Guest",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.name = action.payload;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;

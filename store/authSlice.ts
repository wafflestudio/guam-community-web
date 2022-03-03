import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type IAuthState = {
  token: string | null | undefined;
  isLoggedIn: boolean;
};

type IAuthReducer = {
  setToken: (state: IAuthState, action: PayloadAction<string>) => IAuthState;
  removeToken: () => IAuthState;
};

const initialState = {
  token: undefined,
  isLoggedIn: false,
};

const authSlice = createSlice<IAuthState, IAuthReducer>({
  name: "user",
  initialState,
  reducers: {
    setToken: (_, action) => {
      const token = action.payload;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return {
        token,
        isLoggedIn: true,
      };
    },
    removeToken: () => {
      delete axios.defaults.headers.common["Authorization"];
      return {
        token: null,
        isLoggedIn: false,
      };
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type AuthStateType = {
  token: string | null | number;
  isLoggedIn: boolean;
};

type AuthReducerType = {
  setToken: (
    state: AuthStateType,
    action: PayloadAction<string>
  ) => AuthStateType;
  removeToken: (state: AuthStateType) => AuthStateType;
};

const initialState = {
  token: 0,
  isLoggedIn: false,
};

const authSlice = createSlice<AuthStateType, AuthReducerType>({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return {
        ...state,
        token,
        isLoggedIn: true,
      };
    },
    removeToken: (state) => {
      delete axios.defaults.headers.common["Authorization"];
      return {
        ...state,
        token: null,
        isLoggedIn: false,
      };
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;

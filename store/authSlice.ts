import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IAuthState = {
  token: string | null | number;
  isLoggedIn: boolean;
};

type IAuthReducer = {
  setToken: (state: IAuthState, action: PayloadAction<string>) => IAuthState;
  removeToken: () => IAuthState;
};

const initialState = {
  token: 0,
  isLoggedIn: false,
};

const authSlice = createSlice<IAuthState, IAuthReducer>({
  name: "user",
  initialState,
  reducers: {
    setToken: (_, action) => {
      const token = action.payload;
      return {
        token,
        isLoggedIn: true,
      };
    },
    removeToken: () => {
      return {
        token: null,
        isLoggedIn: false,
      };
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;

export default authSlice.reducer;

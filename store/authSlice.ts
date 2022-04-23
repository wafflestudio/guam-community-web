import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IAuthState = {
  token: string | null | number;
  kakao_token: string | null | undefined;
  isLoggedIn: boolean;
};

type IAuthReducer = {
  setToken: (state: IAuthState, action: PayloadAction<string>) => IAuthState;
  removeToken: (state: IAuthState) => IAuthState;
  setKakaoToken: (
    state: IAuthState,
    action: PayloadAction<string>
  ) => IAuthState;
  removeKakaoToken: (state: IAuthState) => IAuthState;
};

const initialState = {
  token: 0,
  kakao_token: null,
  isLoggedIn: false,
};

const authSlice = createSlice<IAuthState, IAuthReducer>({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      return {
        ...state,
        token,
        isLoggedIn: true,
      };
    },
    removeToken: (state) => {
      return {
        ...state,
        token: null,
        isLoggedIn: false,
      };
    },
    setKakaoToken: (state, action) => {
      return {
        ...state,
        kakao_token: action.payload,
        isLoggedIn: true,
      };
    },
    removeKakaoToken: (state) => {
      return {
        ...state,
        kakao_token: null,
        isLoggedIn: false,
      };
    },
  },
});

export const { setToken, removeToken, setKakaoToken, removeKakaoToken } =
  authSlice.actions;

export default authSlice.reducer;

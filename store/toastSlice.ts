import { createSlice } from "@reduxjs/toolkit";

type toastState = {
  open: boolean;
  text: string;
};

const initialState: toastState = {
  open: false,
  text: "",
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (_, action) => {
      return { open: true, text: action.payload };
    },
    resetToast: () => {
      return initialState;
    },
  },
});

export const { setToast, resetToast } = toastSlice.actions;

export default toastSlice.reducer;

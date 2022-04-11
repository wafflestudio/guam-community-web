import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IPageState = {
  page: number;
};

type IPageReducer = {
  setPage: (state: IPageState, action: PayloadAction<number>) => IPageState;
};

const initialState = {
  page: 0,
};

const pageSlice = createSlice<IPageState, IPageReducer>({
  name: "page",
  initialState,
  reducers: {
    setPage: (_, action) => {
      return {
        page: action.payload,
      };
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice.reducer;

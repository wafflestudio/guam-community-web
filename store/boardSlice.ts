import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IBoardState = {
  id: number;
};

type IBoardReducer = {
  setBoardId: (
    state: IBoardState,
    action: PayloadAction<number>
  ) => IBoardState;
};

const initialState = {
  id: 0,
};

const boardSlice = createSlice<IBoardState, IBoardReducer>({
  name: "boardId",
  initialState,
  reducers: {
    setBoardId: (_, action) => {
      return {
        id: action.payload,
      };
    },
  },
});

export const { setBoardId } = boardSlice.actions;

export default boardSlice.reducer;

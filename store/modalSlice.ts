import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IModalState = {
  postModalOpen: boolean;
};

type IModalReducer = {
  setPostModalOpen: (
    state: IModalState,
    action: PayloadAction<boolean>
  ) => IModalState;
};

const initialState = {
  postModalOpen: false,
};

const modalSlice = createSlice<IModalState, IModalReducer>({
  name: "modals",
  initialState,
  reducers: {
    setPostModalOpen: (_, action) => {
      return {
        postModalOpen: action.payload,
      };
    },
  },
});

export const { setPostModalOpen } = modalSlice.actions;

export default modalSlice.reducer;

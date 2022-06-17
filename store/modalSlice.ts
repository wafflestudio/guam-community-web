import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalStateType = {
  postModalOpen: boolean;
};

type ModalReducerType = {
  setPostModalOpen: (
    state: ModalStateType,
    action: PayloadAction<boolean>
  ) => ModalStateType;
};

const initialState = {
  postModalOpen: false,
};

const modalSlice = createSlice<ModalStateType, ModalReducerType>({
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

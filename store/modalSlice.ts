import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalStateType = {
  postModalOpen: boolean;
  postModifyModalOpen: boolean;
  deleteConfirmModalOpen: boolean;
};

type ModalReducerType = {
  setPostModalOpen: (
    state: ModalStateType,
    action: PayloadAction<boolean>
  ) => ModalStateType;
  setPostModifyModalOpen: (
    state: ModalStateType,
    action: PayloadAction<boolean>
  ) => ModalStateType;
  setDeleteConfirmModalOpen: (
    state: ModalStateType,
    action: PayloadAction<boolean>
  ) => ModalStateType;
};

const initialState = {
  postModalOpen: false,
  postModifyModalOpen: false,
  deleteConfirmModalOpen: false,
};

const modalSlice = createSlice<ModalStateType, ModalReducerType>({
  name: "modals",
  initialState,
  reducers: {
    setPostModalOpen: (state, action) => {
      return {
        ...state,
        postModalOpen: action.payload,
      };
    },
    setPostModifyModalOpen: (state, action) => {
      return {
        ...state,
        postModifyModalOpen: action.payload,
      };
    },
    setDeleteConfirmModalOpen: (state, action) => {
      return {
        ...state,
        deleteConfirmModalOpen: action.payload,
      };
    },
  },
});

export const {
  setPostModalOpen,
  setPostModifyModalOpen,
  setDeleteConfirmModalOpen,
} = modalSlice.actions;

export default modalSlice.reducer;

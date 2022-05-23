import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "../types/types";

type postFormModalType = {
  open: boolean;
  expanded: boolean;
};

type userModalType = {
  open: boolean;
  user: IUser | null;
};

type ModalStateType = {
  postFormModal: postFormModalType;
  postModifyModalOpen: boolean;
  deleteConfirmModalOpen: boolean;
  userReportModal: userModalType;
  userBlockModal: userModalType;
};

type ModalReducerType = {
  setPostFormModal: (
    state: ModalStateType,
    action: PayloadAction<postFormModalType>
  ) => ModalStateType;
  setPostModifyModalOpen: (
    state: ModalStateType,
    action: PayloadAction<boolean>
  ) => ModalStateType;
  setDeleteConfirmModalOpen: (
    state: ModalStateType,
    action: PayloadAction<boolean>
  ) => ModalStateType;
  setUserReportModal: (
    state: ModalStateType,
    action: PayloadAction<userModalType>
  ) => ModalStateType;
  setUserBlockModal: (
    state: ModalStateType,
    action: PayloadAction<userModalType>
  ) => ModalStateType;
};

const initialState = {
  postFormModal: {
    open: false,
    expanded: false,
  },
  postModifyModalOpen: false,
  deleteConfirmModalOpen: false,
  userReportModal: {
    open: false,
    user: null,
  },
  userBlockModal: {
    open: false,
    user: null,
  },
};

const modalSlice = createSlice<ModalStateType, ModalReducerType>({
  name: "modals",
  initialState,
  reducers: {
    setPostFormModal: (state, action) => {
      return {
        ...state,
        postFormModal: action.payload,
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
    setUserReportModal: (state, action) => {
      return {
        ...state,
        userReportModal: action.payload,
      };
    },
    setUserBlockModal: (state, action) => {
      return {
        ...state,
        userBlockModal: action.payload,
      };
    },
  },
});

export const {
  setPostFormModal,
  setPostModifyModalOpen,
  setDeleteConfirmModalOpen,
  setUserReportModal,
  setUserBlockModal,
} = modalSlice.actions;

export default modalSlice.reducer;

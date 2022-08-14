import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IDetailedPost, IUser } from "../types/types";

type postFormModalType = {
  open: boolean;
  expanded: boolean;
  post?: IDetailedPost | null;
};

type userModalType = {
  open: boolean;
  user: IUser | null | undefined;
};

type imageExtendedModalType = {
  open: boolean;
  paths: string[];
};

type ModalStateType = {
  postFormModal: postFormModalType;
  postModifyModalOpen: boolean;
  deleteConfirmModalOpen: boolean;
  userReportModal: userModalType;
  userBlockModal: userModalType;
  imageExtendedModal: imageExtendedModalType;
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
  setImageExtendedModal: (
    state: ModalStateType,
    action: PayloadAction<imageExtendedModalType>
  ) => ModalStateType;
};

const initialState = {
  postFormModal: {
    open: false,
    expanded: false,
    post: null,
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
  imageExtendedModal: {
    open: false,
    paths: [],
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
    setImageExtendedModal: (state, action) => {
      return {
        ...state,
        imageExtendedModal: action.payload,
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
  setImageExtendedModal,
} = modalSlice.actions;

export default modalSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IDetailedPost, IUser } from "../types/types";

export enum ModalType {
  POST_FORM,
  IMAGE,
  DELETE_CONFIRM,
  USER_BLOCK,
  USER_REPORT,
}

type postFormModalType = {
  expanded: boolean;
  post?: IDetailedPost | null;
};

type deleteConfirmModalType = {
  id: number | null;
  type: string;
};

type userModalType = {
  user: IUser | null | undefined;
};

type imageExtendedModalType = {
  paths: string[];
};

type ModalStateType = {
  open: number | null;
  postFormModal: postFormModalType;
  deleteConfirmModal: deleteConfirmModalType;
  userReportModal: userModalType;
  userBlockModal: userModalType;
  imageExtendedModal: imageExtendedModalType;
};

type ModalReducerType = {
  setPostFormModal: (
    state: ModalStateType,
    action: PayloadAction<postFormModalType>
  ) => ModalStateType;
  setDeleteConfirmModal: (
    state: ModalStateType,
    action: PayloadAction<deleteConfirmModalType>
  ) => ModalStateType;
  setImageExtendedModal: (
    state: ModalStateType,
    action: PayloadAction<imageExtendedModalType>
  ) => ModalStateType;
  setUserBlockModal: (
    state: ModalStateType,
    action: PayloadAction<userModalType>
  ) => ModalStateType;
  setUserReportModal: (
    state: ModalStateType,
    action: PayloadAction<userModalType>
  ) => ModalStateType;
  resetModals: () => ModalStateType;
};

const initialState = {
  open: null,
  postFormModal: {
    open: false,
    expanded: false,
    post: null,
  },
  deleteConfirmModal: { id: null, type: "" },
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
    setPostFormModal: (_, action) => {
      return {
        ...initialState,
        open: ModalType.POST_FORM,
        postFormModal: action.payload,
      };
    },
    setDeleteConfirmModal: (_, action) => {
      return {
        ...initialState,
        open: ModalType.DELETE_CONFIRM,
        deleteConfirmModal: action.payload,
      };
    },
    setImageExtendedModal: (_, action) => {
      return {
        ...initialState,
        open: ModalType.IMAGE,
        imageExtendedModal: action.payload,
      };
    },
    setUserBlockModal: (_, action) => {
      return {
        ...initialState,
        open: ModalType.USER_BLOCK,
        userBlockModal: action.payload,
      };
    },
    setUserReportModal: (_, action) => {
      return {
        ...initialState,
        open: ModalType.USER_REPORT,
        userReportModal: action.payload,
      };
    },
    resetModals: () => initialState,
  },
});

export const {
  setPostFormModal,
  setDeleteConfirmModal,
  setImageExtendedModal,
  setUserReportModal,
  setUserBlockModal,
  resetModals,
} = modalSlice.actions;

export default modalSlice.reducer;

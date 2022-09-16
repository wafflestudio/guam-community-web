import React from "react";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { ModalType, resetModals } from "store/modalSlice";

import DeleteConfirmModal from "./DeleteConfirmModal/DeleteConfirmModal";
import ImageExtendModal from "./ImageExtendModal/ImageExtendModal";
import ModalPortal from "./ModalPortal";
import PostFormModal from "./PostFormModal/PostFormModal";
import UserBlockModal from "./UserBlockModal/UserBlockModal";
import UserReportModal from "./UserReportModal/UserReportModal";

const Modal = () => {
  const { open } = useAppSelector((state) => state.modals);

  const dispatch = useAppDispatch();
  const closeModal = () => dispatch(resetModals());

  const ModalComponent =
    open === ModalType.POST_FORM ? (
      <PostFormModal closeModal={closeModal} />
    ) : open === ModalType.IMAGE ? (
      <ImageExtendModal closeModal={closeModal} />
    ) : open === ModalType.DELETE_CONFIRM ? (
      <DeleteConfirmModal closeModal={closeModal} />
    ) : open === ModalType.USER_BLOCK ? (
      <UserBlockModal closeModal={closeModal} />
    ) : open === ModalType.USER_REPORT ? (
      <UserReportModal closeModal={closeModal} />
    ) : (
      <></>
    );

  return <ModalPortal>{ModalComponent}</ModalPortal>;
};

export default Modal;

import React from "react";

import CancelIcon from "assets/icons/cancel/outlined.svg";
import ExpandIcon from "assets/icons/expand.svg";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setPostFormModal } from "store/modalSlice";

import SubmitForm from "./SubmitForm";

import styles from "./PostFormModal.module.scss";

export default function PostFormModal({
  closeModal,
}: {
  closeModal: () => {
    payload: undefined;
    type: string;
  };
}) {
  const { expanded } = useAppSelector((state) => state.modals.postFormModal);

  const dispatch = useAppDispatch();

  const expandModal = () => dispatch(setPostFormModal({ expanded: true }));

  return (
    <div
      className={`${!expanded && `${"modal-wrapper"} ${styles.wrapper}`} ${
        expanded && `${styles.expanded} ${styles.wrapper}`
      }`}
      onClick={() => {
        if (!expanded) closeModal();
      }}
    >
      <main
        className={`${styles.container} ${"modal-container"} ${
          expanded && styles.expanded
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1
          className={`${styles["typo6-regular"]} ${styles.title} ${
            expanded && styles.expanded
          }`}
        >
          글쓰기
        </h1>
        {expanded ? null : (
          <button className={styles.expand} onClick={expandModal}>
            <ExpandIcon />
          </button>
        )}
        <button
          className={expanded ? styles.cancelExpanded : styles.cancel}
          onClick={closeModal}
        >
          {expanded ? (
            <span className={styles["typo5-regular"]}>취소</span>
          ) : (
            <CancelIcon />
          )}
        </button>
        <SubmitForm closeModal={closeModal} />
        <hr className={`${styles.title} ${expanded && styles.expanded}`} />
        <hr className={`${styles.contentTop} ${expanded && styles.expanded}`} />
        <hr
          className={`${styles.contentBottom} ${expanded && styles.expanded}`}
        />
        <hr
          className={`${styles.categoryPhoto} ${expanded && styles.expanded}`}
        />
        <hr className={`${styles.bottom} ${expanded && styles.expanded}`} />
      </main>
    </div>
  );
}

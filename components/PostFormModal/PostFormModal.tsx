import React, { useCallback } from "react";

import CancelIcon from "../../assets/icons/cancel/outlined.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPostModalOpen } from "../../store/modalSlice";

import SubmitForm from "./SubmitForm";

import styles from "./PostFormModal.module.scss";

export default function PostFormModal() {
  const { postModalOpen } = useAppSelector((state) => state.modals);

  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => dispatch(setPostModalOpen(false)), []);

  return (
    <div
      className={`${styles.wrapper} ${
        postModalOpen ? styles.open : styles.close
      }`}
      onClick={closeModal}
    >
      <main className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h1 className={`${styles["typo6-regular"]} ${styles.title}`}>글쓰기</h1>
        <button className={styles.cancel} onClick={closeModal}>
          <CancelIcon />
        </button>
        <SubmitForm />
        <hr className={styles.title} />
        <hr className={styles.contentTop} />
        <hr className={styles.contentBottom} />
        <hr className={styles.categoryPhoto} />
        <hr className={styles.bottom} />
      </main>
    </div>
  );
}

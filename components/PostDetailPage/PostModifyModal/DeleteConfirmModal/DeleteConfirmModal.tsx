import { useRouter } from "next/router";
import React, { SetStateAction } from "react";

import { useDeletePostMutation } from "../../../../api/postsApi";

import styles from "./DeleteConfirmModal.module.scss";

export default function DeleteConfirmModal({
  type,
  id,
  deleteConfirmModal,
  setDeleteConfirmModal,
}: {
  type: string;
  id: number;
  deleteConfirmModal: boolean;
  setDeleteConfirmModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const [deletePost] = useDeletePostMutation();

  const closeModal = () => setDeleteConfirmModal(false);

  const onDeletePost = () => {
    deletePost(id);
    router.push("/");
    closeModal();
  };

  return (
    <div
      className={`${styles.wrapper} ${
        deleteConfirmModal ? styles.open : styles.close
      }`}
      onClick={closeModal}
    >
      <main className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h1 className={`${styles["typo6-medium"]} ${styles.title}`}>
          {type}을 삭제하시겠어요?
        </h1>
        <button
          className={`${styles["typo5-regular"]} ${styles.cancel}`}
          onClick={closeModal}
        >
          취소
        </button>
        <div className={`${styles["typo4-regular"]} ${styles.info}`}>
          {type}을 삭제하면 다시 되돌릴 수 없습니다.
        </div>
        <button
          className={`${styles["typo5-medium"]} ${styles.delete}`}
          onClick={onDeletePost}
        >
          삭제하기
        </button>
        <hr className={styles.title} />
      </main>
    </div>
  );
}

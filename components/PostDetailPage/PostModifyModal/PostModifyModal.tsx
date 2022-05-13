import React, { SetStateAction } from "react";

import styles from "./PostModifyModal.module.scss";

export default function PostModifyModal({
  setDeleteConfirmModal,
}: {
  setDeleteConfirmModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const onDeletePost = () => setDeleteConfirmModal(true);

  return (
    <div className={styles.container}>
      <button className={`${styles["typo5-regular"]} ${styles.modify}`}>
        수정하기
      </button>
      <button
        className={`${styles["typo5-regular"]} ${styles.delete}`}
        onClick={onDeletePost}
      >
        삭제하기
      </button>
    </div>
  );
}

import { useRouter } from "next/router";
import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useDeletePostMutation } from "../../../../store/postsApi";
import { setToast } from "../../../../store/toastSlice";

import styles from "./DeleteConfirmModal.module.scss";

export default function DeleteConfirmModal({
  closeModal,
}: {
  closeModal: () => {
    payload: undefined;
    type: string;
  };
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { type, id } = useAppSelector(
    (state) => state.modals.deleteConfirmModal
  );
  console.log(id);

  const [deletePost] = useDeletePostMutation();

  const onDeletePost = () => {
    try {
      deletePost(id);
      router.push("/");
      closeModal();
    } catch (e) {
      console.log(e);
      dispatch(setToast("게시글 삭제 실패"));
    }
  };

  return (
    <div className={"modal-wrapper"} onClick={closeModal}>
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

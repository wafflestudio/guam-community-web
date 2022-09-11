import React, { SetStateAction, useRef } from "react";

import { useAppDispatch } from "store/hooks";
import { setDeleteConfirmModal, setPostFormModal } from "store/modalSlice";
import styles from "styles/PostDetailPage.module.scss";
import { IDetailedPost } from "types/types";
import { useModalRef } from "utils/useModalRef";

export default function PostModifyModal({
  post,
  setModal,
}: {
  post: IDetailedPost;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  useModalRef(modalRef, setModal);

  const dispatch = useAppDispatch();

  const onPatchPost = () => {
    dispatch(setPostFormModal({ expanded: false, post }));
  };
  const onDeletePost = () =>
    dispatch(setDeleteConfirmModal({ id: post.id, type: "게시글" }));

  return (
    <div ref={modalRef} className={styles.postModify}>
      <button
        className={`${styles["typo5-regular"]} ${styles.modify}`}
        onClick={onPatchPost}
      >
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

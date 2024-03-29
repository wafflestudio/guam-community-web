import React, { Dispatch, SetStateAction, useRef } from "react";

import { useDeleteCommentMutation } from "store/postsApi";
import styles from "styles/CommentsList.module.scss";
import { useModalRef } from "utils/useModalRef";

const ModifyCommentModal = ({
  setMoreOpen,
  postId,
  commentId,
}: {
  setMoreOpen: Dispatch<SetStateAction<boolean>>;
  postId: number;
  commentId: number;
}) => {
  const modalRef = useRef(null);
  useModalRef(modalRef, setMoreOpen);

  const [deleteComment] = useDeleteCommentMutation();

  return (
    <div className={styles.moreModal} ref={modalRef}>
      <ul>
        <li>
          <button>수정하기</button>
        </li>
        <li>
          <button onClick={() => deleteComment({ postId, commentId })}>
            삭제하기
          </button>
          {/* TODO: 삭제 confirm 모달 */}
        </li>
      </ul>
    </div>
  );
};

export default ModifyCommentModal;

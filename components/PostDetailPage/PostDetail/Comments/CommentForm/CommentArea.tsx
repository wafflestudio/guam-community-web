import React, { RefObject } from "react";

import {
  setCommentInput,
  setMentionListOpen,
} from "../../../../../store/commentFormSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

import styles from "./CommentForm.module.scss";

const CommentArea = ({
  textareaRef,
  mockTextareaRef,
}: {
  textareaRef: RefObject<HTMLTextAreaElement>;
  mockTextareaRef: RefObject<HTMLDivElement>;
}) => {
  const { commentInput } = useAppSelector((state) => state.commentForm);
  const dispatch = useAppDispatch();

  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    dispatch(setCommentInput(target.value));
  };

  const onMention: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "@") {
      dispatch(setMentionListOpen(true));
    } else {
      dispatch(setMentionListOpen(false));
    }
  };

  return (
    <div className={styles.commentContainer}>
      <textarea
        id="comment"
        name="comment"
        value={commentInput}
        onChange={onCommentChange}
        onKeyDown={onMention}
        className={`${styles["typo4-regular"]} ${styles.commentInput}`}
        maxLength={1023}
        ref={textareaRef}
      />
      <div
        className={`${styles["typo4-regular"]} ${styles.mockTextarea}`}
        ref={mockTextareaRef}
      />
    </div>
  );
};

export default React.memo(CommentArea);

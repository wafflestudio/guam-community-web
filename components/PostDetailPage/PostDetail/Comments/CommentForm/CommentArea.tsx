import React, { Dispatch, RefObject, SetStateAction, useCallback } from "react";

import styles from "./CommentForm.module.scss";

const CommentArea = ({
  commentInput,
  setCommentInput,
  setMentionListOpen,
  textareaRef,
  mockTextareaRef,
}: {
  commentInput: string;
  setCommentInput: Dispatch<SetStateAction<string>>;
  setMentionListOpen: Dispatch<SetStateAction<boolean>>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  mockTextareaRef: RefObject<HTMLDivElement>;
}) => {
  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(({ target }) => {
      setCommentInput(target.value);
    }, []);

  const onMention: React.KeyboardEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      if (e.key === "@") {
        setMentionListOpen(true);
      } else {
        setMentionListOpen(false);
      }
    }, []);

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

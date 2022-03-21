import { Dispatch, RefObject, SetStateAction } from "react";

import styles from "./CommentForm.module.scss";

export default function CommentArea({
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
}) {
  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    const comment = target.value.replace(/[\r\n\v]+/g, "");
    setCommentInput(comment);
  };

  const onMention: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "@") {
      setMentionListOpen(true);
    } else {
      setMentionListOpen(false);
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
        className={`${styles["typo4-regular"]} ${styles.commentInput} ${
          commentInput === "" && styles.showPlaceholder
        }`}
        placeholder={"댓글을 남겨 주세요."}
        ref={textareaRef}
      />
      <div
        className={`${styles["typo4-regular"]} ${styles.mockTextarea}`}
        ref={mockTextareaRef}
      />
    </div>
  );
}

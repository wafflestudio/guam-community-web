import { Dispatch, RefObject, useRef } from "react";

import { IUser } from "../../../../../types/types";
import { mentionRegex } from "../../../../../utils/mentionRegex";

import styles from "./CommentForm.module.scss";

export default function MentionList({
  mentionList,
  commentInput,
  setCommentInput,
  setMentionListOpen,
  textareaRef,
  mockTextareaRef,
}: {
  mentionList: IUser[];
  commentInput: string;
  setCommentInput: Dispatch<React.SetStateAction<string>>;
  setMentionListOpen: Dispatch<React.SetStateAction<boolean>>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  mockTextareaRef: RefObject<HTMLDivElement>;
}) {
  const mentionListRef = useRef<HTMLDivElement>(null);

  const onSelectId = (id: number) => {
    const selectedUser = mentionList?.find((user) => user.id === id)?.nickname;

    const position = textareaRef.current?.selectionStart;

    const content =
      commentInput.slice(0, position) +
      `${selectedUser} ` +
      commentInput.slice(position);

    selectedUser && setCommentInput(content);

    const regex = mentionRegex(mentionList?.map((user) => user.nickname) || []);

    const { current } = mockTextareaRef;

    if (current) {
      current.innerHTML = content.replace(
        regex,
        '<span class="mentions">$1</span>'
      );
    }

    setMentionListOpen(false);

    textareaRef.current?.focus();
  };

  const list = mentionList?.map((user) => (
    <li
      key={user.id}
      className={styles.userList}
      onClick={() => onSelectId(user.id)}
    >
      <div className={styles.profileImage}>
        <img
          src={
            user.profileImage
              ? process.env.BUCKET_URL + user.profileImage
              : "/default profile image.png"
          }
        />
      </div>
      <span className={`${styles["typo3-regular"]} ${styles.nickname}`}>
        @{user.nickname}
      </span>
    </li>
  ));

  return (
    <div
      ref={mentionListRef}
      className={`${styles.mentionContainer} ${styles.null}`}
      style={{ top: `-${mentionListRef.current?.clientHeight}px` }}
    >
      <ul>{list}</ul>
    </div>
  );
}

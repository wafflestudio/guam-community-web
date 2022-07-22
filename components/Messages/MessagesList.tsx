import { RefObject } from "react";

import { useGetPairLettersQuery } from "../../api/postsApi";
import { useAppSelector } from "../../store/hooks";
import { relativeDate } from "../../utils/formatDate";

import styles from "./Messages.module.scss";

export default function MessagesList({
  messageListRef,
}: {
  messageListRef: RefObject<HTMLUListElement>;
}) {
  const { pair, user } = useAppSelector((state) => state);

  const { data } = useGetPairLettersQuery(pair.id || 0, {
    skip: pair.id === (undefined || null),
  });

  return (
    <ul className={styles.messagesList} ref={messageListRef}>
      {data?.letters.map((letter) => {
        return (
          <li key={letter.id}>
            <div className={styles.writerName}>
              {letter.sentBy === user.id ? (
                <span className={`${styles["typo3-regular"]} ${styles.mine}`}>
                  {user.nickname}(나)
                </span>
              ) : (
                <span className={`${styles["typo4-regular"]}`}>
                  {pair.nickname}
                </span>
              )}
              <div className={`${styles["typo2-regular"]} ${styles.fromNow}`}>
                {relativeDate(letter.createdAt)}
              </div>
            </div>
            <div className={`${styles["typo3-regular"]} ${styles.content}`}>
              {letter.text}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

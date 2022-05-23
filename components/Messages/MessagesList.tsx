import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { RefObject } from "react";

import { useGetPairLettersQuery } from "../../api/postsApi";
import { useAppSelector } from "../../store/hooks";

import styles from "./Messages.module.scss";

dayjs.extend(relativeTime);

export default function MessagesList({
  messageListRef,
}: {
  messageListRef: RefObject<HTMLUListElement>;
}) {
  const { pair, user } = useAppSelector((state) => state);

  const { isLoading, error, data } = useGetPairLettersQuery(pair.id || 0, {
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
                {dayjs(letter.createdAt).locale(ko).fromNow()}
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

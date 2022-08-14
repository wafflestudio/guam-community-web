import { RefObject } from "react";

import { useAppSelector } from "../../store/hooks";
import { useGetPairLettersQuery, useGetUserQuery } from "../../store/postsApi";
import { relativeDate } from "../../utils/formatDate";
import { useLogin } from "../../utils/useLogin";
import useRouterInfo from "../../utils/useRouterInfo";

import styles from "./Messages.module.scss";

export default function MessagesList({
  messageListRef,
}: {
  messageListRef: RefObject<HTMLUListElement>;
}) {
  const isLoggedIn = useLogin();
  const { pairId } = useRouterInfo();
  const { user } = useAppSelector((state) => state);

  const { data: pairLetters } = useGetPairLettersQuery(pairId!, {
    skip: !pairId || !isLoggedIn,
  });
  const { data: pair } = useGetUserQuery(pairId, { skip: !pairId });

  return (
    <ul className={styles.messagesList} ref={messageListRef}>
      {pairLetters?.letters.map((letter) => {
        return (
          <li key={letter.id}>
            <div className={styles.writerName}>
              {letter.sentBy === user.id ? (
                <span className={`${styles["typo3-regular"]} ${styles.mine}`}>
                  {user.nickname}(나)
                </span>
              ) : (
                <span className={`${styles["typo4-regular"]}`}>
                  {pair?.nickname}
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

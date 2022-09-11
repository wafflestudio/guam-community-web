import { RefObject } from "react";

import { useAppSelector } from "store/hooks";
import { useGetLettersQuery, useGetPairLettersQuery } from "store/postsApi";
import styles from "styles/Messages.module.scss";
import { relativeDate } from "utils/formatDate";
import useRouterInfo from "utils/useRouterInfo";

const MessagesList = ({
  messageListRef,
}: {
  messageListRef: RefObject<HTMLUListElement>;
}) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { pairId } = useRouterInfo();
  const { user } = useAppSelector((state) => state);

  const { data: pairLetters } = useGetPairLettersQuery(pairId!, {
    skip: !pairId || !isLoggedIn,
  });
  const pair = useGetLettersQuery(undefined, {
    skip: !pairId || !isLoggedIn,
  }).data?.letterBoxes.find((box) => box.pair.id === pairId)?.pair;

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
};

export default MessagesList;

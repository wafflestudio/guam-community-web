import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRef } from "react";

import { useGetPairLettersQuery } from "../../api/postsApi";
import EmptyIcon from "../../assets/icons/empty.svg";
import MoreIcon from "../../assets/icons/more.svg";
import { useAppSelector } from "../../store/hooks";

import MessageForm from "./MessageForm";

import styles from "./Messages.module.scss";

dayjs.extend(relativeTime);

export default function MessagesBox() {
  const { pair, user } = useAppSelector((state) => state);

  const messageListRef = useRef<HTMLUListElement>(null);

  const { isLoading, error, data } = useGetPairLettersQuery(user.id || 0, {
    skip: pair.id === (undefined || null),
  });

  return (
    <div className={styles.mainContainer}>
      {pair.id === (undefined || null) ? (
        <div className={styles.emptyImg}>
          <EmptyIcon />
        </div>
      ) : (
        <>
          <div className={styles.pairProfile}>
            <img
              src={
                pair.profileImage
                  ? process.env.BUCKET_URL + pair.profileImage
                  : "/default_profile_image.png"
              }
            />
            <div className={`${styles["typo6-medium"]} ${styles.nickname}`}>
              {pair.nickname}
            </div>
            <Link href={`/profile/${pair.id}`}>
              <div className={styles.profileLink}>프로필 보기</div>
            </Link>
            <div>
              <MoreIcon />
            </div>
          </div>
          <ul className={styles.messagesList} ref={messageListRef}>
            {data?.letters.map((letter) => {
              return (
                <li key={letter.id}>
                  <div className={styles.writerName}>
                    {letter.sentBy === user.id ? (
                      <span
                        className={`${styles["typo3-regular"]} ${styles.mine}`}
                      >
                        {user.nickname}(나)
                      </span>
                    ) : (
                      <span className={`${styles["typo4-regular"]}`}>
                        {pair.nickname}
                      </span>
                    )}
                    <div
                      className={`${styles["typo2-regular"]} ${styles.fromNow}`}
                    >
                      {dayjs(letter.createdAt).locale(ko).fromNow()}
                    </div>
                  </div>
                  <div
                    className={`${styles["typo3-regular"]} ${styles.content}`}
                  >
                    {letter.text}
                  </div>
                </li>
              );
            })}
          </ul>
          <MessageForm messageListRef={messageListRef} />
        </>
      )}
    </div>
  );
}

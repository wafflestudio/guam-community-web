import { useRouter } from "next/router";

import NewIcon from "assets/icons/new.svg";
import { useAppSelector } from "store/hooks";
import { useGetLettersQuery } from "store/postsApi";
import styles from "styles/Messages.module.scss";
import { relativeDate } from "utils/formatDate";
import useRouterInfo from "utils/useRouterInfo";

import Profile from "../../Profile";

export default function MessagesSide() {
  const router = useRouter();

  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { pairId } = useRouterInfo();

  const { data: letters } = useGetLettersQuery(undefined, {
    skip: !isLoggedIn,
  });

  return (
    <div className={styles.sideContainer}>
      <Profile />
      <div className={styles.titleBox}>
        <div className={`${styles["typo5-medium"]} ${styles.title}`}>
          쪽지함
        </div>
      </div>
      <div className={styles.messageBoxList}>
        <ul>
          {letters?.letterBoxes.length !== 0 ? (
            letters?.letterBoxes.map((box) => {
              return (
                <li
                  key={box.pair.id}
                  className={`${styles.messageBox} ${
                    box.pair.id === pairId && styles.selected
                  }`}
                  onClick={() => router.push(`/letters/${box.pair.id}`)}
                >
                  <div className={styles.imageWrapper}>
                    {box.lastLetter.isRead ? null : <NewIcon />}
                    <div className={styles.imageInnerWrapper}>
                      <img
                        src={
                          box.pair.profileImage
                            ? process.env.BUCKET_URL + box.pair.profileImage
                            : "/default_profile_image.png"
                        }
                        alt={`${box.pair.nickname}의 프로필 이미지`}
                      />
                    </div>
                  </div>
                  <div
                    className={`${styles["typo4-medium"]} ${styles.pairName}`}
                  >
                    {box.pair.nickname}
                  </div>
                  <div
                    className={`${styles["typo3-regular"]} ${styles.fromNow}`}
                  >
                    {relativeDate(box.lastLetter?.createdAt)}
                  </div>
                  <div
                    className={`${styles["typo3-regular"]} ${styles.preview}`}
                  >
                    {box.lastLetter?.text}
                  </div>
                </li>
              );
            })
          ) : (
            <div className={`${styles["typo4-regular"]} ${styles.noMessage}`}>
              쪽지함이 비어있어요.
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

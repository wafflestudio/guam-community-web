import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";

import { postsApi } from "../../api/postsApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPair } from "../../store/letterPairSlice";
import { ILetters, IUser } from "../../types/types";
import Profile from "../PostPageSide/Profile";

import styles from "./Messages.module.scss";

dayjs.extend(relativeTime);

export default function MessagesSide() {
  const pair = useAppSelector((state) => state.pair);

  const letters: ILetters | undefined =
    postsApi.endpoints.getLetters.useQueryState().data;

  const dispatch = useAppDispatch();

  const onClickPair = (pair: IUser) => dispatch(setPair(pair));

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
                    box.pair.id === pair.id && styles.selected
                  }`}
                  onClick={() => onClickPair(box.pair)}
                >
                  <img
                    src={
                      box.pair.profileImage
                        ? process.env.BUCKET_URL + box.pair.profileImage
                        : "/default_profile_image.png"
                    }
                  />
                  <div
                    className={`${styles["typo4-medium"]} ${styles.pairName}`}
                  >
                    {box.pair.nickname}
                  </div>
                  <div
                    className={`${styles["typo3-regular"]} ${styles.fromNow}`}
                  >
                    {dayjs(box.latestLetter.createdAt).locale(ko).fromNow()}
                  </div>
                  <div
                    className={`${styles["typo3-regular"]} ${styles.preview}`}
                  >
                    {box.latestLetter.text}
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

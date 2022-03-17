import { IComment } from "../../../../types/types";
import styles from "./Comment.module.scss";
import MoreIcon from "../../../../assets/icons/more.svg";
import LikeIcon from "../../../../assets/icons/like/outlined.svg";

export default function Comment({ comment }: { comment: IComment }) {
  return (
    <li key={comment.id} className={styles.container}>
      <div className={styles.userProfile}>
        <div className={styles.profileImage}>
          <img
            src={
              comment.user.profileImage
                ? process.env.BUCKET_URL + comment.user.profileImage
                : "/default profile image.png"
            }
          />
        </div>
        <div className={`${styles["typo2-regular"]} ${styles.userNickname}`}>
          {comment.user.nickname}
        </div>
        <div className={styles.more}>
          <MoreIcon />
        </div>
        <div className={styles.content}>
          <div className={`${styles["typo3-regular"]} ${styles.comment}`}>
            {comment.content}
          </div>
          <div className={`${styles["typo1-regular"]} ${styles.like}`}>
            <LikeIcon />
            <div>{comment.likeCount}</div>
          </div>
        </div>
      </div>
    </li>
  );
}

import { useAppSelector } from "../../../store/hooks";
import styles from "./PostMain.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ko from "dayjs/locale/ko";

dayjs.extend(relativeTime);

export default function PostMain() {
  const post = useAppSelector((state) => state.postDetail.post);

  return (
    <div className={styles.container}>
      <div className={`${styles["typo8-medium"]} ${styles.title}`}>
        {post?.title}
      </div>
      <div className={`${styles["typo1-regular"]} ${styles.createdAt}`}>
        {post && dayjs(new Date(post.createdAt)).locale(ko).fromNow()}
      </div>
      <hr />
      <div className={styles.content}>
        <div className={`${styles["typo4-regular"]} ${styles.description}`}>
          {post?.content}
        </div>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.profileImage}>
          <img
            src={
              post?.user.profileImage
                ? process.env.BUCKET_URL + post?.user.profileImage
                : "/default profile image.png"
            }
          />
        </div>
        <div className={`${styles["typo5-regular"]} ${styles.userNickname}`}>
          {post?.user.nickname}
        </div>
      </div>
    </div>
  );
}

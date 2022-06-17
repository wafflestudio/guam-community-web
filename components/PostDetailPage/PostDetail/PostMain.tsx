import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";

import { postDetailApi } from "../../../api/postDetailApi";

import styles from "./PostMain.module.scss";

dayjs.extend(relativeTime);

export default function PostMain() {
  const router = useRouter();
  const { postId } = router.query;

  const post = postDetailApi.endpoints.getPostDetail.useQueryState(
    typeof postId === "string" ? postId : "0"
  ).data;

  return (
    <div className={styles.container}>
      <h1 className={`${styles["typo8-medium"]} ${styles.title}`}>
        {post?.title}
      </h1>
      <hr />
      <div className={styles.userInfo}>
        <div className={styles.profileImage}>
          <img
            src={
              post?.user.profileImage
                ? process.env.BUCKET_URL +
                  post?.user.profileImage +
                  "?" +
                  Date.now()
                : "/default profile image.png"
            }
          />
        </div>
        <div className={`${styles["typo5-regular"]} ${styles.userNickname}`}>
          {post?.user.nickname}
        </div>
      </div>
      <div className={styles.content}>
        <div className={`${styles["typo4-regular"]} ${styles.description}`}>
          {post?.content}
        </div>
      </div>
      <div className={`${styles["typo1-regular"]} ${styles.createdAt}`}>
        {post && dayjs(new Date(post.createdAt)).locale(ko).fromNow()}
      </div>
    </div>
  );
}

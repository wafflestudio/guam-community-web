import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";

import CommentIcon from "../../../../assets/icons/comment/comment_20.svg";
import LikeFilledIcon from "../../../../assets/icons/like/filled_20.svg";
import LikeIcon from "../../../../assets/icons/like/post-list.svg";
import ProfileIcon from "../../../../assets/icons/profile/default_image.svg";
import ScrapFilledIcon from "../../../../assets/icons/scrap/filled_20.svg";
import ScrapIcon from "../../../../assets/icons/scrap/outlined_20.svg";
import { IPostsListPost } from "../../../../types/types";

import styles from "./Post.module.scss";

dayjs.extend(relativeTime);

export default function Post({ post }: { post: IPostsListPost }) {
  const router = useRouter();

  const createdTime = new Date(post.createdAt);

  const onClickPost: MouseEventHandler<HTMLLIElement> = () =>
    router.push(`/posts/${post.boardType.toLowerCase()}/${post.id}`);

  return (
    <li key={post.id} className={styles.container} onClick={onClickPost}>
      <div className={`${styles["typo2-medium"]} ${styles.categories}`}>
        #{post.category ? post.category.title : null}
      </div>
      <span className={`${styles["typo1-regular"]} ${styles.fromNow}`}>
        {dayjs(createdTime).locale(ko).fromNow()}
      </span>
      <hr />
      <div className={`${styles["typo4-medium"]} ${styles.title}`}>
        {post.title}
      </div>
      <div className={`${styles["typo3-regular"]} ${styles.content}`}>
        {post.content}
      </div>
      <div className={styles.profileImage}>
        {post.user.profileImage ? (
          <img
            src={
              process.env.BUCKET_URL + post.user.profileImage + "?" + Date.now()
            }
          />
        ) : (
          <ProfileIcon />
        )}
      </div>
      <span className={`${styles["typo2-regular"]} ${styles.writerName}`}>
        {post.user.nickname}
      </span>
      <div className={styles.engagement}>
        <span className={`${styles.countContainer} ${styles.likes}`}>
          {post.isLiked ? <LikeFilledIcon /> : <LikeIcon />}
          <span className={styles["typo2-regular"]}>{post.likeCount}</span>
        </span>
        <span className={`${styles.countContainer} ${styles.comments}`}>
          <CommentIcon />
          <span className={styles["typo2-regular"]}>{post.commentCount}</span>
        </span>
        <span className={`${styles.countContainer} ${styles.scraps}`}>
          {post.isScrapped ? <ScrapFilledIcon /> : <ScrapIcon />}
          <span className={styles["typo2-regular"]}>{post.scrapCount}</span>
        </span>
      </div>
    </li>
  );
}

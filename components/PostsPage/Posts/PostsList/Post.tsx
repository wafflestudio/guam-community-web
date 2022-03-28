import { IPostsListPost } from "../../../../types/types";
import styles from "./Post.module.scss";
import ProfileIcon from "../../../../assets/icons/profile/default_image.svg";
import LikeIcon from "../../../../assets/icons/like/post-list.svg";
import CommentIcon from "../../../../assets/icons/comment/comment_20.svg";
import ScrapIcon from "../../../../assets/icons/scrap/outlined_20.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ko from "dayjs/locale/ko";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

export default function Post({ post }: { post: IPostsListPost }) {
  const router = useRouter();

  const categories = post.categories.map((category) => (
    <li key={category.tagId}>#{category.title}</li>
  ));

  const createdTime = new Date(post.createdAt);

  const onClickPost: React.MouseEventHandler<HTMLDivElement> = () =>
    router.push(`/posts/${post.boardType.toLowerCase()}/${post.id}`);

  return (
    <li key={post.id} className={styles.container}>
      <ul className={`${styles["typo2-medium"]} ${styles.categories}`}>
        {categories}
      </ul>
      <span className={`${styles["typo1-regular"]} ${styles.fromNow}`}>
        {dayjs(createdTime).locale(ko).fromNow()}
      </span>
      <hr />
      <div
        className={`${styles["typo4-medium"]} ${styles.title}`}
        onClick={onClickPost}
      >
        {post.title}
      </div>
      <div
        className={`${styles["typo3-regular"]} ${styles.content}`}
        onClick={onClickPost}
      >
        {post.content}
      </div>
      <div className={styles.profileImage}>
        {post.user.profileImage ? (
          <img src={process.env.BUCKET_URL + post.user.profileImage} />
        ) : (
          <ProfileIcon />
        )}
      </div>
      <span className={`${styles["typo2-regular"]} ${styles.writerName}`}>
        {post.user.nickname}
      </span>
      <div className={styles.engagement}>
        <span className={`${styles.countContainer} ${styles.likes}`}>
          <LikeIcon />
          <span className={styles["typo2-regular"]}>{post.likeCount}</span>
        </span>
        <span className={`${styles.countContainer} ${styles.comments}`}>
          <CommentIcon />
          <span className={styles["typo2-regular"]}>{post.commentCount}</span>
        </span>
        <span className={`${styles.countContainer} ${styles.scraps}`}>
          <ScrapIcon />
          <span className={styles["typo2-regular"]}>{post.scrapCount}</span>
        </span>
      </div>
    </li>
  );
}

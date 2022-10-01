import { useRouter } from "next/router";

import PictureIcon from "assets/icons/picture.svg";
import ProfileIcon from "assets/icons/profile/default_image.svg";
import PostEngagementButton from "components/Buttons/PostEngagementButton";
import styles from "styles/PostsPage.module.scss";
import { IPostsListPost } from "types/types";
import { relativeDate } from "utils/formatDate";

export default function Post({ post }: { post: IPostsListPost }) {
  const router = useRouter();

  const onClickPost = () => {
    router.push(`/posts/${post.id}`);
  };
  const onUserClick = () => {
    if (post.user.id) router.push(`/profile/${post.user.id}`);
  };

  return (
    <li key={post.id} className={styles.postContainer}>
      <h1 className={`${styles["typo2-medium"]} ${styles.categories}`}>
        #{post.category ? post.category.title : null}
      </h1>
      <span className={`${styles["typo1-regular"]} ${styles.fromNow}`}>
        {relativeDate(post.createdAt)}
      </span>
      <hr />
      <div className={`${styles.title}`} onClick={onClickPost}>
        {post.imagePaths.length !== 0 ? <PictureIcon /> : null}
        <span className={styles["typo4-medium"]}>{post.title}</span>
      </div>
      <p
        className={`${styles["typo3-regular"]} ${styles.content}`}
        onClick={onClickPost}
      >
        {post.content}
      </p>
      <div className={post.user.id ? styles.pointer : ""} onClick={onUserClick}>
        <div className={`${styles.profileImage}`}>
          {post.user.profileImage ? (
            <img
              className={styles.profile}
              src={process.env.BUCKET_URL + post.user.profileImage}
            />
          ) : (
            <ProfileIcon />
          )}
        </div>
        <span className={`${styles["typo2-regular"]} ${styles.writerName}`}>
          {post.user.nickname}
        </span>
      </div>

      <div className={styles.engagementButtons}>
        <PostEngagementButton post={post} />
      </div>
    </li>
  );
}

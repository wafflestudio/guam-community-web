import { useRouter } from "next/router";

import CommentIcon from "assets/icons/comment/comment_20.svg";
import LikeFilledIcon from "assets/icons/like/filled_20.svg";
import LikeIcon from "assets/icons/like/post-list.svg";
import PictureIcon from "assets/icons/picture.svg";
import ProfileIcon from "assets/icons/profile/default_image.svg";
import ScrapFilledIcon from "assets/icons/scrap/filled_20.svg";
import ScrapIcon from "assets/icons/scrap/outlined_20.svg";
import { useLikePostMutation, useScrapPostMutation } from "store/postsApi";
import { IPostsListPost } from "types/types";
import { relativeDate } from "utils/formatDate";

import styles from "./Post.module.scss";

export default function Post({ post }: { post: IPostsListPost }) {
  const [scrapPost] = useScrapPostMutation();
  const [likePost] = useLikePostMutation();

  const router = useRouter();

  const onClickPost = () => {
    router.push(`/posts/${post.id}`);
  };
  const onUserClick = () => {
    if (post.user.id) router.push(`/profile/${post.user.id}`);
  };

  const onLikePost = () =>
    likePost({ postId: post.id, boardId: post.boardId, liked: post.isLiked });
  const onScrapPost = () =>
    scrapPost({
      postId: post.id,
      boardId: post.boardId,
      scrapped: post.isScrapped,
    });

  return (
    <li key={post.id} className={styles.container}>
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

      <div className={styles.engagement}>
        <span
          className={`${styles.countContainer} ${styles.likes}`}
          onClick={onLikePost}
        >
          {post.isLiked ? <LikeFilledIcon /> : <LikeIcon />}
          <span className={styles["typo2-regular"]}>{post.likeCount}</span>
        </span>
        <span className={`${styles.countContainer} ${styles.comments}`}>
          <CommentIcon />
          <span className={styles["typo2-regular"]}>{post.commentCount}</span>
        </span>
        <span
          className={`${styles.countContainer} ${styles.scraps}`}
          onClick={onScrapPost}
        >
          {post.isScrapped ? <ScrapFilledIcon /> : <ScrapIcon />}
          <span className={styles["typo2-regular"]}>{post.scrapCount}</span>
        </span>
      </div>
    </li>
  );
}

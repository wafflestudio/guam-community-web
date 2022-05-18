import dayjs from "dayjs";
import ko from "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";

import {
  useLikePostMutation,
  useScrapPostMutation,
} from "../../../../api/postsApi";
import CommentIcon from "../../../../assets/icons/comment/comment_20.svg";
import LikeFilledIcon from "../../../../assets/icons/like/filled_20.svg";
import LikeIcon from "../../../../assets/icons/like/post-list.svg";
import PictureIcon from "../../../../assets/icons/picture.svg";
import ProfileIcon from "../../../../assets/icons/profile/default_image.svg";
import ScrapFilledIcon from "../../../../assets/icons/scrap/filled_20.svg";
import ScrapIcon from "../../../../assets/icons/scrap/outlined_20.svg";
import { IPostsListPost } from "../../../../types/types";

import styles from "./Post.module.scss";

dayjs.extend(relativeTime);

export default function Post({ post }: { post: IPostsListPost }) {
  const [scrapPost] = useScrapPostMutation();
  const [likePost] = useLikePostMutation();

  const router = useRouter();

  const createdTime = new Date(post.createdAt);

  const onClickPost = () =>
    router.push(`/posts/${post.boardType.toLowerCase()}/${post.id}`);

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
      <div className={`${styles["typo2-medium"]} ${styles.categories}`}>
        #{post.category ? post.category.title : null}
      </div>
      <span className={`${styles["typo1-regular"]} ${styles.fromNow}`}>
        {dayjs(createdTime).locale(ko).fromNow()}
      </span>
      <hr />
      <div className={`${styles.title}`} onClick={onClickPost}>
        {post.imagePaths.length !== 0 ? <PictureIcon /> : null}
        <span className={styles["typo4-medium"]}>{post.title}</span>
      </div>
      <div
        className={`${styles["typo3-regular"]} ${styles.content}`}
        onClick={onClickPost}
      >
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

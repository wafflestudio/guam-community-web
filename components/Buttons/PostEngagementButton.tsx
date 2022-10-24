import React from "react";

import CommentIcon from "assets/icons/comment/comment_20.svg";
import LikeFilledIcon from "assets/icons/like/filled_20.svg";
import LikeIcon from "assets/icons/like/post-list.svg";
import ScrapFilledIcon from "assets/icons/scrap/filled_20.svg";
import ScrapIcon from "assets/icons/scrap/outlined_20.svg";
import { useLikePostMutation, useScrapPostMutation } from "store/postsApi";
import styles from "styles/PostEngagementButton.module.scss";
import { IPostsListPost } from "types/types";

const PostEngagementButton = ({ post }: { post: IPostsListPost }) => {
  const [scrapPost] = useScrapPostMutation();
  const [likePost] = useLikePostMutation();

  const onLikePost = () =>
    likePost({ postId: post.id, boardId: post.boardId, liked: post.isLiked });
  const onScrapPost = () =>
    scrapPost({
      postId: post.id,
      boardId: post.boardId,
      scrapped: post.isScrapped,
    });

  return (
    <div className={styles.engagement}>
      <span
        className={`${styles.countContainer} ${styles.likes}`}
        onClick={onLikePost}
      >
        {post.isLiked ? <LikeFilledIcon /> : <LikeIcon />}
        <span className={"typo2-regular"}>{post.likeCount}</span>
      </span>
      <span className={`${styles.countContainer} ${styles.comments}`}>
        <CommentIcon />
        <span className={"typo2-regular"}>{post.commentCount}</span>
      </span>
      <span
        className={`${styles.countContainer} ${styles.scraps}`}
        onClick={onScrapPost}
      >
        {post.isScrapped ? <ScrapFilledIcon /> : <ScrapIcon />}
        <span className={"typo2-regular"}>{post.scrapCount}</span>
      </span>
    </div>
  );
};

export default PostEngagementButton;

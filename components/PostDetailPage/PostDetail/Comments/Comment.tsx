import { useEffect, useMemo, useRef } from "react";

import { useDeleteCommentMutation } from "../../../../api/postsApi";
import LikeIcon from "../../../../assets/icons/like/outlined.svg";
import MoreIcon from "../../../../assets/icons/more.svg";
import { IComment } from "../../../../types/types";

import styles from "./Comment.module.scss";

export default function Comment({ comment }: { comment: IComment }) {
  const containerRef = useRef<HTMLLIElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const { postId } = useMemo(() => comment, [comment]);

  const [deleteComment] = useDeleteCommentMutation();

  useEffect(() => {
    if (commentRef.current?.textContent) {
      commentRef.current.innerHTML = commentRef.current.textContent.replace(
        /(@\S*)/g,
        '<span class="mentions">$1</span>'
      );
    }

    if (containerRef.current?.style && commentRef.current) {
      containerRef.current.style.height = "85px";
      containerRef.current.style.height =
        commentRef.current.scrollHeight + 64 + "px";
    }
  }, [commentRef.current?.textContent]);

  return (
    <li key={comment.id} className={styles.container} ref={containerRef}>
      <div className={styles.userProfile}>
        <div className={styles.profileImage}>
          <img
            src={
              comment.user.profileImage
                ? process.env.BUCKET_URL +
                  comment.user.profileImage +
                  "?" +
                  Date.now()
                : "/default_profile_image.png"
            }
          />
        </div>
        <div className={`${styles["typo2-regular"]} ${styles.userNickname}`}>
          {comment.user.nickname}
        </div>
        <div className={styles.more} onClick={() => deleteComment(postId)}>
          <MoreIcon />
        </div>
        <div className={styles.content}>
          <div
            className={`${styles["typo3-regular"]} ${styles.comment}`}
            ref={commentRef}
          >
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

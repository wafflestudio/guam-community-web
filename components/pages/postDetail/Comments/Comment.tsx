import { useEffect, useRef, useState } from "react";

import LikeIcon from "assets/icons/like/outlined.svg";
import MoreIcon from "assets/icons/more.svg";
import ModifyCommentModal from "components/Modals/CommentModal/ModifyCommentModal";
import MoreModal from "components/Modals/MoreModal/MoreModal";
import { useAppDispatch } from "store/hooks";
import { setImageExtendedModal } from "store/modalSlice";
import { useLikeCommentMutation } from "store/postsApi";
import styles from "styles/CommentsList.module.scss";
import { IComment } from "types/types";

export default function Comment({ comment }: { comment: IComment }) {
  const [moreOpen, setMoreOpen] = useState(false);

  const containerRef = useRef<HTMLLIElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const [likeComment] = useLikeCommentMutation();

  const onClickMore = () => setMoreOpen((moreOpen) => !moreOpen);

  useEffect(() => {
    if (commentRef.current?.textContent) {
      commentRef.current.innerHTML = commentRef.current.textContent.replace(
        /(@\S*)/g,
        '<span class="mentions">$1</span>'
      );
    }

    if (containerRef.current?.style && commentRef.current) {
      containerRef.current.style.height = "85px";
      containerRef.current.style.height = comment.imagePaths.length
        ? 174 + commentRef.current.scrollHeight + 64 + "px"
        : 0 + commentRef.current.scrollHeight + 64 + "px";
    }
  }, [commentRef.current?.textContent]);

  const onLikeComment = () =>
    likeComment({
      postId: comment.postId,
      commentId: comment.id,
      liked: comment.isLiked,
    });

  const onClickImage = () =>
    dispatch(setImageExtendedModal({ paths: comment.imagePaths }));

  return (
    <li key={comment.id} className={styles.commentContainer} ref={containerRef}>
      <div className={styles.userProfile}>
        <div className={styles.profileImage}>
          <img
            src={
              comment.user.profileImage
                ? process.env.BUCKET_URL + comment.user.profileImage
                : "/default_profile_image.png"
            }
          />
        </div>
        {comment.imagePaths.length ? (
          <ul className={styles.imageList}>
            {comment.imagePaths.map((path) => {
              return (
                <li key={path}>
                  <div className={styles.imageContainer}>
                    <img
                      src={
                        process.env.BUCKET_URL +
                        path +
                        "?" +
                        comment.id.toString()
                      }
                      onClick={onClickImage}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
        <div className={`${styles["typo2-regular"]} ${styles.userNickname}`}>
          {comment.user.nickname}
        </div>
        <button className={styles.more} onClick={onClickMore}>
          <MoreIcon />
        </button>
        <div className={styles.content}>
          <div
            className={`${styles["typo3-regular"]} ${styles.comment}`}
            ref={commentRef}
          >
            {comment.content}
          </div>
          <div
            className={`${styles["typo1-regular"]} ${styles.like} ${
              comment.isLiked && styles.isLiked
            }`}
          >
            <LikeIcon onClick={onLikeComment} />
            <div>{comment.likeCount}</div>
          </div>
        </div>
        {moreOpen ? (
          !comment.isMine ? (
            <MoreModal user={comment.user} setMoreOpen={setMoreOpen} />
          ) : (
            <ModifyCommentModal
              setMoreOpen={setMoreOpen}
              postId={comment.postId}
              commentId={comment.id}
            />
          )
        ) : null}
      </div>
    </li>
  );
}

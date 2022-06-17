import { Dispatch, SetStateAction, useEffect, useRef } from "react";

import { useLikeCommentMutation } from "../../../../api/postsApi";
import LikeIcon from "../../../../assets/icons/like/outlined.svg";
import MoreIcon from "../../../../assets/icons/more.svg";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setImageExtendedModal } from "../../../../store/modalSlice";
import { IComment } from "../../../../types/types";

import CommentMoreModal from "./CommentMoreModal";

import styles from "./Comment.module.scss";

export default function Comment({
  comment,
  selectedId,
  setSelectedId,
}: {
  comment: IComment;
  selectedId: number | null;
  setSelectedId: Dispatch<SetStateAction<number | null>>;
}) {
  const containerRef = useRef<HTMLLIElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  const [likeComment] = useLikeCommentMutation();

  const { id } = comment;

  const onClickMore = () => {
    if (selectedId === id) setSelectedId(null);
    else setSelectedId(id);
  };

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
    dispatch(setImageExtendedModal({ open: true, paths: comment.imagePaths }));

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
        {selectedId === id ? (
          <CommentMoreModal user={comment.user} setSelectedId={setSelectedId} />
        ) : null}
      </div>
    </li>
  );
}

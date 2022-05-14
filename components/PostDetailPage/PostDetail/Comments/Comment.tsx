import { useEffect, useMemo, useRef } from "react";
import { useDispatch } from "react-redux";

import { api } from "../../../../api/api";
import LikeIcon from "../../../../assets/icons/like/outlined.svg";
import MoreIcon from "../../../../assets/icons/more.svg";
import { setComments } from "../../../../store/commentsSlice";
import { useAppSelector } from "../../../../store/hooks";
import { IComment } from "../../../../types/types";

import styles from "./Comment.module.scss";

export default function Comment({ comment }: { comment: IComment }) {
  const containerRef = useRef<HTMLLIElement>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  const { token } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { postId } = useMemo(() => comment, [comment]);

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

  const deleteComment = async () => {
    if (!window.confirm("삭제하시겠습니까") || !comment.isMine) return;

    try {
      await api.delete(`/posts/${postId}/comments/${comment.id}`);
      const { data } = await api.get(`/posts/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setComments(data.content));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <li key={comment.id} className={styles.container} ref={containerRef}>
      <div className={styles.userProfile}>
        <div className={styles.profileImage}>
          <img
            src={
              comment.user.profileImage
                ? process.env.BUCKET_URL + comment.user.profileImage
                : "/default profile image.png"
            }
          />
        </div>
        <div className={`${styles["typo2-regular"]} ${styles.userNickname}`}>
          {comment.user.nickname}
        </div>
        <div className={styles.more} onClick={deleteComment}>
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

import { useState } from "react";

import { api } from "../../../../api/api";
import CameraIcon from "../../../../assets/icons/camera.svg";
import { setComments } from "../../../../store/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import styles from "./CommentForm.module.scss";

export default function CommentForm() {
  const [commentInput, setCommentInput] = useState("");

  const postId = useAppSelector((state) => state.postDetail.post?.id);
  const token = useAppSelector((state) => state.auth.token);

  const dispatch = useAppDispatch();

  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setCommentInput(e.target.value);

  const onSubmitComment: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        `/posts/${postId}/comments`,
        {
          content: commentInput,
          mentionIds: [],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentInput("");
      const { data } = await api.get(`/posts/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setComments(data.content));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={onSubmitComment} className={styles.container}>
      <textarea
        id="comment"
        name="comment"
        value={commentInput}
        onChange={onCommentChange}
        placeholder={"댓글을 남겨 주세요"}
        className={styles["typo4-regular"]}
      />
      <button className={styles.addPhoto}>
        <CameraIcon />
      </button>
      <button
        type="submit"
        className={`${styles["typo5-medium"]} ${styles.submit}`}
      >
        전송
      </button>
    </form>
  );
}

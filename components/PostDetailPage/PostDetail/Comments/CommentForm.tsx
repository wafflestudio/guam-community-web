import { useMemo, useState } from "react";

import { api } from "../../../../api/api";
import CameraIcon from "../../../../assets/icons/camera.svg";
import { setComments } from "../../../../store/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import MentionList from "./MentionList";

import styles from "./CommentForm.module.scss";

export default function CommentForm() {
  const [commentInput, setCommentInput] = useState("");
  const [mentionListOpen, setMentionListOpen] = useState(false);

  const post = useAppSelector((state) => state.postDetail.post);
  const postId = post?.id;

  const token = useAppSelector((state) => state.auth.token);

  const commentWriters = useAppSelector(
    (state) => state.comments.comments
  )?.map((comment) => comment.user);

  const canBeMentioned = useMemo(
    () =>
      post?.boardId !== 1 && post?.user
        ? commentWriters
          ? [post?.user, ...commentWriters]
          : [post?.user]
        : null,
    [post, commentWriters]
  );

  const mentionList = useMemo(
    () =>
      canBeMentioned?.filter(
        (user, index, array) =>
          array.findIndex((u) => u.id === user.id) === index
      ),
    [canBeMentioned]
  );

  const dispatch = useAppDispatch();

  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setCommentInput(e.target.value);

    if (e.target.value[e.target.value.length - 1] === "@") {
      setMentionListOpen(true);
    } else {
      setMentionListOpen(false);
    }
  };

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
      {mentionListOpen && mentionList ? (
        <MentionList mentionList={mentionList} />
      ) : null}
    </form>
  );
}

import { useMemo, useRef, useState } from "react";

import { api } from "../../../../api/api";
import CameraIcon from "../../../../assets/icons/camera.svg";
import { setComments } from "../../../../store/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";

import MentionList from "./MentionList";

import styles from "./CommentForm.module.scss";

export default function CommentForm() {
  const [commentInput, setCommentInput] = useState("");
  const [mockInput, setMockInput] = useState("");
  const [mentionListOpen, setMentionListOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mockTextareaRef = useRef<HTMLDivElement>(null);

  const post = useAppSelector((state) => state.postDetail.post);
  const postId = post?.id;

  const token = useAppSelector((state) => state.auth.token);

  const comments = useAppSelector((state) => state.comments.comments);

  const dispatch = useAppDispatch();

  const commentWriters = useMemo(
    () => comments?.map((comment) => comment.user),
    [comments]
  );

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

  const onCommentChange: React.ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => {
    const comment = target.value.replace(/[\r\n\v]+/g, "");
    setCommentInput(comment);

    const { current } = mockTextareaRef;
    if (current?.textContent) {
      current.innerHTML = comment.replace(
        /(@\S*)/g,
        '<span class="mentions">$1</span>'
      );
    }
  };

  const onMention: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "@") {
      setMentionListOpen(true);
    } else {
      setMentionListOpen(false);
    }
  };

  const onSubmitComment: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const mentionIds =
      commentInput
        .match(/@\S+/g)
        ?.map((mention) => mention.substring(1))
        .map(
          (name) => mentionList?.find((user) => user.nickname === name)?.id
        ) || null;

    const formData = new FormData();
    const object = {
      content: commentInput,
      ...(mentionIds && mentionIds),
    };
    Object.keys(object).forEach((key) =>
      formData.append(key, object[key as keyof object])
    );

    try {
      await api.post(`/posts/${postId}/comments`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        onKeyDown={onMention}
        placeholder={"댓글을 남겨 주세요"}
        className={`${styles["typo4-regular"]} ${styles.commentInput}`}
        ref={textareaRef}
      />
      <div
        className={`${styles["typo4-regular"]} ${styles.mockTextarea}`}
        ref={mockTextareaRef}
      >
        {mockInput}
      </div>
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
        <MentionList
          mentionList={mentionList}
          commentInput={commentInput}
          setCommentInput={setCommentInput}
          setMentionListOpen={setMentionListOpen}
          textareaRef={textareaRef}
          mockTextareaRef={mockTextareaRef}
        />
      ) : null}
    </form>
  );
}

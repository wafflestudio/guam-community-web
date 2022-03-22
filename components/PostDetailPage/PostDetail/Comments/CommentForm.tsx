import { useEffect, useMemo, useRef, useState } from "react";

import { api } from "../../../../api/api";
import CameraIcon from "../../../../assets/icons/camera.svg";
import { setComments } from "../../../../store/commentsSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { mentionRegex } from "../../../../utils/mentionRegex";

import CommentArea from "./CommentArea";
import MentionList from "./MentionList";

import styles from "./CommentForm.module.scss";

export default function CommentForm() {
  const [commentInput, setCommentInput] = useState("");
  const [mentionListOpen, setMentionListOpen] = useState(false);

  const containerRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mockTextareaRef = useRef<HTMLDivElement>(null);

  const post = useAppSelector((state) => state.postDetail.post);
  const postId = useMemo(() => post?.id, [post]);

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

  const regex = useMemo(
    () => mentionRegex(mentionList?.map((user) => user.nickname) || []),
    [mentionList]
  );

  useEffect(() => {
    const { current } = mockTextareaRef;

    if (current) {
      if (mentionList) {
        current.innerHTML = commentInput.replace(
          regex,
          '<span class="mentions">$1</span>'
        );
      } else {
        current.innerHTML = commentInput;
      }

      if (current.innerHTML === "") {
        current.innerHTML =
          '<span class="customPlaceholder">댓글을 남겨 주세요.</span>';
      }
    }

    if (textareaRef.current?.style) {
      textareaRef.current.style.height = "80px";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
      if (containerRef.current?.style) {
        containerRef.current.style.height = "80px";
        containerRef.current.style.height =
          textareaRef.current.scrollHeight + 70 + "px";
      }
    }
  }, [commentInput, regex]);

  const onSubmitComment: React.FormEventHandler = async (e) => {
    e.preventDefault();

    if (commentInput.length === 0) return;

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
      ...(mentionIds && { mentionIds }),
    };

    Object.keys(object).forEach((key) =>
      formData.append(key, object[key as keyof object])
    );

    try {
      await api.post(`/posts/${postId}/comments`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentInput("");
      mockTextareaRef.current!.innerHTML = "";
      const { data } = await api.get(`/posts/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setComments(data.content));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      onSubmit={onSubmitComment}
      className={styles.container}
      ref={containerRef}
    >
      <CommentArea
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        setMentionListOpen={setMentionListOpen}
        textareaRef={textareaRef}
        mockTextareaRef={mockTextareaRef}
      />
      <button className={styles.addPhoto}>
        <CameraIcon />
      </button>
      <button
        type="submit"
        className={`${styles["typo5-medium"]} ${styles.submit} ${
          commentInput === "" && styles.disabled
        }`}
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

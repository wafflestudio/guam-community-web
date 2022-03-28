import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  postDetailApi,
  usePostCommentMutation,
} from "../../../../api/postDetailApi";
import CameraIcon from "../../../../assets/icons/camera.svg";
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

  const router = useRouter();
  const { postId } = router.query;

  const post = postDetailApi.endpoints.getPostDetail.useQueryState(
    typeof postId === "string" ? postId : "0"
  ).data;

  const [postComment] = usePostCommentMutation();

  const comments = post?.comments;

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
  }, [commentInput, regex, mentionList]);

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

    const data = new FormData();
    const object = {
      content: commentInput,
      ...(mentionIds && { mentionIds }),
    };

    Object.keys(object).forEach((key) =>
      data.append(key, object[key as keyof object])
    );

    const id = typeof postId === "string" ? postId : "0";

    postComment({ data, id });

    setCommentInput("");
    mockTextareaRef.current!.innerHTML = "";
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

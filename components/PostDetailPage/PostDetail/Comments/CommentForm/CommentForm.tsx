import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { postDetailApi } from "../../../../../api/postDetailApi";
import { IImageUrl } from "../../../../../types/types";
import { mentionRegex } from "../../../../../utils/mentionRegex";

import CommentArea from "./CommentArea";
import CommentFormButtons from "./CommentFormButtons";
import HandleImages from "./HandleImages";
import MentionList from "./MentionList";

import styles from "./CommentForm.module.scss";

const CommentForm = () => {
  const [commentInput, setCommentInput] = useState("");
  const [mentionListOpen, setMentionListOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<IImageUrl[]>([]);

  const containerRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mockTextareaRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { postId } = router.query;

  const post = postDetailApi.endpoints.getPostDetail.useQueryState(
    typeof postId === "string" ? postId : "0"
  ).data;

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

  return (
    <form className={styles.container} ref={containerRef}>
      <CommentArea
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        setMentionListOpen={setMentionListOpen}
        textareaRef={textareaRef}
        mockTextareaRef={mockTextareaRef}
      />
      <HandleImages
        images={images}
        setImages={setImages}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
        textareaRef={textareaRef}
        photoInputRef={photoInputRef}
      />
      <CommentFormButtons
        images={images}
        setImages={setImages}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        photoInputRef={photoInputRef}
        mockTextareaRef={mockTextareaRef}
        mentionList={mentionList}
        postId={postId}
      />
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
};

export default React.memo(CommentForm);

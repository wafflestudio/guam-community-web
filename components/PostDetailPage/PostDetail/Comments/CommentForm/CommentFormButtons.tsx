import React, { RefObject, useCallback } from "react";

import { usePostCommentMutation } from "../../../../../api/postsApi";
import CameraIcon from "../../../../../assets/icons/camera.svg";
import {
  setCommentInput,
  setImages,
  setImageUrls,
} from "../../../../../store/commentFormSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { IUser } from "../../../../../types/types";

import styles from "./CommentForm.module.scss";

const CommentFormButtons = ({
  photoInputRef,
  mockTextareaRef,
  mentionList,
  postId,
}: {
  photoInputRef: RefObject<HTMLInputElement>;
  mockTextareaRef: RefObject<HTMLDivElement>;
  mentionList: IUser[];
  postId: string;
}) => {
  const { commentInput, images, imageUrls } = useAppSelector(
    (state) => state.commentForm
  );
  const dispatch = useAppDispatch();

  const clickImageInput = useCallback(() => {
    if (imageUrls.length >= 5) {
      alert("사진은 5장까지 첨부 가능합니다");
      return;
    }
    photoInputRef.current?.click();
  }, [imageUrls.length]);

  const [postComment] = usePostCommentMutation();

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
    images.length !== 0 &&
      images.forEach((image) => {
        data.append("images", image);
      });

    const id = typeof postId === "string" ? postId : "0";

    postComment({ data, id });

    dispatch(setCommentInput(""));
    dispatch(setImages([]));
    dispatch(setImageUrls([]));
    mockTextareaRef.current!.innerHTML = "";
  };

  return (
    <>
      <button
        type="button"
        className={`${styles.addPhoto} ${
          imageUrls.length >= 5 && styles.disabled
        }`}
        onClick={clickImageInput}
      >
        <CameraIcon />
      </button>
      <button
        className={`${styles["typo5-medium"]} ${styles.submit} ${
          commentInput === "" && styles.disabled
        }`}
        onClick={onSubmitComment}
      >
        전송
      </button>
    </>
  );
};

export default React.memo(CommentFormButtons);

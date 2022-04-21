import React, { Dispatch, RefObject, SetStateAction, useCallback } from "react";

import { usePostCommentMutation } from "../../../../../api/postDetailApi";
import CameraIcon from "../../../../../assets/icons/camera.svg";
import { IImageUrl, IUser } from "../../../../../types/types";

import styles from "./CommentForm.module.scss";

const CommentFormButtons = ({
  images,
  setImages,
  imageUrls,
  setImageUrls,
  commentInput,
  setCommentInput,
  photoInputRef,
  mockTextareaRef,
  mentionList,
  postId,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  imageUrls: IImageUrl[];
  setImageUrls: Dispatch<SetStateAction<IImageUrl[]>>;
  commentInput: string;
  setCommentInput: Dispatch<SetStateAction<string>>;
  photoInputRef: RefObject<HTMLInputElement>;
  mockTextareaRef: RefObject<HTMLDivElement>;
  mentionList: IUser[] | undefined;
  postId: string | string[] | undefined;
}) => {
  const clickImageInput = useCallback(() => {
    if (imageUrls.length >= 5) {
      alert("사진은 5장까지 첨부 가능합니다");
      return;
    }
    photoInputRef.current?.click();
  }, [imageUrls.length]);

  const [postComment] = usePostCommentMutation();

  const onSubmitComment: React.FormEventHandler = useCallback(
    async (e) => {
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

      setCommentInput("");
      setImages([]);
      setImageUrls([]);
      mockTextareaRef.current!.innerHTML = "";
    },
    [commentInput, images, mentionList, postComment, postId]
  );

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
        type="submit"
        className={`${styles["typo5-medium"]} ${styles.submit} ${
          commentInput === "" && styles.disabled
        }`}
        onSubmit={onSubmitComment}
      >
        전송
      </button>
    </>
  );
};

export default React.memo(CommentFormButtons);

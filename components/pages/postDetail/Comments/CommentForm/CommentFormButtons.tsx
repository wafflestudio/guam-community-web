import axios, { AxiosRequestConfig } from "axios";
import React, { RefObject } from "react";

import CameraIcon from "assets/icons/camera.svg";
import {
  setCommentInput,
  setImages,
  setImageUrls,
} from "store/commentFormSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { usePostCommentMutation } from "store/postsApi";
import styles from "styles/CommentForm.module.scss";
import { IUser } from "types/types";
import useRouterInfo from "utils/useRouterInfo";

const CommentFormButtons = ({
  photoInputRef,
  mockTextareaRef,
  mentionList,
}: {
  photoInputRef: RefObject<HTMLInputElement>;
  mockTextareaRef: RefObject<HTMLDivElement>;
  mentionList: IUser[];
}) => {
  const { commentInput, images, imageUrls } = useAppSelector(
    (state) => state.commentForm
  );
  const dispatch = useAppDispatch();

  const clickImageInput = () => {
    if (imageUrls.length >= 5) {
      alert("사진은 5장까지 첨부 가능합니다");
      return;
    }
    photoInputRef.current?.click();
  };

  const [postComment] = usePostCommentMutation();
  const { postId } = useRouterInfo();

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

    const data = {
      content: commentInput,
      ...(mentionIds && { mentionIds }),
      ...(images.length && { imageFilePaths: images.map((file) => file.name) }),
    };

    if (postId)
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const { data: urlData } = await postComment({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          data,
          id: postId,
        });
        const { preSignedUrls } = urlData;

        await Promise.all(
          preSignedUrls.map((url: string, i: number) => {
            const options: AxiosRequestConfig = {
              url: `/presigned_bucket_url/${
                url.split(process.env.BUCKET_URL || "")[1]
              }`,
              method: "PUT",
              headers: { "Content-Type": images[i].type },
              data: images[i],
            };
            axios(options);
          })
        );

        dispatch(setCommentInput(""));
        dispatch(setImages([]));
        dispatch(setImageUrls([]));
        mockTextareaRef.current!.innerHTML = "";
      } catch (e) {
        console.log(e);
      }
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
          commentInput.trim() === "" && styles.disabled
        }`}
        onClick={onSubmitComment}
      >
        전송
      </button>
    </>
  );
};

export default React.memo(CommentFormButtons);

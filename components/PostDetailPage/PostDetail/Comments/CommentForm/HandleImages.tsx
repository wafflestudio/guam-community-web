import React, { RefObject, useCallback } from "react";

import CancelIcon from "../../../../../assets/icons/cancel/filled_18.svg";
import { setImages, setImageUrls } from "../../../../../store/commentFormSlice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";

import styles from "./CommentForm.module.scss";

function HandleImages({
  textareaRef,
  photoInputRef,
}: {
  textareaRef: RefObject<HTMLTextAreaElement>;
  photoInputRef: RefObject<HTMLInputElement>;
}) {
  const { images, imageUrls } = useAppSelector((state) => state.commentForm);
  const dispatch = useAppDispatch();

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      ({ target }) => {
        if (target.files) {
          if (
            Array.from(target.files).some((file) => file.size > 10 * 1000000)
          ) {
            alert("이미지 크기는 10MB 이하만 가능합니다");
          }

          const filteredImages = Array.from(target.files).filter(
            (image) => image.size <= 10 * 1000000
          );

          const imagesList = [...images, ...filteredImages].filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) =>
                  t.lastModified === value.lastModified && t.name === value.name
              )
          );
          if (imagesList.length !== images.length + filteredImages.length)
            alert("이미 선택한 사진입니다");
          if (imagesList.length > 5) alert("사진은 5장까지 첨부 가능합니다");
          dispatch(setImages(imagesList.slice(0, 5)));

          const newUrls = imagesList.map((file) => ({
            id: file.lastModified,
            url: URL.createObjectURL(file),
          }));
          dispatch(setImageUrls(newUrls.slice(0, 5)));
        }
      },
      [dispatch, images]
    );

  const deleteImage = useCallback(
    (id: number) => {
      dispatch(setImages(images.filter((file) => file.lastModified !== id)));
      dispatch(setImageUrls(imageUrls.filter((url) => url.id !== id)));
    },
    [dispatch, imageUrls, images]
  );

  return (
    <>
      <input
        className={styles.photoInput}
        ref={photoInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageInput}
        multiple
      />
      {imageUrls.length !== 0 ? (
        <div
          className={styles.photosDisplay}
          style={{
            top: `-${
              textareaRef.current?.clientHeight !== undefined
                ? textareaRef.current?.clientHeight + 18
                : 98
            }px`,
          }}
        >
          {imageUrls.map((imageUrl, index) => (
            <div
              className={`${styles.imageList} ${styles[`imageList_${index}`]}`}
              key={imageUrl.id}
            >
              <img key={imageUrl.id} src={imageUrl.url} />
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => deleteImage(imageUrl.id)}
              >
                <CancelIcon />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default React.memo(HandleImages);

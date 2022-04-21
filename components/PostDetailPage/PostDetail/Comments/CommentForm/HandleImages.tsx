import React, { Dispatch, RefObject, SetStateAction, useCallback } from "react";

import CancelIcon from "../../../../../assets/icons/cancel/filled_18.svg";
import { IImageUrl } from "../../../../../types/types";

import styles from "./CommentForm.module.scss";

const HandleImages = ({
  images,
  setImages,
  imageUrls,
  setImageUrls,
  textareaRef,
  photoInputRef,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  imageUrls: IImageUrl[];
  setImageUrls: Dispatch<SetStateAction<IImageUrl[]>>;
  textareaRef: RefObject<HTMLTextAreaElement>;
  photoInputRef: RefObject<HTMLInputElement>;
}) => {
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
          setImages(imagesList.slice(0, 5));

          const newUrls = imagesList.map((file) => ({
            id: file.lastModified,
            url: URL.createObjectURL(file),
          }));
          setImageUrls(newUrls.slice(0, 5));
        }
      },
      [images]
    );

  const deleteImage = useCallback((id: number) => {
    setImages((images) => images.filter((file) => file.lastModified !== id));
    setImageUrls((imageUrls) => imageUrls.filter((url) => url.id !== id));
  }, []);

  return (
    <>
      {" "}
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
};

export default React.memo(HandleImages);

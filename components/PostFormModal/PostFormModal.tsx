import React, { ChangeEventHandler, useRef, useState } from "react";

import CancelIcon from "../../assets/icons/cancel/outlined.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import { categoryList } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPostModalOpen } from "../../store/modalSlice";

import styles from "./PostFormModal.module.scss";

export default function PostFormModal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagId, setTagId] = useState(0);
  const [images, setImages] = useState<Blob[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const photoInput = useRef<HTMLInputElement>(null);

  const { postModalOpen } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const closeModal = () => dispatch(setPostModalOpen(false));

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setTitle(target.value);

  const onContentChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => setContent(target.value);

  const onTagIdChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setTagId(parseInt(target.value));

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
      const newUrls = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImageUrls([...imageUrls, ...newUrls]);
    }
  };

  const clickImageInput = () => {
    photoInput.current?.click();
  };

  console.log(imageUrls);

  return (
    <div
      className={`${styles.wrapper} ${
        postModalOpen ? styles.open : styles.close
      }`}
      onClick={closeModal}
    >
      <main className={styles.container} onClick={(e) => e.stopPropagation()}>
        <h1 className={`${styles["typo6-regular"]} ${styles.title}`}>글쓰기</h1>
        <button className={styles.cancel} onClick={closeModal}>
          <CancelIcon />
        </button>
        <form>
          <input
            className={`${styles["typo6-medium"]} ${styles.title}`}
            type="text"
            value={title}
            onChange={onTitleChange}
            placeholder="제목을 입력해주세요."
          />
          <textarea
            className={`${styles["typo4-regular"]} ${styles.content}`}
            value={content}
            onChange={onContentChange}
            placeholder="내용을 입력해주세요."
          />
          <div className={styles.tagOptions}>
            <div className={`${styles["typo4-regular"]} ${styles.label}`}>
              태그를 선택해주세요.
            </div>
            {categoryList.map((tag) => (
              <React.Fragment key={tag.id}>
                <input
                  type="radio"
                  name="tag"
                  id={tag.tag}
                  value={tag.id}
                  onChange={onTagIdChange}
                />
                <label
                  className={`${styles["typo4-medium"]} ${styles[tag.tag]}`}
                  htmlFor={tag.tag}
                >
                  #{tag.name}
                </label>
              </React.Fragment>
            ))}
          </div>
          <div className={styles.addPhotos}>
            <div className={`${styles["typo4-regular"]} ${styles.label}`}>
              사진을 첨부해보세요.
            </div>
            <input
              className={styles.photoInput}
              ref={photoInput}
              type="file"
              onChange={handleImageInput}
              multiple
            />
            {imageUrls.length !== 0 ? (
              imageUrls.map((imageUrl) => (
                <div className={styles.imageList} key={imageUrl}>
                  <img key={imageUrl} src={imageUrl} />
                </div>
              ))
            ) : (
              <div className={styles.addBox} onClick={clickImageInput}>
                <PlusIcon />
              </div>
            )}
          </div>
          <button
            type="button"
            className={`${styles["typo4-regular"]} ${styles.save}`}
          >
            저장
          </button>
          <button
            type="submit"
            className={`${styles["typo4-regular"]} ${styles.submit}`}
          >
            등록
          </button>
        </form>
        <hr className={styles.title} />
        <hr className={styles.contentTop} />
        <hr className={styles.contentBottom} />
        <hr className={styles.tagPhoto} />
        <hr className={styles.bottom} />
      </main>
    </div>
  );
}

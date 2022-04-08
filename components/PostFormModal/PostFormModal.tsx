import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePostPostMutation } from "../../api/postsListApi";
import CancelIcon from "../../assets/icons/cancel/outlined.svg";
import PlusIcon from "../../assets/icons/plus.svg";
import { categoryList } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setPostModalOpen } from "../../store/modalSlice";

import styles from "./PostFormModal.module.scss";

export default function PostFormModal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState<Blob[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const photoInput = useRef<HTMLInputElement>(null);

  const { postModalOpen } = useAppSelector((state) => state.modal);

  const [postPost, { isError, isSuccess }] = usePostPostMutation();

  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => dispatch(setPostModalOpen(false)), []);

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => setTitle(target.value),
    []
  );

  const onContentChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    ({ target }) => setContent(target.value),
    []
  );

  const onTagIdChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => setCategoryId(parseInt(target.value)),
    []
  );

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
          const imagesList = [...images, ...filteredImages];
          if (imagesList.length > 5) alert("사진은 5장까지 첨부 가능합니다");
          setImages(imagesList.slice(0, 5));

          const newUrls = filteredImages.map((file) =>
            URL.createObjectURL(file)
          );
          setImageUrls((imageUrls) => [...imageUrls, ...newUrls].slice(0, 5));
        }
      },
      [images]
    );

  const clickImageInput = useCallback(() => {
    photoInput.current?.click();
  }, []);

  const onPostSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      const data = new FormData();
      const object = {
        boardId: 1,
        title,
        content,
        categoryId,
      };
      Object.keys(object).forEach((key) =>
        data.append(key, object[key as keyof object])
      );
      images.length &&
        images.forEach((image) => {
          data.append("images", image);
        });

      postPost(data);
    },
    [title, content, categoryId, images]
  );

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setContent("");
      setCategoryId(0);
      setImages([]);
      setImageUrls([]);
      closeModal();
    }

    if (isError) alert("포스트 등록 실패");
  }, [isSuccess, isError]);

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
        <form onSubmit={onPostSubmit}>
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
              accept="image/*"
              onChange={handleImageInput}
              multiple
            />
            {imageUrls.length !== 0
              ? imageUrls.map((imageUrl) => (
                  <div className={styles.imageList} key={imageUrl}>
                    <img key={imageUrl} src={imageUrl} />
                  </div>
                ))
              : null}
            {imageUrls.length < 5 ? (
              <div className={styles.addBox} onClick={clickImageInput}>
                <PlusIcon />
              </div>
            ) : null}
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

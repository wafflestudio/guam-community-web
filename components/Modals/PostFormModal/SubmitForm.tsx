import React, {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { usePostPostMutation } from "../../../api/postsApi";
import CancelIcon from "../../../assets/icons/cancel/outlined.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import { categoryList } from "../../../constants/constants";
import { useAppDispatch } from "../../../store/hooks";
import { setPostModalOpen } from "../../../store/modalSlice";
import { IImageUrl } from "../../../types/types";

import styles from "./PostFormModal.module.scss";

const SubmitForm = () => {
  const [boardId, setBoardId] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<IImageUrl[]>([]);

  const photoInput = useRef<HTMLInputElement>(null);

  const [postPost, { isError, isSuccess }] = usePostPostMutation();

  const dispatch = useAppDispatch();

  const closeModal = useCallback(() => dispatch(setPostModalOpen(false)), []);

  const onBoardIdChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    ({ target }) => setBoardId(parseInt(target.value)),
    []
  );

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => setTitle(target.value),
    []
  );

  const onContentChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    ({ target }) => setContent(target.value),
    []
  );

  const onCategoryIdChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target }) => setCategoryId(parseInt(target.value)),
    []
  );

  const onDeleteCategory = useCallback(() => setCategoryId(0), []);

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

          const newUrls = filteredImages.map((file) => ({
            id: file.lastModified,
            url: URL.createObjectURL(file),
          }));
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

      if (boardId === 0) return window.alert("게시판을 골라주세요");
      if (title.length === 0 || content.length === 0)
        return window.alert("제목과 내용을 작성해주세요");
      if (categoryId === 0) return window.alert("태그를 골라주세요");

      const data = new FormData();
      const object = {
        boardId,
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
      setBoardId(0);
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
    <form onSubmit={onPostSubmit}>
      <select
        className={`${styles["typo4-regular"]} ${styles.boardId}`}
        value={boardId}
        onChange={onBoardIdChange}
      >
        <option hidden>게시판</option>
        <option value={2}>자유 게시판</option>
        <option value={1}>익명 게시판</option>
        <option value={3}>구인 게시판</option>
        <option value={4}>정보공유 게시판</option>
        <option value={5}>홍보 게시판</option>
      </select>
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
      <div className={styles.categoryOptions}>
        <div className={`${styles["typo4-regular"]} ${styles.label}`}>
          태그를 선택해주세요.
        </div>
        {categoryId == 0 ? (
          categoryList.map((category) => (
            <div className={styles.categoryList} key={category.id}>
              <input
                type="radio"
                name={category.tag}
                id={category.tag}
                value={category.id}
                onChange={onCategoryIdChange}
              />
              <label
                className={`${styles["typo4-medium"]} ${styles[category.tag]}`}
                htmlFor={category.tag}
              >
                #{category.name}
              </label>
            </div>
          ))
        ) : (
          <div
            className={`${styles["typo5-medium"]} ${styles.selectedCategory}`}
          >
            <span className={styles.categoryName}>
              #{categoryList[categoryId - 1].name}
            </span>
            <button
              type="button"
              className={styles.deleteCategory}
              onClick={onDeleteCategory}
            >
              <CancelIcon />
            </button>
          </div>
        )}
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
              <div className={styles.imageList} key={imageUrl.id}>
                <img key={imageUrl.id} src={imageUrl.url} />
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
        className={`${styles["typo4-regular"]} ${styles.save} ${styles.bottom}`}
      >
        저장
      </button>
      <button
        type="submit"
        className={`${styles["typo4-regular"]} ${styles.submit} ${styles.bottom}`}
      >
        등록
      </button>
    </form>
  );
};

export default React.memo(SubmitForm);

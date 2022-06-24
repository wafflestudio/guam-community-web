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
import CheckIcon from "../../../assets/icons/check.svg";
import DownIcon from "../../../assets/icons/down/down_20.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import { boardList, categoryList } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPostFormModal } from "../../../store/modalSlice";
import { IImageUrl } from "../../../types/types";

import styles from "./PostFormModal.module.scss";

const SubmitForm = () => {
  const [boardId, setBoardId] = useState(0);
  const [boardListOpen, setBoardListOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<IImageUrl[]>([]);

  const photoInput = useRef<HTMLInputElement>(null);

  const { expanded } = useAppSelector((state) => state.modals.postFormModal);

  useEffect(() => {
    if (expanded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expanded]);

  const [postPost, { isError, isSuccess }] = usePostPostMutation();

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setPostFormModal({ open: false, expanded: false }));
  };

  const onToggleBoardList = () =>
    setBoardListOpen((boardListOpen) => !boardListOpen);

  const onBoardIdChange = (id: number) => {
    setBoardId(id);
    onToggleBoardList();
  };

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setTitle(target.value);

  const onContentChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    ({ target }) => setContent(target.value),
    []
  );

  const onCategoryIdChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setCategoryId(parseInt(target.value));

  const onDeleteCategory = () => setCategoryId(0);

  const handleImageInput: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    if (target.files) {
      if (Array.from(target.files).some((file) => file.size > 10 * 1000000)) {
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
  };

  const clickImageInput = () => photoInput.current?.click();

  const onPostSubmit: FormEventHandler<HTMLFormElement> = (e) => {
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
  };

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
      <div className={`${styles.boardWrapper} ${expanded && styles.expanded}`}>
        <div className={styles.boardHeader}>
          <button
            className={`${styles.boardHeaderTitle} ${styles["typo4-regular"]} ${styles.boardId}`}
            onClick={onToggleBoardList}
            type="button"
          >
            {boardId === 0 ? "게시판" : boardList[boardId].name}
            <DownIcon />
          </button>
        </div>
        {boardListOpen ? (
          <div className={styles.boardList}>
            {boardList.map((board) => {
              if (board.id === 0) return;
              return (
                <li key={board.id} onClick={() => onBoardIdChange(board.id)}>
                  <button
                    type="button"
                    className={`${styles["typo5-regular"]} ${styles.boardListItem}`}
                  >
                    {board.name}
                  </button>
                  {board.id === boardId ? <CheckIcon /> : null}
                </li>
              );
            })}
          </div>
        ) : null}
      </div>
      <input
        className={`${styles["typo6-medium"]} ${styles.title} ${
          expanded && styles.expanded
        }`}
        type="text"
        value={title}
        onChange={onTitleChange}
        placeholder="제목"
      />
      <textarea
        className={`${styles["typo4-regular"]} ${styles.content} ${
          expanded && styles.expanded
        }`}
        value={content}
        onChange={onContentChange}
        placeholder="내용을 입력해주세요."
      />
      <div className={styles.categoryOptions}>
        <div
          className={`${styles["typo4-regular"]} ${styles.label} ${
            expanded && styles.expanded
          }`}
        >
          태그
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
                className={`${styles["typo4-medium"]} ${styles[category.tag]} ${
                  expanded && styles.expanded
                }`}
                htmlFor={category.tag}
              >
                #{category.name}
              </label>
            </div>
          ))
        ) : (
          <div
            className={`${styles["typo5-medium"]} ${styles.selectedCategory} ${
              expanded && styles.expanded
            }`}
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
        <div
          className={`${styles["typo4-regular"]} ${styles.label} ${
            expanded && styles.expanded
          }`}
        >
          사진
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
          ? imageUrls.map((imageUrl, index) => (
              <div
                className={`${styles.imageList} ${expanded && styles.expanded}`}
                key={imageUrl.id}
                style={{
                  left: `${expanded ? 25 + 140 * index : 20 + 124 * index}px`,
                }}
              >
                <img key={imageUrl.id} src={imageUrl.url} />
              </div>
            ))
          : null}
        {imageUrls.length < 5 ? (
          <div
            className={`${styles.addBox} ${expanded && styles.expanded}`}
            style={{
              left: `${
                expanded
                  ? 25 + 140 * imageUrls.length
                  : 20 + 124 * imageUrls.length
              }px`,
            }}
            onClick={clickImageInput}
          >
            <PlusIcon />
          </div>
        ) : null}
      </div>
      <button
        type="button"
        className={`${styles["typo4-regular"]} ${styles.save} ${
          styles.bottom
        } ${expanded && styles.expanded}`}
      >
        저장
      </button>
      <button
        type="submit"
        className={`${styles["typo4-regular"]} ${styles.submit} ${
          styles.bottom
        } ${expanded && styles.expanded}`}
      >
        등록
      </button>
    </form>
  );
};

export default React.memo(SubmitForm);

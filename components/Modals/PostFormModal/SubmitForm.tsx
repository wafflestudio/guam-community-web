import axios, { AxiosRequestConfig } from "axios";
import React, {
  ChangeEventHandler,
  createRef,
  FormEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CancelIcon from "../../../assets/icons/cancel/outlined.svg";
import CheckIcon from "../../../assets/icons/check.svg";
import DownIcon from "../../../assets/icons/down/down_20.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import { boardList, categoryList, MB } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPostFormModal } from "../../../store/modalSlice";
import { usePostPostMutation } from "../../../store/postsApi";
import { IImageUrl } from "../../../types/types";
import { handleImageInput } from "../../../utils/handleImageInputs";
import { useModalRef } from "../../../utils/useModalRef";

import styles from "./PostFormModal.module.scss";

const SubmitForm = () => {
  const [boardId, setBoardId] = useState(0);
  const [boardListOpen, setBoardListOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageData, setImageData] = useState<Uint8Array[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<IImageUrl[]>([]);

  const photoInput = useRef<HTMLInputElement>(null);
  const boardListRef = useRef<HTMLDivElement>(null);

  const refs: RefObject<HTMLImageElement>[] = useMemo(
    () => Array.from({ length: 3 }).map(() => createRef()),
    []
  );

  const { expanded } = useAppSelector((state) => state.modals.postFormModal);

  useModalRef(boardListRef, setBoardListOpen);

  useEffect(() => {
    if (expanded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expanded]);

  const [postPost, { isError, isSuccess, data: postResult }] =
    usePostPostMutation();

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(setPostFormModal({ open: false, expanded: false }));
  };

  const onToggleBoardList = () =>
    setBoardListOpen((boardListOpen) => !boardListOpen);

  const onBoardIdChange = useCallback((id: number) => {
    setBoardId(id);
    onToggleBoardList();
  }, []);

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

  const onDeleteCategory = () => setCategoryId(0);

  const onChangeImage: React.ChangeEventHandler<HTMLInputElement> = async ({
    target,
  }) => {
    if (target.files)
      setImageNames(Array.from(target.files).map((file) => file.name));
    handleImageInput(
      target,
      10,
      imageFiles,
      setImageFiles,
      setImageUrls,
      setImageData
    );
    console.log(imageData);
  };

  const clickImageInput = () => photoInput.current?.click();

  const onPostSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (boardId === 0) return window.alert("게시판을 골라주세요");
    if (title.length === 0 || content.length === 0)
      return window.alert("제목과 내용을 작성해주세요");
    if (categoryId === 0) return window.alert("태그를 골라주세요");

    const data = {
      boardId,
      title,
      content,
      categoryId,
      imageFilePaths: imageNames,
    };

    postPost(data);
  };

  useEffect(() => {
    const afterPostPost = async () => {
      if (isSuccess) {
        try {
          await Promise.all(
            postResult.presignedUrls.map((url: string, i: number) => {
              const newArr = [];
              while (imageData[i].length)
                newArr.push(
                  Array(imageData[i]).splice(0, Math.sqrt(imageData[i].length))
                );
              const options: AxiosRequestConfig = {
                method: "PUT",
                url: `/presigned_bucket_url/${
                  url.split(process.env.BUCKET_URL || "")[1]
                }`,
                data: newArr,
              };
              return axios(options);
              //   return axios.put(
              //     `/presigned_bucket_url/${
              //       url.split(process.env.BUCKET_URL || "")[1]
              //     }`,
              //     imageData[i]
              //   );
            })
          );
          setBoardId(0);
          setTitle("");
          setContent("");
          setCategoryId(0);
          setImageFiles([]);
          setImageUrls([]);
          closeModal();
        } catch (e) {
          console.log(e);
          alert("사진 업로드 실패");
        }
      }

      if (isError) alert("포스트 등록 실패");
    };

    afterPostPost();
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
          <div className={styles.boardList} ref={boardListRef}>
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
          onChange={onChangeImage}
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
                <img ref={refs[index]} key={imageUrl.id} src={imageUrl.url} />
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

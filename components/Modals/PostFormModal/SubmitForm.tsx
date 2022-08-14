import axios, { AxiosRequestConfig } from "axios";
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import CancelIcon from "../../../assets/icons/cancel/outlined.svg";
import CheckIcon from "../../../assets/icons/check.svg";
import DownIcon from "../../../assets/icons/down/down_20.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import { boardList, categoryList } from "../../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPostFormModal } from "../../../store/modalSlice";
import {
  usePatchPostMutation,
  usePostPostMutation,
} from "../../../store/postsApi";
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
  const [imageUrls, setImageUrls] = useState<IImageUrl[]>([]);

  const { post } = useAppSelector((state) => state.modals.postFormModal);

  useEffect(() => {
    if (post) {
      setBoardId(post.boardId);
      setTitle(post.title);
      setContent(post.content);
      setCategoryId(post.category.categoryId);
      setImageUrls(
        post.imagePaths.map((path, id) => {
          return { id: id.toString(), url: path };
        })
      );
    }
  }, [post]);

  const photoInput = useRef<HTMLInputElement>(null);
  const boardListRef = useRef<HTMLDivElement>(null);

  const { expanded } = useAppSelector((state) => state.modals.postFormModal);

  useModalRef(boardListRef, setBoardListOpen);

  useEffect(() => {
    if (expanded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [expanded]);

  const [postPost] = usePostPostMutation();
  const [patchPost] = usePatchPostMutation();

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(
      setPostFormModal({ open: false, expanded: false, post: undefined })
    );
  };

  const onToggleBoardList = () =>
    setBoardListOpen((boardListOpen) => !boardListOpen);

  const onBoardIdChange = (id: number) => {
    setBoardId(id);
    onToggleBoardList();
  };

  const onTitleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) =>
    setTitle(target.value);

  const onContentChange: ChangeEventHandler<HTMLTextAreaElement> = ({
    target,
  }) => setContent(target.value);

  const onCategoryIdChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => setCategoryId(parseInt(target.value));

  const onDeleteCategory = () => setCategoryId(0);

  const onChangeImage: React.ChangeEventHandler<HTMLInputElement> = async ({
    target,
  }) => {
    if (target.files)
      handleImageInput(target, 10, imageFiles, setImageFiles, setImageUrls);
  };

  const clickImageInput = () => photoInput.current?.click();

  const onPostSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
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
      ...(!post && { imageFilePaths: imageFiles.map((file) => file.name) }),
    };

    try {
      if (!post) {
        const { data: urlData } = await postPost(data);
        const { presignedUrls } = urlData;
        if (presignedUrls?.length && !post) {
          await Promise.all(
            presignedUrls.map((url: string, i: number) => {
              const options: AxiosRequestConfig = {
                url: `/presigned_bucket_url/${
                  url.split(process.env.BUCKET_URL || "")[1]
                }`,
                method: "PUT",
                headers: { "Content-Type": imageFiles[i].type },
                data: imageFiles[i],
              };
              axios(options);
            })
          );
        }
      } else {
        if (
          boardId === post.boardId &&
          categoryId === post.category.categoryId &&
          title === post.title &&
          content === post.content
        )
          return alert("수정된 내역이 없습니다");

        await patchPost({ data, postId: post.id });
      }

      setBoardId(0);
      setTitle("");
      setContent("");
      setCategoryId(0);
      setImageFiles([]);
      setImageUrls([]);
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

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
                <img key={imageUrl.id} src={imageUrl.url} />
              </div>
            ))
          : null}
        {imageUrls.length < 5 || !post ? (
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

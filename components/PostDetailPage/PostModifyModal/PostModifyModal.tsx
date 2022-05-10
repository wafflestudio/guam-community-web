import { useAppDispatch } from "../../../store/hooks";
import {
  setDeleteConfirmModalOpen,
  setPostModifyModalOpen,
} from "../../../store/modalSlice";

import styles from "./PostModifyModal.module.scss";

export default function PostModifyModal() {
  const dispatch = useAppDispatch();

  const onDeletePost = () => {
    dispatch(setDeleteConfirmModalOpen(true));
    dispatch(setPostModifyModalOpen(false));
  };

  return (
    <div className={styles.container}>
      <button className={`${styles["typo5-regular"]} ${styles.modify}`}>
        수정하기
      </button>
      <button
        className={`${styles["typo5-regular"]} ${styles.delete}`}
        onClick={onDeletePost}
      >
        삭제하기
      </button>
    </div>
  );
}

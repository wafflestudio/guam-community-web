import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setUserBlockModal } from "../../../store/modalSlice";

import styles from "./UserBlockModal.module.scss";

export default function UserBlockModal() {
  const { open, user } = useAppSelector((state) => state.modals.userBlockModal);

  const dispatch = useAppDispatch();

  const closeModal = () =>
    dispatch(setUserBlockModal({ open: false, user: null }));

  return (
    <div
      className={`${styles.wrapper} ${"modal-wrapper"} ${
        open ? styles.open : styles.close
      }`}
      onClick={closeModal}
    >
      <main
        className={`${styles.container} ${"modal-container"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className={`${styles["typo6-regular"]} ${styles.title}`}>
          {user?.nickname} 님을 차단하시겠어요?
        </h1>
        <button className={styles.cancel} onClick={closeModal}>
          취소
        </button>
        <div className={`${styles["typo4-regular"]} ${styles.info}`}>
          사용자를 차단하면~
        </div>
        <button className={`${styles["typo5-regular"]} ${styles.block}`}>
          차단하기
        </button>
        <hr className={styles.title} />
      </main>
    </div>
  );
}

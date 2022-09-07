import { reportReasons } from "constants/constants";
import { useAppSelector } from "store/hooks";

import styles from "./UserReportModal.module.scss";

export default function UserReportModal({
  closeModal,
}: {
  closeModal: () => {
    payload: undefined;
    type: string;
  };
}) {
  const { user } = useAppSelector((state) => state.modals.userReportModal);

  return (
    <div className={"modal-wrapper"} onClick={closeModal}>
      <main
        className={`${styles.container} ${"modal-container"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className={`${styles["typo6-regular"]} ${styles.title}`}>
          사용자 신고하기
        </h1>
        <button className={styles.cancel} onClick={closeModal}>
          취소
        </button>
        <div className={`${styles["typo4-regular"]} ${styles.info}`}>
          {user?.nickname} 님을 신고하는 이유를 알려주세요.
        </div>
        <ul className={styles.reportReason}>
          {reportReasons.map((reason) => (
            <li
              key={reason.id}
              className={`${styles["typo5-regular"]} ${styles.reason}`}
            >
              {reason.text}
            </li>
          ))}
        </ul>
        <button className={`${styles["typo5-regular"]} ${styles.report}`}>
          신고하기
        </button>
        <hr className={styles.title} />
      </main>
    </div>
  );
}

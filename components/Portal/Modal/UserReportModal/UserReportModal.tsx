import { useAppSelector } from "../../../../store/hooks";

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
          {user?.nickname} 사용자를 신고하는 이유를 알려주세요.
        </div>
        <ul className={styles.reportReason}>
          <li className={`${styles["typo5-regular"]} ${styles.reason}`}>
            욕설 및 비방 등 폭력적인 언행
          </li>
          <li className={`${styles["typo5-regular"]} ${styles.reason}`}>
            광고성의 게시물 및 댓글 도배
          </li>
          <li className={`${styles["typo5-regular"]} ${styles.reason}`}>
            또 무슨 이유가 있을까요? 이유 추가좀
          </li>
          <li className={`${styles["typo5-regular"]} ${styles.reason}`}>
            기타
          </li>
        </ul>
        <button className={`${styles["typo5-regular"]} ${styles.report}`}>
          신고하기
        </button>
        <hr className={styles.title} />
      </main>
    </div>
  );
}

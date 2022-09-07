import { useAppSelector } from "store/hooks";
import { usePostBlockMutation } from "store/postsApi";

import styles from "./UserBlockModal.module.scss";

export default function UserBlockModal({
  closeModal,
}: {
  closeModal: () => {
    payload: undefined;
    type: string;
  };
}) {
  const { user } = useAppSelector((state) => state.modals.userBlockModal);

  const [postBlock, { error }] = usePostBlockMutation();

  const onBlock = async () => {
    if (user?.id) {
      await postBlock(user?.id);
      closeModal();
    }
  };

  return (
    <div className={"modal-wrapper"} onClick={closeModal}>
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
          사용자를 차단하면, 해당 사용자의 게시글 및 댓글을 확인 할 수 없으며,
          서로 쪽지를 주고 받을 수 없습니다.
          <br />
          <br />
          차단계정 관리는 프로필&gt; 계정 설정&gt; 차단 목록 관리 탭에서 확인
          가능합니다
        </div>
        <button
          onClick={onBlock}
          className={`${styles["typo5-regular"]} ${styles.block}`}
        >
          차단하기
        </button>
        <hr className={styles.title} />
      </main>
    </div>
  );
}

import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef } from "react";

import { useAppDispatch } from "../../../store/hooks";
import {
  setUserBlockModal,
  setUserReportModal,
} from "../../../store/modalSlice";
import { useDeleteLetterBoxMutation } from "../../../store/postsApi";
import { IUser } from "../../../types/types";
import { useModalRef } from "../../../utils/useModalRef";
import styles from "../../Messages/Messages.module.scss";

const PairLetterModal = ({
  pair,
  setModal,
}: {
  pair: IUser;
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [deleteLetters] = useDeleteLetterBoxMutation();

  const router = useRouter();

  useModalRef(modalRef, setModal);

  const onReportUser = () => {
    dispatch(setUserReportModal({ user: pair }));
    setModal(false);
  };

  const onBlockUser = () => {
    dispatch(setUserBlockModal({ user: pair }));
    setModal(false);
  };

  const onDeleteMessage = async () => {
    if (pair) await deleteLetters(pair.id!);
    router.push("/letters");
  };

  return (
    <div className={styles.moreModal} ref={modalRef}>
      <ul>
        <li>
          <button onClick={onDeleteMessage}>쪽지 삭제하기</button>
        </li>
        <li>
          <button onClick={onReportUser}>신고하기</button>
        </li>
        <li>
          <button onClick={onBlockUser}>차단하기</button>
        </li>
      </ul>
    </div>
  );
};

export default PairLetterModal;

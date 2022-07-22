import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef } from "react";

import { useAppDispatch } from "../../../../store/hooks";
import {
  setUserBlockModal,
  setUserReportModal,
} from "../../../../store/modalSlice";
import { IUser } from "../../../../types/types";
import { useModalRef } from "../../../../utils/useModalRef";

import styles from "./Comment.module.scss";

export default function CommentMoreModal({
  user,
  setMoreOpen,
}: {
  user: IUser;
  setMoreOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const modalRef = useRef(null);
  useModalRef(modalRef, setMoreOpen);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const onSendMessage = () => router.push("/letters");

  const onReportUser = () => {
    dispatch(setUserReportModal({ open: true, user }));
    setMoreOpen(false);
  };

  const onBlockUser = () => {
    dispatch(setUserBlockModal({ open: true, user }));
    setMoreOpen(false);
  };

  return (
    <div className={styles.moreModal} ref={modalRef}>
      <ul>
        <li>
          <button onClick={onSendMessage}>쪽지 보내기</button>
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
}
